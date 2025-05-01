/* eslint-disable @typescript-eslint/no-explicit-any */

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

type StyleObject = Record<keyof CSSStyleDeclaration, string | number>;

type Element = HTMLElement | SVGElement;

export function createElement(tag: string, props: Record<string, any>, ...children: Element[]) {
  props ??= {};

  const element = createNativeElement(tag) as Element;

  for (const [propKey, propValue] of Object.entries(props)) {
    // skip react nonsense
    if (propKey === "ref" || propKey === "key") {
      continue;
    }

    if (propKey === "style") {
      styleProp(element, propValue);
      continue;
    }

    if (propKey === "className" || propKey === "class") {
      const classList = propValue.split(" ").filter(Boolean);
      if (classList.length === 0) continue;
      element.classList.add(...classList);
      continue;
    }

    if (propKey.startsWith("on")) {
      attachEventListeners(element, propKey, propValue);
      continue;
    }

    setAttributes(element, propKey, propValue);
  }

  // string, Element, Element[]. and skipping falsy values
  for (const child of children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
      continue;
    }

    if (!child) continue;

    if (Array.isArray(child)) {
      for (let i = 0; i < child.length; i++) element.appendChild(child[i]);
      continue;
    }

    element.appendChild(child);
  }

  return element;
}

/**
 * - Set style properties on an element.
 * - It assumes that a number value is a `px` unit. be aware of that. for example : `flex: 1`
 */
function styleProp(element: Element, styles: StyleObject) {
  for (const [name, value] of Object.entries(styles)) {
    const val = typeof value === "number" ? `${value}px` : value;
    element.style[name as any] = val;
  }
}

/**
 * - Attach event listeners to an element for properties starting with `on`.
 * - `on` prefix is removed to match event listeners on DOM element.
 * - Attach multiple event listeners if the property value is an array.
 */
function attachEventListeners(element: Element, eventPropName: string, eventHandler: JSX.EventHandlers<Event>) {
  if (!eventHandler) return;
  eventPropName = eventPropName.replace(/^on/, "");

  if (Array.isArray(eventHandler)) {
    for (const handlerOrArray of eventHandler) {
      const isWithOptions = Array.isArray(handlerOrArray);
      const handler = isWithOptions ? handlerOrArray[0] : handlerOrArray;
      const options = isWithOptions ? handlerOrArray[1] : undefined;
      element.addEventListener(eventPropName, handler, options);
    }
    return;
  }

  element.addEventListener(eventPropName, eventHandler);
}

const namespaceTags = new Set([
  // SVG Tags
  "svg",
  "circle",
  "rect",
  "line",
  "path",
  "polygon",
  "polyline",
  "ellipse",
  "g",
  "defs",
  "symbol",
  "use",
  "text",
  "tspan",
  "textPath",
  "marker",
  "pattern",
  "clipPath",
  "mask",
  "filter",
  "feGaussianBlur",
  "feOffset",
  "feMerge",
  "feMergeNode",

  // MathML Tags
  "math",
  "mrow",
  "mfrac",
  "msqrt",
  "mroot",
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "msub",
  "msup",
  "msubsup",
  "munder",
  "mover",
  "munderover",
  "mmultiscripts",
  "mtable",
  "mtr",
  "mtd",
  "mstyle",
  "merror",
  "mpadded",
  "mphantom",
  "mfenced",
]);

/**
 * - Create a native DOM element
 * - React fragment `<></> is a document fragment
 */
function createNativeElement(tag: string) {
  if (tag === "fragment") {
    return document.createDocumentFragment();
  }

  // for namespaced elements
  if (namespaceTags.has(tag)) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  return document.createElement(tag);
}

/**
 * - Set the property directly in the element class if possible.
 * - Otherwise, set the attribute.
 */
function setAttributes(element: Element, propKey: string, propValue: any) {
  const isClassProp = isClassProperty(element, propKey);
  if (isClassProp) {
    //@ts-expect-error readonly shit
    element[propKey] = propValue;
    return;
  }

  element.setAttribute(propKey, String(propValue));
}

/**
 * - Check if the property is a valid class property
 * - A public property or a public setter
 */
function isClassProperty(obj: Element, propertyName: string): propertyName is keyof Mutable<Element> {
  const descriptorWritable = Object.getOwnPropertyDescriptor(obj, propertyName);
  if (descriptorWritable && descriptorWritable.writable) return true;

  // with getter and setter
  const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), propertyName);

  if (!descriptor || !descriptor.set) return false;

  // Check if it's a method (but allow arrow functions)
  const value = descriptor.value;
  if (typeof value === "function" && value.prototype !== undefined) {
    return false;
  }

  return true;
}
