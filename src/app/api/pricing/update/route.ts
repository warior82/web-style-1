import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = process.env.TOKEN;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json(
      { error: 'Missing configuration' },
      { status: 500 }
    );
  }

  try {
    const updatedData = await request.json();

    // First, get the current file to get its SHA
    const getResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/json/pricing.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!getResponse.ok) {
      throw new Error('Failed to fetch current file');
    }

    const currentFile = await getResponse.json();

    // Update the file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/json/pricing.json`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update pricing data',
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
    console.error('Error updating pricing:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update pricing data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
