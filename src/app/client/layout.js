import {
    Container,
    Stack,
    AvatarGroup,
    Avatar,
    Paper,
    Box,
} from "@mui/material";
import Logo from "../_components/Logo";
import CustomIconButton from "../_components/CustomIconButton";
import NavigationBar from "../_components/NavigationBar";
import { NavigationBarProvider } from "../_components/NavigationBar";

// Icon imports
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function ClientLayout({ children }) {
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
                                    src="/avatars/avatar1.png"
                                />
                                <Avatar
                                    alt="User 2"
                                    src="/avatars/avatar2.png"
                                />
                                <Avatar
                                    alt="User 3"
                                    src="/avatars/avatar3.png"
                                />
                                <Avatar
                                    alt="User 4"
                                    src="/avatars/avatar4.png"
                                />
                                <Avatar
                                    alt="User 5"
                                    src="/avatars/avatar5.png"
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
                                    src="/avatars/avatar1.png"
                                />
                            </Stack>
                        </Paper>
                    </Stack>
                </Stack>

                <Box>{children}</Box>
            </Container>
        </NavigationBarProvider>
    );
}
