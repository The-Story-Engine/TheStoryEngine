# TheStoryEngine UK.

Master branch is live at https://tse.fish through Netlify auto deployment: [![Netlify Status](https://api.netlify.com/api/v1/badges/4e0b8176-4b48-45b1-ac94-229be361c43d/deploy-status)](https://app.netlify.com/sites/next-starter/deploys)

This is a [Next.js](https://nextjs.org/) React application, with a [Hasura](https://hasura.io/) GraphQL API on a [PostgreSQL](https://www.postgresql.org/) database.

![Architecture](infrastructure/tse-uk-stack.png)

## Local Development

After cloning the repository:

- Install NPM dependencies with `npm install`
- Install docker app https://www.docker.com/products/docker-desktop
  - Navigate to /infrastructure
  - Run `docker compose up -d`
- Install Hasura bash app with `curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`
  - Navigate to /infrastructure/hasura
  - Run `hasura migrate apply`
  - Run `hasura metadata apply`
  - Go to localhost:8080/console
    - Navigate to Data tab
    - Ensure that the tables are being tracked on the left
- Copy `env.example` to `.env.local` and enter the keys in `.env.local` for:
  - Stripe
  - Postmark
  - Hasura
- Run `npm run dev` in /
- Go to http://localhost:3000

## Pages

- `/` - writers can write a story here, if it's the first time they've arrived, a blank story is automatically created and it's ID saved in browser sessionStorage. If an existing story is found in localstorage, the browser connects to that story as the writer.

## API Routes

See the [reqs.http](reqs.http) file for example bodies and responses for each endpoint.
