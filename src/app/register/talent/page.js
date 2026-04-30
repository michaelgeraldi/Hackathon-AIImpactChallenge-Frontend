"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import CustomTextField from "@/app/_components/CustomTextField";
import CustomButton from "@/app/_components/CustomButton";
import { useRouter } from "next/navigation";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useMutation from "@/app/_hooks/useMutation";
import { apiFetcher } from "@/app/lib/api";
import { mergeWorkspaceSession } from "@/app/lib/workspace-session";

const SignUpPage = () => {
    const router = useRouter();
    const { showSuccess, showError } = useFeedbackContext();
    const { post: signupCv, isLoading } = useMutation("/talent/signup/cv");
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cvText: "",
    });

    const handleInputChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleJoinTalent = async () => {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();

        if (!formData.firstName || !formData.email || !formData.cvText) {
            showError(
                "Add at least a first name, email, and CV/profile text before joining as talent.",
            );
            return;
        }

        const userId = formData.email
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        try {
            const signupResponse = await signupCv({
                user_id: userId,
                email: formData.email,
                full_name: fullName || formData.firstName,
                cv_text: formData.cvText,
                cv_format: "text",
            });

            const profileId = signupResponse?.profile_id;

            let generatedProfile = null;

            if (profileId) {
                generatedProfile = await apiFetcher(
                    `/talent/profiles/${profileId}/generate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            profile_id: profileId,
                            enhance_with_ai: true,
                        }),
                    },
                );
            }

            mergeWorkspaceSession({
                talentName: fullName || formData.firstName,
                talentEmail: formData.email,
                currentProfileId: profileId || null,
                currentTalentProfile:
                    generatedProfile?.profile || signupResponse?.parsed_profile || null,
            });

            showSuccess(
                "Talent profile created through CV parsing and AI profile generation.",
            );
            router.push("/home/talent");
        } catch (error) {
            showError(error.message || "Failed to create talent profile.");
        }
    };

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
                        Create your Talent Acquisition profile
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 3 }}>
                        Share your profile so Talent Acquisition can match you,
                        then collaborate with PM on delivery while Secretary
                        keeps every update tidy.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                First Name
                            </Typography>
                            <CustomTextField
                                fullWidth
                                value={formData.firstName}
                                onChange={handleInputChange("firstName")}
                            />
                        </Grid>
                        <Grid size={6}>
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                Last Name
                            </Typography>
                            <CustomTextField
                                fullWidth
                                value={formData.lastName}
                                onChange={handleInputChange("lastName")}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            Email:
                        </Typography>
                        <CustomTextField
                            fullWidth
                            value={formData.email}
                            onChange={handleInputChange("email")}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            Password:
                        </Typography>
                        <CustomTextField
                            fullWidth
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange("password")}
                        />
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                        >
                            CV / Profile Text:
                        </Typography>
                        <CustomTextField
                            fullWidth
                            multiline
                            minRows={5}
                            value={formData.cvText}
                            onChange={handleInputChange("cvText")}
                            placeholder="Paste your CV, skills, experience, availability, and portfolio notes here."
                        />
                    </Box>

                    <CustomButton
                        sx={{ mt: 10 }}
                        onClick={handleJoinTalent}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating profile..." : "Join as talent"}
                    </CustomButton>
                </Box>

                {/* Right Side: Image/Placeholder */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#d1d1d1",
                        display: { xs: "none", md: "block" },
                        p: 6,
                    }}
                >
                    <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 2 }}>
                        From matchmaking to delivery
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                        Talent Acquisition introduces the right opportunity. PM
                        breaks down the work and tracks updates. Secretary turns
                        meetings and chats into summaries and response
                        suggestions.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default SignUpPage;
