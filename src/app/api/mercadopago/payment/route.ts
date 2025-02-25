import crypto from "crypto";

import {NextRequest, NextResponse} from "next/server";
import MercadoPagoConfig, {Payment} from "mercadopago";
import {Resend} from "resend";

import {supabaseServer} from "@/lib/supabase/server";
import {plumaError} from "@/app/lib/api/errors";

export async function POST(request: NextRequest) {
  const body: {data: {id: string}} = await request.json();
  const isLocal = process.env.URL?.includes("localhost");

  const dataID = body?.data?.id;

  console.log("data id", dataID);
  console.log("body", body);

  if (!dataID) {
    plumaError("bad_request", "Payment ID is required");
  }

  if (!isLocal) {
    const xSignature = request.headers.get("x-signature");
    const xRequestId = request.headers.get("x-request-id");

    const parts = xSignature?.split(",");

    let ts;
    let hash;

    parts?.forEach((part) => {
      // Split each part into key and value
      const [key, value] = part.split("=");

      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();

        if (trimmedKey === "ts") {
          ts = trimmedValue;
        } else if (trimmedKey === "v1") {
          hash = trimmedValue;
        }
      }
    });

    const secret = process.env.MP_SECRET_KEY_NOTIFICATIONS!;

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac("sha256", secret);

    hmac.update(manifest);

    const sha = hmac.digest("hex");

    if (sha === hash) {
      console.log("HMAC verification passed");
    } else {
      return plumaError("unauthorized", "HMAC verification failed");
    }
  }

  const supabase = await supabaseServer(true);

  const mercadopago = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

  const payment = await new Payment(mercadopago).get({id: body.data.id});

  if (!payment?.metadata?.request_id) return plumaError("bad_request");

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (payment?.status === "approved") {
    const {data, error} = await supabase
      .from("request")
      .update({payment_status: "completed", payment_id: payment?.id})
      .eq("id", payment.metadata.request_id)
      .select("email, form_id, owner_email")
      .single();

    if (error) return plumaError("internal_server_error", JSON.stringify(error));

    const {error: emailErr} = await resend.emails.send({
      from: "SkaleBox <team@skalebox.com>",
      to: [data?.email],
      subject: "Seguí el estado de tu Box! SkaleBox.com",
      html: generateUserEmail(
        `${process.env.URL}/request/${payment.metadata.username}/${payment.id}`,
      ),
    });

    if (emailErr) console.log("email error", JSON.stringify(emailErr));

    if (data?.owner_email) {
      const {error: emailOwnerErr} = await resend.emails.send({
        from: "SkaleBox <team@skalebox.com>",
        to: [data?.owner_email],
        subject: "Nueva solicitud de Box! SkaleBox.com",
        html: generateUserEmail(`${process.env.URL}`),
      });

      if (emailOwnerErr) console.log("email error", JSON.stringify(emailOwnerErr));
    }
  } else if (payment?.status === "rejected") {
    const {error} = await supabase
      .from("request")
      .update({payment_status: "failed", payment_id: payment?.id ?? ""})
      .eq("id", payment.metadata.request_id);

    if (error) return plumaError("internal_server_error", JSON.stringify(error));
  } else if (payment?.status === "refunded") {
    const {error} = await supabase
      .from("request")
      .update({payment_status: "refunded", payment_id: payment?.id ?? ""})
      .eq("id", payment.metadata.request_id);

    if (error) return plumaError("internal_server_error", JSON.stringify(error));
  }

  return NextResponse.json({success: true}, {status: 200});
}

function generateUserEmail(route: string) {
  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Estado de tu Box</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; margin:0 auto; background:#ffffff;">
        <!-- Encabezado -->
        <tr>
          <td style="padding: 20px; text-align: center;">
            <img src="https://res.cloudinary.com/djwfoerxf/image/upload/v1734965843/SkaleBox-svg-svg_hqdjg2.png" alt="SkaleBox Logo" style="max-width: 120px; height: auto;" />
          </td>
        </tr>
        
        <!-- Contenido principal -->
        <tr>
          <td style="padding: 20px;">
            <h2 style="color: #333333; margin-top: 0;">¡Hola!</h2>
            <p style="color: #555555; font-size: 15px; line-height: 1.5;">
              Gracias por elegir <strong>SkaleBox</strong>. Podrás consultar el estado de tu Box en el siguiente enlace:
            </p>
            <p style="text-align: center; margin: 20px 0;">
              <a 
                href="${route}"
                style="background-color: #0F172A; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 4px; cursor: pointer;"
              >
                Ver estado de mi Box
              </a>
            </p>
            <p style="color: #555555; font-size: 15px; line-height: 1.5;">
              Si necesitas asistencia adicional o tienes alguna duda, no dudes en contactarnos:
            </p>
            <p style="text-align: center;">
              <a href="mailto:hello@skalebox.com" style="color: #0F172A; text-decoration: none;">
                hello@skalebox.com
              </a>
            </p>
            <p style="color: #555555; font-size: 15px; line-height: 1.5;">
              ¡Gracias por confiar en SkaleBox!<br />
              <em>El equipo de SkaleBox</em>
            </p>
          </td>
        </tr>
        
        <!-- Pie de página -->
        <tr>
          <td style="padding: 15px; background-color: #f0f0f0; text-align: center;">
            <small style="color: #888888;">
              © 2025 SkaleBox. Todos los derechos reservados.
            </small>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
}
