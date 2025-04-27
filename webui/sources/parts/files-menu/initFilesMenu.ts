import { getFilesList } from "@scripts/api/files";
import { $selectedFilePath } from "@scripts/stores";
import { errorMsg } from "@scripts/utils/utils";

export async function initFilesMenu() {
  const filesMenu = document.querySelector<MenuComponent>("#files-menu");
  if (!filesMenu) {
    errorMsg("Could not find element with tag name `#files-menu`");
    return;
  }

  const [availableFiles, error] = await getFilesList();
  if (error !== null) {
    errorMsg(error.message);
    return;
  }

  for (const file of availableFiles) {
    const opt = document.createElement("select-option");
    opt.textContent = file;
    opt.data = { label: file, value: file };
    filesMenu.appendChild(opt);
  }

  filesMenu.refresh();

  filesMenu.addEventListener("pick", async () => {
    $selectedFilePath.set(filesMenu.value);
  });

  const menuSearch = document.querySelector<HTMLInputElement>("#files-menu-search");
  if (!menuSearch) {
    errorMsg("Could not find element with id `menu-search`");
    return;
  }

  // filter the menu by the search input
  menuSearch.addEventListener("input", () => {
    const search = menuSearch.value.toLowerCase();
    const options = filesMenu.querySelectorAll("select-option");
    for (const option of options) {
      option.style.display = option.value?.toLowerCase().includes(search) ? "block" : "none";
    }
  });

  // focus the search input on menu open
  filesMenu.addEventListener("open", () => setTimeout(() => menuSearch.focus(), 100));
}
