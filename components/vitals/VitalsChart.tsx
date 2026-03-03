"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";

interface VitalsChartProps {
    data: any[];
    type: "BP" | "Sugar" | "Weight";
    color?: string;
}

export default function VitalsChart({ data, type, color = "#1e40af" }: VitalsChartProps) {
    // Filter and format data for the specific type
    const chartData = data
        .filter((item) => item.type === type)
        .sort((a, b) => new Date(a.readingDate).getTime() - new Date(b.readingDate).getTime())
        .slice(-7) // Last 7 readings
        .map((item) => ({
            date: new Date(item.readingDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            value: parseFloat(item.value),
        }));

    if (chartData.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold italic text-sm">
                No trend data
            </div>
        );
    }

    return (
        <div className="w-full h-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id={`color${type}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 800 }}
                        dy={10}
                    />
                    <YAxis
                        hide
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "20px",
                            border: "none",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                            padding: "12px"
                        }}
                        itemStyle={{ fontWeight: 900, color: "#0f172a" }}
                        labelStyle={{ color: "#64748b", marginBottom: "4px", fontWeight: 800, fontSize: "10px", textTransform: "uppercase" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill={`url(#color${type})`}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
