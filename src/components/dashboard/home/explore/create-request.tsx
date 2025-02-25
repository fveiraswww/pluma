import React, {Dispatch, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import Image from "next/image";
import {Coins} from "lucide-react";
import {toast} from "sonner";

import {useUser} from "../../provider";
import {StreamersData} from "../agency-screen";

import {DialogContent} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FormAdSchema} from "@/app/lib/zod/request-form.zod";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Markdown} from "@/components/ui/markdown";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ImageForm} from "@/components/request/image-form";
import {Input} from "@/components/ui/input";
import {RichText} from "@/components/ui/rich-text/rich-text";
import {Label} from "@/components/ui/label";
import useSession from "@/lib/hooks/use-session";

export function CreateRequest({
  streamer,
  setOpen,
}: {
  streamer: StreamersData;
  setOpen: Dispatch<boolean>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user, user_details} = useUser();
  const {session} = useSession();

  const {
    setValue: setValue,
    watch,
    formState: {errors},
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<z.infer<typeof FormAdSchema>>({
    resolver: zodResolver(FormAdSchema),
    defaultValues: {
      image: null,
      email: user?.email,
      username: user_details?.username,
      duration: 10,
      budget: 0,
    },
  });
  const timeOptions = [10, 20, 30, 40, 50, 60];
  const selectedDuration = watch("duration");

  const onSubmit = async (data: z.infer<typeof FormAdSchema>) => {
    const formData = new FormData();

    formData.append("image", data?.image ?? "");
    formData.append("duration", data?.duration.toString() ?? "10");
    formData.append("budget", data?.budget.toString());
    formData.append("title", data?.title ?? "");
    formData.append("email", data?.email ?? "");
    formData.append("description", data?.description ?? "");

    try {
      setIsLoading(true);
      const response = fetch(`/api/form/new-request?id=${streamer?.user_id}`, {
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
        .finally(() => setIsLoading(false));

      toast.promise(response, {
        loading: "Loading...",
        success: (result) => {
          reset();
          setOpen(false);

          return "Request sent successfully";
        },
        error: (error) => {
          return error.message;
        },
      });
    } catch (error) {
      console.log("Errror to send request", JSON.stringify(error));
    }
  };

  const imageUrl = watch("image")?.name ? URL?.createObjectURL(watch("image") as File) : null;

  return (
    <DialogContent className="flex !max-w-[90%] flex-col gap-4 md:!max-w-[60%] lg:!max-w-[60%] 2xl:!max-w-[40%]">
      <p className="text-sm font-bold">@{streamer.user_details.username}</p>
      <AspectRatio
        className="flex items-center justify-center overflow-hidden rounded-lg bg-sidebar"
        ratio={16 / 4}
      >
        {imageUrl ? (
          <Image
            fill
            alt={watch("image")?.name ?? ""}
            src={imageUrl}
            style={{
              objectFit: "cover",
            }}
          />
        ) : null}
        {!imageUrl && <p>Your ad (16:4)</p>}
      </AspectRatio>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Tabs className="w-full" defaultValue="image">
          <TabsList>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="text">Ad description</TabsTrigger>
          </TabsList>
          <TabsContent className="[&>*:first-child]:p-0" value="image">
            <ImageForm keyValue="image" setValue={setValue} watch={watch} />
          </TabsContent>
          <TabsContent className="flex flex-col gap-2" value="text">
            <Input {...register("title")} placeholder="Ad title" />
            <RichText
              defaultValue={watch("description") ?? ""}
              keyValue="description"
              setValue={setValue}
            />
          </TabsContent>
        </Tabs>
        <Label>
          We&apos;ll notify you of the status of the request by this email (Change it if is
          necessary)
        </Label>
        <Input {...register("email")} placeholder="Your email (e.g. example@gmail.com)" />

        <Label className="mt-2">Select budget (usd)</Label>
        <Input
          {...register("budget", {
            valueAsNumber: true,
          })}
          placeholder="100 (e.g.)"
          type="number"
        />
        <Label className="mt-2">Select duration (minutes)</Label>
        <div>
          <div className="grid grid-cols-3 gap-2">
            <Controller
              control={control}
              name="duration"
              render={({field}) => (
                <>
                  {timeOptions.map((time) => (
                    <Button
                      key={time}
                      className={`${
                        selectedDuration === time
                          ? "bg-brand"
                          : "border bg-gray-100 transition-all dark:border-zinc-700 dark:bg-zinc-800"
                      }`}
                      type="button"
                      variant={selectedDuration === time ? "default" : "outline"}
                      onClick={() => field.onChange(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </>
              )}
            />
          </div>
        </div>
        <Button
          className="mt-8"
          disabled={isLoading || (user_details ? user_details?.credits < watch("budget") : true)}
          type="submit"
        >
          Offer - {isNaN(watch("budget")) ? 0 : watch("budget")} credits <Coins className="ml-2" />
        </Button>
        {["description", "title", "image", "email", "duration", "budget"].map((val, index) => {
          if (errors?.[val as "description" | "title" | "image"]) {
            return (
              <p key={index} className="text-red-400">
                {errors[val as "description" | "title" | "image"]?.message} (*)
              </p>
            );
          }

          return null;
        })}
        <p className="mb-8 mt-2 text-center">
          {user_details && user_details?.credits < watch("budget") ? (
            <p>Insufficient credits for this operation</p>
          ) : null}
          {user_details?.credits} <Coins className="inline-block" /> (current budget in account)
        </p>
      </form>
    </DialogContent>
  );
}
