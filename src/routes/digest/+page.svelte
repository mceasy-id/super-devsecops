<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Input } from "$lib/components/ui/input";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import RefreshIcon from "@lucide/svelte/icons/refresh-ccw";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import { toast } from "svelte-sonner";

  let { data } = $props<{data: { digests: any[]}}>();
  
  const copyToClipboard = (digest: string) => {
    navigator.clipboard.writeText(digest);
    toast.success("Digest copied to clipboard");
  };

  let cari = $state("");
  let digests = $state(data.digests);

  const refetchServices = async () => {
    digests = data.digests;
  };

  $effect(() => {
    if (cari.length > 0) {
      digests = data.digests.filter((service: any) => service.repo.toLowerCase().includes(cari.toLowerCase()));
    } else {
      digests = data.digests;
    }
  });
</script>

<svelt:head>
  <title>Digest</title>
  <meta name="description" content="Digest" />
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
          <Breadcrumb.Page>Digest</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
</header>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Digest</h1>
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
      </ToggleGroup.Root>
    </div>
  </div>

  <div class="grid auto-rows-min gap-4 grid-cols-1">
    <Table.Root>
      <Table.Header>
        <Table.Row>
        <Table.Head class="w-[12px]"></Table.Head>
        <Table.Head>Repository</Table.Head>
        <Table.Head>Branch</Table.Head>
        <Table.Head>Digest</Table.Head>
        <Table.Head>Last Build</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each digests as service}
          <Table.Row>
            <Table.Cell><input type="checkbox" /></Table.Cell>
            <Table.Cell class="font-medium">{service.repo}</Table.Cell>
            <Table.Cell>{service.branch}</Table.Cell>
            <Table.Cell><button onclick={() => copyToClipboard(String(service.digest))} class="cursor-pointer">{String(service.digest).slice(0,60)}</button></Table.Cell>
            <Table.Cell>{new Date(service.created_at).toLocaleString()}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>