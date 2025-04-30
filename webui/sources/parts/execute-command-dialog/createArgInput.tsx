import type { CommandVariable } from "../../scripts/api/commands";

type FragmentWithInput = DocumentFragment & {
  onInput: (listener: (value: string) => void) => void;
};

export function createArgInput(cmdVar: CommandVariable) {
  if (cmdVar.restricted && cmdVar.values.length > 0) return createSelectInput(cmdVar);
  if (cmdVar.type === "non-numeric") return createStringInput(cmdVar);
  if (cmdVar.type === "password") return createPasswordInput(cmdVar);
  if (cmdVar.type === "int" || cmdVar.type === "float" || cmdVar.type === "number") return createNumberInput(cmdVar);
  if (cmdVar.type === "boolean") return createCheckboxInput(cmdVar);
  if (cmdVar.type === "url") return createUrlInput(cmdVar);

  return createTextInput(cmdVar);
}

function createPasswordInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const input = (
    <input
      id={id}
      type="password"
      name={cmdVar.name}
      defaultValue={cmdVar.default}
      placeholder="<password>"
      required={!cmdVar.optional}
    />
  ) as HTMLInputElement;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {input}
    </>
  ) as FragmentWithInput;

  fragment.onInput = (listener: (value: string) => void) => {
    input.addEventListener("input", () => listener(input.value));
  };

  return fragment;
}

function createNumberInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const input = (
    <input
      id={id}
      type="number"
      name={cmdVar.name}
      autocomplete="off"
      defaultValue={cmdVar.default}
      placeholder={`<${cmdVar.type}>`} // int | float | number types
      required={!cmdVar.optional}
      pattern={cmdVar.type === "int" ? "^\\d+$" : cmdVar.type === "float" ? "^\\d+\\.\\d+$" : ""}
    />
  ) as HTMLInputElement;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {input}
    </>
  ) as FragmentWithInput;

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
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const input = (
    <input
      id={id}
      type="text"
      name={cmdVar.name}
      autocomplete="off"
      defaultValue={cmdVar.default}
      placeholder="<string>"
      required={!cmdVar.optional}
      pattern="[^0-9]+"
    />
  ) as HTMLInputElement;

  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = cmdVar.name;
  label.classList.toggle("required-input-label", !cmdVar.optional);

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {input}
    </>
  ) as FragmentWithInput;

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
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const input = (
    <input
      id={id}
      type="text"
      name={cmdVar.name}
      autocomplete="off"
      defaultValue={cmdVar.default}
      placeholder="<text>"
      required={!cmdVar.optional}
    />
  ) as HTMLInputElement;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {input}
    </>
  ) as FragmentWithInput;

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
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const input = (
    <input
      id={id}
      type="url"
      name={cmdVar.name}
      autocomplete="off"
      defaultValue={cmdVar.default}
      placeholder="<url>"
      required={!cmdVar.optional}
    />
  ) as HTMLInputElement;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {input}
    </>
  ) as FragmentWithInput;

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
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const menu = (
    <menu-component id={id} value={cmdVar.default ?? ""} name={cmdVar.name} class="cmd-input-menu" matchTriggerWidth={true}>
      {cmdVar.optional ? (
        <select-option label="<none>" value="">
          {"<none>"}
        </select-option>
      ) : null}

      {cmdVar.values.map(value => (
        <select-option label={value} value={value}>
          {value}
        </select-option>
      ))}
    </menu-component>
  ) as MenuComponent;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {menu}
    </>
  ) as FragmentWithInput;

  fragment.onInput = (listener: (value: string) => void) => {
    menu.addEventListener("pick", () => listener(menu.value));
  };

  return fragment;
}

function createCheckboxInput(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}`;

  const checkbox = (
    <toggle-checkbox id={id} name={cmdVar.name} value={cmdVar.default === "true" ? "true" : "false"} />
  ) as ToggleCheckbox;

  const fragment = (
    <>
      <label className={cmdVar.optional ? "" : "required-input-label"} htmlFor={id}>
        {cmdVar.name}
      </label>
      {checkbox}
    </>
  ) as FragmentWithInput;

  fragment.onInput = (listener: (value: string) => void) => {
    checkbox.addEventListener("change", () => listener(checkbox.value));
  };

  return fragment;
}

function createDataList(cmdVar: CommandVariable) {
  const id = `cmd-param-${cmdVar.name.toLowerCase().replace(/\s/g, "-")}-values`;

  const datalist = (<datalist id={id}></datalist>) as HTMLDataListElement;

  for (const value of cmdVar.values) {
    if (value === "*") continue;
    const option = (<option value={value} />) as HTMLOptionElement;
    datalist.appendChild(option);
  }

  return datalist;
}
