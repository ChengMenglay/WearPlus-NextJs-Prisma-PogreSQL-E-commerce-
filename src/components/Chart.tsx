"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer, // Import ResponsiveContainer
} from "recharts";
import { formatter } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6", // blue-500
  },
  orders: {
    label: "Orders",
    color: "#10b981", // emerald-500
  },
} satisfies ChartConfig;

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          {data[0]?.month} - {data[data.length - 1]?.month}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full h-[350px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) =>
                  formatter.format(value).replace(/\D00$/, "")
                }
                tickLine={false}
                axisLine={false}
                label={{ value: "Revenue", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                label={{ value: "Orders", angle: 90, position: "insideRight" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? formatter.format(Number(value)) : value,
                  name === "revenue" ? "Revenue" : "Orders",
                ]}
              />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[4, 4, 0, 0]}
                yAxisId="left"
              >
                <LabelList
                  dataKey="revenue"
                  position="top"
                  formatter={(value: string) =>
                    formatter.format(Number(value)).replace(/\D00$/, "")
                  }
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
              <Bar
                dataKey="orders"
                fill="var(--color-orders)"
                radius={[4, 4, 0, 0]}
                yAxisId="right"
              >
                <LabelList
                  dataKey="orders"
                  position="top"
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
