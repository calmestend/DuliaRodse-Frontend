import type { Review, ReviewServerData } from '$lib/types';
import { writable } from 'svelte/store';

export const productReviews = writable<Review[]>([]);
export const clientReviews = writable<Review[]>([]);

export async function fillProductReviews(id_pro: number) {
	productReviews.set([]);

	const response = await fetch(
		`http://localhost/duliarodse/back/api/review/read_review_by_product.php?id_pro=${id_pro}`
	);

	const parsedResponse = await response.json();

	if (parsedResponse.data) {
		const reviews: ReviewServerData[] = parsedResponse.data;
		reviews.map((review) => {
			const newReview: Review = {
				id: review.ID_REV,
				scaleId: review.ID_ESC,
				clientId: review.ID_CLIE,
				productId: review.ID_PRO,
				commentary: review.COM_REV
			};

			productReviews.update((previousReviews) => {
				return [...previousReviews, newReview];
			});
		});
	}
}

export async function fillClientReviews(id_clie: number) {
	clientReviews.set([]);
	const response = await fetch(
		`http://localhost/duliarodse/back/api/review/read_review_by_client.php?id_clie=${id_clie}`
	);

	const parsedResponse = await response.json();

	if (parsedResponse.data) {
		const reviews: ReviewServerData[] = parsedResponse.data;
		reviews.map((review) => {
			const newReview: Review = {
				id: review.ID_REV,
				scaleId: review.ID_ESC,
				clientId: review.ID_CLIE,
				productId: review.ID_PRO,
				commentary: review.COM_REV
			};

			clientReviews.update((previousReviews) => {
				return [...previousReviews, newReview];
			});
		});
	}
}
