"use client";

import * as React from "react";
import { Button, Typography, Container, Box } from "@mui/material";

export default function HomePage() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    textAlign: "center",
                    marginTop: 8,
                }}
            >
                <Typography variant="h3" gutterBottom color="primary">
                    Keroyokin Frontend
                </Typography>

                <Typography variant="body1" gutterBottom>
                    This is a sample page using Material UI with a custom theme.
                </Typography>

                <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 2 }}
                    >
                        Primary Button
                    </Button>

                    <Button variant="outlined" color="secondary">
                        Secondary Button
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
