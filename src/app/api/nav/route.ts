import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/contents/public/Json/Nav.json`,
      {
        headers: {
          Authorization: `token ${process.env.TOKEN}`,
          Accept: 'application/vnd.github.v3.raw'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch nav data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch nav data' }, { status: 500 });
  }
}
