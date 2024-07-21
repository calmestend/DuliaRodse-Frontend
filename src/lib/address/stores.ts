import type { City, CityServerData, State, StateServerData } from '$lib/types';
import { writable } from 'svelte/store';

export const citiesStores = writable<City[]>([]);
export const statesStores = writable<State[]>([]);

fillCitiesStores();
fillStateStores();

export async function fillCitiesStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/ciudad/read.php');
	const parsedResponse = await response.json();

	const cities: CityServerData[] = parsedResponse.data;
	cities.map((city) => {
		const newCity: City = {
			id: city.CVE_CIUDAD,
			name: city.NOM_CIUDAD,
			stateId: city.CVE_ESTADO
		};
		citiesStores.update((previousCities) => {
			return [...previousCities, newCity];
		});
	});
}

export async function fillStateStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/estado/read.php');
	const parsedResponse = await response.json();

	const states: StateServerData[] = parsedResponse.data;
	states.map((state) => {
		const newState: State = {
			id: state.CVE_ESTADO,
			name: state.NOM_ESTADO
		};

		statesStores.update((previousStates) => {
			return [...previousStates, newState];
		});
	});
}
