import type { APIRoute } from 'astro';
import { searchIndex } from '../data/search-index';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
