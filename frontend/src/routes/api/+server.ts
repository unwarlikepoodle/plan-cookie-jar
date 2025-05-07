import type { RequestHandler } from './$types';
import type { Group } from '$lib/types';

export const GET: RequestHandler = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/groups'); // Call the backend API

        if (!response.ok) {
            throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }

        const groups = await response.json();
        return new Response(JSON.stringify(groups), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error('Error fetching groups:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch groups' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
};
