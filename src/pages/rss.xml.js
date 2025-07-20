import rss from "@astrojs/rss";
import { sanityClient } from "astro-sanity";

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

  return rss({
    title: "T.W.A.T. | This Week in AlexTown",
    description: "A blog by a dingus. New posts every Sunday.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt,
      link: `/post/${post.slug.current}/`,
      image: post.mainImage?.asset?.url,
    })),
    customData: `<language>en-us</language>`,
  });
}
