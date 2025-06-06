import { baseUrl, safeFetch } from "./common";

export type File = {
  name: string;
  path: string;
};

export type Folder = {
  name: string;
  path: string;
  files: File[];
  folders: Folder[];
  isEmpty: boolean;
};

export function readDir(dirPath: string): Promise<[null, Error] | [Folder, null]> {
  return safeFetch<Folder>(
    "json",
    `${baseUrl}/read-dir/?directory=${encodeURIComponent(dirPath)}`,
    { credentials: "include" },
    "Failed to get list of files."
  );
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

export async function moveToPath(fromPath: string, toPath: string): Promise<[null, Error] | [{ warning: string }, null]> {
  return safeFetch<{ warning: string }>(
    "json",
    `${baseUrl}/move-path/?fromPath=${encodeURIComponent(fromPath)}&toPath=${encodeURIComponent(toPath)}`,
    { method: "POST", credentials: "include" },
    `Failed to move the path "${fromPath}" to "${toPath}"`
  );
}

export async function deletePath(pathToDelete: string): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/delete-path/?path=${encodeURIComponent(pathToDelete)}`,
    { method: "DELETE", credentials: "include" },
    `Failed to delete the path "${pathToDelete}"`
  );
}

export async function createFolder(createAtPath: string): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/create-folder/?directory=${encodeURIComponent(createAtPath)}`,
    { method: "PUT", credentials: "include" },
    `Failed to create folder at "${createAtPath}"`
  );
}

export async function createFile(createAtPath: string): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/create-file/?directory=${encodeURIComponent(createAtPath)}`,
    { method: "PUT", credentials: "include" },
    `Failed to create file at "${createAtPath}"`
  );
}

export async function uploadFiles(files: FileList, destination: string): Promise<[null, Error] | [{ warnings: string[] }, null]> {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  return safeFetch<{ warnings: string[] }>(
    "json",
    `${baseUrl}/upload-files/?destination=${encodeURIComponent(destination)}`,
    { method: "POST", body: formData, credentials: "include" },
    `Failed to upload files at "${destination}"`
  );
}

export async function downloadPath(pathToDownload: string) {
  return safeFetch(
    "response",
    `${baseUrl}/download-path/?path=${encodeURIComponent(pathToDownload)}`,
    { method: "GET", credentials: "include" },
    `Failed to upload files at "${pathToDownload}"`
  );
}
