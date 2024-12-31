import { z } from 'zod';

const BasicImageSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  total_results: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
});

const PhotoSchema = z.object({
  img_id: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  alt: z.string(),
  tags: z.array(z.string()),
  blurredDataUrl: z.string().optional(),
});

export const ImagesSchemaWithPhotos = BasicImageSchema.extend({
  photos: z.array(PhotoSchema),
});

export type Photo = z.infer<typeof PhotoSchema>;

export type ImagesResults = z.infer<typeof ImagesSchemaWithPhotos>;
