import Link from "next/link";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function Connections() {
  return (
    <div className="flex h-screen w-full flex-col justify-between gap-8 overflow-y-scroll px-20 py-8 md:flex-row">
      <Dialog>
        <div className="flex h-fit w-full flex-row items-center justify-between">
          <h1 className="text-2xl">Conexiones</h1>

          <DialogTrigger>
            <Button className="!h-7">Agregar nuevo</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar grupo de Telegram</DialogTitle>
            <DialogDescription className="!mt-6">
              <div className="flex flex-col gap-2">
                <Label>Enlace de grupo</Label>
                <Input
                  placeholder="https://t.me/+abcd1234efgh
                "
                />
                <Button className="mt-4">Conectar grupo</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
