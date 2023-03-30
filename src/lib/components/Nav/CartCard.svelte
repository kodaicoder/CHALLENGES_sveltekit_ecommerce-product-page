<script>
	import { cartStore } from '$lib/stores/cart_store.js';
	import { slide, fade } from 'svelte/transition';
	import binIcon from '$lib/images/icon-delete.svg';
	import closeIcon from '$lib/images/icon-close.svg';

	export let isShowCart = false;
</script>

{#if isShowCart}
	<div
		transition:slide
		class="absolute my-2 w-screen max-w-[22rem] lg:top-3/4 left-1/2 -translate-x-1/2 rounded-xl bg-white shadow-2xl"
	>
		<div class="flex p-4 text-veryDarkBlue border-b-2">
			<h1 class="font-bold text-xl">Cart</h1>
			<button
				class="ml-auto active:brightness-0 lg:hover:brightness-0"
				on:click={() => (isShowCart = !isShowCart)}
			>
				<img src={closeIcon} alt="close" />
			</button>
		</div>
		<div class="p-4">
			{#if $cartStore.cartItems.length > 0}
				<div in:slide={{ duration: 300, axis: 'x' }} class="grid gap-6">
					{#each $cartStore.cartItems as item}
						<div
							in:slide={{ duration: 300, axis: 'x' }}
							class="grid justify-between items-stretch grid-flow-col-dense"
						>
							<div class="overflow-hidden rounded-md">
								<img src={item.thumbnailSrc} alt={`${item.name} thumbnail`} class="w-14" />
							</div>
							<div class="grid whitespace-nowrap overflow-hidden">
								<p>{item.name}</p>
								<p>
									{item.price} x {item.qty}
									<span class=" float-right font-bold text-veryDarkBlue">
										total: ${item.total}</span
									>
								</p>
							</div>
							<div class="self-center h-full">
								<button
									on:click={() => {
										cartStore.removeItem(item);
									}}
									class="h-full p-1
                                    transition-all duration-200
                                    active:brightness-0 lg:hover:brightness-0"
								>
									<img src={binIcon} alt="bin" />
								</button>
							</div>
						</div>
					{/each}
					<button
						class="p-4 rounded-xl font-bold text-white bg-orange
                        transition-all duration-300
                        active:opacity-30 lg:hover:opacity-60"
					>
						Checkout
					</button>
				</div>
			{:else}
				<div class="flex h-40 place-content-center items-center">
					<p class="font-bold whitespace-nowrap">Your cart is empty.</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
