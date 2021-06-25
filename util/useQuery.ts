import { useRouter } from "next/router";

export function useQuery(key: string): string | undefined {
  const router = useRouter();
  console.log(router);
  // TODO: File Next.js issue? `query` starts off empty even though `asPath`
  // properly reflects the query params on first load...
  const values = router.query[key];
  if (Array.isArray(values)) {
    return values[values.length - 1];
  }
  return values;
}

export const get;
