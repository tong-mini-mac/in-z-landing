import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  priority?: boolean;
};

/** Wide wordmark — use logo-mark.svg (640×300), not the old square PNG that only had the Z. */
export function LogoMark({ className = "logo-mark", priority = false }: LogoMarkProps) {
  return (
    <Image
      className={className}
      src="/logo-mark.svg"
      alt="IN Z"
      width={640}
      height={300}
      priority={priority}
      unoptimized
    />
  );
}
