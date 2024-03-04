import type { APIRoute } from "astro";
import { generateOgImageForPost } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";
import getCollections from "@utils/getCollections";
import type { CollectionEntry } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollections().then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await generateOgImageForPost(props as CollectionEntry<SiteCollectionKeys>),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
