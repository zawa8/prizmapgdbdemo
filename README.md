# Next.js Example

This example shows how to implement a simple web app using [Next.js](https://nextjs.org/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). The example uses an SQLite database file with some initial dummy data. The example was bootstrapped using the Next.js CLI command `create-next-app`.

## Getting started

### 1. Fill out .env file

If you just want to run the app locally, rename `.env.local.example` to `.env.local` and fill in the values.

#### 1.1 Create a Prisma Postgres instance

Go to [the Console](https://console.prisma.io) and create a new Prisma Postgres instance. Use the `DATABASE_URL` and `PULSE_API_KEY` values from the new instance to fill out the `.env.local` file.

#### 1.2 Create a GitHub OAuth app

Go to [the GitHub Developer Settings](https://github.com/settings/developers) and create a new OAuth app. Use the `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` values from the new app to fill out the `.env.local` file.

#### 1.3 Fill out Auth.js secrets

Run `npx auth secret` to generate a new `AUTH_SECRET` value. Fill out the `.env.local` file with the new value.

### 2. Install dependencies

Install npm dependencies:

```
npm install
```

### 3. Create and seed the database

Run the following command to create your database. This also creates the needed tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

**If you switched to Prisma Postgres in the previous step**, you need to trigger seeding manually (because Prisma Postgres already created an empty database instance for you, so seeding isn't triggered):

```
npx prisma db seed
```

### 4. Start the Next.js server

```
npm run dev
```

The server is now running on `http://localhost:3000`.
