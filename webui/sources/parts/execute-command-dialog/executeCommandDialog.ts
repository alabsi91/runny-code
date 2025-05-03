import hljs from "highlight.js/lib/core";

import { executeCommand, executeCommandStream, type Command } from "@scripts/api/commands";
import { getWebhook } from "@scripts/api/webhooks";
import { errorMsg, getElement, successMsg, wrapInQuotes } from "@scripts/utils/utils";
import { createArgInput } from "./createArgInput";
import { $performingActionsOnCommand } from "~/sources/scripts/stores";

export async function openExecuteCommandDialog(cmd: Command) {
  const cmdDialog = getElement<DialogComponent>("#exec-cmd-dialog");
  const execCmdBtn = getElement<HTMLButtonElement>(cmdDialog, "#execute-cmd");
  const outputEl = getElement(cmdDialog, "#cmd-output");
  const cmdDisplay = getElement(cmdDialog, "#cmd-display");
  const cmdDesc = getElement<HTMLParagraphElement>(cmdDialog, ".cmd-desc");
  const inputsContainer = getElement<HTMLFormElement>(cmdDialog, ".cmd-dialog-inputs-container");
  const openActionBtn = getElement<HTMLButtonElement>(cmdDialog, ".cmd-dialog-open-action-btn");
  const streamOutputToggle = getElement<ToggleCheckbox>(cmdDialog, "#cmd-stream-output-toggle");

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

  // execute the command button handler
  const executeCmdButtonHandler = async () => {
    inputsContainer.reportValidity();
    execCmdBtn.disabled = true;

    const onDone = (msg: string, success: boolean) => {
      if (!success) errorMsg(msg);
      if (success) successMsg(msg);
      execCmdBtn.disabled = false;
      outputEl!.classList.toggle("error", !success);
      outputEl!.classList.toggle("success", success);
    };

    const useStreamOutput = streamOutputToggle.checked;

    if (!useStreamOutput) {
      const [output, error] = await executeCommand(cmd.command, cmd.name, args);
      if (error !== null) return onDone(error.message, false);
      if (output === "") return onDone("Command execution failed", false);

      outputEl!.innerHTML = output;
      execCmdBtn.disabled = false;
      successMsg("Command executed successfully");
      return;
    }

    const [response, error] = await executeCommandStream(cmd.command, cmd.name, args);
    if (error !== null) return onDone(error.message, false);

    const reader = response.body?.getReader();
    if (!reader) return onDone("Stream not supported in this environment", false);

    const decoder = new TextDecoder();
    let output = "";
    let errored = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const jsonOutput = decoder.decode(value, { stream: true });
      const { stdout, stderr } = JSON.parse(jsonOutput) as { stdout: string; stderr: string };

      output = stdout || stderr;
      errored = Boolean(stderr);
      outputEl!.innerHTML = output;
    }

    if (errored) return onDone("Command execution failed", false);

    onDone("Command executed successfully", true);
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

  const openActionBtnHandler = () => {
    $performingActionsOnCommand.set(cmd);
    cmdDialog.close();
  };

  execCmdBtn.addEventListener("click", executeCmdButtonHandler, { signal });
  cmdDialog.addEventListener("close", () => abortController.abort(), { signal });
  openActionBtn.addEventListener("click", openActionBtnHandler, { signal });
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
