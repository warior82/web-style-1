import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  console.log('Environment variables:', { 
    hasToken: !!token, 
    repo,
    tokenPrefix: token?.substring(0, 4)
  });

  if (!token || !repo) {
    console.error('Missing environment variables');
    return NextResponse.json(
      { error: 'Missing configuration' },
      { status: 500 }
    );
  }

  try {
    const updatedData = await request.json();

    // First, get the current file to get its SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/json/ProfileSection.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3.raw+json'
        }
      }
    );

    if (!getResponse.ok) {
      throw new Error('Failed to fetch current file');
    }

    const currentFile = await getResponse.json();
    
    console.log('Current file data:', {
      sha: currentFile.sha,
      size: currentFile.size
    });

    // Update the file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/json/ProfileSection.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update profile data',
          content: Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64'),
          sha: currentFile.sha
        })
      }
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      throw new Error(`Failed to update file: ${error}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update profile data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
