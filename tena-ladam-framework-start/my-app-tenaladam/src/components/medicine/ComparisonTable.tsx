
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface MedicineComparisonData {
  id: string;
  name: string;
  type: "modern" | "traditional";
  efficacy: string;
  sideEffects: string;
  interactions: string;
  cost: string;
  availability: string;
}

interface ComparisonTableProps {
  medicines: MedicineComparisonData[];
}

const ComparisonTable = ({ medicines }: ComparisonTableProps) => {
  if (medicines.length === 0) {
    return <div className="text-center py-8">No medicines selected for comparison</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Feature</TableHead>
            {medicines.map((medicine) => (
              <TableHead key={medicine.id} className="min-w-[200px]">
                <span className={medicine.type === "modern" ? "text-medical-blue" : "text-medical-green"}>
                  {medicine.name}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Type</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-type`}>
                <span className={
                  medicine.type === "modern" 
                    ? "px-2 py-1 rounded bg-medical-lightblue text-medical-blue text-xs font-medium" 
                    : "px-2 py-1 rounded bg-medical-lightgreen text-medical-green text-xs font-medium"
                }>
                  {medicine.type === "modern" ? "Modern" : "Traditional"}
                </span>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Efficacy</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-efficacy`}>{medicine.efficacy}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Side Effects</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-sideEffects`}>{medicine.sideEffects}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Interactions</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-interactions`}>{medicine.interactions}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cost</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-cost`}>{medicine.cost}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Availability</TableCell>
            {medicines.map((medicine) => (
              <TableCell key={`${medicine.id}-availability`}>{medicine.availability}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
