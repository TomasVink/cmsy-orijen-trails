import { getPageBySlug } from "$lib/payload.server";

export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => {
  // Home page is stored in the CMS with slug ""
  const page = await getPageBySlug("home", fetch);
  return { page };
};
