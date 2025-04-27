import { getElement } from "@scripts/utils/utils";

type ConfirmDialogOptions = {
  title: string;
  msg: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmBtnStyle?: "primary" | "danger";
  cancelBtnStyle?: "primary" | "danger";
};

let confirmPromiseResolver: ((value: boolean | PromiseLike<boolean>) => void) | null = null;

const confirmDialogEls = {
  dialog: getElement<DialogComponent>("#confirm-dialog"),
  title: getElement<HTMLParagraphElement>(".confirm-dialog-title"),
  msg: getElement<HTMLParagraphElement>(".confirm-dialog-msg"),
  confirmBtn: getElement<HTMLButtonElement>("#confirm-dialog-confirm"),
  cancelBtn: getElement<HTMLButtonElement>("#confirm-dialog-cancel"),
};

export function initConfirmDialog() {
  confirmDialogEls.confirmBtn.addEventListener("click", dialogConfirmHandler);
  confirmDialogEls.cancelBtn.addEventListener("click", dialogCancelHandler);

  confirmDialogEls.dialog.addEventListener("close", () => {
    if (!confirmPromiseResolver) return;
    confirmPromiseResolver(false);
    confirmPromiseResolver = null;
  });
}

export async function confirmDialog(options: ConfirmDialogOptions) {
  const confirmPromise = new Promise<boolean>(resolve => {
    confirmPromiseResolver = resolve;
  });

  confirmDialogEls.title.textContent = options.title;
  confirmDialogEls.msg.textContent = options.msg;

  confirmDialogEls.confirmBtn.textContent = options.confirmLabel || "Confirm";
  confirmDialogEls.confirmBtn.classList.toggle(
    "danger-btn",
    options.confirmBtnStyle ? options.confirmBtnStyle === "danger" : false
  );

  confirmDialogEls.cancelBtn.textContent = options.cancelLabel || "Cancel";
  confirmDialogEls.cancelBtn.classList.toggle("danger-btn", options.cancelBtnStyle ? options.cancelBtnStyle === "danger" : false);

  confirmDialogEls.dialog.open();

  return confirmPromise;
}

function dialogConfirmHandler() {
  if (confirmPromiseResolver) {
    confirmPromiseResolver(true);
  }

  confirmDialogEls.dialog.close();
}

function dialogCancelHandler() {
  if (confirmPromiseResolver) {
    confirmPromiseResolver(false);
  }

  confirmDialogEls.dialog.close();
}
