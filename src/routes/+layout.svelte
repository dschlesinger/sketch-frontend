<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import Button from '$lib/components/ui/button/button.svelte';

	import { login } from '$lib/supabase/user.svelte';

	import { SvelteToast } from '@zerodevx/svelte-toast'

	// Optionally set default options here
	const options = {}
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SvelteToast {options} />

<div class="flex flex-col h-screen w-screen">
	<nav class="min-h-16 w-full flex bg-slate-950 items-center shrink-0">
		<Button onclick={login} class="ml-auto mr-10" variant="outline">
			Login
		</Button>
	</nav>

	<!-- Let this fill the rest of the screen and handle its own scroll -->
	<div class="grow w-full overflow-hidden">
		{@render children()}
	</div>
</div>
