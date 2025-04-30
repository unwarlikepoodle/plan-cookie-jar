<script lang="ts">
	import { onMount } from 'svelte';
	import { getGroups } from '$lib/api';
	import type { Group } from '$lib/types';

	let groups: Group[] = [];
	let loading = true;

	onMount(async () => {
		groups = await getGroups();
		loading = false;
	});
</script>

<div class="min-h-screen bg-gradient-to-b from-purple-500 to-green-500 text-white flex flex-col items-center justify-center">
	{#if loading}
		<p class="text-2xl font-bold animate-pulse">Loading...</p>
	{:else}
		<ul class="w-full max-w-md bg-white rounded-lg shadow-lg p-4 text-gray-800">
			{#each groups as group}
				<li class="border-b last:border-none py-2 hover:bg-purple-100 transition">
					<a href={`/groups/${group.id}`} class="text-lg font-semibold text-purple-600 hover:underline">{group.name}</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
