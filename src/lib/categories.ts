/** Sport and shop taxonomy used by navigation, the shop filters and the homepage. */

export interface SportCategory {
  slug: string;
  name: string;
  /** Short line shown under the title on category cards. */
  blurb: string;
  items: string[];
  accent: string;
  /** Key for the generated category artwork. */
  art: string;
}

export const sportCategories: SportCategory[] = [
  {
    slug: 'football',
    name: 'Football',
    blurb: 'Kits, boots, balls and keeper gear',
    items: [
      'Footballs',
      'Football jerseys',
      'Football shoes',
      'Shin guards',
      'Football socks',
      'Goalkeeper gloves',
      'Training accessories',
    ],
    accent: '#E31E24',
    art: 'football',
  },
  {
    slug: 'cricket',
    name: 'Cricket',
    blurb: 'Bats, balls, whites and protection',
    items: [
      'Cricket bats',
      'Cricket balls',
      'Cricket jerseys',
      'Cricket trousers',
      'Batting gloves',
      'Pads',
      'Helmets',
      'Accessories',
    ],
    accent: '#FF5A1F',
    art: 'cricket',
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    blurb: 'Balls, kits and court essentials',
    items: [
      'Basketballs',
      'Basketball jerseys',
      'Basketball shorts',
      'Training equipment',
    ],
    accent: '#FF9F1C',
    art: 'basketball',
  },
  {
    slug: 'badminton',
    name: 'Badminton',
    blurb: 'Rackets, shuttles, nets and grips',
    items: [
      'Badminton rackets',
      'Shuttlecocks',
      'Badminton nets',
      'Grips',
      'Accessories',
    ],
    accent: '#38BDF8',
    art: 'badminton',
  },
  {
    slug: 'running',
    name: 'Running',
    blurb: 'Shoes and everyday training wear',
    items: ['Running shoes', 'Sports shoes', 'Running clothes', 'Sports socks'],
    accent: '#A78BFA',
    art: 'running',
  },
  {
    slug: 'sportswear',
    name: 'Sportswear',
    blurb: 'Tracksuits, lowers, tees and caps',
    items: [
      'Sports lowers',
      'Tracksuits',
      'Caps',
      'T-shirts',
      'Jerseys',
      'Shorts',
      'Sports clothing',
    ],
    accent: '#E31E24',
    art: 'sportswear',
  },
  {
    slug: 'protection',
    name: 'Protection',
    blurb: 'Supports, braces and guards',
    items: [
      'Knee supports',
      'Elbow supports',
      'Wrist supports',
      'Ankle supports',
      'Sports protection',
    ],
    accent: '#F472B6',
    art: 'protection',
  },
];

/** Maps a sport-category slug onto the product filters it should apply. */
export const sportCategoryFilter: Record<
  string,
  { sport?: string; category?: string }
> = {
  football: { sport: 'football' },
  cricket: { sport: 'cricket' },
  basketball: { sport: 'basketball' },
  badminton: { sport: 'badminton' },
  running: { sport: 'running' },
  sportswear: { category: 'sportswear' },
  protection: { category: 'protection' },
};

export const shopCategories = [
  { slug: 'custom-jerseys', name: 'Custom Jerseys' },
  { slug: 'custom-tshirts', name: 'Custom T-Shirts' },
  { slug: 'sportswear', name: 'Sportswear' },
  { slug: 'equipment', name: 'Equipment' },
  { slug: 'footwear', name: 'Footwear' },
  { slug: 'protection', name: 'Protection' },
  { slug: 'accessories', name: 'Accessories' },
] as const;

export const sportFilters = [
  { slug: 'football', name: 'Football' },
  { slug: 'cricket', name: 'Cricket' },
  { slug: 'basketball', name: 'Basketball' },
  { slug: 'badminton', name: 'Badminton' },
  { slug: 'volleyball', name: 'Volleyball' },
  { slug: 'running', name: 'Running' },
  { slug: 'training', name: 'Training' },
  { slug: 'multi', name: 'Multi-sport' },
] as const;

/** Jersey configurator options. */
export const customizerOptions = {
  sports: ['Football', 'Cricket', 'Basketball', 'Volleyball'],
  jerseyTypes: [
    'Round Neck',
    'Polo',
    'V Neck',
    'Full Sleeve',
    'Half Sleeve',
  ],
  patterns: [
    { id: 'solid', name: 'Solid' },
    { id: 'stripes', name: 'Stripes' },
    { id: 'sash', name: 'Sash' },
    { id: 'hoops', name: 'Hoops' },
    { id: 'chevron', name: 'Chevron' },
    { id: 'camo', name: 'Camo' },
  ],
  palette: [
    { name: 'Sagar Red', hex: '#E31E24' },
    { name: 'Lime', hex: '#C6FF3D' },
    { name: 'Black', hex: '#111315' },
    { name: 'White', hex: '#F5F6F7' },
    { name: 'Royal Blue', hex: '#1D4ED8' },
    { name: 'Navy', hex: '#16224A' },
    { name: 'Maroon', hex: '#7A1226' },
    { name: 'Orange', hex: '#FF5A1F' },
    { name: 'Yellow', hex: '#FACC15' },
    { name: 'Bottle Green', hex: '#0F5132' },
    { name: 'Sky Blue', hex: '#38BDF8' },
    { name: 'Purple', hex: '#7C3AED' },
  ],
} as const;
