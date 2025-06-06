
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReminderFormData {
  medicine_name: string;
  dosage?: string;
  frequency: string;
  time_of_day: string[];
  notes?: string;
}

const defaultTimes = {
  once_daily: ["08:00"],
  twice_daily: ["08:00", "20:00"],
  three_times_daily: ["08:00", "14:00", "20:00"],
};

const frequencies = [
  { label: "Once daily", value: "once_daily" },
  { label: "Twice daily", value: "twice_daily" },
  { label: "Three times daily", value: "three_times_daily" },
  { label: "Custom", value: "custom" },
];

const addReminder = async (reminder: ReminderFormData) => {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("You must be logged in to create reminders.");
  
  const { data, error } = await supabase
    .from("medicine_reminders")
    .insert([
      {
        ...reminder,
        user_id: user.data.user.id,
        active: true,
      },
    ])
    .select()
    .maybeSingle();
    
  if (error) throw new Error(error.message);
  return data;
};

export function ReminderForm() {
  const queryClient = useQueryClient();
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("once_daily");
  const [customTimes, setCustomTimes] = useState([""]);
  const [notes, setNotes] = useState("");

  const mutation = useMutation({
    mutationFn: addReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
      toast.success("Reminder added successfully");
      // Reset form
      setMedicineName("");
      setDosage("");
      setNotes("");
      setCustomTimes([""]);
      setFrequency("once_daily");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getTimeFields = () => {
    if (frequency === "custom") {
      return customTimes.filter(Boolean);
    }
    return defaultTimes[frequency as keyof typeof defaultTimes];
  };

  const handleCustomTimeChange = (i: number, value: string) => {
    setCustomTimes((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      medicine_name: medicineName,
      dosage,
      frequency,
      time_of_day: getTimeFields(),
      notes,
    });
  };

  return (
    <form className="bg-white border rounded-lg shadow-sm p-6 mb-10 max-w-xl mx-auto space-y-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="medicineName">Medicine Name</Label>
        <Input
          id="medicineName"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
          placeholder="e.g. Paracetamol"
        />
      </div>

      <div>
        <Label htmlFor="dosage">Dosage</Label>
        <Input
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="e.g. 500mg"
        />
      </div>

      <div>
        <Label>Frequency</Label>
        <RadioGroup
          value={frequency}
          onValueChange={setFrequency}
          className="flex items-center gap-4 flex-wrap"
        >
          {frequencies.map((f) => (
            <div key={f.value} className="flex items-center space-x-2">
              <RadioGroupItem value={f.value} id={`freq-${f.value}`} />
              <Label htmlFor={`freq-${f.value}`}>{f.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label>Time of Day</Label>
        {frequency === "custom" ? (
          <div className="flex flex-col gap-2">
            {customTimes.map((time, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => handleCustomTimeChange(i, e.target.value)}
                  required
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setCustomTimes(prev => prev.filter((_, idx) => idx !== i));
                  }}
                  variant="outline"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setCustomTimes(prev => [...prev, ""])}
            >
              Add Time
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {defaultTimes[frequency as keyof typeof defaultTimes].map((t, i) => (
              <Input key={i} type="time" value={t} readOnly />
            ))}
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes"
        />
      </div>

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Reminder"}
      </Button>
    </form>
  );
}
