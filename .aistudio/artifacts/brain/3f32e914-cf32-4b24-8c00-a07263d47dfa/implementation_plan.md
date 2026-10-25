# QuickBasket — 10-Minute Grocery Quick-Commerce Storefront

QuickBasket is a responsive, mobile-first quick-commerce grocery demo storefront designed for ultra-fast Indian grocery shopping. It delivers an end-to-end browsing, filtering, quick-view inspection, cart management, and simulated 10–15 minute checkout workflow without requiring a backend or real payment processing.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product and design decisions have been confirmed based on your preferences and the project requirements:

- **Confirmed Decision 1 — Quick-View Product Detail Modal**: Clicking any product card image or title opens a clean Quick-View modal displaying high-resolution imagery, pack weight, MRP vs. selling price savings, rating details, product highlights, and inline quantity steppers, while also recording the item in the "Recently Viewed" strip.
- **Confirmed Decision 2 — Promotional Banners & Automatic MRP Discounts**: The 3 promotional offer banners ("Flat 20% off on Fruits", "Buy 1 Get 1 on Snacks", "Morning Dairy Essentials") act as visual merchandising highlights with category filter jump-actions, while item discounts are automatically calculated from each product's MRP vs. selling price in the cart bill summary.
- **Confirmed Decision 3 — LocalStorage Persistence**: Shopping cart items, delivery location, recently viewed products, and completed demo orders are automatically persisted in browser `localStorage` so state is preserved across refreshes.

---

### 1. Overview & Core Concept

- **What It Does**: Provides a complete Indian quick-commerce grocery experience where shoppers can select their delivery pin code (defaulting to `Delhi - 110001`), search and filter across 8 core household & food categories, inspect product details, build a basket with automatic free-delivery threshold calculation (free above ₹499, else ₹25), choose between instant ("10–15 min") or scheduled delivery slots, and place simulated orders with instant order ID confirmation.
- **Target Audience / Persona**: Everyday urban shoppers looking for rapid replenishment of daily staples (milk, bread, fresh produce, snacks, atta, and household supplies) on mobile or desktop viewports.
- **Key Value**: Combines high-velocity grocery discovery (1-tap "Add" buttons that morph into `+ / -` quantity steppers) with transparent Indian Rupee (`₹`) pricing, automatic MRP savings calculation, and immediate visual feedback.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Discovery & Location Setup**: Users land on a crisp top notice badge (`DEMO STORE - Sample products only, no real orders`), a sticky header with the QuickBasket wordmark, an interactive Location Selector modal/dropdown (`Delhi - 110001` with quick-switch NCR pin codes), live search input, and a live cart counter button.
  2. **Hero & Promotional Merchandising**: The hero banner highlights *"Groceries delivered in 10–15 minutes"* alongside a focused search bar and quick category chips, followed by 3 curated promotional banners (`Flat 20% off on Fruits & Vegetables`, `Buy 1 Get 1 on Evening Snacks`, and `Farm Fresh Dairy & Breakfast`).
  3. **Filtering, Sorting & Browsing**: Users filter products via a horizontal scrollable category bar (`All`, `Fruits & Vegetables`, `Dairy & Breakfast`, `Snacks & Munchies`, `Cold Drinks & Juices`, `Instant Food`, `Household & Cleaning`, `Personal Care`, `Bakery`) paired with a price sort selector (`Relevance`, `Price: Low to High`, `Price: High to Low`).
  4. **Recently Viewed & Bestsellers Rail**: A dedicated horizontal product shelf highlights Bestsellers and dynamically updates as users inspect items via the Quick-View modal.
  5. **Cart Drawer & Instant Checkout**: Clicking the cart button slides out the right-hand Cart Drawer featuring item thumbnails, `+ / -` steppers, remove actions, a free-delivery progress indicator (`₹499` threshold), delivery slot toggle (`10–15 min` vs. `Scheduled`), and itemized Bill Details (Item Total, MRP Discount, Delivery Fee, Grand Total).
  6. **Order Placement & Confirmation**: Clicking "Proceed to Checkout" opens the Checkout Modal for customer details (Name, Phone, Full Address). Submitting generates a unique demo Order ID (e.g., `QB-84920`), estimated arrival window, and itemized receipt, saving the order to local history.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-craft, sunlit quick-commerce retail utility—clean white surfaces, crisp hairline borders, vibrant leaf-green action triggers, and warm sunshine-yellow promotional accents.
  - *Color Palette & Mood*:
    - `--background`: Pure Crisp White (`#FFFFFF`) and Subtle Cool Alabaster (`#F8FAFC`) for section separation (60% neutral canvas).
    - `--surface`: Card & Drawer surfaces (`#FFFFFF`) with `1px solid #E2E8F0` hairline borders (30% structural surfaces).
    - `--primary`: QuickBasket Emerald Green (`#0C831F` primary action, `#096918` hover state, `#ECFDF5` soft tint).
    - `--accent`: Sunshine Amber Yellow (`#FACC15` / `#EAB308`) for lightning delivery cues and promotional highlights (10% accent budget).
    - `--text`: Deep Charcoal (`#0F172A`) for primary titles, Slate (`#475569`) for pack weights and metadata.
  - *Typography & Hierarchy*:
    - **Display / Headings**: `Plus Jakarta Sans` (SemiBold/Bold 600–700) with `text-wrap: balance` for punchy promotional headlines and category titles.
    - **Body & UI Controls**: `DM Sans` (Regular 400 / Medium 500) for clean legibility across compact mobile product cards.
    - **Pricing & Bill Numerals**: `tabular-nums` discipline across all `₹` prices, MRP strike-throughs, discount percentages, and cart totals so vertical columns align cleanly.
  - *Component Styling & Layout*:
    - Responsive grid layout: 2-column grid on mobile (`grid-cols-2 gap-3`), 3 columns on tablet (`md:grid-cols-3`), and 5 columns on desktop (`lg:grid-cols-4 xl:grid-cols-5 gap-5`) inside a `1280px` max-width container.
    - Uniform product card heights with 4:3 studio product imagery occupying the upper frame, clean unboxed metadata (`500 ml · ★ 4.8`), and bottom-aligned price + `ADD` / `+ -` stepper bar.

- **Interactive Feedback & Motion**:
  - Fast $\le 180\text{ms}$ transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) when morphing the `ADD` button into the green quantity stepper.
  - Smooth slide-over drawer animation for the shopping cart and scale-in transition for the Quick-View and Checkout modals.
  - Resilient image containers with custom category SVG/gradient fallbacks and studio-generated assets so zero broken image icons ever appear.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Unified Single-Screen Storefront with Contextual Drawers & Modals**
  - *Chosen Approach*: Keep all browsing, search, category switching, and sorting on a single fast-scrolling storefront view, using a right-hand slide-over drawer for the cart and focused modals for Quick-View and Checkout.
  - *Why*: Matches real quick-commerce ergonomics where shoppers rapidly add 5–10 daily essentials without losing their scroll position in the catalog.
  - *Alternatives Considered*: Multi-page routing for product pages and cart screens, which adds unnecessary navigation friction for low-ticket daily groceries.

- **Decision 2: Comprehensive 32-Product Indian Grocery Dataset with Studio Visuals**
  - *Chosen Approach*: Bundle a rich, structured dataset of 32 Indian grocery products across all 8 required categories (including Toned Milk 500ml ₹27, Brown Bread 400g ₹45, Bananas 1 dozen ₹60, Tomatoes 1 kg ₹38, Potato 1 kg ₹32, Eggs 6 pc ₹55, Butter 100g ₹58, Cheese Slices ₹120, Chips family pack ₹85, Cola 750ml ₹40, Instant Noodles pack of 4 ₹52, Atta 5 kg ₹285, Rice 5 kg ₹340, Dishwash Liquid ₹145, plus personal care, bakery, juices, and vegetables) with real MRP discounts and studio imagery.
  - *Why*: Ensures every single category tab has at least 4 authentic products so category filtering and price sorting feel substantial and realistic immediately upon launch.
  - *Alternatives Considered*: Minimal 24-item list with uneven category distribution, which leaves some categories sparse when filtered.

- **Decision 3: Client-Side `localStorage` State Engine**
  - *Chosen Approach*: Sync `cart`, `recentlyViewedIds`, `selectedLocation`, and `orderHistory` directly with `localStorage`.
  - *Why*: Gives the user a durable, realistic shopping experience across reloads while strictly honoring the zero-backend constraint.

---

### 4. Technical Architecture & Data Strategy

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     QuickBasket Storefront State                        │
│  ┌──────────────┐  ┌──────────────────┐  ┌───────────┐  ┌────────────┐  │
│  │ Cart Store   │  │ Catalog & Filter │  │ Recently  │  │ Past Demo  │  │
│  │ (localStorage│  │ State (Search,   │  │ Viewed    │  │ Orders     │  │
│  │  synced)     │  │ Category, Sort)  │  │ (IDs)     │  │ History    │  │
│  └──────┬───────┘  └────────┬─────────┘  └─────┬─────┘  └──────┬─────┘  │
└─────────┼───────────────────┼──────────────────┼───────────────┼────────┘
          │                   │                  │               │
          ▼                   ▼                  ▼               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Main Storefront Viewport                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Demo Banner ("DEMO STORE - Sample products only, no real orders") │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Sticky Header: Brand │ Location Picker │ Live Search │ Cart CTA   │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Hero Banner (10-15 Min Delivery + Search + Quick Category Chips)  │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Promotional Offers Row (3 Curated Offer Banners)                  │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Recently Viewed & Bestsellers Horizontal Shelf                    │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Category Filter Bar + Sort Dropdown ("Low to High / High to Low") │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Responsive Product Grid (2-col Mobile / 4-5-col Desktop)          │  │
│  │  └─► Product Card (Image, Weight, Price, MRP %, ADD / +/- Stepper)│  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Footer ("Demo project built by Senthesis Dev - senthesisdev.me")  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────┬───────────────────────────────────┬──────────────────┬────────┘
          │                                   │                  │
          ▼                                   ▼                  ▼
┌──────────────────────┐         ┌────────────────────┐ ┌─────────────────┐
│ Quick-View Product   │         │ Slide-In Cart      │ │ Checkout &      │
│ Detail Modal         │         │ Drawer             │ │ Order Success   │
│ • Pack & Nutrition   │         │ • Item +/-/Remove  │ │ Modal           │
│ • MRP Savings        │         │ • Slot Selector    │ │ • Address Form  │
│ • Add / +/- Controls │         │ • Bill Breakdown   │ │ • Fake Order ID │
│ • Related Products   │         │   (Free > ₹499)    │ │ • Order Summary │
└──────────────────────┘         └────────────────────┘ └─────────────────┘
```

- **Data Model & State**:
  - `Product`: `{ id, name, category, weight, price, mrp, discountPercent, rating, reviewCount, tag?: 'Bestseller' | 'New', image, description, highlights: string[] }`
  - `CartItem`: `{ product: Product, quantity: number }`
  - `BillSummary`: Computed dynamically from `CartItem[]`:
    - `itemTotal`: Sum of `product.price * quantity`
    - `mrpTotal`: Sum of `product.mrp * quantity`
    - `totalSavings`: `mrpTotal - itemTotal`
    - `deliveryFee`: `itemTotal >= 499 ? 0 : 25`
    - `grandTotal`: `itemTotal + deliveryFee`
  - `OrderRecord`: `{ orderId: string, createdAt: string, customer: { name, phone, address }, deliverySlot: string, scheduledTime?: string, items: CartItem[], bill: BillSummary }`

- **Interactive Component & State Mapping**:
  - **Live Search & Category Filtering**: Typing in either the sticky header search bar or hero search bar updates `searchQuery` in real time, filtering products by name or category keyword. Selecting a category chip filters the active catalog and smoothly scrolls to the product grid; selecting a sort option reorders the filtered array by price ascending, price descending, or rating/relevance.
  - **Add-to-Cart & Quantity Steppers**: Clicking `Add` initializes `quantity = 1` in `cart`; clicking `+` increments; clicking `-` decrements and removes the item when reaching `0`. Both card-level steppers, Quick-View modal steppers, and Cart Drawer steppers share the same state.
  - **Delivery Slot & Checkout Validation**: Users toggle between `"10-15 min"` (Express) and `"Scheduled"` (with time slot options like `"Today, 6:00 PM - 7:00 PM"`). The checkout form validates non-empty Name, 10-digit Indian mobile number, and delivery address before transitioning to the Order Success screen with a generated Order ID and summary.
