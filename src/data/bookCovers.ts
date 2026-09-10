import { visualMedia } from "@/data/visualMedia";
import { withBasePath } from "@/lib/basePath";

export const bookCovers = {
  stillFiguringItOut: withBasePath("/book-covers/still-figuring-it-out.webp"),
  bareMinimum: withBasePath("/book-covers/bare-minimum.webp"),
  regret: withBasePath("/book-covers/regret.webp"),
  catWhoStayed: withBasePath("/book-covers/the-cat-who-stayed.webp"),
  wolfOneRedMonsoon: withBasePath("/book-covers/wolf-one-red-monsoon.webp"),
  girlDeadMan: visualMedia.girlDeadManCover,
  cityDrinking: visualMedia.cityDrinkingCover,
} as const;
