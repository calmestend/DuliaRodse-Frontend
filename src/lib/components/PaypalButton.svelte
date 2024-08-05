<script lang="ts">
	import { loadScript } from '@paypal/paypal-js';
	import { PAYPAL_CLIENT_ID } from '$lib/constants';
	import { goto } from '$app/navigation';
	import { processPayment } from '$lib/payment/queries';
	import { currentPaymentId } from '$lib/payment/stores';
	import { get } from 'svelte/store';

	export let cartTotal: number;
	export let clientId: number;
	let fundingSource: string;

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
				onClick: async function (data) {
					fundingSource = data.fundingSource + '';
				},
				onApprove: async function (data, actions) {
					return await actions.order.capture().then(async function (details) {
						let amount: string = '0';
						currentPaymentId.update(() => details.id ?? '');
						if (details.purchase_units !== undefined) {
							amount =
								details.purchase_units[0].amount?.value !== undefined
									? details.purchase_units[0].amount.value
									: '0';
							let time: string = '0';

							if (details.create_time) {
								time = details.create_time;
								await processPayment(time, clientId, fundingSource, amount, amount);
							}
						}
						goto(`/checkout/${get(currentPaymentId)}`);
					});
				},
				onError: function (err) {
					alert('Ocurrio un error');
					console.error('Something went wrong', err);
				}
			})
			.render('#paypal-button-container');
	});
</script>

<div id="paypal-button-container" />
