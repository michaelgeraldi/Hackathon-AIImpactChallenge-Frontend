"use client";

import { Box, Grid, Paper, Stack, Typography, Container } from "@mui/material";
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
                client_name: "John Doe", // Replace with actual client name
                description: formData.description,
                success_criteria: [
                    "Launch in 6 weeks",
                    "Mobile responsive",
                    "CMS editable",
                ],
                constraints: [
                    "Budget of $10,000",
                    "Must use React",
                    "Integrate with Stripe",
                ],
                freelancers: [
                    {
                        name: "Dina",
                        role: "Frontend Engineer",
                        hours_per_week: 20,
                        timezone: "Asia/Jakarta",
                        skills: ["Next.js", "Tailwind"],
                    },
                ],
                milestones: [
                    {
                        name: "Design freeze",
                        due_date: "2026-05-15",
                        success_definition: "Approved UI kit",
                    },
                ],
                timeline_notes: "Client wants weekly updates",
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
                        Create New Project
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
                                    placeholder="Enter project name"
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
                                    placeholder="Enter project scope"
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
                                    placeholder="Enter description"
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
                                    placeholder="Enter estimated hours"
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    {/* Workers Section */}
                    <Stack sx={{ mb: 4, gap: 2 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                            Workers
                        </Typography>
                        {formData.workers.map((worker, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid size={5.5}>
                                    <CustomTextField
                                        fullWidth
                                        placeholder="Role of worker"
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
                                        placeholder="Job description"
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
                                Add Talent
                            </CustomButton>
                        </Box>
                    </Stack>
                    {/* File Brief Section */}
                    <Stack sx={{ mb: 4, gap: 2 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                            File brief
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
                                Upload
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
