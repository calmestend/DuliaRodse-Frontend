import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import {
	branchesServerStores,
	branchesStores,
	fillBranchesStores,
	fillBranchServerLoad
} from '$lib/inventory/stores';

export const load: PageServerLoad = async () => {
	branchesServerStores.set([]);
	branchesStores.set([]);
	await fillBranchServerLoad();
	await fillBranchesStores();
	const currentBranchesServer = get(branchesServerStores);
	const currentBranches = get(branchesStores);
	return {
		currentBranchesServer,
		currentBranches
	};
};
