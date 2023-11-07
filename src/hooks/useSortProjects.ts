import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEventHandler, useCallback, useMemo } from "react";
import { Project } from "@prisma/client";

export const sortProjects =
  (by: keyof Project, direction: string) =>
  (a: Project, b: Project): number => {
    if (direction === "asc") {
      if (a[by] < b[by]) {
        return -1;
      }
      if (a[by] > b[by]) {
        return 1;
      }
      return 0;
    }

    if (a[by] > b[by]) {
      return -1;
    }
    if (a[by] < b[by]) {
      return 1;
    }
    return 0;
  };

interface UseSortProjects {
  direction: "asc" | "desc";
  by: keyof Project;
  handleDirectionClick: () => void;
  handleByClick: MouseEventHandler<HTMLInputElement>;
}

const useSortProjects = (): UseSortProjects => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const by = useMemo(
    () => (params?.get("by") ?? "name") as keyof Project,
    [params]
  );
  const direction = useMemo(
    () => (params?.get("dir") ?? "asc") as "asc" | "desc",
    [params]
  );

  const handleDirectionClick = useCallback(
    () =>
      router.replace(
        `${pathname}?by=${by}&dir=${direction === "asc" ? "desc" : "asc"}`
      ),
    [router, pathname, by, direction]
  );

  const handleByClick: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      router.replace(
        `${pathname}?by=${e.currentTarget.value}&dir=${direction}`
      ),
    [router, pathname, direction]
  );

  return {
    direction,
    by,
    handleDirectionClick,
    handleByClick,
  };
};

export default useSortProjects;
