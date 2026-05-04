import { getSiteSettings } from '../../../lib/sanity/queries';

export async function GET() {
  const data = await getSiteSettings();
  return Response.json(data ?? {});
}
