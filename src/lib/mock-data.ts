
import type { Product } from '@/lib/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Floral Wall Art Set',
    description: 'Beautify your space with our elegant Set of 3 Floral Wall Art pieces. A perfect blend of nature and art for your walls!',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.',
    imageUrls: [
      {
        url: 'https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506007921_17843711043510460_6632509365454219861_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=pvzG9wUr7H8Q7kNvwEuFqZH&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2MTM3MjI5NTY1NzkwMg%3D%3D.3-ccb7-5&oh=00_AfOAwg6OY-Sb3mBeStUs3WvIpLvil8-TLViMuLGFVhVnfg&oe=6854709F&_nc_sid=22de04',
        dataAiHint: 'floral art',
      },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'art closeup' },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'art detail' },
    ],
    price: 'Rs. 1850',
    category: 'Wall Art',
    isLatest: true,
    sizeAndDimensions: 'Set of 3: 16 inches, 12 inches, & 8 inches',
    material: 'Metal/Canvas (Assumed)',
    reviews: [],
  },
  {
    id: 'p2',
    name: 'Gold Sunburst Wall Décor Set',
    description: 'Set of 3 Gold Sunburst Wall Décor (9” each)! Perfect for living rooms, bedrooms, or hallways.',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.',
    imageUrls: [
      {
        url: 'https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506021878_17843713338510460_5363780950113686003_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=P5JUOukZKB0Q7kNvwE5aXD6&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2OTExOTQyNjcwOTk5Mg%3D%3D.3-ccb7-5&oh=00_AfOFfhUPXs2U1qv0jBD9L2ovoaymZiVJaSkHBc9mMN3R7g&oe=68546EF8&_nc_sid=22de04',
        dataAiHint: 'sunburst decor',
      },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'decor lifestyle' },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'decor hanging' },
    ],
    price: 'Rs. 1299',
    category: 'Wall Art',
    isLatest: true,
    sizeAndDimensions: 'Set of 3: 9 inches each',
    material: 'Metal',
    reviews: [],
  },
  {
    id: 'p3',
    name: 'Metal Rose Floral Wall Art',
    description: 'This Metal Floral Wall Art features elegant rose accents and leaf detailing — perfect for your hallway, living room, or entryway.',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.',
    imageUrls: [
      {
        url: 'https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506294256_17843713923510460_482927659032378126_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=cvHGGBedIEsQ7kNvwGEVXrJ&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MjI3NDE4MDkxOTUxMQ%3D%3D.3-ccb7-5&oh=00_AfPUnmbV1DNSMY9JSYW7dK_8Q6ZJ9O_3m2fxe9Rc7MAG7w&oe=68545D4E&_nc_sid=22de04',
        dataAiHint: 'metal floral',
      },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'rose detail' },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'leaf accent' },
    ],
    price: 'Rs. 1299',
    category: 'Wall Art',
    isLatest: true,
    sizeAndDimensions: '32 inches x 0.5 inches x 8 inches',
    material: 'Metal',
    reviews: [],
  },
  {
    id: 'p4',
    name: 'Set of 3 Metal Flower Wall Art',
    description: 'Add floral elegance to your walls with this Set of 3 Metal Flower Wall Art. A perfect blend of modern and natural design to enhance any room!',
    careInstructions: 'Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.',
    imageUrls: [
      {
        url: 'https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506354722_17843714196510460_4844468962607956661_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=nt6lmQlaL6kQ7kNvwGtw1u4&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MzU3MjQ5NDI4NTk1Ng%3D%3D.3-ccb7-5&oh=00_AfMhPrinAdlz8ZUP7SVcw1KqjQ5QtALY2hPxzkSooVkw6g&oe=6854522C&_nc_sid=22de04',
        dataAiHint: 'metal flower',
      },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'flower set' },
      { url: 'https://placehold.co/600x400.png', dataAiHint: 'modern design' },
    ],
    price: 'Rs. 1450',
    category: 'Wall Art',
    isLatest: true,
    sizeAndDimensions: 'Set of 3: 12 inches, 10 inches, and 8 inches',
    material: 'Metal',
    reviews: [],
  },
];
