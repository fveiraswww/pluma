"use client";

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {Loader} from "lucide-react";
// biome-ignore lint/style/useImportType: <explanation>
import {z} from "zod";
import {toast} from "sonner";

import {SignUpSchema} from "./signup.zod";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createClient} from "@/lib/supabase/client";

export default function SignUpForm() {
  // eslint-disable-next-line react/hook-use-state
  const [issubmited, setIsSubmited] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const signUpByEmail = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmited(true);

    try {
      const {error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error?.status === 400) {
        toast.error("Email en uso", {
          description: "Intenta con otro email",
        });
      }

      if (error) throw new Error(error.message);

      router.push("/auth/callback");
    } catch (error) {
      setIsSubmited(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col" onSubmit={form.handleSubmit(signUpByEmail)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input {...field} name="email" placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Confirm password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-2 !h-10 px-8" name="submit" type="submit">
          <span className="inline-flex w-full items-center justify-center space-x-1.5">
            {issubmited ? (
              <Loader className="h-4 w-4 animate-spin" strokeWidth="1px" />
            ) : (
              <span>Sign Up</span>
            )}
          </span>
        </Button>
      </form>
    </Form>
  );
}
