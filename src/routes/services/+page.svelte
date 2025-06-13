<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { toast } from "svelte-sonner";

  let { data } = $props<{data: { digest: any[]; }}>();
  
  const copyToClipboard = (digest: string) => {
    navigator.clipboard.writeText(digest);
    toast("Digest copied to clipboard");
  };
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
          <Breadcrumb.Page>Services</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
</header>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
  <div class="grid auto-rows-min gap-4 grid-cols-1">
    <Table.Root>
      <Table.Header>
        <Table.Row>
        <Table.Head>No</Table.Head>
        <Table.Head>Repository</Table.Head>
        <Table.Head>Created At</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.digests as service, i}
          <Table.Row>
            <Table.Cell>{i+1}</Table.Cell>
            <Table.Cell class="font-medium">{service.repo}</Table.Cell>
            <Table.Cell>{new Date(service.created_at)}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>