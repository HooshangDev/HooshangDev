import "server-only";

export function isLocalDashboard(host: string | null) {
  return (
    process.env.NODE_ENV === "development" &&
    /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host || "")
  );
}
