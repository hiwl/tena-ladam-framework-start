
import { supabase } from "@/integrations/supabase/client";
import { addTraditionalMedicines } from "./populateTraditionalMedicines";

export interface Medicine {
  id?: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  shortdescription: string;
  longdescription: string;
  efficacy: string;
  sideeffects: string;
  interactions: string;
  cost: string;
  availability: string;
  dosage?: string;
  origins?: string;
}

export const modernMedicines: Medicine[] = [
  {
    name: "Paracetamol (Acetaminophen)",
    category: "Analgesic",
    subcategory: "Non-opioid",
    image: "/placeholder.svg",
    shortdescription: "Common pain reliever and fever reducer suitable for mild to moderate pain.",
    longdescription: "Paracetamol works primarily in the central nervous system to reduce pain signals and fever. It's considered safer than NSAIDs for certain populations but requires careful dosing to avoid liver damage.",
    efficacy: "Effective for mild to moderate pain and fever; less effective for inflammatory conditions.",
    sideeffects: "Generally well-tolerated; rare side effects include liver damage at high doses.",
    interactions: "May interact with warfarin, alcohol, and certain liver enzyme-inducing medications.",
    cost: "Inexpensive",
    availability: "Widely available OTC in pharmacies and grocery stores.",
    dosage: "Adults: 500-1000mg every 4-6 hours as needed, not exceeding 4g per day.",
    origins: "Originally developed in Germany"
  },
  {
    name: "Ibuprofen",
    category: "NSAID",
    subcategory: "Propionic acid derivative",
    image: "/placeholder.svg",
    shortdescription: "Non-steroidal anti-inflammatory drug for pain, inflammation, and fever.",
    longdescription: "Ibuprofen reduces prostaglandin synthesis by inhibiting cyclooxygenase enzymes, providing analgesic, anti-inflammatory, and antipyretic effects. It's commonly used for headaches, dental pain, menstrual cramps, and inflammatory conditions.",
    efficacy: "Highly effective for inflammatory pain, fever, and swelling.",
    sideeffects: "GI irritation, increased risk of heart attack and stroke with long-term use, fluid retention.",
    interactions: "May interact with blood thinners, aspirin, ACE inhibitors, lithium, and methotrexate.",
    cost: "Inexpensive",
    availability: "Widely available OTC in pharmacies and grocery stores.",
    dosage: "Adults: 200-400mg every 4-6 hours as needed, not exceeding 3200mg per day.",
    origins: "Developed in the UK by Boots laboratories"
  },
  {
    name: "Amoxicillin",
    category: "Antibiotic",
    subcategory: "Penicillin",
    image: "/placeholder.svg",
    shortdescription: "Broad-spectrum penicillin antibiotic for treating bacterial infections.",
    longdescription: "Amoxicillin inhibits bacterial cell wall synthesis, making it effective against many gram-positive and some gram-negative bacteria. It's commonly prescribed for respiratory, urinary tract, and ear infections.",
    efficacy: "Effective against susceptible bacterial strains; ineffective against viral infections.",
    sideeffects: "Diarrhea, rash, nausea, allergic reactions (including anaphylaxis in penicillin-allergic individuals).",
    interactions: "May reduce effectiveness of oral contraceptives; increased effect with probenecid.",
    cost: "Low to moderate",
    availability: "Prescription only, available at pharmacies.",
    dosage: "Adults: 250-500mg three times daily for 7-14 days, depending on infection.",
    origins: "Developed in the UK by Beecham Research Laboratories"
  },
  {
    name: "Lisinopril",
    category: "Antihypertensive",
    subcategory: "ACE Inhibitor",
    image: "/placeholder.svg",
    shortdescription: "ACE inhibitor for treating high blood pressure and heart failure.",
    longdescription: "Lisinopril blocks the conversion of angiotensin I to angiotensin II, relaxing blood vessels and reducing blood pressure. It's also used to improve survival after heart attacks and to protect kidneys in diabetic patients.",
    efficacy: "Effectively lowers blood pressure and reduces cardiovascular events in high-risk patients.",
    sideeffects: "Dry cough, dizziness, headache, fatigue, high potassium levels, rare angioedema.",
    interactions: "Potassium supplements, potassium-sparing diuretics, lithium, NSAIDs, aliskiren.",
    cost: "Low to moderate",
    availability: "Prescription only, widely available at pharmacies.",
    dosage: "Adults: Starting dose 10mg once daily, may be adjusted to 20-40mg daily.",
    origins: "Developed by Merck & Co"
  },
  {
    name: "Atorvastatin",
    category: "Lipid-lowering",
    subcategory: "Statin",
    image: "/placeholder.svg",
    shortdescription: "Statin medication for lowering cholesterol and preventing cardiovascular disease.",
    longdescription: "Atorvastatin inhibits HMG-CoA reductase, reducing cholesterol production in the liver. It effectively lowers LDL ('bad') cholesterol and triglycerides while slightly raising HDL ('good') cholesterol, helping to prevent cardiovascular events.",
    efficacy: "Highly effective at lowering LDL cholesterol (up to 60%) and reducing cardiovascular risk.",
    sideeffects: "Muscle pain, liver enzyme elevations, digestive issues, rare rhabdomyolysis.",
    interactions: "Grapefruit juice, certain antibiotics, antifungals, HIV medications, cyclosporine.",
    cost: "Moderate (now generic)",
    availability: "Prescription only, widely available at pharmacies.",
    dosage: "Adults: 10-80mg once daily, typically taken in the evening.",
    origins: "Developed by Pfizer"
  },
  {
    name: "Metformin",
    category: "Antidiabetic",
    subcategory: "Biguanide",
    image: "/placeholder.svg",
    shortdescription: "First-line medication for type 2 diabetes that improves insulin sensitivity.",
    longdescription: "Metformin reduces glucose production in the liver, decreases intestinal absorption of glucose, and improves insulin sensitivity. It's the preferred initial drug for type 2 diabetes and may help with weight management and PCOS.",
    efficacy: "Effectively lowers blood glucose with low risk of hypoglycemia; may reduce diabetes-related complications.",
    sideeffects: "Digestive issues (nausea, diarrhea), vitamin B12 deficiency, rare lactic acidosis.",
    interactions: "Iodinated contrast media, alcohol, certain diabetes medications, cimetidine.",
    cost: "Low",
    availability: "Prescription only, widely available at pharmacies.",
    dosage: "Starting dose 500mg once or twice daily, may be increased gradually to 2000-2500mg daily.",
    origins: "Derived from French lilac (Galega officinalis)"
  },
  {
    name: "Fluoxetine",
    category: "Antidepressant",
    subcategory: "SSRI",
    image: "/placeholder.svg",
    shortdescription: "Selective serotonin reuptake inhibitor for depression, anxiety, and OCD.",
    longdescription: "Fluoxetine increases serotonin levels in the brain by blocking its reuptake. It's used to treat major depressive disorder, panic disorder, OCD, bulimia nervosa, and premenstrual dysphoric disorder.",
    efficacy: "Effective for depression and anxiety disorders; may take 4-6 weeks for full effect.",
    sideeffects: "Nausea, insomnia, sexual dysfunction, anxiety, decreased appetite, rare serotonin syndrome.",
    interactions: "MAOIs, triptans, certain pain medications, other antidepressants, tryptophan.",
    cost: "Low (generic)",
    availability: "Prescription only, widely available at pharmacies.",
    dosage: "Adults: 20mg once daily in the morning, may be adjusted to 20-80mg daily.",
    origins: "Developed by Eli Lilly"
  }
];

export const checkAndPopulateMedicines = async () => {
  try {
    // Check if modern medicines exist
    const { data: existingModern, error: checkError } = await supabase
      .from("modern_medicines")
      .select("id")
      .limit(1);
      
    if (checkError) {
      console.error("Error checking medicines:", checkError);
      throw checkError;
    }
      
    // If no modern medicines, populate them
    if (!existingModern || existingModern.length === 0) {
      const { error } = await supabase
        .from("modern_medicines")
        .insert(modernMedicines);
        
      if (error) {
        console.error("Error inserting modern medicines:", error);
        throw error;
      }
      console.log("Added modern medicines");
    } else {
      console.log("Modern medicines already exist in database");
    }
    
    // Add traditional medicines
    await addTraditionalMedicines();
    
    // Count total medicines
    const { count: modernCount, error: countError } = await supabase
      .from("modern_medicines")
      .select("*", { count: "exact", head: true });
      
    if (countError) throw countError;
    
    const { count: traditionalCount, error: traditionalCountError } = await supabase
      .from("traditional_medicines")
      .select("*", { count: "exact", head: true });
      
    if (traditionalCountError) throw traditionalCountError;
    
    const totalCount = (modernCount || 0) + (traditionalCount || 0);
    console.log(`Total medicines in database: ${totalCount} (Modern: ${modernCount}, Traditional: ${traditionalCount})`);
    return totalCount;
  } catch (error) {
    console.error("Error in checkAndPopulateMedicines:", error);
    throw error;
  }
};
