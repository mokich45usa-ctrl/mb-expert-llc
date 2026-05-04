import { getHomePage } from '../../../lib/sanity/queries';

export async function GET() {
  const data = await getHomePage();
  return Response.json(data ?? {});
}
