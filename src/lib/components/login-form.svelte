<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { GithubIcon } from "@lucide/svelte";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Welcome back</Card.Title>
			<Card.Description>Login with your Github account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				<div class="flex flex-col gap-4">
					<a href="/auth/login">
						<Button class="w-full h-12 bg-[#0b458c] cursor-pointer hover:bg-[#0b458c]">
							<GithubIcon /> GITHUB
						</Button>
					</a>
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>
