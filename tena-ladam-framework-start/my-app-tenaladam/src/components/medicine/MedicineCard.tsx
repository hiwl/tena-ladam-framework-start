
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface MedicineProps {
  id: string;
  name: string;
  type: "modern" | "traditional";
  category: string;
  image: string;
  shortDescription: string;
}

const MedicineCard = ({ 
  id, 
  name, 
  type, 
  category, 
  image, 
  shortDescription 
}: MedicineProps) => {
  const isModern = type === "modern";
  const [imageError, setImageError] = useState(false);
  
  // Use these fallback images when the provided image URL fails
  const fallbackImages = {
    traditional: "/placeholder.svg",
    modern: "/placeholder.svg"
  };
  
  const handleImageError = () => {
    console.log("Image failed to load:", image);
    setImageError(true);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className={`h-48 overflow-hidden ${isModern ? "bg-medical-lightblue" : "bg-medical-lightgreen"}`}>
        <img 
          src={imageError ? (isModern ? fallbackImages.modern : fallbackImages.traditional) : image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start mb-2">
          <Badge 
            className={isModern ? "bg-medical-blue" : "bg-medical-green"}
          >
            {category}
          </Badge>
        </div>
        <h3 className="font-bold text-lg">{name}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 text-sm line-clamp-3">{shortDescription}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/medicine/${id}`} className="w-full">
          <Button 
            variant="outline" 
            className={`w-full ${isModern ? "text-medical-blue border-medical-blue hover:bg-medical-lightblue" : "text-medical-green border-medical-green hover:bg-medical-lightgreen"}`}
          >
            Learn More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MedicineCard;
