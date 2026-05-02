"use client";

import React from "react";
import { Box, Grid, Link, Stack, Typography, Container } from "@mui/material";
import CustomButton from "./_components/CustomButton";
import CustomTextField from "./_components/CustomTextField";
import { useRouter } from "next/navigation";
import { useProgressIndicator } from "./_providers/ProgressIndicatorProvider";

export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const router = useRouter();
    const { startProgress, completeProgress } = useProgressIndicator();

    const handleLogin = (userType) => {
        try {
            startProgress("Logging in...");

            if (email === "user1@email.com" && password === "kirjau123") {
                setError(null);
                router.push(`/home/${userType}`);
                localStorage.setItem("userType", userType);
                localStorage.setItem("token", crypto.randomUUID());
                return;
            }

            setError("Incorrect email or password. Please try again.");
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            return;
        } finally {
            completeProgress();
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Grid
                container
                sx={{
                    alignItems: "stretch",
                    width: "100%",
                }}
            >
                {/* Left Side - Form */}
                <Grid
                    size={6}
                    sx={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 40,
                        borderBottomLeftRadius: 40,
                        p: 5,
                    }}
                >
                    {/* Welcome Title */}
                    <Typography
                        sx={{
                            fontSize: 32,
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        Welcome to Kirjau
                    </Typography>

                    {/* Subtitle - User-friendly description */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                            mb: 4,
                        }}
                    >
                        Your AI-powered workspace for managing freelance projects.
                        Track tasks, collaborate with your team, and get things done.
                    </Typography>

                    <Stack sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                fontSize: 14,
                            }}
                        >
                            Email:
                        </Typography>
                        <CustomTextField
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Stack>

                    <Stack sx={{ mb: 2 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                fontSize: 14,
                            }}
                        >
                            Password:
                        </Typography>
                        <CustomTextField
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Stack>

                    {error && <Typography color="error">{error}</Typography>}

                    <Box sx={{ mt: 5 }}>
                        <CustomButton
                            sx={{ mb: 1.5 }}
                            fullWidth
                            onClick={() => handleLogin("client")}
                        >
                            I want to hire (Client)
                        </CustomButton>
                        <CustomButton
                            sx={{ mb: 2 }}
                            fullWidth
                            onClick={() => handleLogin("talent")}
                        >
                            I want to work (Freelancer)
                        </CustomButton>
                    </Box>

                    <Typography 
                        sx={{ textAlign: 'center', fontSize: 12, color: 'text.secondary' }}
                    >
                        Demo: user1@email.com / kirjau123
                    </Typography>
                </Grid>

                {/* Right Side - Image Placeholder */}
                <Grid
                    size={6}
                    sx={{
                        borderTopRightRadius: 40,
                        borderBottomRightRadius: 40,
                        backgroundColor: "primary.main",
                        color: "white",
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
                        Manage your projects with AI help
                    </Typography>
                    <Typography sx={{ fontSize: 15, lineHeight: 1.8 }}>
                        Whether you're hiring freelancers or working on projects,
                        Kirjau helps you stay organized with smart task tracking,
                        meeting summaries, and team chat - all in one place.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
