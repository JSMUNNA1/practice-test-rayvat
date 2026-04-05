# Product Dashboard App

This is a small React + TypeScript dashboard app for login and product management.  
Main goal of this project is showing auth flow, protected routes, and CRUD operations in clean way.

## What this project do

After user login, app redirect to products page where user can:

- See product list from DummyJSON API
- Add new product (modal form)
- Edit existing product
- Delete product with confirm popup
- Keep auth state in Redux + localStorage

It also use React Query for server state, so data fetching and mutation feel more simple.

## Quick Analysis (how app is built)

### Routing

- Public route: `/login`
- Private route: `/products`
- `/` redirect to `/products`
- Unknown routes redirect back to `/`

`PrivateRoute` and `PublicRoute` control access based on auth state from Redux.

### Authentication

- Login call is made to `POST /auth/login` on DummyJSON
- On success, token + user info stored in Redux and localStorage
- Axios request interceptor adds Bearer token automatically
- If API return 401, app clear localStorage and move user to login page

Demo credential used in UI:

- Username: `emilys`
- Password: `emilyspass`

### Product Management

Products are loaded from `GET /products`.

Mutations used:

- Add: `POST /products/add`
- Update: `PUT /products/:id`
- Delete: `DELETE /products/:id`

State handling is mixed in practical way:

- React Query handles fetch/mutation lifecycle
- Redux slice store product list for UI rendering and local updates

### UI

- Login page with validation (React Hook Form + Zod)
- Product list table with stock/rating indicators
- Reusable modal + product form for create/edit flow
- Clean minimal Tailwind styling

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Query (TanStack)
- React Router
- Axios
- React Hook Form + Zod
- Tailwind CSS

## Setup and Run

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open browser

```text
http://localhost:3000
```