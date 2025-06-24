<script lang="ts" module>
	import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
	import FrameIcon from "@lucide/svelte/icons/frame";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import MapIcon from "@lucide/svelte/icons/map";
	import GithubIcon from "@lucide/svelte/icons/github";

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
				title: "Github",
				url: "https://github.com/mceasy-id",
				icon: GithubIcon,
			},
		],
		navMain: [
			{
				title: "Kong Production",
				url: "https://konga-gateway.mceasy.com",
				icon: RocketIcon,
				isActive: false,
			},
			{
				title: "Kong Staging",
				url: "https://konga-dev.mceasy.cloud",
				icon: CloudMoonIcon,
				isActive: false,
			},
			{
				title: "Kong BRI",
				url: "#",
				icon: BanknoteIcon,
				isActive: false,
			},
		],
		navMonitor: [
			{
				title: "Grafana kOps",
				url: "https://monitoring.mceasy.com",
				icon: ViewIcon,
			},
			{
				title: "Grafana EKS",
				url: "https://grafana.mceasy.com",
				icon: GitGraphIcon,
			},
			{
				title: "Grafana Alibaba",
				url: "https://monitoring.mceasy.cloud",
				icon: SandwichIcon,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "https://teams.microsoft.com/l/chat/0/0?users=ahmad.ardiansyah@mceasy.co.id",
				icon: LifeBuoyIcon,
			},
		],
	};
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavDevops from "./nav-devops.svelte";
	import NavSecondary from "./nav-secondary.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { BanknoteIcon, CloudMoonIcon, GitGraphIcon, UserIcon, ViewIcon, RocketIcon, SandwichIcon } from "@lucide/svelte";

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
		<NavMain title={"Monitoring"} items={data.navMonitor} />
		<NavMain title={"Gateway"} items={data.navMain} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={user ? { name: user.name ?? user.login, email: user.email ?? user.type, avatar_url: user.avatar_url } : null} />
	</Sidebar.Footer>
</Sidebar.Root>
