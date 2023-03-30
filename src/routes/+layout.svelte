<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/Nav/NavBar.svelte';
	import '../app.css';
</script>

<div>
	<NavBar />

	<main class="lg:mt-40">
		<slot />
	</main>
	<footer class="mt-20">
		<Footer />
	</footer>
</div>
