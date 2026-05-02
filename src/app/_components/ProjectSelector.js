"use client";

import React from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { getProjectList, setActiveProject, getWorkspaceSession } from "../lib/workspace-session";
import { useRouter } from "next/navigation";

export default function ProjectSelector() {
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);
    const [session, setSession] = React.useState({ project_id: null, project_name: null });
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        setMounted(true);
        setSession(getWorkspaceSession());
        setProjects(getProjectList());
    }, []);

    const handleChange = (event) => {
        const newProjectId = event.target.value;
        setActiveProject(newProjectId);
        window.location.reload();
    };

    if (!mounted) {
        return (
            <Box sx={{ 
                px: 2, 
                py: 1, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'rgba(0,0,0,0.02)',
                minWidth: 180,
                height: 40
            }} />
        );
    }

    if (projects.length === 0) {
        return (
            <Box sx={{ 
                px: 2, 
                py: 1, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'rgba(0,0,0,0.02)'
            }}>
                <Typography variant="caption" color="text.secondary">
                    No projects yet
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                Project:
            </Typography>
            <Select
                value={session.project_id || ""}
                onChange={handleChange}
                size="small"
                sx={{
                    minWidth: 180,
                    fontSize: 14,
                    fontWeight: 600,
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                    },
                }}
            >
                {projects.map((project) => (
                    <MenuItem 
                        key={project.project_id} 
                        value={project.project_id}
                        sx={{ fontWeight: project.project_id === session.project_id ? 700 : 400 }}
                    >
                        {project.project_name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}