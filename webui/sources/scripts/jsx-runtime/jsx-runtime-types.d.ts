/* eslint-disable @typescript-eslint/no-explicit-any */

/** - Omit readonly properties to get only the writable properties */
export type OmitReadonlyProps<T> = Pick<
  T,
  { [K in keyof T]: IfEquals<{ [Q in K]: T[K] }, { -readonly [Q in K]: T[K] }, K, never> }[keyof T]
>;
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

export type StyleObject = {
  [key in keyof Omit<
    CSSStyleDeclaration,
    | typeof Symbol.iterator
    | number
    | "item"
    | "setProperty"
    | "removeProperty"
    | "getPropertyValue"
    | "getPropertyPriority"
    | "length"
    | "parentRule"
  >]: string | number;
};

export type Element = HTMLElement | SVGElement | MathMLElement | DocumentFragment;

export type Component = (props: Record<string, any>) => Element;

export type Child = Element | string | undefined | null;
