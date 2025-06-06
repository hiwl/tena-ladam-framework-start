
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertTriangle, DollarSign, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import CommentSection from "@/components/comments/CommentSection";
import { useState } from "react";

const MedicineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [imageError, setImageError] = useState(false);
  
  // Path to the new shared traditional medicine image
  const sharedTraditionalMedicineImage = "/lovable-uploads/1f0a7304-0da2-4579-b1b4-bbe086e5f29c.png";
  
  const { data: medicine, isLoading } = useQuery({
    queryKey: ["medicine", id],
    queryFn: async () => {
      // Try to fetch from modern_medicines first
      let { data: modernMedicine, error: modernError } = await supabase
        .from("modern_medicines")
        .select("*")
        .eq("id", id)
        .single();
        
      if (modernMedicine) {
        return { ...modernMedicine, type: "modern" };
      }
      
      // If not found in modern_medicines, try traditional_medicines
      const { data: traditionalMedicine, error: traditionalError } = await supabase
        .from("traditional_medicines")
        .select("*")
        .eq("id", id)
        .single();
        
      if (traditionalMedicine) {
        // For traditional medicines, use the shared image
        return { 
          ...traditionalMedicine, 
          type: "traditional",
          image: sharedTraditionalMedicineImage 
        };
      }
      
      // If not found in either table, throw an error
      throw new Error("Medicine not found");
    }
  });
  
  // Fallback image handling
  const fallbackImage = "/placeholder.svg";
  const handleImageError = () => {
    console.log("Image failed to load on medicine detail page");
    setImageError(true);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center">Loading medicine details...</p>
        </div>
      </Layout>
    );
  }
  
  if (!medicine) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-red-500">Medicine not found</p>
        </div>
      </Layout>
    );
  }
  
  const isModern = medicine.type === "modern";
  const themeColor = isModern ? "medical-blue" : "medical-green";
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <a 
            href={isModern ? "/modern-medicines" : "/traditional-medicines"} 
            className="text-gray-500 hover:underline"
          >
            {isModern ? "Modern Medicines" : "Traditional Medicines"}
          </a>
          <span className="text-gray-500">/</span>
          <span className="font-semibold">{medicine.name}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className={`rounded-lg overflow-hidden bg-${themeColor}/10 mb-4`}>
              <img 
                src={imageError ? fallbackImage : medicine.image} 
                alt={medicine.name} 
                className="w-full h-64 object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <Badge className={`bg-${themeColor}`}>
                {medicine.category}
              </Badge>
              {medicine.subcategory && (
                <Badge variant="outline" className={`text-${themeColor} border-${themeColor}`}>
                  {medicine.subcategory}
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
            <p className="text-gray-600 mb-6">{medicine.shortdescription}</p>
            
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="efficacy">Efficacy & Side Effects</TabsTrigger>
                <TabsTrigger value="availability">Dosage & Availability</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="p-4 rounded-md bg-gray-50">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="mb-4">{medicine.longdescription}</p>
                  
                  {medicine.origins && (
                    <>
                      <h3 className="font-medium mb-2">Origins</h3>
                      <p>{medicine.origins}</p>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="efficacy">
                <div className="space-y-6">
                  <div className="p-4 rounded-md bg-blue-50">
                    <div className="flex items-start">
                      <div className="mr-2">🎯</div>
                      <div>
                        <h3 className="font-medium mb-2">Efficacy</h3>
                        <p>{medicine.efficacy}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-amber-50">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <div>
                        <h3 className="font-medium mb-2">Side Effects</h3>
                        <p>{medicine.sideeffects}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-gray-50">
                    <h3 className="font-medium mb-2">Interactions</h3>
                    <p>{medicine.interactions}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="availability">
                <div className="space-y-6">
                  {medicine.dosage && (
                    <div className="p-4 rounded-md bg-gray-50">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <h3 className="font-medium mb-2">Typical Dosage</h3>
                          <p>{medicine.dosage}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-md bg-green-50">
                    <div className="flex items-start">
                      <ShoppingBag className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <h3 className="font-medium mb-2">Availability</h3>
                        <p>{medicine.availability}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-gray-50">
                    <div className="flex items-start">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <h3 className="font-medium mb-2">Cost</h3>
                        <p>{medicine.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <CommentSection medicineId={id || ""} />
      </div>
    </Layout>
  );
};

export default MedicineDetail;
