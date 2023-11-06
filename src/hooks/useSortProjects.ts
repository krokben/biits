import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from "react";
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
  by: keyof Project;
  direction: string;
  handleDirectionClick: () => void;
  handleByClick: MouseEventHandler<HTMLInputElement>;
  handleBySubmit: FormEventHandler<HTMLFormElement>;
}

const useSortProjects = (): UseSortProjects => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const by = useMemo(
    () => (params?.get("by") ?? "name") as keyof Project,
    [params]
  );
  const direction = useMemo(() => params?.get("dir") ?? "asc", [params]);

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

  const handleBySubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => e.preventDefault(),
    []
  );

  return {
    by,
    direction,
    handleDirectionClick,
    handleByClick,
    handleBySubmit,
  };
};

export default useSortProjects;
