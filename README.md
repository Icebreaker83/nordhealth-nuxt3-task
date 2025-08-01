# Nordhealth Nuxt 3 Task

This repository is for the purpose of the technical task, using [Nordhealth Web Components](https://nordhealth.design/web-components/)

Solution can be viewed at [Render.com](https://nordhealth-nuxt3-task-client.onrender.com/products).
NOTE: Spinning up of server on Render can take more than 50sec because I'm on free plan.  

Mock api server is located in [json-server folder](./json-server/), and can be executed from that folder.
Environment (.env) config is not set up, because it's not necessary.

Solution is meant to demonstrate some concepts in Vue 3/Nuxt 3 development.  
If you see that something is done in a more complex way, its probably meant to demonstrate some key concept, eg. products and nested dynamic routes.  
There's still a lot of advanced concepts that are not present, because I have to make the decision to implement certain things in a timely manner, and most importantly, not to over engineer things, which is a problem a lot of devs suffer from :)   
For example, dynamic components could be implemented in Form component, so that we have a factory for forms, but it would take some time to get it done.  

At the moment, unit tests are implemented as a [PoC](https://en.wikipedia.org/wiki/Proof_of_concept) and high test coverage is not achieved.  
E2E tests can be implemented also with (Playwright/Cypress).

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Dependencies

- Node 20+

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Json Server for mock api

Go to `./json-server` folder

```bash
# npm
npm run install
npm run start
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. Available commands:

```bash
# Interactive watch mode
npm test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage

# Test specific features
npm run test:products
npm run test:features

# Watch mode (alternative)
npm run test:watch
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
