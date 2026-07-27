# Performance Strategy

Studzens is built to load instantly, even on 3G networks in rural India. We achieve this through aggressive optimizations at both the code and infrastructure levels.

## 1. Asset Optimization & Delivery
- **Vite Bundling:** Vite leverages Rollup under the hood to perform aggressive tree-shaking (removing unused code).
- **Edge CDN:** Vercel serves all static assets from edge nodes globally. A user in Delhi downloads assets from a Mumbai or Delhi edge node, reducing latency to < 20ms.

## 2. React Rendering Optimizations
- **Memoization:** Heavy calculations (like filtering 100+ colleges based on search queries and category filters) are wrapped in `useMemo`. This prevents the application from locking up the main thread when a user types in the search bar.
- **Component Pruning:** We avoid rendering off-screen UI. For example, the MapLibre canvas is only instantiated when the user explicitly navigates to the Map view.

## 3. Database Optimizations (Neon/Prisma)
- **Indexes:** The Prisma schema defines indexes on frequently queried fields (`location`, `type` in the College table).
- **Pagination:** Future API routes for `/colleges` will strictly enforce pagination (`?page=1&limit=20`) to prevent the backend from attempting to serialize and transmit massive JSON arrays.
