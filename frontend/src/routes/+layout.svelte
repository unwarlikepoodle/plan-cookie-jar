<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-green-500"
>
	{@render children()}
</div>
