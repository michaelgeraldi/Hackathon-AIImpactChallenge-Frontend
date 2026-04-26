"use client";

import * as React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import CustomButton from "./reusables/CustomButton";

export default function HomePage() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: "center",
                    marginTop: 8,
                }}
            >
                <Typography>
                    <h1>Welcome to Keroyokin!</h1>
                </Typography>
            </Box>
        </Container>
    );
}
