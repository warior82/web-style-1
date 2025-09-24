import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.TOKEN;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO; // contoh: "username/nama-repo"

  if (!token || !repo) {
    console.error('Missing environment variables:', { token: !!token, repo: !!repo });
    return NextResponse.json(
      { error: 'Configuration error' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/json/pricing.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3.raw'
        }
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('GitHub API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorBody
      });
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    // Karena pakai Accept: raw, response sudah langsung isi file JSON
    const raw = await response.text();
    const data = JSON.parse(raw);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch pricing data', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
