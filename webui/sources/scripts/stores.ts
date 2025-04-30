import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

import { type Command } from "./api/commands";
import type { Folder } from "./api/files";

/** Save a list of commands */
export const $commands = atom<Command[]>(null!);

/** Save a list of files */
export const $files = atom<Folder>(null!);

/** The current file path that is being selected for editing */
export const $selectedFilePath = atom("");

/** The current command that is being selected for performing actions on it (e.g. edit/delete/webhook) */
export const $performingActionsOnCommand = atom<Command | null>(null);

/** The current command that is being edited */
export const $editingCommand = atom<Command | null>(null);

/** Indicates whether command manipulation (add/edit/delete) is allowed */
export const $isCommandManipulationAllowed = atom(true);

/** The current color scheme */
export const $colorScheme = persistentAtom<"light" | "dark" | "auto">("color-scheme", "auto");
