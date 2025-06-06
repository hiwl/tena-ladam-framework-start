
import Layout from "@/components/layout/Layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ReminderForm } from "@/components/reminders/ReminderForm";
import { ReminderCard } from "@/components/reminders/ReminderCard";
import { toast } from "sonner";
import { useState } from "react";
import { Check } from "lucide-react";

interface Reminder {
  id: string;
  medicine_name: string;
  dosage?: string | null;
  frequency: string;
  time_of_day: string[];
  notes?: string | null;
  active: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface MedicineIntake {
  reminder_id: string;
  medicine_name: string;
  status: "taken" | "skipped";
  notes?: string | null;
}

const fetchReminders = async () => {
  const { data, error } = await supabase
    .from("medicine_reminders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Reminder[];
};

export default function RemindersPage() {
  const queryClient = useQueryClient();
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["reminders"],
    queryFn: fetchReminders,
  });

  const recordIntakeMutation = useMutation({
    mutationFn: async (intakeData: MedicineIntake) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from("medicine_intake_records")
        .insert([
          {
            ...intakeData,
            user_id: user.user.id,
            taken_at: new Date().toISOString(),
          },
        ]);
        
      if (error) throw error;
      return intakeData;
    },
    onSuccess: () => {
      toast.success("Medicine intake recorded");
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (error) => {
      toast.error(`Failed to record: ${error.message}`);
    },
  });

  const handleMedicineTaken = (reminder: Reminder) => {
    setSelectedReminder(reminder.id);
    recordIntakeMutation.mutate({
      reminder_id: reminder.id,
      medicine_name: reminder.medicine_name,
      status: "taken",
    });
  };

  return (
    <Layout requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-medical-blue">
            Medicine Reminders
          </h1>
          <Button variant="outline" asChild>
            <Link to="/history">View History</Link>
          </Button>
        </div>

        <ReminderForm />

        <section className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Reminders</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{(error as Error).message}</p>
          ) : data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((reminder) => (
                <div key={reminder.id} className="flex items-center gap-4">
                  <Button 
                    variant={selectedReminder === reminder.id ? "default" : "outline"}
                    size="icon" 
                    className="h-8 w-8 rounded-full shrink-0"
                    onClick={() => handleMedicineTaken(reminder)}
                    disabled={recordIntakeMutation.isPending && selectedReminder === reminder.id}
                  >
                    {selectedReminder === reminder.id && recordIntakeMutation.isPending ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Check className={`h-4 w-4 ${selectedReminder === reminder.id ? "text-white" : "text-gray-400"}`} />
                    )}
                  </Button>
                  <div className="flex-1">
                    <ReminderCard reminder={reminder} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have no reminders yet.</p>
          )}
        </section>
      </div>
    </Layout>
  );
}
