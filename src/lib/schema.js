import { z } from "zod";

// User schema
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
  phone: z.string().nullable().optional(),
  isAdmin: z.boolean().optional().default(false),
});

// Profile schema
export const insertProfileSchema = z.object({
  userId: z.number(),
  name: z.string().min(2).max(50),
  avatarId: z.number(),
});

// Content schema
export const insertContentSchema = z.object({
  tmdbId: z.number(),
  type: z.enum(["movie", "tv"]),
  addedBy: z.number().optional(),
});

// Reviews schema
export const insertReviewSchema = z.object({
  contentId: z.number(),
  profileId: z.number(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
  isPublic: z.boolean().optional().default(true),
});

// My List schema
export const insertMyListSchema = z.object({
  profileId: z.number(),
  contentId: z.number(),
  tmdbId: z.number(),
  type: z.string(),
});

// Logs schema
export const insertLogSchema = z.object({
  action: z.string(),
  userId: z.number().optional(),
  details: z.string().optional(),
});
