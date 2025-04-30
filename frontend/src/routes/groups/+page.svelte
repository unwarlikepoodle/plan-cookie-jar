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

{#if loading}
	<p class="animate-pulse text-2xl font-bold">Loading...</p>
{:else}
	<ul class="w-full max-w-md rounded-lg bg-white p-4 text-gray-800 shadow-lg">
		{#each groups as group}
			<li class="border-b py-2 transition last:border-none hover:bg-purple-100">
				<a
					href={`/groups/${group.id}`}
					class="text-lg font-semibold text-purple-600 hover:underline">{group.name}</a
				>
			</li>
		{/each}
	</ul>
{/if}
