<script lang="ts">
	import '../app.css';

	let { children, data } = $props();

	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { Toaster } from "$lib/components/ui/sonner/index.js";
</script>

<svelte:head>
	<title>DevSecOps</title>
</svelte:head>

<Toaster position="top-center" />

{#if data.user}
	<Sidebar.Provider>
		<AppSidebar user={data.user} />
		<Sidebar.Inset>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
{:else}
	{@render children()}
{/if}


