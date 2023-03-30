<script>
	export let item;
</script>

<div class="grid gap-3">
	<h2 class="font-medium text-orange lg:text-lg">{item.by}</h2>
	<h1 class="font-bold text-3xl text-veryDarkBlue my-3 lg:text-5xl">{item.name}</h1>
	<p>
		{item.description}
	</p>
	<div class="flex flex-wrap gap-x-4 justify-start items-center py-2 my-3">
		<!--? price  -->
		<h1 class="font-bold text-3xl text-veryDarkBlue">
			${(item.fullPrice * ((100 - item.discountPercent) / 100)).toFixed(2)}
		</h1>
		<!--? discount  -->
		{#if item.discountPercent > 0}
			<div class="bg-paleOrange font-bold text-orange p-1 px-2 rounded-md">
				<p>{item.discountPercent}%</p>
			</div>
			<!--? original price -->
			<div class="font-bold ml-auto lg:w-full">
				<s>${item.fullPrice.toFixed(2)}</s>
			</div>
		{/if}
	</div>
</div>
