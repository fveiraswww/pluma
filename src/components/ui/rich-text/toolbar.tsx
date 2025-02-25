"use client";

import React from "react";
import {type Editor} from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/utils";

type Props = {
  editor: Editor | null;
  content: string;
};

function Toolbar({editor, content}: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md rounded-tr-md border bg-white/60 dark:border-grey-border dark:bg-grey-border">
      <div className="flex w-full flex-wrap items-center justify-between gap-5 lg:w-10/12">
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            aria-label="Toggle bold"
            className={cn(
              editor.isActive("bold") && "rounded-lg bg-grey-lab dark:bg-grey-black/60",
            )}
            value="bold"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle italic"
            className={
              editor.isActive("italic") ? "rounded-lg bg-grey-lab dark:bg-grey-black/60" : ""
            }
            value="italic"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle underline"
            className={
              editor.isActive("underline") ? "rounded-lg bg-grey-lab dark:bg-grey-black/60" : ""
            }
            value="underline"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle strikethrough"
            className={
              editor.isActive("strike") ? "rounded-lg bg-grey-lab dark:bg-grey-black/60" : ""
            }
            value="strikethrough"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
          >
            <Strikethrough className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle heading"
            className={
              editor.isActive("heading", {level: 2})
                ? "rounded-lg bg-grey-lab dark:bg-grey-black/60"
                : ""
            }
            value="heading"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({level: 2}).run();
            }}
          >
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle bullet list"
            className={cn(
              editor.isActive("bulletList") && "rounded-lg bg-grey-lab dark:bg-grey-black/60",
            )}
            value="bulletList"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
          >
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle ordered list"
            className={cn(
              editor.isActive("orderedList") && "rounded-lg bg-grey-lab dark:bg-grey-black/60",
            )}
            value="orderedList"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
          >
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle blockquote"
            className={cn(
              editor.isActive("blockquote") && "rounded-lg bg-grey-lab dark:bg-grey-black/60",
            )}
            value="blockquote"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
          >
            <Quote className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Toggle code"
            className={cn(
              editor.isActive("code") && "rounded-lg bg-grey-lab dark:bg-grey-black/60",
            )}
            value="code"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setCode().run();
            }}
          >
            <Code className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export default Toolbar;
