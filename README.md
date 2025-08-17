This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```markdown
### Project Structure

This project follows a standard Next.js App Router structure.
/
├── .husky/ \# Git hooks for pre-commit checks
├── .next/ \# Next.js build output
├── .vercel/ \# Vercel deployment configuration
├── components/ \# Reusable UI components
├── public/ \# Static assets (images, fonts, etc.)
├── src/
│ └── app/
│ ├── (root)/ \# Special folder for root-level pages, layouts, and templates
│ ├── api/ \# API routes, e.g., `app/api/users/route.ts` for `/api/users`
│ ├── [slug]/ \# Dynamic routes, e.g., `app/posts/[slug]/page.tsx` for `/posts/my-first-post`
│ ├── layout.tsx \# The root layout, defining the shared UI
│ ├── loading.tsx \# A loading state for the root layout
│ ├── error.tsx \# A dedicated error UI for the root layout
│ └── page.tsx \# The home page for the application (`/`)
├── styles/ \# Global and utility CSS files
├── .env \# Environment variables
├── .gitignore \# Files and directories to be ignored by Git
├── eslint.config.mjs \# ESLint configuration
├── next-env.d.ts \# TypeScript declarations for Next.js
├── next.config.ts \# Next.js configuration settings
└── tsconfig.json \# TypeScript configuration
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## TODO

`

- Add login page with ui, api & swagger support
  - Add session maintain support.
- Add sign up page with ui, api & swagger support
- Add forgot password with ui, api & swagger support
- Add dashboard with ui, api & swagger support
- Add card with ui, api & swagger support
- Add orders with ui, api & swagger support
- Add invoice with ui, api & swagger support
  `

`

- Create basic project with next js and type script
- Add required dependecies and project folder strcture.
  - This should satisfy:
  - Styles (font constants)
  - Utils
  - Elements/components (custom tags)
  - Wrappers
- Add mockapi / check with offline fakerjs with endpoints simulattion, if NEXT.js do this ignore implementation and check how to link the fakerjs to nextJS api routes
- Check for best UI libraries, Icon libraries and integrate those
  `

## db | postgress sql | prisma | neonserverless | vercel

ref: https://www.prisma.io/docs/orm/prisma-migrate/workflows/troubleshooting (this helped to reset the first time default db created by vercel ~ neon, which will reset the current db and make sync with the scheme.prisma file)

// Preview url: https://ecommerce-jrubtczoz-ilatifs-projects-cdcf73f1.vercel.app
// Production url: https://ecommerce-9ax19evvo-ilatifs-projects-cdcf73f1.vercel.app
