import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export default async function sitemap() {
  await connectDB();

  const celebrities = await Celebrity.find({ available: true }).select("slug updatedAt");

  const celebrityUrls = celebrities.map((celeb) => ({
    url: `https://elitebookingweb.xyz/celebrities/${celeb.slug}`,
    lastModified: celeb.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: "https://elitebookingweb.xyz",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://elitebookingweb.xyz/celebrities",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://elitebookingweb.xyz/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://elitebookingweb.xyz/terms",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://elitebookingweb.xyz/privacy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://elitebookingweb.xyz/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://elitebookingweb.xyz/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...celebrityUrls];
}