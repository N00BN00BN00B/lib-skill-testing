# Lib Skill Testing

A local playground for browsing and testing every component from the [Rare UI](https://github.com/swamimalode07/rare-ui) registry in one place — with a purple twist, live GitHub star count, per-year contribution heatmap, and a source view for every component.

Built with Vite + React + TypeScript + Tailwind v4 + Motion.

## Credits

All components are from **[swamimalode07/rare-ui](https://github.com/swamimalode07/rare-ui)** — a beautiful, tasteful shadcn registry by [@swamimalode](https://x.com/swamimalode). This project is a local sandbox for testing them; the original library is what makes it all work.

If you're building for real, install the components directly from the source registry:

```bash
npx shadcn add swamimalode07/rare-ui/fluid-orb
npx shadcn add swamimalode07/rare-ui/scroll-progress
# …etc
```

## What's inside

- **Home** — 11 component cards laid out in a responsive grid
- **Detail view** (`#/c/{id}`) — sidebar navigation, full-width preview, fullscreen + code toggle, dependency badges, install command, usage snippet
- **Purple theme** applied throughout (accent `#a855f7`)
- **GitHub Activity** wired to real data via [`github-contributions-api.jogruber.de`](https://github-contributions-api.jogruber.de), with a year-toggle (2020 → 2026) and the built-in top-repos panel
- **Fluid Orb** — spring hover/tap
- **Scroll Progress** — 500m scrollable checkpoints demo with a live custom bar
- **Bounce Sidebar** — hover to lock page scroll and cycle items with the mouse wheel

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Component list

| Component          | Interaction                                       |
| ------------------ | ------------------------------------------------- |
| Folder             | Hover to fan, click to open                       |
| Bounce Sidebar     | Click item; hover box for wheel-lock cycling      |
| Proximity Sidebar  | Move pointer near the dashes to expand            |
| Duration Picker    | Click a slot, type, confirm                       |
| Fluid Orb          | Hover / tap for spring scale + glow               |
| Scroll Progress    | Scroll the demo box, jump via the pill menu       |
| Code Block         | Copy from the header                              |
| Gravity Letters    | Click & hold to pour                              |
| OTP Input          | Type `123456` for the success state               |
| GitHub Activity    | Toggle years; open the footer for top repos       |
| Emoji Reaction     | Click the smiley, tap or hold an emoji            |

## License

The demo scaffolding is MIT. Component sources belong to the [Rare UI](https://github.com/swamimalode07/rare-ui) authors — please respect their license and attribution when reusing.
