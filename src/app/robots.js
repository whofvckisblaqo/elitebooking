export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/dashboard",
          "/dashboard/",
          "/profile",
          "/profile/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://elitebookingweb.xyz/sitemap.xml",
    host: "https://elitebookingweb.xyz",
  };
}