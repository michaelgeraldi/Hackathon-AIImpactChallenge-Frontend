"use client";

import React from "react";
import {
    Box,
    Modal,
    Paper,
    Stack,
    Typography,
    TextField,
    Grid,
} from "@mui/material";
import CustomButton from "@/app/_components/CustomButton";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import { apiFetcher } from "@/app/lib/api";

export default function WorkSubmissionForm({ open, onClose, task, projectId, onSuccess }) {
    const [submitting, setSubmitting] = React.useState(false);
    const { showSuccess, showError } = useFeedbackContext();

    const [formData, setFormData] = React.useState({
        deliverable_summary: "",
        deliverable_artifact: "",
        requester_notes: "Please review my work",
    });

    const handleSubmit = async () => {
        if (!formData.deliverable_summary.trim()) {
            showError("Please describe what you completed");
            return;
        }

        setSubmitting(true);
        try {
            await apiFetcher("/pm/work-check", {
                method: "POST",
                body: {
                    project_id: projectId,
                    task_id: task?.id || "",
                    task_title: task?.title || "",
                    freelancer_name: "Freelancer",
                    scope_reference: task?.description || "",
                    deliverable_summary: formData.deliverable_summary,
                    deliverable_artifact: formData.deliverable_artifact || formData.deliverable_summary,
                    requester_notes: formData.requester_notes,
                },
            });

            await apiFetcher(`/pm/projects/${projectId}/tasks/${task?.id}/status`, {
                method: "POST",
                body: {
                    status: "blocked",
                    notes: "Submitted for PM review",
                },
            });

            showSuccess("Work submitted! Task moved to Under Review.");
            onClose();
            if (onSuccess) onSuccess();
            setFormData({
                deliverable_summary: "",
                deliverable_artifact: "",
                requester_notes: "Please review my work",
            });
        } catch (error) {
            showError(error.message || "Failed to submit work. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                sx={{
                    width: "60vw",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography variant="h5" fontWeight={700} mb={1}>
                    Submit Work for Review
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Submit your completed work to get feedback from the PM.
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography fontWeight={600} mb={1}>
                        Task: {task?.title || "Selected Task"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {task?.category}
                    </Typography>
                </Box>

                <Stack spacing={3}>
                    <Box>
                        <Typography fontWeight={600} mb={1}>
                            What did you complete? *
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Describe what you completed in this task..."
                            value={formData.deliverable_summary}
                            onChange={(e) =>
                                setFormData({ ...formData, deliverable_summary: e.target.value })
                            }
                        />
                    </Box>

                    <Box>
                        <Typography fontWeight={600} mb={1}>
                            Any additional notes or links?
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Add any links, files, or notes about your work..."
                            value={formData.deliverable_artifact}
                            onChange={(e) =>
                                setFormData({ ...formData, deliverable_artifact: e.target.value })
                            }
                        />
                    </Box>

                    <Box>
                        <Typography fontWeight={600} mb={1}>
                            Message to PM
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Any specific questions or points for the PM to review?"
                            value={formData.requester_notes}
                            onChange={(e) =>
                                setFormData({ ...formData, requester_notes: e.target.value })
                            }
                        />
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
                    <CustomButton variant="outlined" onClick={onClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton
                        onClick={handleSubmit}
                        loading={submitting}
                    >
                        Submit for Review
                    </CustomButton>
                </Stack>
            </Paper>
        </Modal>
    );
}