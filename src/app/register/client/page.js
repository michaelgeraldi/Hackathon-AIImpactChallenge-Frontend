import React from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import CustomTextField from "@/app/_components/CustomTextField";
import CustomButton from "@/app/_components/CustomButton";

const SignUpPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f4f6f8", // Light gray background like the image
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: "flex",
                    width: "70vw",
                    height: "600px",
                    borderRadius: "40px", // Large rounded corners
                    overflow: "hidden",
                }}
            >
                {/* Left Side: Form */}
                <Box
                    sx={{
                        flex: 1,
                        px: 9,
                        py: 8,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                        Let&apos;s get started!
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                First Name
                            </Typography>
                            <CustomTextField fullWidth />
                        </Grid>
                        <Grid size={6}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                Last Name
                            </Typography>
                            <CustomTextField fullWidth />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            Email:
                        </Typography>
                        <CustomTextField fullWidth />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            Password:
                        </Typography>
                        <CustomTextField fullWidth type="password" />
                    </Box>

                    <CustomButton sx={{ mt: 10 }}>
                        Sign up
                    </CustomButton>
                </Box>

                {/* Right Side: Image/Placeholder */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#d1d1d1", // Placeholder color for the image side
                        display: { xs: "none", md: "block" },
                    }}
                />
            </Paper>
        </Box>
    );
};

export default SignUpPage;
