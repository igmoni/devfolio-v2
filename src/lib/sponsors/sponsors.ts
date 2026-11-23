import { cacheLife, cacheTag } from "next/cache";

import { prisma } from "../prisma";

export type Sponsor = {
  id: string;
  name: string;
  imageUrl: string;
  link: string | null;
};

export async function getSponsors(): Promise<Sponsor[]> {
  "use cache";

  cacheLife("minutes");
  cacheTag("sponsors");

  try {
    return await prisma.sponsor.findMany({
      where: { status: "ACTIVE", hidden: false },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        link: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return [];
  }
}
