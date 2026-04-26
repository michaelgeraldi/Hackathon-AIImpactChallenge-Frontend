"use client";

import * as React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import CustomButton from "./_components/CustomButton";

export default function HomePage() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: "center",
                    marginTop: 8,
                }}
            >
                <Typography>Welcome to Keroyokin!</Typography>
            </Box>
        </Container>
    );
}
