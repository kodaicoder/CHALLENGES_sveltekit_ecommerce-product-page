<script>
	export let thumbnails;
	export let selectedIndex;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const thumbnailsClick = (index) => {
		dispatch('thumbnailsClick', { index });
	};

	// on:click={() => {
	// 			scrollTo(index);
	// 		}}
</script>

<div class="embla_gallery flex justify-between mt-6">
	{#each thumbnails as thumbnail, index (thumbnail.src)}
		<button
			on:click={() => {
				thumbnailsClick(index);
			}}
			class={' embla__thumbnail rounded-2xl overflow-hidden border-2 border-transparent transition-all duration-200 hover:opacity-50 '.concat(
				selectedIndex == index ? ' !border-orange active group' : ''
			)}
		>
			<img src={thumbnail.src} alt={thumbnail.alt} class="h-24 group-[.active]:opacity-50" />
		</button>
	{/each}
</div>
