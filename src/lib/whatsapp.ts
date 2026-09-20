import { siteConfig } from './config';
import type { CartItem } from './types';

/**
 * Every WhatsApp link in the site is built here. The phone number lives in
 * `siteConfig.whatsappNumber` and is never repeated in a component.
 */

const BASE = 'https://wa.me';

export function whatsappLink(message: string, phone = siteConfig.whatsappNumber) {
  return `${BASE}/${phone}?text=${encodeURIComponent(message)}`;
}

export const formatPrice = (amount: number) =>
  `${siteConfig.currency}${amount.toLocaleString('en-IN')}`;

/* -------------------------------------------------------------------- */
/* Message templates                                                     */
/* -------------------------------------------------------------------- */

export const generalEnquiry = () =>
  `Hello ${siteConfig.name} 👋\n\nI'd like to know more about your custom jerseys and sports gear.`;

export const productEnquiry = (productName: string, price?: number) =>
  `Hello ${siteConfig.name} 👋\n\nI'd like to know more about:\n*${productName}*` +
  (price ? `\nListed price: ${formatPrice(price)}` : '') +
  `\n\nIs it available?`;

export const customJerseyEnquiry = () =>
  `Hello ${siteConfig.name} 👋\n\nI'd like to design a custom jersey for my team.\n\n` +
  `Sport:\nNumber of players:\nJersey type:\nColours:\nRequired by:`;

export interface BulkEnquiryFields {
  teamName?: string;
  sport?: string;
  players?: string;
  jerseyType?: string;
  requiredBy?: string;
  requirements?: string;
  contactName?: string;
  contactPhone?: string;
}

export const bulkOrderEnquiry = (f: BulkEnquiryFields = {}) =>
  `Hello ${siteConfig.name} 👋\n\n*TEAM / BULK ORDER ENQUIRY*\n\n` +
  `Team name: ${f.teamName || ''}\n` +
  `Sport: ${f.sport || ''}\n` +
  `Number of players: ${f.players || ''}\n` +
  `Jersey type: ${f.jerseyType || ''}\n` +
  `Required by: ${f.requiredBy || ''}\n` +
  `Customization requirements: ${f.requirements || ''}\n\n` +
  `Contact name: ${f.contactName || ''}\n` +
  `Contact phone: ${f.contactPhone || ''}\n\n` +
  `Please share pricing and timelines.`;

/* -------------------------------------------------------------------- */
/* Order message                                                         */
/* -------------------------------------------------------------------- */

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city?: string;
  pincode?: string;
  notes?: string;
}

function customisationLines(item: CartItem): string[] {
  const c = item.customisation;
  if (!c) return [];
  const lines: string[] = [];
  if (c.sport) lines.push(`   Sport: ${c.sport}`);
  if (c.jerseyType) lines.push(`   Jersey type: ${c.jerseyType}`);
  if (c.pattern) lines.push(`   Pattern: ${c.pattern}`);
  const primary = c.primaryColorName ?? c.primaryColor;
  const secondary = c.secondaryColorName ?? c.secondaryColor;
  if (primary)
    lines.push(`   Colours: ${primary}${secondary ? ` + ${secondary}` : ''}`);
  if (c.teamName) lines.push(`   Team name: ${c.teamName}`);
  if (c.playerName) lines.push(`   Player name: ${c.playerName}`);
  if (c.playerNumber) lines.push(`   Player number: ${c.playerNumber}`);
  if (c.logoFileName) lines.push(`   Team logo: ${c.logoFileName} (to be sent)`);
  if (c.sponsorFileName)
    lines.push(`   Sponsor logo: ${c.sponsorFileName} (to be sent)`);
  if (c.notes) lines.push(`   Notes: ${c.notes}`);
  return lines;
}

export function buildOrderMessage(
  items: CartItem[],
  totals: { subtotal: number; shipping: number; total: number },
  customer?: Partial<CustomerDetails>,
) {
  const lines: string[] = [];

  lines.push(`Hello ${siteConfig.name} 👋`);
  lines.push('I would like to place an order.');
  lines.push('');
  lines.push('*ORDER*');

  items.forEach((item, i) => {
    lines.push('');
    lines.push(`${i + 1}. *${item.name}*`);
    if (item.size) lines.push(`   Size: ${item.size}`);
    if (item.color) lines.push(`   Colour: ${item.color}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ${formatPrice(item.price)} each`);
    lines.push(...customisationLines(item));
    lines.push(`   Line total: ${formatPrice(item.price * item.quantity)}`);
  });

  lines.push('');
  lines.push('------------------------------');
  lines.push(`Subtotal: ${formatPrice(totals.subtotal)}`);
  lines.push(
    `Delivery: ${totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}`,
  );
  lines.push(`*Total: ${formatPrice(totals.total)}*`);
  lines.push('------------------------------');

  lines.push('');
  lines.push('*CUSTOMER DETAILS*');
  lines.push(`Name: ${customer?.name || ''}`);
  lines.push(`Phone: ${customer?.phone || ''}`);
  lines.push(`Address: ${customer?.address || ''}`);
  if (customer?.city) lines.push(`City: ${customer.city}`);
  if (customer?.pincode) lines.push(`Pincode: ${customer.pincode}`);
  if (customer?.notes) lines.push(`Notes: ${customer.notes}`);

  lines.push('');
  lines.push('Please confirm availability and final order details.');

  return lines.join('\n');
}

/** Message for a single customised jersey sent straight from the configurator. */
export function buildCustomisationMessage(c: {
  product: string;
  sport?: string;
  jerseyType?: string;
  pattern?: string;
  primaryColor?: string;
  secondaryColor?: string;
  primaryColorName?: string;
  secondaryColorName?: string;
  teamName?: string;
  playerName?: string;
  playerNumber?: string;
  size?: string;
  quantity?: number;
  logoFileName?: string;
  sponsorFileName?: string;
  notes?: string;
}) {
  const l: string[] = [];
  l.push(`Hello ${siteConfig.name} 👋`);
  l.push('');
  l.push('I have designed a custom kit on your website:');
  l.push('');
  l.push(`*${c.product}*`);
  if (c.sport) l.push(`Sport: ${c.sport}`);
  if (c.jerseyType) l.push(`Jersey type: ${c.jerseyType}`);
  if (c.pattern) l.push(`Pattern: ${c.pattern}`);
  const primary = c.primaryColorName ?? c.primaryColor;
  const secondary = c.secondaryColorName ?? c.secondaryColor;
  if (primary) l.push(`Colours: ${primary}${secondary ? ` + ${secondary}` : ''}`);
  if (c.teamName) l.push(`Team name: ${c.teamName}`);
  if (c.playerName) l.push(`Player name: ${c.playerName}`);
  if (c.playerNumber) l.push(`Player number: ${c.playerNumber}`);
  if (c.size) l.push(`Size: ${c.size}`);
  if (c.quantity) l.push(`Quantity: ${c.quantity}`);
  if (c.logoFileName) l.push(`Team logo: ${c.logoFileName} (I'll send the file)`);
  if (c.sponsorFileName)
    l.push(`Sponsor logo: ${c.sponsorFileName} (I'll send the file)`);
  if (c.notes) l.push(`Notes: ${c.notes}`);
  l.push('');
  l.push('Please confirm pricing and delivery time.');
  return l.join('\n');
}
