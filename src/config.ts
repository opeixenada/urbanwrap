export class Config {
  static readonly SUMMARY_YEAR = 2025;

  static readonly USC_API_HOST: string = process.env.USC_API_HOST ?? "";
  static readonly USC_CLIENT_ID: string = process.env.USC_CLIENT_ID ?? "";
  static readonly USC_CLIENT_SECRET: string = process.env.USC_CLIENT_SECRET ?? "";
}
