<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	export let text = 'default_text';
	export let href = '#/';
	export let iconSrc = '';

	const dispatcher = createEventDispatcher();

	function linkClick() {
		dispatcher('linkClick');
	}

	// {$page.url.hash === `${href}` ? '!text-softOrange bg-veryDarkBlue ml-0' : ''}
</script>

<!-- on:mouseleave={() => (dropDownShown = false)} -->
<li>
	<!--? Note : in real project you should to using `$page.url.pathname` instead of `$page.url.hash` -->
	<a
		on:click={linkClick}
		class="h-full flex gap-4 p-2 my-2 lg:my-0 lg:py-8 items-baseline whitespace-nowrap font-bold border-l-4 lg:border-l-0 lg:border-b-4 border-transparent
		lg:font-normal
		transition-all duration-300 hover:text-veryDarkBlue lg:hover:border-b-orange hover:border-l-orange
		{$page.url.hash === `${href}` ? 'text-veryDarkBlue lg:!border-b-orange border-l-orange' : ''}"
		{href}
	>
		{#if !!iconSrc}
			<img src={iconSrc} alt="list icon" />
		{/if}
		{text}
	</a>
</li>
