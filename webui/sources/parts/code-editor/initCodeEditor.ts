import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import nginx from "highlight.js/lib/languages/nginx";
import shell from "highlight.js/lib/languages/shell";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";

import { readFile } from "@scripts/api/files";
import { errorMsg, getElement, successMsg } from "@scripts/utils/utils";
import { $colorScheme, $selectedFilePath } from "~/sources/scripts/stores";

const codeEditorEls = {
  codeEditor: getElement<CodeEditor>("code-editor"),
  reloadFileBtn: getElement<HTMLButtonElement>("#code-editor-reload-btn"),
  editorTitle: getElement(".editor-header-title"),
  codeStyleLight: getElement<HTMLStyleElement>(".code-highlight-light"),
  codeStyleDark: getElement<HTMLStyleElement>(".code-highlight-dark"),
};

export function initCodeEditor() {
  hljs.registerLanguage("nginx", nginx);
  hljs.registerLanguage("ts", typescript);
  hljs.registerLanguage("html", xml);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("md", markdown);
  hljs.registerLanguage("yaml", yaml);
  hljs.registerLanguage("go", go);
  hljs.registerLanguage("dockerfile", dockerfile);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("shell", shell);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("java", java);

  codeEditorEls.codeEditor.highlighter = codeHighlighter;
  codeEditorEls.codeEditor.addEventListener("copy-btn", () => successMsg("Copied to clipboard."));
  codeEditorEls.reloadFileBtn.addEventListener("click", updateCodeEditor);

  // update the code editor when a file is selected
  $selectedFilePath.listen(async newValue => {
    codeEditorEls.reloadFileBtn.style.display = newValue ? "block" : "none";
    if (newValue) await updateCodeEditor();
  });

  $colorScheme.subscribe(colorScheme => {
    if (colorScheme === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      codeEditorEls.codeEditor.stylesheet = isDark ? ".code-highlight-dark" : ".code-highlight-light";
      swapSiblingElements(codeEditorEls.codeStyleDark, codeEditorEls.codeStyleLight, isDark);
      return;
    }
    swapSiblingElements(codeEditorEls.codeStyleDark, codeEditorEls.codeStyleLight, colorScheme === "dark");
    codeEditorEls.codeEditor.stylesheet = colorScheme === "dark" ? ".code-highlight-dark" : ".code-highlight-light";
  });
}

function codeHighlighter(code: string) {
  return hljs.highlightAuto(code).value;
}

async function updateCodeEditor() {
  const filePath = $selectedFilePath.get();
  const [fileContent, error] = await readFile(filePath);
  if (error !== null) {
    errorMsg(error.message);
    return;
  }

  codeEditorEls.editorTitle.textContent = filePath;
  codeEditorEls.codeEditor.value = fileContent;
}

function swapSiblingElements(ElShouldBeFirst: HTMLElement, ElShouldBeSecond: HTMLElement, reverse = false) {
  const parent = ElShouldBeFirst.parentNode;
  if (!parent) return;

  const siblings = Array.from(parent.childNodes);
  const firstElementIndex = siblings.indexOf(ElShouldBeFirst);
  const secondElementIndex = siblings.indexOf(ElShouldBeSecond);
  if (firstElementIndex === -1 || secondElementIndex === -1) return;

  const firstElement = parent.removeChild(ElShouldBeFirst);
  const secondElement = parent.removeChild(ElShouldBeSecond);

  // Re-insert them in swapped order
  if (reverse) {
    parent.insertBefore(secondElement, parent.childNodes[firstElementIndex + 1]);
    parent.insertBefore(firstElement, parent.childNodes[secondElementIndex + 1]);
    return;
  }

  parent.insertBefore(firstElement, parent.childNodes[secondElementIndex + 1]);
  parent.insertBefore(secondElement, parent.childNodes[firstElementIndex + 1]);
}
