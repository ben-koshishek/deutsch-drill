import { forwardRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const drillInputStyles = cva(
  "drill-input text-center font-medium rounded-lg border-2 outline-none transition-all",
  {
    variants: {
      status: {
        idle: "",
        correct: "",
        wrong: "",
      },
      size: {
        md: "",
        lg: "",
        xl: "",
      },
    },
    defaultVariants: {
      status: "idle",
      size: "lg",
    },
  }
);

export interface DrillInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof drillInputStyles> {}

export const DrillInput = forwardRef<HTMLInputElement, DrillInputProps>(
  ({ status = "idle", size = "lg", className, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const sizeStyles = {
      md: {
        fontSize: "var(--text-lg)",
        height: "3.5rem",
        padding: "0 var(--space-6)",
      },
      lg: {
        fontSize: "var(--text-xl)",
        height: "4rem",
        padding: "0 var(--space-8)",
      },
      xl: {
        fontSize: "var(--text-4xl)",
        height: "5rem",
        padding: "0 var(--space-8)",
      },
    };

    const getStatusStyles = () => {
      if (status === "correct") {
        return {
          borderColor: "var(--color-success)",
          color: "var(--color-success)",
          background: "var(--color-input-bg)",
          boxShadow: "0 0 30px var(--color-success-glow), 0 0 60px var(--color-success-glow)",
          animation: "celebrateBurst 0.5s ease-out",
        };
      }
      if (status === "wrong") {
        return {
          borderColor: "var(--color-error)",
          color: "var(--color-error)",
          background: "var(--color-input-bg)",
          boxShadow: "0 0 30px var(--color-error-glow)",
          animation: "shake 0.4s ease-out",
        };
      }
      // Idle state with focus glow
      return {
        borderColor: isFocused ? "var(--color-primary)" : "var(--color-border)",
        color: "var(--color-text)",
        background: "var(--color-input-bg)",
        boxShadow: isFocused
          ? "0 0 20px var(--color-primary-glow), 0 0 40px var(--color-primary-glow)"
          : `inset 0 2px 4px var(--color-inset-shadow)`,
        animation: isFocused ? "glowPulse 2s ease-in-out infinite" : "none",
      };
    };

    const combinedStyle: React.CSSProperties = {
      textAlign: "center",
      fontFamily: "var(--font-body)",
      fontWeight: 600,
      borderRadius: "var(--radius-xl)",
      borderWidth: 3,
      borderStyle: "solid",
      outline: "none",
      transition: "border-color var(--transition-base), color var(--transition-base)",
      width: "100%",
      ...sizeStyles[size ?? "lg"],
      ...getStatusStyles(),
      ...style,
    };

    return (
      <input
        ref={ref}
        className={drillInputStyles({ status, size, className })}
        style={combinedStyle}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    );
  }
);

DrillInput.displayName = "DrillInput";
