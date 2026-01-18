import { cva, type VariantProps } from "class-variance-authority";

const feedbackTextStyles = cva("font-medium", {
  variants: {
    status: {
      idle: "",
      correct: "",
      wrong: "",
    },
    size: {
      sm: "",
      md: "",
    },
  },
  defaultVariants: {
    status: "idle",
    size: "md",
  },
});

export interface FeedbackTextProps
  extends VariantProps<typeof feedbackTextStyles> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function FeedbackText({
  status = "idle",
  size = "md",
  children,
  className,
  style,
}: FeedbackTextProps) {
  const sizeStyles = {
    sm: { fontSize: "var(--text-base)" },
    md: { fontSize: "var(--text-md)" },
  };

  const statusStyles = {
    idle: { color: "var(--color-text-muted)" },
    correct: { color: "var(--color-success)" },
    wrong: { color: "var(--color-error)" },
  };

  const defaultMessages = {
    idle: "Press Enter / Space",
    correct: "Correct!",
    wrong: "Incorrect — press Enter / Space",
  };

  const combinedStyle: React.CSSProperties = {
    fontWeight: 500,
    ...sizeStyles[size ?? "md"],
    ...statusStyles[status ?? "idle"],
    ...style,
  };

  return (
    <span
      className={feedbackTextStyles({ status, size, className })}
      style={combinedStyle}
    >
      {children ?? defaultMessages[status ?? "idle"]}
    </span>
  );
}
