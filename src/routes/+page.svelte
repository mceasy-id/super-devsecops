<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  let { data } = $props<{ data: { dashboard: any[]; }}>();

  const chartConfig = {
    total: {
      label: "Digest",
      color: "#2563eb"
    }
  } satisfies Chart.ChartConfig;
</script>

<svelt:head>
  <title>DevSecOps</title>
  <meta name="description" content="Home" />
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
          <Breadcrumb.Page>Home</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>
</header>

<div class="flex flex-1 flex-col gap-4 p-4 pt-0">

  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Statistics Build Image</h1>
  </div>

  <Card.Root>
    <Card.Content>
      <Chart.Container config={chartConfig} class="min-h-[200px] w-full px-32">
        <BarChart
          orientation="horizontal"
          data={data.dashboard} 
          x="total" 
          y="repo"
        >
          {#snippet tooltip()}
            <Chart.Tooltip />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>

</div>
