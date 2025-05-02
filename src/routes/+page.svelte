<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import Button from '$lib/components/Button.svelte';
	import { handleSignIn } from '$lib/scripts/neynar';

	const handleSubmit = async (event: Event) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		let signer_uuid = localStorage.getItem('signer_uuid');

		if (!signer_uuid) {
			const result = await new Promise<{ signer_uuid: string }>((resolve) => {
				handleSignIn('e768efc4-2f48-41f6-8bcf-31072360fd13', (data) => {
					if (data.is_authenticated) {
						localStorage.setItem('signer_uuid', data.signer_uuid);
						resolve({ signer_uuid: data.signer_uuid });
					}
				});
			});
			signer_uuid = result.signer_uuid;
		}

		formData.append('signer_uuid', signer_uuid);

		const options = {
			method: 'POST',
			headers: {
				'x-api-key': import.meta.env.VITE_NEYNAR_API_KEY as string,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				signer_uuid,
				text: formData.get('text')
			})
		};

		const response = await fetch('https://api.neynar.com/v2/farcaster/cast', options);

		if (response.ok) {
			alert('Cast sent successfully');
			form.reset(); // Reset the form after successful submission
		} else {
			alert('Something went wrong submitting the cast');
		}
	};
</script>

<h1 class="font-silkscreen mb-4 w-full text-center text-6xl">Only Cast</h1>

<form
	method="POST"
	on:submit={handleSubmit}
	class="flex w-full max-w-2xl flex-col items-end gap-y-4"
>
	<TextArea name="text" />
	<div>
		<Button type="submit">Cast</Button>
	</div>
</form>
