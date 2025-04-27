import { atom } from "nanostores";

import { deleteCommand, getCommandsList } from "@scripts/api/commands";
import { createWebhook, deleteWebhook, getWebhook } from "@scripts/api/webhooks";
import { $performingActionsOnCommand, $commands, $editingCommand, $isCommandManipulationAllowed } from "~/sources/scripts/stores";
import { errorMsg, getElement, successMsg } from "@scripts/utils/utils";
import { confirmDialog } from "@parts/confirm-dialog/confirmDialog";

const $currentCommandWebhook = atom<string | null>(null);

const actionDialog = {
  dialog: getElement<DialogComponent>("#command-actions-dialog"),
  editCommandBtn: getElement<HTMLButtonElement>("#command-actions-edit-btn"),
  deleteCommandBtn: getElement<HTMLButtonElement>("#command-actions-delete-btn"),
  webhookBtn: getElement<HTMLButtonElement>("#command-actions-webhook-btn"),
  webhookLabel: getElement<HTMLLabelElement>("#command-actions-webhook-label"),
  webhookUrlView: getElement<HTMLDivElement>(".command-actions-webhook-url-view"),
  webhookUrlViewLink: getElement<HTMLAnchorElement>(".command-actions-webhook-url-view a"),
  webhookUrlViewCopyBtn: getElement<HTMLAnchorElement>(".command-actions-webhook-url-view button"),
};

export function initCommandActionsDialog() {
  actionDialog.editCommandBtn.addEventListener("click", editCommandBtnHandler);
  actionDialog.deleteCommandBtn.addEventListener("click", deleteCommandHandler);
  actionDialog.webhookBtn.addEventListener("click", webhookBtnHandler);
  actionDialog.webhookUrlViewCopyBtn.addEventListener("click", copyWebhookUrlToClipboard);
  actionDialog.dialog.addEventListener("close", () => $performingActionsOnCommand.set(null));

  $performingActionsOnCommand.listen(command => {
    if (command) openCommandActionsDialog();
  });

  $isCommandManipulationAllowed.subscribe(isAllowed => {
    actionDialog.editCommandBtn.disabled = !isAllowed;
    actionDialog.deleteCommandBtn.disabled = !isAllowed;
  });

  $currentCommandWebhook.subscribe(webhookUrl => {
    const isEnabled = webhookUrl !== null;
    actionDialog.webhookBtn.textContent = isEnabled ? "Disable Webhook" : "Enable Webhook";
    actionDialog.webhookBtn.classList.toggle("danger-btn", isEnabled);
    actionDialog.webhookLabel.textContent = isEnabled ? "Remove Webhook Access" : "Create Webhook URL";

    actionDialog.webhookUrlView.style.display = isEnabled ? "flex" : "none";
    actionDialog.webhookUrlViewLink.textContent = webhookUrl;
    actionDialog.webhookUrlViewLink.href = webhookUrl ?? "";
  });
}

async function openCommandActionsDialog() {
  actionDialog.dialog.open();
  await getCommandWebhookUrl();
}

async function webhookBtnHandler() {
  const actionsForCommand = $performingActionsOnCommand.get();
  if (!actionsForCommand) {
    errorMsg("No command selected.");
    return;
  }

  const webhookUrl = $currentCommandWebhook.get();
  if (!webhookUrl) {
    const commandName = actionsForCommand.name;
    const command = actionsForCommand.command;

    const [webhookUrl, error] = await createWebhook(commandName, command);
    if (error !== null) {
      errorMsg(error.message);
      return;
    }

    $currentCommandWebhook.set(webhookUrl);
    successMsg("Webhook created successfully.");
    return;
  }

  const [, error] = await deleteWebhook(actionsForCommand.name, actionsForCommand.command);
  if (error !== null) {
    errorMsg(error.message);
    return;
  }

  $currentCommandWebhook.set(null);
  successMsg("Webhook deleted successfully.");
}

async function deleteCommandHandler() {
  const actionsForCommand = $performingActionsOnCommand.get();
  if (!actionsForCommand) {
    errorMsg("No command selected.");
    return;
  }

  const commandName = actionsForCommand.name;
  const command = actionsForCommand.command;

  const confirm = await confirmDialog({
    title: "Delete Command",
    msg: `Are you sure you want to delete the command "${commandName}"?`,
    confirmLabel: "Delete",
    confirmBtnStyle: "danger",
    cancelLabel: "Cancel",
  });

  if (!confirm) return;

  const [, error] = await deleteCommand(commandName, command);
  if (error !== null) {
    errorMsg(error.message);
    return;
  }

  const [newCommandList, getCommandsListErr] = await getCommandsList();
  if (getCommandsListErr !== null) {
    errorMsg(getCommandsListErr.message);
    return;
  }

  $commands.set(newCommandList);

  actionDialog.dialog.close();
  successMsg("Command deleted successfully.");
}

async function getCommandWebhookUrl() {
  const actionsForCommand = $performingActionsOnCommand.get();
  if (!actionsForCommand) {
    errorMsg("No command selected.");
    return;
  }

  const [webhookUrl] = await getWebhook(actionsForCommand.name, actionsForCommand.command);
  $currentCommandWebhook.set(webhookUrl);
}

function copyWebhookUrlToClipboard() {
  const webhookUrl = $currentCommandWebhook.get();
  if (!webhookUrl) return;

  if (!navigator?.clipboard) {
    errorMsg("Clipboard not available");
    return;
  }

  navigator.clipboard.writeText(webhookUrl).then(() => successMsg("Copied to clipboard"));
}

function editCommandBtnHandler() {
  const actionsForCommand = $performingActionsOnCommand.get();
  if (!actionsForCommand) {
    errorMsg("No command selected.");
    return;
  }
  actionDialog.dialog.close();
  $editingCommand.set(actionsForCommand);
}
