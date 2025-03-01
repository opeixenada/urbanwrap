import { Loader2 } from "lucide-react";
import { useState } from "react";

interface LoginFormProps {
  loading: boolean;
  onSubmit: (credentials: { username: string; password: string }) => void;
}

export const LoginForm = ({ loading, onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="mb-6 flex max-w-md flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ username, password });
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Email
        </label>
        <input
          id="username"
          type="email"
          placeholder="Enter your USC email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-600"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your USC password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-600"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!username || !password || loading}
        className="mt-2 flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};
