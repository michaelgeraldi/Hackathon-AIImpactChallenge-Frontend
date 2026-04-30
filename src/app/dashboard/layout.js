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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../_components/Logo";
import CustomIconButton from "../_components/CustomIconButton";
import NavigationBar from "../_components/NavigationBar";
import { NavigationBarProvider } from "../_components/NavigationBar";

// Icon imports
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear auth token
        localStorage.removeItem("token");
        handleClose();
        // Navigate to login page
        router.push("/");
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
        }
    }, [router]);

    return (
        <NavigationBarProvider>
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
                    <NavigationBar />

                    <Stack
                        direction="row"
                        spacing={8}
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Avatar Group */}
                        <Paper
                            sx={{
                                px: 1,
                                py: 1.5,
                                borderRadius: 999,
                            }}
                            elevation={0}
                        >
                            <AvatarGroup max={4}>
                                <Avatar
                                    alt="User 1"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=abdul"
                                />
                                <Avatar
                                    alt="User 2"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=john"
                                />
                                <Avatar
                                    alt="User 3"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=alice"
                                />
                                <Avatar
                                    alt="User 4"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=bob"
                                />
                                <Avatar
                                    alt="User 5"
                                    src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=charlie"
                                />
                            </AvatarGroup>
                        </Paper>

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
