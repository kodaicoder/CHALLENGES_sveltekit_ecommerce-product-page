<script>
	import { createEventDispatcher } from 'svelte';
	import Carousel from './Carousel.svelte';
	import prevIcon from '$lib/images/icon-previous.svg';
	import nextIcon from '$lib/images/icon-next.svg';

	export let images;
	export let thumbnails = [];
	let innerWidth = 1024;

	const dispatch = createEventDispatcher();
	$: {
		if (innerWidth <= 768) {
			closeLightBox();
		}
	}
	const closeLightBox = () => {
		dispatch('closeLightBox');
	};
</script>

<svelte:window bind:innerWidth />
<div class=" w-screen h-screen fixed top-0 left-0 z-20 grid place-content-center">
	<button
		on:click={closeLightBox}
		class="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-75 cursor-default"
	/>
	<div class="relative">
		<div class="absolute top-0 left-0 z-30 bg-transparent -translate-x-1/2 -translate-y-1/2">
			<div class="w-max max-w-2xl">
				<Carousel
					{images}
					{thumbnails}
					isAutoPlay={false}
					isLoop={true}
					arrowMode={true}
					galleryMode={true}
				>
					<img
						slot="prevBtn"
						src={prevIcon}
						alt="previous"
						class="fixed w-5 -translate-x-1 transition-all duration-200 group-hover:filter-orange"
					/>
					<img
						slot="nextBtn"
						src={nextIcon}
						alt="next"
						class="fixed w-5 translate-x-1 transition-all duration-200 group-hover:filter-orange"
					/>
				</Carousel>
			</div>
		</div>
	</div>
</div>
