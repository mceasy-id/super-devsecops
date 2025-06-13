<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
	import Rocket from "@lucide/svelte/icons/rocket";
	import { toast } from "svelte-sonner";
  import TableIcon from "@lucide/svelte/icons/table";
  import ListIcon from "@lucide/svelte/icons/list";
  import RefreshIcon from "@lucide/svelte/icons/refresh-ccw";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
	import { onMount } from "svelte";

  // let { data } = $props<{ data: { services: any[]; }}>();
  // console.log("Data:", data);
  let data = { services: [] }; // Placeholder for data, replace with actual data fetching logic

  let selectedServices = $state<string[]>([]);
  let viewMode = $state("table");

  const actionDeployNow = async () => {
    if (selectedServices.length === 0) {
      toast.warning("Please select at least one service to deploy.");
    }
  }

  const handleSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      selectedServices.push(target.value);
    } else {
      let f = selectedServices.filter(item => item != target.value);
      selectedServices = f;
    }
  };

  const handleCheckbox = (isSelected: boolean, value: string) => {
    if (isSelected) {
      selectedServices.push(value);
    } else {
      let f = selectedServices.filter(item => item != value);
      selectedServices = f;
    }
  };

  const selectedService = (repo: string) => {
    if (selectedServices.includes(repo)) {
      let f = selectedServices.filter(item => item != repo);
      selectedServices = f;
    } else {
      selectedServices.push(repo);
    }
  };

  let cari = $state("");
  let services = $state(data.services);
  
  $effect(() => {
    if (cari.length > 0) {
      services = data.services.filter((service: any) => service.repo.toLowerCase().includes(cari.toLowerCase()));
    } else {
      services = data.services;
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    }).catch(err => {
      toast.error("Failed to copy!");
      console.error("Failed to copy: ", err);
    });
  };

  const refetchServices = async () => {
    toast.warning("Refetching services...");
    const req = await fetch("https://n8n.mceasy.cloud/webhook/devsecops/repo/status");
    const res = await req.json();
    console.log("Refetched services:", res);
    services = res;
    toast.info("Services refetched!");
  };

  onMount(async () => {
    await refetchServices();
  });
</script>

<svelt:head>
  <title>Quick Deployment</title>
  <meta name="description" content="Quick Deployment" />
</svelt:head>

<header class="flex h-16 shrink-0 items-center gap-2">
  <div class="flex items-center gap-2 px-4">
    <Sidebar.Trigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item class="hidden md:block">
          <Breadcrumb.Link href="/">DevSecOps</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator class="hidden md:block" />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Quick Deployment</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
</header>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Quick Deployment</h1>
    <Input
      type="text"
      placeholder="Search services and enter"
      class="w-64"
      value={cari}
      onchange={(e: any) => cari = e.target.value}
      />
    <div class="actions flex justify-between">
      <ToggleGroup.Root variant="outline" type="multiple">
        <ToggleGroup.Item value="table" aria-label="Table" onclick={() => refetchServices()}>
          <RefreshIcon className="h-4 w-4" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="table" aria-label="Table" onclick={() => viewMode = "table"}>
          <TableIcon className="h-4 w-4" />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="card" aria-label="Card" onclick={() => viewMode = "card"}>
          <ListIcon className="h-4 w-4" />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  </div>

  {#if viewMode === "card"}
  <div id="card" class="grid auto-rows-min gap-4 grid-cols-3">
    {#each services as service}
      <Label
        class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
      >
        <Checkbox
          onCheckedChange={e => handleCheckbox(e, service.repo)}
          id={service.repo}
          value={service.repo}
          checked={selectedServices.includes(service.repo) ? true : false}
          onclick={e => handleSelected(e)}
          class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div class="grid gap-1.5 font-normal">
          <p class="text-sm font-medium leading-none">{service.repo}</p>
          <p class="text-muted-foreground text-sm">
            {service.k8s === service.db.digest ? "⚡ deployed" : "🟢 ready to deploy"}
          </p>
        </div>
      </Label>
    {/each}
  </div>
  {/if}
  
  {#if viewMode === "table"}
  <div id="table" class="grid auto-rows-min gap-4 grid-cols-1">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[12px]"></Table.Head>
          <Table.Head>Repository</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Current</Table.Head>
          <Table.Head>Latest</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each services as service}
          <Table.Row>
            <Table.Cell>
              <input 
                type="checkbox" 
                value={service.repo} 
                onclick={e => handleSelected(e)} 
                checked={selectedServices.includes(service.repo) ? true : false} 
                />
            </Table.Cell>
            <Table.Cell class="font-medium cursor-pointer" onclick={() => selectedService(service.repo)}>{service.repo}</Table.Cell>
            <Table.Cell class="text-center">{service.k8s === service.db.digest ? "⚡" : "🟢"}</Table.Cell>
            <Table.Cell>
              <button onclick={() => copyToClipboard(service.k8s)}>
                {String(service.k8s).slice(0, 50)}...
              </button>
            </Table.Cell>
            <Table.Cell>
              <button onclick={() => copyToClipboard(service.db.digest)}>
                {String(service.db.digest).slice(0, 50)}...
              </button>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  {/if}

  <div class="fixed bottom-10 right-10 z-50">
    <Button onclick={() => actionDeployNow()} class="rounded-2xl cursor-pointer shadow-lg py-8 text-xl w-46">
      Deploy now <Rocket size={32} />
    </Button>
  </div>
</div>