"use client";

import { Box, Grid, Link, Stack, Typography, Container } from "@mui/material";
import CustomButton from "./_components/CustomButton";
import CustomTextField from "./_components/CustomTextField";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <Grid
                container
                sx={{
                    alignItems: "stretch",
                    width: "100%"
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
                        Welcome to Keroyokan
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                            mb: 4,
                        }}
                    >
                        Sign in to the three-agent workspace. Talent
                        Acquisition handles signup and matchmaking, PM keeps
                        updates and task breakdowns on track, and Secretary
                        turns meetings and chats into summaries and suggestions.
                    </Typography>

                    {/* Email Field */}
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
                        <CustomTextField placeholder="Enter your email" />
                    </Stack>

                    {/* Password Field */}
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
                        />
                    </Stack>

                    {/* Forgot Password Link */}
                    <Box sx={{ textAlign: "right", mb: 4 }}>
                        <Link
                            href="#"
                            sx={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "inherit",
                                textDecoration: "none",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </Box>

                    {/* Sign Up Link */}
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography sx={{ fontSize: 14 }}>
                            Need a new workspace?{" "}
                            <Link
                                href={"/register"}
                                sx={{
                                    fontWeight: 600,
                                    color: "inherit",
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Create an account
                            </Link>
                        </Typography>
                    </Box>

                    {/* Log In Button */}
                    <CustomButton
                        sx={{ mb: 2 }}
                        fullWidth
                        onClick={() => router.push("/home/client")}
                    >
                        Enter Client Workspace
                    </CustomButton>
                    <CustomButton
                        sx={{ mb: 2 }}
                        fullWidth
                        onClick={() => router.push("/home/talent")}
                    >
                        Enter Talent Workspace
                    </CustomButton>
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
                        Three agents, one product loop.
                    </Typography>
                    <Typography sx={{ fontSize: 15, lineHeight: 1.8 }}>
                        Talent Acquisition manages signup and matchmaking. PM
                        owns updates, timelines, task breakdowns, work checker,
                        and reporting. Secretary captures MoM, summarizes chats,
                        and suggests the next response.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
