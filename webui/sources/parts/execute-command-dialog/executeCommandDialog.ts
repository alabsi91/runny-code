import hljs from "highlight.js/lib/core";

import { executeCommand, type Command } from "@scripts/api/commands";
import { getWebhook } from "@scripts/api/webhooks";
import { errorMsg, getElement, successMsg, wrapInQuotes } from "@scripts/utils/utils";
import { createArgInput } from "./createArgInput";

export async function openExecuteCommandDialog(cmd: Command) {
  const cmdDialog = getElement<DialogComponent>("#exec-cmd-dialog");
  const execCmdBtn = getElement<HTMLButtonElement>(cmdDialog, "#execute-cmd");
  const outputEl = getElement(cmdDialog, "#cmd-output");
  const cmdDisplay = getElement(cmdDialog, "#cmd-display");
  const cmdDesc = getElement<HTMLParagraphElement>(cmdDialog, ".cmd-desc");
  const inputsContainer = getElement<HTMLFormElement>(cmdDialog, ".cmd-dialog-inputs-container");

  const abortController = new AbortController();
  const signal = abortController.signal;

  const cmdVariables = cmd.variables;
  const cmdStr = cmd.command;

  const args: { [key: string]: string } = {}; // to store the args from the inputs
  const formateCmd = () => {
    return cmdStr.replace(/\$\{(.+?)([:=?[].*?)?\}/g, (_, key) => {
      const value = args[key];
      if (!value) return "";
      return wrapInQuotes(value);
    });
  };

  inputsContainer.innerHTML = ""; // clear the previous inputs

  for (const variableObj of cmdVariables) {
    args[variableObj.name] = "";

    const inputFrag = createArgInput(variableObj);

    const onInput = (value: string) => {
      args[variableObj.name] = value;
      cmdDisplay.innerHTML = hljs.highlight(formateCmd(), { language: "bash" }).value;
    };

    inputFrag.onInput(onInput);

    if (variableObj.default) onInput(variableObj.default);

    inputsContainer.appendChild(inputFrag);
  }

  // display the command
  cmdDisplay.innerHTML = hljs.highlight(formateCmd(), { language: "bash" }).value;

  // display the command description
  cmdDesc.style.display = cmd.description ? "block" : "none";
  cmdDesc.innerHTML = `<strong>Description: </strong><span>${cmd.description}</span>`;

  // clean the previous cmd output
  outputEl.innerHTML = "Execute the command to see its output";
  outputEl.classList.remove("error", "success");

  const executeCmdButtonHandler = async () => {
    inputsContainer.reportValidity();
    execCmdBtn.disabled = true;

    const [output, error] = await executeCommand(cmd.command, cmd.name, args);
    const isSuccess = output !== null;

    if (isSuccess) successMsg("Command executed");
    else errorMsg("Command execution failed");

    execCmdBtn.disabled = false;

    outputEl!.classList.toggle("error", !isSuccess);
    outputEl!.classList.toggle("success", isSuccess);
    outputEl!.innerHTML = output ?? error.message;
  };

  // copy the webhook URL
  getWebhook(cmd.name, cmd.command).then(([webhookUrl, error]) => {
    const copyWebhookUrlBtn = getElement<HTMLButtonElement>(cmdDialog, "#copy-webhook-url");
    const copyWebhookUrlTooltip = getElement<TooltipComponent>(cmdDialog, "#copy-webhook-url-tooltip");

    if (error !== null) {
      copyWebhookUrlBtn.disabled = true;
      copyWebhookUrlTooltip.textContent = "Webhook is not enabled for this command.";
      return;
    }

    copyWebhookUrlBtn.disabled = false;
    copyWebhookUrlTooltip.textContent = "Copy the webhook URL with the currently entered arguments to the clipboard.";
    copyWebhookUrlBtn.addEventListener("click", () => copyWebhookUrlHandler(webhookUrl, args), { signal });
  });

  execCmdBtn.addEventListener("click", executeCmdButtonHandler, { signal });
  cmdDialog.addEventListener("close", () => abortController.abort(), { signal });
  cmdDialog.open();
}

function copyWebhookUrlHandler(baseUrl: string, args: { [key: string]: string }) {
  if (!navigator?.clipboard) {
    errorMsg("Clipboard not available");
    return;
  }

  const webhookUrl = new URL(baseUrl);
  Object.entries(args).forEach(([key, value]) => {
    webhookUrl.searchParams.append(key, String(value));
  });

  navigator.clipboard.writeText(webhookUrl.toString()).then(() => successMsg("Copied to clipboard"));
}
