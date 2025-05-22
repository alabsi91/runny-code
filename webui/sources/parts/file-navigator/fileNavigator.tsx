import path from "path-browserify-esm";

import {
  createFile,
  createFolder,
  deletePath,
  downloadPath,
  readDir,
  moveToPath,
  uploadFiles,
  type File,
  type Folder,
} from "@scripts/api/files";
import { $files, $selectedFilePath } from "@scripts/stores";
import { errorMsg, getElement, infoMsg, successMsg, warningMsg } from "@scripts/utils/utils";
import { confirmDialog } from "../confirm-dialog/confirmDialog";

const elements = {
  aside: getElement<HTMLDivElement>(".file-navigator"),
  asideContent: getElement<HTMLDivElement>(".file-navigator .content"),
  resizeBtn: getElement<HTMLButtonElement>(".resize-navigator-btn"),
  layout: getElement<HTMLButtonElement>(".layout"),
  refreshBtn: getElement<HTMLButtonElement>(".file-navigator-refresh-btn"),
  collapseBtn: getElement<HTMLButtonElement>(".file-navigator-collapse-btn"),
  deleteArea: getElement<HTMLDivElement>(".file-navigator-drop-aria-container .delete-drop-aria"),
  downloadArea: getElement<HTMLDivElement>(".file-navigator-drop-aria-container .download-drop-aria"),
  toggleBtn: getElement<HTMLButtonElement>(".toggle-navigator-btn"),
  searchEl: getElement<HTMLInputElement>(".file-navigator-search"),
};

class FileNavigator {
  static availableIcons = new Map<string, string>([
    ["js", "js"],
    ["jsx", "js"],
    ["ts", "ts"],
    ["tsx", "ts"],
    ["css", "css"],
    ["html", "html"],
    ["xml", "html"],
    ["py", "py"],
    ["pyc", "py"],
    ["pyo", "py"],
    ["pyw", "py"],
    ["ipynb", "py"],
    ["go", "go"],
    ["md", "md"],
    ["mdx", "md"],
    ["svg", "svg"],
    ["swift", "swift"],
    ["sh", "sh"],
    ["env", "env"],
    ["java", "java"],
    ["class", "java"],
    ["json", "json"],
    ["png", "img"],
    ["webp", "img"],
    ["jpg", "img"],
    ["jpeg", "img"],
    ["gif", "img"],
    ["bmp", "img"],
    ["tif", "img"],
    ["tiff", "img"],
    ["yaml", "yaml"],
    ["yml", "yaml"],
    ["conf", "conf"],
    ["mp4", "video"],
    ["mkv", "video"],
    ["mov", "video"],
    ["avi", "video"],
    ["wmv", "video"],
    ["flv", "video"],
    ["webm", "video"],
    ["3gp", "video"],
    ["mpeg", "video"],
    ["mpg", "video"],
    ["m4v", "video"],
    ["ogv", "video"],
    ["vob", "video"],
    ["mxf", "video"],
    ["mp3", "audio"],
    ["wav", "audio"],
    ["flac", "audio"],
    ["aac", "audio"],
    ["m4a", "audio"],
    ["ogg", "audio"],
    ["wma", "audio"],
    ["alac", "audio"],
    ["aiff", "audio"],
    ["pcm", "audio"],
    ["amr", "audio"],
    ["opus", "audio"],
    ["mid", "audio"],
    ["midi", "audio"],
    ["caf", "audio"],
    ["docx", "doc"],
    ["doc", "doc"],
    ["pdf", "doc"],
    ["txt", "doc"],
    ["rtf", "doc"],
    ["odt", "doc"],
    ["tex", "doc"],
    ["csv", "doc"],
    ["xls", "doc"],
    ["xlsx", "doc"],
    ["ppt", "doc"],
    ["pptx", "doc"],
    ["epub", "doc"],
    ["pages", "doc"],
    ["wps", "doc"],
    ["wpd", "doc"],
    ["key", "doc"],
    ["file", "file"],
  ]);

  /** Keep track what folders are opened to preserve state */
  openedFolders = new Set<string>();

  constructor() {
    // saved layout size
    const fileNavigatorWidth = localStorage.getItem("file-navigator-width");
    if (fileNavigatorWidth) elements.layout.style.gridTemplateColumns = `${fileNavigatorWidth} 1fr`;

    // on files update
    $files.subscribe(files => {
      if (!files) return;
      this.render(files);
    });

    // on file selection
    $selectedFilePath.listen(path => {
      const allFileEls = elements.aside.querySelectorAll<HTMLButtonElement>(".file");
      for (const fileEl of allFileEls) {
        if (fileEl.dataset.path === path) {
          fileEl.classList.add("selected");
          continue;
        }
        fileEl.classList.remove("selected");
      }
    });

    // search
    elements.searchEl.addEventListener("input", this.searchHandler);

    // toggle navigator
    elements.toggleBtn.addEventListener("click", this.toggle);

    // delete drop area
    elements.deleteArea.addEventListener("dragover", e => {
      e.preventDefault();
      elements.deleteArea.classList.add("drag-over");
    });
    elements.deleteArea.addEventListener("dragleave", () => {
      elements.deleteArea.classList.remove("drag-over");
    });
    elements.deleteArea.addEventListener("drop", this.deleteAriaDropHandler);

    // download drop area
    elements.downloadArea.addEventListener("dragover", e => {
      e.preventDefault();
      elements.downloadArea.classList.add("drag-over");
    });
    elements.downloadArea.addEventListener("dragleave", () => {
      elements.downloadArea.classList.remove("drag-over");
    });
    elements.downloadArea.addEventListener("drop", this.downloadAriaDropHandler);
  }

  /** - Toggles the file navigator with animation */
  toggle = () => {
    elements.layout.style.transition = "grid-template-columns var(--anim-duration-md) ease-in-out";

    const isClosing = !elements.aside.classList.contains("closed");
    elements.aside.classList.toggle("closed");

    if (isClosing) {
      elements.layout.style.removeProperty("grid-template-columns");
    } else {
      const fileNavigatorWidth = localStorage.getItem("file-navigator-width");
      if (fileNavigatorWidth) elements.layout.style.gridTemplateColumns = `${fileNavigatorWidth} 1fr`;
    }

    elements.aside.addEventListener("transitionend", e => {
      if (e.target !== elements.aside) return;
      elements.layout.style.removeProperty("transition");

      if (isClosing) return;
    });
  };

  /**
   * - Creates a new folder with predefined name. E.g. `New Folder`
   * - Adds the new folder element to the parent folder.
   * - Starts the folder renaming process
   */
  newFolderButtonHandler = async (e: MouseEvent) => {
    e.stopPropagation();

    const btn = e.currentTarget as HTMLButtonElement;
    if (!btn) return;

    let target = btn.parentElement as AccordionComponent | null;
    while (target && target !== document.body && target.dataset.path === undefined) {
      target = target.parentElement as AccordionComponent | null;
    }
    if (!target) return;

    const createAt = target.dataset.path!;

    const [createdPath, error] = await createFolder(createAt);
    if (error !== null) {
      errorMsg(error.message);
      return;
    }

    const newFolder: Folder = {
      name: path.basename(createdPath),
      path: createdPath,
      files: [],
      folders: [],
      isEmpty: true,
    };

    target.open();
    const newFolderEl = this.createFolderEl(newFolder, false);
    target.appendChild(newFolderEl);

    const editableEl = newFolderEl.querySelector<HTMLSpanElement>(".editable");
    if (!editableEl) return;
    this.startRenaming(newFolderEl, editableEl);
  };

  /**
   * - Creates a new file with predefined name. E.g. `New File`
   * - Adds the new file element to the parent folder.
   * - Starts the file renaming process
   */
  newFileButtonHandler = async (e: MouseEvent) => {
    e.stopPropagation();

    const btn = e.currentTarget as HTMLButtonElement;
    if (!btn) return;

    let target = btn.parentElement as AccordionComponent | null;
    while (target && target !== document.body && target.dataset.path === undefined) {
      target = target.parentElement as AccordionComponent | null;
    }
    if (!target) return;

    const createAt = target.dataset.path!;

    const [createdPath, error] = await createFile(createAt);
    if (error !== null) {
      errorMsg(error.message);
      return;
    }

    const newFile: File = {
      name: path.basename(createdPath),
      path: createdPath,
    };

    target.open();
    const newFileEl = this.createFileEl(newFile);
    target.appendChild(newFileEl);

    const editableEl = newFileEl.querySelector<HTMLSpanElement>(".editable");
    if (!editableEl) return;

    this.startRenaming(newFileEl, editableEl);
  };

  /** - Creates a folder element and returns it */
  createFolderEl(content: Folder, isRoot = false) {
    const folderName = content.name;

    const onstateChange = () => {
      this.openedFolders[accordionEl.isExpanded ? "add" : "delete"](content.path);
    };

    const ondragstart = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.clearData();
      e.dataTransfer.setData("text/plain", content.path);
      elements.deleteArea.classList.add("show");
      elements.downloadArea.classList.add("show");
    };

    const ondragend = () => {
      elements.deleteArea.classList.remove("show");
      elements.downloadArea.classList.remove("show");
    };

    const accordionEl = (
      <accordion-component
        className={["folder", content.isEmpty ? "empty" : ""]}
        data-name={folderName}
        data-path={content.path}
        tabIndex={0}
        initialState={isRoot || this.openedFolders.has(content.path) ? "open" : "closed"}
        onkeyup={[this.keyPressRename, this.keyPressCancelRename]}
        ondblclick={this.doubleClickRename}
        ondragover={this.dragOverHandler}
        ondragleave={this.dragLeaveHandler}
        ondrop={this.dargDropHandler}
        onstatechange={onstateChange}
      >
        <div
          className="summary"
          slot="summary"
          draggable={!isRoot}
          ondragstart={!isRoot ? ondragstart : undefined}
          ondragend={ondragend}
        >
          <img className="folder-icon" src="./sources/assets/icons/folder.svg" alt="folder" aria-hidden="true" />
          <p class="editable" onfocusout={!isRoot ? this.onBlurCancelRename : undefined} onkeydown={this.cancelNewLine}>
            {folderName}
          </p>
          <button className="add-btn" aria-label="Create new file" title="Create new file" onclick={this.newFileButtonHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
              <path d="M440-360v80q0 17 11.5 28.5T480-240q17 0 28.5-11.5T520-280v-80h80q17 0 28.5-11.5T640-400q0-17-11.5-28.5T600-440h-80v-80q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v80h-80q-17 0-28.5 11.5T320-400q0 17 11.5 28.5T360-360h80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-440H560q-17 0-28.5-11.5T520-640ZM240-800v200-200 640-640Z" />
            </svg>
          </button>
          <button
            className="add-btn"
            aria-label="Create new folder"
            title="Create new folder"
            onclick={this.newFolderButtonHandler}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Zm400-160v40q0 17 11.5 28.5T600-320q17 0 28.5-11.5T640-360v-40h40q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480h-40v-40q0-17-11.5-28.5T600-560q-17 0-28.5 11.5T560-520v40h-40q-17 0-28.5 11.5T480-440q0 17 11.5 28.5T520-400h40Z" />
            </svg>
          </button>
        </div>
      </accordion-component>
    ) as AccordionComponent;

    return accordionEl;
  }

  /** Creates file element and returns it */
  createFileEl(file: File) {
    const dragstart = (e: DragEvent) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.clearData();
      e.dataTransfer.setData("text/plain", file.path);
      elements.deleteArea.classList.add("show");
      elements.downloadArea.classList.add("show");
    };
    const dragend = () => {
      elements.deleteArea.classList.remove("show");
      elements.downloadArea.classList.remove("show");
    };

    // file icon
    const ext = file.name.split(".").pop() ?? "";
    const svgName = FileNavigator.availableIcons.get(ext) ?? "file";

    const fileEl = (
      <button
        className={["file", file.path === $selectedFilePath.get() ? "selected" : ""]}
        data-path={file.path}
        data-name={file.name}
        tabIndex={0}
        draggable={true}
        onclick={this.fileClickHandler}
        ondblclick={this.doubleClickRename}
        onkeyup={[this.keyPressRename, this.keyPressCancelRename]}
        ondragstart={dragstart}
        ondragend={dragend}
      >
        <img className="file-icon" src={"./sources/assets/icons/" + svgName + ".svg"} alt={svgName} />
        <span className="editable" onfocusout={this.onBlurCancelRename} onkeydown={this.cancelNewLine}>
          {file.name}
        </span>
      </button>
    ) as HTMLButtonElement;

    return fileEl;
  }

  /**
   * - Adds a class to the folder when dragging over it
   * - Opens closed folders when dragging over them after a specified delay
   */
  dragOverHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const accordionEl = e.currentTarget as AccordionComponent | null;
    if (!accordionEl) return;

    accordionEl.classList.add("drag-over");

    if (accordionEl.isExpanded) return;

    setTimeout(() => {
      if (!accordionEl.classList.contains("drag-over")) return;
      accordionEl.open();
      const path = accordionEl.dataset.path;
      if (!path) return;
      this.openedFolders.add(path);
    }, 1000);
  };

  /** Removes a class from the folder when dragging leaves it */
  dragLeaveHandler = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const accordionEl = e.currentTarget as AccordionComponent | null;
    if (!accordionEl) return;

    accordionEl.classList.remove("drag-over");
  };

  /**
   * - Moves the dragged file/folder to the target folder
   * - Refetch and re-renders the file navigator
   * - Updates the selected file path if effected
   */
  dargDropHandler = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer) return;

    const accordionEl = e.currentTarget as AccordionComponent | null;
    if (!accordionEl) return;

    accordionEl.classList.remove("drag-over");

    const toPath = accordionEl.dataset.path;
    const fromPath = e.dataTransfer.getData("text");
    const files = e.dataTransfer?.files;

    // upload files
    if (files && files.length && toPath) {
      infoMsg(`Dropped ${files.length} file${files.length > 1 ? "s" : ""}, uploading...`);

      const [res, error] = await uploadFiles(files, toPath);
      if (error !== null) return errorMsg(error.message);
      if (res.warnings.length) {
        warningMsg(res.warnings.join("\n"), -1);
      } else {
        successMsg(`Uploaded ${files.length} file${files.length > 1 ? "s" : ""}`);
      }

      this.refreshFiles();
      return;
    }

    if (!fromPath || !toPath) return errorMsg("No path provided.");

    const withName = path.join(toPath, path.basename(fromPath));
    const [res, error] = await moveToPath(fromPath, withName);
    if (error !== null) return errorMsg(error.message);
    if (res.warning) warningMsg(res.warning, -1);

    this.refreshFiles();

    // if the moved file is opened with code editor
    const selectedFilePath = $selectedFilePath.get();
    if (!selectedFilePath.startsWith(fromPath)) return;

    const name = path.basename(fromPath);
    const newSelectedPath = selectedFilePath.replace(fromPath.replace(/\/$/, ""), path.join(toPath, name)).replace(/^\//, "");

    $selectedFilePath.set(newSelectedPath);
  };

  /**
   * - Deletes the dropped file/folder
   * - Refetch and re-renders the file navigator
   * - Updates the selected file path if effected
   */
  deleteAriaDropHandler = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer) return;
    const pathToDelete = e.dataTransfer.getData("text");

    const confirm = await confirmDialog({
      title: "Delete",
      msg: `Are you sure you want to delete: "${pathToDelete}"?`,
      confirmLabel: "Delete",
      confirmBtnStyle: "danger",
      cancelLabel: "Cancel",
    });

    if (!confirm) return;

    const [, error] = await deletePath(pathToDelete);
    if (error !== null) return errorMsg(error.message);

    this.refreshFiles();

    const selectedFilePath = $selectedFilePath.get();
    if (!selectedFilePath.startsWith(pathToDelete)) return;

    $selectedFilePath.set("");
  };

  /** - Download the dropped file/folder */
  downloadAriaDropHandler = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer) return;
    const pathToDownload = e.dataTransfer.getData("text");

    const [response, error] = await downloadPath(pathToDownload);
    if (error !== null) return errorMsg(error.message);

    // Extract the file name from the Content-Disposition header
    const contentDisposition = response.headers.get("Content-Disposition");
    let fileName = path.basename(pathToDownload); // Default

    if (contentDisposition) {
      const matches = contentDisposition.match(/filename=['"]?(.+)['"]?/);
      if (matches && matches[1]) fileName = matches[1];
    }

    const blob = await response.blob();

    // Create a link element to trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName; // You can specify a different filename if needed
    link.click();

    // Cleanup the URL object
    URL.revokeObjectURL(url);
  };

  searchHandler = async (e: Event) => {
    const rootFolder = $files.get();

    const searchStr = (e.currentTarget as HTMLInputElement)?.value?.trim();
    if (!searchStr) {
      this.render(rootFolder);
      return;
    }

    let filteredRootFolder = structuredClone(rootFolder);

    const filterFolders = (folder: Folder, isRoot = false) => {
      folder.files = folder.files.filter(file => file.name.toLowerCase().includes(searchStr.toLowerCase()));
      folder.folders = folder.folders.filter(f => filterFolders(f));
      if (!folder.files.length && !folder.folders.length && !isRoot) return null;
      return folder;
    };

    filteredRootFolder = filterFolders(filteredRootFolder, true)!;
    this.render(filteredRootFolder);

    // open expand all folders
    const expandAll = document.querySelectorAll<AccordionComponent>(".file-navigator .folder");
    expandAll.forEach(el => el.open());
  };

  /** Starts the file renaming process on key press (Enter/F2) */
  keyPressRename = async (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== "F2") return;
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLButtonElement | null;
    if (!target) return;

    const editable = target.querySelector<HTMLSpanElement>(".editable");
    if (!editable) return;

    await this.startRenaming(target, editable);
  };

  /** Starts the file renaming process on double click */
  doubleClickRename = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const target = e.currentTarget as HTMLButtonElement | null;
    if (!target) return;

    const editable = target.querySelector<HTMLSpanElement>(".editable");
    if (!editable) return;

    await this.startRenaming(target, editable);
  };

  /**
   * Starts the file renaming process if not in editing mode
   *
   * - Makes the `.editable` element editable and selects its content
   *
   * Submits the file renaming process if in editing mode
   *
   * - If the name didn't change, cancels the editing process
   * - If the name changed, moves the file to the new path
   * - If the file has been moved, updates the selected file path
   */
  startRenaming = async (target: HTMLElement, editable: HTMLSpanElement) => {
    // submit editing
    if (editable.contentEditable === "true") {
      const oldName = target.dataset.name ?? "";
      const newName = editable.textContent ?? "";
      if (oldName === newName || !newName) {
        this.cancelEditing(target, editable);
        return;
      }

      const fromPath = target.dataset.path!;
      const toPath = path.join(path.dirname(fromPath), newName);

      const [res, error] = await moveToPath(fromPath, toPath);
      if (error !== null) {
        this.cancelEditing(target, editable);
        errorMsg(error.message);
        return;
      }
      if (res.warning) warningMsg(res.warning, -1);

      this.refreshFiles();

      const selectedFilePath = $selectedFilePath.get();
      if (!selectedFilePath.startsWith(fromPath)) return;

      const newSelectedPath = selectedFilePath.replace(fromPath.replace(/\/$/, ""), toPath);
      $selectedFilePath.set(newSelectedPath);
      return;
    }

    // start editing
    editable.contentEditable = "true";
    editable.focus();

    const selection = window.getSelection();
    if (!selection) return;

    const fileName = target.dataset.name;
    if (!fileName) return;
    const ext = path.extname(fileName);

    const range = document.createRange();
    range.setStart(editable.firstChild!, 0);
    range.setEnd(editable.firstChild!, fileName.length - ext.length);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  /**
   * - Makes the `.editable` element non-editable
   * - Restores the original name
   * - Removes selection
   */
  cancelEditing = (parentEl: HTMLElement, editable: HTMLSpanElement) => {
    if (editable.contentEditable !== "true") return;

    editable.contentEditable = "false";
    editable.textContent = parentEl.dataset.name ?? "";

    // remove selection
    const selection = window.getSelection();
    if (selection) selection.removeAllRanges();
  };

  /** Cancels the file renaming process on key press (Escape) */
  keyPressCancelRename = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;

    const target = e.currentTarget as HTMLButtonElement | null;
    if (!target) return;

    const editable = target.querySelector<HTMLSpanElement>(".editable");
    if (!editable) return;

    this.cancelEditing(target, editable);
  };

  /** Cancels the file renaming process on blur (focusout) */
  onBlurCancelRename = (e: FocusEvent) => {
    const editable = e.currentTarget as HTMLSpanElement | null;
    if (!editable) return;

    let target: HTMLElement | null = editable.parentElement;
    while (target && target !== document.body && target.dataset.path === undefined) {
      target = target.parentElement;
    }
    if (!target) return;

    this.cancelEditing(target, editable);
  };

  /** Prevents new line (Enter) while renaming on key press (Enter) */
  cancelNewLine = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const target = e.currentTarget as HTMLInputElement;
    if (target?.contentEditable === "true") e.preventDefault();
  };

  /** Selects a file on click */
  fileClickHandler(e: MouseEvent) {
    const target = e.currentTarget as HTMLButtonElement;
    const path = target.dataset.path;
    if (path) $selectedFilePath.set(path);
  }

  /** Refetch files list causing re-render */
  async refreshFiles() {
    const [availableFiles, getFilesListError] = await readDir("");
    if (getFilesListError !== null) {
      errorMsg(getFilesListError.message);
      throw getFilesListError;
    }

    $files.set(availableFiles);
  }

  /** Collapses all opened folders */
  collapseFolders = () => {
    this.openedFolders.clear();
    elements.asideContent.querySelectorAll("accordion-component").forEach((el, i) => {
      if (i === 0) return; // root folder
      el.close();
    });
  };

  /** Renders a folders and files elements recursively */
  recursiveRender(folder: Folder, isRoot: boolean) {
    const rootFolderEl = this.createFolderEl(folder, isRoot);

    const renderNested = async () => {
      const [folderContent, error] = await readDir(folder.path);
      if (error !== null) {
        errorMsg(error.message);
        return;
      }

      folder.folders = folderContent.folders;
      folder.files = folderContent.files;

      for (const entry of folder.folders) {
        const folderEl = this.recursiveRender(entry, false);
        rootFolderEl.appendChild(folderEl);
      }

      for (const file of folder.files) {
        const fileEl = this.createFileEl(file);
        rootFolderEl.appendChild(fileEl);
      }
    };

    // render opened folders content immediately
    if (rootFolderEl.initialState === "open") {
      renderNested();
    } else if (!folder.isEmpty) {
      // render folder content when the folder is opened
      rootFolderEl.addEventListener("statechange", renderNested, { once: true });
    }

    return rootFolderEl;
  }

  /** Renders the file navigator */
  async render(rootFolder: Folder) {
    // clear
    const filesFolderEl = elements.asideContent.querySelector(":scope > accordion-component");
    if (filesFolderEl) filesFolderEl.remove();

    const folderEl = this.recursiveRender(rootFolder, true);
    elements.asideContent.appendChild(folderEl);
  }
}

export function initFileNavigator() {
  const fileNavigator = new FileNavigator();

  elements.resizeBtn.addEventListener("pointerdown", resizePointerDownHandler);
  document.addEventListener("pointerup", resizePointerUpHandler);

  elements.refreshBtn.addEventListener("click", fileNavigator.refreshFiles);
  elements.collapseBtn.addEventListener("click", fileNavigator.collapseFolders);
}

let isResizing = false;
function resizePointerDownHandler() {
  isResizing = true;
  document.addEventListener("pointermove", resizeHandler);
}

function resizePointerUpHandler() {
  document.removeEventListener("pointermove", resizeHandler);

  // save width
  if (!isResizing) return;
  isResizing = false;
  const fileNavigatorWidth = getComputedStyle(elements.aside).width;
  const widthFloat = parseFloat(fileNavigatorWidth);
  if (!widthFloat || isNaN(widthFloat) || !isFinite(widthFloat)) return;
  if (widthFloat < 150 || widthFloat > window.innerWidth * 0.9) return;
  localStorage.setItem("file-navigator-width", fileNavigatorWidth);
}

function resizeHandler(e: PointerEvent) {
  const max = window.innerWidth * 0.9;
  const min = 150;
  const size = e.clientX > max ? max : e.clientX < min ? min : e.clientX;
  const btnWidth = elements.resizeBtn.clientWidth;
  elements.layout.style.gridTemplateColumns = `${size + btnWidth / 2}px 1fr`;
}
