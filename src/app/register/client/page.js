"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import React from "react";
import CustomTextField from "@/app/_components/CustomTextField";
import CustomButton from "@/app/_components/CustomButton";
import { useRouter } from "next/navigation";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useMutation from "@/app/_hooks/useMutation";
import { mergeWorkspaceSession } from "@/app/lib/workspace-session";

const SignUpPage = () => {
    const router = useRouter();
    const { showSuccess, showError } = useFeedbackContext();
    const { post: bootstrapProject, isLoading: isBootstrapping } = useMutation(
        "/pm/projects/bootstrap",
    );
    const { post: createConversation, isLoading: isCreatingConversation } =
        useMutation("/secretary/conversations");
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        projectBrief: "",
    });

    const isLoading = isBootstrapping || isCreatingConversation;

    const handleInputChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleCreateWorkspace = async () => {
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();

        if (!formData.firstName || !formData.email || !formData.projectBrief) {
            showError(
                "Add at least a first name, email, and workspace brief before creating the company workspace.",
            );
            return;
        }

        const projectId = crypto.randomUUID();

        try {
            const bootstrapResponse = await bootstrapProject({
                overview: {
                    project_id: projectId,
                    project_name: `${fullName || "Client"} Workspace`,
                    client_name: fullName || formData.firstName,
                    description: formData.projectBrief,
                    scope: "Talent acquisition intake, PM planning, and secretary support.",
                    success_criteria: [
                        "Shortlist relevant talent",
                        "Create PM-ready project context",
                        "Enable Secretary summaries",
                    ],
                    constraints: [
                        "Auth is not implemented yet",
                        "Async collaboration first",
                    ],
                    freelancers: [],
                    milestones: [],
                    timeline_notes: "Workspace created from frontend signup flow",
                },
            });

            const conversationResponse = await createConversation({
                project_id: projectId,
                conversation_type: "project_channel",
                title: `${fullName || formData.firstName} kickoff channel`,
                participants: [fullName || formData.firstName, "Secretary Agent"],
            });

            mergeWorkspaceSession({
                clientName: fullName || formData.firstName,
                clientEmail: formData.email,
                currentProjectId: projectId,
                currentConversationId:
                    conversationResponse?.conversation?.conversation_id || null,
                currentProjectOverview:
                    bootstrapResponse?.snapshot?.overview || null,
            });

            showSuccess(
                "Company workspace created through PM bootstrap and Secretary channel setup.",
            );
            router.push("/home/client");
        } catch (error) {
            showError(error.message || "Failed to create company workspace.");
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
                        Set up your Talent Acquisition brief
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 3 }}>
                        Tell Talent Acquisition who you need. PM and Secretary
                        will reuse the same project context after the match is
                        confirmed.
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
                            Workspace Brief:
                        </Typography>
                        <CustomTextField
                            fullWidth
                            multiline
                            minRows={4}
                            value={formData.projectBrief}
                            onChange={handleInputChange("projectBrief")}
                            placeholder="Describe the project, talent needs, and delivery goals for PM + Secretary."
                        />
                    </Box>

                    <CustomButton
                        sx={{ mt: 10 }}
                        onClick={handleCreateWorkspace}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating workspace..." : "Create company workspace"}
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
                        Agent flow
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                        Talent Acquisition handles signup and matchmaking. PM
                        takes over delivery with updates, task breakdowns, work
                        checker, and reporting. Secretary captures MoM,
                        summarizes chats, and drafts response suggestions.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default SignUpPage;
