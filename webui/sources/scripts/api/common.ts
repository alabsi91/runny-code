export const baseUrl = _production ? "" : "http://192.168.1.113:8080";

export async function safeFetch(
  outputType: "response",
  input: RequestInfo | URL,
  init?: RequestInit,
  errorMessage?: string
): Promise<[Response, null] | [null, Error]>;
export async function safeFetch(
  outputType: "text",
  input: RequestInfo | URL,
  init?: RequestInit,
  errorMessage?: string
): Promise<[string, null] | [null, Error]>;
export async function safeFetch<T>(
  outputType: "json",
  input: RequestInfo | URL,
  init?: RequestInit,
  errorMessage?: string
): Promise<[T, null] | [null, Error]>;
export async function safeFetch<T extends Response | string>(
  outputType: "json" | "text" | "response",
  input: RequestInfo | URL,
  init?: RequestInit,
  errorMessage?: string
): Promise<[T, null] | [null, Error]> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(await res.text());

    if (outputType === "response") {
      return [res as T, null];
    }

    if (outputType === "text") {
      return [(await res.text()) as T, null];
    }

    if (outputType === "json") {
      return [(await res.json()) as T, null];
    }

    return [res as T, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(errorMessage ?? "Failed to fetch")];
  }
}
