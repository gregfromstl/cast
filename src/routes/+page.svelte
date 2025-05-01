<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import Button from '$lib/components/Button.svelte';
	import { handleSignIn } from '$lib/scripts/neynar';

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		let signer = localStorage.getItem('signer_uuid');

		if (!signer) {
			const result = await new Promise<{ signer_uuid: string }>((resolve) => {
				handleSignIn('e768efc4-2f48-41f6-8bcf-31072360fd13', (data) => {
					if (data.is_authenticated) {
						localStorage.setItem('signer_uuid', data.signer_uuid);
						resolve({ signer_uuid: data.signer_uuid });
					}
				});
			});
			signer = result.signer_uuid;
		}

		formData.append('signer_uuid', signer);

		const response = await fetch('/api/cast', {
			method: form.method,
			body: formData
		});

		if (response.ok) {
			// await goto(form.action);
			alert('Cast sent successfully');
		} else {
			alert('Something went wrong submitting the cast');
		}
	};
</script>

<form
	method="POST"
	on:submit={handleSubmit}
	class="flex w-full max-w-2xl flex-col items-end gap-y-4"
>
	<h1 class="font-silkscreen mb-4 w-full text-center text-6xl">Cast</h1>
	<TextArea name="text" />
	<div>
		<Button type="submit">Cast</Button>
	</div>
</form>
