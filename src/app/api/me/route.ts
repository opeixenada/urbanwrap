import { NextResponse } from 'next/server';
import { Config } from '@/config';
import { Profile } from '@/types/Profile';

interface ApiResponse {
  success: string;
  data: Profile;
}

interface ErrorResponse {
  error: string;
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse | ErrorResponse>> {
  try {
    const { token } = await request.json();

    const response = await fetch(`${Config.USC_API_HOST}/api/v6/customers/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
