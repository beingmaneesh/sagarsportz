# Sagar Sportz

Custom sportswear and sports equipment e-commerce site.
**Play Bold. Wear Your Team.**

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Lucide icons.

Orders are placed through **WhatsApp** rather than an online payment gateway:
`product → cart → checkout → WhatsApp`, with the full order (including every
customization detail) written into the message automatically.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build && npm start   # production build
```

---

## Before you go live — the things to change

### 1. Contact details — done, with two gaps

All of it lives in one file: **`src/lib/config.ts`**. The WhatsApp number is
never repeated in a component, so every `wa.me` link on the site follows it.

```ts
whatsappNumber: '919747646467',            // international format, digits only
phoneDisplay:   '+91 97476 46467',
email:          'sagarsportz2323@gmail.com',
address:        First Floor, Pilakkal Plaza, Enamav Road,
                Chavakkad, Kerala 680506
mapsUrl:        https://maps.app.goo.gl/T3Ma7zfHrgmEPFiNA
social.instagram: https://instagram.com/sagarsportz2323
```

Still outstanding in that file:

- **`hours`** — currently `Mon – Sat · 10:00 AM – 9:00 PM`, which is an
  assumption, not supplied. Update it and `openingHours` (the machine-readable
  form used in the store's structured data) together.
- **`url`** — still `https://sagarsportz.com`. Canonical URLs, Open Graph tags
  and `sitemap.xml` all build from it, so set the real domain before launch.

`social.facebook` and `social.youtube` are empty strings. That's deliberate —
empty entries are filtered out, so the icons are hidden everywhere and no link
points at a profile that doesn't exist. Fill them in and the icons reappear.

### 2. Products and prices

All products live in **`src/lib/products.ts`** as a single typed array. Prices
in there are **placeholders** — replace them with real ones.

Each record matches the `Product` type in `src/lib/types.ts`:

| Field | Notes |
| --- | --- |
| `id`, `name`, `slug` | `slug` becomes the URL: `/product/<slug>` |
| `category`, `sport`, `brand`, `gender` | drive the shop filters |
| `price`, `salePrice` | `salePrice` is optional; a discount badge appears automatically |
| `images` | real photo paths — see below |
| `art` | the generated artwork used while `images` is empty |
| `sizes`, `colors`, `stock` | `stock: 0` renders a "Sold out" badge |
| `customizable` | sends the shopper to the jersey configurator instead of a plain add-to-cart |
| `featured`, `newArrival`, `bestSeller` | control the homepage rows |
| `specifications`, `material`, `care` | shown in the product page tabs |
| `tags` | improves search results |

No product card is hard-coded anywhere — add a record to the array and it
appears in the shop, search, sitemap and filters automatically.

### 3. Brand colours and logo

The palette is red / white / black, taken from the logo. It is defined in two
places that must stay in step:

- **`tailwind.config.ts`** → `accent` (`DEFAULT` / `soft` / `deep`) and `flame`,
  which drive every `text-accent`, `bg-accent`, `border-accent` class.
- **`src/lib/brand.ts`** → the same values as raw hex, for SVG artwork and
  inline gradients that CSS classes can't reach.

```ts
accent: { DEFAULT: '#E31E24', soft: '#FF353C', deep: '#AE1218' }
flame:  '#FF7A1A'   // errors, destructive hovers, out-of-stock only
```

Solid accent surfaces carry **white** text (`.btn-accent` in `globals.css`).
Badge hierarchy on product cards is deliberate: solid red = Customizable,
solid white = New, outlined red = discount — three filled reds in one corner
turns to mush.

The logo is the real artwork at `public/logo.png` (837 × 262, transparent,
built for dark backgrounds). Replace that one file to change the logo in the
navbar, the mobile menu and the footer. `public/icon.svg` is the matching
favicon and is separate — update it too if the mark changes.

### 4. Photography

Products currently render **generated vector artwork** so the catalogue never
shows empty grey boxes. To switch a product to real photos, drop the files in
`public/products/` and list them:

```ts
images: ['/products/custom-football-jersey-1.jpg', '/products/custom-football-jersey-2.jpg'],
```

`ProductMedia` prefers a real photo whenever `images[0]` exists — no component
changes needed. A 4:5 portrait crop suits the product cards best.

---

## Other placeholder content to replace

| What | Where | Why |
| --- | --- | --- |
| Customer reviews | `src/components/home/Testimonials.tsx` | Sample entries, clearly labelled. **Replace with real reviews or delete the section — do not publish invented ones.** |
| Homepage stats (`500+ kits printed`, etc.) | `src/components/home/Hero.tsx` | Indicative figures only |
| Instagram grid | `src/components/home/InstagramGrid.tsx` | Generated tiles; connect the Instagram API or drop real post images in |
| Bulk pricing tiers | `src/app/bulk-orders/page.tsx` | Confirm against your real costing |
| Policy pages | `src/app/{privacy-policy,terms,shipping-policy,returns-policy}` | Templates — have them reviewed before launch |

---

## Structure

```
src/
  app/                    routes (App Router)
    page.tsx              homepage
    shop/                 catalogue + /shop/[category] sport landing pages
    product/[slug]/       product detail
    customize/            jersey configurator
    cart/ checkout/       bag + WhatsApp checkout
    custom-jerseys/ custom-tshirts/ sportswear/ equipment/
    printing/             DTF + sublimation explainer
    bulk-orders/ about/ contact/ faq/ customization/ wishlist/
    sitemap.ts
  components/
    layout/               navbar, footer, cart drawer, floating WhatsApp, mobile bars
    home/                 homepage sections
    product/              cards, grid, filters, detail, generated artwork
    customizer/           jersey configurator
    print/                print pipeline + fabric cross-section diagrams
    cart/                 cart view + WhatsApp checkout
    ui/                   shared primitives
  lib/
    config.ts             ← site-wide settings (WhatsApp number lives here)
    products.ts           ← the catalogue
    categories.ts         sport taxonomy + configurator options
    whatsapp.ts           every WhatsApp message template
    brand.ts             ← brand colours as raw hex (SVG + gradients)
    types.ts
  store/
    cart.tsx              cart context (persisted to localStorage)
    wishlist.tsx          wishlist context (persisted to localStorage)
```

### Generated artwork

`JerseyGraphic` renders a kit from colours, pattern, neck type, team name,
player name and number. It powers the product cards, the design gallery **and**
the live preview in the configurator, so what a customer designs is exactly
what they see everywhere else. `GearGraphic` does the same for bats, balls,
rackets, shoes, supports and the rest.

### Connecting a backend later

`src/lib/products.ts` is the only place products are read from, and every
selector (`getProductBySlug`, `getByCategory`, `getFeatured`, …) is exported
from there. Swapping the static array for a database or CMS call means changing
that one module.

---

## Notes

- Cart and wishlist persist per browser via `localStorage`; nothing is sent to a
  server until the shopper chooses to send their order on WhatsApp.
- Logo uploads in the configurator are previewed **locally only**. The file name
  travels with the order and the customer attaches the real file in the chat —
  `wa.me` links cannot carry attachments.
- Product pages emit `Product` structured data, the FAQ emits `FAQPage`, and the
  layout emits `SportingGoodsStore` data for rich results.
- Update `siteConfig.url` and `public/robots.txt` with the real domain before
  launch so the sitemap and canonical URLs resolve correctly.
