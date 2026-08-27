import { handleContactRequest } from "@/lib/contact-handler";

export async function POST(request: Request) {
  return handleContactRequest(request, {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_EMAIL_TO,
    from: process.env.CONTACT_EMAIL_FROM,
  });
}
