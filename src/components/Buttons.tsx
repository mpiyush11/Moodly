import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps extends AnchorProps {
  children: ReactNode;
  disabled?: boolean;
}

export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  const { disabled, ...anchorProps } = props;
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={cn(
            "inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#7A1F1F] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F1F] sm:w-auto",
          "cursor-not-allowed opacity-50",
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      {...anchorProps}
      target={anchorProps.href?.startsWith("http") ? "_blank" : undefined}
      rel={anchorProps.href?.startsWith("http") ? "noopener" : undefined}
      className={cn(
        "inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#7A1F1F] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#661919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1F1F] sm:w-auto",
        className
      )}
    >
      {children}
    </a>
  );
}

export function GhostButton({ children, className, ...props }: ButtonProps) {
  return (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener" : undefined}
      className={cn(
        "inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border border-[#141414] px-6 py-3 text-sm font-medium tracking-wide text-[#141414] transition-colors hover:bg-[#141414] hover:text-[#F5F0E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414] sm:w-auto",
        className
      )}
    >
      {children}
    </a>
  );
}
