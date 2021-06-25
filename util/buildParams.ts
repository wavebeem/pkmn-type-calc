export function buildParams(
  callback: (params: URLSearchParams) => void
): string {
  const params = new URLSearchParams();
  callback(params);
  const str = params.toString();
  if (!str) {
    return "";
  }
  return "?" + str;
}
