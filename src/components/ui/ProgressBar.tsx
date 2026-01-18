import { cva, type VariantProps } from "class-variance-authority";

const progressBarStyles = cva("w-full", {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
    },
    color: {
      primary: "",
      success: "",
      accent: "",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "primary",
  },
});

export interface ProgressBarProps
  extends VariantProps<typeof progressBarStyles> {
  value: number;
  className?: string;
  style?: React.CSSProperties;
  showGlow?: boolean;
}

export function ProgressBar({
  value,
  size = "sm",
  color = "primary",
  className,
  style,
  showGlow = true,
}: ProgressBarProps) {
  const sizeStyles = {
    xs: { height: "3px" },
    sm: { height: "5px" },
    md: { height: "10px" },
  };

  const colorConfig = {
    primary: {
      fill: "var(--color-primary)",
      glow: "var(--color-primary-glow)",
    },
    success: {
      fill: "var(--color-success)",
      glow: "var(--color-success-glow)",
    },
    accent: {
      fill: "var(--color-neon-cyan)",
      glow: "var(--color-neon-cyan-glow)",
    },
  };

  const { fill, glow } = colorConfig[color ?? "primary"];
  const clampedValue = Math.min(100, Math.max(0, value));

  const trackStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-bg-secondary)",
    borderRadius: 0,
    overflow: "hidden",
    position: "relative",
    ...sizeStyles[size ?? "sm"],
    ...style,
  };

  const fillStyle: React.CSSProperties = {
    height: "100%",
    width: `${clampedValue}%`,
    background: `linear-gradient(90deg, ${fill} 0%, ${fill} 50%, var(--color-shimmer) 50%, ${fill} 51%, ${fill} 100%)`,
    backgroundSize: "200% 100%",
    transition: "width var(--transition-base)",
    boxShadow: showGlow && clampedValue > 0 ? `0 0 10px ${glow}, 0 0 20px ${glow}` : "none",
    animation: clampedValue > 0 && clampedValue < 100 ? "progressShimmer 2s linear infinite" : "none",
    position: "relative",
  };

  // Glow orb at the end of progress
  const orbStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: fill,
    boxShadow: `0 0 10px ${fill}, 0 0 20px ${glow}`,
    opacity: clampedValue > 0 && clampedValue < 100 ? 1 : 0,
    transition: "opacity var(--transition-base)",
  };

  return (
    <div
      className={progressBarStyles({ size, color, className })}
      style={trackStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={fillStyle}>
        {showGlow && <div style={orbStyle} />}
      </div>
    </div>
  );
}
