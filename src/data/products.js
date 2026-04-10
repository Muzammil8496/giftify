export const products = [
  // Perfumes
  { id: 1, name: 'Rose Oud Premium Perfume', price: 89, oldPrice: 129, discount: 31, category: 'Perfume', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop', flashDeal: true, isNew: true, rating: 4.9, isBestSeller: true, tags: ['perfume', 'luxury', 'her'] },
  { id: 2, name: 'Midnight Musk Eau de Parfum', price: 65, oldPrice: 95, discount: 32, category: 'Perfume', image: 'https://images.unsplash.com/photo-1588776814546-1ffad1b8e5a4?w=400&h=400&fit=crop', flashDeal: true, rating: 4.7, tags: ['perfume', 'him'] },
  { id: 3, name: 'Floral Bliss Perfume Set', price: 45, category: 'Perfume', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop', rating: 4.6, isNew: true, tags: ['perfume', 'her', 'set'] },
  { id: 4, name: 'Oriental Amber Fragrance', price: 110, oldPrice: 160, discount: 31, category: 'Perfume', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop', isBestSeller: true, rating: 4.8, tags: ['perfume', 'luxury'] },

  // Watches
  { id: 5, name: 'Classic Gold Watch', price: 199, oldPrice: 299, discount: 33, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', flashDeal: true, isBestSeller: true, rating: 4.9, tags: ['watch', 'luxury', 'him'] },
  { id: 6, name: 'Rose Gold Ladies Watch', price: 149, oldPrice: 229, discount: 35, category: 'Watches', image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop', isNew: true, rating: 4.8, tags: ['watch', 'her', 'luxury'] },
  { id: 7, name: 'Smart Watch Pro Series', price: 249, oldPrice: 399, discount: 37, category: 'Watches', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', flashDeal: true, isNew: true, rating: 4.7, tags: ['watch', 'tech', 'him'] },
  { id: 8, name: 'Minimalist Leather Watch', price: 89, category: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', rating: 4.6, tags: ['watch', 'minimal'] },

  // Shoes
  { id: 9, name: 'Luxury Heels Collection', price: 129, oldPrice: 199, discount: 35, category: 'Shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop', flashDeal: true, rating: 4.7, tags: ['shoes', 'her', 'luxury'] },
  { id: 10, name: 'Classic Oxford Shoes', price: 99, oldPrice: 149, discount: 33, category: 'Shoes', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop', isBestSeller: true, rating: 4.8, tags: ['shoes', 'him'] },
  { id: 11, name: 'Pakistani Khussa Embroidered', price: 49, category: 'Shoes', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop', isNew: true, rating: 4.9, tags: ['shoes', 'pakistani', 'her'] },
  { id: 12, name: 'Sneakers Premium Edition', price: 79, oldPrice: 119, discount: 33, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', rating: 4.5, tags: ['shoes', 'casual'] },

  // Jewelry
  { id: 13, name: 'Gold Bangle Set', price: 159, oldPrice: 249, discount: 36, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop', flashDeal: true, isBestSeller: true, rating: 4.9, tags: ['jewelry', 'her', 'luxury', 'pakistani'] },
  { id: 14, name: 'Diamond Pendant Necklace', price: 299, oldPrice: 449, discount: 33, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', rating: 4.8, tags: ['jewelry', 'her', 'luxury'] },
  { id: 15, name: 'Pearl Earrings Classic', price: 69, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop', isNew: true, rating: 4.7, tags: ['jewelry', 'her'] },
  { id: 16, name: 'Silver Chain for Him', price: 89, oldPrice: 129, discount: 31, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop', rating: 4.6, tags: ['jewelry', 'him'] },

  // Dresses / Clothing
  { id: 17, name: 'Embroidered Lawn Suit', price: 79, oldPrice: 119, discount: 33, category: 'Dresses', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4357?w=400&h=400&fit=crop', isNew: true, isBestSeller: true, rating: 4.8, tags: ['clothing', 'her', 'pakistani'] },
  { id: 18, name: 'Party Wear Maxi Dress', price: 99, category: 'Dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', rating: 4.7, tags: ['clothing', 'her', 'party'] },
  { id: 19, name: 'Casual Linen Kurta', price: 45, oldPrice: 69, discount: 34, category: 'Dresses', image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop', rating: 4.5, tags: ['clothing', 'him', 'casual', 'pakistani'] },
  { id: 20, name: 'Kids Formal Outfit Set', price: 55, category: 'Dresses', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=400&fit=crop', isNew: true, rating: 4.9, tags: ['clothing', 'kids'] },

  // Flowers
  { id: 21, name: 'Red Roses Bouquet (12)', price: 35, oldPrice: 55, discount: 36, category: 'Flowers', image: 'https://images.unsplash.com/photo-1487530811015-780c6edca4ca?w=400&h=400&fit=crop', flashDeal: true, isBestSeller: true, rating: 4.9, tags: ['flowers', 'her', 'romantic'] },
  { id: 22, name: 'Mixed Seasonal Bouquet', price: 45, category: 'Flowers', image: 'https://images.unsplash.com/photo-1455582916367-adaaa0fa5a9a?w=400&h=400&fit=crop', isNew: true, rating: 4.8, tags: ['flowers'] },
  { id: 23, name: 'Sunflower Arrangement', price: 29, oldPrice: 45, discount: 35, category: 'Flowers', image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop', rating: 4.7, tags: ['flowers', 'cheerful'] },
  { id: 24, name: 'Preserved Flower Box', price: 89, category: 'Flowers', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop', isNew: true, rating: 4.8, tags: ['flowers', 'luxury', 'her'] },

  // Gift Boxes
  { id: 25, name: 'Luxury Spa Gift Box', price: 99, oldPrice: 149, discount: 33, category: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop', flashDeal: true, isBestSeller: true, rating: 4.9, tags: ['giftbox', 'her', 'spa', 'luxury'] },
  { id: 26, name: 'Chocolate & Sweets Box', price: 55, category: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop', isNew: true, rating: 4.8, tags: ['giftbox', 'sweets', 'birthday'] },
  { id: 27, name: 'Self-Care Gift Hamper', price: 129, oldPrice: 189, discount: 31, category: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop', rating: 4.7, tags: ['giftbox', 'her', 'self-care'] },
  { id: 28, name: 'His & Hers Couple Box', price: 179, oldPrice: 259, discount: 30, category: 'Gift Boxes', image: 'https://images.unsplash.com/photo-1531479149772-c4be88d52d7e?w=400&h=400&fit=crop', flashDeal: true, rating: 4.9, tags: ['giftbox', 'couple', 'anniversary'] },

  // Accessories
  { id: 29, name: 'Designer Handbag', price: 189, oldPrice: 289, discount: 34, category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', flashDeal: true, isBestSeller: true, rating: 4.8, tags: ['accessories', 'her', 'luxury'] },
  { id: 30, name: 'Silk Scarf Collection', price: 59, category: 'Accessories', image: 'https://images.unsplash.com/photo-1601924357840-3e50ad4dd9b0?w=400&h=400&fit=crop', isNew: true, rating: 4.7, tags: ['accessories', 'her'] },
  { id: 31, name: 'Leather Wallet Premium', price: 79, oldPrice: 119, discount: 33, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop', rating: 4.6, tags: ['accessories', 'him'] },
  { id: 32, name: 'Sunglasses Luxury Frame', price: 129, oldPrice: 199, discount: 35, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', rating: 4.7, isBestSeller: true, tags: ['accessories', 'luxury'] },
];

export const giftBundles = [
  { id: 'g1', name: 'Birthday Bliss Bundle', price: 149, originalPrice: 220, category: 'Birthday', occasion: 'Birthday', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=400&fit=crop', includes: ['Rose Oud Perfume', 'Pearl Earrings', 'Luxury Spa Box', 'Red Roses'], rating: 4.9, isGift: true, tags: ['birthday', 'her', 'bundle'] },
  { id: 'g2', name: 'Anniversary Romance Set', price: 229, originalPrice: 350, category: 'Anniversary', occasion: 'Anniversary', image: 'https://images.unsplash.com/photo-1522057306606-5d08af6fe00f?w=400&h=400&fit=crop', includes: ['Gold Bangle Set', 'His & Hers Box', 'Preserved Flowers', 'Silk Scarf'], rating: 4.9, isGift: true, tags: ['anniversary', 'couple', 'bundle'] },
  { id: 'g3', name: 'Groom Gift Package', price: 299, originalPrice: 450, category: 'Wedding', occasion: 'Wedding', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop', includes: ['Classic Gold Watch', 'Leather Wallet', 'Silver Chain', 'Midnight Musk'], rating: 4.8, isGift: true, tags: ['wedding', 'him', 'bundle'] },
  { id: 'g4', name: 'Bride Gift Package', price: 349, originalPrice: 520, category: 'Wedding', occasion: 'Wedding', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=400&fit=crop', includes: ['Diamond Necklace', 'Rose Gold Watch', 'Luxury Heels', 'Rose Oud Perfume'], rating: 4.9, isGift: true, tags: ['wedding', 'her', 'bundle', 'luxury'] },
  { id: 'g5', name: 'Kids Birthday Fun Pack', price: 79, originalPrice: 120, category: 'Kids', occasion: 'Birthday', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop', includes: ['Kids Formal Outfit', 'Toy Box', 'Chocolates', 'Balloons'], rating: 4.8, isGift: true, tags: ['birthday', 'kids', 'bundle'] },
  { id: 'g6', name: 'Graduation Achiever Set', price: 139, originalPrice: 200, category: 'Graduation', occasion: 'Graduation', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop', includes: ['Smart Watch', 'Minimalist Wallet', 'Self-Care Box', 'Flowers'], rating: 4.7, isGift: true, tags: ['graduation', 'bundle'] },
];

export const deals = [
  { id: 'd1', title: 'Eid Special', discount: 40, code: 'EID40', expires: '2025-04-20', image: 'https://images.unsplash.com/photo-1608542265723-1e0ddc79982a?w=600&h=300&fit=crop', bg: 'from-[#ff8b5c] to-[#ff5f8f]' },
  { id: 'd2', title: 'Valentine\'s Week', discount: 30, code: 'LOVE30', expires: '2025-04-25', image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&h=300&fit=crop', bg: 'from-[#ff5f8f] to-[#6c5cff]' },
  { id: 'd3', title: 'Mother\'s Day Sale', discount: 35, code: 'MOM35', expires: '2025-05-11', image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=600&h=300&fit=crop', bg: 'from-[#6c5cff] to-[#5b7cfa]' },
];

export const categories = ['All', 'Perfume', 'Watches', 'Shoes', 'Jewelry', 'Dresses', 'Flowers', 'Gift Boxes', 'Accessories'];

export const getNewArrivals = () => products.filter(p => p.isNew).slice(0, 8);
export const getBestSellers = () => products.filter(p => p.isBestSeller).slice(0, 8);
export const getFlashDeals = () => products.filter(p => p.flashDeal).slice(0, 8);
export const getByCategory = (cat) => cat === 'All' ? products : products.filter(p => p.category === cat);
export const getProductById = (id) => products.find(p => p.id === parseInt(id)) || giftBundles.find(p => p.id === id);
export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return [...products, ...giftBundles].filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category?.toLowerCase().includes(q) ||
    p.tags?.some(t => t.includes(q))
  );
};