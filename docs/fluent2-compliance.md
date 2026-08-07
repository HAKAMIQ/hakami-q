# HAKAMIQ Fluent 2 compliance map

This document records how Fluent 2 guidance is applied to the Astro site. The goal is consistency and accessibility, not adding every Fluent component to the interface.

## Platform decision

HAKAMIQ is a server-rendered/static Astro website. It uses semantic HTML plus a tokenized Fluent 2 CSS layer. React-only components are not introduced just to imitate Fluent React. A Fluent component is added only when the product has the corresponding interaction or information need.

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
- Typography: system/native font stack with Fluent type tokens; the unused Atkinson pipeline was removed.

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

- Accordion: category groups in the blog sidebar. Headers are buttons with `aria-expanded` and `aria-controls`.
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
- Text: shared typography tokens.

### Not currently needed

Avatar, Avatar group, Carousel, Checkbox, Combobox, Dialog, Dropdown, Info label, Persona, Progress bar, Radio group, Rating, Select, Skeleton, Slider, Spin button, Spinner, Switch, Tablist, Tag, Tag picker, Textarea, Toast, Toolbar, Tooltip, Tree.

These are not missing requirements. They are intentionally absent because there is no current task that needs them. Adding unused controls would increase cognitive and implementation complexity and conflict with the Fluent principle of focus.

If a future feature genuinely needs one of these interactions, use the corresponding Fluent guidance and add it deliberately rather than repurposing an unrelated component.

## Automated gates

`npm run ui:quality` checks the source-level Fluent/product invariants before production builds.

`npm run ui:quality:report` writes `reports/fluent-ui-quality.json` for CI artifacts and regression tracking.

The gate currently checks:

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
