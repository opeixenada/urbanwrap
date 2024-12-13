import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token, page, pageSize } = await request.json();

    const params = new URLSearchParams({
      type: 'checkins',
      pageSize: pageSize.toString(),
      page: page.toString(),
    });

    const response = await fetch(`https://api.urbansportsclub.com/api/v6/bookings?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'User-Agent': 'curl/8.6.0',
        Host: 'api.urbansportsclub.com',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
