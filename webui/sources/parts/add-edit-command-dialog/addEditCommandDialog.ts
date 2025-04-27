import {
  addCommand,
  deleteCommand,
  getCommandsList,
  type AddCommandInput,
  type CommandVariableTypes,
} from "@scripts/api/commands";
import { errorMsg, getElement, successMsg } from "@scripts/utils/utils";
import { updateWebhook } from "~/sources/scripts/api/webhooks";
import { $commands, $editingCommand } from "~/sources/scripts/stores";

type VariableFormData = {
  name: string;
  defaultValue: string;
  type: CommandVariableTypes;
  values: string;
  restricted: string;
  optional: string;
};

const addEditDialog = {
  dialog: getElement<DialogComponent>("#add-command-dialog"),
  dialogTitle: getElement<HTMLHeadingElement>(".add-command-dialog-title"),
  commandNameInput: getElement<HTMLInputElement>("#add-command-command-name"),
  groupNameInput: getElement<HTMLInputElement>("#add-command-group-name"),
  groupDatalist: getElement<HTMLDataListElement>("#add-command-groups-datalist"),
  descriptionInput: getElement<HTMLInputElement>("#add-command-description"),
  commandInput: getElement<HTMLInputElement>("#add-command-command"),
  addCommandFrom: getElement<HTMLFormElement>("#add-command-form"),
  addVariableForm: getElement<HTMLFormElement>("#add-command-variables-form"),
  insertVariableBtn: getElement<HTMLButtonElement>("#add-variables-insert-button"),
  actionBtn: getElement<HTMLButtonElement>("#add-command-btn"),
};

export function initAddEditCommandDialog() {
  addEditDialog.commandInput.addEventListener("input", () => {
    addEditDialog.commandInput.value = addEditDialog.commandInput.value.replace(/\n+/g, "");
    updateCommandInputSize();
  });

  addEditDialog.dialog.addEventListener("open", dialogOpenHandler);
  addEditDialog.actionBtn.addEventListener("click", addOrEditCommandBtnHandler);
  addEditDialog.insertVariableBtn.addEventListener("click", insertVariable);
  addEditDialog.commandInput.addEventListener("click", fillInsertVariableForm);

  $editingCommand.listen(cmd => {
    if (cmd) addEditDialog.dialog.open();
    switchBetweenAddAndEdit();
  });

  addEditDialog.dialog.addEventListener("close", () => {
    $editingCommand.set(null);
  });
}

/** Adjust the command input height to fit the content */
function updateCommandInputSize() {
  const cmdInput = addEditDialog.commandInput;

  if (!cmdInput.value) {
    cmdInput.style.removeProperty("height");
    return;
  }

  cmdInput.style.removeProperty("height");
  cmdInput.style.height = cmdInput.scrollHeight + 2 + "px";
}

/** Prepare the groups datalist for autocomplete list */
function dialogOpenHandler() {
  const groupsName = $commands.get().map(cmd => cmd.group);
  const uniqueGroups = Array.from(new Set(groupsName));

  addEditDialog.groupDatalist.innerHTML = "";

  for (const group of uniqueGroups) {
    const option = document.createElement("option");
    option.value = group;
    addEditDialog.groupDatalist.appendChild(option);
  }

  updateCommandInputSize();
}

/** Insert a variable to the end of the command input using the variable form inputs */
function insertVariable() {
  addEditDialog.addVariableForm.reportValidity();

  const form = new FormData(addEditDialog.addVariableForm);
  const formData = {} as VariableFormData;
  form.forEach((value, key) => (formData[key as keyof VariableFormData] = value as never));

  // Basic validation
  if (!formData.name) {
    errorMsg("Variable name is required.");
    return;
  }

  if (formData.values) {
    if (formData.type === "boolean") {
      errorMsg("Boolean variables cannot have values.");
      return;
    }

    if (formData.type === "password") {
      errorMsg("Password variables cannot have values.");
      return;
    }
  }

  if (formData.restricted === "true" && !formData.values) {
    errorMsg("Restricted values is enabled but no values are provided.");
    return;
  }

  let varString = `\${${formData.name.trim()}`;
  if (formData.optional === "true") varString += "?";
  if (formData.type && formData.type !== "any") varString += `:${formData.type}`;
  if (formData.defaultValue) varString += `=${formData.defaultValue.trim()}`;
  if (formData.values) {
    const values = formData.values.trim().replace(/^\|/, "").replace(/\|$/, "");
    varString += `[${values}${formData.restricted === "true" ? "" : "|*"}]`;
  }
  varString += "} ";

  const varRe = new RegExp(`\\$\{(${formData.name.trim()})([:=?[].*?)?\\}`, "g");
  if (varRe.test(addEditDialog.commandInput.value)) {
    addEditDialog.commandInput.value = addEditDialog.commandInput.value.replace(varRe, varString);
    return;
  }

  addEditDialog.commandInput.value += varString;
  updateCommandInputSize();
}

/** The action button to add or edit a command */
async function addOrEditCommandBtnHandler() {
  const editingCommand = $editingCommand.get();
  const isEditMode = editingCommand !== null;

  addEditDialog.actionBtn.disabled = true;
  addEditDialog.addCommandFrom.reportValidity();

  // check if the new command name already exists (edit mode)
  if (isEditMode) {
    const commandName = addEditDialog.commandNameInput.value;
    const command = $commands.get().findIndex(cmd => cmd.name === commandName && cmd.name !== editingCommand!.name);
    if (command !== -1) {
      errorMsg("Command name already exists.");
      addEditDialog.actionBtn.disabled = false;
      return;
    }
  }

  const form = new FormData(addEditDialog.addCommandFrom);
  const formData = {} as AddCommandInput;
  form.forEach((value, key) => (formData[key as keyof AddCommandInput] = value as string));

  // For editing mode remove the command then add it again as new one
  if (isEditMode) {
    // delete the old command and keep the webhook
    const [, err] = await deleteCommand(editingCommand!.name, editingCommand!.command, true);
    if (err !== null) {
      errorMsg(err.message);
      addEditDialog.actionBtn.disabled = false;
      return;
    }

    // update webhook if exists (ignore errors)
    const [, updateWebhookErr] = await updateWebhook(
      editingCommand!.name,
      editingCommand!.command,
      formData.commandName,
      formData.command
    );
    if (updateWebhookErr !== null) console.error(updateWebhookErr.message);
  }

  const [, err] = await addCommand(formData);
  if (err !== null) {
    errorMsg(err.message);
    addEditDialog.actionBtn.disabled = false;
    return;
  }

  // refresh the command list
  const [newCommandList, getCommandsListErr] = await getCommandsList();
  if (getCommandsListErr !== null) {
    errorMsg(getCommandsListErr.message);
    addEditDialog.actionBtn.disabled = false;
    return;
  }
  $commands.set(newCommandList);

  addEditDialog.actionBtn.disabled = false;
  addEditDialog.dialog.close();
  successMsg(isEditMode ? "Command updated successfully." : "Command added successfully.");
}

/** Prepare the dialog and inputs for editing or adding a new command */
function switchBetweenAddAndEdit() {
  const command = $editingCommand.get();
  const isEditMode = command !== null;

  addEditDialog.dialogTitle.textContent = isEditMode ? "Edit Command" : "Add a new Command";
  addEditDialog.actionBtn.textContent = isEditMode ? "Save Changes" : "Add Command";

  // fill/empty the form
  addEditDialog.commandNameInput.value = isEditMode ? command.name : "";
  addEditDialog.groupNameInput.value = isEditMode ? command.group : "";
  addEditDialog.descriptionInput.value = isEditMode ? command.description : "";
  addEditDialog.commandInput.value = isEditMode ? command.command : "";
  updateCommandInputSize();
}

/** When the user clicks on a variable on the command input, parse the variable string under the cursor and fill the form */
function fillInsertVariableForm() {
  const cursorStart = addEditDialog.commandInput.selectionStart;
  const cursorEnd = addEditDialog.commandInput.selectionEnd;
  if (cursorStart === null || cursorEnd === null || cursorStart !== cursorEnd) return;

  // find the variable under the cursor
  const re = /\$\{(.+?)([:=?[].*?)?\}/g;
  const str = addEditDialog.commandInput.value;
  let match: RegExpExecArray | null;
  let variableAtCursor: string | null = null;
  while ((match = re.exec(str)) !== null) {
    if (cursorStart >= match.index && cursorStart < match.index + match[0].length) {
      variableAtCursor = match[0];
      break;
    }
  }

  const defaultFormData = { name: "", optional: "false", type: "any", defaultValue: "", values: "", restricted: "false" };

  // parse and fill the form
  const parseVariable = variableAtCursor ? (parseCommandVariableString(variableAtCursor) ?? defaultFormData) : defaultFormData;
  const form = addEditDialog.addVariableForm;
  for (const [inputName, inputValue] of Object.entries(parseVariable)) {
    const input = form.elements.namedItem(inputName) as HTMLInputElement | null;
    if (input) input.value = inputValue;
  }
}

/** Parse variable string like `${path?:path=~/Downloads[/home|*]}` to an object with keys matches the variable form inputs name */
function parseCommandVariableString(str: string) {
  const re = /\$\{(?:(?<name>.+?)[:=]?)(?<optional>\?)?(?::(?<type>.+?)=?)?(?:=(?<defaultValue>.+?))?(?:\[(?<values>.+?)\])?\}/;
  const match = re.exec(str);
  if (!match?.groups) return null;

  const { name, optional, type, defaultValue, values } = match.groups;
  if (!name) return null;

  const valuesArray = values ? values.split("|").map(s => s.trim()) : [];

  return {
    name,
    optional: optional === "?" ? "true" : "false",
    type: (type ?? "any") as CommandVariableTypes,
    defaultValue: defaultValue ?? "",
    values: valuesArray.filter(v => v !== "*").join("|"),
    restricted: (valuesArray.length && !valuesArray.includes("*")).toString(),
  };
}
