/** Unified PKR catalog — images are realistic product/lifestyle stock */

export const DELIVERY_BY_CITY = {
  Karachi: "2–4 working days",
  Lahore: "3–5 working days",
  "Islamabad / Rawalpindi": "3–5 working days",
  Faisalabad: "4–6 working days",
  Multan: "4–6 working days",
  Hyderabad: "3–5 working days",
  Other: "5–7 working days",
};

const sampleReviews = (names) =>
  names.map((n, i) => ({
    id: `r-${i}`,
    author: n,
    rating: 5,
    date: "Mar 2026",
    text: "Fast delivery in Pakistan, product matched photos. COD was smooth.",
    photo: null,
  }));

/**
 * price = PKR (number, cart)
 * compareAt = optional strike price PKR
 */
export const CATALOG = [
  {
    _id: "ap-101",
    productName: "Wireless Earbuds Pro",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2070&auto=format&fit=crop",
    price: 2499,
    compareAt: 3499,
    color: "Black",
    badge: true,
    category: "tech",
    des: "Bluetooth 5.3 earbuds with charging case — ideal for campus and commute.",
    verifiedSeller: true,
    sellerRating: 4.8,
    sellerName: "Verified Tech Partner",
    originalGuarantee: true,
    reviews: sampleReviews(["Ayesha K.", "Bilal R."]),
  },
  {
    _id: "ap-102",
    productName: "USB-C Fast Charging Cable",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1976&auto=format&fit=crop",
    price: 599,
    compareAt: 899,
    color: "Grey",
    badge: false,
    category: "tech",
    des: "Braided 2m cable — phones, laptops, and power banks.",
    verifiedSeller: true,
    sellerRating: 4.6,
    sellerName: "Mobile Accessories PK",
    originalGuarantee: true,
    reviews: sampleReviews(["Sara M."]),
  },
  {
    _id: "ap-103",
    productName: "Campus Backpack",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    price: 2899,
    color: "Navy",
    badge: true,
    category: "fashion",
    des: "Padded laptop sleeve, water-resistant fabric.",
    verifiedSeller: true,
    sellerRating: 4.7,
    sellerName: "Urban Carry Co.",
    originalGuarantee: false,
    reviews: sampleReviews(["Hassan T.", "Noor F."]),
  },
  {
    _id: "ap-104",
    productName: "Minimal Tee — Pack of 2",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    price: 1599,
    compareAt: 1999,
    color: "White / Black",
    badge: false,
    category: "fashion",
    des: "Breathable cotton blend for daily wear.",
    verifiedSeller: true,
    sellerRating: 4.5,
    sellerName: "Threadline PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Zainab A."]),
  },
  {
    _id: "ap-105",
    productName: "Vitamin C Brightening Serum",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
    price: 899,
    compareAt: 1299,
    color: "30ml",
    badge: true,
    category: "beauty",
    des: "Dermatologist-tested — sealed & authentic.",
    verifiedSeller: true,
    sellerRating: 4.9,
    sellerName: "GlowHaus Official",
    originalGuarantee: true,
    reviews: sampleReviews(["Fatima S.", "Maryam L."]),
  },
  {
    _id: "ap-106",
    productName: "Desk LED Lamp",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop",
    price: 949,
    color: "White",
    badge: false,
    category: "stationery",
    des: "Touch dimmer, warm/cool light — perfect for study nights.",
    verifiedSeller: true,
    sellerRating: 4.6,
    sellerName: "StudySpace",
    originalGuarantee: false,
    reviews: sampleReviews(["Omar V."]),
  },
  {
    _id: "ap-107",
    productName: "Hardcover Notebook Set",
    img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop",
    price: 449,
    color: "Assorted",
    badge: true,
    category: "stationery",
    des: "A5 dotted pages — 3 pack.",
    verifiedSeller: true,
    sellerRating: 4.4,
    sellerName: "Paper & Ink PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Alina K."]),
  },
  {
    _id: "ap-108",
    productName: "Insulated Steel Bottle",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop",
    price: 699,
    compareAt: 999,
    color: "Mint",
    badge: false,
    category: "essentials",
    des: "Keeps drinks cold 24h — leak-proof lid.",
    verifiedSeller: true,
    sellerRating: 4.8,
    sellerName: "Campus Essentials",
    originalGuarantee: false,
    reviews: sampleReviews(["Hamza D."]),
  },
  {
    _id: "ap-109",
    productName: "Ceramic Mug Set",
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop",
    price: 799,
    color: "Matte Grey",
    badge: false,
    category: "home",
    des: "Microwave-safe — set of 2.",
    verifiedSeller: true,
    sellerRating: 4.3,
    sellerName: "HomeNest PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Rabia H."]),
  },
  {
    _id: "ap-110",
    productName: "Portable Bluetooth Speaker",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    price: 3299,
    compareAt: 4299,
    color: "Blue",
    badge: true,
    category: "tech",
    des: "12h battery, IPX5 splash resistant.",
    verifiedSeller: true,
    sellerRating: 4.7,
    sellerName: "Verified Tech Partner",
    originalGuarantee: true,
    reviews: sampleReviews(["Usman P.", "Khadija N."]),
  },
  {
    _id: "ap-111",
    productName: "Wireless Mouse",
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=2067&auto=format&fit=crop",
    price: 899,
    color: "Black",
    badge: false,
    category: "tech",
    des: "Silent clicks, ergonomic grip — USB receiver included.",
    verifiedSeller: true,
    sellerRating: 4.5,
    sellerName: "DeskGear PK",
    originalGuarantee: true,
    reviews: sampleReviews(["Ahmed R."]),
  },
  {
    _id: "ap-112",
    productName: "Running Sneakers",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    price: 4499,
    compareAt: 5999,
    color: "Red / White",
    badge: true,
    category: "fashion",
    des: "Lightweight mesh — everyday training.",
    verifiedSeller: true,
    sellerRating: 4.6,
    sellerName: "StreetFit PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Daniyal M."]),
  },
  {
    _id: "ap-113",
    productName: "Face Moisturizer SPF 30",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop",
    price: 749,
    color: "50ml",
    badge: false,
    category: "beauty",
    des: "Non-greasy daily sunscreen moisturizer.",
    verifiedSeller: true,
    sellerRating: 4.7,
    sellerName: "GlowHaus Official",
    originalGuarantee: true,
    reviews: sampleReviews(["Iqra S."]),
  },
  {
    _id: "ap-114",
    productName: "Desk Organizer",
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1974&auto=format&fit=crop",
    price: 579,
    color: "Bamboo",
    badge: false,
    category: "stationery",
    des: "Slots for pens, phone stand, cable cutouts.",
    verifiedSeller: true,
    sellerRating: 4.4,
    sellerName: "StudySpace",
    originalGuarantee: false,
    reviews: sampleReviews(["Sameer Q."]),
  },
  {
    _id: "ap-115",
    productName: "Bedside Alarm Clock",
    img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2070&auto=format&fit=crop",
    price: 1299,
    color: "Charcoal",
    badge: false,
    category: "home",
    des: "Large LED digits, dual alarm, USB charging port.",
    verifiedSeller: true,
    sellerRating: 4.5,
    sellerName: "HomeNest PK",
    originalGuarantee: true,
    reviews: sampleReviews(["Laiba J."]),
  },
  {
    _id: "ap-117",
    productName: "STEM Puzzle Kit",
    img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop",
    price: 1299,
    color: "Mixed",
    badge: true,
    category: "toys",
    des: "Hands-on learning toy — ages 8+. Great gift under payday deals.",
    verifiedSeller: true,
    sellerRating: 4.5,
    sellerName: "PlayLearn PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Sana I."]),
  },
  {
    _id: "ap-118",
    productName: "Remote Control Car",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    price: 2199,
    compareAt: 2799,
    color: "Red",
    badge: false,
    category: "toys",
    des: "Rechargeable — indoor/outdoor fun.",
    verifiedSeller: true,
    sellerRating: 4.4,
    sellerName: "PlayLearn PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Imran G."]),
  },
  {
    _id: "ap-116",
    productName: "Phone Grip & Stand",
    img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1967&auto=format&fit=crop",
    price: 349,
    color: "Black",
    badge: true,
    category: "tech",
    des: "Stick-on grip — works with most cases.",
    verifiedSeller: true,
    sellerRating: 4.3,
    sellerName: "Mobile Accessories PK",
    originalGuarantee: false,
    reviews: sampleReviews(["Yusuf A."]),
  },
];

export function getProductById(id) {
  if (!id) return null;
  const normalized = String(id).toLowerCase();
  return (
    CATALOG.find((p) => String(p._id).toLowerCase() === normalized) || null
  );
}

export function getRelated(product, limit = 4) {
  return CATALOG.filter(
    (p) => p.category === product.category && p._id !== product._id
  ).slice(0, limit);
}

export function getFrequentlyBoughtTogether(product) {
  const pool = CATALOG.filter((p) => p._id !== product._id);
  return pool.slice(0, 3);
}

export function filterUnder999() {
  return CATALOG.filter((p) => p.price <= 999);
}

export function filterUnder3000() {
  return CATALOG.filter((p) => p.price <= 3000);
}

export function filterDeals() {
  return CATALOG.filter((p) => p.compareAt && p.compareAt > p.price);
}

export function filterCategory(cat) {
  return CATALOG.filter((p) => p.category === cat);
}

/** IDs surfaced in Smartest Cart / student bundle UI — expanded picks ≤ PKR 3k challenge */
const STUDENT_ESSENTIAL_IDS = [
  "ap-116",
  "ap-107",
  "ap-102",
  "ap-108",
  "ap-114",
  "ap-113",
  "ap-105",
  "ap-106",
  "ap-109",
  "ap-111",
  "ap-117",
  "ap-104",
  "ap-115",
  "ap-103",
];

export function getStudentEssentialsPoolIds() {
  return [...STUDENT_ESSENTIAL_IDS];
}

export function filterStudentEssentials() {
  return STUDENT_ESSENTIAL_IDS.map((id) => getProductById(id)).filter(Boolean);
}
