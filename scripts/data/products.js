export class Product {
  id;
  name;
  img;
  rating;
  priceCents;
  keyword;
  type;
  sizeCharLink;
  instruction;
  description;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.name = productDetails.name;
    this.img = productDetails.img;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keyword = productDetails.keyword;
    this.sizeCharLink = productDetails.sizeCharLink;
    this.warrantyLink = productDetails.warrantyLink;
    this.instruction = productDetails.instruction;
    this.description = productDetails.description;
  }
}

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

export const products = [
  {
    id: "0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5g",
    name: "Acqua di Gio Profondo",
    img: "../../images/perfume/perfume1.1.jpg",
    rating: 4,
    priceCents: 9800,
    keyword: ["aquatic", "fresh", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "125ml",
    warrantyLink: "https://example.com/warranty1",
    instruction: "Fresh and light for daytime wear.",
    description:
      "Deep aquatic scent with bergamot, marine notes, and patchouli.",
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    name: "Armani Stronger With You Intensely",
    img: "../../images/perfume/perfume2.1.jpg",
    rating: 5,
    priceCents: 9800,
    keyword: ["amber", "vanilla", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty2",
    instruction: "Use 1-2 sprays for long-lasting scent.",
    description:
      "Intense amber and vanilla notes create a powerful, captivating presence perfect for evenings.",
  },
  {
    id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    name: "Bleu de Chanel EDP",
    img: "../../images/perfume/perfume1.1.1.jpg",
    rating: 5,
    priceCents: 13500,
    keyword: ["woody", "aromatic", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty3",
    instruction: "Perfect for special occasions.",
    description:
      "A timeless masculine fragrance with grapefruit, ginger, and sandalwood notes.",
  },
  {
    id: "9a0b1c2d-3e4f-5g6h-7i8j-9k0l1m2n3o4p",
    name: "Bvlgari Man In Black",
    img: "../../images/perfume/perfume4.jpg",
    rating: 4,
    priceCents: 9800,
    keyword: ["spicy", "leather", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty4",
    instruction: "Elegant scent for evening events.",
    description: "Oriental spicy fragrance with rum, leather, and amber notes.",
  },
  {
    id: "6d7e8f9a-0b1c-2d3e-4f5g-6h7i8j9k0l1m",
    name: "Creed Aventus",
    img: "../../images/perfume/perfume5.jpg",
    rating: 5,
    priceCents: 48500,
    keyword: ["fruity", "woody", "luxury"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty5",
    instruction: "Long-lasting luxury for special events.",
    description:
      "Legendary fruity woody fragrance with pineapple, birch, and musk notes.",
  },
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Dior Sauvage EDP",
    img: "../../images/perfume/perfume6.jpg",
    rating: 5,
    priceCents: 12500,
    keyword: ["fresh", "woody", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty6",
    instruction: "Spray on pulse points for best results.",
    description:
      "A bold, fresh fragrance with bergamot, amber, and pepper notes that lasts all day.",
  },
  {
    id: "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5g6h7i8j",
    name: "Dolce & Gabbana The One EDP",
    img: "../../images/perfume/perfume7.jpg",
    rating: 5,
    priceCents: 10500,
    keyword: ["amber", "tobacco", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty7",
    instruction: "Light scent perfect for dates.",
    description:
      "Warm, sensual fragrance with ginger, amber, and tobacco notes.",
  },
  {
    id: "8f9a0b1c-2d3e-4f5g-6h7i-8j9k0l1m2n3o",
    name: "Givenchy Gentleman Reserve Privée",
    img: "../../images/perfume/perfume8.jpg",
    rating: 4,
    priceCents: 11200,
    keyword: ["woody", "boozy", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty8",
    instruction: "Sophisticated scent for evening events.",
    description:
      "Elegant woody fragrance with whiskey, pear, and patchouli notes.",
  },
  {
    id: "0b1c2d3e-4f5g-6h7i-8j9k-0l1m2n3o4p5q",
    name: "Gucci Guilty Absolute",
    img: "../../images/perfume/perfume9.jpg",
    rating: 4,
    priceCents: 10500,
    keyword: ["leather", "woody", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "90ml",
    warrantyLink: "https://example.com/warranty9",
    instruction: "Premium luxury perfume.",
    description:
      "Bold leather and woody fragrance for the confident modern man.",
  },
  {
    id: "4b5c6d7e-8f9a-0b1c-2d3e-4f5g6h7i8j9k",
    name: "Hermès Terre d'Hermès",
    img: "../../images/perfume/perfume10.jpg",
    rating: 5,
    priceCents: 11800,
    keyword: ["woody", "citrus", "masculine"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty10",
    instruction: "Simple and sophisticated for daily use.",
    description:
      "Earthy citrus fragrance with orange, grapefruit, and vetiver notes.",
  },
  {
    id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    name: "Jean Paul Gaultier Le Male Le Parfum",
    img: "../../images/perfume/perfume11.jpg",
    rating: 5,
    priceCents: 10500,
    keyword: ["vanilla", "iris", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "125ml",
    warrantyLink: "https://example.com/warranty11",
    instruction: "2-3 sprays for all-day presence.",
    description:
      "Luxurious blend of iris, vanilla, and cardamom in the iconic bottle.",
  },
  {
    id: "2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5g6h7i",
    name: "Louis Vuitton L'Immensité",
    img: "../../images/perfume/perfume12.jpg",
    rating: 5,
    priceCents: 28500,
    keyword: ["fresh", "amber", "luxury"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty12",
    instruction: "High-end luxury perfume.",
    description:
      "Fresh amber fragrance with ginger, grapefruit, and ambroxan notes.",
  },
  {
    id: "7e8f9a0b-1c2d-3e4f-5c6d-7i8j9k0l1m2n",
    name: "Montblanc Explorer",
    img: "../../images/perfume/perfume13.jpg",
    rating: 4,
    priceCents: 6500,
    keyword: ["woody", "aromatic", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty13",
    instruction: "Versatile scent for any occasion.",
    description:
      "Modern aromatic woody fragrance with bergamot, clary sage, and akigalawood.",
  },
  {
    id: "1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5g6h",
    name: "Paco Rabanne 1 Million",
    img: "../../images/perfume/perfume14.jpg",
    rating: 4,
    priceCents: 9200,
    keyword: ["leather", "spicy", "masculine"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty14",
    instruction: "Sophisticated scent for evenings.",
    description:
      "Iconic spicy leather fragrance with blood orange and cinnamon notes.",
  },
  {
    id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    name: "Prada L'Homme",
    img: "../../images/perfume/perfume15.jpg",
    rating: 4,
    priceCents: 11200,
    keyword: ["fresh", "soapy", "masculine"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty15",
    instruction: "Great for everyday office wear.",
    description:
      "Clean, sophisticated scent with iris, neroli, and amber notes.",
  },
  {
    id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
    name: "Tom Ford Noir Extreme",
    img: "../../images/perfume/perfume16.jpg",
    rating: 5,
    priceCents: 24500,
    keyword: ["oriental", "gourmand", "luxury"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty16",
    instruction: "Long-lasting and luxurious scent.",
    description:
      "Opulent blend of kulfi, rose, and sandalwood for unforgettable evenings.",
  },
  {
    id: "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    name: "Versace Dylan Blue",
    img: "../../images/perfume/perfume17.jpg",
    rating: 4,
    priceCents: 8500,
    keyword: ["fresh", "aquatic", "masculine"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty17",
    instruction: "Perfect for office and casual outings.",
    description:
      "Fresh aquatic fragrance with bergamot, grapefruit, and tonka bean.",
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    name: "Versace Eros Flame",
    img: "../../images/perfume/perfume18.jpg",
    rating: 4,
    priceCents: 8900,
    keyword: ["citrus", "woody", "masculine"],
    type: "Eau de Toilette",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty18",
    instruction: "Ideal for evening wear.",
    description:
      "Passionate blend of citrus, pepper, and woody notes that ignites the senses.",
  },
  {
    id: "5c6d7e8f-9a0b-1c2d-3e4f-5g6h7i8j9k0l",
    name: "Viktor&Rolf Spicebomb Extreme",
    img: "../../images/perfume/perfume19.jpg",
    rating: 5,
    priceCents: 11200,
    keyword: ["spicy", "tobacco", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "90ml",
    warrantyLink: "https://example.com/warranty19",
    instruction: "Bold scent for confident men.",
    description:
      "Intense spicy fragrance with tobacco, vanilla, and black pepper notes.",
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    name: "YSL Y EDP",
    img: "../../images/perfume/perfume20.jpg",
    rating: 5,
    priceCents: 11200,
    keyword: ["fresh", "woody", "masculine"],
    type: "Eau de Parfum",
    sizeCharLink: "100ml",
    warrantyLink: "https://example.com/warranty20",
    instruction: "Apply lightly on neck and wrists.",
    description:
      "Modern aromatic fragrance with apple, ginger, and sage notes for the contemporary man.",
  },
];
