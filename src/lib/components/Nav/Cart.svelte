<script>
	import { cartStore } from '$lib/stores/cart_store.js';
	import cartImage from '$lib/images/icon-cart.svg';
	import CartCard from './CartCard.svelte';

	let cartShow = false;
	let totalQty = 0;
	$: quantities = $cartStore.cartItems.map((item) => item.qty);
	$: if (quantities.length > 0) {
		totalQty = quantities.reduce((accumulator, currentValue) => accumulator + currentValue);
	} else {
		totalQty = 0;
	}
</script>

<div class="lg:relative">
	<button on:click={() => (cartShow = !cartShow)} class="relative px-4 py-6 h-full group">
		<img
			src={cartImage}
			alt="cart"
			class="transition-all duration-300 group-hover:brightness-0 {cartShow ? 'brightness-0' : ''}"
		/>
		{#if totalQty > 0}
			<span
				class="pointer-events-none absolute top-4 right-2 bg-orange rounded-full px-1 text-xs text-white"
				>{totalQty}
			</span>
		{/if}
	</button>

	<CartCard bind:isShowCart={cartShow} />
</div>
