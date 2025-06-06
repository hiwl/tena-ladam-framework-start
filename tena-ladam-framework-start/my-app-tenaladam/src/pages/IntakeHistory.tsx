
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { CalendarDays, History } from "lucide-react";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IntakeRecord {
  id: string;
  medicine_name: string;
  taken_at: string;
  status: "taken" | "missed" | "skipped";
  notes?: string | null;
}

const fetchIntakeHistory = async () => {
  const { data, error } = await supabase
    .from("medicine_intake_records")
    .select("*")
    .order("taken_at", { ascending: false });

  if (error) throw error;
  return data as IntakeRecord[];
};

const statusColors = {
  taken: "text-green-600 bg-green-50",
  missed: "text-red-600 bg-red-50",
  skipped: "text-yellow-600 bg-yellow-50",
};

const prepareChartData = (records: IntakeRecord[]) => {
  const stats = records.reduce((acc, record) => {
    const date = format(new Date(record.taken_at), "MMM d");
    if (!acc[date]) {
      acc[date] = { date, taken: 0, missed: 0, skipped: 0 };
    }
    acc[date][record.status]++;
    return acc;
  }, {} as Record<string, { date: string; taken: number; missed: number; skipped: number }>);

  return Object.values(stats).slice(-7); // Last 7 days
};

export default function IntakeHistory() {
  const { data: records, isLoading } = useQuery({
    queryKey: ["intake-records"],
    queryFn: fetchIntakeHistory,
  });

  const chartData = records ? prepareChartData(records) : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <History className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Medicine Intake History</h1>
        </div>

        {/* Statistics Section */}
        {!isLoading && records && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7-Day Overview</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="taken" fill="#22c55e" name="Taken" />
                  <Bar dataKey="missed" fill="#ef4444" name="Missed" />
                  <Bar dataKey="skipped" fill="#eab308" name="Skipped" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Records List */}
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading history...</p>
          ) : records && records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className="border rounded-lg bg-white shadow p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{record.medicine_name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm capitalize ${
                      statusColors[record.status]
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {format(new Date(record.taken_at), "PPp")}
                </p>
                {record.notes && (
                  <p className="text-sm text-gray-600 mt-2">{record.notes}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No intake records found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
