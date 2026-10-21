import SiBiome, { defaultColor as biomeHex } from "@icons-pack/react-simple-icons/icons/SiBiome";
import SiChakraui, { defaultColor as chakraHex } from "@icons-pack/react-simple-icons/icons/SiChakraui";
import SiDocker, { defaultColor as dockerHex } from "@icons-pack/react-simple-icons/icons/SiDocker";
import SiDrizzle, { defaultColor as drizzleHex } from "@icons-pack/react-simple-icons/icons/SiDrizzle";
import SiExpress, { defaultColor as expressHex } from "@icons-pack/react-simple-icons/icons/SiExpress";
import SiGit, { defaultColor as gitHex } from "@icons-pack/react-simple-icons/icons/SiGit";
import SiI18next, { defaultColor as i18nextHex } from "@icons-pack/react-simple-icons/icons/SiI18next";
import SiJavascript, { defaultColor as javascriptHex } from "@icons-pack/react-simple-icons/icons/SiJavascript";
import SiJsonwebtokens, { defaultColor as jwtHex } from "@icons-pack/react-simple-icons/icons/SiJsonwebtokens";
import SiMongodb, { defaultColor as mongoHex } from "@icons-pack/react-simple-icons/icons/SiMongodb";
import SiNestjs, { defaultColor as nestHex } from "@icons-pack/react-simple-icons/icons/SiNestjs";
import SiNextdotjs, { defaultColor as nextHex } from "@icons-pack/react-simple-icons/icons/SiNextdotjs";
import SiNodedotjs, { defaultColor as nodeHex } from "@icons-pack/react-simple-icons/icons/SiNodedotjs";
import SiPassport, { defaultColor as passportHex } from "@icons-pack/react-simple-icons/icons/SiPassport";
import SiPnpm, { defaultColor as pnpmHex } from "@icons-pack/react-simple-icons/icons/SiPnpm";
import SiPostgresql, { defaultColor as postgresHex } from "@icons-pack/react-simple-icons/icons/SiPostgresql";
import SiPrisma, { defaultColor as prismaHex } from "@icons-pack/react-simple-icons/icons/SiPrisma";
import SiReact, { defaultColor as reactHex } from "@icons-pack/react-simple-icons/icons/SiReact";
import SiReactquery, { defaultColor as reactQueryHex } from "@icons-pack/react-simple-icons/icons/SiReactquery";
import SiRedux, { defaultColor as reduxHex } from "@icons-pack/react-simple-icons/icons/SiRedux";
import SiReduxsaga, { defaultColor as reduxSagaHex } from "@icons-pack/react-simple-icons/icons/SiReduxsaga";
import SiSass, { defaultColor as sassHex } from "@icons-pack/react-simple-icons/icons/SiSass";
import SiShadcnui, { defaultColor as shadcnHex } from "@icons-pack/react-simple-icons/icons/SiShadcnui";
import SiStorybook, { defaultColor as storybookHex } from "@icons-pack/react-simple-icons/icons/SiStorybook";
import SiTailwindcss, { defaultColor as tailwindHex } from "@icons-pack/react-simple-icons/icons/SiTailwindcss";
import SiTelegram, { defaultColor as telegramHex } from "@icons-pack/react-simple-icons/icons/SiTelegram";
import SiTurborepo, { defaultColor as turborepoHex } from "@icons-pack/react-simple-icons/icons/SiTurborepo";
import SiTypescript, { defaultColor as typescriptHex } from "@icons-pack/react-simple-icons/icons/SiTypescript";
import SiVercel, { defaultColor as vercelHex } from "@icons-pack/react-simple-icons/icons/SiVercel";
import { HuskyIcon, huskyHex } from "./husky-icon";
import type { StackIcon } from "./icon";
import { MotionIcon, motionHex } from "./motion-icon";

export type Tech = { name: string; Icon: StackIcon; hex: string };

const VISIBLE_ON_DARK = "#FFFFFF";

export const brandOverrides: Record<string, string> = {
  "Next.js": VISIBLE_ON_DARK,
  Vercel: VISIBLE_ON_DARK,
  Express: VISIBLE_ON_DARK,
  Prisma: VISIBLE_ON_DARK,
  "shadcn/ui": VISIBLE_ON_DARK,
  JWT: VISIBLE_ON_DARK,
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
      { name: "Chakra UI", Icon: SiChakraui, hex: chakraHex },
      { name: "shadcn/ui", Icon: SiShadcnui, hex: shadcnHex },
      { name: "i18next", Icon: SiI18next, hex: i18nextHex },
      { name: "Telegram Mini Apps", Icon: SiTelegram, hex: telegramHex },
    ],
  },
  {
    title: "State & data",
    items: [
      { name: "Redux Toolkit", Icon: SiRedux, hex: reduxHex },
      { name: "Redux Saga", Icon: SiReduxsaga, hex: reduxSagaHex },
      { name: "TanStack Query", Icon: SiReactquery, hex: reactQueryHex },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, hex: nodeHex },
      { name: "Express", Icon: SiExpress, hex: expressHex },
      { name: "NestJS", Icon: SiNestjs, hex: nestHex },
      { name: "Passport", Icon: SiPassport, hex: passportHex },
      { name: "JWT", Icon: SiJsonwebtokens, hex: jwtHex },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, hex: postgresHex },
      { name: "MongoDB", Icon: SiMongodb, hex: mongoHex },
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
      { name: "pnpm", Icon: SiPnpm, hex: pnpmHex },
      { name: "Storybook", Icon: SiStorybook, hex: storybookHex },
      { name: "Husky", Icon: HuskyIcon, hex: huskyHex },
    ],
  },
];
