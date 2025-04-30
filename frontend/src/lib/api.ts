import type { Group } from './types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getGroups() {
	const res = await fetch(`${API_BASE}/groups`);
	if (!res.ok) throw new Error('Failed to fetch groups');
	return (await res.json()) as Group[];
}

export async function getGroupPlans(groupId: string) {
	const res = await fetch(`${API_BASE}/groups/${groupId}/plans`);
	return await res.json();
}

export async function createPlan(groupId: string, data: any) {
	const res = await fetch(`${API_BASE}/groups/${groupId}/plans`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	return await res.json();
}
