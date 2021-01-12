# Jellyfish MVP

Master branch is live at https://jelly.tse.fish through Netlify auto deployment: [![Netlify Status](https://api.netlify.com/api/v1/badges/4e0b8176-4b48-45b1-ac94-229be361c43d/deploy-status)](https://app.netlify.com/sites/next-starter/deploys)

This is a [Next.js](https://nextjs.org/) v10.0.1 project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and set up to be instantly deployed to [Netlify](https://url.netlify.com/Bk4UicocL)!

This project is branched from the netlify [next.js & netlify starter](https://github.com/cassidoo/next-netlify-starter), it has a global stylesheet, a `netlify.toml` for deployment, and a `jsconfig.json` for setting up absolute imports and aliases.

[FaunaDB](https://fauna.com) is the database service

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Second, go to https://localhost:3000

## Pages

- `/` - writers can write a story here, if it's the first time they've arrived, a blank story is automatically created and it's ID saved in browser localstorage. If an existing story is found in localstorage, the browser connects to that story as the writer.

## API Routes

See the [reqs.http](reqs.http) file for example bodies and responses for each endpoint:

- Create New Story

  - POST http://localhost:3000/api/story

- Fetch Existing Story

  - GET http://localhost:3000/api/story/285084836887003649

- Update Existing Story

  - PUT http://localhost:3000/api/story/285084836887003649
