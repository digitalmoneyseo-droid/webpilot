import { siteOrigin } from "./lib/site-config";

const worker = {
  fetch(request: Request) {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.host = new URL(siteOrigin).host;

    return Response.redirect(destination, 308);
  },
};

export default worker;
