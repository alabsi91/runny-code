/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Child, Component, Element, OmitReadonlyProps, StyleObject } from "./jsx-runtime-types.d.ts";

export function jsx(tagOrComponent: string | Component, childrenAndProps: { children: Child | Child[]; [key: string]: any }) {
  if (typeof tagOrComponent === "function") return tagOrComponent(childrenAndProps);

  const { children, ...props } = childrenAndProps;

  const element = createNativeElement(tagOrComponent);
  if (element instanceof DocumentFragment) return element;

  for (const [propKey, propValue] of Object.entries(props)) {
    if (propKey === "ref" || propKey === "key") continue;

    if (propKey === "style") {
      styleProp(element, propValue);
      continue;
    }

    if (propKey === "className" || propKey === "class") {
      void (Array.isArray(propValue)
        ? element.classList.add(...propValue.filter(Boolean))
        : element.setAttribute("class", propValue));
      continue;
    }

    if (propKey === "setInnerHTML") {
      element.innerHTML = propValue;
      continue;
    }

    if (propKey.startsWith("on")) {
      attachEventListeners(element, propKey, propValue);
      continue;
    }

    setAttributes(element, propKey, propValue);
  }

  handleChild(children).forEach(n => element.appendChild(n));

  return element;
}

function handleChild(child: Child | Child[]): Node[] {
  if (typeof child === "string") return [document.createTextNode(child)];
  if (!child) return [];
  if (child instanceof Element) return [child];
  if (Array.isArray(child)) return child.flatMap(handleChild);
  return [];
}

function styleProp(element: HTMLElement | MathMLElement | SVGElement, styles: StyleObject) {
  for (const [name, value] of Object.entries(styles)) {
    const val = typeof value === "number" ? `${value}px` : value;
    element.style[name as keyof StyleObject] = val;
  }
}

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

// prettier-ignore
const svgNamespaces = new Set(["svg","circle","rect","line","path","polygon","polyline","ellipse","g","defs","symbol","use","text","tspan","textPath","marker","pattern","clipPath","mask","filter","feGaussianBlur","feOffset","feMerge","feMergeNode"]);
// prettier-ignore
const mathMlNamespaces = new Set(["math","mrow","mfrac","msqrt","mroot","mi","mo","mn","ms","mtext","msub","msup","msubsup","munder","mover","munderover","mmultiscripts","mtable","mtr","mtd","mstyle","merror","mpadded","mphantom","mfenced"]);

function createNativeElement(tag: string): Element {
  if (tag === "fragment") return document.createDocumentFragment();
  if (svgNamespaces.has(tag)) return document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (mathMlNamespaces.has(tag)) return document.createElementNS("http://www.w3.org/1998/Math/MathML", tag);
  return document.createElement(tag);
}

function setAttributes(element: HTMLElement | MathMLElement | SVGElement, propKey: string, propValue: any) {
  const isClassProp = isClassProperty(element, propKey);
  if (isClassProp) {
    element[propKey] = propValue;
    return;
  }
  element.setAttribute(propKey, String(propValue));
}

function isClassProperty(obj: Element, propertyName: string): propertyName is keyof OmitReadonlyProps<Element> {
  // Check if the property exists directly on the object and is writable
  const descriptorWritable = Object.getOwnPropertyDescriptor(obj, propertyName);
  if (descriptorWritable?.writable) return true;

  // with getter and no setter
  const protoDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), propertyName);
  if (!protoDescriptor || !protoDescriptor.set) return false;

  return true;
}

export const Fragment = "fragment";
export const jsxs = jsx;
