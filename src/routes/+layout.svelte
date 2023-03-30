<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/Nav/NavBar.svelte';
	import '../app.css';
</script>

<div>
	<NavBar />

	<main>
		<slot />
	</main>
	<!-- <footer>
		<Footer />
	</footer> -->
</div>
