<script lang="ts">
	import clsx from 'clsx';
	import TouchTarget from './TouchTarget.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Color = 'primary' | 'light';

	const {
		href,
		color = 'primary',
		className,
		label,
		children,
		type = 'button',
		...props
	}: {
		color?: Color;
		href?: string;
		className?: string;
		label?: string;
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
	} & HTMLAttributes<HTMLButtonElement> = $props();

	const styles = {
		base: [
			'relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-md border text-base/6 font-semibold cursor-pointer',
			'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6',
			'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
			'data-disabled:opacity-50',
			'transition-all duration-200 ease-in-out',
			'hover:scale-105 active:scale-95'
		],
		solid: [
			'border-transparent bg-(--btn-border)',
			'dark:bg-(--btn-bg)',
			'before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-md)-1px)] before:bg-(--btn-bg)',
			'before:shadow-sm',
			'dark:before:hidden',
			'dark:border-white/5',
			'after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-mds)-1px)]',
			'after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]',
			'data-active:after:bg-(--btn-hover-overlay) data-hover:after:bg-(--btn-hover-overlay)',
			'dark:after:-inset-px dark:after:rounded-md',
			'data-disabled:before:shadow-none data-disabled:after:shadow-none'
		],
		colors: {
			primary: [
				'text-white bg-primary-500 border-primary-500/90',
				'dark:text-white dark:[--btn-bg:var(--color-primary-600)] dark:[--btn-hover-overlay:var(--color-white)]/5'
			]
		} as Record<Color, string[]>
	};
</script>

{#if href}
	<a {href} class={clsx(className, styles.base, clsx(styles.solid, styles.colors[color]))}>
		<TouchTarget>{@render children()}</TouchTarget>
	</a>
{:else}
	<button
		{...props}
		{type}
		class={clsx(className, styles.base, clsx(styles.solid, styles.colors[color]))}
	>
		<TouchTarget>{@render children()}</TouchTarget>
	</button>
{/if}
