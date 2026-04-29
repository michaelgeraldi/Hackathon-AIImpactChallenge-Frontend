"use client";

import React from "react";
import { Box, Stack, Modal } from "@mui/material";
import CustomButton from "@/app/_components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "../dashboard/client/_components/ProjectForm";

export default function HomePage() {
    const [isCreatingProject, setCreatingProject] = React.useState(false);

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Stack
                direction="column"
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <CustomButton
                    icon={<AddIcon />}
                    onClick={() => setCreatingProject(true)}
                >
                    Create Project
                </CustomButton>
            </Stack>

            <Modal
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                open={isCreatingProject}
                onClose={() => setCreatingProject(false)}
            >
                <ProjectForm onClose={() => setCreatingProject(false)} />
            </Modal>
        </Box>
    );
}
