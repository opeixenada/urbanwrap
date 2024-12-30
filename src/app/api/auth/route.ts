import { NextResponse } from 'next/server';
import { Config } from '@/config';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const formData = new URLSearchParams({
      username: username,
      password: password,
      grant_type: 'password',
      client_id: Config.USC_CLIENT_ID,
      client_secret: Config.USC_CLIENT_SECRET,
    });

    const response = await fetch(`${Config.USC_API_HOST}/api/v6/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

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
