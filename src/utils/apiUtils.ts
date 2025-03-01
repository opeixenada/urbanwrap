import { NextResponse } from "next/server";
import { Config } from "@/config";

type ApiMethod = "GET" | "POST";

interface RequestOptions {
  method: ApiMethod;
  token?: string;
  body?: string | URLSearchParams;
  params?: URLSearchParams;
  contentType?: string;
}

export async function makeApiRequest(endpoint: string, options: RequestOptions) {
  const url = `${Config.USC_API_HOST}${endpoint}${options.params ? `?${options.params}` : ""}`;

  const headers: Record<string, string> = {};
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }
  if (options.contentType) {
    headers["Content-Type"] = options.contentType;
  }

  try {
    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body?.toString(),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
