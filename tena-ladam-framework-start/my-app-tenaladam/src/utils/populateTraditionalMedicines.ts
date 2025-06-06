
import { supabase } from "@/integrations/supabase/client";
import { adaptTraditionalMedicine } from "./adapters/traditionalMedicineAdapter";

// Path to the new traditional medicine image
const traditionalMedicineImage = "/lovable-uploads/1f0a7304-0da2-4579-b1b4-bbe086e5f29c.png";

// Traditional medicines input data
export const traditionalMedicinesData = [
  {
    name: "Aloe Vera",
    category: "Herbal",
    image: traditionalMedicineImage,
    shortDescription: "A succulent plant known for its healing gel.",
    longDescription: "Aloe vera is widely used in Ethiopian traditional medicine for treating skin burns, wounds, and digestive disorders. Its clear gel contains soothing and moisturizing compounds.",
    efficacy: "Well-documented for topical use on minor burns and skin conditions; limited evidence for internal use.",
    sideEffects: "Generally safe for external use; may cause digestive issues when consumed internally.",
    interactions: "May interact with certain medications including diabetes drugs and diuretics.",
    cost: "Inexpensive",
    availability: "Widely available as live plants and in various preparations.",
    dosage: "External: Apply 1-2 times/day. Internal: 1-2 teaspoons gel in water/day (short-term use).",
    origins: "Ethiopia"
  },
  {
    name: "Echinops Giganteus",
    category: "Herb",
    image: traditionalMedicineImage,
    shortDescription: "Spiny herb with medicinal roots.",
    longDescription: "Known for its large flower heads and spiny leaves, Echinops is used in Ethiopian herbal practices to reduce fever and clear respiratory infections.",
    efficacy: "Limited clinical evidence, but traditional use suggests some effectiveness for respiratory conditions.",
    sideEffects: "Generally considered safe in traditional doses; possible digestive upset.",
    interactions: "Potential interactions with blood pressure medications.",
    cost: "Moderate",
    availability: "Available in specialty herb shops and in rural areas of Ethiopia.",
    dosage: "1 cup of tea made from boiled roots twice daily.",
    origins: "Ethiopia"
  },
  {
    name: "Ocimum Basilicum (Basil)",
    category: "Herbal",
    image: traditionalMedicineImage,
    shortDescription: "Aromatic herb used in medicine and food.",
    longDescription: "Basil is a fragrant herb used in Ethiopian cooking and medicine to relieve stomach discomfort, colds, and inflammation. Its essential oils have soothing properties.",
    efficacy: "Some evidence supports anti-inflammatory and antimicrobial properties.",
    sideEffects: "Safe when consumed in normal food amounts; rarely causes allergic reactions.",
    interactions: "May interact with blood thinning medications.",
    cost: "Very low",
    availability: "Widely available in markets, grocery stores, and easily grown at home.",
    dosage: "1-2 cups of tea per day or fresh leaves as desired.",
    origins: "Ethiopia"
  },
  {
    name: "Moringa Oleifera",
    category: "Tree",
    image: traditionalMedicineImage,
    shortDescription: "Highly nutritious tree with healing benefits.",
    longDescription: "Moringa is a drought-resistant tree prized for its vitamin-rich leaves. It is used to fight malnutrition, boost immunity, and improve digestion in both urban and rural Ethiopia.",
    efficacy: "Strong evidence for nutritional benefits; emerging evidence for anti-inflammatory effects.",
    sideEffects: "Generally recognized as safe; may cause uterine contractions in high doses.",
    interactions: "May affect absorption of some medications.",
    cost: "Low",
    availability: "Increasingly available in health food stores and Ethiopian markets.",
    dosage: "1-2 tsp powder daily or a handful of cooked leaves.",
    origins: "Ethiopia"
  },
  {
    name: "Galenia Africana",
    category: "Shrub",
    image: traditionalMedicineImage,
    shortDescription: "Hardy shrub used for infections and malaria.",
    longDescription: "This tough shrub is used traditionally in southern Ethiopia to treat wounds, malaria symptoms, and inflammation. Its extracts are applied to skin or consumed as tea.",
    efficacy: "Limited scientific evidence; traditional use for fever and skin conditions.",
    sideEffects: "Generally well-tolerated when used traditionally; full safety profile not established.",
    interactions: "Unknown; caution advised with other medications.",
    cost: "Low to moderate",
    availability: "Limited to regions where it grows naturally; not commonly commercialized.",
    dosage: "Tea: 1 cup/day; Wash: Apply 2-3 times/day",
    origins: "Ethiopia"
  }
  // More medicines can be added here
];

export const addTraditionalMedicines = async () => {
  // First check if we already have these medicines in the database
  const { data: existingMeds, error: checkError } = await supabase
    .from("traditional_medicines")
    .select("id")
    .limit(1);
    
  if (checkError) {
    console.error("Error checking for existing traditional medicines:", checkError);
    return false;
  }
  
  // If we already have traditional medicines, don't add them again
  if (existingMeds && existingMeds.length > 0) {
    console.log("Traditional medicines already exist in database");
    return true;
  }
  
  // Adapt medicines to the correct database format
  const adaptedMedicines = traditionalMedicinesData.map(medicine => 
    adaptTraditionalMedicine(medicine)
  );
  
  // Add the traditional medicines
  const { error: insertError } = await supabase
    .from("traditional_medicines")
    .insert(adaptedMedicines);
    
  if (insertError) {
    console.error("Error adding traditional medicines:", insertError);
    return false;
  }
  
  console.log("Successfully added traditional medicines");
  return true;
};
