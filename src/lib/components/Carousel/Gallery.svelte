<script>
	export let thumbnails;
	export let selectedIndex;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const thumbnailsClick = (index) => {
		dispatch('thumbnailsClick', { index });
	};
</script>

<div class="embla_gallery flex justify-between mt-6">
	{#each thumbnails as thumbnail, index (thumbnail.src)}
		<button
			on:click={() => {
				thumbnailsClick(index);
			}}
			class={' embla__thumbnail rounded-2xl overflow-hidden border-2 border-transparent transition-all duration-200 '.concat(
				selectedIndex == index ? ' !border-orange active group' : ''
			)}
		>
			<div class="  bg-white">
				<img
					src={thumbnail.src}
					alt={thumbnail.alt}
					class="h-24 group-[.active]:opacity-70 hover:opacity-70"
				/>
			</div>
		</button>
	{/each}
</div>
