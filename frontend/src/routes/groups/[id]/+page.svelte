<script lang="ts">
	import { onMount } from 'svelte';
	import { getGroupPlans } from '$lib/api';
	import { page } from '$app/stores';

	let plans: any[] = [];
	let loading = true;

	onMount(async () => {
		const groupId = $page.params.id;
		plans = await getGroupPlans(groupId);
		loading = false;
	});
</script>

{#if loading}
	<p class="animate-pulse text-2xl font-bold text-purple-600">Loading...</p>
{:else}
	<ul>
		{#each plans as plan}
			<li>{plan.title} — {plan.status}</li>
		{/each}
	</ul>
{/if}
