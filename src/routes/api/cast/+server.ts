import { fail } from "@sveltejs/kit";

export const POST = async (request: Request) => {
	const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;
	const data = await request.formData();
	const text = data.get('text');
	const signer_uuid = data.get('signer_uuid');

	const options = {
		method: 'POST',
		headers: { 'x-api-key': NEYNAR_API_KEY, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			signer_uuid,
			text
		})
	};

	const response = await fetch('https://api.neynar.com/v2/farcaster/cast', options)

	if (!response.ok) {
		return fail(500, { message: 'Something went wrong' });
	}

	return { success: true };
}
