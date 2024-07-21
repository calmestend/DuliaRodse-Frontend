<script lang="ts">
	import { loadScript } from '@paypal/paypal-js';
	import { PAYPAL_CLIENT_ID } from '$lib/constants';
	import { goto } from '$app/navigation';

	export let cartTotal;

	loadScript({ 'client-id': PAYPAL_CLIENT_ID, currency: 'MXN' }).then((paypal) => {
		paypal
			.Buttons({
				style: {
					color: 'blue',
					shape: 'pill'
				},
				createOrder: function (data, actions) {
					// Set up the transaction
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: cartTotal
								}
							}
						]
					});
				},
				onApprove: function (data, actions) {
					return actions.order.capture().then(function (details) {
						alert('Payment successful!');
						goto('/checkout/success');
						console.log(details);
					});
				},
				onError: function (err) {
					alert('Something went wrong');
					console.log('Something went wrong', err);
				}
			})
			.render('#paypal-button-container');
	});
</script>

<div id="paypal-button-container" />
