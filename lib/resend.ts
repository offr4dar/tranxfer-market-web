import { Resend } from "resend";

export function createResendClient() {
  return new Resend(process.env.RESEND_API_KEY!);
}
