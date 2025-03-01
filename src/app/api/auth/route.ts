import { makeApiRequest } from "@/utils/apiUtils";
import { Config } from "@/config";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const formData = new URLSearchParams({
    username,
    password,
    grant_type: "password",
    client_id: Config.USC_CLIENT_ID,
    client_secret: Config.USC_CLIENT_SECRET,
  });

  return makeApiRequest("/api/v6/auth/token", {
    method: "POST",
    body: formData,
    contentType: "application/x-www-form-urlencoded",
  });
}
