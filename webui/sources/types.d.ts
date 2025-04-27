type CssLinear = {
  spring: (mass?: number, stiffness?: number, damping?: number, velocity?: number, duration?: number) => string;
  inCirc: () => string;
  inCubic: () => string;
  inExpo: () => string;
  inSine: () => string;
  inQuad: () => string;
  inQuart: () => string;
  inQuint: () => string;
  inBack: (c1?: number) => string;
  inBounce: () => string;
  inElastic: () => string;
  inPoly: (n: number) => string;
  inWobble: (bounciness: number) => string;
  outCirc: () => string;
  outCubic: () => string;
  outExpo: () => string;
  outSine: () => string;
  outQuad: () => string;
  outQuart: () => string;
  outQuint: () => string;
  outBack: (c1?: number) => string;
  outBounce: () => string;
  outElastic: () => string;
  outPoly: (n: number) => string;
  outWobble: (bounciness: number) => string;
  inOutCirc: () => string;
  inOutCubic: () => string;
  inOutExpo: () => string;
  inOutSine: () => string;
  inOutQuad: () => string;
  inOutQuart: () => string;
  inOutQuint: () => string;
  inOutBack: (c1?: number) => string;
  inOutBounce: () => string;
  inOutElastic: () => string;
  inOutPoly: (n: number) => string;
  inOutWobble: (bounciness: number) => string;
};

declare global {
  /** Whether `webp` is enabled */
  const _webp: boolean;

  /** If `webp` is enabled it will be `'.webp'` else `'.png'` */
  const _webp_png: ".webp" | ".png";

  /** If `webp` is enabled it will be `'.webp'` else `'.png'` */
  const _webp_jpg: ".webp" | ".jpg";

  /** If `webp` is enabled it will be `'.webp'` else `'.jpeg'` */
  const _webp_jpeg: ".webp" | ".jpeg";

  /** Whether the app is in production mode */
  const _production: boolean;

  /**
   * - Replace `cssLinear.[easeName](...args)` with a CSS linear function string `linear(...values)`.
   * - Useful for `element.animate(..., { easing: cssLinear.[easeName](...args) })`.
   */
  const cssLinear: CssLinear;

  /** - Import a file and inline it as a string at build time. */
  function import_as_string(
    filePath: string,
    options?: {
      /**
       * - Whether to wrap the inlined string in a template literal.
       * - **Default**: `false`
       */
      templateLiteral?: boolean;
      /**
       * - Whether to minify the string in case of the file is a html/css file.
       * - `process` should be set to `true`.
       * - Works only in `production` mode.
       * - **Default**: `false`
       */
      minify?: boolean;
      /**
       * - Whether to process the string in case of the file is a html/css file.
       * - **Overrides** `minify`
       * - **Default**: `true`
       */
      process?: boolean;
      /**
       * - A function to apply transformation to the imported string.
       * - Should passed by value and not a reference to another function.
       * - Should not contain a reference to anything outside of the function.
       * - It will be run at build time in the node environment.
       */
      onImport?: (str: string) => string;
    }
  ): string;
}

export {};
