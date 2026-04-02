import { defineCollection, z } from "astro:content";

const post = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string(),
      contributors: z.array(z.string()).optional(),
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections: Record<SiteCollectionKeys, typeof post> = {
  android: post,
  anything: post,
  vue: post,
  "web-camp": post,
};
