import { writable } from 'svelte/store';

function cartActions() {
	const initialData = {
		cartItems: []
	};
	const { subscribe, set, update } = writable(initialData);

	const addItem = (
		/** @type {{ id: number; name: string; price: number; qty:number; total: number;thumbnailSrc: any; }} */
		item
	) => {
		update((state) => {
			// Check if the item is already in the cart
			const existingItem = state.cartItems.find((i) => i.name === item.name);
			if (existingItem) {
				// If the item is already in the cart, update its quantity
				const updatedItems = state.cartItems.map((i) => {
					if (i.name === item.name) {
						return { ...i, qty: i.qty + item.qty, total: i.total + item.total };
					} else {
						return i;
					}
				});
				return { cartItems: updatedItems };
			} else {
				// If the item is not in the cart, add it
				return { cartItems: [...state.cartItems, { ...item, qty: item.qty }] };
			}
		});
	};

	const removeItem = (
		/** @type {{ id: number; name: string; price: number; qty:number; total: number;thumbnailImg: any; }} */
		item
	) => {
		update((state) => {
			return { cartItems: state.cartItems.filter((i) => i !== item) };
		});
	};

	const resetCart = () => {
		set(initialData);
	};

	return {
		subscribe,
		addItem,
		removeItem,
		resetCart
	};
}

export const cartStore = cartActions();
