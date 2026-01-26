import { cva, type VariantProps } from "class-variance-authority";

const exampleBoxStyles = cva(
  "",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ExampleBoxProps extends VariantProps<typeof exampleBoxStyles> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ExampleBox({ children, size = "md", className, style }: ExampleBoxProps) {
  const sizeStyles = {
    sm: {
      fontSize: "var(--text-sm)",
      padding: "var(--space-3) var(--space-4)",
    },
    md: {
      fontSize: "var(--text-lg)",
      padding: "var(--space-4) var(--space-8)",
    },
    lg: {
      fontSize: "var(--text-xl)",
      padding: "var(--space-5) var(--space-10)",
    },
  };

  const combinedStyle: React.CSSProperties = {
    color: "var(--color-example-text)",
    fontStyle: "italic",
    fontWeight: 500,
    background: "var(--color-example-bg)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-example-border)",
    display: "inline-block",
    boxShadow: "var(--color-example-shadow)",
    position: "relative",
    ...sizeStyles[size ?? "md"],
    ...style,
  };

  return (
    <div className={exampleBoxStyles({ size, className })} style={combinedStyle}>
      <span style={{ opacity: 0.6 }}>"</span>
      {children}
      <span style={{ opacity: 0.6 }}>"</span>
    </div>
  );
}
