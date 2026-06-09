export type ActiveTab = 'home' | 'menu' | 'reservations' | 'gallery';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  category: 'starters' | 'mains' | 'desserts';
  image: string;
  tag?: string;
  isChefSpecial?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'dan-wake',
    name: 'Dan Wake Pearl Dumplings',
    price: 4800,
    priceFormatted: '₦4,800',
    description: 'Delicate handmade Northern bean-flour dumplings tossed in sizzling groundnut oil, seasoned with roasted yaji pepper dust and sliced purple onion curls.',
    category: 'starters',
    image: '/input_file_2.png',
    tag: 'Dutse Traditional'
  },
  {
    id: 'kwado-salad',
    name: 'Dutse Zogale Kwado Salad',
    price: 4500,
    priceFormatted: '₦4,500',
    description: 'Fresh steamed Moringa leaves (Zogale) tossed in rich groundnut cake powder (Kuli-Kuli), ruby-red vineyard tomatoes, raw sweet onions, and infused spicy pepper oil.',
    category: 'starters',
    image: '/input_file_2.png',
    tag: 'Healthy Living'
  },
  {
    id: 'hickory-kilishi',
    name: 'Hearth Wood-Smoked Kilishi',
    price: 8500,
    priceFormatted: '₦8,500',
    description: 'Ultra-thin beef sheet jerky marinated in natural spices and authentic Dutse Yaji, dried in the highlands breeze and flash-flamed to crisp perfection over open coals.',
    category: 'starters',
    image: '/input_file_2.png',
    tag: 'Fire-Seared'
  },
  // Mains
  {
    id: 'sm-miyan-zogale-tuwo',
    name: 'Mekus Tuwo da Miyan Zogale',
    price: 7500,
    priceFormatted: '₦7,500',
    description: 'Fluffy steamed stone-ground rice swallow (Tuwon Shinkafa) served alongside nutrient-dense Moringa weed leaf soup (Miyan Zogale) loaded with smoked fish and slow-cooked cow tripe.',
    category: 'mains',
    image: '/input_file_1.png',
    tag: 'Crown Jewel',
    isChefSpecial: true
  },
  {
    id: 'hearth-masa',
    name: 'Golden Masa da Miyan Taushe',
    price: 5500,
    priceFormatted: '₦5,500',
    description: 'Slightly sweet, fermented short-grain pan-fried rice cakes (Masa) with a crisp golden lace and pillowy core, sided with rich pumpkin and peanut soup (Miyan Taushe) and drizzled honey.',
    category: 'mains',
    image: '/input_file_2.png',
    tag: 'Hearth Special'
  },
  {
    id: 'tuwon-masara-stew',
    name: 'Tuwon Masara da Miyan Kuka',
    price: 6500,
    priceFormatted: '₦6,500',
    description: 'White maize meal swallow (Tuwon Masara) matched with thick, earthy baobab leaf soup (Miyan Kuka), seasoned with local dawadawa, smoked river prawns, and robust spices.',
    category: 'mains',
    image: '/input_file_2.png',
    tag: 'Ancient Grace'
  },
  // Desserts
  {
    id: 'fura-nono',
    name: 'Fura da Nono Imperial Blend',
    price: 3500,
    priceFormatted: '₦3,500',
    description: 'Rich, creamy chilled cow milk-yogurt (Nono) blended with hand-rolled steamed millet balls (Fura) and a whisper of ginger, wild cloves, and dark forest honey.',
    category: 'desserts',
    image: '/input_file_2.png'
  },
  {
    id: 'zobo-sorbet',
    name: 'Smoked Zobo Blossom Sorbet',
    price: 4000,
    priceFormatted: '₦4,000',
    description: 'Velvety frozen blossom water of wild hibiscus sepals, infused with grated ginger juice, citrus zest, hand-crushed cinnamon, and a finishing trail of sweet woodsmoke.',
    category: 'desserts',
    image: '/input_file_2.png'
  }
];

export const SIGNATURE_CREATIONS: MenuItem[] = [
  {
    id: 'sm-miyan-zogale-tuwo-signature',
    name: 'Mekus Tuwo da Miyan Zogale',
    price: 7500,
    priceFormatted: '₦7,500',
    description: 'Fluffy steamed stone-ground rice swallow (Tuwon Shinkafa) served alongside nutrient-dense Moringa weed leaf soup (Miyan Zogale) loaded with smoked fish and slow-cooked cow tripe.',
    category: 'mains',
    image: '/input_file_1.png',
    isChefSpecial: true
  },
  {
    id: 'hearth-masa-signature',
    name: 'Golden Masa da Miyan Taushe',
    price: 5500,
    priceFormatted: '₦5,500',
    description: 'Slightly sweet, fermented short-grain pan-fried rice cakes (Masa) with a crisp golden lace and pillowy core, sided with rich pumpkin and peanut soup (Miyan Taushe) and drizzled honey.',
    category: 'mains',
    image: '/input_file_2.png'
  },
  {
    id: 'kwado-salad-signature',
    name: 'Dutse Zogale Kwado Salad',
    price: 4500,
    priceFormatted: '₦4,500',
    description: 'Traditional Dutse cold salad of steamed Moringa leaves, crumbled peanut press (Kuli-Kuli), raw ruby tomatoes, spring onions, and premium kuli oil drizzle.',
    category: 'starters',
    image: '/input_file_2.png'
  },
  {
    id: 'fura-nono-signature',
    name: 'Fura da Nono Imperial Blend',
    price: 3500,
    priceFormatted: '₦3,500',
    description: 'Rich, creamy chilled cow milk-yogurt (Nono) blended with hand-rolled steamed millet balls (Fura) and a whisper of ginger, wild cloves, and dark forest honey.',
    category: 'desserts',
    image: '/input_file_2.png'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'The Art of Tuwo',
    category: 'culinary',
    image: '/input_file_1.png',
    description: 'A steaming plate of fluffy Tuwon Shinkafa paired with nutrient-dense Miyan Zogale, illustrating northern fine-dining heritage.'
  },
  {
    id: 'gallery-2',
    title: 'Dutse Highlands at Dusk',
    category: 'landscape',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-HyKKiJ6oCp41pJarS7ePfOwdrmM6E79HBmF1N7Z1q8QXTr-asmavX5bJZm_mnN6gsT7ixHHjhM608dPodjy8Qt4kL3Rg56CDXRwjX2r2Iqp46Kth-HH-8hkdNAP0FAFZh0w5PPJkaSPpYzZrZBnD0WtTEpixoPRtbLExGeFv4tOK2CxvbiMFImBnetQhFMlvTAaN2F_sfMZNNoc1Xlw39ngwCyrC8u7egVcSTEq2JEsDRBoZpLjWG0lgurkQHGoN16xchtj1mg',
    description: 'The spectacular granite monoliths of Dutse that inspire our timeless identity.'
  },
  {
    id: 'gallery-3',
    title: 'The Table of Abundance',
    category: 'ambience',
    image: '/input_file_2.png',
    description: 'A colorful bento collage representing Dutse kitchen heritage—Zogale salad, Golden Masa, and the dedicated chef hands behind the scenes.'
  },
  {
    id: 'gallery-4',
    title: 'Traditional Moringa Salad Plating',
    category: 'craft',
    image: '/input_file_2.png',
    description: 'Tossing fresh Moringa leaves (Zogale) with kuli-kuli powder, celebrating local ingredients.'
  },
  {
    id: 'gallery-5',
    title: 'Art of the Hearth',
    category: 'culinary',
    image: '/input_file_2.png',
    description: 'Smoky, fiery wood fires at Mekus, blending the stillness of Dutse highlands and local heritage.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    stars: 5,
    quote: "Unrivaled in Jigawa. The Miyan Zogale is rich, fragrant, and perfectly authentic, cooked on woodfire. The plating is gorgeous.",
    author: 'ALHAJI S. BELLO'
  },
  {
    id: 'test-2',
    stars: 5,
    quote: "A true sanctuary in Dutse. The Golden Masa has the perfect lacy crunch on the outside and is incredibly light. Reminds me of my childhood but elevates it to art.",
    author: 'DR. AMINA GUMEL'
  },
  {
    id: 'test-3',
    stars: 5,
    quote: "Mekus is a treasure behind the Secretariat. The Dan Wake dumplings are tender and have the perfect heat from the Yaji. Exceptional service.",
    author: 'HON. IBRAHIM K.'
  }
];
