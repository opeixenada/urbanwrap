import { makeApiRequest } from '@/utils/apiUtils';

export async function POST(request: Request) {
  const { token, page, pageSize } = await request.json();

  const params = new URLSearchParams({
    type: 'checkins',
    pageSize: pageSize.toString(),
    page: page.toString(),
  });

  return makeApiRequest('/api/v6/bookings', {
    method: 'GET',
    token,
    params,
  });
}
