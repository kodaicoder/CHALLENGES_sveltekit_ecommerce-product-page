<script>
	import ProductDetail from './../lib/components/Product/ProductDetail.svelte';
	import ProductToCart from '$lib/components/Product/ProductToCart.svelte';

	import prevIcon from '$lib/images/icon-previous.svg';
	import nextIcon from '$lib/images/icon-next.svg';

	///? this data may be coming from API in real world
	import shoesImage1 from '$lib/images/image-product-1.jpg';
	import shoesImage2 from '$lib/images/image-product-2.jpg';
	import shoesImage3 from '$lib/images/image-product-3.jpg';
	import shoesImage4 from '$lib/images/image-product-4.jpg';
	import thumbImage1 from '$lib/images/image-product-1-thumbnail.jpg';
	import thumbImage2 from '$lib/images/image-product-2-thumbnail.jpg';
	import thumbImage3 from '$lib/images/image-product-3-thumbnail.jpg';
	import thumbImage4 from '$lib/images/image-product-4-thumbnail.jpg';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	const itemData = {
		id: 1,
		name: 'Fall Limited Edition Sneakers',
		by: 'Sneaker Company',
		fullPrice: 250.0,
		discountPercent: 50,
		description:
			'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
		images: {
			fullImages: [
				{ imageId: 1, src: shoesImage1, alt: 'Fall Limited Edition Sneakers 1', isMain: true },
				{ imageId: 2, src: shoesImage2, alt: 'Fall Limited Edition Sneakers 2', isMain: false },
				{ imageId: 3, src: shoesImage3, alt: 'Fall Limited Edition Sneakers 3', isMain: false },
				{ imageId: 4, src: shoesImage4, alt: 'Fall Limited Edition Sneakers 4', isMain: false }
			],
			thumbnailImages: [
				{
					thumbnailId: 1,
					src: thumbImage1,
					alt: 'Fall Limited Edition Sneakers thumbnail 1',
					isMain: true
				},
				{
					thumbnailId: 2,
					src: thumbImage2,
					alt: 'Fall Limited Edition Sneakers thumbnail 2',
					isMain: false
				},
				{
					thumbnailId: 3,
					src: thumbImage3,
					alt: 'Fall Limited Edition Sneakers thumbnail 3',
					isMain: false
				},
				{
					thumbnailId: 4,
					src: thumbImage4,
					alt: 'Fall Limited Edition Sneakers thumbnail 4',
					isMain: false
				}
			]
		}
	};

	let innerWidth = 1440;
	let galleryShow = false;

	//? fix issue while user adjust width of page and didn't close side nav menu
	$: {
		if (innerWidth > 768) {
			galleryShow = true;
		} else {
			galleryShow = false;
		}
	}
</script>

<svelte:window bind:innerWidth />
<div
	class="grid grid-flow-row mt-16 pt-1 lg:mx-44 lg:my-24 lg:grid-cols-2 lg:gap-24 lg:items-center"
>
	<!--? Carousel Section -->
	<div class="w-full">
		<Carousel
			images={itemData.images.fullImages}
			thumbnails={itemData.images.thumbnailImages}
			isAutoPlay={true}
			isLoop={true}
			arrowMode={!galleryShow}
			galleryMode={galleryShow}
			dotMode={false}
		>
			<img
				slot="prevBtn"
				src={prevIcon}
				alt="previous"
				class="fixed w-2 transition-all duration-200 group-hover:filter-orange"
			/>
			<img
				slot="nextBtn"
				src={nextIcon}
				alt="next"
				class="fixed w-2 transition-all duration-200 group-hover:filter-orange"
			/>
		</Carousel>
	</div>
	<!--? Product Section -->
	<div class="m-6 grid gap-4">
		<!--? Product Detail -->
		<ProductDetail item={itemData} />
		<!--? Footer Action -->
		<ProductToCart item={itemData} />
	</div>
</div>
