<script lang="ts">
	import '$lib/tailwind.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Only Cast</title>
	<meta name="description" content="The simplest way to post to Farcaster" />
	<meta property="og:title" content="Only Cast" />
	<meta property="og:description" content="The simplest way to post to Farcaster" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="%sveltekit.assets%/og-image.png" />
</svelte:head>
<div class="h-screen w-screen p-8 dark:bg-zinc-900 dark:text-white">
	<main class="flex h-full flex-col items-center justify-center gap-y-4">
		{@render children()}
	</main>
</div>
