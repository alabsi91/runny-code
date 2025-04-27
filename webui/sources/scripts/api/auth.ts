import { baseUrl, safeFetch } from "./common";

export function login(formData: FormData): Promise<[string, null] | [null, Error]> {
  return safeFetch("text", `${baseUrl}/login`, { method: "POST", body: formData, credentials: "include" }, "Failed to login.");
}

export async function isLoggedIn() {
  const [, err] = await safeFetch(
    "text",
    `${baseUrl}/is-authenticated`,
    { credentials: "include" },
    "Failed to check authentication status."
  );
  return err === null;
}
