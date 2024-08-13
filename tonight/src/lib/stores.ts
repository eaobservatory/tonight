import { writable, type Writable } from 'svelte/store';
import { type DateValue, CalendarDate } from '@internationalized/date';

/**
 * Writable store for the date. This is the date that is displayed by the date picker,
 * which is also used to select the date for the data to display.
 */
const today = new Date();
export const date: Writable<DateValue> = writable(
	new CalendarDate(today.getUTCFullYear(), today.getUTCMonth() + 1, today.getUTCDate())
);

// dog -- new data fetched automatically every 5 seconds
export const dog = writable({ dog_url: '' });
async function fetchDog() {
	const res = await fetch('https://dog.ceo/api/breeds/image/random');
	if (res.ok) {
		const data = await res.json();
		dog.set({ dog_url: data.message });
	} else {
		throw new Error('Request failed');
	}
}
// setInterval(fetchDog, 5000); // 5 seconds
fetchDog(); // initial fetch
