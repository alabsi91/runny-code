import { initAddEditCommandDialog } from "@parts/add-edit-command-dialog/addEditCommandDialog";
import { initCodeEditor } from "@parts/code-editor/initCodeEditor";
import { initColorScheme } from "@parts/color-scheme-btn/colorScheme";
import { initCommandActionsDialog } from "@parts/command-actions-dialog/commandActionsDialog";
import { initCommandsMenu } from "@parts/commands-menu/initCommandsMenu";
import { confirmDialog, initConfirmDialog } from "@parts/confirm-dialog/confirmDialog";
import { initFileNavigator } from "@parts/file-navigator/fileNavigator";
import { isLoggedIn } from "@scripts/api/auth";
import { getCommandsList, isCommandManipulationAllowed } from "@scripts/api/commands";
import { readDir, writeFile } from "@scripts/api/files";
import { $commands, $files, $isCommandManipulationAllowed, $selectedFilePath } from "@scripts/stores";
import { errorMsg, getElement, successMsg } from "@scripts/utils/utils";

const isAuthenticated = await isLoggedIn();
if (!isAuthenticated) {
  window.location.href = "/auth/";
}

const [availableFiles, getFilesListError] = await readDir("");
if (getFilesListError !== null) {
  errorMsg(getFilesListError.message);
  throw getFilesListError;
}

const [availableCommands, error] = await getCommandsList();
if (error !== null) {
  errorMsg(error.message);
  throw error;
}

const [isAllowed, error2] = await isCommandManipulationAllowed();
if (error2 !== null) {
  errorMsg(error2.message);
  throw error2;
}

$files.set(availableFiles);
$commands.set(availableCommands);
$isCommandManipulationAllowed.set(isAllowed);

initColorScheme();
initCodeEditor();
initFileNavigator();
await initCommandsMenu();
initSaveFileBtn();
initCommandActionsDialog();
initAddEditCommandDialog();
initConfirmDialog();

// ----

function initSaveFileBtn() {
  const saveButton = getElement<HTMLButtonElement>("#save");
  saveButton.addEventListener("click", saveFileBtnHandler);
  $selectedFilePath.subscribe(filePath => {
    saveButton.disabled = !filePath;
  });
}

async function saveFileBtnHandler() {
  const selectedFilePath = $selectedFilePath.get();
  if (!selectedFilePath) {
    errorMsg("No file selected");
    return;
  }

  const confirmed = await confirmDialog({
    title: "Save file",
    msg: `Do you want to save and overwrite the file "${selectedFilePath}" ?`,
    confirmLabel: "Overwrite",
    confirmBtnStyle: "danger",
    cancelLabel: "Cancel",
  });

  if (!confirmed) return;

  const codeEditor = getElement<CodeEditor>("code-editor")!;

  const code = codeEditor.value;

  const [, error] = await writeFile(code, selectedFilePath);
  if (error !== null) {
    errorMsg(error.message);
    return;
  }

  successMsg(`The file "${selectedFilePath}" saved.`);
}
