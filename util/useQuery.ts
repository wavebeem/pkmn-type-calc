import { useRouter } from "next/router";

export function useQuery(key: string): string | undefined {
  const router = useRouter();
  const values = router.query[key];
  if (Array.isArray(values)) {
    return values[values.length - 1];
  }
  return values;
}
