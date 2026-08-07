# HAKAMIQ Fluent 2 compliance map

This document records how Fluent 2 guidance is applied to the Astro site. The goal is consistency and accessibility, not adding every Fluent component to the interface.

## Platform decision

HAKAMIQ is a server-rendered/static Astro website. It uses semantic HTML plus a tokenized Fluent 2 CSS layer. React-only components are not introduced just to imitate Fluent React. A Fluent component is added only when the product has the corresponding interaction or information need.

The Fluent UI Web Components introduction is treated as an architecture contract, not as a requirement to install a runtime package everywhere. The site follows its six stated goals:

- **Customizable**: HAKAMIQ branding is expressed through semantic Fluent aliases and theme tokens instead of hard-coded per-component colors.
- **Performance**: Astro emits compressed HTML, noncritical media is lazy loaded, and interaction code remains framework-free.
- **Bundle size**: shared CSS is emitted as external cacheable assets; page-specific functionality is not replaced with a large framework/runtime bundle.
- **Interoperability**: controls use standards-based HTML/DOM behavior and remain compatible with modern browsers without React-specific assumptions.
- **Accessibility**: UI contracts target WCAG 2.2 through semantic elements, keyboard behavior, focus management, labels, landmarks, reduced motion, and forced-colors support.
- **Design to Code**: reusable components consume the central Fluent token layer so design-language changes propagate through aliases rather than one-off values.

Web Components may be introduced when lifecycle or encapsulation provides concrete value. Native semantic HTML remains preferred for simple links, buttons, selects, navigation, and article content because it is lighter and already exposes the correct browser semantics.

## Product invariants

These are intentional product decisions and must not be reversed by visual refactoring:

- Full article: **article title → full content directly**.
- Article description is for discovery cards, search, and metadata; it is not rendered again as an article summary.
- Do not show the migrated original-source link in the article UI.
- Do not show publication dates on the homepage.
- Do not add the category sidebar to the homepage.
- Do not reintroduce the removed footer logo, footer description, or removed English footer block.
- Do not hide or delete meaningful article images, steps, tables, downloads, or explanatory text to make a layout cleaner.
- The only automatic article-body removal allowed at render time is one heading that duplicates the page title.

## Design language

- Color: semantic dark-theme aliases; raw component colors belong in `fluent-core-theme.css` only.
- Elevation: shadows communicate layering; hover does not move cards vertically.
- Iconography: simple single-color SVG icons using `currentColor`, with shared size tokens.
- Layout: responsive gutters and bounded reading widths; rich media can use a wider editorial canvas.
- Material: persistent surfaces are solid; acrylic is reserved for transient desktop flyouts.
- Motion: short, purposeful property-specific transitions; reduced-motion preferences are honored.
- Shapes: Fluent radius and stroke tokens are used instead of arbitrary per-component values.
- Typography: system/native font stack with Fluent type tokens; the unused Atkinson pipeline was removed. `fluent-text.css` maps the documented Text size scale `100–1000` onto the existing type ramp and exposes regular/medium/semibold/bold weights, base/numeric/monospace fonts, logical start/end/center/justify alignment, block/nowrap/truncate, italic/underline/strikethrough, and a two-line clamp helper for card content.

## Theme and tokens

The product currently has one intentional theme: **Web Dark**. There is no light/dark theme switcher, so adding the official `setTheme()` runtime would not change user-visible behavior and would add unnecessary runtime/package cost.

The equivalent static contract is:

- `fluent-core-theme.css` is the single root token source.
- Semantic component styles consume token aliases instead of duplicating raw values.
- `color-scheme="dark"` and the browser `theme-color` are declared in `BaseHead.astro`.
- Windows forced-colors/high-contrast behavior is handled by platform CSS rather than a separate hard-coded high-contrast theme.
- If theme switching is added later, theme changes must update tokens at a root or scoped element while component CSS remains unchanged, matching the Fluent `setTheme` model.

## UX frameworks

- Accessibility: WCAG-oriented semantic landmarks, Skip Link, focus-visible states, 44 px coarse-pointer targets, reduced motion, forced colors, accessible image semantics, modal drawer focus management.
- Content design: concise Arabic UI copy; product/emulator names remain technically accurate; no unnecessary branding repetition.
- Design tokens: global + semantic alias token model.
- Handoffs: breadcrumbs and active navigation preserve hierarchy and context.
- Onboarding: no modal onboarding is added because the site has no onboarding task that warrants interruption.
- Wait UX: no spinner for local synchronous search; lazy loading/async decoding is used for noncritical media.

## AI boundary

The site currently has no AI assistant, agent, model-generated response surface, or prompt-driven feature. Responsible-AI and system-prompt rules therefore remain an explicit future-feature boundary rather than a fake UI implementation. If AI is added, it requires a dedicated system prompt, harm analysis, interaction contract, and eval suite before release.

## Fluent component applicability

### Used and governed

- **Accordion / disclosure**: expandable category groups keep simple disclosure mechanics; the category hierarchy is additionally exposed as a Tree because it is genuinely hierarchical navigation.
- **Badge**: category labels and article/count metadata.
- **Button / icon button**: navigation disclosure, drawer controls, search clear controls, pagination-related actions where appropriate.
- **Divider**: semantic/visual separation through the shared divider primitive and normalized `<hr>` treatment.
- **Drawer**: responsive blog sidebar; modal on smaller layouts with scrim, Escape dismissal, focus trap, and focus restoration.
- **Dropdown / Select**: the article page-size selector uses a labeled native `<select class="fui-select">`; native semantics are retained instead of replacing it with a heavier custom popup.
- **Field / Label**: field stacks, labels, hints and validation messages are defined centrally. Search and page-size controls keep persistent associated labels; placeholders are hints, not label replacements.
- **Image**: template images require meaningful `alt` text or `alt=""` when decorative; loading priority and decoding are handled according to context.
- **Link**: navigation remains semantic links; action-only interactions remain buttons. New-window links disclose the new context and use safe `rel` values.
- **Menu-like flyouts**: the header deliberately uses disclosure-navigation semantics instead of claiming ARIA Menu/MenuItem behavior without the complete menu keyboard model.
- **Text**: native semantic elements remain the source of meaning while `.fui-text` utilities provide Fluent presentation. Sizes `100–1000`, wrapping/truncation, four weights, logical alignment, font variants and stable numeric rendering are available.
- **TextInput contract**: native text inputs have centralized outline/filled appearances, small/medium/large sizing, block sizing, hover/focus/disabled/readonly states and tokenized styling. Current free-text entry points are Searchbox composites, so no redundant standalone TextInput is rendered just to demonstrate the primitive.
- **Tooltip**: compact/icon controls are progressively enhanced from supplemental `title` hints to one shared tooltip surface. Hover and keyboard focus are supported; Escape closes it; `role="tooltip"` and `aria-describedby` are applied.
- **Tree / Tree Item**: the category browser is a two-level navigation tree with `tree`, `treeitem`, and `group` semantics, roving focus, Arrow Up/Down/Left/Right, Home and End behavior.

### Contract ready, rendered only when a real task requires it

- **TextArea**: appearance, sizing, block mode, resize modes, auto-resize minimum block size, validation, disabled and readonly states are implemented centrally. No TextArea is rendered because the site currently has no multi-line user-input feature. Comments, feedback, or a real contact form may activate it later.
- **MessageBar**: visual status primitives exist, but no persistent message bar is inserted without an actual user-facing status/error condition.
- **ProgressBar**: native progress styling exists, but no progress indicator is shown for synchronous/static work.
- **Dialog**: native dialog styling exists as a base contract, but no modal is introduced without a task that requires one.

### Not currently applicable

Avatar, Checkbox, Combobox, Radio, RadioGroup, Rating Display, Slider, Spinner, Switch, Tablist and Toolbar are currently N/A because the site has no corresponding person identity, multi-choice, exclusive-choice, rating, continuous-value, asynchronous-wait, binary-setting, tabbed-view or toolbar task.

These are not missing requirements. Adding unused controls would increase cognitive load, bundle/maintenance cost, and surface area without adding product value.

## Automated gates

`npm run ui:quality` checks source-level Fluent/product invariants before production builds.

`npm run ui:quality:report` writes `reports/fluent-ui-quality.json` for CI artifacts and regression tracking.

`npm run web:quality` checks Fluent UI Web Components architecture principles that matter to this Astro implementation: compact output, cacheable shared CSS, framework interoperability, theme/tokens, Text, Field/Label/TextInput/Select/TextArea, Tooltip, Tree, and component applicability.

The gates currently check:

- Skip Link/main landmark coverage.
- Article title/content ordering and removed article metadata UI.
- Homepage/footer removal invariants.
- Navigation disclosure semantics.
- Drawer/accordion/search accessibility contracts.
- No CSS `display:none` hiding article content.
- Semantic token discipline and no `transition: all`.
- Removal of the legacy font pipeline.
- `alt` attributes on template images.
- Accessible labels and safe `rel` values on new-tab links.
- Compressed Astro HTML and cacheable shared CSS.
- No accidental React-only Fluent runtime or global third-party script dependency.
- Root Web Dark theme, browser color-scheme, browser theme color and required token definitions.
- Fluent Text size utilities `100–1000`, documented weights, logical RTL-safe alignment, font variants, truncation/nowrap/block behavior, and tabular numeric rendering.
- Field/Label/TextInput/Select/TextArea appearance, size, validation, disabled/readonly and auto-resize contracts.
- Tooltip focus/hover/Escape behavior, `role="tooltip"`, `aria-describedby`, logical positioning, semantic tokens, and reduced-motion styling.
- Tree `tree/treeitem/group` semantics and Arrow/Home/End keyboard behavior for the category hierarchy.
- Discovery of future Checkbox, Radio, Slider, Dialog, ProgressBar or TextArea UI so its specific Fluent contract can be reviewed before shipping.
