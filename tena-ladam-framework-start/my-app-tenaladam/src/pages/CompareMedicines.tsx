
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import ComparisonTable from "@/components/medicine/ComparisonTable";
import { Button } from "@/components/ui/button";
import { CheckSquare, XSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define a single interface for both medicine types
interface Medicine {
  id: string;
  name: string;
  type: "modern" | "traditional";
  efficacy: string;
  sideEffects?: string;
  sideeffects?: string;
  interactions: string;
  cost: string;
  availability: string;
}

const CompareMedicines = () => {
  const [searchParams] = useSearchParams();
  const initialMedicineIds = searchParams.get("medicines")?.split(",") || [];
  
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [availableMedicines, setAvailableMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch both modern and traditional medicines
  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      // Fetch modern medicines
      const { data: modernData, error: modernError } = await supabase
        .from("modern_medicines")
        .select("id, name, efficacy, sideeffects, interactions, cost, availability");

      if (modernError) throw modernError;

      // Fetch traditional medicines
      const { data: traditionalData, error: traditionalError } = await supabase
        .from("traditional_medicines")
        .select("id, name, efficacy, sideeffects, interactions, cost, availability");

      if (traditionalError) throw traditionalError;

      // Format the data with type designation
      const formattedModern = modernData.map(med => ({
        ...med,
        type: "modern" as const,
        sideEffects: med.sideeffects,
      }));
      
      const formattedTraditional = traditionalData.map(med => ({
        ...med,
        type: "traditional" as const,
        sideEffects: med.sideeffects,
      }));

      // Combine both medicine types
      const allMedicines = [...formattedModern, ...formattedTraditional];
      
      // Initialize selected medicines from URL params
      if (initialMedicineIds.length > 0) {
        const initialSelected = allMedicines.filter(med => 
          initialMedicineIds.includes(med.id)
        );
        setSelectedMedicines(initialSelected);
        
        // Set available medicines (those not already selected)
        const remaining = allMedicines.filter(med => 
          !initialMedicineIds.includes(med.id)
        );
        setAvailableMedicines(remaining);
      } else {
        setAvailableMedicines(allMedicines);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      toast.error("Failed to load medicines");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedicine = (medicine: Medicine) => {
    if (selectedMedicines.length < 3) {
      setSelectedMedicines([...selectedMedicines, medicine]);
      setAvailableMedicines(availableMedicines.filter(med => med.id !== medicine.id));
    } else {
      toast.error("You can only compare up to 3 medicines at a time");
    }
  };

  const handleRemoveMedicine = (medicineId: string) => {
    const medicineToRemove = selectedMedicines.find(med => med.id === medicineId);
    if (medicineToRemove) {
      setSelectedMedicines(selectedMedicines.filter(med => med.id !== medicineId));
      setAvailableMedicines([...availableMedicines, medicineToRemove]);
    }
  };

  const comparisonData = selectedMedicines.map(medicine => ({
    id: medicine.id,
    name: medicine.name,
    type: medicine.type,
    efficacy: medicine.efficacy,
    sideEffects: medicine.sideEffects || medicine.sideeffects || "",
    interactions: medicine.interactions,
    cost: medicine.cost,
    availability: medicine.availability,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-medical-terracotta mb-4">Medicine Comparison Tool</h1>
        <p className="text-gray-600 max-w-3xl mb-8">
          Compare different medications side by side to understand their benefits, risks, and characteristics. Select up to 3 medicines to compare.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <h2 className="font-bold text-lg mb-4">Select Medicines</h2>
              {selectedMedicines.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-2 text-gray-500">Selected ({selectedMedicines.length}/3)</h3>
                  <ul className="space-y-2">
                    {selectedMedicines.map(medicine => (
                      <li key={medicine.id} className="flex justify-between items-center p-2 border rounded">
                        <span className={`font-medium ${medicine.type === "modern" ? "text-medical-blue" : "text-medical-green"}`}>
                          {medicine.name}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveMedicine(medicine.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <XSquare className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-4">
                  <p>Loading medicines...</p>
                </div>
              ) : availableMedicines.length > 0 && selectedMedicines.length < 3 ? (
                <>
                  <h3 className="font-medium text-sm mb-2 text-gray-500">Available Medicines</h3>
                  <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                    {availableMedicines.map(medicine => (
                      <li key={medicine.id} className="flex justify-between items-center p-2 border rounded">
                        <span className="font-medium">{medicine.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleAddMedicine(medicine)}
                          disabled={selectedMedicines.length >= 3}
                          className="text-gray-500 hover:text-green-500"
                        >
                          <CheckSquare className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    {selectedMedicines.length >= 3 
                      ? "Maximum medicines selected" 
                      : "No medicines available"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <h2 className="font-bold text-lg mb-4">Comparison Results</h2>
              {selectedMedicines.length > 0 ? (
                <ComparisonTable medicines={comparisonData} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">Select medicines to compare</p>
                  <p className="text-gray-500">Choose up to 3 medicines from the left panel</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
          <h2 className="font-bold text-lg mb-2">Understanding this Comparison</h2>
          <p className="text-gray-600 mb-4">
            Our comparison tool presents information from scientific studies, clinical trials, and traditional knowledge. Here's how to interpret the results:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Efficacy:</strong> How well the medicine works for its intended purpose based on available evidence.</li>
            <li><strong>Side Effects:</strong> Common and significant potential adverse effects.</li>
            <li><strong>Interactions:</strong> How the medicine may interact with other substances.</li>
            <li><strong>Cost:</strong> Relative affordability.</li>
            <li><strong>Availability:</strong> How easily the medicine can be obtained.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CompareMedicines;
