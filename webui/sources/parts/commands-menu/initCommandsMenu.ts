import { $commands, $isCommandManipulationAllowed } from "@/scripts/stores";
import { openExecuteCommandDialog } from "@parts/execute-command-dialog/executeCommandDialog";
import { errorMsg, getElement } from "@scripts/utils/utils";
import { addOptionsToCommandsMenu } from "./addOptionsToMenu";

export async function initCommandsMenu() {
  const commandsMenu = getElement<MenuComponent>("#commands-menu");
  const menuSearch = getElement<HTMLInputElement>("#commands-menu-search");
  const openAddCommandDialogBtn = getElement<HTMLButtonElement>("#open-add-command-dialog-btn");

  $commands.subscribe(addOptionsToCommandsMenu);

  $isCommandManipulationAllowed.subscribe(isAllowed => {
    openAddCommandDialogBtn.style.display = isAllowed ? "block" : "none";
  });

  openAddCommandDialogBtn.addEventListener("click", addCommandBtnHandler);

  // update the code editor when a file is selected
  commandsMenu.addEventListener("pick", commandMenuSelectHandler);

  // filter the menu by the search input
  menuSearch.addEventListener("input", menuSearchHandler);

  // focus the search input on menu open
  commandsMenu.addEventListener("open", () => setTimeout(() => menuSearch.focus(), 100));
}

async function commandMenuSelectHandler() {
  const commandsMenu = getElement<MenuComponent>("#commands-menu");

  const selectedCmd = commandsMenu.value;
  commandsMenu.value = ""; // reset

  const cmd = $commands.get().find(cmd => cmd.command === selectedCmd);
  if (!cmd) return;

  await openExecuteCommandDialog(cmd);
}

function menuSearchHandler(e: Event) {
  const menuSearch = e.target;
  if (!menuSearch || menuSearch instanceof HTMLInputElement === false) {
    errorMsg("Search event target is not an input element");
    return;
  }

  const commandsMenu = getElement<MenuComponent>("#commands-menu");

  const search = menuSearch.value.toLowerCase();
  const options = commandsMenu.querySelectorAll("select-option");
  for (const option of options) {
    const match = option.label?.toLowerCase().includes(search);
    option.dataset.hidden = (!match).toString();
  }

  const groups = commandsMenu.querySelectorAll<HTMLDivElement>(".cmd-menu-group");
  for (const group of groups) {
    const isEmpty = !group.querySelector("select-option[data-hidden='false']");
    group.dataset.hidden = isEmpty.toString();
  }
}

function addCommandBtnHandler() {
  const commandsMenu = getElement<MenuComponent>("#commands-menu");
  const addCommandDialog = getElement<DialogComponent>("#add-command-dialog");

  commandsMenu.close();
  addCommandDialog.open();
}
