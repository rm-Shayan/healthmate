import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "HealthMate - Your Personal Health AI",
  description = "Analyze your medical reports and track your health with AI.",
  image = "/thumbnail.png", // Public folder mein honi chahiye
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: title === "HealthMate - Your Personal Health AI" ? title : `${title} | HealthMate`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@healthmate",
    },
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL("https://your-healthmate-app.com"), // Production URL yahan aayega
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}