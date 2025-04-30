import type { RequestHandler } from './$types';
import type { Group } from '$lib/types';

export const GET: RequestHandler = async () => {
  const mockGroups: Group[] = [
    { id: '1', name: 'Group A', description: 'This is Group A' },
    { id: '2', name: 'Group B', description: 'This is Group B' }
  ];

  return new Response(JSON.stringify(mockGroups), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
};