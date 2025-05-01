export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function ImportCSS(relativeCssPath: string, metaUrl: string) {
  if (!metaUrl) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = new URL(relativeCssPath, metaUrl).pathname;
  document.head.appendChild(link);
}

export function errorMsg(msg: string, duration = 5000) {
  console.error(msg);
  const alertComponent = document.querySelector("alert-component");
  if (!alertComponent) return;
  alertComponent.alert({
    type: "error",
    message: msg,
    duration,
    closeBtn: true,
  });
}

export function successMsg(msg: string, duration = 5000) {
  console.log(msg);
  const alertComponent = document.querySelector("alert-component");
  if (!alertComponent) return;
  alertComponent.alert({
    type: "success",
    message: msg,
    duration,
    closeBtn: true,
  });
}

export function warningMsg(msg: string, duration = 5000) {
  console.warn(msg);
  const alertComponent = document.querySelector("alert-component");
  if (!alertComponent) return;
  alertComponent.alert({
    type: "warning",
    message: msg,
    duration,
    closeBtn: true,
  });
}

export function infoMsg(msg: string, duration = 5000) {
  console.info(msg);
  const alertComponent = document.querySelector("alert-component");
  if (!alertComponent) return;
  alertComponent.alert({
    type: "info",
    message: msg,
    duration,
    closeBtn: true,
  });
}

export function wrapInQuotes(str: string) {
  str = str.replace(/(["'])+/g, "$1"); // remove repeated quotes

  // No need for wrapping
  if (!str.includes(" ")) return str;

  const unescapedDoubleQuotesRe = /(^|[^\\])(?:\\\\)*(")/g;

  // it's safe to wrap with double quotes
  const hasUnescapedDoubleQuotes = unescapedDoubleQuotesRe.test(str);
  if (!hasUnescapedDoubleQuotes) return `"${str}"`;

  // it's safe to wrap with single quotes
  const hasUnescapedSingleQuotes = /(?:^|[^\\])(?:\\\\)*'/g.test(str);
  if (!hasUnescapedSingleQuotes) return `'${str}'`;

  // escape any existing unescaped double quotes
  const escapedDoubleQuotesStr = str.replace(unescapedDoubleQuotesRe, `$1\\$2`);

  return `"${escapedDoubleQuotesStr}"`;
}

export function getElement<T extends HTMLElement>(elementOrSelector: string | HTMLElement, selector?: string): T {
  const isFirstArgString = typeof elementOrSelector === "string";
  const baseEl = isFirstArgString ? document : elementOrSelector;

  const query = isFirstArgString ? elementOrSelector : selector;
  if (!query) {
    errorMsg("No query provided.");
    throw new Error("No query provided.");
  }

  const el = baseEl?.querySelector(query);
  if (!el) {
    errorMsg(`Element with selector ${elementOrSelector} not found.`);
    throw new Error(`Element with selector ${elementOrSelector} not found.`);
  }
  return el as T;
}
