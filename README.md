# Pilotariak Website

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/Pilotariak/website/blob/main/LICENSE)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Pilotariak/website/badge)](https://scorecard.dev/viewer/?uri=github.com/Pilotariak/website)

Organization landing page for [Pilotariak](https://github.com/Pilotariak), built with [Astro](https://astro.build).
Presents **Frontis** (GraphQL API gateway) and **Kancha** (mobile application).

## Documentation

Full documentation lives in [`docs/`](docs/index.md):

| Type | Content |
|------|---------|
| [Tutorials](docs/tutorials/add-your-first-component.md) | Learn by building a component from scratch |
| [How-to guides](docs/how-to/) | Add a project page, add translations, deploy |
| [Reference](docs/reference/) | Components, i18n API, design tokens, commands |
| [Explanation](docs/explanation/) | Architecture decisions, i18n design rationale |

## Quick start

Requirements: [Bun](https://bun.sh) >= 1.0

```bash
make install   # install dependencies
make dev       # start dev server at localhost:4321
make build     # build to ./dist/
```

See [commands reference](docs/reference/commands.md) for the full command list.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). License: [Apache 2.0](LICENSE).
