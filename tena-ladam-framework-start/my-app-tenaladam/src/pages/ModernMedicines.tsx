
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import MedicineCard from "@/components/medicine/MedicineCard";
import SearchBar from "@/components/medicine/SearchBar";
import FilterSection, { FilterOption } from "@/components/medicine/FilterSection";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export interface MedicineRow {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  image: string;
  shortdescription: string;
  longdescription: string;
  efficacy: string;
  sideeffects: string;
  interactions: string;
  cost: string;
  availability: string;
  dosage: string | null;
}

const fetchModernMedicines = async (): Promise<MedicineRow[]> => {
  const { data, error } = await supabase
    .from("modern_medicines")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching medicines:", error);
    throw new Error(error.message);
  }
  
  console.log("Fetched medicines:", data?.length || 0);
  return data || [];
};

const ModernMedicines = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["modern-medicines"],
    queryFn: fetchModernMedicines,
  });

  // Update search query when URL parameter changes
  useEffect(() => {
    const newSearchQuery = queryParams.get("search") || "";
    setSearchQuery(newSearchQuery);
  }, [location.search]);

  const medicines = data || [];

  const categories: FilterOption[] = Array.from(
    new Set(medicines.map((m) => m.category))
  ).map((category) => ({
    id: category,
    label: category,
  }));

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      searchQuery === "" ||
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (medicine.shortdescription || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(medicine.category);

    return matchesSearch && matchesCategory;
  });
  
  const handleRefresh = () => {
    refetch();
    toast.success("Medicine list refreshed");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-medical-darkpurple mb-4">
              Modern Medicines
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Explore the WHO Model List of Essential Medicines. Find detailed profiles, uses, efficacy, and safety of each listed medicine.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh List
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <SearchBar
                placeholder="Search medicines..."
                onSearch={setSearchQuery}
                initialValue={searchQuery}
              />
              <div className="mt-6">
                <FilterSection
                  title="Categories"
                  options={categories}
                  selectedOptions={selectedCategories}
                  onChange={setSelectedCategories}
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading medicines...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Failed to load medicines: {(error as Error).message}</p>
                <Button 
                  variant="outline" 
                  onClick={() => refetch()} 
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    id={medicine.id}
                    name={medicine.name}
                    type="modern"
                    category={medicine.category}
                    image={medicine.image}
                    shortDescription={medicine.shortdescription}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">
                  No medicines found matching your criteria.
                </p>
                <p className="text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModernMedicines;
