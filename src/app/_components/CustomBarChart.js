"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { name: "May", value: 100 },
    { name: "June", value: 100 },
    { name: "July", value: 100 },
    { name: "Aug", value: 75 },
    { name: "Sept", value: 50 },
    { name: "Oct", value: 90 },
    { name: "Nov", value: 15 },
];

export default function CustomBarChart({ title }) {
    return (
        <Box>
            {title && (
                <Typography variant="h5" fontWeight={600} mb={2}>
                    {title}
                </Typography>
            )}

            <Box sx={{ height: 250, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />

                        <XAxis dataKey="name" fontSize={12} />

                        <YAxis
                            domain={[0, 100]}
                            tickFormatter={(v) => `${v}%`}
                            width={34}
                            fontSize={12}
                        />

                        <Bar
                            dataKey="value"
                            fill="#4352E5"
                            width={20}
                            radius={[8, 8, 8, 8]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
