<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { slide, fade } from 'svelte/transition';

	import logoImage from '$lib/images/logo.svg';

	import avatarImage from '$lib/images/image-avatar.png';
	import menuImg from '$lib/images/icon-menu.svg';
	import closeImg from '$lib/images/icon-close.svg';
	import NavLink from './NavLink.svelte';
	import Cart from './Cart.svelte';

	let menuShow = false;
	let innerWidth = 0;

	//? made body no longer scrolls when a side nav is open
	//? and the scroll location is maintained both
	//? when a side nav is open or closed.
	$: {
		if (browser) {
			window.addEventListener('scroll', () => {
				document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
			});
			if (menuShow) {
				const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
				const body = document.body;
				body.style.position = 'fixed';
				body.style.top = `-${scrollY}`;
			} else {
				const body = document.body;
				const scrollY = body.style.top;
				body.style.position = '';
				body.style.top = '';
				window.scrollTo(0, parseInt(scrollY || '0') * -1);
			}
		}
	}

	//? fix issue while user adjust width of page and didn't close side nav menu
	$: {
		if (innerWidth > 768) {
			menuShow = false;
		}
	}

	const closeSideNav = () => {
		menuShow = false;
	};
</script>

<svelte:window bind:innerWidth />
<nav
	class="fixed top-0 left-0 w-full drop-shadow-lg lg:drop-shadow-none bg-white/80 backdrop-blur-sm z-10"
>
	<div
		class="grid grid-flow-col items-center px-6 justify-between lg:w-4/5 lg:mx-auto lg:px-0 lg:border-b-2"
	>
		<div class="flex gap-4 lg:gap-12 items-center">
			<!--? Burger button -->
			<div class="flex lg:hidden justify-end h-full overflow-hidden">
				<button on:click={() => (menuShow = !menuShow)}>
					<img src={menuImg} alt="menu" class="aspect-square" />
				</button>
			</div>

			<!--? LOGO -->
			<a href="#/">
				<img src={logoImage} alt="sneakers logo" class="pb-1" />
			</a>
			<!--? Menu list -->
			<ul class="hidden lg:grid grid-flow-col gap-8">
				<NavLink text="Collections" href="#collections" />
				<NavLink text="Men" href="#men" />
				<NavLink text="Women" href="#women" />
				<NavLink text="About" href="#about" />
				<NavLink text="Contact" href="#contact" />
			</ul>
		</div>
		<!-- Cart & Avatar -->
		<div class="flex gap-6 h-full items-center justify-end">
			<Cart />
			<a href="#profile" class="flex items-center w-1/6 lg:w-1/4 h-full group">
				<img
					src={avatarImage}
					alt="avatar"
					class=" aspect-square object-contain h-fit rounded-full border-2 border-transparent
                            transition-all duration-300 group-hover:border-orange
                            {$page.url.hash === `#profile` ? 'border-orange' : ''}"
				/>
			</a>
		</div>
	</div>
</nav>
{#if menuShow}
	<aside>
		<!-- Backdrop -->
		<div class="lg:hidden">
			<button
				transition:fade
				on:click={closeSideNav}
				class="fixed top-0 right-0 w-full h-full cursor-default backdrop-brightness-50 z-20 overflow-hidden"
			/>
			<!-- Menu -->
			<div
				transition:slide={{ duration: 300, axis: 'x' }}
				class="fixed top-0 left-0 bg-white w-3/5 h-full z-30 overflow-hidden overflow-y-auto"
			>
				<div class="flex">
					<button class="mr-auto m-3 p-3 group" on:click={closeSideNav}>
						<img src={closeImg} alt="close group-hover:brightness-0" />
					</button>
				</div>
				<div class="p-6">
					<ul class="flex flex-col">
						<NavLink text="Collections" href="#collections" on:linkClick={closeSideNav} />
						<NavLink text="Men" href="#men" on:linkClick={closeSideNav} />
						<NavLink text="Women" href="#women" on:linkClick={closeSideNav} />
						<NavLink text="About" href="#about" on:linkClick={closeSideNav} />
						<NavLink text="Contact" href="#contact" on:linkClick={closeSideNav} />
					</ul>
				</div>
			</div>
		</div>
	</aside>
{/if}
