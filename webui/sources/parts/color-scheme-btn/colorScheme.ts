import { $colorScheme } from "@scripts/stores";
import { getElement } from "@scripts/utils/utils";

export function initColorScheme() {
  const colorSchemeBtn = getElement("#color-scheme-btn");

  const getNextColorScheme = (colorScheme: "auto" | "light" | "dark") => {
    return colorScheme === "auto" ? "light" : colorScheme === "light" ? "dark" : "auto";
  };

  colorSchemeBtn.addEventListener("click", () => {
    const colorScheme = $colorScheme.get();
    const nextColorScheme = getNextColorScheme(colorScheme);
    $colorScheme.set(nextColorScheme);
  });

  $colorScheme.subscribe(colorScheme => {
    const lightIcon = getElement("#color-scheme-icon-light");
    const darkIcon = getElement("#color-scheme-icon-dark");
    const autoIcon = getElement("#color-scheme-icon-auto");

    lightIcon.style.display = colorScheme === "light" ? "block" : "none";
    darkIcon.style.display = colorScheme === "dark" ? "block" : "none";
    autoIcon.style.display = colorScheme === "auto" ? "block" : "none";

    const nextColorScheme = getNextColorScheme(colorScheme);
    colorSchemeBtn.ariaLabel = `Switch to ${nextColorScheme} mode`;
    colorSchemeBtn.title = `Switch to ${nextColorScheme} mode`;

    document.documentElement.style.colorScheme = colorScheme === "auto" ? "light dark" : colorScheme;
  });
}
