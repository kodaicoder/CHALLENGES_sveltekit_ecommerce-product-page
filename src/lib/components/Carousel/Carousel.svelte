<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import Gallery from './Gallery.svelte';
	import LightBox from './LightBox.svelte';

	export let images;
	export let thumbnails = [];
	export let isAutoPlay = false;
	export let isLoop = false;
	export let lightBoxEnable = false;
	export let arrowMode = false;
	export let dotMode = false;
	export let galleryMode = false;

	let emblaApi;
	$: isLightBoxShow = false;
	$: selectedIndex = 0;

	const autoplayOptions = {
		delay: 5000,
		playOnInit: isAutoPlay,
		stopOnInteraction: false,
		stopOnMouseEnter: true
	};

	const emblaConfig = {
		options: { loop: isLoop },
		plugins: [Autoplay(autoplayOptions)]
	};
	const onInit = (event) => {
		emblaApi = event.detail;
		emblaApi.on('select', onSettle);
	};
	const onSettle = () => {
		selectedIndex = emblaApi.selectedScrollSnap();
	};
	const scrollPrev = () => {
		emblaApi.scrollPrev();
	};
	const scrollNext = () => {
		emblaApi.scrollNext();
	};
	const scrollTo = (index) => {
		selectedIndex = index;
		emblaApi.scrollTo(index);
	};

	const thumbnailsClick = (event) => {
		selectedIndex = event.detail.index;
		emblaApi.scrollTo(selectedIndex);
	};

	const toggleLightBox = (event) => {
		isLightBoxShow = !isLightBoxShow;
	};
</script>

<div class="h-full">
	<div class="relative">
		<div class="overflow-hidden" use:emblaCarouselSvelte={emblaConfig} on:init={onInit}>
			<div class="flex h-full">
				{#if lightBoxEnable}
					{#each images as image (image.src)}
						<div class="flex flex-[0_0_100%] min-w-0 justify-center">
							<button class="lg:rounded-2xl overflow-hidden" on:click={toggleLightBox}>
								<img src={image.src} alt={image.alt} />
							</button>
						</div>
					{/each}
				{:else}
					{#each images as image (image.src)}
						<div class="flex flex-[0_0_100%] min-w-0 justify-center">
							<img src={image.src} alt={image.alt} class="lg:rounded-2xl" />
						</div>
					{/each}
				{/if}
			</div>
		</div>
		{#if arrowMode}
			<button class="embla__prev group" on:click={scrollPrev}>
				<div class="content__button__prev">
					<slot name="prevBtn">
						<div class="prev"><b>➤</b></div>
					</slot>
				</div>
			</button>
			<button class="embla__next group" on:click={scrollNext}>
				<div class="content__button__next">
					<slot name="nextBtn">
						<div class="next"><b>➤</b></div>
					</slot>
				</div>
			</button>
		{/if}
		{#if dotMode}
			<!-- flex gap-6 absolute bottom-3 justify-center w-full -->
			<div class="embla__dots">
				{#each images as image, index (image.src)}
					<button
						on:click={() => {
							scrollTo(index);
						}}
						class={'embla__dot'.concat(selectedIndex == index ? ' embla__dot--selected' : '')}
					/>
				{/each}
			</div>
		{/if}
	</div>
	{#if galleryMode && thumbnails.length > 0}
		<Gallery {thumbnails} {selectedIndex} on:thumbnailsClick={thumbnailsClick} />
	{/if}
</div>

{#if isLightBoxShow}
	<LightBox {images} {thumbnails} on:closeLightBox={toggleLightBox} />
{/if}

<style>
	.embla {
		height: inherit;
		overflow: hidden;
	}
	.embla__container {
		display: flex;
		height: inherit;
	}
	.embla__slide {
		display: flex;
		justify-content: center;
		flex: 0 0 100%;
		min-width: 0;
		/* padding-left: 0.5rem;
		padding-right: 0.5rem; */
	}

	.embla__prev,
	.embla__next {
		display: flex;
		overflow: hidden;
		position: absolute;
		/* transition-property: all;
		transition-duration: 200ms;
		height: 100%;*/
		background-color: white;
		border-radius: 99999px;
		padding: 5%;
	}

	.embla__prev {
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.embla__next {
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	@media screen and (min-width: 1024px) {
		.embla__prev {
			left: -5%;
		}

		.embla__next {
			right: -5%;
		}
	}

	.content__button__prev,
	.content__button__next {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.prev,
	.next {
		position: fixed;
	}
	.prev {
		transform: rotate(180deg);
	}

	.embla__dots {
		display: flex;
		position: absolute;
		bottom: 0.75rem;
		justify-content: center;
		gap: 2rem;
		width: 100%;
	}
	.embla__dot {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 99999px;
		background-color: rgba(100, 100, 100, 0.4);
	}
	.embla__dot::after {
		content: '';
	}
	.embla__dot--selected {
		background-color: rgb(50, 50, 50);
	}
</style>
