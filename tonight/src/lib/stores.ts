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
