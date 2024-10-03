"use client";

import {
  Bar,
  BarChart,
  XAxis,
  Line,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { DateTime } from "luxon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import "../globals.css";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A stacked bar chart with a legend";

const data = [
  {
    Machine: "Water",
    StartDateTime: "2024-10-02T12:03:23.2770707-07:00",
    EndDateTime: "2024-10-02T15:37:06.0993636-07:00",
    RunKey: "All_Build_62_20241002_120323",
    OutputLocation:
      "\\\\localhost\\c$\\MapEngines_AT\\WorkingRootFolder\\All_Build_62_20241002_120323",
    TestCaseResults: {
      Count: 434,
      Passed: 433,
      Failed: 1,
    },
  },
  {
    Machine: "Water",
    StartDateTime: "2024-10-01T12:22:25.6162448-07:00",
    EndDateTime: "2024-10-01T16:11:00.5171566-07:00",
    RunKey: "All_Build_60_20241001_122225",
    OutputLocation:
      "\\\\localhost\\c$\\MapEngines_AT\\WorkingRootFolder\\All_Build_60_20241001_122225",
    TestCaseResults: {
      Count: 434,
      Passed: 413,
      Failed: 21,
    },
  },
  {
    Machine: "Water",
    StartDateTime: "2024-09-30T12:03:14.9211183-07:00",
    EndDateTime: "2024-09-30T15:36:12.4327002-07:00",
    RunKey: "All_Build_59_20240930_120314",
    OutputLocation:
      "\\\\localhost\\c$\\MapEngines_AT\\WorkingRootFolder\\All_Build_59_20240930_120314",
    TestCaseResults: {
      Count: 434,
      Passed: 414,
      Failed: 20,
    },
  },
  {
    Machine: "Water",
    StartDateTime: "2024-09-27T12:03:24.1219371-07:00",
    EndDateTime: "2024-09-27T15:25:38.383983-07:00",
    RunKey: "All_Build_58_20240927_120324",
    OutputLocation:
      "\\\\localhost\\c$\\MapEngines_AT\\WorkingRootFolder\\All_Build_58_20240927_120324",
    TestCaseResults: {
      Count: 434,
      Passed: 401,
      Failed: 33,
    },
  },
  {
    Machine: "Water",
    StartDateTime: "2024-09-27T12:03:24.1219371-07:00",
    EndDateTime: "2024-09-27T15:25:38.383983-07:00",
    RunKey: "All_Build_58_20240927_120324",
    OutputLocation:
      "\\\\localhost\\c$\\MapEngines_AT\\WorkingRootFolder\\All_Build_58_20240927_120324",
    TestCaseResults: {
      Count: 434,
      Passed: 401,
      Failed: 33,
    },
  },
];

const cleanData = data.map((d) => {
  return {
    date: d.StartDateTime,
    runKey: d.RunKey,
    machine: d.Machine,
    timeToComplete: DateTime.fromISO(d.EndDateTime).diff(
      DateTime.fromISO(d.StartDateTime),
      ["hours", "minutes", "seconds"]
    ).minutes,
    passed: d.TestCaseResults.Passed,
    failed: d.TestCaseResults.Failed,
    total: d.TestCaseResults.Count,
  };
});

const chartConfig = {
  passed: {
    label: "passed",
    color: "hsl(var(--chart-2))",
  },
  failed: {
    label: "failed",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { passed, failed, timeToComplete, runKey, machine } =
      payload[0].payload;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p>
          <strong>Date:</strong> {new Date(label).toLocaleString()}
        </p>
        <p>
          <strong>Passed:</strong> {passed}
        </p>
        <p>
          <strong>Failed:</strong> {failed}
        </p>
        <p>
          <strong>Time to Complete:</strong> {timeToComplete}
        </p>
        <p>
          <strong>RunKey:</strong> {runKey}
        </p>
        <p>
          <strong>Machine:</strong> {machine}
        </p>
      </div>
    );
  }

  return null;
};

const CustomLabel = ({ value }: any) => (
  <text x="50%" y="-10" textAnchor="middle" fill="#000">
    {value}
  </text>
);

export function Component() {
  const [timeRange, setTimeRange] = useState("All");

  const filteredData = cleanData
    .filter((item) => {
      const date = new Date(item.date);
      let now = new Date();

      let daysToSubtract = 30;

      switch (timeRange) {
        case "90d":
          daysToSubtract = 90;
          break;
        case "30d":
          daysToSubtract = 30;
          break;
        case "7d":
          daysToSubtract = 7;
          break;
        case "1d":
          daysToSubtract = 1;
          break;
        default:
          break;
      }

      now.setDate(now.getDate() - daysToSubtract);

      return date >= now;
    })
    .sort((a, b) => {
      return (
        DateTime.fromISO(a.date).valueOf() - DateTime.fromISO(b.date).valueOf()
      );
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Testing</CardTitle>
        <CardDescription>Test cases over time.</CardDescription>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="All" className="rounded-lg">
              All
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="1d" className="rounded-lg">
              Last 1 day
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);

                return date.toLocaleString("en-US", {
                  weekday: "short",
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis
              yAxisId="left"
              label={{
                value: "# of Tests",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Minutes", angle: 90, position: "insideRight" }}
            />
            <Tooltip content={CustomTooltip} />
            <Legend />
            {/* Bar chart for passed/failed */}
            <Bar
              yAxisId="left"
              stackId="a"
              dataKey="passed"
              fill="#82ca9d"
              name="Passed"
            />
            <Bar
              yAxisId="left"
              stackId="a"
              dataKey="failed"
              fill="#ff6666"
              name="Failed"
            >
              <LabelList dataKey="total" position="top" />
            </Bar>
            {/* Line chart for timeToComplete */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="timeToComplete"
              stroke="#8884d8"
              name="Time to Complete"
            />
          </ComposedChart>
        </ResponsiveContainer>
        {/* <ChartContainer config={chartConfig}>
          <BarChart data={cleanData} style={{ height: "100%" }}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);

                return date.toLocaleString("en-US");
              }}
            />
            <Bar
              dataKey="passed"
              stackId="a"
              fill="var(--color-passed)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="failed"
              stackId="a"
              fill="var(--color-failed)"
              radius={[4, 4, 0, 0]}
            />
                    <Line yAxisId="right" type="monotone" dataKey="timeToComplete" stroke="#8884d8" name="Time to Complete" />

            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={true}
            />
          </BarChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  );
}
