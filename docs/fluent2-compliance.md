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

## UX frameworks

- Accessibility: WCAG-oriented semantic landmarks, Skip Link, focus-visible states, 44 px coarse-pointer targets, reduced motion, forced colors, accessible image semantics, modal drawer focus management.
- Content design: concise Arabic UI copy; product/emulator names remain technically accurate; no unnecessary branding repetition.
- Design tokens: global + semantic alias token model.
- Handoffs: breadcrumbs and active navigation preserve hierarchy and context.
- Onboarding: no modal onboarding is added because the site has no onboarding task that warrants interruption.
- Wait UX: no spinner for local synchronous search; lazy loading/async decoding is used for noncritical media.

## AI boundary

The site currently has no AI assistant, agent, model-generated response surface, or prompt-driven feature. Responsible-AI and system-prompt rules therefore remain an explicit future-feature boundary rather than a fake UI implementation. If AI is added, it requires a dedicated system prompt, harm analysis, interaction contract, and eval suite before release.

## Web components currently represented

### Used and governed

- Accordion/disclosure behavior: expandable category groups retain simple disclosure mechanics, but the category hierarchy is exposed to assistive technology as a Tree because it is genuinely hierarchical navigation.
- Badge: category/count metadata.
- Breadcrumb: hierarchy on article, blog, and static pages.
- Button / icon button: navigation disclosure, drawer controls, search clear controls.
- Card: article previews and bounded content surfaces; one-action article cards use one full-card link.
- Divider: semantic/visual separation.
- Drawer: responsive blog sidebar; modal on smaller layouts with scrim, Escape dismissal, focus trap, and focus restoration.
- Field/Input/Searchbox: search experiences have labels and clear controls; placeholders are supplementary.
- Image: templates require `alt`; decorative duplicate imagery may use `alt=""`.
- Link: navigation uses links; action-only interactions use buttons.
- List: ranked/latest content and navigation lists.
- Menu-like flyouts: header uses disclosure-navigation semantics rather than claiming ARIA Menu roles without the full Menu keyboard contract.
- Nav: persistent top-level platform navigation and responsive hamburger pattern.
- Popover/material surface: transient desktop navigation flyouts use acrylic semantics.
- Text: native semantic elements remain the source of meaning while `.fui-text` utilities provide Fluent presentation. The site supports sizes `100–1000`, `nowrap`, `truncate`, `italic`, `underline`, `strikethrough`, `block`, four weights, logical alignment, base/numeric/monospace fonts, and stable tabular numerals for metadata such as dates, counts, page numbers, and badges.
- Tooltip: compact/icon controls that already expose native `title` hints are progressively upgraded to a single lightweight Fluent tooltip surface. The tooltip appears on hover and keyboard focus, uses `role="tooltip"` plus `aria-describedby`, supports logical positioning, closes with Escape, and respects reduced motion. Native title text is removed after enhancement to avoid duplicate tooltip UI.
- Tree: the category browser is a two-level navigation tree. The runtime assigns `tree`, `treeitem`, and `group` semantics and implements roving focus plus Arrow Up/Down, Arrow Left/Right, Home, and End keyboard navigation while keeping the existing visual design and links.

### Not currently needed

Avatar, Avatar group, Carousel, Checkbox, Combobox, Dialog, Dropdown, Info label, Persona, Progress bar, Radio group, Rating, Select, Skeleton, Slider, Spin button, Spinner, Switch, Tablist, Tag, Tag picker, TextArea, Toast, Toolbar.

These are not missing requirements. They are intentionally absent because there is no current task that needs them. Adding unused controls would increase cognitive and implementation complexity and conflict with the Fluent principle of focus.

### TextArea applicability

There is currently no multi-line user input anywhere in the site source, so no TextArea is rendered. Adding a fake TextArea would create a control with no task behind it. When a real feature such as comments, feedback, or a contact form needs multi-line input, it must implement the documented Fluent TextArea contract deliberately: an associated label, appearance and size, resize or auto-resize behavior, autocomplete/spellcheck decisions, required/maxlength/minlength rules where relevant, disabled/readonly states, and native constraint validation. Auto-resize must use a minimum block size instead of a fixed height.

## Automated gates

`npm run ui:quality` checks the source-level Fluent/product invariants before production builds.

`npm run ui:quality:report` writes `reports/fluent-ui-quality.json` for CI artifacts and regression tracking.

`npm run web:quality` checks the Fluent UI Web Components architecture principles that matter to this Astro implementation: compact output, cacheable shared CSS, framework interoperability, absence of global third-party runtime scripts, token consumption, Fluent Text, Tooltip, Tree, and component applicability.

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
- Required Fluent token definitions and semantic-token consumption by reusable components.
- Fluent Text size utilities `100–1000`, documented weights, logical RTL-safe alignment, font variants, truncation/nowrap/block behavior, and tabular numeric rendering.
- Tooltip focus/hover/Escape behavior, `role="tooltip"`, `aria-describedby`, logical positioning, semantic tokens, and reduced-motion styling.
- Tree `tree/treeitem/group` semantics and Arrow/Home/End keyboard behavior for the category hierarchy.
- Discovery of any future `<textarea>` so its Fluent TextArea contract can be reviewed before shipping.
