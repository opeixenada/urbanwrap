import { NextResponse } from "next/server";
import { Profile } from "@/types/Profile";
import { makeApiRequest } from "@/utils/apiUtils";

interface ApiResponse {
  success: string;
  data: Profile;
}

interface ErrorResponse {
  error: string;
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse | ErrorResponse>> {
  const { token } = await request.json();

  return makeApiRequest("/api/v6/customers/me", {
    method: "GET",
    token,
  });
}
