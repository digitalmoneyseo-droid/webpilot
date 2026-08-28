const canonicalOrigin = "https://suchio.net";

export default {
  fetch(request: Request) {
    const destination = new URL(request.url);
    destination.protocol = "https:";
    destination.host = new URL(canonicalOrigin).host;

    return Response.redirect(destination, 308);
  },
};
