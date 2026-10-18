export const atelierOptions = {
  bodyFabrics: [
    {
      id: "mulberry",
      name: "Pure Kanjeevaram Mulberry Silk (3-Ply)",
      basePrice: 52000,
      description: "Heavy, lustrous pure silk known for its structural grace and heirloom longevity.",
      texture: "smooth-lustre",
      weavingDays: 20
    },
    {
      id: "katan",
      name: "Banarasi Katan Silk",
      basePrice: 56000,
      description: "Fine, tightly twisted silk yarns woven with legendary Varanasi delicacy.",
      texture: "crisp-sheen",
      weavingDays: 24
    },
    {
      id: "mysore-crepe",
      name: "Pure Mysore Crepe Silk",
      basePrice: 42000,
      description: "High-twist bivoltine silk with an exceptionally fluid, second-skin drape.",
      texture: "fluid-crepe",
      weavingDays: 16
    },
    {
      id: "organza-tissue",
      name: "Royal Tissue Silk Organza",
      basePrice: 46000,
      description: "Featherlight, ethereal silk tissue with subtle metallic shimmer.",
      texture: "translucent-tissue",
      weavingDays: 18
    }
  ],

  bodyColors: [
    { id: "burgundy", name: "Royal Burgundy", hex: "#35131D", category: "Royal" },
    { id: "wine", name: "Deep Wine", hex: "#4A1827", category: "Royal" },
    { id: "emerald", name: "Heritage Emerald", hex: "#173D32", category: "Heritage" },
    { id: "midnight", name: "Midnight Navy", hex: "#121C2B", category: "Royal" },
    { id: "vermilion", name: "Auspicious Vermilion", hex: "#8A1E29", category: "Bridal" },
    { id: "mustard", name: "Mustard Gold", hex: "#B88E3E", category: "Heritage" },
    { id: "champagne", name: "Warm Champagne", hex: "#D9C9A8", category: "Contemporary" },
    { id: "ivory", name: "Silk Ivory", hex: "#F4EDE0", category: "Contemporary" },
    { id: "rose", name: "Antique Gulab Rose", hex: "#7E2F3B", category: "Bridal" },
    { id: "peacock", name: "Peacock Neelam", hex: "#153E47", category: "Heritage" }
  ],

  bodyMotifs: [
    { id: "plain", name: "Plain Luminous Silk (Minimalist)", priceDelta: 0, preview: "solid" },
    { id: "rudraksh", name: "Rudraksh Gold Butta", priceDelta: 4500, preview: "butta-rudraksh" },
    { id: "mango", name: "Manga (Paisley) Zari Inlay", priceDelta: 6000, preview: "butta-mango" },
    { id: "coin", name: "Kasavu Coin Motif (Kasu)", priceDelta: 5000, preview: "butta-coin" },
    { id: "floral-jaal", name: "Intricate Floral Jaal (All-over)", priceDelta: 14000, preview: "butta-jaal" }
  ],

  zariTypes: [
    {
      id: "antique-gold",
      name: "Authentic Antique Gold Zari (Silver-Gilt)",
      color: "#B49A61",
      highlight: "#E5D4AB",
      priceDelta: 0,
      description: "Soft burnished antique sheen resembling ancestral heirloom ornaments."
    },
    {
      id: "pure-gold",
      name: "Royal 24K Tested Gold Zari (Pure Bullion)",
      color: "#C9A74E",
      highlight: "#FFF0B8",
      priceDelta: 18000,
      description: "Highest purity gold wash over silver thread for monumental bridal celebrations."
    },
    {
      id: "silver-velli",
      name: "Pure Silver Zari (Velli)",
      color: "#C5C8CA",
      highlight: "#FFFFFF",
      priceDelta: 8000,
      description: "Cool moonlit metallic silver zari for striking contemporary contrast."
    }
  ],

  borderStyles: [
    {
      id: "temple-gopuram",
      name: "Temple Gopuram (Interlocking Korvai)",
      motif: "gopuram",
      priceDelta: 8500,
      description: "Triangular sacred temple spire motifs hand-interlocked into the body."
    },
    {
      id: "mayil-peacock",
      name: "Mayil (Royal Peacock) Floral Border",
      motif: "peacock",
      priceDelta: 9500,
      description: "Arched peacocks nestled inside undulating floral arabesques."
    },
    {
      id: "rudraksh-creeper",
      name: "Rudraksh & Kalash Creeper",
      motif: "creeper",
      priceDelta: 6000,
      description: "Auspicious bead and sacred pitcher motifs woven along the hemline."
    },
    {
      id: "minimal-ribbon",
      name: "Minimalist Solid Zari Band (Mysore Court)",
      motif: "ribbon",
      priceDelta: 3000,
      description: "Clean, architectural solid gold zari ribbon for understated elegance."
    }
  ],

  borderWidths: [
    { id: "delicate", name: "Delicate (2.5 inches)", multiplier: 0.9, priceDelta: 0 },
    { id: "classic", name: "Classic Royal (4.5 inches)", multiplier: 1.0, priceDelta: 3500 },
    { id: "monumental", name: "Monumental Temple (7.0 inches)", multiplier: 1.3, priceDelta: 9500 }
  ],

  palluStyles: [
    {
      id: "grand-jaal",
      name: "Grand Brocade Floral Jaal",
      density: "Dense Royal",
      priceDelta: 12000,
      description: "Lavish tapestry of blossoms and gold creepers covering 32 inches of pallu length."
    },
    {
      id: "peacock-procession",
      name: "Royal Peacock & Chariot Procession",
      density: "Heirloom Rich",
      priceDelta: 18500,
      description: "Narrative panel depicting royal court processions and dancing peacocks."
    },
    {
      id: "architectural-bands",
      name: "Concentric Antique Gold Bands (Minimalist)",
      density: "Refined Restraint",
      priceDelta: 4000,
      description: "Graduated linear zari bands with hand-twisted silk tassels."
    }
  ],

  blouseStyles: [
    {
      id: "coordinated",
      name: "Coordinated Body Color with Border Zari",
      priceDelta: 0,
      description: "Blouse crafted in the identical silk body tone with matching border for sleeves."
    },
    {
      id: "contrast-pallu",
      name: "Contrast Pallu Color with Zari Sleeve Bands",
      priceDelta: 2500,
      description: "Striking heritage contrast matching the rich pallu tone."
    },
    {
      id: "embellished-brocade",
      name: "Full Heavy Zari Brocade Blouse Piece",
      priceDelta: 7500,
      description: "Entire 1.0 meter fabric densely woven in antique gold zari floral brocade."
    }
  ]
};

/**
 * Calculates estimated transparent pricing for custom atelier specifications
 */
export function calculateAtelierPrice(config) {
  const fabric = atelierOptions.bodyFabrics.find(f => f.id === config.fabricId) || atelierOptions.bodyFabrics[0];
  const motif = atelierOptions.bodyMotifs.find(m => m.id === config.motifId) || atelierOptions.bodyMotifs[0];
  const zari = atelierOptions.zariTypes.find(z => z.id === config.zariId) || atelierOptions.zariTypes[0];
  const border = atelierOptions.borderStyles.find(b => b.id === config.borderId) || atelierOptions.borderStyles[0];
  const borderWidth = atelierOptions.borderWidths.find(w => w.id === config.borderWidthId) || atelierOptions.borderWidths[0];
  const pallu = atelierOptions.palluStyles.find(p => p.id === config.palluId) || atelierOptions.palluStyles[0];
  const blouse = atelierOptions.blouseStyles.find(b => b.id === config.blouseId) || atelierOptions.blouseStyles[0];

  const estimatedTotal = (
    fabric.basePrice +
    motif.priceDelta +
    zari.priceDelta +
    border.priceDelta +
    borderWidth.priceDelta +
    pallu.priceDelta +
    blouse.priceDelta
  );

  const estimatedDays = fabric.weavingDays + (motif.id === "floral-jaal" ? 8 : 2) + (pallu.id === "peacock-procession" ? 10 : 3);

  return {
    total: estimatedTotal,
    formatted: `₹${estimatedTotal.toLocaleString("en-IN")}`,
    breakdown: [
      { item: fabric.name, price: fabric.basePrice },
      { item: `${zari.name}`, price: zari.priceDelta },
      { item: `${border.name} (${borderWidth.name})`, price: border.priceDelta + borderWidth.priceDelta },
      { item: motif.name, price: motif.priceDelta },
      { item: pallu.name, price: pallu.priceDelta },
      { item: blouse.name, price: blouse.priceDelta }
    ],
    estimatedDays
  };
}
