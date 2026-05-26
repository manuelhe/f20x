# Project Context: f20x.com

This is an Astro-based personal blog with a terminal-inspired aesthetic. It leverages a rich set of custom Markdown/MDX plugins to provide specialized content rendering.

## Core Mandates

### Technical Stack
- **Framework:** Astro 5.x (using Content Layer API).
- **Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite`).
- **Markdown/MDX:** Highly customized with Remark and Rehype plugins (see `src/plugins/`).
- **Type Safety:** TypeScript is mandatory for all new logic.
- **Formatter:** Prettier (run `npm run format` after modifications).

### Architectural Conventions
- **Components:** UI components are located in `src/components/` and use `.astro` format.
- **Content:** Blog posts and other content are in `src/content/`. Always use the `content.config.ts` for schema definitions.
- **Plugins:** Before modifying Markdown rendering, check `src/plugins/` to see if a similar feature already exists or if it should be added as a new plugin.
- **Site Config:** Global settings, including social links and theme preferences, are in `src/site.config.ts`.

### Engineering Standards
- **Surgical Updates:** When modifying `astro.config.mjs` or `src/plugins/`, ensure that existing rendering behavior is preserved unless explicitly requested.
- **Validation:** Always run `npm run build` to ensure the project compiles and Pagefind indexing succeeds.
- **Styling:** Adhere to the terminal-inspired theme. Use existing CSS variables and Tailwind utility classes. Avoid introducing new CSS frameworks.
- **Responsive Design:** Ensure all components are mobile-friendly, especially with the `image.responsiveStyles` enabled in Astro.

### Critical Workflows
- **New Posts:** Add a new directory in `src/content/posts/` with an `index.md` or `index.mdx` file.
- **Formatting:** Always run `npm run format` before finalizing changes to ensure consistency with the project's style.
- **Build Verification:** Execute `npm run build` to verify that changes don't break the static site generation.

