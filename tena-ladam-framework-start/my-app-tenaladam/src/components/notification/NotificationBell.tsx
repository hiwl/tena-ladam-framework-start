
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

type Reminder = {
  id: string;
  medicine_name: string;
  time_of_day: string[];
};

type DueReminder = {
  id: string;
  medicine_name: string;
  time: string;
  isOverdue: boolean;
};

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [dueReminders, setDueReminders] = useState<DueReminder[]>([]);

  const { data: reminders } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return [];
      
      const { data, error } = await supabase
        .from('medicine_reminders')
        .select('*')
        .eq('user_id', userData.user.id)
        .eq('active', true);
        
      if (error) throw error;
      return data as Reminder[];
    },
  });

  useEffect(() => {
    if (!reminders) return;
    
    const checkDueReminders = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Convert current time to minutes since midnight for easier comparison
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      
      const due: DueReminder[] = [];
      reminders.forEach(reminder => {
        reminder.time_of_day.forEach(timeStr => {
          const [hours, minutes] = timeStr.split(':').map(Number);
          const reminderTimeInMinutes = hours * 60 + minutes;
          
          // Check if reminder is due (within the last hour)
          const timeDifference = currentTimeInMinutes - reminderTimeInMinutes;
          
          if (timeDifference >= 0 && timeDifference <= 60) {
            due.push({
              id: reminder.id,
              medicine_name: reminder.medicine_name,
              time: timeStr,
              isOverdue: timeDifference > 15 // Consider overdue if more than 15 minutes late
            });
          }
        });
      });
      
      setDueReminders(due);
      setUnreadCount(due.length);
    };
    
    // Check immediately and then every minute
    checkDueReminders();
    const interval = setInterval(checkDueReminders, 60000);
    
    return () => clearInterval(interval);
  }, [reminders]);

  const handleMarkAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-purple-50 p-4 border-b border-gray-200">
          <h3 className="font-medium text-lg text-purple-800">Medication Reminders</h3>
          <p className="text-sm text-gray-500">Take your medicines on time</p>
        </div>
        
        <div className="max-h-[300px] overflow-y-auto p-2">
          {dueReminders.length > 0 ? (
            <div className="space-y-2">
              {dueReminders.map((reminder) => (
                <div 
                  key={`${reminder.id}-${reminder.time}`}
                  className={`p-3 rounded-md ${
                    reminder.isOverdue ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{reminder.medicine_name}</h4>
                      <p className="text-sm text-gray-500">
                        Time: {format(new Date(`2000-01-01T${reminder.time}`), 'h:mm a')}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      reminder.isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {reminder.isOverdue ? 'Overdue' : 'Due now'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              No pending reminders
            </div>
          )}
        </div>
        
        {dueReminders.length > 0 && (
          <div className="p-2 border-t border-gray-200 bg-gray-50">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMarkAsRead}
              className="w-full"
            >
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
