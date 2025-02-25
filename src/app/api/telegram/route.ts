import {NextRequest, NextResponse} from "next/server";
import {Telegraf} from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await bot.handleUpdate(body);

    return NextResponse.json({message: "Evento procesado correctamente"});
  } catch (error) {
    console.error("Error en webhook:", error);

    return NextResponse.json({message: "Error procesando el evento"}, {status: 500});
  }
}

export async function GET(_req: NextRequest) {
  return NextResponse.json({message: "Webhook activo"});
}
