import { createHmac } from "node:crypto";

export const ACCESS_COOKIE = "fifth-signal-access";
const ACCESS_VALUE = "granted";

export function createAccessToken(secret: string) {
  return createHmac("sha256", secret).update(ACCESS_VALUE).digest("base64url");
}

