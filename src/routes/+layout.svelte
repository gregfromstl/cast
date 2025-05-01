<script lang="ts">
	import '$lib/tailwind.css';

	let { children } = $props();
</script>

<div class="h-screen w-screen p-8 dark:bg-zinc-900 dark:text-white">
	<main class="flex h-full flex-col items-center justify-center gap-y-4">
		{@render children()}
	</main>
</div>
