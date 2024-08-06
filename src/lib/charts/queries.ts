import { fillShoppingHistory, shoppingHistory } from '$lib/shopping/stores';
import { createChart } from 'lightweight-charts';
import { get } from 'svelte/store';

// Add automatic refresh
export async function purchaseHistory(domElement: HTMLElement) {
	shoppingHistory.set([]);
	await fillShoppingHistory();

	const purchases = get(shoppingHistory);

	// Agrupar y sumar los montos por fecha
	const aggregatedData = purchases.reduce((acc, purchase) => {
		const [year, month, day] = purchase.saleDate.split('-');
		const dateKey = `${year}-${month}-${day}`;

		if (!acc[dateKey]) {
			acc[dateKey] = { date: dateKey, amount: 0 };
		}

		acc[dateKey].amount += parseFloat(purchase.amount);
		return acc;
	}, {});

	// Convertir el objeto de datos agregados en un array adecuado para el gráfico
	const data = Object.values(aggregatedData).map(({ date, amount }) => {
		const [year, month, day] = date.split('-');
		return {
			time: new Date(year, month - 1, day).getTime() / 1000, // Convertir a timestamp UNIX en segundos
			value: amount // Sumar el monto para la fecha
		};
	});

	// Crear el gráfico
	const chart = createChart(domElement, { width: 600, height: 400 });
	const series = chart.addLineSeries({
		color: '#2962FF',
		lineWidth: 2,
		// disabling built-in price lines
		lastValueVisible: false,
		priceLineVisible: false
	});

	// Establecer los datos en la serie de líneas
	series.setData(data);

	// Opcional: Añadir etiquetas personalizadas para las fechas en el eje X
	chart.applyOptions({
		timeScale: {
			tickMarkFormatter: (timestamp) => {
				const date = new Date(timestamp * 1000);
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
			}
		}
	});

	chart.timeScale().fitContent();
}
