# TheStoryEngine UK

Live at https://thestoryengine.co.uk

This is a [Next.js](https://nextjs.org/) React application hosted on Vercel, with a GraphQL backend deployed to AWS, see [/infrastructure README](infrastructure/README.md) for more details.

![Architecture](infrastructure/tse-uk-stack.png)

The frontend has 2 environments: Production & Preview, these follow the default Vercel pattern where Production always reflects the latest commit on `main` branch, and all pull requests on `main` get their own Preview deployment. The Preview deployments all point to the `staging` backend deployment.

## Local Development

### Frontend development

After cloning the repository:

- Install NPM dependencies with `npm install`
- Get local instance of backend running with docker:
  - Install docker app https://www.docker.com/products/docker-desktop
    - Navigate to `/infrastructure`
    - Run `docker compose up -d`
    - See [/infrastructure README](infrastructure/README.md) for more details
- Copy `/env.example` to `/.env.local` and enter the keys in `.env.local` for:
  - Stripe
  - Postmark
  - Hasura (see [infrastructure/docker-compose.yaml](infrastructure/docker-compose.yaml) for local defaults)
- Run `npm run dev` in `/`
- Go to http://localhost:3000

### DB changes

- Install Hasura bash app with `curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash`
  - Navigate to /infrastructure/hasura
  - Run `hasura console`
- Explore the [hasura docs](https://hasura.io/learn/graphql/hasura/data-modelling/1-users-table/) to find out how to add & change database tables in the console.
- As changes are made in the console, hasura will automatically make file changes in `infrastructure/hasura/metadata` & in `infrastructure/hasura/migrations`.
- `migrations` holds SQL migrations run on the underlying PostgreSQL database
- `metadata` holds hasura layer config:
  - Which tables in PostgreSQL to track (`tables.yaml`)
  - User permissions for each table (`tables.yaml`)

## Pages

- `/` - Landing page
- `/workspaces` - Detail on workspace plans
- `/our-story` - TSE history lesson
- `/roadmap` - TSE 2021 feature roadmap
- `/write` - writers can write a story here, if it's the first time they've arrived, a blank story is automatically created and it's ID saved in browser sessionStorage. If an existing story is found in sessionStorage, the browser connects to that story as the writer.

## API Routes

See the [reqs.http](reqs.http) file for example bodies and responses for each endpoint.
