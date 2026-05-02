"use client";

import * as React from "react";
import { Box, Typography, Badge, Paper } from "@mui/material";

// --- NavigationBar component ---

const defaultTabs = [
    { label: "Project Overview" },
    { label: "Task Board" },
    { label: "Weekly Updates" },
    { label: "Meeting Notes" },
    { label: "Team Chat", badge: 3 },
];

export default function NavigationBar({ tabs = defaultTabs }) {
    const { active, setActive } = useNavigationBarContext();

    return (
        <Paper
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "999px",
                padding: "8px",
                gap: 1,
                px: 4,
                py: 1,
            }}
            elevation={0}
        >
            {tabs.map((tab) => {
                const isActive = active === tab.label;

                const content = (
                    <Box
                        onClick={() => setActive(tab.label)}
                        sx={{
                            px: 2.5,
                            py: 1,
                            borderRadius: "999px",
                            cursor: "pointer",
                            backgroundColor: isActive
                                ? "#4352E5"
                                : "transparent",
                            color: isActive ? "#fff" : "#2D2A4A",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: isActive
                                    ? "#4352E5"
                                    : "rgba(0,0,0,0.05)",
                            },
                        }}
                    >
                        <Typography>{tab.label}</Typography>
                    </Box>
                );

                return tab.badge ? (
                    <Badge
                        key={tab.label}
                        badgeContent={tab.badge}
                        color="error"
                        overlap="circular"
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 8,
                                top: 6,
                            },
                        }}
                    >
                        {content}
                    </Badge>
                ) : (
                    <React.Fragment key={tab.label}>{content}</React.Fragment>
                );
            })}
        </Paper>
    );
}

// --- Context for NavigationBar ---

const NavigationBarContext = React.createContext();

export const useNavigationBarContext = () =>
    React.useContext(NavigationBarContext);

export function NavigationBarProvider({ children, defaultActive = "Project Overview" }) {
    const [active, setActive] = React.useState(defaultActive);

    return (
        <NavigationBarContext.Provider value={{ active, setActive }}>
            {children}
        </NavigationBarContext.Provider>
    );
}
