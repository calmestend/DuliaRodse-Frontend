import type { ReviewServerData } from '$lib/types';

// TODO: Create function for create and update reviews
export async function createReview(
	id_esc: number,
	id_pro: number,
	id_clie: number,
	com_rev: string
) {
	const newReview: ReviewServerData = {
		ID_REV: 0,
		ID_ESC: id_esc,
		ID_PRO: id_pro,
		ID_CLIE: id_clie,
		COM_REV: com_rev
	};

	const response = await fetch('http://localhost/duliarodse/back/api/review/create.php', {
		method: 'POST',
		body: JSON.stringify(newReview)
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		return true;
	}
	return false;
}

export async function updateReview(id_esc: number, id_rev: number, com_rev: string) {
	const reviewUpdated: ReviewServerData = {
		ID_REV: id_rev,
		ID_ESC: id_esc,
		ID_CLIE: 0,
		ID_PRO: 0,
		COM_REV: com_rev
	};

	const response = await fetch('http://localhost/duliarodse/back/api/review/update.php', {
		method: 'POST',
		body: JSON.stringify(reviewUpdated)
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		return true;
	}
	return false;
}
