import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number"
    ),
  phone: z.string().optional(),
  isAdmin: z.boolean().optional().default(false),
});

export const insertProfileSchema = z.object({
  userId: z.number(),
  name: z.string().min(2).max(50),
  avatarId: z.number(),
});

export const insertContentSchema = z.object({
  tmdbId: z.number(),
  type: z.enum(["movie", "tv"]),
  addedBy: z.number().optional(),
});

export const insertReviewSchema = z.object({
  contentId: z.number(),
  profileId: z.number(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
  isPublic: z.boolean().optional().default(true),
});

export const insertMyListSchema = z.object({
  profileId: z.number(),
  contentId: z.number(),
  tmdbId: z.number(),
  type: z.string(),
});

export const insertLogSchema = z.object({
  action: z.string(),
  userId: z.number().optional(),
  details: z.string().optional(),
}); 