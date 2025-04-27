import { atom } from "nanostores";

import { type Command } from "./api/commands";

/** Save a list of commands */
export const $commands = atom<Command[]>(null!);

/** The current file path that is being selected for editing */
export const $selectedFilePath = atom("");

/** The current command that is being selected for performing actions on it (e.g. edit/delete/webhook) */
export const $performingActionsOnCommand = atom<Command | null>(null);

/** The current command that is being edited */
export const $editingCommand = atom<Command | null>(null);

/** Indicates whether command manipulation (add/edit/delete) is allowed */
export const $isCommandManipulationAllowed = atom(true);
