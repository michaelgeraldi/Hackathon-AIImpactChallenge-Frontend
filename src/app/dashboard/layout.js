"use client";

import {
    Avatar,
    Box,
    Container,
    MenuItem,
    MenuList,
    Paper,
    Popover,
    Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomIconButton from "../_components/CustomIconButton";
import Logo from "../_components/Logo";
import NavigationBar, {
    NavigationBarProvider,
} from "../_components/NavigationBar";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function DashboardLayout({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userType, setUserType] = useState(null);
    const router = useRouter();

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
        setUserType(localStorage.getItem("userType"));

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
                    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                        <Logo />
                    </Stack>

                    <NavigationBar />

                    <Paper
                        sx={{ px: 1.25, py: 1.5, borderRadius: 999 }}
                        elevation={0}
                    >
                        <Stack direction="row" spacing={1.5}>
                            <CustomIconButton
                                icon={<SearchOutlinedIcon />}
                            />
                            {userType && (
                                <CustomIconButton
                                    icon={<HomeOutlinedIcon />}
                                    onClick={() =>
                                        router.push(`/home/${userType}`)
                                    }
                                />
                            )}
                            <Avatar
                                alt="User Avatar"
                                src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=abdul"
                                onClick={handleAvatarClick}
                                sx={{ cursor: "pointer" }}
                            />
                        </Stack>
                    </Paper>

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

                <Box>{children}</Box>
            </Container>
        </NavigationBarProvider>
    );
}
