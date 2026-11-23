import { prisma } from "../prisma";

export type Sponsor = {
  id: string;
  name: string;
  imageUrl: string;
  link: string | null;
};

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    return await prisma.sponsor.findMany({
      where: { status: "ACTIVE", hidden: false },
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, imageUrl: true, link: true },
    });
  } catch (error) {
    console.error("Unable to load sponsors:", error);
    return [];
  }
}
