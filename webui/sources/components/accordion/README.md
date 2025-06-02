# accordion-component

A simple accordion web component.

**Usage**

```html
<accordion-component group="group 1">
  <p slot="summary">
    <strong>group 1</strong>
  </p>
  <p>group 1 content.</p>
</accordion-component>

<accordion-component group="group 1">
  <p slot="summary">
    <strong>group 1</strong>
  </p>
  <p>group 2 content.</p>
</accordion-component>
```

**Methods**

- `open()` Expand the accordion component.
- `close()` Collapse the accordion component.
- `toggle()` Toggle the accordion component between expand and collapse.

**Props**

- `test` (Get/Set)
- `group` (Get/Set) The group name. Components with the same group name will only allow one to be opened at a time.
- `initialState` (Get/Set) The initial state of the accordion on the first load. (default: `"closed"`)
- `isExpanded` (Get) Whether if the accordion component is expanded/open.

**Events**

- `statechange` Emitted when the accordion changes the expand state open/close.

**Slots**

- `summary` the summary/title of the accordion component.
- `Default` The content of the accordion component.

**Attributes**

- `"group"` The group name. Components with the same group name will only allow one to be opened at a time.
- `"initial-state"` The initial state of the accordion on the first load. (default: `"closed"`)

**CSS Properties**

- `--dur-anim` The duration for the open/close animation.
- `--ease-anim` The easing function for the open/close animation.
- `--clr-summary-background` The background color of the summary/title.
- `--clr-content-background` The background color of the content container.
- `--rad-border` The border radius of the accordion component.

**CSS Parts**

- `::part(container)` The accordion main container element.
- `::part(trigger)` The trigger button element.
- `::part(marker)` The accordion marker svg icon.
- `::part(content)` The content container of he accordion component.

**CSS States**

- `:state(open)`
