/**
 * SAGAR SPORTZ — central site configuration.
 *
 * Everything the client is likely to change lives here: phone numbers,
 * social links, store address, shipping thresholds. Nothing below should
 * be duplicated inside components.
 */

export const siteConfig = {
  name: 'Sagar Sportz',
  legalName: 'Sagar Sportz',
  tagline: 'Play Bold. Wear Your Team.',
  description: 'Custom Jerseys. Sportswear. Equipment. Built for the Game.',

  /** TODO(client): set the real domain — used for canonical URLs + sitemap. */
  url: 'https://sagarsportz.com',

  /**
   * WhatsApp business number in full international format, digits only.
   * India +91 97476 46467 -> '919747646467'
   */
  whatsappNumber: '919747646467',
  phoneDisplay: '+91 97476 46467',
  /** Tel: href form — no spaces. */
  phoneHref: '+919747646467',
  email: 'sagarsportz2323@gmail.com',

  address: {
    line1: 'First Floor, Pilakkal Plaza',
    line2: 'Enamav Road',
    city: 'Chavakkad',
    district: 'Thrissur',
    state: 'Kerala',
    pincode: '680506',
    country: 'IN',
  },

  /** Short Google Maps link for the store. */
  mapsUrl: 'https://maps.app.goo.gl/T3Ma7zfHrgmEPFiNA',

  /** TODO(client): confirm opening hours — these are assumed, not supplied. */
  hours: 'Mon – Sat · 10:00 AM – 9:00 PM',
  /** Machine-readable form for the store's structured data. */
  openingHours: 'Mo-Sa 10:00-21:00',

  /**
   * Only profiles that actually exist. Leave a value empty and the icon is
   * hidden everywhere rather than linking somewhere broken.
   */
  social: {
    instagram: 'https://instagram.com/sagarsportz2323',
    instagramHandle: '@sagarsportz2323',
    facebook: '',
    youtube: '',
  },

  /** Commerce settings used by the cart + WhatsApp order summary. */
  currency: '₹',
  freeShippingOver: 1499,
  flatShipping: 79,
  deliveryEstimate: '5 – 9 working days',
  customDeliveryEstimate: '7 – 12 working days after design approval',
  bulkMinQuantity: 10,
} as const;

export type SiteConfig = typeof siteConfig;

/** Full one-line address, used in copy and structured data. */
export const fullAddress = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.city,
  `${siteConfig.address.state} ${siteConfig.address.pincode}`,
].join(', ');
