<!-- DatePicker component that user interacts with to choose date of data to display. -->
<script lang="ts">
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { afterUpdate } from 'svelte';
	import { dateToYMD } from '$lib/utils.js';
	import { date } from '$lib/stores.js';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	/* Update the URL with the selected date. */
	afterUpdate(() => {
		const url = new URL(window.location.href);
		url.searchParams.set('date', dateToYMD($date.toDate(getLocalTimeZone())));
		window.history.pushState({}, '', url.toString());
	});
</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-[240px] justify-start text-left font-normal', !$date && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{$date ? df.format($date.toDate(getLocalTimeZone())) : df.format(new Date())}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start">
		<Calendar bind:value={$date} />
	</Popover.Content>
</Popover.Root>

<slot></slot>
