import type { CSSProperties, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GlowCard({ children, className = "", style }: GlowCardProps) {
  return (
    <div className={`glow-card ${className}`} style={style}>
      {children}
    </div>
  );
}
