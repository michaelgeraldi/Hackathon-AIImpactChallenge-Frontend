"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Design Team", value: 40, color: "#FF7A59" },
    { name: "Development Team", value: 30, color: "#59B47C" },
    { name: "Marketing Team", value: 30, color: "#4352E5" },
];

export default function CustomDonutChart({ title }) {
    return (
        <Box>
            {/* Title */}
            {title && (
                <Typography variant="h5" fontWeight={600} mb={3}>
                    {title}
                </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Donut Chart */}
                <Box sx={{ width: 200, height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                innerRadius={60} // 👈 donut hole size
                                outerRadius={80} // 👈 thickness
                                paddingAngle={12} // 👈 spacing between segments
                                cornerRadius={20} // 👈 rounded edges (key!)
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>

                {/* Legend */}
                <Box>
                    {data.map((item) => (
                        <Box
                            key={item.name}
                            sx={{ display: "flex", alignItems: "center", gap: 1}}
                            mb={2}
                        >
                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    backgroundColor: item.color,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: "text.primary",
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
