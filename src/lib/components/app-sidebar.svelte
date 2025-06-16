<script lang="ts" module>
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import BotIcon from "@lucide/svelte/icons/bot";
	import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
	import FrameIcon from "@lucide/svelte/icons/frame";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import MapIcon from "@lucide/svelte/icons/map";
	// import SendIcon from "@lucide/svelte/icons/send";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import GithubIcon from "@lucide/svelte/icons/github";
	import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

	const data = {
		navDevOps:[
			{
				title: "Dashboard",
				url: "/",
				icon: ChartPieIcon,
				isActive: true,
			},
			{
				title: "Digest",
				url: "/digest",
				icon: MapIcon,
			},
			{
				title: "Services",
				url: "/services",
				icon: FrameIcon,
			},
			{
				title: "Monitoring",
				url: "https://monitoring.mceasy.com",
				icon: SquareTerminalIcon,
			},
			{
				title: "Github",
				url: "https://github.com/mceasy-id",
				icon: GithubIcon,
			},
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminalIcon,
				isActive: false,
				items: [
					{
						title: "History",
						url: "#",
					},
					{
						title: "Starred",
						url: "#",
					},
					{
						title: "Settings",
						url: "#",
					},
				],
			},
			{
				title: "Models",
				url: "#",
				icon: BotIcon,
				items: [
					{
						title: "Genesis",
						url: "#",
					},
					{
						title: "Explorer",
						url: "#",
					},
					{
						title: "Quantum",
						url: "#",
					},
				],
			},
			{
				title: "Documentation",
				url: "#",
				icon: BookOpenIcon,
				items: [
					{
						title: "Introduction",
						url: "#",
					},
					{
						title: "Get Started",
						url: "#",
					},
					{
						title: "Tutorials",
						url: "#",
					},
					{
						title: "Changelog",
						url: "#",
					},
				],
			},
			{
				title: "Settings",
				url: "#",
				icon: Settings2Icon,
				items: [
					{
						title: "General",
						url: "#",
					},
					{
						title: "Team",
						url: "#",
					},
					{
						title: "Billing",
						url: "#",
					},
					{
						title: "Limits",
						url: "#",
					},
				],
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "https://teams.microsoft.com/l/chat/0/0?users=ahmad.ardiansyah@mceasy.co.id",
				icon: LifeBuoyIcon,
			},
			// {
			// 	title: "Feedback",
			// 	url: "#",
			// 	icon: SendIcon,
			// },
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: FrameIcon,
			},
			{
				name: "Sales & Marketing",
				url: "#",
				icon: ChartPieIcon,
			},
			{
				name: "Travel",
				url: "#",
				icon: MapIcon,
			},
		],
	};
</script>

<script lang="ts">
	// import NavMain from "./nav-main.svelte";
	import NavDevops from "./nav-devops.svelte";
	// import NavProjects from "./nav-projects.svelte";
	import NavSecondary from "./nav-secondary.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";

	let { user, ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<Avatar.Root class="size-8 rounded-lg">
								<Avatar.Image src={"/favicon.png"} alt={"McEasy"} />
								<Avatar.Fallback class="rounded-lg">ME</Avatar.Fallback>
							</Avatar.Root>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">McEasy</span>
								<span class="truncate text-xs">DevSecOps</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavDevops items={data.navDevOps} />
		<!-- <NavMain items={data.navMain} /> -->
		<!-- <NavProjects projects={data.projects} /> -->
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={user ? { name: user.name ?? user.login, email: user.email ?? user.type, avatar_url: user.avatar_url } : null} />
	</Sidebar.Footer>
</Sidebar.Root>
