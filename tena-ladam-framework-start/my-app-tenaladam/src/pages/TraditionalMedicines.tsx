
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import MedicineCard from "@/components/medicine/MedicineCard";
import SearchBar from "@/components/medicine/SearchBar";
import FilterSection, { FilterOption } from "@/components/medicine/FilterSection";
import { supabase } from "@/integrations/supabase/client";

interface TraditionalMedicine {
  id: string;
  name: string;
  category: string;
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

const TraditionalMedicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Path to the new shared traditional medicine image
  const sharedMedicineImage = "/lovable-uploads/1f0a7304-0da2-4579-b1b4-bbe086e5f29c.png";

  const { data: medicines, isLoading } = useQuery({
    queryKey: ["traditional-medicines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("traditional_medicines")
        .select("*");

      if (error) {
        throw new Error(error.message);
      }
      
      // Use the new shared traditional medicine image for all medicines
      return data?.map(med => ({
        ...med,
        image: sharedMedicineImage
      })) as TraditionalMedicine[];
    },
  });

  // Extract unique categories
  const categories: FilterOption[] = medicines
    ? Array.from(new Set(medicines.map(med => med.category)))
        .map(category => ({
          id: category,
          label: category
        }))
    : [];

  // Filter medicines based on search and filters
  const filteredMedicines = medicines
    ? medicines.filter(medicine => {
        const matchesSearch = searchQuery === "" || 
          medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          medicine.shortdescription.toLowerCase().includes(searchQuery.toLowerCase());
          
        const matchesCategory = selectedCategories.length === 0 || 
          selectedCategories.includes(medicine.category);
          
        return matchesSearch && matchesCategory;
      })
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-medical-terracotta mb-4">Traditional Remedies</h1>
          <p className="text-gray-600 max-w-3xl">
            Discover traditional medicines from various cultures around the world, with information on their historical uses, scientific evidence, and safety considerations.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Filters */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <SearchBar 
                placeholder="Search remedies..." 
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

          {/* Medicines Grid */}
          <div className="col-span-12 md:col-span-9">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading traditional medicines...</p>
              </div>
            ) : filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map(medicine => (
                  <MedicineCard 
                    key={medicine.id} 
                    id={medicine.id}
                    name={medicine.name}
                    type="traditional"
                    category={medicine.category}
                    image={medicine.image}
                    shortDescription={medicine.shortdescription}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No traditional remedies found matching your criteria.</p>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TraditionalMedicines;
