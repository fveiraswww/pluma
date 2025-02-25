"use client";

import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "sonner";
import {Camera, Eye, EyeOff, User} from "lucide-react";
import Image from "next/image";

import {useUser} from "../provider";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {StreamerDetailsSchema} from "@/app/lib/zod/streamer-form.zod";
import MultiSelect from "@/components/ui/multi-select";
import useSession from "@/lib/hooks/use-session";
import {categories} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StreamerForm() {
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const {user_details} = useUser();

  const {session} = useSession();
  const form = useForm<z.infer<typeof StreamerDetailsSchema>>({
    resolver: zodResolver(StreamerDetailsSchema),
    defaultValues: {
      favicon: user_details?.streamer_profile?.favicon ?? "",
      currency: "usd",
      category: user_details?.streamer_profile?.category ?? [],
      socialLink: user_details?.streamer_profile?.socialLink ?? "",
      platform: user_details?.streamer_profile.platform,
      platform_username: user_details?.streamer_profile.platform_username,
      obs_server_password: user_details?.streamer_profile?.obs_server_password ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof StreamerDetailsSchema>) {
    const formData = new FormData();

    if (values.favicon) {
      formData.append("favicon", values.favicon);
    }

    formData.append("currency", values.currency);
    formData.append("platform", values.platform);
    formData.append("platform_username", values.platform_username);
    formData.append("socialLink", values.socialLink);
    values?.obs_server_password &&
      formData.append("obs_server_password", values.obs_server_password);
    formData.append("favicon", values.favicon as File);
    values.category.forEach((category) => formData.append("category", category.toString()));

    try {
      setLoading(true);
      const response = fetch("/api/profile/streamer", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: session?.access_token ?? "",
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const {error} = await response.json();

            throw new Error(error.message || "Unknown error occurred");
          }

          return response.json();
        })
        .finally(() => setLoading(false));

      toast.promise(response, {
        loading: "Loading...",
        success: (result) => {
          return "Profile updated successfully";
        },
        error: (error) => {
          return error.message;
        },
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const faviconUploaded =
    (form.watch("favicon") &&
      typeof form.watch("favicon") !== "string" &&
      URL.createObjectURL(form.watch("favicon") as File)) ||
    undefined;

  return (
    <Form {...form}>
      <form className="h-full w-full space-y-8 md:w-1/2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="favicon"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Avatar</FormLabel>
              <FormControl>
                <div className="group relative h-24 w-24 overflow-hidden rounded-full">
                  {user_details?.streamer_profile?.favicon || faviconUploaded ? (
                    <Image
                      alt="Favicon preview"
                      className="transition-opacity duration-300 ease-in-out group-hover:opacity-50"
                      layout="fill"
                      objectFit="cover"
                      src={faviconUploaded ?? user_details?.streamer_profile?.favicon ?? ""}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                      <User className="h-12 w-12" />
                    </div>
                  )}
                  <div
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <Input
                    ref={fileInputRef}
                    accept="image/*"
                    aria-label="Subir favicon"
                    className="hidden"
                    type="file"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>Upload a favicon for your profile (max. 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Currency</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialLink"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Social link</FormLabel>
              <FormControl>
                <Input
                  defaultValue={user_details?.streamer_profile?.socialLink ?? 0}
                  placeholder="https://"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your social link (must start with https://)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Categories</FormLabel>
              <FormControl>
                <MultiSelect options={categories} value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Select the categories that best describe your content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="platform"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Platform</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Platforms</SelectLabel>
                      <SelectItem value="kick">Kick</SelectItem>
                      <SelectItem value="twitch">Twitch</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="platform_username"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">Platform Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="obs_server_password"
          render={({field}) => (
            <FormItem className="rounded-lg border p-6">
              <FormLabel className="text-xl">OBS Server Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    defaultValue={user_details?.streamer_profile?.socialLink ?? ""}
                    placeholder="Password"
                    type={showInput ? "text" : "password"}
                    {...field}
                    className="pr-10"
                  />
                  <Button
                    aria-label={showInput ? "Hide input" : "Show input"}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    size="sm"
                    type="button"
                    variant="ghost"
                    onClick={() => setShowInput(!showInput)}
                  >
                    {showInput ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                <p>{`1. Tools > WebSocket Server Settings > Enable WebSocket Server`}</p>
                <p>{`2. Show Connect Info > Copy server password`}</p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} type="submit">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
