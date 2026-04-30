"use client";

import { Box, Grid, Link, Stack, Typography, Container } from "@mui/material";
import CustomButton from "./_components/CustomButton";
import CustomTextField from "./_components/CustomTextField";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/home");
    };

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
                        Welcome Back!
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "text.secondary",
                            mb: 4,
                        }}
                    >
                        Let&apos;s get you logged in!
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
                            Does not have an account?{" "}
                            <Link
                                href="#"
                                sx={{
                                    fontWeight: 600,
                                    color: "inherit",
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </Box>

                    {/* Log In Button */}
                    <CustomButton
                        sx={{ mb: 2 }}
                        fullWidth
                        onClick={() => router.push("/home/client")}
                    >
                        Log In as Client
                    </CustomButton>
                    <CustomButton
                        sx={{ mb: 2 }}
                        fullWidth
                        onClick={() => router.push("/home/talent")}
                    >
                        Log In as Talent
                    </CustomButton>
                </Grid>

                {/* Right Side - Image Placeholder */}
                <Grid
                    size={6}
                    sx={{
                        borderTopRightRadius: 40,
                        borderBottomRightRadius: 40,
                        backgroundColor: "primary.main",
                    }}
                ></Grid>
            </Grid>
        </Container>
    );
}
