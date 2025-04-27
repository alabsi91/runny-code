import { baseUrl, safeFetch } from "./common";

export async function getWebhook(commandName: string, command: string): Promise<[string, null] | [null, Error]> {
  return await safeFetch(
    "text",
    `${baseUrl}/get-webhook/?commandName=${encodeURIComponent(commandName)}&command=${encodeURIComponent(command)}`,
    { method: "GET", credentials: "include" },
    "Failed to get webhook."
  );
}

export async function createWebhook(commandName: string, command: string): Promise<[string, null] | [null, Error]> {
  return await safeFetch(
    "text",
    `${baseUrl}/create-webhook/?commandName=${encodeURIComponent(commandName)}&command=${encodeURIComponent(command)}`,
    { method: "PUT", credentials: "include" },
    "Failed to create webhook."
  );
}

export async function updateWebhook(
  oldCommandName: string,
  oldCommand: string,
  commandName: string,
  command: string
): Promise<[string, null] | [null, Error]> {
  return await safeFetch(
    "text",
    `${baseUrl}/update-webhook/?oldCommandName=${encodeURIComponent(oldCommandName)}&oldCommand=${encodeURIComponent(oldCommand)}&newCommandName=${encodeURIComponent(commandName)}&newCommand=${encodeURIComponent(command)}`,
    { method: "PUT", credentials: "include" },
    "Failed to create webhook."
  );
}

export async function deleteWebhook(commandName: string, command: string): Promise<[string, null] | [null, Error]> {
  return await safeFetch(
    "text",
    `${baseUrl}/delete-webhook/?commandName=${encodeURIComponent(commandName)}&command=${encodeURIComponent(command)}`,
    { method: "DELETE", credentials: "include" },
    "Failed to delete webhook."
  );
}
