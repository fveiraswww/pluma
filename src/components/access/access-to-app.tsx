"use client";
import React from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Twitch} from "lucide-react";

import {Button} from "../ui/button";
import GoogleIcon from "../../../public/icons/GoogleIcon";
import {Card, CardContent, CardHeader} from "../ui/card";

import SignUpForm from "./sign-up/sign-up";
import SignInForm from "./sign-in/sign-in";

import {createClient} from "@/lib/supabase/client";

interface IProps {
  type_of_mode: "signup" | "signin";
}

export function AccessToApp({type_of_mode}: IProps) {
  const supabase = createClient();
  const router = useRouter();

  const accessWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
      },
    });

    router.refresh();
  };

  return (
    <main className="m-auto flex h-full w-full flex-[1.5] flex-col items-center justify-center px-8">
      <Card className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-white pb-6 pt-8 text-center">
          <h1 className="flex items-center justify-center text-lg font-medium leading-[26px]">
            {type_of_mode === "signup" ? "Get started with Pluma" : "Sign in to your Pluma account"}
          </h1>
        </CardHeader>
        <CardContent className="bg-gray-50 px-4 py-8 sm:px-16">
          {type_of_mode === "signin" ? <SignInForm /> : <SignUpForm />}
          <div className="my-4 flex flex-shrink items-center justify-center gap-4">
            <div className="grow basis-0 border-b border-gray-300" />
            <p className="text-xs font-normal uppercase leading-none text-gray-500">OR</p>
            <div className="grow basis-0 border-b border-gray-300" />
          </div>
          <div className="space-y-2">
            <Button
              className="shadow-border-complete-inner relative w-full rounded-md hover:!bg-grey-hover xl:text-sm"
              type="submit"
              onClick={accessWithGoogle}
            >
              <div className="absolute left-4">
                <GoogleIcon />
              </div>
              Continue with Google
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="my-4 text-center">
        {type_of_mode === "signup" ? (
          <p className="text-dark-muted mt-2 text-sm text-gray-400">
            {"Already have an account? "}
            <Link className="underline transition-colors" href="/signIn">
              Log In
            </Link>
            .
          </p>
        ) : (
          <p className="text-dark-muted mt-2 text-sm text-gray-400">
            {"Don't have an account? "}
            <Link className="underline transition-colors" href="/signUp">
              Create account
            </Link>
            .
          </p>
        )}
      </div>
    </main>
  );
}
