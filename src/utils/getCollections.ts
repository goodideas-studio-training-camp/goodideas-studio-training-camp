import { getCollection, type CollectionEntry } from "astro:content";

export default async function getCollections(
  filter?: (v: CollectionEntry<SiteCollectionKeys>) => boolean
) {
  return (
    await Promise.all(
      (["android", "anything", "vue", "web-camp"] as SiteCollectionKeys[]).map(
        i => getCollection(i as SiteCollectionKeys, filter)
      )
    )
  ).flat(1);
}
