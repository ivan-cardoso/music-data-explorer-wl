"use client";

import type { Track } from "@/lib/types/lastfm";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDuration } from "@/lib/utils/formatter";

interface TrackDurationLineChartProps {
  tracks: Track[];
}

export function TrackDurationLineChart({
  tracks,
}: TrackDurationLineChartProps) {
  const data = tracks
    .filter((t) => t.duration > 0)
    .map((track, index) => ({
      name: `Track ${index + 1}`,
      duration: track.duration,
      trackName: track.name,
    }));

  if (data.length === 0) {
    return (
      <div className="text-muted-foreground p-8 text-center">
        No duration data available
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Track Duration Distribution
      </h2>

      <div className="grid grid-cols-3 h-96  rounded-lg p-4 shadow-sm">
        <div className="col-span-3 lg:col-span-3 bg-card p-5 rounded-lg border border-border">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickFormatter={(v) => formatDuration(v)}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.145 0 0)",
                  border: "1px solid oklch(0.145 0 0)",
                  borderRadius: "0.5rem",
                  color: "white",
                }}
                formatter={(value: number) => [
                  formatDuration(value),
                  "Duration",
                ]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.trackName;
                  }
                  return label;
                }}
              />

              <Line
                type="monotone"
                dataKey="duration"
                stroke="#ed5724"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
