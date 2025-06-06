
export interface Medicine {
  id: string;
  name: string;
  type: "modern" | "traditional";
  category: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  efficacy: string;
  sideEffects: string;
  interactions: string;
  cost: string;
  availability: string;
  dosage?: string;
}

// Sample traditional medicines data
export const medicines: Medicine[] = [
  {
    id: "trad-001",
    name: "Turmeric",
    type: "traditional",
    category: "Herbal",
    image: "/placeholder.svg",
    shortDescription: "Natural anti-inflammatory spice used in traditional medicine systems.",
    longDescription: "Turmeric has been used for thousands of years in Ayurvedic medicine. Its active compound, curcumin, has powerful anti-inflammatory and antioxidant properties.",
    efficacy: "Moderate evidence for reducing inflammation and joint pain; limited evidence for other claims.",
    sideEffects: "Generally safe in food amounts; may cause digestive issues in high doses.",
    interactions: "May interact with blood thinners, diabetes medications, and acid reducers.",
    cost: "Inexpensive",
    availability: "Widely available in grocery stores, pharmacies, and health food stores.",
    dosage: "400-600mg curcumin 2-3 times daily"
  },
  {
    id: "trad-002",
    name: "Ginseng",
    type: "traditional",
    category: "Root",
    image: "/placeholder.svg",
    shortDescription: "Adaptogenic herb used in traditional Chinese medicine for energy and vitality.",
    longDescription: "Different varieties of ginseng (Asian, American, Siberian) have been used for centuries to increase energy, reduce stress, and improve mental performance.",
    efficacy: "Mixed evidence for improving energy levels; limited evidence for cognitive benefits.",
    sideEffects: "May cause insomnia, headaches, digestive issues; not recommended for long-term use.",
    interactions: "May interact with stimulants, blood thinners, and diabetes medications.",
    cost: "Moderate to expensive",
    availability: "Available in health food stores and specialty shops.",
    dosage: "200-400mg extract daily"
  },
  {
    id: "trad-003",
    name: "Echinacea",
    type: "traditional",
    category: "Herbal",
    image: "/placeholder.svg",
    shortDescription: "Flowering plant used in traditional medicine for immune support.",
    longDescription: "Native American tribes used echinacea for centuries before it became popular in Western herbal medicine. It's commonly used to prevent and treat colds.",
    efficacy: "Limited evidence for reducing duration of colds; mixed results for prevention.",
    sideEffects: "Generally safe; may cause allergic reactions in some people.",
    interactions: "May interact with immunosuppressants and some medications metabolized by the liver.",
    cost: "Inexpensive to moderate",
    availability: "Widely available in pharmacies and health food stores.",
    dosage: "300-500mg three times daily"
  }
];

// Filter helpers
export const getModernMedicines = () => medicines.filter(med => med.type === "modern");
export const getTraditionalMedicines = () => medicines.filter(med => med.type === "traditional");
export const getMedicineById = (id: string) => medicines.find(med => med.id === id);
