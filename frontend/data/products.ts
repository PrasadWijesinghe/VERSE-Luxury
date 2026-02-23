export const products = [
  {
    id: 1,
    slug: "wine-blossom-evening-gown",
    name: "Wine Blossom Evening Gown",
    category: "Dresses",
    tag: "Couture",
    price: 1950,
    currency: "USD",
    description: `
      A dramatic wine-toned evening gown with intricate appliqué embroidery
      and an off-shoulder neckline. Designed for statement entrances and
      unforgettable nights.
    `,
    details: {
      material: "Embroidered tulle over satin base",
      lining: "Soft stretch lining",
      craftsmanship: "Hand-finished embroidery",
      origin: "Designed in EU",
    },
    dimensions: {
      length: "Full length",
      bust: "Structured",
      waist: "Fitted",
    },
    care: ["Dry clean only", "Do not bleach", "Store hanging to preserve shape"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Wine", "Burgundy"],
    stock: 8,
    sku: "VRS-DRS-001",
    rating: 4.8,
    reviewsCount: 64,
    images: [
      "/images/products/1/1.png",
      "/images/products/1/2.png",
      "/images/products/1/3.png",
      "/images/products/1/4.png",
      "/images/products/1/5.png",
    ],
  },

  {
    id: 2,
    slug: "sable-edge-ankle-boot",
    name: "Sable Edge Ankle Boot",
    category: "Shoes",
    tag: "New",
    price: 210,
    currency: "USD",
    description: `
      Sleek brown ankle boots crafted with a pointed toe and modern block heel.
      Minimal, versatile, and designed to elevate everyday outfits.
    `,
    details: {
      material: "Premium vegan leather",
      lining: "Soft textile lining",
      craftsmanship: "Precision-stitched upper",
      origin: "Made in PRC",
    },
    dimensions: {
      heelHeight: "7.5 cm",
      toeShape: "Pointed",
      shaftHeight: "Ankle",
    },
    care: ["Wipe clean with a soft cloth", "Avoid prolonged water exposure", "Store with shoe shapers"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Chocolate Brown"],
    stock: 22,
    sku: "VRS-SHO-002",
    rating: 4.7,
    reviewsCount: 118,
    images: [
      "/images/products/2/1.jpg",
      "/images/products/2/2.jpg",
      "/images/products/2/3.jpg",
      "/images/products/2/4.jpg",
      "/images/products/2/5.png",
    ],
  },

  {
    id: 3,
    slug: "lunar-luxe-stilettos",
    name: "Lunar Luxe Stilettos",
    category: "Shoes",
    tag: "Bestseller",
    price: 160,
    currency: "USD",
    description: `
      A luminous pointed-toe stiletto with a sleek silhouette and metallic heel
      accent. Crafted for elegant nights and polished daytime looks.
    `,
    details: {
      material: "Satin finish upper",
      lining: "Cushioned insole",
      craftsmanship: "Reinforced heel construction",
      origin: "Made in PRC",
    },
    dimensions: {
      heelHeight: "10 cm",
      toeShape: "Pointed",
      fit: "True to size",
    },
    care: ["Spot clean only", "Avoid rough surfaces", "Store in dust bag"],
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Silver Grey", "Champagne"],
    stock: 14,
    sku: "VRS-SHO-003",
    rating: 4.9,
    reviewsCount: 201,
    images: [
      "/images/products/3/1.jpg",
      "/images/products/3/2.png",
      "/images/products/3/3.png",
      "/images/products/3/4.png",
      "/images/products/3/5.png",
    ],
  },

  {
    id: 4,
    slug: "scarlet-reign-heels",
    name: "Scarlet Reign Heels",
    category: "Shoes",
    tag: "Limited",
    price: 320,
    currency: "USD",
    description: `
      A bold knee-high stiletto boot with a glossy croc-emboss finish.
      Designed to command attention with a sharp pointed toe and tall silhouette.
    `,
    details: {
      material: "Croc-embossed vegan leather",
      lining: "Smooth lining",
      craftsmanship: "High-shine embossed finish",
      origin: "Made in PRC",
    },
    dimensions: {
      heelHeight: "10.5 cm",
      shaftHeight: "Knee-high",
      toeShape: "Pointed",
    },
    care: ["Wipe with microfiber cloth", "Avoid heat/direct sunlight", "Store upright to keep shape"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Deep Burgundy"],
    stock: 9,
    sku: "VRS-SHO-004",
    rating: 4.8,
    reviewsCount: 77,
    images: [
      "/images/products/4/1.jpg",
      "/images/products/4/2.jpg",
      "/images/products/4/3.jpg",
      "/images/products/4/4.jpg",
      "/images/products/4/5.png",
    ],
  },

  {
    id: 5,
    slug: "celestial-glow-midi",
    name: "Celestial Glow Midi",
    category: "Skirts",
    tag: "Trending",
    price: 95,
    currency: "USD",
    description: `
      A metallic pleated midi skirt with a soft champagne sheen.
      Fluid movement, flattering drape, and effortless elegance.
    `,
    details: {
      material: "Pleated metallic fabric",
      lining: "Lightweight lining",
      craftsmanship: "Heat-set pleats for lasting shape",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Midi",
      waist: "Elasticated / fitted waistband",
      silhouette: "A-line pleat",
    },
    care: ["Hand wash cold", "Do not tumble dry", "Steam lightly from a distance"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne Silver"],
    stock: 30,
    sku: "VRS-SKT-005",
    rating: 4.6,
    reviewsCount: 92,
    images: [
      "/images/products/5/1.png",
      "/images/products/5/2.png",
      "/images/products/5/3.png",
      "/images/products/5/4.jpg",
      "/images/products/5/5.png",
    ],
  },

  {
    id: 6,
    slug: "ethereal-flow-midi",
    name: "Ethereal Flow Midi",
    category: "Dresses",
    tag: "Signature",
    price: 180,
    currency: "USD",
    description: `
      A pleated cream midi dress designed for soft movement and refined silhouettes.
      Minimalist elegance with a modern neckline detail.
    `,
    details: {
      material: "Pleated chiffon blend",
      lining: "Soft inner lining",
      craftsmanship: "Clean seam finishing",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Midi",
      bust: "Relaxed fit",
      waist: "Belted / shaped",
    },
    care: ["Hand wash cold", "Do not bleach", "Hang dry"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Cream"],
    stock: 16,
    sku: "VRS-DRS-006",
    rating: 4.7,
    reviewsCount: 58,
    images: [
      "/images/products/6/1.png",
      "/images/products/6/2.png",
      "/images/products/6/3.png",
      "/images/products/6/4.png",
      "/images/products/6/5.jpg",
    ],
  },

  {
    id: 7,
    slug: "eclipse-belted-overcoat",
    name: "Eclipse Belted Overcoat",
    category: "Outerwear",
    tag: "Premium",
    price: 420,
    currency: "USD",
    description: `
      A long, belted black overcoat designed with a strong tailored silhouette.
      Clean lines, refined structure, and timeless winter elegance.
    `,
    details: {
      material: "Wool blend",
      lining: "Satin lining",
      craftsmanship: "Tailored construction",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Maxi",
      fit: "Tailored",
      closure: "Belted / double-breasted",
    },
    care: ["Dry clean only", "Do not bleach", "Store on a wide-shoulder hanger"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black"],
    stock: 10,
    sku: "VRS-OUT-007",
    rating: 4.9,
    reviewsCount: 141,
    images: [
      "/images/products/7/1.png",
      "/images/products/7/2.jpg",
      "/images/products/7/3.png",
      "/images/products/7/4.png",
      "/images/products/7/5.png",
    ],
  },

  {
    id: 8,
    slug: "urban-noir-maxi-trench",
    name: "Urban Noir Maxi Trench",
    category: "Outerwear",
    tag: "Bestseller",
    price: 390,
    currency: "USD",
    description: `
      A structured double-breasted maxi trench with a cinched waist and oversized lapels.
      Designed for elevated street style and confident city looks.
    `,
    details: {
      material: "Structured twill blend",
      lining: "Partial lining",
      craftsmanship: "Reinforced seams & belt hardware",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Maxi",
      fit: "Relaxed-structured",
      closure: "Double-breasted + belt",
    },
    care: ["Dry clean recommended", "Steam lightly", "Avoid overstuffing pockets"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black"],
    stock: 12,
    sku: "VRS-OUT-008",
    rating: 4.8,
    reviewsCount: 109,
    images: [
      "/images/products/8/1.jpg",
      "/images/products/8/2.jpg",
      "/images/products/8/3.png",
      "/images/products/8/4.png",
      "/images/products/8/5.png",
    ],
  },

  {
    id: 9,
    slug: "autumn-atelier-maxi",
    name: "Autumn Atelier Maxi",
    category: "Skirts",
    tag: "Premium",
    price: 140,
    currency: "USD",
    description: `
      A rich chocolate maxi skirt with a clean, flowing silhouette.
      Designed for elevated minimalism and effortless layering.
    `,
    details: {
      material: "Satin-touch fabric",
      lining: "Unlined (smooth finish)",
      craftsmanship: "Bias-cut inspired drape",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Maxi",
      waist: "High waist",
      silhouette: "Flowing A-line",
    },
    care: ["Hand wash cold", "Do not tumble dry", "Iron on low heat (inside out)"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Chocolate Brown"],
    stock: 18,
    sku: "VRS-SKT-009",
    rating: 4.7,
    reviewsCount: 46,
    images: [
      "/images/products/9/1.jpg",
      "/images/products/9/2.png",
      "/images/products/9/3.png",
      "/images/products/9/4.png",
      "/images/products/9/5.png",
    ],
  },

  {
    id: 10,
    slug: "imperial-sapphire-symphony",
    name: "Imperial Sapphire Symphony",
    category: "Jewelry",
    tag: "Luxury",
    price: 680,
    currency: "USD",
    description: `
      An ornate gold-tone necklace with sapphire-toned drops and elegant chain draping.
      A regal statement piece inspired by vintage high jewelry.
    `,
    details: {
      material: "Gold-tone alloy with crystal stones",
      gemstone: "Sapphire-tone + clear crystals",
      craftsmanship: "Hand-assembled detailing",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Adjustable",
      style: "Draped collar",
      closure: "Lobster clasp",
    },
    care: ["Avoid water/perfume", "Wipe with soft cloth", "Store separately to prevent scratches"],
    sizes: ["One Size"],
    colors: ["Gold / Sapphire Blue"],
    stock: 6,
    sku: "VRS-JWL-010",
    rating: 4.9,
    reviewsCount: 33,
    images: [
      "/images/products/10/1.png",
      "/images/products/10/2.png",
      "/images/products/10/3.png",
      "/images/products/10/4.png",
      "/images/products/10/5.png",
    ],
  },

  {
    id: 11,
    slug: "modern-muse-fitted-top",
    name: "Modern Muse Fitted Top",
    category: "Tops",
    tag: "Essential",
    price: 78,
    currency: "USD",
    description: `
      A sleek fitted top with a modern asymmetric neckline and clean contouring.
      Perfect for pairing with tailored bottoms and minimalist accessories.
    `,
    details: {
      material: "Stretch knit blend",
      lining: "Unlined (double-knit feel)",
      craftsmanship: "Clean seam shaping",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "Tunic length",
      fit: "Body-skimming",
      neckline: "Asymmetric square neck",
    },
    care: ["Machine wash cold (gentle)", "Do not bleach", "Lay flat to dry"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sand", "Beige"],
    stock: 25,
    sku: "VRS-TOP-011",
    rating: 4.6,
    reviewsCount: 81,
    images: [
      "/images/products/11/1.jpg",
      "/images/products/11/2.png",
      "/images/products/11/3.png",
      "/images/products/11/4.png",
      "/images/products/11/5.png",
    ],
  },

  {
    id: 12,
    slug: "sable-ring-satchel",
    name: "Sable Ring Satchel",
    category: "Bags",
    tag: "Signature",
    price: 260,
    currency: "USD",
    description: `
      A structured croc-emboss top-handle satchel with a bold ring hardware accent.
      Compact, polished, and designed for quiet luxury styling.
    `,
    details: {
      material: "Croc-embossed vegan leather",
      lining: "Polyester lining",
      craftsmanship: "Structured panels + metal hardware",
      origin: "Made in PRC",
    },
    dimensions: {
      width: "22 cm",
      height: "16 cm",
      depth: "10 cm",
    },
    care: ["Wipe clean with soft cloth", "Store stuffed to keep shape", "Avoid moisture"],
    sizes: ["One Size"],
    colors: ["Espresso Brown"],
    stock: 11,
    sku: "VRS-BAG-012",
    rating: 4.8,
    reviewsCount: 55,
    images: [
      "/images/products/12/1.png",
      "/images/products/12/2.png",
      "/images/products/12/3.png",
      "/images/products/12/4.png",
      "/images/products/12/5.png",
    ],
  },

  {
    id: 13,
    slug: "merlot-muse-high-waist",
    name: "Merlot Muse High-Waist",
    category: "Pants",
    tag: "Bestseller",
    price: 120,
    currency: "USD",
    description: `
      High-waisted wide-leg trousers in a deep merlot tone.
      Tailored to elongate the silhouette with an effortless, flowing drape.
    `,
    details: {
      material: "Tailoring crepe blend",
      lining: "Unlined",
      craftsmanship: "Clean waist construction with statement button",
      origin: "Made in PRC",
    },
    dimensions: {
      rise: "High waist",
      leg: "Wide leg",
      length: "Full length",
    },
    care: ["Machine wash cold (gentle)", "Do not bleach", "Iron low heat"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Merlot", "Wine"],
    stock: 19,
    sku: "VRS-PNT-013",
    rating: 4.7,
    reviewsCount: 66,
    images: [
      "/images/products/13/1.png",
      "/images/products/13/2.png",
      "/images/products/13/3.jpg",
      "/images/products/13/4.png",
      "/images/products/13/5.png",
    ],
  },

  {
    id: 14,
    slug: "regal-garden-gold-cuff",
    name: "Regal Garden Gold Cuff",
    category: "Jewelry",
    tag: "Luxury",
    price: 540,
    currency: "USD",
    description: `
      A gold-tone leaf cuff with sparkling pavé-like detailing and delicate drop elements.
      Inspired by botanical crowns and garden opulence.
    `,
    details: {
      material: "Gold-tone alloy with crystal stones",
      craftsmanship: "Hand-set stone detailing",
      origin: "Made in PRC",
    },
    dimensions: {
      fit: "Adjustable cuff",
      style: "Leaf vine",
      closure: "Slip-on cuff",
    },
    care: ["Avoid water/perfume", "Wipe with soft cloth", "Store in pouch/box"],
    sizes: ["One Size"],
    colors: ["Gold"],
    stock: 7,
    sku: "VRS-JWL-014",
    rating: 4.9,
    reviewsCount: 29,
    images: [
      "/images/products/14/1.jpg",
      "/images/products/14/2.png",
      "/images/products/14/3.png",
      "/images/products/14/4.png",
      "/images/products/14/5.png",
    ],
  },

  {
    id: 15,
    slug: "bronze-boulevard-wrap",
    name: "Bronze Boulevard Wrap",
    category: "Accessories",
    tag: "Winter",
    price: 85,
    currency: "USD",
    description: `
      An oversized monogram-style wrap designed for effortless city layering.
      Soft, warm, and perfect for travel, winter walks, and polished street looks.
    `,
    details: {
      material: "Wool-feel blend",
      craftsmanship: "Soft brushed finish",
      origin: "Made in PRC",
    },
    dimensions: {
      length: "190 cm",
      width: "70 cm",
      style: "Oversized wrap",
    },
    care: ["Hand wash cold", "Do not tumble dry", "Air dry flat"],
    sizes: ["One Size"],
    colors: ["Mocha", "Bronze"],
    stock: 40,
    sku: "VRS-ACC-015",
    rating: 4.6,
    reviewsCount: 120,
    images: [
      "/images/products/15/1.png",
      "/images/products/15/2.png",
      "/images/products/15/3.jpg",
      "/images/products/15/4.png",
      "/images/products/15/5.png",
    ],
  },

  {
    id: 16,
    slug: "the-monaco-aviator",
    name: "The Monaco Aviator",
    category: "Accessories",
    tag: "Trending",
    price: 65,
    currency: "USD",
    description: `
      Oversized gold-frame aviator sunglasses with warm gradient lenses.
      Designed for luxe daytime glamour and effortless statement styling.
    `,
    details: {
      frame: "Metal alloy frame",
      lens: "UV400 gradient lens",
      craftsmanship: "Lightweight comfort fit",
      origin: "Made in PRC",
    },
    dimensions: {
      lensWidth: "62 mm",
      bridge: "14 mm",
      temple: "145 mm",
    },
    care: ["Wipe with microfiber cloth", "Store in case", "Avoid harsh chemicals"],
    sizes: ["One Size"],
    colors: ["Gold / Brown Gradient"],
    stock: 50,
    sku: "VRS-ACC-016",
    rating: 4.7,
    reviewsCount: 88,
    images: [
      "/images/products/16/1.jpg",
      "/images/products/16/2.png",
      "/images/products/16/3.png",
      "/images/products/16/4.png",
      "/images/products/16/5.png",
    ],
  },

  {
  id: 17,
  slug: "ivory-ash-longline-coat",
  name: "Ivory Ash Longline Coat",
  category: "Outerwear",
  tag: "Premium",

  price: 460,
  currency: "USD",

  description: `
    A refined longline coat crafted in a soft ash-grey tone with a
    structured tailored silhouette. Designed for timeless sophistication
    and effortless winter layering.
  `,

  details: {
    material: "Premium wool-blend fabric",
    lining: "Full satin lining",
    craftsmanship: "Tailored construction with reinforced seams",
    origin: "Designed in EU",
  },

  dimensions: {
    length: "Maxi length",
    fit: "Tailored structured fit",
    closure: "Single-breasted button closure",
  },

  care: [
    "Dry clean only",
    "Do not bleach",
    "Store on wide hanger to maintain shape"
  ],

  sizes: ["XS", "S", "M", "L"],
  colors: ["Ash Grey"],

  stock: 14,
  sku: "VRS-OUT-017",

  rating: 4.9,
  reviewsCount: 62,

  images: [
    "/images/products/17/1.jpg",
    "/images/products/17/2.png",
    "/images/products/17/3.png",
    "/images/products/17/4.png",
    "/images/products/17/5.png",
  ],
},

{
  id: 18,
  slug: "monarch-noir-frames",
  name: "Monarch Noir Frames",
  category: "Accessories",
  tag: "Trending",

  price: 85,
  currency: "USD",

  description: `
    Round black-lens sunglasses with gold mechanical detailing.
    A bold industrial-luxe design blending vintage character
    with modern edge.
  `,

  details: {
    frame: "Gold-tone alloy frame",
    lens: "UV400 black lenses",
    craftsmanship: "Precision metal detailing",
    origin: "Made in PRC",
  },

  dimensions: {
    lensWidth: "50 mm",
    bridge: "20 mm",
    temple: "140 mm",
  },

  care: [
    "Clean with microfiber cloth",
    "Store in protective case",
    "Avoid chemical exposure"
  ],

  sizes: ["One Size"],
  colors: ["Gold / Black"],

  stock: 38,
  sku: "VRS-ACC-018",

  rating: 4.7,
  reviewsCount: 91,

  images: [
    "/images/products/18/1.jpg",
    "/images/products/18/2.png",
    "/images/products/18/3.png",
    "/images/products/18/4.png",
    "/images/products/18/5.png",
  ],
},

{
  id: 19,
  slug: "parisian-rouge-satchel",
  name: "Parisian Rouge Satchel",
  category: "Bags",
  tag: "Signature",

  price: 280,
  currency: "USD",

  description: `
    A structured crimson satchel featuring gold hardware and
    an elegant silk scarf accent. Inspired by timeless Parisian
    sophistication and feminine charm.
  `,

  details: {
    material: "Premium smooth vegan leather",
    lining: "Soft interior fabric lining",
    craftsmanship: "Structured silhouette with gold-tone hardware",
    origin: "Designed in EU",
  },

  dimensions: {
    width: "24 cm",
    height: "18 cm",
    depth: "11 cm",
  },

  care: [
    "Wipe clean with soft cloth",
    "Avoid moisture exposure",
    "Store stuffed to retain shape"
  ],

  sizes: ["One Size"],
  colors: ["Rouge Red"],

  stock: 20,
  sku: "VRS-BAG-019",

  rating: 4.8,
  reviewsCount: 74,

  images: [
    "/images/products/19/1.jpg",
    "/images/products/19/2.png",
    "/images/products/19/3.png",
    "/images/products/19/4.png",
    "/images/products/19/5.png",
  ],
},

{
  id: 20,
  slug: "noir-silk-evening-gown",
  name: "Noir Silk Evening Gown",
  category: "Dresses",
  tag: "Couture",

  price: 2450,
  currency: "USD",

  description: `
    A dramatic noir silk evening gown featuring a sculpted bodice and
    fluid floor-length drape. Designed for timeless elegance and
    statement evening occasions.
  `,

  details: {
    material: "100% Silk Satin",
    lining: "100% Silk",
    craftsmanship: "Hand-finished seams and structured tailoring",
    origin: "Designed in EU",
  },

  dimensions: {
    length: "Floor length",
    bust: "Structured fitted bodice",
    waist: "Tailored silhouette",
  },

  care: [
    "Dry clean only",
    "Do not bleach",
    "Steam lightly inside out if needed"
  ],

  sizes: ["XS", "S", "M", "L"],
  colors: ["Black"],

  stock: 6,
  sku: "VRS-DRS-020",

  rating: 4.9,
  reviewsCount: 41,

  images: [
    "/images/products/20/1.png",
    "/images/products/20/2.png",
    "/images/products/20/3.png",
    "/images/products/20/4.png",
    "/images/products/20/5.png",
  ],
},

{
  id: 21,
  slug: "gilded-leather-clutch",
  name: "Gilded Leather Clutch",
  category: "Bags",
  tag: "Luxury",

  price: 320,
  currency: "USD",

  description: `
    A sleek leather clutch finished with refined gold-tone detailing.
    Compact yet sophisticated, designed for evening events and
    elevated minimalist styling.
  `,

  details: {
    material: "Genuine leather",
    lining: "Microfiber suede lining",
    craftsmanship: "Hand-stitched edges with gold hardware",
    origin: "Made in EU",
  },

  dimensions: {
    width: "26 cm",
    height: "14 cm",
    depth: "5 cm",
  },

  care: [
    "Wipe gently with soft cloth",
    "Avoid prolonged moisture exposure",
    "Store in dust bag when not in use"
  ],

  sizes: ["One Size"],
  colors: ["Gold", "Black"],

  stock: 15,
  sku: "VRS-BAG-021",

  rating: 4.8,
  reviewsCount: 53,

  images: [
    "/images/products/21/1.png",
    "/images/products/21/2.png",
    "/images/products/21/3.png",
    "/images/products/21/4.png",
    "/images/products/21/5.png",
  ],
},

{
  id: 22,
  slug: "ivory-cashmere-overcoat",
  name: "Ivory Cashmere Overcoat",
  category: "Outerwear",
  tag: "Premium",

  price: 680,
  currency: "USD",

  description: `
    A luxurious ivory overcoat crafted from a soft cashmere blend.
    Designed with a clean longline silhouette for refined,
    timeless winter elegance.
  `,

  details: {
    material: "Cashmere-wool blend",
    lining: "Full satin lining",
    craftsmanship: "Precision tailoring with reinforced structure",
    origin: "Designed in EU",
  },

  dimensions: {
    length: "Maxi length",
    fit: "Tailored longline",
    closure: "Single-breasted button closure",
  },

  care: [
    "Dry clean only",
    "Store on structured hanger",
    "Do not machine wash"
  ],

  sizes: ["XS", "S", "M", "L"],
  colors: ["Ivory"],

  stock: 9,
  sku: "VRS-OUT-022",

  rating: 4.9,
  reviewsCount: 37,

  images: [
    "/images/products/22/1.png",
    "/images/products/22/2.png",
    "/images/products/22/3.png",
    "/images/products/22/4.png",
    "/images/products/22/5.png",
  ],
},



];

export type Product = (typeof products)[number];