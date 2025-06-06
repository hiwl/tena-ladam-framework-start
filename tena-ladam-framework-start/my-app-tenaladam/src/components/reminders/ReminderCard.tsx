
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Bell } from "lucide-react";
import { format } from "date-fns";

interface ReminderProps {
  reminder: {
    id: string;
    medicine_name: string;
    dosage?: string | null;
    frequency: string;
    time_of_day: string[];
    notes?: string | null;
  };
}

const deleteReminder = async (id: string) => {
  const { error } = await supabase.from("medicine_reminders").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

const recordMedicineIntake = async ({ 
  reminderId, 
  medicineName, 
  status 
}: { 
  reminderId: string;
  medicineName: string;
  status: "taken" | "skipped" | "missed";
}) => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) throw new Error("User not authenticated");
  
  const { error } = await supabase.from("medicine_intake_records").insert({
    reminder_id: reminderId,
    medicine_name: medicineName,
    status,
    user_id: userData.user.id,
    taken_at: new Date().toISOString()
  });
  
  if (error) throw new Error(error.message);
  return { success: true };
};

export function ReminderCard({ reminder }: ReminderProps) {
  const [medicineStatus, setMedicineStatus] = useState<"taken" | "not_taken">("not_taken");
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: deleteReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      toast.success("Reminder deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const intakeMutation = useMutation({
    mutationFn: recordMedicineIntake,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intake-records"] });
      toast.success("Medicine intake recorded");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setMedicineStatus("taken");
      intakeMutation.mutate({
        reminderId: reminder.id,
        medicineName: reminder.medicine_name,
        status: "taken"
      });
    } else {
      setMedicineStatus("not_taken");
    }
  };

  // Check if any time is due within the next hour
  const isDueSoon = () => {
    if (!reminder.time_of_day || reminder.time_of_day.length === 0) return false;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    return reminder.time_of_day.some(timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const reminderTimeInMinutes = hours * 60 + minutes;
      
      // Check if it's within the next hour
      const timeDifference = reminderTimeInMinutes - currentTimeInMinutes;
      return timeDifference >= 0 && timeDifference <= 60;
    });
  };

  const nextDoseTime = () => {
    if (!reminder.time_of_day || reminder.time_of_day.length === 0) return null;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    // Find the next dose time
    let closestTime = null;
    let smallestDifference = Infinity;
    
    for (const timeStr of reminder.time_of_day) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const reminderTimeInMinutes = hours * 60 + minutes;
      
      // Calculate the difference, considering wrap-around to next day
      let diff = reminderTimeInMinutes - currentTimeInMinutes;
      if (diff < 0) diff += 24 * 60; // Add a day's worth of minutes
      
      if (diff < smallestDifference) {
        smallestDifference = diff;
        closestTime = timeStr;
      }
    }
    
    return closestTime;
  };

  const dueSoon = isDueSoon();
  const nextTime = nextDoseTime();

  return (
    <div className={`border rounded-lg shadow p-4 ${dueSoon ? 'bg-purple-50 border-purple-200' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox 
            id={`medicine-taken-${reminder.id}`} 
            onCheckedChange={handleCheckboxChange}
          />
          <div>
            <h3 className="font-semibold text-lg">{reminder.medicine_name}</h3>
            {reminder.dosage && (
              <p className="text-sm text-gray-500">Dosage: {reminder.dosage}</p>
            )}
          </div>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteMutation.mutate(reminder.id)}
        >
          Delete
        </Button>
      </div>
      
      <div className="text-sm text-gray-600 mt-3">
        <div className="flex items-center gap-1 mt-1">
          <Calendar className="h-4 w-4" />
          <p>Times: {reminder.time_of_day.map(time => format(new Date(`2000-01-01T${time}`), 'h:mm a')).join(", ")}</p>
        </div>
        
        {nextTime && (
          <div className={`flex items-center gap-1 mt-2 ${dueSoon ? 'text-purple-700 font-medium' : ''}`}>
            <Bell className={`h-4 w-4 ${dueSoon ? 'text-purple-700' : ''}`} />
            <p>Next dose: {format(new Date(`2000-01-01T${nextTime}`), 'h:mm a')}</p>
            {dueSoon && <span className="ml-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">Due soon</span>}
          </div>
        )}
        
        {reminder.notes && <p className="mt-2">Notes: {reminder.notes}</p>}
      </div>
    </div>
  );
};
