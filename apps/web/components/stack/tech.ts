import SiBiome, { defaultColor as biomeHex } from "@icons-pack/react-simple-icons/icons/SiBiome";
import SiDocker, { defaultColor as dockerHex } from "@icons-pack/react-simple-icons/icons/SiDocker";
import SiDrizzle, { defaultColor as drizzleHex } from "@icons-pack/react-simple-icons/icons/SiDrizzle";
import SiExpress, { defaultColor as expressHex } from "@icons-pack/react-simple-icons/icons/SiExpress";
import SiGit, { defaultColor as gitHex } from "@icons-pack/react-simple-icons/icons/SiGit";
import SiJavascript, { defaultColor as javascriptHex } from "@icons-pack/react-simple-icons/icons/SiJavascript";
import SiNextdotjs, { defaultColor as nextHex } from "@icons-pack/react-simple-icons/icons/SiNextdotjs";
import SiNodedotjs, { defaultColor as nodeHex } from "@icons-pack/react-simple-icons/icons/SiNodedotjs";
import SiPostgresql, { defaultColor as postgresHex } from "@icons-pack/react-simple-icons/icons/SiPostgresql";
import SiPrisma, { defaultColor as prismaHex } from "@icons-pack/react-simple-icons/icons/SiPrisma";
import SiReact, { defaultColor as reactHex } from "@icons-pack/react-simple-icons/icons/SiReact";
import SiSass, { defaultColor as sassHex } from "@icons-pack/react-simple-icons/icons/SiSass";
import SiTailwindcss, { defaultColor as tailwindHex } from "@icons-pack/react-simple-icons/icons/SiTailwindcss";
import SiTurborepo, { defaultColor as turborepoHex } from "@icons-pack/react-simple-icons/icons/SiTurborepo";
import SiTypescript, { defaultColor as typescriptHex } from "@icons-pack/react-simple-icons/icons/SiTypescript";
import SiVercel, { defaultColor as vercelHex } from "@icons-pack/react-simple-icons/icons/SiVercel";
import type { StackIcon } from "./icon";
import { MotionIcon, motionHex } from "./motion-icon";

export type Tech = { name: string; Icon: StackIcon; hex: string };

const VISIBLE_ON_DARK = "#FFFFFF";

export const brandOverrides: Record<string, string> = {
  "Next.js": VISIBLE_ON_DARK,
  Vercel: VISIBLE_ON_DARK,
  Express: VISIBLE_ON_DARK,
  Prisma: VISIBLE_ON_DARK,
};

export const groups: { title: string; items: Tech[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "JavaScript", Icon: SiJavascript, hex: javascriptHex },
      { name: "TypeScript", Icon: SiTypescript, hex: typescriptHex },
      { name: "React", Icon: SiReact, hex: reactHex },
      { name: "Next.js", Icon: SiNextdotjs, hex: nextHex },
      { name: "Tailwind CSS", Icon: SiTailwindcss, hex: tailwindHex },
      { name: "Motion", Icon: MotionIcon, hex: motionHex },
      { name: "Sass", Icon: SiSass, hex: sassHex },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, hex: nodeHex },
      { name: "Express", Icon: SiExpress, hex: expressHex },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, hex: postgresHex },
      { name: "Drizzle", Icon: SiDrizzle, hex: drizzleHex },
      { name: "Prisma", Icon: SiPrisma, hex: prismaHex },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", Icon: SiGit, hex: gitHex },
      { name: "Docker", Icon: SiDocker, hex: dockerHex },
      { name: "Vercel", Icon: SiVercel, hex: vercelHex },
      { name: "Biome", Icon: SiBiome, hex: biomeHex },
      { name: "Turborepo", Icon: SiTurborepo, hex: turborepoHex },
    ],
  },
];
