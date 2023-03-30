<script>
	import { cartStore } from '$lib/stores/cart_store.js';

	import plusIcon from '$lib/images/icon-plus.svg';
	import minusIcon from '$lib/images/icon-minus.svg';
	import cartIcon from '$lib/images/icon-cart.svg';

	/**
	 * @type {{ id: number; name: string; fullPrice: number; discountPercent: number;images:any; }} */
	export let item;

	let maxlength = 10;
	$: itemQty = '';

	/**
	 * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event */
	const handleInput = (event) => {
		const regex = /^[0-9]*$/;
		const input = event.currentTarget.value;
		if (regex.test(input)) {
			itemQty = input;
		} else {
			event.currentTarget.value = itemQty;
		}
	};

	function itemDecrease() {
		let parseQTY = parseInt(itemQty) || 0;
		if (parseQTY > 1) {
			itemQty = (parseQTY - 1).toString();
		} else {
			itemQty = '';
		}
	}

	function itemIncrease() {
		let parseQTY = parseInt(itemQty) || 0;
		//check if item qty is exceed max length it will do nothing
		if ((parseQTY + 1).toString().length <= maxlength) {
			itemQty = (parseQTY + 1).toString();
		}
	}

	function addToCart() {
		const { id, name, fullPrice, discountPercent, images } = item;
		let price = fullPrice * ((100 - discountPercent) / 100);
		let parseQTY = parseInt(itemQty) || 0;
		let [{ src: thumbnailSrc }] = images.thumbnailImages.filter(
			(thumbnailImage) => thumbnailImage.isMain
		);
		cartStore.addItem({ id, name, price, qty: parseQTY, total: price * parseQTY, thumbnailSrc });
		itemQty = '';
	}
</script>

<div class="flex flex-col md:flex-row gap-4 lg:grid-flow-col-dense">
	<!--? Quantity Controller -->
	<div
		class="bg-lightGrayishBlue grid grid-flow-col gap-4 justify-items-center px-4 md:w-3/4 lg:p-0 rounded-lg"
	>
		<button
			on:click={itemDecrease}
			disabled={itemQty == '' || itemQty == '0'}
			class="h-full px-4
                transition-all duration-150
                active:opacity-30 lg:hover:opacity-60
                disabled:grayscale disabled:active:opacity-100"
		>
			<img src={minusIcon} alt="minus item" />
		</button>

		<input
			type="text"
			inputmode="numeric"
			class="bg-transparent w-full text-center font-semibold outline-1 py-4"
			placeholder="0"
			on:input={handleInput}
			bind:value={itemQty}
			{maxlength}
		/>

		<button
			on:click={itemIncrease}
			class="h-full px-4
                transition-all duration-150
                active:opacity-30 lg:hover:opacity-60"
		>
			<img src={plusIcon} alt="plus item" />
		</button>
	</div>
	<!--? Add to cart Button -->
	<button
		disabled={itemQty == '' || itemQty == '0'}
		on:click={addToCart}
		class="flex justify-center items-center gap-2 bg-orange text-white whitespace-nowrap p-4 lg:px-auto w-full rounded-xl
		shadow-2xl shadow-orange transition-all duration-300
            active:opacity-30 lg:hover:opacity-60
          disabled:bg-gray-400 disabled:active:opacity-100 disabled:shadow-none"
	>
		<img src={cartIcon} alt="cart" class="invert brightness-0" />
		Add to cart
	</button>
</div>
