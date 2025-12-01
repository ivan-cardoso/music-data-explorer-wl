"use client"

import type { Track } from "@/lib/types/lastfm"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatNumber } from "@/lib/utils/formatter"

interface TrackPopularityChartProps {
  tracks: Track[]
}

export function TrackPopularityChart({ tracks }: TrackPopularityChartProps) {
  const data = tracks.map((track) => ({
    name: track.name.length > 20 ? track.name.slice(0, 20) + "..." : track.name,
    playcount: track.playcount,
    fullName: track.name,
  }))

  return (
    <div className="w-full h-80 bg-card rounded-lg p-4 border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value: number) => [formatNumber(value), "Plays"]}
          />
          <Bar dataKey="playcount" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
