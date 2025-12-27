"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { maintenanceRequests, teams } from "@/lib/mock-data"

const requestCountsByTeam = teams.map(team => {
    const requestCount = maintenanceRequests.filter(req => req.teamId === team.id).length;
    return {
        team: team.name,
        requests: requestCount,
    }
});

const chartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--chart-1))",
  },
}

export default function RequestsByTeamChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={requestCountsByTeam}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="team"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="requests" fill="var(--color-requests)" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
