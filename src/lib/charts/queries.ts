import { fillShoppingHistory, shoppingHistory } from '$lib/shopping/stores';
import { createChart } from 'lightweight-charts';
import { get } from 'svelte/store';

export async function purchaseHistory(domElement: HTMLElement) {
	shoppingHistory.set([]);
	await fillShoppingHistory();

	const purchases = get(shoppingHistory);

	const aggregatedData = purchases.reduce((acc, purchase) => {
		const [year, month, day] = purchase.saleDate.split('-');
		const dateKey = `${year}-${month}-${day}`;

		if (!acc[dateKey]) {
			acc[dateKey] = { date: dateKey, amount: 0 };
		}

		acc[dateKey].amount += purchase.amount;
		return acc;
	}, {});

	const data = Object.values(aggregatedData).map(({ date, amount }) => {
		const [year, month, day] = date.split('-');
		return {
			time: new Date(year, month - 1, day).getTime() / 1000,
			value: amount
		};
	});

	const chart = createChart(domElement, {
		width: 1024,
		height: 600,
		layout: {
			background: {
				color: '#F0F8FF' // dark background
			},
			grid: {
				horizontal: {
					color: '#111' // dark grid lines
				},
				vertical: {
					color: '#111' // dark grid lines
				}
			}
		}
	});

	const series = chart.addLineSeries({
		color: '#66D9EF', // bright blue line color
		lineWidth: 2,
		lastValueVisible: false,
		priceLineVisible: false
	});

	series.setData(data);

	chart.applyOptions({
		timeScale: {
			tickMarkFormatter: (timestamp) => {
				const date = new Date(timestamp * 1000);
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
			},
			borderColor: '#111' // dark border color
		},
		priceScale: {
			borderColor: '#111' // dark border color
		}
	});

	chart.timeScale().fitContent();
}
