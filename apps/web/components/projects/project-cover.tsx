import { cn } from "@folio/ui";
import Image from "next/image";

export function ProjectCover({
  src,
  name,
  sizes,
  priority,
  className,
}: {
  src: string;
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-video overflow-hidden border border-border", className)}>
      <Image
        src={src}
        alt={`${name} preview`}
        fill
        priority={priority}
        quality={90}
        sizes={sizes}
        className="object-cover object-top-left"
      />
    </div>
  );
}
