import type { CommandVariable } from "../../scripts/api/commands";

type FragmentWithInput = DocumentFragment & {
  onInput: (listener: (value: string) => void) => void;
};

export function createArgInput(cmdVar: CommandVariable) {
  if (cmdVar.restricted && cmdVar.values.length > 0) {
    return createSelectInput(cmdVar);
  }

  if (cmdVar.type === "non-numeric") {
    return createStringInput(cmdVar);
  }

  if (cmdVar.type === "password") {
    return createPasswordInput(cmdVar);
  }

  if (cmdVar.type === "int" || cmdVar.type === "float" || cmdVar.type === "number") {
    return createNumberInput(cmdVar);
  }

  if (cmdVar.type === "boolean") {
    return createCheckboxInput(cmdVar);
  }

  if (cmdVar.type === "url") {
    return createUrlInput(cmdVar);
  }

  return createTextInput(cmdVar);
}

function createPasswordInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const input = document.createElement("input");
  input.id = id;
  input.type = "password";
  input.name = cmdVar.name;
  input.defaultValue = cmdVar.default;
  input.placeholder = "<password>";
  input.required = !cmdVar.optional;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(input);
  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  return fragment;
}

function createNumberInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const input = document.createElement("input");
  input.id = id;
  input.name = cmdVar.name;
  input.type = "number";
  input.autocomplete = "off";
  input.defaultValue = cmdVar.default;
  input.placeholder = `<${cmdVar.type}>`; // int | float | number types
  input.required = !cmdVar.optional;
  input.pattern = cmdVar.type === "int" ? "^\\d+$" : cmdVar.type === "float" ? "^\\d+\\.\\d+$" : "";

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(input);
  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  if (!cmdVar.restricted && cmdVar.values.length > 0) {
    const datalist = createDataList(cmdVar);
    input.setAttribute("list", datalist.id);
    fragment.appendChild(datalist);
  }

  return fragment;
}

function createStringInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const input = document.createElement("input");
  input.id = id;
  input.name = cmdVar.name;
  input.type = "text";
  input.defaultValue = cmdVar.default;
  input.placeholder = "<string>";
  input.autocomplete = "off";
  input.required = !cmdVar.optional;
  input.pattern = "[^0-9]+"; // number are not allowed in string type

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(input);
  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  if (!cmdVar.restricted && cmdVar.values.length > 0) {
    const datalist = createDataList(cmdVar);
    input.setAttribute("list", datalist.id);
    fragment.appendChild(datalist);
  }

  return fragment;
}

function createTextInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const input = document.createElement("input");
  input.id = id;
  input.name = cmdVar.name;
  input.type = "text";
  input.defaultValue = cmdVar.default;
  input.placeholder = "<text>";
  input.autocomplete = "off";
  input.required = !cmdVar.optional;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(input);
  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  if (!cmdVar.restricted && cmdVar.values.length > 0) {
    const datalist = createDataList(cmdVar);
    input.setAttribute("list", datalist.id);
    fragment.appendChild(datalist);
  }

  return fragment;
}

function createUrlInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const input = document.createElement("input");
  input.id = id;
  input.name = cmdVar.name;
  input.type = "url";
  input.defaultValue = cmdVar.default;
  input.placeholder = "<url>";
  input.required = !cmdVar.optional;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(input);
  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  if (!cmdVar.restricted && cmdVar.values.length > 0) {
    const datalist = createDataList(cmdVar);
    input.setAttribute("list", datalist.id);
    fragment.appendChild(datalist);
  }

  return fragment;
}

function createSelectInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const menu = document.createElement("menu-component");
  menu.id = id;
  menu.setAttribute("name", cmdVar.name);
  menu.classList.add("cmd-input-menu");
  menu.matchTriggerWidth = true;

  if (cmdVar.optional) {
    const opt = document.createElement("select-option");
    opt.textContent = "<none>";
    opt.data = { label: "<none>", value: "" };
    menu.appendChild(opt);
  }

  for (const value of cmdVar.values) {
    const opt = document.createElement("select-option");
    opt.textContent = value;
    opt.data = { label: value, value: value };
    menu.appendChild(opt);
  }
  menu.refresh();
  if (cmdVar.default) menu.value = cmdVar.default;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(menu);
  fragment.onInput = (listener: (value: string) => void) => {
    menu.addEventListener("pick", () => listener(menu.value));
  };

  return fragment;
}

function createCheckboxInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name}`;

  const checkbox = document.createElement("toggle-checkbox");
  checkbox.id = id;
  checkbox.setAttribute("name", cmdVar.name);
  checkbox.value = cmdVar.default === "true" ? "true" : "false";

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = document.createDocumentFragment() as FragmentWithInput;
  fragment.appendChild(label);
  fragment.appendChild(checkbox);
  fragment.onInput = (listener: (value: string) => void) => {
    checkbox.addEventListener("change", () => listener(checkbox.value));
  };

  return fragment;
}

function createDataList(cmdVar: CommandVariable) {
  const datalist = document.createElement("datalist");
  datalist.id = `cmd-param-${cmdVar.name}-values`;

  for (const value of cmdVar.values) {
    if (value === "*") continue;
    const option = document.createElement("option");
    option.value = value;
    datalist.appendChild(option);
  }

  return datalist;
}
