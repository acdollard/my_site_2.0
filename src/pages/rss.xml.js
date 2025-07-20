import rss from "@astrojs/rss";
import { sanityClient } from "sanity:client";

export async function GET(context) {
  const posts =
    await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      }
    }
  }`);

  console.log("Posts fetched for RSS:", posts);

  // Ensure posts is an array and has the required fields
  if (!posts || !Array.isArray(posts)) {
    console.error("No posts found or invalid data structure:", posts);
    return rss({
      title: "T.W.A.T. | This Week in AlexTown",
      description: "A blog by a dingus. New posts every Sunday.",
      site: context.site,
      items: [],
      customData: `<language>en-us</language>`,
    });
  }

  const items = posts
    .filter((post) => post.title && post.slug?.current && post.publishedAt)
    .map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt || "",
      link: `/post/${post.slug.current}/`,
      image: post.mainImage?.asset?.url,
    }));

  console.log("RSS items:", items);

  return rss({
    title: "T.W.A.T. | This Week in AlexTown",
    description: "A blog by a dingus. New posts every Sunday.",
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
