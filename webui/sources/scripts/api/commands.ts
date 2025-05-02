import { baseUrl, safeFetch } from "./common";

export type CommandVariableTypes =
  | "int" // no decimals
  | "float" // with decimals
  | "number" // decimal or integer
  | "non-numeric" // no numbers or floats
  | "any" // anything (default)
  | "boolean" // true or false
  | "password" // no spaces
  | "path" // a clean path
  | "flag" // -a or -la
  | "url" // a web URL
  | "option"; // --option or --option-name

export type CommandVariable = {
  default: string;
  name: string;
  optional: boolean;
  restricted: boolean;
  type: CommandVariableTypes;
  values: string[];
};

export type Command = {
  name: string;
  description: string;
  group: string;
  command: string;
  variables: CommandVariable[];
};

export function getCommandsList(): Promise<[null, Error] | [Command[], null]> {
  return safeFetch<Command[]>(
    "json",
    `${baseUrl}/command/`,
    { method: "GET", credentials: "include" },
    "Failed to get list of available commands."
  );
}

export function executeCommand(command: string, name: string, args: { [key: string]: string }) {
  return safeFetch(
    "text",
    `${baseUrl}/command/?command=${encodeURIComponent(command)}&name=${encodeURIComponent(name)}&streamOutput=false`,
    { method: "POST", body: JSON.stringify(args), credentials: "include" },
    `Failed to execute command "${command}"`
  );
}

export function executeCommandStream(command: string, name: string, args: { [key: string]: string }) {
  return safeFetch(
    "response",
    `${baseUrl}/command/?command=${encodeURIComponent(command)}&name=${encodeURIComponent(name)}&streamOutput=true`,
    { method: "POST", body: JSON.stringify(args), credentials: "include" },
    `Failed to execute command "${command}"`
  );
}

export type AddCommandInput = {
  commandName: string;
  groupName: string;
  description: string;
  command: string;
};

export function addCommand(newCommand: AddCommandInput): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/command/`,
    { method: "PUT", body: new URLSearchParams(newCommand), credentials: "include" },
    `Failed to add command "${newCommand.commandName}"`
  );
}

export function deleteCommand(
  commandName: string,
  command: string,
  keepWebhooks = false
): Promise<[string, null] | [null, Error]> {
  return safeFetch(
    "text",
    `${baseUrl}/command/?commandName=${encodeURIComponent(commandName)}&command=${encodeURIComponent(command)}&keepWebhook=${keepWebhooks}`,
    { method: "DELETE", credentials: "include" },
    `Failed to delete command "${commandName}"`
  );
}

export function isCommandManipulationAllowed() {
  return safeFetch<boolean>(
    "json",
    `${baseUrl}/is-command-manipulation-allowed`,
    { method: "GET", credentials: "include" },
    "Failed to check if command manipulation is allowed."
  );
}
