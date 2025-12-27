"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { maintenanceRequests } from "@/lib/mock-data"
import { MaintenanceRequestStatus } from "@/lib/types"

const statusData = maintenanceRequests.reduce((acc, req) => {
  acc[req.status] = (acc[req.status] || 0) + 1;
  return acc;
}, {} as Record<MaintenanceRequestStatus, number>);

const chartData = Object.entries(statusData).map(([status, count]) => ({
  status,
  count,
}));

const chartConfig = {
  count: {
    label: "Count",
  },
  New: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  "In Progress": {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  Repaired: {
    label: "Repaired",
    color: "hsl(var(--chart-3))",
  },
  Scrap: {
    label: "Scrap",
    color: "hsl(var(--chart-4))",
  },
}

export default function RequestsByStatusChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={chartConfig[entry.status as keyof typeof chartConfig].color} />
          ))}
        </Pie>
        <ChartLegend
            content={<ChartLegendContent nameKey="status" />}
            className="-mt-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
