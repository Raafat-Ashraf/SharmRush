import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  fullWidth?: boolean;
}

export default function SectionLayout({
  children,
  className,
  id,
  as: Tag = "section",
  fullWidth = false,
}: Props) {
  return (
    <Tag id={id} className={cn("section-pad overflow-guard", className)}>
      {fullWidth ? (
        children
      ) : (
        <div className="container mx-auto">{children}</div>
      )}
    </Tag>
  );
}
