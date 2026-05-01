"use client";

import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../../_components/CustomTextField";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import { useProgressIndicator } from "../../../_providers/ProgressIndicatorProvider";

// Icon imports
import CustomButton from "@/app/_components/CustomButton";
import CustomIconButton from "@/app/_components/CustomIconButton";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useMutation from "@/app/_hooks/useMutation";
import { mergeWorkspaceSession } from "@/app/lib/workspace-session";

export default function ClientProjectForm({ onClose }) {
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        scope: "",
        date: "",
        estimatedHours: "",
        workers: [{ role: "", jobDescription: "" }],
    });

    const { data, post, isLoading } = useMutation("/pm/projects/bootstrap");
    const { showSuccess, showError, showWarning, showInfo } =
        useFeedbackContext();
    const { startProgress, completeProgress } = useProgressIndicator();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleWorkerChange = (index, field, value) => {
        const updatedWorkers = [...formData.workers];
        updatedWorkers[index] = {
            ...updatedWorkers[index],
            [field]: value,
        };
        setFormData((prev) => ({
            ...prev,
            workers: updatedWorkers,
        }));
    };

    const handleAddWorker = () => {
        setFormData((prev) => ({
            ...prev,
            workers: [...prev.workers, { role: "", jobDescription: "" }],
        }));
    };

    const handleRemoveWorker = (index) => {
        const updatedWorkers = formData.workers.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            workers: updatedWorkers,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            startProgress("Creating project...");

            const uuid = crypto.randomUUID();
            const body = {
                project_id: uuid,
                project_name: formData.projectName,
                scope: formData.scope,
                client_name: "John Doe",
                description: formData.description,
                success_criteria: [
                    "Create a PM-ready workspace",
                    "Match the right delivery roles",
                    "Keep Secretary summaries connected to the same project",
                ],
                constraints: [
                    "Frontend demo flow without auth",
                    "Async collaboration first",
                    "Use the submitted brief as shared project context",
                ],
                freelancers: formData.workers
                    .filter((worker) => worker.role.trim())
                    .map((worker) => ({
                        name: `${worker.role} candidate`,
                        role: worker.role,
                        hours_per_week: Number(formData.estimatedHours || 20),
                        timezone: "Asia/Jakarta",
                        skills: worker.jobDescription
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        notes: worker.jobDescription || null,
                    })),
                milestones: formData.date
                    ? [
                          {
                              name: "Initial delivery checkpoint",
                              due_date: formData.date,
                              success_definition:
                                  "Client brief translated into a tracked PM plan",
                          },
                      ]
                    : [],
                timeline_notes:
                    formData.estimatedHours
                        ? `Estimated team hours: ${formData.estimatedHours}`
                        : "Workspace created from frontend PM bootstrap flow",
            };

            const result = await post({ overview: body });
            if (result?.snapshot) {
                console.log(
                    "Project created with UUID: ",
                    result?.snapshot?.project_id,
                );
                showSuccess("Project created successfully!");
                onClose();
            }
        } catch (error) {
            console.log(error);
            showError("Failed to create project.");
        } finally {
            completeProgress();
        }
    };

    return (
        <Box sx={{ width: "70vw", height: "80vh" }}>
            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "white",
                    height: "100%",
                    overflowY: "scroll",
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 700,
                            mb: 4,
                        }}
                    >
                        Bootstrap PM workspace
                    </Typography>
                    <Typography sx={{ mb: 4, color: "text.secondary" }}>
                        Share the brief once. PM uses it to set up delivery, and
                        Secretary uses the same context for meeting notes and
                        summaries.
                    </Typography>
                    {/* Project Name & Description */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={6}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 14 }}
                                >
                                    Project Name
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    placeholder="Enter PM workspace name"
                                />
                            </Stack>
                        </Grid>
                        <Grid size={6}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 14 }}
                                >
                                    Scope
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    name="scope"
                                    value={formData.scope}
                                    onChange={handleInputChange}
                                    placeholder="What delivery scope should PM own?"
                                />
                            </Stack>
                        </Grid>
                        <Grid size={12}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 14 }}
                                >
                                    Description
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the goals, context, and success criteria"
                                    multiline
                                    rows={4}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* Date & Estimated Hours */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={6}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 14 }}
                                >
                                    Date
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </Stack>
                        </Grid>
                        <Grid size={6}>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{ fontWeight: 600, fontSize: 14 }}
                                >
                                    Estimated Hours
                                </Typography>
                                <CustomTextField
                                    fullWidth
                                    name="estimatedHours"
                                    type="number"
                                    value={formData.estimatedHours}
                                    onChange={handleInputChange}
                                    placeholder="Estimated team hours"
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* Workers Section */}
                    <Stack sx={{ mb: 4, gap: 2 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                            Talent roles
                        </Typography>
                        {formData.workers.map((worker, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid size={5.5}>
                                    <CustomTextField
                                        fullWidth
                                        placeholder="Role to match"
                                        value={worker.role}
                                        onChange={(e) =>
                                            handleWorkerChange(
                                                index,
                                                "role",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={5.5}>
                                    <CustomTextField
                                        fullWidth
                                        placeholder="Matchmaking notes"
                                        value={worker.jobDescription}
                                        onChange={(e) =>
                                            handleWorkerChange(
                                                index,
                                                "jobDescription",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={1}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                        }}
                                    >
                                        <CustomIconButton
                                            color="red"
                                            icon={<DeleteOutlinedIcon />}
                                            onClick={() =>
                                                handleRemoveWorker(index)
                                            }
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        ))}
                        <Box>
                            <CustomButton
                                variant="outlined"
                                onClick={handleAddWorker}
                            >
                                Add role
                            </CustomButton>
                        </Box>
                    </Stack>
                    {/* File Brief Section */}
                    <Stack sx={{ mb: 4, gap: 2 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                            Brief upload
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: "#f5f5f5",
                                border: "1px dashed #d0d0d0",
                                borderRadius: 2,
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                "&:hover": {
                                    backgroundColor: "#efefef",
                                    borderColor: "#b0b0b0",
                                },
                            }}
                        >
                            <CloudUploadOutlinedIcon
                                sx={{
                                    fontSize: 32,
                                    color: "text.secondary",
                                }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 14,
                                    color: "text.secondary",
                                }}
                            >
                                Upload brief for PM and Secretary
                            </Typography>
                        </Box>
                    </Stack>
                    {/* Action Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                        }}
                    >
                        <CustomButton variant="outlined" onClick={onClose}>
                            Cancel
                        </CustomButton>
                        <CustomButton type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </CustomButton>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
