# menu-component

The menu web component is a versatile dropdown like that can be use in different ways.

- The host of `<menu-component />` can't be styled directly.
- To offset the menu, use `margin` on the `::part(container)` element.

**Usage**

```html
<menu-component values="0" match-trigger-width="true" type="select">
  <select-option value="0">Option 1</select-option>
  <select-option value="1">Option 2</select-option>
</menu-component>
```

**Methods**

- `refresh()` Force a refresh of the menu after adding/removing `select-option` elements.
- `open()` Open and expand the menu
- `close()` Close and collapse the menu
- `toggle()` Toggle the menu between open and closed

**Props**

- `preferUpwards` (Get/Set) Prefer to open the menu above the trigger button when possible. Defaults to `false`. (default: `false`)
- `preferRight` (Get/Set) Prefer to open the menu to the right of the trigger button when possible. Defaults to `false`. (default: `false`)
- `matchTriggerWidth` (Get/Set) Match the width of the trigger button. Defaults to `false`. (default: `false`)
- `disabled` (Get/Set) Disable the menu trigger button. Defaults to `false`. (default: `false`)
- `required` (Get/Set) When used with forms. (default: `false`)
- `backdropClose` (Get/Set) Dismiss the menu when clicking outside the menu. Defaults to `true`. (default: `true`)
- `escapeClose` (Get/Set) Dismiss the menu when pressing the escape key. Defaults to `true`. (default: `true`)
- `closeButton` (Get/Set) Show a close button. Defaults to `false`. (default: `false`)
- `multiselect` (Get/Set) Enable multiselect. Defaults to `false`. (default: `false`)
- `value` (Get/Set) The selected value.
- `values` (Get/Set) The selected values. when `multiselect` is `true`.
- `valueAsType` (Get) The parsed value from the `value` attribute string.
- `valuesAsTypes` (Get) The parsed values from the `values` attribute string.
- `closeOnSelect` (Get/Set) Close the menu when an option is selected. Defaults to `false`. (default: `true`)
- `isOpen` (Get) Whether the menu is open
- `trigger` (Get) Get the trigger button element

**Events**

- `open` Emitted when the menu is opened.
- `close` Emitted when the menu is closed.
- `pick` Emitted when a value is selected.

**Slots**

- `trigger` The menu trigger button content.
- `Default` The content of the menu.

**Attributes**

- `"prefer-upwards"` Prefer to open the menu above the trigger button when possible. Defaults to `false`. (default: `false`)
- `"prefer-right"` Prefer to open the menu to the right of the trigger button when possible. Defaults to `false`. (default: `false`)
- `"match-trigger-width"` Match the width of the trigger button. Defaults to `false`. (default: `false`)
- `"disabled"` Disable the menu trigger button. Defaults to `false`. (default: `false`)
- `"required"` When used with forms. (default: `false`)
- `"backdrop-close"` Dismiss the menu when clicking outside the menu. Defaults to `true`. (default: `true`)
- `"escape-close"` Dismiss the menu when pressing the escape key. Defaults to `true`. (default: `true`)
- `"close-button"` Show a close button. Defaults to `false`. (default: `false`)
- `"popover-role"`
- `"popover-label"`
- `"trigger-label"`
- `"close-on-select"` Close the menu when an option is selected. Defaults to `false`. (default: `true`)
- `"style"`
- `"multiselect"` Enable multiselect. Defaults to `false`. (default: `false`)
- `"value"` The selected value.
- `"values"` The selected values separated by `;`. when `multiselect` is `true`
- `"type"` An easy way to setup the accessibility. Defaults to `menu`. (default: `"menu"`)

**CSS Properties**

- `--clr-background` The background color of the menu.
- `--ease-anim` The easing function of the open/close animation.
- `--dur-anim` The duration of the open/close animation.
- `--clr-scrollbar` The color of the menu scrollbar.
- `--sz-close-icon` The size of the close button svg icon.
- `--clr-close-icon` The color of the close button svg icon.

**CSS Parts**

- `::part(trigger)` The menu trigger button element.
- `::part(container)` The menu popover element.
- `::part(close-button)` The close button element.

**CSS States**

- `:state(open)`
