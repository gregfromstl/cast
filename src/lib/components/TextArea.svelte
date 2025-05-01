<script lang="ts">
	import clsx from 'clsx';
	import '../tailwind.css';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		className,
		resizable,
		disabled,
		invalid,
		value,
		placeholder,
		rows = 3,
		name,
		...props
	}: {
		className?: string;
		resizable?: boolean;
		disabled?: boolean;
		invalid?: boolean;
		value?: string;
		placeholder?: string;
		rows?: number;
		name?: string;
	} & HTMLAttributes<HTMLTextAreaElement> = $props();

	let textareaRef: HTMLTextAreaElement;
</script>

<span
	data-slot="control"
	class={clsx(
		className,
		'light',
		'relative block w-full',
		'before:absolute before:inset-px before:rounded-[calc(var(--radius-md)-1px)] before:bg-white before:shadow-sm',
		'dark:before:hidden',
		disabled &&
			'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
		'transition-all duration-200 ease-in-out'
	)}
>
	<textarea
		{...props}
		{name}
		bind:this={textareaRef}
		class={clsx(
			'relative block h-full w-full appearance-none rounded-md px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
			'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
			'border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20',
			'bg-transparent dark:bg-white/5',
			'focus:outline-hidden',
			invalid &&
				'border-red-500 hover:border-red-500 dark:border-red-600 dark:hover:border-red-600',
			disabled &&
				'disabled:border-zinc-950/20 dark:disabled:border-white/15 dark:disabled:bg-white/[2.5%] dark:hover:disabled:border-white/15',
			'focus:ring-primary-500 focus:ring',
			resizable ? 'resize-y' : 'resize-none'
		)}
		{disabled}
		{placeholder}
		{rows}
		bind:value
	></textarea>
</span>
