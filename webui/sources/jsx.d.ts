/* eslint-disable @typescript-eslint/no-explicit-any */

type Booleanish = boolean | "true" | "false";

type DomElement = Element;

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      key?: any;
    }

    interface ElementAttributesProperty {
      props: any;
    }

    interface ElementChildrenAttribute {
      children: any;
    }

    type DOMCSSProperties = {
      [key in keyof Omit<
        CSSStyleDeclaration,
        "item" | "setProperty" | "removeProperty" | "getPropertyValue" | "getPropertyPriority"
      >]?: string | number | null | undefined;
    };
    type AllCSSProperties = {
      [key: string]: string | number | null | undefined;
    };
    interface CSSProperties extends AllCSSProperties, DOMCSSProperties {
      cssText?: string | null;
    }

    interface SVGAttributes extends HTMLAttributes {
      accentHeight?: number | string | undefined;
      accumulate?: "none" | "sum" | undefined;
      additive?: "replace" | "sum" | undefined;
      alignmentBaseline?:
        | "auto"
        | "baseline"
        | "before-edge"
        | "text-before-edge"
        | "middle"
        | "central"
        | "after-edge"
        | "text-after-edge"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical"
        | "inherit"
        | undefined;
      "alignment-baseline"?:
        | "auto"
        | "baseline"
        | "before-edge"
        | "text-before-edge"
        | "middle"
        | "central"
        | "after-edge"
        | "text-after-edge"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical"
        | "inherit"
        | undefined;
      allowReorder?: "no" | "yes" | undefined;
      "allow-reorder"?: "no" | "yes" | undefined;
      alphabetic?: number | string | undefined;
      amplitude?: number | string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
      arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
      "arabic-form"?: "initial" | "medial" | "terminal" | "isolated" | undefined;
      ascent?: number | string | undefined;
      attributeName?: string | undefined;
      attributeType?: string | undefined;
      azimuth?: number | string | undefined;
      baseFrequency?: number | string | undefined;
      baselineShift?: number | string | undefined;
      "baseline-shift"?: number | string | undefined;
      baseProfile?: number | string | undefined;
      bbox?: number | string | undefined;
      begin?: number | string | undefined;
      bias?: number | string | undefined;
      by?: number | string | undefined;
      calcMode?: number | string | undefined;
      capHeight?: number | string | undefined;
      "cap-height"?: number | string | undefined;
      clip?: number | string | undefined;
      clipPath?: string | undefined;
      "clip-path"?: string | undefined;
      clipPathUnits?: number | string | undefined;
      clipRule?: number | string | undefined;
      "clip-rule"?: number | string | undefined;
      colorInterpolation?: number | string | undefined;
      "color-interpolation"?: number | string | undefined;
      colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
      "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
      colorProfile?: number | string | undefined;
      "color-profile"?: number | string | undefined;
      colorRendering?: number | string | undefined;
      "color-rendering"?: number | string | undefined;
      contentScriptType?: number | string | undefined;
      "content-script-type"?: number | string | undefined;
      contentStyleType?: number | string | undefined;
      "content-style-type"?: number | string | undefined;
      cursor?: number | string | undefined;
      cx?: number | string | undefined;
      cy?: number | string | undefined;
      d?: string | undefined;
      decelerate?: number | string | undefined;
      descent?: number | string | undefined;
      diffuseConstant?: number | string | undefined;
      direction?: number | string | undefined;
      display?: number | string | undefined;
      divisor?: number | string | undefined;
      dominantBaseline?: number | string | undefined;
      "dominant-baseline"?: number | string | undefined;
      dur?: number | string | undefined;
      dx?: number | string | undefined;
      dy?: number | string | undefined;
      edgeMode?: number | string | undefined;
      elevation?: number | string | undefined;
      enableBackground?: number | string | undefined;
      "enable-background"?: number | string | undefined;
      end?: number | string | undefined;
      exponent?: number | string | undefined;
      externalResourcesRequired?: number | string | undefined;
      fill?: string | undefined;
      fillOpacity?: number | string | undefined;
      "fill-opacity"?: number | string | undefined;
      fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
      "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined;
      filter?: string | undefined;
      filterRes?: number | string | undefined;
      filterUnits?: number | string | undefined;
      floodColor?: number | string | undefined;
      "flood-color"?: number | string | undefined;
      floodOpacity?: number | string | undefined;
      "flood-opacity"?: number | string | undefined;
      focusable?: number | string | undefined;
      fontFamily?: string | undefined;
      "font-family"?: string | undefined;
      fontSize?: number | string | undefined;
      "font-size"?: number | string | undefined;
      fontSizeAdjust?: number | string | undefined;
      "font-size-adjust"?: number | string | undefined;
      fontStretch?: number | string | undefined;
      "font-stretch"?: number | string | undefined;
      fontStyle?: number | string | undefined;
      "font-style"?: number | string | undefined;
      fontVariant?: number | string | undefined;
      "font-variant"?: number | string | undefined;
      fontWeight?: number | string | undefined;
      "font-weight"?: number | string | undefined;
      format?: number | string | undefined;
      from?: number | string | undefined;
      fx?: number | string | undefined;
      fy?: number | string | undefined;
      g1?: number | string | undefined;
      g2?: number | string | undefined;
      glyphName?: number | string | undefined;
      "glyph-name"?: number | string | undefined;
      glyphOrientationHorizontal?: number | string | undefined;
      "glyph-orientation-horizontal"?: number | string | undefined;
      glyphOrientationVertical?: number | string | undefined;
      "glyph-orientation-vertical"?: number | string | undefined;
      glyphRef?: number | string | undefined;
      gradientTransform?: string | undefined;
      gradientUnits?: string | undefined;
      hanging?: number | string | undefined;
      height?: number | string | undefined;
      horizAdvX?: number | string | undefined;
      "horiz-adv-x"?: number | string | undefined;
      horizOriginX?: number | string | undefined;
      "horiz-origin-x"?: number | string | undefined;
      href?: string | undefined;
      hreflang?: string | undefined;
      hrefLang?: string | undefined;
      ideographic?: number | string | undefined;
      imageRendering?: number | string | undefined;
      "image-rendering"?: number | string | undefined;
      in2?: number | string | undefined;
      in?: string | undefined;
      intercept?: number | string | undefined;
      k1?: number | string | undefined;
      k2?: number | string | undefined;
      k3?: number | string | undefined;
      k4?: number | string | undefined;
      k?: number | string | undefined;
      kernelMatrix?: number | string | undefined;
      kernelUnitLength?: number | string | undefined;
      kerning?: number | string | undefined;
      keyPoints?: number | string | undefined;
      keySplines?: number | string | undefined;
      keyTimes?: number | string | undefined;
      lengthAdjust?: number | string | undefined;
      letterSpacing?: number | string | undefined;
      "letter-spacing"?: number | string | undefined;
      lightingColor?: number | string | undefined;
      "lighting-color"?: number | string | undefined;
      limitingConeAngle?: number | string | undefined;
      local?: number | string | undefined;
      markerEnd?: string | undefined;
      "marker-end"?: string | undefined;
      markerHeight?: number | string | undefined;
      markerMid?: string | undefined;
      "marker-mid"?: string | undefined;
      markerStart?: string | undefined;
      "marker-start"?: string | undefined;
      markerUnits?: number | string | undefined;
      markerWidth?: number | string | undefined;
      mask?: string | undefined;
      maskContentUnits?: number | string | undefined;
      maskUnits?: number | string | undefined;
      mathematical?: number | string | undefined;
      mode?: number | string | undefined;
      numOctaves?: number | string | undefined;
      offset?: number | string | undefined;
      opacity?: number | string | undefined;
      operator?: number | string | undefined;
      order?: number | string | undefined;
      orient?: number | string | undefined;
      orientation?: number | string | undefined;
      origin?: number | string | undefined;
      overflow?: number | string | undefined;
      overlinePosition?: number | string | undefined;
      "overline-position"?: number | string | undefined;
      overlineThickness?: number | string | undefined;
      "overline-thickness"?: number | string | undefined;
      paintOrder?: number | string | undefined;
      "paint-order"?: number | string | undefined;
      panose1?: number | string | undefined;
      "panose-1"?: number | string | undefined;
      pathLength?: number | string | undefined;
      patternContentUnits?: string | undefined;
      patternTransform?: number | string | undefined;
      patternUnits?: string | undefined;
      pointerEvents?: number | string | undefined;
      "pointer-events"?: number | string | undefined;
      points?: string | undefined;
      pointsAtX?: number | string | undefined;
      pointsAtY?: number | string | undefined;
      pointsAtZ?: number | string | undefined;
      preserveAlpha?: number | string | undefined;
      preserveAspectRatio?: string | undefined;
      primitiveUnits?: number | string | undefined;
      r?: number | string | undefined;
      radius?: number | string | undefined;
      refX?: number | string | undefined;
      refY?: number | string | undefined;
      renderingIntent?: number | string | undefined;
      "rendering-intent"?: number | string | undefined;
      repeatCount?: number | string | undefined;
      "repeat-count"?: number | string | undefined;
      repeatDur?: number | string | undefined;
      "repeat-dur"?: number | string | undefined;
      requiredExtensions?: number | string | undefined;
      requiredFeatures?: number | string | undefined;
      restart?: number | string | undefined;
      result?: string | undefined;
      rotate?: number | string | undefined;
      rx?: number | string | undefined;
      ry?: number | string | undefined;
      scale?: number | string | undefined;
      seed?: number | string | undefined;
      shapeRendering?: number | string | undefined;
      "shape-rendering"?: number | string | undefined;
      slope?: number | string | undefined;
      spacing?: number | string | undefined;
      specularConstant?: number | string | undefined;
      specularExponent?: number | string | undefined;
      speed?: number | string | undefined;
      spreadMethod?: string | undefined;
      startOffset?: number | string | undefined;
      stdDeviation?: number | string | undefined;
      stemh?: number | string | undefined;
      stemv?: number | string | undefined;
      stitchTiles?: number | string | undefined;
      stopColor?: string | undefined;
      "stop-color"?: string | undefined;
      stopOpacity?: number | string | undefined;
      "stop-opacity"?: number | string | undefined;
      strikethroughPosition?: number | string | undefined;
      "strikethrough-position"?: number | string | undefined;
      strikethroughThickness?: number | string | undefined;
      "strikethrough-thickness"?: number | string | undefined;
      string?: number | string | undefined;
      stroke?: string | undefined;
      strokeDasharray?: string | number | undefined;
      "stroke-dasharray"?: string | number | undefined;
      strokeDashoffset?: string | number | undefined;
      "stroke-dashoffset"?: string | number | undefined;
      strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
      "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | undefined;
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
      "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit" | undefined;
      strokeMiterlimit?: string | number | undefined;
      "stroke-miterlimit"?: string | number | undefined;
      strokeOpacity?: number | string | undefined;
      "stroke-opacity"?: number | string | undefined;
      strokeWidth?: number | string | undefined;
      "stroke-width"?: number | string | undefined;
      surfaceScale?: number | string | undefined;
      systemLanguage?: number | string | undefined;
      tableValues?: number | string | undefined;
      targetX?: number | string | undefined;
      targetY?: number | string | undefined;
      textAnchor?: string | undefined;
      "text-anchor"?: string | undefined;
      textDecoration?: number | string | undefined;
      "text-decoration"?: number | string | undefined;
      textLength?: number | string | undefined;
      textRendering?: number | string | undefined;
      "text-rendering"?: number | string | undefined;
      to?: number | string | undefined;
      transform?: string | undefined;
      transformOrigin?: string | undefined;
      "transform-origin"?: string | undefined;
      type?: string | undefined;
      u1?: number | string | undefined;
      u2?: number | string | undefined;
      underlinePosition?: number | string | undefined;
      "underline-position"?: number | string | undefined;
      underlineThickness?: number | string | undefined;
      "underline-thickness"?: number | string | undefined;
      unicode?: number | string | undefined;
      unicodeBidi?: number | string | undefined;
      "unicode-bidi"?: number | string | undefined;
      unicodeRange?: number | string | undefined;
      "unicode-range"?: number | string | undefined;
      unitsPerEm?: number | string | undefined;
      "units-per-em"?: number | string | undefined;
      vAlphabetic?: number | string | undefined;
      "v-alphabetic"?: number | string | undefined;
      values?: string | undefined;
      vectorEffect?: number | string | undefined;
      "vector-effect"?: number | string | undefined;
      version?: string | undefined;
      vertAdvY?: number | string | undefined;
      "vert-adv-y"?: number | string | undefined;
      vertOriginX?: number | string | undefined;
      "vert-origin-x"?: number | string | undefined;
      vertOriginY?: number | string | undefined;
      "vert-origin-y"?: number | string | undefined;
      vHanging?: number | string | undefined;
      "v-hanging"?: number | string | undefined;
      vIdeographic?: number | string | undefined;
      "v-ideographic"?: number | string | undefined;
      viewBox?: string | undefined;
      viewTarget?: number | string | undefined;
      visibility?: number | string | undefined;
      vMathematical?: number | string | undefined;
      "v-mathematical"?: number | string | undefined;
      width?: number | string | undefined;
      wordSpacing?: number | string | undefined;
      "word-spacing"?: number | string | undefined;
      writingMode?: number | string | undefined;
      "writing-mode"?: number | string | undefined;
      x1?: number | string | undefined;
      x2?: number | string | undefined;
      x?: number | string | undefined;
      xChannelSelector?: string | undefined;
      xHeight?: number | string | undefined;
      "x-height"?: number | string | undefined;
      xlinkActuate?: string | undefined;
      "xlink:actuate"?: SVGAttributes["xlinkActuate"];
      xlinkArcrole?: string | undefined;
      "xlink:arcrole"?: string | undefined;
      xlinkHref?: string | undefined;
      "xlink:href"?: string | undefined;
      xlinkRole?: string | undefined;
      "xlink:role"?: string | undefined;
      xlinkShow?: string | undefined;
      "xlink:show"?: string | undefined;
      xlinkTitle?: string | undefined;
      "xlink:title"?: string | undefined;
      xlinkType?: string | undefined;
      "xlink:type"?: string | undefined;
      xmlBase?: string | undefined;
      "xml:base"?: string | undefined;
      xmlLang?: string | undefined;
      "xml:lang"?: string | undefined;
      xmlns?: string | undefined;
      xmlnsXlink?: string | undefined;
      xmlSpace?: string | undefined;
      "xml:space"?: string | undefined;
      y1?: number | string | undefined;
      y2?: number | string | undefined;
      y?: number | string | undefined;
      yChannelSelector?: string | undefined;
      z?: number | string | undefined;
      zoomAndPan?: string | undefined;
    }

    interface PathAttributes {
      d: string;
    }

    type TargetedEvent<Target extends EventTarget = EventTarget, TypedEvent extends Event = Event> = Omit<
      TypedEvent,
      "currentTarget"
    > & {
      readonly currentTarget: Target;
    };

    type EventHandler<T> = ((event: T) => void) | ((event: T) => void)[];

    interface VNode<P = object> {
      props: P & { children: ComponentChildren };
    }

    type Element = DomElement | DocumentFragment;

    type ComponentChild = VNode<any> | object | string | number | bigint | boolean | null | undefined;
    type ComponentChildren = ComponentChild[] | ComponentChild;

    interface DOMAttributes {
      children?: ComponentChildren;
      dangerouslySetInnerHTML?: {
        __html: string;
      };
      onabort?: EventHandler<UIEvent>;
      onanimationcancel?: EventHandler<AnimationEvent>;
      onanimationend?: EventHandler<AnimationEvent>;
      onanimationiteration?: EventHandler<AnimationEvent>;
      onanimationstart?: EventHandler<AnimationEvent>;
      onauxclick?: EventHandler<MouseEvent>;
      onbeforeinput?: EventHandler<InputEvent>;
      onbeforetoggle?: EventHandler<Event>;
      onblur?: EventHandler<FocusEvent>;
      oncancel?: EventHandler<Event>;
      oncanplay?: EventHandler<Event>;
      oncanplaythrough?: EventHandler<Event>;
      onchange?: EventHandler<Event>;
      onclick?: EventHandler<MouseEvent>;
      onclose?: EventHandler<Event>;
      oncompositionend?: EventHandler<CompositionEvent>;
      oncompositionstart?: EventHandler<CompositionEvent>;
      oncompositionupdate?: EventHandler<CompositionEvent>;
      oncontextlost?: EventHandler<Event>;
      oncontextmenu?: EventHandler<MouseEvent>;
      oncontextrestored?: EventHandler<Event>;
      oncopy?: EventHandler<ClipboardEvent>;
      oncuechange?: EventHandler<Event>;
      oncut?: EventHandler<ClipboardEvent>;
      ondblclick?: EventHandler<MouseEvent>;
      ondrag?: EventHandler<DragEvent>;
      ondragend?: EventHandler<DragEvent>;
      ondragenter?: EventHandler<DragEvent>;
      ondragleave?: EventHandler<DragEvent>;
      ondragover?: EventHandler<DragEvent>;
      ondragstart?: EventHandler<DragEvent>;
      ondrop?: EventHandler<DragEvent>;
      ondurationchange?: EventHandler<Event>;
      onemptied?: EventHandler<Event>;
      onended?: EventHandler<Event>;
      onerror?: EventHandler<ErrorEvent>;
      onfocus?: EventHandler<FocusEvent>;
      onfocusin?: EventHandler<FocusEvent>;
      onfocusout?: EventHandler<FocusEvent>;
      onformdata?: EventHandler<FormDataEvent>;
      ongotpointercapture?: EventHandler<PointerEvent>;
      oninput?: EventHandler<Event>;
      oninvalid?: EventHandler<Event>;
      onkeydown?: EventHandler<KeyboardEvent>;
      onkeypress?: EventHandler<KeyboardEvent>;
      onkeyup?: EventHandler<KeyboardEvent>;
      onload?: EventHandler<Event>;
      onloadeddata?: EventHandler<Event>;
      onloadedmetadata?: EventHandler<Event>;
      onloadstart?: EventHandler<Event>;
      onlostpointercapture?: EventHandler<PointerEvent>;
      onmousedown?: EventHandler<MouseEvent>;
      onmouseenter?: EventHandler<MouseEvent>;
      onmouseleave?: EventHandler<MouseEvent>;
      onmousemove?: EventHandler<MouseEvent>;
      onmouseout?: EventHandler<MouseEvent>;
      onmouseover?: EventHandler<MouseEvent>;
      onmouseup?: EventHandler<MouseEvent>;
      onpaste?: EventHandler<ClipboardEvent>;
      onpause?: EventHandler<Event>;
      onplay?: EventHandler<Event>;
      onplaying?: EventHandler<Event>;
      onpointercancel?: EventHandler<PointerEvent>;
      onpointerdown?: EventHandler<PointerEvent>;
      onpointerenter?: EventHandler<PointerEvent>;
      onpointerleave?: EventHandler<PointerEvent>;
      onpointermove?: EventHandler<PointerEvent>;
      onpointerout?: EventHandler<PointerEvent>;
      onpointerover?: EventHandler<PointerEvent>;
      onpointerup?: EventHandler<PointerEvent>;
      onprogress?: EventHandler<ProgressEvent>;
      onratechange?: EventHandler<Event>;
      onreset?: EventHandler<Event>;
      onresize?: EventHandler<UIEvent>;
      onscroll?: EventHandler<Event>;
      onscrollend?: EventHandler<Event>;
      onsecuritypolicyviolation?: EventHandler<SecurityPolicyViolationEvent>;
      onseeked?: EventHandler<Event>;
      onseeking?: EventHandler<Event>;
      onselect?: EventHandler<Event>;
      onselectionchange?: EventHandler<Event>;
      onselectstart?: EventHandler<Event>;
      onslotchange?: EventHandler<Event>;
      onstalled?: EventHandler<Event>;
      onsubmit?: EventHandler<SubmitEvent>;
      onsuspend?: EventHandler<Event>;
      ontimeupdate?: EventHandler<Event>;
      ontoggle?: EventHandler<Event>;
      ontouchcancel?: EventHandler<TouchEvent>;
      ontouchend?: EventHandler<TouchEvent>;
      ontouchmove?: EventHandler<TouchEvent>;
      ontouchstart?: EventHandler<TouchEvent>;
      ontransitioncancel?: EventHandler<TransitionEvent>;
      ontransitionend?: EventHandler<TransitionEvent>;
      ontransitionrun?: EventHandler<TransitionEvent>;
      ontransitionstart?: EventHandler<TransitionEvent>;
      onvolumechange?: EventHandler<Event>;
      onwaiting?: EventHandler<Event>;
      onwebkitanimationend?: EventHandler<Event>;
      onwebkitanimationiteration?: EventHandler<Event>;
      onwebkitanimationstart?: EventHandler<Event>;
      onwebkittransitionend?: EventHandler<Event>;
      onwheel?: EventHandler<WheelEvent>;
    }

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
    interface AriaAttributes {
      /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
      "aria-activedescendant"?: string | undefined;
      /**
       * Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change
       * notifications defined by the aria-relevant attribute.
       */
      "aria-atomic"?: Booleanish | undefined;
      /**
       * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an
       * input and specifies how predictions would be presented if they are made.
       */
      "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
      /**
       * Defines a string value that labels the current element, which is intended to be converted into Braille.
       *
       * @see aria-label.
       */
      "aria-braillelabel"?: string | undefined;
      /**
       * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be
       * converted into Braille.
       *
       * @see aria-roledescription.
       */
      "aria-brailleroledescription"?: string | undefined;
      /**
       * Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are
       * complete before exposing them to the user.
       */
      "aria-busy"?: Booleanish | undefined;
      /**
       * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
       *
       * @see aria-pressed
       * @see aria-selected.
       */
      "aria-checked"?: Booleanish | "mixed" | undefined;
      /**
       * Defines the total number of columns in a table, grid, or treegrid.
       *
       * @see aria-colindex.
       */
      "aria-colcount"?: number | undefined;
      /**
       * Defines an element's column index or position with respect to the total number of columns within a table, grid, or
       * treegrid.
       *
       * @see aria-colcount
       * @see aria-colspan.
       */
      "aria-colindex"?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-colindex.
       *
       * @see aria-rowindextext.
       */
      "aria-colindextext"?: string | undefined;
      /**
       * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
       *
       * @see aria-colindex
       * @see aria-rowspan.
       */
      "aria-colspan"?: number | undefined;
      /**
       * Identifies the element (or elements) whose contents or presence are controlled by the current element.
       *
       * @see aria-owns.
       */
      "aria-controls"?: string | undefined;
      /** Indicates the element that represents the current item within a container or set of related elements. */
      "aria-current"?: Booleanish | "page" | "step" | "location" | "date" | "time" | undefined;
      /**
       * Identifies the element (or elements) that describes the object.
       *
       * @see aria-labelledby
       */
      "aria-describedby"?: string | undefined;
      /**
       * Defines a string value that describes or annotates the current element.
       *
       * @see related aria-describedby.
       */
      "aria-description"?: string | undefined;
      /**
       * Identifies the element that provides a detailed, extended description for the object.
       *
       * @see aria-describedby.
       */
      "aria-details"?: string | undefined;
      /**
       * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
       *
       * @see aria-hidden
       * @see aria-readonly.
       */
      "aria-disabled"?: Booleanish | undefined;
      /**
       * Indicates what functions can be performed when a dragged object is released on the drop target.
       *
       * @deprecated In ARIA 1.1
       */
      "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
      /**
       * Identifies the element that provides an error message for the object.
       *
       * @see aria-invalid
       * @see aria-describedby.
       */
      "aria-errormessage"?: string | undefined;
      /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
      "aria-expanded"?: Booleanish | undefined;
      /**
       * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
       * allows assistive technology to override the general default of reading in document source order.
       */
      "aria-flowto"?: string | undefined;
      /**
       * Indicates an element's "grabbed" state in a drag-and-drop operation.
       *
       * @deprecated In ARIA 1.1
       */
      "aria-grabbed"?: Booleanish | undefined;
      /**
       * Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an
       * element.
       */
      "aria-haspopup"?: Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
      /**
       * Indicates whether the element is exposed to an accessibility API.
       *
       * @see aria-disabled.
       */
      "aria-hidden"?: Booleanish | undefined;
      /**
       * Indicates the entered value does not conform to the format expected by the application.
       *
       * @see aria-errormessage.
       */
      "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined;
      /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
      "aria-keyshortcuts"?: string | undefined;
      /**
       * Defines a string value that labels the current element.
       *
       * @see aria-labelledby.
       */
      "aria-label"?: string | undefined;
      /**
       * Identifies the element (or elements) that labels the current element.
       *
       * @see aria-describedby.
       */
      "aria-labelledby"?: string | undefined;
      /** Defines the hierarchical level of an element within a structure. */
      "aria-level"?: number | undefined;
      /**
       * Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies,
       * and user can expect from the live region.
       */
      "aria-live"?: "off" | "assertive" | "polite" | undefined;
      /** Indicates whether an element is modal when displayed. */
      "aria-modal"?: Booleanish | undefined;
      /** Indicates whether a text box accepts multiple lines of input or only a single line. */
      "aria-multiline"?: Booleanish | undefined;
      /** Indicates that the user may select more than one item from the current selectable descendants. */
      "aria-multiselectable"?: Booleanish | undefined;
      /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
      "aria-orientation"?: "horizontal" | "vertical" | undefined;
      /**
       * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
       * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
       *
       * @see aria-controls.
       */
      "aria-owns"?: string | undefined;
      /**
       * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A
       * hint could be a sample value or a brief description of the expected format.
       */
      "aria-placeholder"?: string | undefined;
      /**
       * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the
       * set are present in the DOM.
       *
       * @see aria-setsize.
       */
      "aria-posinset"?: number | undefined;
      /**
       * Indicates the current "pressed" state of toggle buttons.
       *
       * @see aria-checked
       * @see aria-selected.
       */
      "aria-pressed"?: Booleanish | "mixed" | undefined;
      /**
       * Indicates that the element is not editable, but is otherwise operable.
       *
       * @see aria-disabled.
       */
      "aria-readonly"?: Booleanish | undefined;
      /**
       * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
       *
       * @see aria-atomic.
       */
      "aria-relevant"?:
        | "additions"
        | "additions removals"
        | "additions text"
        | "all"
        | "removals"
        | "removals additions"
        | "removals text"
        | "text"
        | "text additions"
        | "text removals"
        | undefined;
      /** Indicates that user input is required on the element before a form may be submitted. */
      "aria-required"?: Booleanish | undefined;
      /** Defines a human-readable, author-localized description for the role of an element. */
      "aria-roledescription"?: string | undefined;
      /**
       * Defines the total number of rows in a table, grid, or treegrid.
       *
       * @see aria-rowindex.
       */
      "aria-rowcount"?: number | undefined;
      /**
       * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
       *
       * @see aria-rowcount
       * @see aria-rowspan.
       */
      "aria-rowindex"?: number | undefined;
      /**
       * Defines a human readable text alternative of aria-rowindex.
       *
       * @see aria-colindextext.
       */
      "aria-rowindextext"?: string | undefined;
      /**
       * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
       *
       * @see aria-rowindex
       * @see aria-colspan.
       */
      "aria-rowspan"?: number | undefined;
      /**
       * Indicates the current "selected" state of various widgets.
       *
       * @see aria-checked
       * @see aria-pressed.
       */
      "aria-selected"?: Booleanish | undefined;
      /**
       * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are
       * present in the DOM.
       *
       * @see aria-posinset.
       */
      "aria-setsize"?: number | undefined;
      /** Indicates if items in a table or grid are sorted in ascending or descending order. */
      "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
      /** Defines the maximum allowed value for a range widget. */
      "aria-valuemax"?: number | undefined;
      /** Defines the minimum allowed value for a range widget. */
      "aria-valuemin"?: number | undefined;
      /**
       * Defines the current value for a range widget.
       *
       * @see aria-valuetext.
       */
      "aria-valuenow"?: number | undefined;
      /** Defines the human readable text alternative of aria-valuenow for a range widget. */
      "aria-valuetext"?: string | undefined;
    }

    // All the WAI-ARIA 1.2 role attribute values from https://www.w3.org/TR/wai-aria-1.2/#role_definitions
    type WAIAriaRole =
      | "alert"
      | "alertdialog"
      | "application"
      | "article"
      | "banner"
      | "blockquote"
      | "button"
      | "caption"
      | "cell"
      | "checkbox"
      | "code"
      | "columnheader"
      | "combobox"
      | "command"
      | "complementary"
      | "composite"
      | "contentinfo"
      | "definition"
      | "deletion"
      | "dialog"
      | "directory"
      | "document"
      | "emphasis"
      | "feed"
      | "figure"
      | "form"
      | "grid"
      | "gridcell"
      | "group"
      | "heading"
      | "img"
      | "input"
      | "insertion"
      | "landmark"
      | "link"
      | "list"
      | "listbox"
      | "listitem"
      | "log"
      | "main"
      | "marquee"
      | "math"
      | "meter"
      | "menu"
      | "menubar"
      | "menuitem"
      | "menuitemcheckbox"
      | "menuitemradio"
      | "navigation"
      | "none"
      | "note"
      | "option"
      | "paragraph"
      | "presentation"
      | "progressbar"
      | "radio"
      | "radiogroup"
      | "range"
      | "region"
      | "roletype"
      | "row"
      | "rowgroup"
      | "rowheader"
      | "scrollbar"
      | "search"
      | "searchbox"
      | "section"
      | "sectionhead"
      | "select"
      | "separator"
      | "slider"
      | "spinbutton"
      | "status"
      | "strong"
      | "structure"
      | "subscript"
      | "superscript"
      | "switch"
      | "tab"
      | "table"
      | "tablist"
      | "tabpanel"
      | "term"
      | "textbox"
      | "time"
      | "timer"
      | "toolbar"
      | "tooltip"
      | "tree"
      | "treegrid"
      | "treeitem"
      | "widget"
      | "window"
      | "none presentation";

    // All the Digital Publishing WAI-ARIA 1.0 role attribute values from https://www.w3.org/TR/dpub-aria-1.0/#role_definitions
    export type DPubAriaRole =
      | "doc-abstract"
      | "doc-acknowledgments"
      | "doc-afterword"
      | "doc-appendix"
      | "doc-backlink"
      | "doc-biblioentry"
      | "doc-bibliography"
      | "doc-biblioref"
      | "doc-chapter"
      | "doc-colophon"
      | "doc-conclusion"
      | "doc-cover"
      | "doc-credit"
      | "doc-credits"
      | "doc-dedication"
      | "doc-endnote"
      | "doc-endnotes"
      | "doc-epigraph"
      | "doc-epilogue"
      | "doc-errata"
      | "doc-example"
      | "doc-footnote"
      | "doc-foreword"
      | "doc-glossary"
      | "doc-glossref"
      | "doc-index"
      | "doc-introduction"
      | "doc-noteref"
      | "doc-notice"
      | "doc-pagebreak"
      | "doc-pagelist"
      | "doc-part"
      | "doc-preface"
      | "doc-prologue"
      | "doc-pullquote"
      | "doc-qna"
      | "doc-subtitle"
      | "doc-tip"
      | "doc-toc";

    export type AriaRole = WAIAriaRole | DPubAriaRole;

    export interface AllHTMLAttributes extends DOMAttributes, AriaAttributes {
      // Standard HTML Attributes
      accept?: string | undefined;
      acceptCharset?: string | undefined;
      "accept-charset"?: AllHTMLAttributes["acceptCharset"];
      accessKey?: string | undefined;
      accesskey?: AllHTMLAttributes["accessKey"];
      action?: string | undefined;
      allow?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      alt?: string | undefined;
      as?: string | undefined;
      async?: boolean | undefined;
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      autocorrect?: string | undefined;
      autoCorrect?: string | undefined;
      autofocus?: boolean | undefined;
      autoFocus?: boolean | undefined;
      autoPlay?: boolean | undefined;
      autoplay?: boolean | undefined;
      capture?: boolean | string | undefined;
      cellPadding?: number | string | undefined;
      cellSpacing?: number | string | undefined;
      charSet?: string | undefined;
      charset?: string | undefined;
      challenge?: string | undefined;
      checked?: boolean | undefined;
      cite?: string | undefined;
      class?: string | undefined;
      className?: string | undefined;
      cols?: number | undefined;
      colSpan?: number | undefined;
      colspan?: number | undefined;
      content?: string | undefined;
      contentEditable?: Booleanish | "" | "plaintext-only" | "inherit" | undefined;
      contenteditable?: AllHTMLAttributes["contentEditable"];
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
      contextMenu?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
      contextmenu?: string | undefined;
      controls?: boolean | undefined;
      controlslist?: "nodownload" | "nofullscreen" | "noremoteplayback" | undefined;
      controlsList?: "nodownload" | "nofullscreen" | "noremoteplayback" | undefined;
      coords?: string | undefined;
      crossOrigin?: string | undefined;
      crossorigin?: string | undefined;
      currentTime?: number | undefined;
      data?: string | undefined;
      dateTime?: string | undefined;
      datetime?: string | undefined;
      default?: boolean | undefined;
      defaultChecked?: boolean | undefined;
      defaultMuted?: boolean | undefined;
      defaultPlaybackRate?: number | undefined;
      defaultValue?: string | undefined;
      defer?: boolean | undefined;
      dir?: "auto" | "rtl" | "ltr" | undefined;
      disabled?: boolean | undefined;
      disableremoteplayback?: boolean | undefined;
      disableRemotePlayback?: boolean | undefined;
      download?: any | undefined;
      decoding?: "sync" | "async" | "auto" | undefined;
      draggable?: boolean | undefined;
      encType?: string | undefined;
      enctype?: string | undefined;
      enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
      elementTiming?: string | undefined;
      elementtiming?: AllHTMLAttributes["elementTiming"];
      exportparts?: string | undefined;
      for?: string | undefined;
      form?: string | undefined;
      formAction?: string | undefined;
      formaction?: string | undefined;
      formEncType?: string | undefined;
      formenctype?: string | undefined;
      formMethod?: string | undefined;
      formmethod?: string | undefined;
      formNoValidate?: boolean | undefined;
      formnovalidate?: boolean | undefined;
      formTarget?: string | undefined;
      formtarget?: string | undefined;
      frameBorder?: number | string | undefined;
      frameborder?: number | string | undefined;
      headers?: string | undefined;
      height?: number | string | undefined;
      hidden?: boolean | "hidden" | "until-found" | undefined;
      high?: number | undefined;
      href?: string | undefined;
      hrefLang?: string | undefined;
      hreflang?: string | undefined;
      htmlFor?: string | undefined;
      httpEquiv?: string | undefined;
      "http-equiv"?: string | undefined;
      icon?: string | undefined;
      id?: string | undefined;
      indeterminate?: boolean | undefined;
      inert?: boolean | undefined;
      inputMode?: string | undefined;
      inputmode?: string | undefined;
      integrity?: string | undefined;
      is?: string | undefined;
      keyParams?: string | undefined;
      keyType?: string | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      lang?: string | undefined;
      list?: string | undefined;
      loading?: "eager" | "lazy" | undefined;
      loop?: boolean | undefined;
      low?: number | undefined;
      manifest?: string | undefined;
      marginHeight?: number | undefined;
      marginWidth?: number | undefined;
      max?: number | string | undefined;
      maxLength?: number | undefined;
      maxlength?: number | undefined;
      media?: string | undefined;
      mediaGroup?: string | undefined;
      method?: string | undefined;
      min?: number | string | undefined;
      minLength?: number | undefined;
      minlength?: number | undefined;
      multiple?: boolean | undefined;
      muted?: boolean | undefined;
      name?: string | undefined;
      nomodule?: boolean | undefined;
      nonce?: string | undefined;
      noValidate?: boolean | undefined;
      novalidate?: boolean | undefined;
      open?: boolean | undefined;
      optimum?: number | undefined;
      part?: string | undefined;
      pattern?: string | undefined;
      ping?: string | undefined;
      placeholder?: string | undefined;
      playsInline?: boolean | undefined;
      playsinline?: boolean | undefined;
      playbackRate?: number | undefined;
      popover?: "auto" | "hint" | "manual" | boolean | undefined;
      popovertarget?: string | undefined;
      popoverTarget?: string | undefined;
      popovertargetaction?: "hide" | "show" | "toggle" | undefined;
      popoverTargetAction?: "hide" | "show" | "toggle" | undefined;
      poster?: string | undefined;
      preload?: "auto" | "metadata" | "none" | undefined;
      preservesPitch?: boolean | undefined;
      radioGroup?: string | undefined;
      readonly?: boolean | undefined;
      readOnly?: boolean | undefined;
      referrerpolicy?:
        | "no-referrer"
        | "no-referrer-when-downgrade"
        | "origin"
        | "origin-when-cross-origin"
        | "same-origin"
        | "strict-origin"
        | "strict-origin-when-cross-origin"
        | "unsafe-url"
        | undefined;
      rel?: string | undefined;
      required?: boolean | undefined;
      reversed?: boolean | undefined;
      role?: AriaRole | undefined;
      rows?: number | undefined;
      rowSpan?: number | undefined;
      rowspan?: number | undefined;
      sandbox?: string | undefined;
      scope?: string | undefined;
      scoped?: boolean | undefined;
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      selected?: boolean | undefined;
      shape?: string | undefined;
      size?: number | undefined;
      sizes?: string | undefined;
      slot?: string | undefined;
      span?: number | undefined;
      spellcheck?: boolean | undefined;
      src?: string | undefined;
      srcDoc?: string | undefined;
      srcdoc?: string | undefined;
      srcLang?: string | undefined;
      srclang?: string | undefined;
      srcSet?: string | undefined;
      srcset?: string | undefined;
      srcObject?: MediaStream | MediaSource | Blob | File | null;
      start?: number | undefined;
      step?: number | string | undefined;
      style?: string | CSSProperties | undefined;
      summary?: string | undefined;
      tabIndex?: number | undefined;
      tabindex?: number | undefined;
      target?: string | undefined;
      title?: string | undefined;
      type?: string | undefined;
      useMap?: string | undefined;
      usemap?: string | undefined;
      value?: string | string[] | number | undefined;
      volume?: string | number | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
      wrap?: string | undefined;

      // Non-standard Attributes
      autocapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined;
      autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined;
      disablePictureInPicture?: boolean | undefined;
      results?: number | undefined;
      translate?: boolean | undefined;

      // RDFa Attributes
      about?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      resource?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;

      // Microdata Attributes
      itemProp?: string | undefined;
      itemprop?: string | undefined;
      itemScope?: boolean | undefined;
      itemscope?: boolean | undefined;
      itemType?: string | undefined;
      itemtype?: string | undefined;
      itemID?: string | undefined;
      itemid?: string | undefined;
      itemRef?: string | undefined;
      itemref?: string | undefined;
    }

    export interface HTMLAttributes extends DOMAttributes, AriaAttributes {
      // Standard HTML Attributes
      accesskey?: string | undefined;
      accessKey?: string | undefined;
      autocapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined;
      autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined;
      autocorrect?: string | undefined;
      autoCorrect?: string | undefined;
      autofocus?: boolean | undefined;
      autoFocus?: boolean | undefined;
      class?: string | undefined;
      className?: string | undefined;
      contenteditable?: Booleanish | "" | "plaintext-only" | "inherit" | undefined;
      contentEditable?: Booleanish | "" | "plaintext-only" | "inherit" | undefined;
      dir?: "auto" | "rtl" | "ltr" | undefined;
      draggable?: boolean | undefined;
      enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
      exportparts?: string | undefined;
      hidden?: boolean | "hidden" | "until-found" | undefined;
      id?: string | undefined;
      inert?: boolean | undefined;
      inputmode?: string | undefined;
      inputMode?: string | undefined;
      is?: string | undefined;
      lang?: string | undefined;
      nonce?: string | undefined;
      part?: string | undefined;
      popover?: "auto" | "hint" | "manual" | boolean | undefined;
      slot?: string | undefined;
      spellcheck?: boolean | undefined;
      style?: string | CSSProperties | undefined;
      tabindex?: number | undefined;
      tabIndex?: number | undefined;
      title?: string | undefined;
      translate?: boolean | undefined;

      // WAI-ARIA Attributes
      role?: AriaRole | undefined;

      // Non-standard Attributes
      disablePictureInPicture?: boolean | undefined;
      elementtiming?: string | undefined;
      elementTiming?: string | undefined;
      results?: number | undefined;

      // RDFa Attributes
      about?: string | undefined;
      datatype?: string | undefined;
      inlist?: any;
      prefix?: string | undefined;
      property?: string | undefined;
      resource?: string | undefined;
      typeof?: string | undefined;
      vocab?: string | undefined;

      // Microdata Attributes
      itemid?: string | undefined;
      itemID?: string | undefined;
      itemprop?: string | undefined;
      itemProp?: string | undefined;
      itemref?: string | undefined;
      itemRef?: string | undefined;
      itemscope?: boolean | undefined;
      itemScope?: boolean | undefined;
      itemtype?: string | undefined;
      itemType?: string | undefined;
    }

    type HTMLAttributeReferrerPolicy =
      | ""
      | "no-referrer"
      | "no-referrer-when-downgrade"
      | "origin"
      | "origin-when-cross-origin"
      | "same-origin"
      | "strict-origin"
      | "strict-origin-when-cross-origin"
      | "unsafe-url";

    type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {});

    interface AnchorHTMLAttributes extends HTMLAttributes {
      download?: any;
      href?: string | undefined;
      hreflang?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      ping?: string | undefined;
      rel?: string | undefined;
      target?: HTMLAttributeAnchorTarget | undefined;
      type?: string | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    }

    interface AreaHTMLAttributes extends HTMLAttributes {
      alt?: string | undefined;
      coords?: string | undefined;
      download?: any;
      href?: string | undefined;
      hreflang?: string | undefined;
      hrefLang?: string | undefined;
      media?: string | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      rel?: string | undefined;
      shape?: string | undefined;
      target?: HTMLAttributeAnchorTarget | undefined;
    }

    type AudioHTMLAttributes = MediaHTMLAttributes;

    interface BaseHTMLAttributes extends HTMLAttributes {
      href?: string | undefined;
      target?: HTMLAttributeAnchorTarget | undefined;
    }

    interface BlockquoteHTMLAttributes extends HTMLAttributes {
      cite?: string | undefined;
    }

    interface ButtonHTMLAttributes extends HTMLAttributes {
      command?: string | undefined;
      commandfor?: string | undefined;
      commandFor?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      formaction?: string | undefined;
      formAction?: string | undefined;
      formenctype?: string | undefined;
      formEncType?: string | undefined;
      formmethod?: string | undefined;
      formMethod?: string | undefined;
      formnovalidate?: boolean | undefined;
      formNoValidate?: boolean | undefined;
      formtarget?: string | undefined;
      formTarget?: string | undefined;
      name?: string | undefined;
      popovertarget?: string | undefined;
      popoverTarget?: string | undefined;
      popovertargetaction?: "hide" | "show" | "toggle" | undefined;
      popoverTargetAction?: "hide" | "show" | "toggle" | undefined;
      type?: "submit" | "reset" | "button" | undefined;
      value?: string | number | undefined;
    }

    interface CanvasHTMLAttributes extends HTMLAttributes {
      height?: number | string | undefined;
      width?: number | string | undefined;
    }

    interface ColHTMLAttributes extends HTMLAttributes {
      span?: number | undefined;
      width?: number | string | undefined;
    }

    interface ColgroupHTMLAttributes extends HTMLAttributes {
      span?: number | undefined;
    }

    interface DataHTMLAttributes extends HTMLAttributes {
      value?: string | number | undefined;
    }

    interface DelHTMLAttributes extends HTMLAttributes {
      cite?: string | undefined;
      datetime?: string | undefined;
      dateTime?: string | undefined;
    }

    interface DetailsHTMLAttributes extends HTMLAttributes {
      open?: boolean | undefined;
    }

    interface DialogHTMLAttributes extends HTMLAttributes {
      open?: boolean | undefined;
      closedby?: "none" | "closerequest" | "any" | undefined;
      closedBy?: "none" | "closerequest" | "any" | undefined;
    }

    interface EmbedHTMLAttributes extends HTMLAttributes {
      height?: number | string | undefined;
      src?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
    }

    interface FieldsetHTMLAttributes extends HTMLAttributes {
      disabled?: boolean | undefined;
      form?: string | undefined;
      name?: string | undefined;
    }

    interface FormHTMLAttributes extends HTMLAttributes {
      "accept-charset"?: string | undefined;
      acceptCharset?: string | undefined;
      action?: string | undefined;
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      enctype?: string | undefined;
      encType?: string | undefined;
      method?: string | undefined;
      name?: string | undefined;
      novalidate?: boolean | undefined;
      noValidate?: boolean | undefined;
      rel?: string | undefined;
      target?: string | undefined;
    }

    interface IframeHTMLAttributes extends HTMLAttributes {
      allow?: string | undefined;
      allowFullScreen?: boolean | undefined;
      allowTransparency?: boolean | undefined;
      /** @deprecated */
      frameborder?: number | string | undefined;
      /** @deprecated */
      frameBorder?: number | string | undefined;
      height?: number | string | undefined;
      loading?: "eager" | "lazy" | undefined;
      /** @deprecated */
      marginHeight?: number | undefined;
      /** @deprecated */
      marginWidth?: number | undefined;
      name?: string | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sandbox?: string | undefined;
      /** @deprecated */
      scrolling?: string | undefined;
      seamless?: boolean | undefined;
      src?: string | undefined;
      srcdoc?: string | undefined;
      srcDoc?: string | undefined;
      width?: number | string | undefined;
    }

    type HTMLAttributeCrossOrigin = "anonymous" | "use-credentials";

    interface ImgHTMLAttributes extends HTMLAttributes {
      alt?: string | undefined;
      crossorigin?: HTMLAttributeCrossOrigin;
      crossOrigin?: HTMLAttributeCrossOrigin;
      decoding?: "async" | "auto" | "sync" | undefined;
      fetchpriority?: "high" | "auto" | "low" | undefined;
      fetchPriority?: "high" | "auto" | "low" | undefined;
      height?: number | string | undefined;
      loading?: "eager" | "lazy" | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcset?: string | undefined;
      srcSet?: string | undefined;
      usemap?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
    }

    type HTMLInputTypeAttribute =
      | "button"
      | "checkbox"
      | "color"
      | "date"
      | "datetime-local"
      | "email"
      | "file"
      | "hidden"
      | "image"
      | "month"
      | "number"
      | "password"
      | "radio"
      | "range"
      | "reset"
      | "search"
      | "submit"
      | "tel"
      | "text"
      | "time"
      | "url"
      | "week"
      | (string & {});

    interface InputHTMLAttributes extends HTMLAttributes {
      accept?: string | undefined;
      alt?: string | undefined;
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      capture?: "user" | "environment" | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribue
      checked?: boolean | undefined;
      defaultChecked?: boolean | undefined;
      defaultValue?: string | number | undefined;
      disabled?: boolean | undefined;
      enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
      form?: string | undefined;
      formaction?: string | undefined;
      formAction?: string | undefined;
      formenctype?: string | undefined;
      formEncType?: string | undefined;
      formmethod?: string | undefined;
      formMethod?: string | undefined;
      formnovalidate?: boolean | undefined;
      formNoValidate?: boolean | undefined;
      formtarget?: string | undefined;
      formTarget?: string | undefined;
      height?: number | string | undefined;
      indeterminate?: boolean | undefined;
      list?: string | undefined;
      max?: number | string | undefined;
      maxlength?: number | undefined;
      maxLength?: number | undefined;
      min?: number | string | undefined;
      minlength?: number | undefined;
      minLength?: number | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      pattern?: string | undefined;
      placeholder?: string | undefined;
      readonly?: boolean | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      src?: string | undefined;
      step?: number | string | undefined;
      type?: HTMLInputTypeAttribute | undefined;
      value?: string | number | undefined;
      width?: number | string | undefined;
    }

    interface InsHTMLAttributes extends HTMLAttributes {
      cite?: string | undefined;
      datetime?: string | undefined;
      dateTime?: string | undefined;
    }

    interface KeygenHTMLAttributes extends HTMLAttributes {
      challenge?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      keyType?: string | undefined;
      keyParams?: string | undefined;
      name?: string | undefined;
    }

    interface LabelHTMLAttributes extends HTMLAttributes {
      for?: string | undefined;
      form?: string | undefined;
      htmlFor?: string | undefined;
    }

    interface LiHTMLAttributes extends HTMLAttributes {
      value?: string | number | undefined;
    }

    interface LinkHTMLAttributes extends HTMLAttributes {
      as?: string | undefined;
      crossorigin?: HTMLAttributeCrossOrigin;
      crossOrigin?: HTMLAttributeCrossOrigin;
      fetchpriority?: "high" | "low" | "auto" | undefined;
      fetchPriority?: "high" | "low" | "auto" | undefined;
      href?: string | undefined;
      hreflang?: string | undefined;
      hrefLang?: string | undefined;
      integrity?: string | undefined;
      media?: string | undefined;
      imageSrcSet?: string | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      rel?: string | undefined;
      sizes?: string | undefined;
      type?: string | undefined;
      charset?: string | undefined;
      charSet?: string | undefined;
    }

    interface MapHTMLAttributes extends HTMLAttributes {
      name?: string | undefined;
    }

    interface MarqueeHTMLAttributes extends HTMLAttributes {
      behavior?: "scroll" | "slide" | "alternate" | undefined;
      bgColor?: string | undefined;
      direction?: "left" | "right" | "up" | "down" | undefined;
      height?: number | string | undefined;
      hspace?: number | string | undefined;
      loop?: number | string | undefined;
      scrollAmount?: number | string | undefined;
      scrollDelay?: number | string | undefined;
      trueSpeed?: boolean | undefined;
      vspace?: number | string | undefined;
      width?: number | string | undefined;
    }

    interface MediaHTMLAttributes extends HTMLAttributes {
      autoplay?: boolean | undefined;
      autoPlay?: boolean | undefined;
      controls?: boolean | undefined;
      controlslist?: "nodownload" | "nofullscreen" | "noremoteplayback" | undefined;
      controlsList?: "nodownload" | "nofullscreen" | "noremoteplayback" | undefined;
      crossorigin?: HTMLAttributeCrossOrigin;
      crossOrigin?: HTMLAttributeCrossOrigin;
      currentTime?: number | undefined;
      defaultMuted?: boolean | undefined;
      defaultPlaybackRate?: number | undefined;
      disableremoteplayback?: boolean | undefined;
      disableRemotePlayback?: boolean | undefined;
      loop?: boolean | undefined;
      mediaGroup?: string | undefined;
      muted?: boolean | undefined;
      playbackRate?: number | undefined;
      preload?: "auto" | "metadata" | "none" | undefined;
      preservesPitch?: boolean | undefined;
      src?: string | undefined;
      srcObject?: MediaStream | MediaSource | Blob | File | null;
      volume?: string | number | undefined;
    }

    interface MenuHTMLAttributes extends HTMLAttributes {
      type?: string | undefined;
    }

    interface MetaHTMLAttributes extends HTMLAttributes {
      charset?: string | undefined;
      charSet?: string | undefined;
      content?: string | undefined;
      "http-equiv"?: string | undefined;
      httpEquiv?: string | undefined;
      name?: string | undefined;
      media?: string | undefined;
    }

    interface MeterHTMLAttributes extends HTMLAttributes {
      form?: string | undefined;
      high?: number | undefined;
      low?: number | undefined;
      max?: number | string | undefined;
      min?: number | string | undefined;
      optimum?: number | undefined;
      value?: string | number | undefined;
    }

    interface ObjectHTMLAttributes extends HTMLAttributes {
      classID?: string | undefined;
      data?: string | undefined;
      form?: string | undefined;
      height?: number | string | undefined;
      name?: string | undefined;
      type?: string | undefined;
      usemap?: string | undefined;
      useMap?: string | undefined;
      width?: number | string | undefined;
      wmode?: string | undefined;
    }

    interface OlHTMLAttributes extends HTMLAttributes {
      reversed?: boolean | undefined;
      start?: number | undefined;
      type?: "1" | "a" | "A" | "i" | "I" | undefined;
    }

    interface OptgroupHTMLAttributes extends HTMLAttributes {
      disabled?: boolean | undefined;
      label?: string | undefined;
    }

    interface OptionHTMLAttributes extends HTMLAttributes {
      disabled?: boolean | undefined;
      label?: string | undefined;
      selected?: boolean | undefined;
      value?: string | number | undefined;
    }

    interface OutputHTMLAttributes extends HTMLAttributes {
      for?: string | undefined;
      form?: string | undefined;
      htmlFor?: string | undefined;
      name?: string | undefined;
    }

    interface ParamHTMLAttributes extends HTMLAttributes {
      name?: string | undefined;
      value?: string | number | undefined;
    }

    interface ProgressHTMLAttributes extends HTMLAttributes {
      max?: number | string | undefined;
      value?: string | number | undefined;
    }

    interface QuoteHTMLAttributes extends HTMLAttributes {
      cite?: string | undefined;
    }

    interface ScriptHTMLAttributes extends HTMLAttributes {
      async?: boolean | undefined;
      /** @deprecated */
      charset?: string | undefined;
      /** @deprecated */
      charSet?: string | undefined;
      crossorigin?: HTMLAttributeCrossOrigin;
      crossOrigin?: HTMLAttributeCrossOrigin;
      defer?: boolean | undefined;
      integrity?: string | undefined;
      nomodule?: boolean | undefined;
      noModule?: boolean | undefined;
      referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
      referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
      src?: string | undefined;
      type?: string | undefined;
    }

    interface SelectHTMLAttributes extends HTMLAttributes {
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      defaultValue?: string | number | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      multiple?: boolean | undefined;
      name?: string | undefined;
      required?: boolean | undefined;
      size?: number | undefined;
      value?: string | number | undefined;
    }

    interface SlotHTMLAttributes extends HTMLAttributes {
      name?: string | undefined;
    }

    interface SourceHTMLAttributes extends HTMLAttributes {
      height?: number | string | undefined;
      media?: string | undefined;
      sizes?: string | undefined;
      src?: string | undefined;
      srcset?: string | undefined;
      srcSet?: string | undefined;
      type?: string | undefined;
      width?: number | string | undefined;
    }

    interface StyleHTMLAttributes extends HTMLAttributes {
      media?: string | undefined;
      scoped?: boolean | undefined;
      type?: string | undefined;
    }

    interface TableHTMLAttributes extends HTMLAttributes {
      cellPadding?: string | undefined;
      cellSpacing?: string | undefined;
      summary?: string | undefined;
      width?: number | string | undefined;
    }

    interface TdHTMLAttributes extends HTMLAttributes {
      align?: "left" | "center" | "right" | "justify" | "char" | undefined;
      colspan?: number | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowspan?: number | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
      height?: number | string | undefined;
      width?: number | string | undefined;
      valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
    }

    interface TextareaHTMLAttributes extends HTMLAttributes {
      autocomplete?: string | undefined;
      autoComplete?: string | undefined;
      cols?: number | undefined;
      defaultValue?: string | number | undefined;
      dirName?: string | undefined;
      disabled?: boolean | undefined;
      form?: string | undefined;
      maxlength?: number | undefined;
      maxLength?: number | undefined;
      minlength?: number | undefined;
      minLength?: number | undefined;
      name?: string | undefined;
      placeholder?: string | undefined;
      readOnly?: boolean | undefined;
      required?: boolean | undefined;
      rows?: number | undefined;
      value?: string | number | undefined;
      wrap?: string | undefined;
    }

    interface ThHTMLAttributes extends HTMLAttributes {
      align?: "left" | "center" | "right" | "justify" | "char" | undefined;
      colspan?: number | undefined;
      colSpan?: number | undefined;
      headers?: string | undefined;
      rowspan?: number | undefined;
      rowSpan?: number | undefined;
      scope?: string | undefined;
      abbr?: string | undefined;
    }

    interface TimeHTMLAttributes extends HTMLAttributes {
      datetime?: string | undefined;
      dateTime?: string | undefined;
    }

    interface TrackHTMLAttributes extends MediaHTMLAttributes {
      default?: boolean | undefined;
      kind?: string | undefined;
      label?: string | undefined;
      srclang?: string | undefined;
      srcLang?: string | undefined;
    }

    interface VideoHTMLAttributes extends MediaHTMLAttributes {
      disablePictureInPicture?: boolean | undefined;
      height?: number | string | undefined;
      playsinline?: boolean | undefined;
      playsInline?: boolean | undefined;
      poster?: string | undefined;
      width?: number | string | undefined;
    }

    type DetailedHTMLProps<HA extends HTMLAttributes> = HA;

    interface MathMLAttributes extends HTMLAttributes {
      dir?: "ltr" | "rtl" | undefined;
      displaystyle?: boolean | undefined;
      /** @deprecated This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/href */
      href?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathbackground */
      mathbackground?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathcolor */
      mathcolor?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathsize */
      mathsize?: string | undefined;
      nonce?: string | undefined;
      scriptlevel?: string | undefined;
    }

    interface AnnotationMathMLAttributes extends MathMLAttributes {
      encoding?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
      src?: string | undefined;
    }

    interface AnnotationXmlMathMLAttributes extends MathMLAttributes {
      encoding?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
      src?: string | undefined;
    }

    interface MActionMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#actiontype */
      actiontype?: "statusline" | "toggle" | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#selection */
      selection?: string | undefined;
    }

    interface MathMathMLAttributes extends MathMLAttributes {
      display?: "block" | "inline" | undefined;
    }

    interface MEncloseMathMLAttributes extends MathMLAttributes {
      notation?: string | undefined;
    }

    type MErrorMathMLAttributes = MathMLAttributes;

    interface MFencedMathMLAttributes extends MathMLAttributes {
      close?: string | undefined;
      open?: string | undefined;
      separators?: string | undefined;
    }

    interface MFracMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#denomalign */
      denomalign?: "center" | "left" | "right" | undefined;
      linethickness?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#numalign */
      numalign?: "center" | "left" | "right" | undefined;
    }

    interface MiMathMLAttributes extends MathMLAttributes {
      /**
       * The only value allowed in the current specification is normal (case insensitive) See
       * https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi#mathvariant
       */
      mathvariant?:
        | "normal"
        | "bold"
        | "italic"
        | "bold-italic"
        | "double-struck"
        | "bold-fraktur"
        | "script"
        | "bold-script"
        | "fraktur"
        | "sans-serif"
        | "bold-sans-serif"
        | "sans-serif-italic"
        | "sans-serif-bold-italic"
        | "monospace"
        | "initial"
        | "tailed"
        | "looped"
        | "stretched"
        | undefined;
    }

    interface MmultiScriptsMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#subscriptshift */
      subscriptshift?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#superscriptshift */
      superscriptshift?: string | undefined;
    }

    type MNMathMLAttributes = MathMLAttributes;

    interface MOMathMLAttributes extends MathMLAttributes {
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo#accent */
      accent?: boolean | undefined;
      fence?: boolean | undefined;
      largeop?: boolean | undefined;
      lspace?: string | undefined;
      maxsize?: string | undefined;
      minsize?: string | undefined;
      movablelimits?: boolean | undefined;
      rspace?: string | undefined;
      separator?: boolean | undefined;
      stretchy?: boolean | undefined;
      symmetric?: boolean | undefined;
    }

    interface MOverMathMLAttributes extends MathMLAttributes {
      accent?: boolean | undefined;
    }

    interface MPaddedMathMLAttributes extends MathMLAttributes {
      depth?: string | undefined;
      height?: string | undefined;
      lspace?: string | undefined;
      voffset?: string | undefined;
      width?: string | undefined;
    }

    type MPhantomMathMLAttributes = MathMLAttributes;

    type MPrescriptsMathMLAttributes = MathMLAttributes;

    type MRootMathMLAttributes = MathMLAttributes;

    type MRowMathMLAttributes = MathMLAttributes;

    interface MSMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
      lquote?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
      rquote?: string | undefined;
    }

    interface MSpaceMathMLAttributes extends MathMLAttributes {
      depth?: string | undefined;
      height?: string | undefined;
      width?: string | undefined;
    }

    type MSqrtMathMLAttributes = MathMLAttributes;

    interface MStyleMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#background */
      background?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#color */
      color?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontsize */
      fontsize?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontstyle */
      fontstyle?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontweight */
      fontweight?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptminsize */
      scriptminsize?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptsizemultiplier */
      scriptsizemultiplier?: string | undefined;
    }

    interface MSubMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub#subscriptshift */
      subscriptshift?: string | undefined;
    }

    interface MSubsupMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#subscriptshift */
      subscriptshift?: string | undefined;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#superscriptshift */
      superscriptshift?: string | undefined;
    }

    interface MSupMathMLAttributes extends MathMLAttributes {
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup#superscriptshift */
      superscriptshift?: string | undefined;
    }

    interface MTableMathMLAttributes extends MathMLAttributes {
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#align */
      align?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnalign */
      columnalign?: "center" | "left" | "right" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnlines */
      columnlines?: "dashed" | "none" | "solid" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnspacing */
      columnspacing?: string | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#frame */
      frame?: "dashed" | "none" | "solid" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#framespacing */
      framespacing?: string | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowalign */
      rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowlines */
      rowlines?: "dashed" | "none" | "solid" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowspacing */
      rowspacing?: string | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#width */
      width?: string | undefined;
    }

    interface MTdMathMLAttributes extends MathMLAttributes {
      columnspan?: number | undefined;
      rowspan?: number | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#columnalign */
      columnalign?: "center" | "left" | "right" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#rowalign */
      rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    }

    type MTextMathMLAttributes = MathMLAttributes;

    interface MTrMathMLAttributes extends MathMLAttributes {
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#columnalign */
      columnalign?: "center" | "left" | "right" | undefined;
      /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#rowalign */
      rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    }

    interface MUnderMathMLAttributes extends MathMLAttributes {
      accentunder?: boolean | undefined;
    }

    interface MUnderoverMathMLAttributes extends MathMLAttributes {
      accent?: boolean | undefined;
      accentunder?: boolean | undefined;
    }

    type SemanticsMathMLAttributes = MathMLAttributes;

    interface IntrinsicSVGElements {
      svg: SVGAttributes;
      animate: SVGAttributes;
      circle: SVGAttributes;
      animateMotion: SVGAttributes;
      animateTransform: SVGAttributes;
      clipPath: SVGAttributes;
      defs: SVGAttributes;
      desc: SVGAttributes;
      ellipse: SVGAttributes;
      feBlend: SVGAttributes;
      feColorMatrix: SVGAttributes;
      feComponentTransfer: SVGAttributes;
      feComposite: SVGAttributes;
      feConvolveMatrix: SVGAttributes;
      feDiffuseLighting: SVGAttributes;
      feDisplacementMap: SVGAttributes;
      feDistantLight: SVGAttributes;
      feDropShadow: SVGAttributes;
      feFlood: SVGAttributes;
      feFuncA: SVGAttributes;
      feFuncB: SVGAttributes;
      feFuncG: SVGAttributes;
      feFuncR: SVGAttributes;
      feGaussianBlur: SVGAttributes;
      feImage: SVGAttributes;
      feMerge: SVGAttributes;
      feMergeNode: SVGAttributes;
      feMorphology: SVGAttributes;
      feOffset: SVGAttributes;
      fePointLight: SVGAttributes;
      feSpecularLighting: SVGAttributes;
      feSpotLight: SVGAttributes;
      feTile: SVGAttributes;
      feTurbulence: SVGAttributes;
      filter: SVGAttributes;
      foreignObject: SVGAttributes;
      g: SVGAttributes;
      image: SVGAttributes;
      line: SVGAttributes;
      linearGradient: SVGAttributes;
      marker: SVGAttributes;
      mask: SVGAttributes;
      metadata: SVGAttributes;
      mpath: SVGAttributes;
      path: SVGAttributes;
      pattern: SVGAttributes;
      polygon: SVGAttributes;
      polyline: SVGAttributes;
      radialGradient: SVGAttributes;
      rect: SVGAttributes;
      set: SVGAttributes;
      stop: SVGAttributes;
      switch: SVGAttributes;
      symbol: SVGAttributes;
      text: SVGAttributes;
      textPath: SVGAttributes;
      tspan: SVGAttributes;
      use: SVGAttributes;
      view: SVGAttributes;
    }

    interface IntrinsicMathMLElements {
      annotation: AnnotationMathMLAttributes;
      "annotation-xml": AnnotationXmlMathMLAttributes;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction */
      maction: MActionMathMLAttributes;
      math: MathMathMLAttributes;
      /** This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose */
      menclose: MEncloseMathMLAttributes;
      merror: MErrorMathMLAttributes;
      /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfenced */
      mfenced: MFencedMathMLAttributes;
      mfrac: MFracMathMLAttributes;
      mi: MiMathMLAttributes;
      mmultiscripts: MmultiScriptsMathMLAttributes;
      mn: MNMathMLAttributes;
      mo: MOMathMLAttributes;
      mover: MOverMathMLAttributes;
      mpadded: MPaddedMathMLAttributes;
      mphantom: MPhantomMathMLAttributes;
      mprescripts: MPrescriptsMathMLAttributes;
      mroot: MRootMathMLAttributes;
      mrow: MRowMathMLAttributes;
      ms: MSMathMLAttributes;
      mspace: MSpaceMathMLAttributes;
      msqrt: MSqrtMathMLAttributes;
      mstyle: MStyleMathMLAttributes;
      msub: MSubMathMLAttributes;
      msubsup: MSubsupMathMLAttributes;
      msup: MSupMathMLAttributes;
      mtable: MTableMathMLAttributes;
      mtd: MTdMathMLAttributes;
      mtext: MTextMathMLAttributes;
      mtr: MTrMathMLAttributes;
      munder: MUnderMathMLAttributes;
      munderover: MUnderMathMLAttributes;
      semantics: SemanticsMathMLAttributes;
    }

    interface IntrinsicElements extends IntrinsicSVGElements, IntrinsicMathMLElements {
      a: AnchorHTMLAttributes;
      abbr: HTMLAttributes;
      address: HTMLAttributes;
      area: AreaHTMLAttributes;
      article: HTMLAttributes;
      aside: HTMLAttributes;
      audio: AudioHTMLAttributes;
      b: HTMLAttributes;
      base: BaseHTMLAttributes;
      bdi: HTMLAttributes;
      bdo: HTMLAttributes;
      blockquote: BlockquoteHTMLAttributes;
      body: HTMLAttributes;
      br: HTMLAttributes;
      button: ButtonHTMLAttributes;
      canvas: CanvasHTMLAttributes;
      caption: HTMLAttributes;
      cite: HTMLAttributes;
      code: HTMLAttributes;
      col: ColHTMLAttributes;
      colgroup: ColgroupHTMLAttributes;
      data: DataHTMLAttributes;
      datalist: HTMLAttributes;
      dd: HTMLAttributes;
      del: DelHTMLAttributes;
      details: DetailsHTMLAttributes;
      dfn: HTMLAttributes;
      dialog: DialogHTMLAttributes;
      div: HTMLAttributes;
      dl: HTMLAttributes;
      dt: HTMLAttributes;
      em: HTMLAttributes;
      embed: EmbedHTMLAttributes;
      fieldset: FieldsetHTMLAttributes;
      figcaption: HTMLAttributes;
      figure: HTMLAttributes;
      footer: HTMLAttributes;
      form: FormHTMLAttributes;
      h1: HTMLAttributes;
      h2: HTMLAttributes;
      h3: HTMLAttributes;
      h4: HTMLAttributes;
      h5: HTMLAttributes;
      h6: HTMLAttributes;
      head: HTMLAttributes;
      header: HTMLAttributes;
      hgroup: HTMLAttributes;
      hr: HTMLAttributes;
      html: HTMLAttributes;
      i: HTMLAttributes;
      iframe: IframeHTMLAttributes;
      img: ImgHTMLAttributes;
      input: InputHTMLAttributes;
      ins: InsHTMLAttributes;
      kbd: HTMLAttributes;
      label: LabelHTMLAttributes;
      legend: HTMLAttributes;
      li: LiHTMLAttributes;
      link: LinkHTMLAttributes;
      main: HTMLAttributes;
      map: MapHTMLAttributes;
      mark: HTMLAttributes;
      menu: MenuHTMLAttributes;
      meta: MetaHTMLAttributes;
      meter: MeterHTMLAttributes;
      nav: HTMLAttributes;
      noscript: HTMLAttributes;
      object: ObjectHTMLAttributes;
      ol: OlHTMLAttributes;
      optgroup: OptgroupHTMLAttributes;
      option: OptionHTMLAttributes;
      output: OutputHTMLAttributes;
      p: HTMLAttributes;
      param: ParamHTMLAttributes;
      picture: HTMLAttributes;
      pre: HTMLAttributes;
      progress: ProgressHTMLAttributes;
      q: QuoteHTMLAttributes;
      rp: HTMLAttributes;
      rt: HTMLAttributes;
      ruby: HTMLAttributes;
      s: HTMLAttributes;
      samp: HTMLAttributes;
      script: ScriptHTMLAttributes;
      search: HTMLAttributes;
      section: HTMLAttributes;
      select: SelectHTMLAttributes;
      slot: SlotHTMLAttributes;
      small: HTMLAttributes;
      source: SourceHTMLAttributes;
      span: HTMLAttributes;
      strong: HTMLAttributes;
      style: StyleHTMLAttributes;
      sub: HTMLAttributes;
      summary: HTMLAttributes;
      sup: HTMLAttributes;
      table: TableHTMLAttributes;
      tbody: HTMLAttributes;
      td: TdHTMLAttributes;
      template: HTMLAttributes;
      textarea: TextareaHTMLAttributes;
      tfoot: HTMLAttributes;
      th: ThHTMLAttributes;
      thead: HTMLAttributes;
      time: TimeHTMLAttributes;
      title: HTMLAttributes;
      tr: HTMLAttributes;
      track: TrackHTMLAttributes;
      u: HTMLAttributes;
      ul: HTMLAttributes;
      var: HTMLAttributes;
      video: VideoHTMLAttributes;
      wbr: HTMLAttributes;
    }
  }
}

export {};
