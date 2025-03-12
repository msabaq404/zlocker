
export function getUserData(cookie: string): string {
  return cookie.split(";").find((c) => c.includes("userData"))?.split("=")[1] || "";
}