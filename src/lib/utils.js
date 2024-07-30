import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { useHeaderTitle } from "@/hooks/useHeaderTitle";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function changeHeaderTitle(newTitle) {
  const { headerTitle, setHeaderTitle } = useHeaderTitle();
  setHeaderTitle(newTitle);
}