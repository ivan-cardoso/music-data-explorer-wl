"use client"

import type { Track } from "@/lib/types/lastfm"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatDuration } from "@/lib/utils/formatter"

interface AlbumDurationChartProps {
  tracks: Track[]
}

export function AlbumDurationChart({ tracks }: AlbumDurationChartProps) {
  const data = tracks
    .filter((t) => t.duration > 0)
    .map((track, index) => ({
      name: `Track ${index + 1}`,
      duration: track.duration,
      trackName: track.name,
    }))

  if (data.length === 0) {
    return <div className="text-muted-foreground p-8 text-center">No duration data available</div>
  }

  return (
    <div className="w-full h-80 bg-card rounded-lg p-4 border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) => [formatDuration(value), "Duration"]}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                return payload[0].payload.trackName
              }
              return label
            }}
          />
          <Bar dataKey="duration" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
