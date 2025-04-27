import { baseUrl, safeFetch } from "./common";

export function getFilesList(): Promise<[null, Error] | [string[], null]> {
  return safeFetch<string[]>("json", `${baseUrl}/files-list`, { credentials: "include" }, "Failed to get list of files.");
}

export async function writeFile(fileContent: string, filePath: string): Promise<[null, Error] | [string, null]> {
  return safeFetch(
    "text",
    `${baseUrl}/file/?filePath=${encodeURIComponent(filePath)}`,
    { method: "PUT", body: fileContent, credentials: "include" },
    `Failed to save the file "${filePath}"`
  );
}

export async function readFile(filePath: string): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/file/?filePath=${encodeURIComponent(filePath)}`,
    { credentials: "include" },
    `Failed to get the file "${filePath}" content`
  );
}
