"use client";

import { Box, Container, Typography } from "@mui/material";

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
