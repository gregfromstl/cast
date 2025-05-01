<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { fn } from '@storybook/test';

	const { Story } = defineMeta({
		title: 'Example/Button2',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			color: {
				control: { type: 'select' },
				options: ['primary']
			}
		},
		args: {
			onclick: fn(),
			label: 'Click me'
		}
	});
</script>

{#snippet defaultChildren()}
	Click me
{/snippet}

<Story name="Primary" args={{ children: defaultChildren, outline: true }} />
