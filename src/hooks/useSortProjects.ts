import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEventHandler,
  FormEventHandler,
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

export const replaceParam = ({
  replaceFunc,
  pathname,
  by,
  direction,
  options,
}: {
  replaceFunc: (path: string, options?: { scroll: boolean }) => void;
  pathname: string;
  by: string;
  direction: string;
  options?: { scroll: boolean };
}) => replaceFunc(`${pathname}?by=${by}&dir=${direction}`, options);

interface UseSortProjects {
  by: keyof Project;
  direction: string;
  handleDirectionClick: () => void;
  handleBySubmit: FormEventHandler<HTMLFormElement>;
  handleByChange: ChangeEventHandler<HTMLInputElement>;
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

  const handleBySubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => e.preventDefault(),
    []
  );

  const handleByChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      router.replace(
        `${pathname}?by=${e.target.value}&dir=${
          direction === "asc" ? "desc" : "asc"
        }`
      ),
    [router, pathname, direction]
  );

  return {
    by,
    direction,
    handleDirectionClick,
    handleBySubmit,
    handleByChange,
  };
};

export default useSortProjects;
