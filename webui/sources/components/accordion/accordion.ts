import type { IWebComponent, WComponent } from "../wc";

type ExtraAttributes = {
  "initial-state": AccordionState;
  onchange: (e: CustomEvent) => void;
};

type ComponentTypes = WComponent<typeof AccordionComponent, ExtraAttributes>;

type AccordionState = "open" | "closed";

const COMPONENT_NAME = "accordion-component";

/**
 * A simple accordion web component.
 *
 * @usage
 * ```html
 * <accordion-component group="group 1">
 *   <p slot="summary">
 *     <strong>group 1</strong>
 *   </p>
 *   <p>group 1 content.</p>
 * </accordion-component>
 *
 * <accordion-component group="group 1">
 *   <p slot="summary">
 *     <strong>group 1</strong>
 *   </p>
 *   <p>group 2 content.</p>
 * </accordion-component>
 * ```
 */
class AccordionComponent extends HTMLElement implements IWebComponent {
  static readonly htmlFragment = (() => {
    const template = document.createElement("template");
    template.innerHTML = import_as_string("@components/accordion/accordion-template.inline.html", { minify: true });
    return template.content;
  })();

  static readonly stylesheet = (() => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(import_as_string("@components/accordion/accordion-style.inline.css", { minify: true }));
    return sheet;
  })();

  readonly #internals: ElementInternals;
  readonly #triggerEl: HTMLButtonElement;
  readonly #contentEl: HTMLDivElement;
  readonly #expanderEl: HTMLDivElement;

  /** Emitted when the accordion changes the expand state open/close. */
  readonly #change = new CustomEvent("change");

  //#region Public Props
  #group: string = "";
  /** The group name. Components with the same group name will only allow one to be opened at a time. */
  get group(): string {
    return this.#group;
  }
  set group(val: string) {
    this.#group = val;
  }

  #initialState: AccordionState = "closed";
  /**
   * The initial state of the accordion on the first load.
   *
   * @attr initial-state
   */
  get initialState() {
    return this.#initialState;
  }
  set initialState(val: AccordionState) {
    this.#initialState = val;
    this.setAttribute("initial-state", val);
  }

  /** Whether if the accordion component is expanded/open. */
  get isExpanded(): boolean {
    return this.#triggerEl.getAttribute("aria-expanded") === "true";
  }
  //#endregion

  //#region HTMLElement Methods
  constructor() {
    super();

    this.#internals = this.attachInternals();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [AccordionComponent.stylesheet];
    shadow.appendChild(AccordionComponent.htmlFragment.cloneNode(true));

    const triggerEl = shadow.querySelector<HTMLButtonElement>(".accordion-trigger");
    if (!triggerEl) {
      console.error("[accordion-component]: couldn't find the element with the class `accordion-trigger`.");
    }

    const contentEl = shadow.querySelector<HTMLDivElement>(".content");
    if (!contentEl) {
      console.error("[accordion-component]: couldn't find the element with the class `content`.");
    }

    const expanderEl = shadow.querySelector<HTMLDivElement>(".expander");
    if (!expanderEl) {
      console.error("[accordion-component]: couldn't find the element with the class `expander`.");
    }

    this.#triggerEl = triggerEl!;
    this.#contentEl = contentEl!;
    this.#expanderEl = expanderEl!;
  }

  connectedCallback(): void {
    this.#triggerEl.addEventListener("click", this.toggle);

    const initialStateAttr = this.getAttribute("initial-state");
    if (initialStateAttr === "closed" || initialStateAttr === "open") {
      this.initialState = initialStateAttr;
    }
    if (this.initialState === "open") this.open();
  }

  disconnectedCallback(): void {
    this.#triggerEl.removeEventListener("click", this.toggle);
  }

  static get observedAttributes() {
    return ["group"] as const;
  }

  attributeChangedCallback(name: ComponentTypes["ObservedAttributes"], _oldValue: string | null, newValue: string | null) {
    if (name === "group") {
      this.group = newValue ?? "";
      return;
    }

    const _exhaustiveCheck: never = name;
    return _exhaustiveCheck;
  }

  getAttribute(qualifiedName: ComponentTypes["ObservedAttributes"] | (string & {})): string | null {
    if (qualifiedName === "group") return this.#group;
    return super.getAttribute(qualifiedName);
  }
  //#endregion

  //#region Public Methods
  /** Expand the accordion component. */
  open = () => {
    this.#contentEl.style.visibility = "visible";
    this.#internals.states.add("open");
    this.#triggerEl.setAttribute("aria-expanded", "true");

    // close other details with the same group
    if (!this.#group) return;
    const accordionComponents = document.querySelectorAll<AccordionComponent>(`${this.localName}[group="${this.#group}"]`);
    for (let i = 0; i < accordionComponents.length; i++) {
      const cp = accordionComponents[i];
      if (cp === this) continue;
      if (cp.isExpanded) cp.close();
    }
  };

  /** Collapse the accordion component. */
  close = () => {
    this.#expanderEl.ontransitionend = () => {
      if (this.isExpanded) return;
      this.#contentEl.style.visibility = "collapse";
      this.#internals.states.delete("open");
      this.#expanderEl.ontransitionend = null;
    };

    this.#triggerEl.setAttribute("aria-expanded", "false");
  };

  /** Toggle the accordion component between expand and collapse. */
  toggle = () => {
    if (this.isExpanded) {
      this.close();
    } else {
      this.open();
    }

    this.dispatchEvent(this.#change);
  };
  //#endregion
}

customElements.define(COMPONENT_NAME, AccordionComponent);

export type { AccordionComponent };

declare global {
  type AccordionComponent = ComponentTypes["Instance"];

  interface HTMLElementTagNameMap {
    [COMPONENT_NAME]: AccordionComponent;
  }
}
