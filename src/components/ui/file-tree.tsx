/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-compiler/react-compiler */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// biome-ignore lint/style/useImportType: <explanation>
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {FileIcon, FolderIcon, FolderOpenIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";

type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

type TreeContextProps = {
  selectedId: string | undefined;
  expandedItems: string[] | undefined;
  indicator: boolean;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  direction: "rtl" | "ltr";
};

const TreeContext = createContext<TreeContextProps | null>(null);

const useTree = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error("useTree must be used within a TreeProvider");
  }

  return context;
};

interface TreeViewComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

type Direction = "rtl" | "ltr" | undefined;

type TreeViewProps = {
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
} & TreeViewComponentProps;

const Tree = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      dir,
      ...props
    },
    ref,
  ) => {
    const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);
    const [expandedItems, setExpandedItems] = useState<string[] | undefined>(initialExpandedItems);

    const selectItem = useCallback((id: string) => {
      setSelectedId(id);
    }, []);

    const handleExpand = useCallback((id: string) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) {
          return prev.filter((item) => item !== id);
        }

        return [...(prev ?? []), id];
      });
    }, []);

    const expandSpecificTargetedElements = useCallback(
      (elements?: TreeViewElement[], selectId?: string) => {
        if (!elements || !selectId) return;
        const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
          const isSelectable = currentElement.isSelectable ?? true;
          const newPath = [...currentPath, currentElement.id];

          if (currentElement.id === selectId) {
            if (isSelectable) {
              setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
            } else {
              if (newPath.includes(currentElement.id)) {
                newPath.pop();
                setExpandedItems((prev) => [...(prev ?? []), ...newPath]);
              }
            }

            return;
          }
          if (isSelectable && currentElement.children && currentElement.children.length > 0) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            currentElement.children.forEach((child) => {
              findParent(child, newPath);
            });
          }
        };

        // biome-ignore lint/complexity/noForEach: <explanation>
        elements.forEach((element) => {
          findParent(element);
        });
      },
      [],
    );

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements]);

    const direction = dir === "rtl" ? "rtl" : "ltr";

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn("size-full", className)}>
          <ScrollArea ref={ref} className="relative h-full" dir={dir as Direction}>
            <AccordionPrimitive.Root
              {...props}
              className="flex flex-col gap-2"
              defaultValue={expandedItems}
              dir={dir as Direction}
              type="multiple"
              value={expandedItems}
              onValueChange={(value) => setExpandedItems((prev) => [...(prev ?? []), value[0]])}
            >
              {children}
            </AccordionPrimitive.Root>
          </ScrollArea>
        </div>
      </TreeContext.Provider>
    );
  },
);

Tree.displayName = "Tree";

const TreeIndicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    const {direction} = useTree();

    return (
      <div
        ref={ref}
        className={cn(
          "absolute left-1.5 h-full w-px rounded-md bg-muted py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5",
          className,
        )}
        dir={direction}
        {...props}
      />
    );
  },
);

TreeIndicator.displayName = "TreeIndicator";

interface FolderComponentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

type FolderProps = {
  expandedItems?: string[];
  element: string;
  isSelectable?: boolean;
  isSelect?: boolean;
} & FolderComponentProps;

const Folder = forwardRef<HTMLDivElement, FolderProps & React.HTMLAttributes<HTMLDivElement>>(
  ({className, element, value, isSelectable = true, isSelect, children, ...props}, ref) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      setExpandedItems,
      openIcon,
      closeIcon,
    } = useTree();

    return (
      <AccordionPrimitive.Item {...props} className="relative h-full overflow-hidden" value={value}>
        <AccordionPrimitive.Trigger
          className={cn("flex items-center gap-2 rounded-md text-lg", className, {
            "rounded-md bg-muted": isSelect && isSelectable,
            "cursor-pointer": isSelectable,
            "cursor-not-allowed opacity-50": !isSelectable,
          })}
          disabled={!isSelectable}
          onClick={() => handleExpand(value)}
        >
          {expandedItems?.includes(value)
            ? (openIcon ?? <FolderOpenIcon height={20} width={20} />)
            : (closeIcon ?? <FolderIcon height={20} width={20} />)}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="text-md relative h-full overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {element && indicator ? <TreeIndicator aria-hidden="true" /> : null}
          <AccordionPrimitive.Root
            className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5"
            defaultValue={expandedItems}
            dir={direction}
            type="multiple"
            value={expandedItems}
            onValueChange={(value) => {
              setExpandedItems?.((prev) => [...(prev ?? []), value[0]]);
            }}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  },
);

Folder.displayName = "Folder";

const File = forwardRef<
  HTMLButtonElement,
  {
    value: string;
    handleSelect?: (id: string) => void;
    isSelectable?: boolean;
    isSelect?: boolean;
    fileIcon?: React.ReactNode;
  } & React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  (
    {value, className, handleSelect, isSelectable = true, isSelect, fileIcon, children, ...props},
    ref,
  ) => {
    const {direction, selectedId, selectItem} = useTree();
    const isSelected = isSelect ?? selectedId === value;

    return (
      <AccordionPrimitive.Item className="relative" value={value}>
        <AccordionPrimitive.Trigger
          ref={ref}
          {...props}
          aria-label="File"
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-md text-lg duration-200 ease-in-out rtl:pl-1 rtl:pr-0",
            {
              "bg-muted": isSelected && isSelectable,
            },
            isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-50",
            className,
          )}
          dir={direction}
          disabled={!isSelectable}
          onClick={() => selectItem(value)}
        >
          {fileIcon ?? <FileIcon className="size-4" />}
          {children}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Item>
    );
  },
);

File.displayName = "File";

const CollapseButton = forwardRef<
  HTMLButtonElement,
  {
    elements: TreeViewElement[];
    expandAll?: boolean;
  } & React.HTMLAttributes<HTMLButtonElement>
>(({className, elements, expandAll = false, children, ...props}, ref) => {
  const {expandedItems, setExpandedItems} = useTree();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const expendAllTree = useCallback((elements: TreeViewElement[]) => {
    const expandTree = (element: TreeViewElement) => {
      const isSelectable = element.isSelectable ?? true;

      if (isSelectable && element.children && element.children.length > 0) {
        setExpandedItems?.((prev) => [...(prev ?? []), element.id]);
        element.children.forEach(expandTree);
      }
    };

    elements.forEach(expandTree);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const closeAll = useCallback(() => {
    setExpandedItems?.([]);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (expandAll) {
      expendAllTree(elements);
    }
  }, [expandAll]);

  return (
    <Button
      ref={ref}
      className="absolute bottom-1 right-2 h-8 w-fit p-1"
      variant="ghost"
      onClick={expandedItems && expandedItems.length > 0 ? closeAll : () => expendAllTree(elements)}
      {...props}
    >
      {children}
      <span className="sr-only">Toggle</span>
    </Button>
  );
});

CollapseButton.displayName = "CollapseButton";

export {CollapseButton, File, Folder, Tree, type TreeViewElement};
