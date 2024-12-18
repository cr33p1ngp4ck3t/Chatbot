import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Correct path to config.json
    const configPath = path.join(process.cwd(), 'src/app/api/application.json');
    const configData = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(configData);

    return Response.json(config); // Send response as JSON
  } catch (error) {
    console.error('Error loading config:', error);
    return new Response(JSON.stringify({ error: 'Failed to load config' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
