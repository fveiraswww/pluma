import {z} from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const StreamerDetailsSchema = z.object({
  favicon: z
    .union([
      z.never(),
      z.string().url(),
      z
        ?.instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
    ])
    .optional(),
  currency: z.enum(["usd"]),
  socialLink: z.string(),
  obs_server_password: z.string().optional(),
  category: z.array(z.number()),
  platform: z.string(),
  platform_username: z.string(),
});
