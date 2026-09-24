# Tarot Readings Agent Guide

Read README.md, then the relevant frontend/backend package.json before changes.
This repository owns a React/Vite Tarot frontend and Express API backend.

## Boundaries

- frontend/: browser UI, assets and Vitest tests. Vite serves port 3000 and
  proxies /api to the backend as documented in the README.
- backend/: server-side API requests and environment configuration. Keep the
  OpenAI API key on the server, outside Git and browser bundles.
- Keep the standalone application distinct from Tarot components in Communiti.
  Check the requested host and imports before changing cross-project routes.
- Container instructions in the README may reference scripts absent from a
  particular checkout. Verify the actual files before invoking build/push
  commands, and confirm the authorized image destination before publication.

## Development and checks

Install dependencies in each package that needs them. Use npm run dev,
npm test and npm run build in frontend/ for applicable frontend changes.
Use npm start in backend/ for a local server when needed. Its current test
script is a placeholder that exits with failure; do not report it as a passing
backend suite. Documentation-only changes need path/link checks.

Preserve unrelated changes and existing remote ownership. Use a focused codex/
branch and PR rather than pushing directly to main. Keep environment files,
API keys, user requests/responses, logs and generated dependencies out of Git.
