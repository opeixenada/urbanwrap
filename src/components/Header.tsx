import { Config } from "@/config";

export const Header = ({ firstName }: { firstName?: string }) => (
  <h1 className="mt-4 mb-8 flex items-center gap-2 text-4xl font-bold">
    {firstName ? `${firstName}'s` : ""} Urban Sports Wrapped {Config.SUMMARY_YEAR}
  </h1>
);
