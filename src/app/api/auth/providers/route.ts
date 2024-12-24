import { authOptions } from "../[...nextauth]/route"

export async function GET() {
  try {
    return Response.json(Object.values(authOptions.providers))
  } catch (error) {
    console.error('Error fetching providers:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to load providers' }),
      { status: 500 }
    )
  }
}
