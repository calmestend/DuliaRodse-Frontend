import { writable } from 'svelte/store';

export const currentPaymentId = writable<string>('');
