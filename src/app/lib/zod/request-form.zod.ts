import {z} from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const FormAdSchema = z
  .object({
    image: z.union([
      z.literal(null).refine(() => false, "Please select an image to continue."),
      z
        ?.instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    ]),
    title: z.string().optional(),
    description: z.string().optional(),
    email: z.string().email(),
    username: z.string().optional(),
    duration: z.preprocess(
      (value) => (typeof value === "string" ? Number(value) : value), // Si es string, lo convertimos a número
      z.number().refine((value) => [10, 20, 30, 40, 50, 60].includes(value), {
        message: "The duration must be 10, 20, 30, 40, 50, or 60.",
      }),
    ),
    budget: z.preprocess(
      (value) => (typeof value === "string" ? Number(value) : value), // Convertimos string a número
      z.number().positive("Budget must be greater than 0."),
    ),
  })
  .refine((data) => data.image || (data.title && data.description), {
    message: "Debes crear el anuncio con al menos una imagen o título y descripción.",
    path: ["image"],
  });
