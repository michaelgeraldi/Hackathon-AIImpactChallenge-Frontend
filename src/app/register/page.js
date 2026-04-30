"use client";

import { Box, Stack, Typography, Link } from "@mui/material";
import CustomButton from "../_components/CustomButton";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    return (
        <Stack direction="row" sx={{ height: "100vh", width: "100vw" }}>
            {/* Sign up as a client */}
            <Stack
                sx={{
                    flex: 1,
                    backgroundColor: "primary.main",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 600,
                    }}
                >
                    I&apos;m here for hiring
                </Typography>
                <Stack>
                    <CustomButton
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.push("/register/client")}
                    >
                        Sign up as a client
                    </CustomButton>
                    <Box sx={{ my: 3, textAlign: "center" }}>
                        <Typography sx={{ fontSize: 14 }}>
                            Already have an account?{" "}
                            <Link
                                href={"/"}
                                sx={{
                                    fontWeight: 600,
                                    color: "inherit",
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            {/* Sign up as a talent */}
            <Stack
                sx={{
                    flex: 1,
                    backgroundColor: "white",
                    color: "text.primary",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 32,
                        fontWeight: 600,
                    }}
                >
                    I&apos;m here for seeking job
                </Typography>
                <Stack>
                    <CustomButton>Sign up as a talent</CustomButton>
                    <Box sx={{ my: 3, textAlign: "center" }}>
                        <Typography sx={{ fontSize: 14 }}>
                            Already have an account?{" "}
                            <Link
                                href={"/"}
                                sx={{
                                    fontWeight: 600,
                                    color: "inherit",
                                    textDecoration: "none",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
}
