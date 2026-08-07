# HAKAMIQ content engineering policy

This policy adapts Fluent 2 content-engineering guidance to HAKAMIQ as a static editorial site.

## Scope

HAKAMIQ currently has no AI assistant, agent, model output, or prompt-driven feature. Therefore system-prompt engineering rules are not injected into the website. They become applicable only if an AI experience is deliberately added later.

The applicable part today is output-quality engineering: define what good published content looks like, evaluate it consistently, detect failure modes, and track quality over time.

## System-level content behavior

Role: HAKAMIQ publishes Arabic emulator, gaming, setup, troubleshooting, and platform guidance.

Task: present each article clearly and consistently across the home page, browsing pages, and the full article view.

Rules:

1. Full article pages follow one structure: **article title → full content directly**.
2. The article title is rendered once by the article template. The body must not repeat the same title as H1/H2/H3.
3. The description is a discovery/SEO summary. It belongs in cards, lists, metadata, and search—not as a second summary block before the full article.
4. Do not add an “original source” UI for HAKAMIQ-owned migrated content.
5. Never remove meaningful article images, steps, download information, tables, or explanatory text merely to make the layout cleaner.
6. Repeated long paragraphs or repeated sections should be treated as a content-quality defect unless repetition is intentionally required by the subject.
7. Use one page-level H1. Article subsections start at H2 and descend logically.
8. Preserve emulator/product names and technical terms accurately. Do not rewrite them only for stylistic consistency.
9. Use concise, descriptive Arabic for UI copy. Avoid filler, unnecessary branding repetition, and promotional phrasing.
10. Missing or uncertain source content is not silently invented or replaced.

## Output-quality requirements

### Critical failures

These fail the baseline quality gate:

- Missing article title.
- Missing article description.
- Empty article body.
- `<script>` embedded in article content.
- `javascript:` URLs in article content.

### Tracked warnings

These are reported for cleanup and become failures in strict mode:

- Article body repeats the page title.
- Additional H1 headings inside the body.
- Long duplicate paragraphs inside the same article.
- Images without `alt` text.
- Description repeats the title.
- Excessively long title or description.

Warnings are intentionally non-blocking for the migrated Blogger baseline so existing legacy content does not stop deployment. New content should aim for zero warnings. `npm run content:quality:strict` is available when the baseline is ready to be enforced strictly.

## Evaluation order

Evaluate in this order:

1. Safety and structural validity.
2. Duplicate title/content defects.
3. Metadata quality.
4. Accessibility metadata such as image alt text.
5. Editorial polish.

This order prevents visual polish from masking structural content problems.

## Experience-specific requirements

Home page and article-list cards:

- Show title, useful category context, and a concise description when space allows.
- Do not expose article-body duplication.
- Keep card text scannable and responsive.

Full article page:

- Show the page title once.
- Begin full article content immediately after the title area.
- Do not insert a repeated summary block.
- Keep meaningful images and instructional content intact.

Search:

- Return matching article titles with concise context.
- Report an explicit empty state instead of implying results exist.

## Evaluation commands

- `npm run content:quality` — baseline gate. Critical failures exit non-zero; legacy warnings are reported.
- `npm run content:quality:strict` — all warnings also exit non-zero.
- `npm run content:quality:report` — writes `reports/content-quality.json` for CI/history.

## Tracking quality over time

GitHub Actions runs the baseline evaluation on relevant changes and uploads the JSON report as an artifact. The report records:

- Total article files.
- Critical error count.
- Warning count.
- Files with duplicate page titles.
- Files with duplicate long paragraphs.
- Files containing images without alt text.
- Clean-file rate.

The purpose is to make quality regressions visible without hiding or automatically deleting legacy article content.

## AI feature boundary

If HAKAMIQ later adds an AI assistant, the AI feature must receive its own explicit system prompt with role, task, rules, failure behavior, tone, output shape, examples, and eval assertions. Do not reuse this editorial policy as an AI system prompt without defining that feature’s exact capabilities and boundaries.
