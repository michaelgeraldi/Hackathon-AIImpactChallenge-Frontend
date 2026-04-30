"use client";

import {
    Container,
    Stack,
    AvatarGroup,
    Avatar,
    Paper,
    Box,
    Popover,
    MenuList,
    MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../_components/Logo";
import CustomIconButton from "../_components/CustomIconButton";
import NavigationBar from "../_components/NavigationBar";
import { NavigationBarProvider } from "../_components/NavigationBar";

// Icon imports
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function HomepageLayout({ children }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");

        handleClose();
        router.push("/");
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/")
        }
    }, [router]);

    return (
        <NavigationBarProvider defaultActive="Homepage">
            <Container
                maxWidth="xl"
                disableGutters
                sx={{ px: 4, pt: 3, pb: 5 }}
            >
                <Stack
                    sx={{
                        mb: 3,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    direction="row"
                >
                    {/* Logo */}
                    <Logo />

                    {/* Navigation Bar */}
                    <NavigationBar
                        tabs={[
                            { label: "Homepage" },
                            { label: "Projects" },
                        ]}
                    />

                    <Stack
                        direction="row"
                        spacing={8}
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Search, Notifications, User Avatar */}
                        <Paper
                            sx={{ px: 1.25, py: 1.5, borderRadius: 999 }}
                            elevation={0}
                        >
                            <Stack direction="row" spacing={1.5}>
                                <CustomIconButton
                                    icon={<SearchOutlinedIcon />}
                                />
                                <CustomIconButton
                                    icon={<NotificationsNoneOutlinedIcon />}
                                />
                                <Avatar
                                    alt="User Avatar"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=abdul"
                                    onClick={handleAvatarClick}
                                    sx={{ cursor: "pointer" }}
                                />
                            </Stack>
                        </Paper>

                        {/* Avatar Menu Popover */}
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuList>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutOutlinedIcon
                                        sx={{ mr: 1, fontSize: 20 }}
                                    />
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Popover>
                    </Stack>
                </Stack>

                <Box>{children}</Box>
            </Container>
        </NavigationBarProvider>
    );
}
