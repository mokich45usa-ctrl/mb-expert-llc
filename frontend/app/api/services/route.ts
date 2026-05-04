import { getServicesPage } from '../../../lib/sanity/queries';

export async function GET() {
  const data = await getServicesPage();
  return Response.json(data ?? {});
}
