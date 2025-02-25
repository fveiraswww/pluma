"use client";

import type {StreamersData} from "../agency-screen";

import {useState} from "react";
import {Gamepad2, Users, TrendingUp, BarChart2, Send} from "lucide-react";
import {useTheme} from "next-themes";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";

import {CreateRequest} from "./create-request";

import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {categories} from "@/lib/utils";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";

const categoryImages = {
  IRL: "https://files.kick.com/images/subcategories/8549/banner/responsives/3b142fca-b643-48d9-8ed0-405d454181d1___banner_199_266.webp",
  Slots:
    "https://files.kick.com/images/subcategories/28/banner/responsives/ca01a05f-f807-4fbf-8794-3d547b1bb7a6___banner_245_327.webp",
  Gaming:
    "https://files.kick.com/images/subcategories/5/banner/responsives/lol___banner_205_273.webp",
  "Just Chatting":
    "https://files.kick.com/images/subcategories/15/banner/responsives/b697a8a3-62db-4779-aa76-e4e47662af97___banner_294_392.webp",
  Music:
    "https://files.kick.com/images/subcategories/246/banner/responsives/aed1856e-a4c2-4d66-9e6d-439db331d922___banner_245_327.webp",
  Art: "https://files.kick.com/images/subcategories/32/banner/responsives/a5ba9fcd-fb9e-41a2-a742-10c6ed81959c___banner_294_392.webp",
} as const;

export default function ExplorePage({
  streamers,
  isPublic,
}: {
  streamers: StreamersData[];
  isPublic?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedStreamer, setSelectedStreamer] = useState<StreamersData | null>(null);
  const route = useRouter();

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const filteredStreamers = selectedCategory
    ? streamers.filter((s) => {
        const category = categories.find((cat) =>
          s.category.find((category) => cat.id === Number(category)),
        );

        return category?.label === selectedCategory;
      })
    : streamers;

  const paginatedStreamers = filteredStreamers.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedStreamers.length < filteredStreamers.length;

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Top Live Categories</h2>
          <button
            className="text-sm text-muted-foreground hover:text-primary"
            type="button"
            onClick={() => setSelectedCategory(null)}
          >
            View all
          </button>
        </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
          <div className="flex w-full gap-4 pb-4">
            {categories.map((category, index) => (
              <Card
                key={category.id}
                className={`group relative aspect-[4/5] w-[200px] cursor-pointer overflow-hidden border-0 ${
                  selectedCategory === category.label ? "ring-2 ring-primary" : ""
                }`}
                onClick={() =>
                  setSelectedCategory(selectedCategory === category.label ? null : category.label)
                }
              >
                <div className="absolute inset-0">
                  <img
                    alt={category.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={
                      categoryImages[category.label as keyof typeof categoryImages] ||
                      "/placeholder.svg"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-xl font-bold text-white backdrop-blur-sm">
                  {index + 1}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-lg font-semibold text-white">{category.label}</h3>
                </div>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Trending Section */}
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-semibold">Trending</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {paginatedStreamers.map((streamer) => (
            <Dialog key={streamer.user_details.username} open={open} onOpenChange={setOpen}>
              <Card className="group relative overflow-hidden border-border bg-card transition-all hover:scale-[1.02] hover:border-primary/50">
                <div className="relative aspect-video w-full">
                  <img
                    alt={`${streamer.user_details.username}'s stream preview`}
                    className="absolute inset-0 h-full w-full object-cover brightness-90 transition-all group-hover:brightness-100"
                    src={streamer.favicon || "/placeholder.svg"}
                  />
                  <div className="absolute top-2 flex w-full flex-row items-center justify-between px-4">
                    <Image
                      alt="Favicon"
                      height={24}
                      objectFit="cover"
                      src={
                        streamer.platform !== "kick"
                          ? `https://${streamer.platform}.com/favicon.ico`
                          : "/kick.ico"
                      }
                      width={24}
                    />
                    <DialogTrigger>
                      <motion.div
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-3 py-1.5 shadow-lg transition-colors duration-300 ease-in-out hover:bg-violet-600"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => {
                          if (isPublic) {
                            route.push("/signIn");
                          } else {
                            setSelectedStreamer(streamer);
                          }
                        }}
                      >
                        <p className="text-sm font-medium text-white">Send Request</p>
                        <Send className="text-white" height={14} width={14} />
                      </motion.div>
                    </DialogTrigger>
                    {selectedStreamer ? (
                      <CreateRequest setOpen={setOpen} streamer={selectedStreamer} />
                    ) : null}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex-1">
                        <h3 className="line-clamp-1 font-medium text-white">
                          {streamer.user_details.username}
                        </h3>
                        {/* <p className="line-clamp-1 text-sm text-gray-200">
                          {streamer.title || "Streaming now"}
                        </p> */}
                      </div>
                      <Link
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:text-white"
                        href={`https://streamscharts.com/channels/${streamer.platform_username}?platform=${streamer.platform}`}
                        target="_blank"
                      >
                        <BarChart2 className="h-4 w-4 text-white" />
                      </Link>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {categories.map((cat) => {
                        if (streamer.category.includes(cat.id)) {
                          return (
                            <Badge
                              key={cat.id}
                              className="bg-white/10 text-white backdrop-blur-sm"
                              variant="secondary"
                            >
                              {cat.label}
                            </Badge>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </Dialog>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore ? (
          <div className="mt-8 text-center">
            <Button
              className="min-w-[200px]"
              size="lg"
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
            >
              Load More
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
