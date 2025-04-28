import { login } from "@scripts/api/auth";
import { errorMsg } from "@scripts/utils/utils";
import { initColorScheme } from "../../parts/color-scheme-btn/colorScheme";

initColorScheme();
loginHandler();

function loginHandler() {
  const form = document.querySelector<HTMLFormElement>("#loginForm");
  if (!form) {
    errorMsg("Could not find element with id `loginForm`");
    return;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(form!);
    const [, err] = await login(formData);

    if (err !== null) {
      errorMsg(err.message);
      return;
    }

    // redirect to home page
    window.location.href = "/";
  });
}
