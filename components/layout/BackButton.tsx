"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  fallbackHref?: string;
  label?: string;
};

export function BackButton({ className, fallbackHref = "/", label = "Back" }: Props) {
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={() => {
        // If there's no history entry, fallback to a safe route.
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push(fallbackHref);
      }}
    >
      {label}
    </Button>
  );
}

