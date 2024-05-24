Libraries that needs to be installed:

# nextui => Component library

- npm install --save-exact @nextui-org/react@2.2.9 framer-motion

# next-auth | authjs => Authentication

\_ Github O'Auth

# Prisma => SQL Db Lite

- npm install prisma
- npx prisma init --datasource-provider sqlite
- npx prisma migrate dev

# Auth Setup

- Step 1:
  -- Create an OAuth app and generate a client_id and client_secret
  -- github.com/settings/applications/new

- Step 2:
  -- Add AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET to a .env.local file

- Step 3:
  -- Install these packages:
  --- @auth/core@0.18.1
  --- @auth/prisma-adapter@1.0.6
  --- next-auth@5.0.0-beta.3

- Step 4:
  -- Make a 'auth.ts' file in the 'src' folder. Setup NextAuth and the PrismaAdapter in there.

- Step 5:
  -- Setup the 'app/api/auth[...nextauth]/route.ts' file to handle the requests between Githubs servers and ours

- Step 6:
  -- Make server actions to signin/signout the user

# Recommended Initial Design

- Identify all the different routes you want your app to have + the data that each shows
- Make 'path helper' functions
- Create your routing folders + page.tsx files based on step #1
- Identify the places where data changes in your app
- Make empty server actions for each of those
- Add in comments on what paths you'll need to revalidate for each server action

# What makes a page "dynamic"?

- Calling a 'dynamic function' or referencing a 'dynamic variable' when your route renders
  -- cookies.set() cookies.delete()
  -- useSearchParams() searchParams prop

- Assigning specific 'route segment config' options
  -- export const dynamic = 'force-dynamic'
  -- export const revalidate = 0

- Calling 'fetch' and opting out of caching of the response
  -- fetch('...', { next: { revalidate: 0 } });

- Using a dynamic route
  -- /snippets/[id]/page.tsx
  -- /snippets/[id]/edit/page.tsx
