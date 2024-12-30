import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log(`Will try auth`);

    const { username, password } = await request.json();

    const clientId = process.env.USC_CLIENT_ID;
    const clientSecret = process.env.USC_CLIENT_SECRET;

    const response = await fetch('https://api.urbansportsclub.com/api/v7/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'curl/8.6.0',
        Host: 'api.urbansportsclub.com',
      },
      body: JSON.stringify({
        username,
        password,
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    console.log(
      `Auth request: `,
      JSON.stringify({
        username,
        password,
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
      })
    );
    console.log(`Auth response: `, response);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Authentication failed! Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.success || !data.data?.access_token) {
      return NextResponse.json(
        { error: 'Invalid response format from authentication server' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        token_type: data.data.token_type,
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
        expires_in: data.data.expires_in,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
