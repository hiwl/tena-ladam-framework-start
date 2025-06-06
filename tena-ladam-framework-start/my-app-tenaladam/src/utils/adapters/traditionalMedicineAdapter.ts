
export interface TraditionalMedicineInput {
  name: string;
  category: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  efficacy: string;
  sideEffects: string;
  interactions: string;
  cost: string;
  availability: string;
  dosage: string;
  origins?: string;
}

export const adaptTraditionalMedicine = (medicine: TraditionalMedicineInput) => {
  return {
    name: medicine.name,
    category: medicine.category,
    image: medicine.image || '/placeholder.svg',
    shortdescription: medicine.shortDescription,
    longdescription: medicine.longDescription,
    efficacy: medicine.efficacy,
    sideeffects: medicine.sideEffects,
    interactions: medicine.interactions,
    cost: medicine.cost,
    availability: medicine.availability,
    dosage: medicine.dosage,
    origins: medicine.origins
  };
};
