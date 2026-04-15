# Pilotariak Website

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/Pilotariak/website/blob/main/LICENSE)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Pilotariak/website/badge)](https://scorecard.dev/viewer/?uri=github.com/Pilotariak/website)

Website for the [Pilotariak](https://github.com/Pilotariak) organization, built with [Astro](https://astro.build).
It serves as the landing page for Pilotariak projects including **Frontis** (GraphQL API gateway) and **Kancha** (mobile application).

## Features

- Organization landing page with project showcase
- Dedicated pages for [Frontis](src/pages/frontis.astro) and [Kancha](src/pages/kancha.astro)
- Built with Astro 6 for fast, static-first output

## Project Structure

```text
/
├── public/
├── src/
│   ├── components/     # Reusable Astro components
│   └── pages/
│       ├── index.astro     # Organization landing page
│       ├── frontis.astro   # Frontis project page
│       └── kancha.astro    # Kancha project page
├── package.json
└── Makefile
```

## Development

Requirements: [Bun](https://bun.sh) >= 1.0

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `make install`    | Install dependencies                         |
| `make dev`        | Start local dev server at `localhost:4321`   |
| `make build`      | Build production site to `./dist/`           |
| `make preview`    | Preview production build locally             |
| `make check`      | Run Astro type check                         |
| `make clean`      | Remove build artifacts                       |

Or directly with Bun:

| Command             | Action                                         |
| :------------------ | :--------------------------------------------- |
| `bun install`       | Install dependencies                           |
| `bun run dev`       | Start local dev server at `localhost:4321`     |
| `bun run build`     | Build production site to `./dist/`             |
| `bun run preview`   | Preview production build locally               |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
See [CONTRIBUTING](CONTRIBUTING.md)

## License

See [LICENSE](LICENSE)
