
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { User } from "@supabase/supabase-js";

interface ProfileFormValues {
  email: string;
  full_name: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      email: "",
      full_name: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          form.reset({
            email: user.email || "",
            full_name: user.user_metadata?.full_name || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load profile information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        email: values.email,
        data: { full_name: values.full_name }
      });

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout requireAuth>
      <div className="container py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>View and update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center p-4">Loading profile...</div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormDescription>
                          Your email address cannot be changed
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your full name" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground">
              Account created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
            </div>
            <div className="text-sm text-muted-foreground">
              Last sign in: {user?.last_sign_in_at ? new Date(user?.last_sign_in_at).toLocaleDateString() : "Unknown"}
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
