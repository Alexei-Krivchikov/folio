"use client";

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
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import {
  fadeUpVariants,
  liftOnHover,
  scaleInVariants,
  staggerVariants,
  viewportOnce,
} from "@/components/motion/variants";
import type { StackIcon } from "./icon";
import { MotionIcon, motionHex } from "./motion-icon";

type Tech = { name: string; Icon: StackIcon; hex: string };

const VISIBLE_ON_DARK = "#FFFFFF";

const brandOverrides: Record<string, string> = {
  "Next.js": VISIBLE_ON_DARK,
  Vercel: VISIBLE_ON_DARK,
  Express: VISIBLE_ON_DARK,
  Prisma: VISIBLE_ON_DARK,
};

const groups: { title: string; items: Tech[] }[] = [
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

export function Stack() {
  const reduced = usePrefersReducedMotion();
  const section = staggerVariants(reduced, { staggerChildren: 0.1 });
  const groupAnim = fadeUpVariants(reduced, { y: 24, duration: 0.5 });
  const tileAnim = scaleInVariants(reduced, { scale: 0.92, duration: 0.35 });
  const tileHover = liftOnHover(reduced, -4);

  return (
    <section id="stack" className="mx-auto w-full max-w-5xl px-6 py-16">
      <motion.div variants={section} initial="hidden" whileInView="show" viewport={viewportOnce}>
        <motion.p variants={groupAnim} className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Toolbox
        </motion.p>
        <motion.h2 variants={groupAnim} className="mt-3 text-3xl font-bold text-white md:text-4xl">
          My Stack
        </motion.h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <motion.div key={group.title} variants={groupAnim}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.items.map(({ name, Icon, hex }) => (
                  <motion.span
                    key={name}
                    variants={tileAnim}
                    whileHover={tileHover}
                    style={{ "--brand": brandOverrides[name] ?? hex } as CSSProperties}
                    className="group/tile flex cursor-default items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500"
                  >
                    <Icon
                      size={16}
                      title=""
                      aria-hidden
                      className="shrink-0 transition-colors duration-200 group-hover/tile:text-(--brand)"
                    />
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
