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
import { $selectedFilePath } from "~/sources/scripts/stores";

const codeEditorEls = {
  codeEditor: getElement<CodeEditor>("code-editor"),
  reloadFileBtn: getElement<HTMLButtonElement>("#code-editor-reload-btn"),
  editorTitle: getElement(".editor-header-title"),
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

  successMsg(`The file "${filePath}" loaded.`);
}
