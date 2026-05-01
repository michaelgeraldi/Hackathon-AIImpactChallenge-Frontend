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
                        Talent Acquisition for companies
                    </Typography>
                    <Typography sx={{ maxWidth: 360, textAlign: "center" }}>
                        Start with Talent Acquisition to define the brief,
                        shortlist talent, and hand the matched team to PM and
                        Secretary.
                    </Typography>
                    <Stack>
                    <CustomButton
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.push("/register/client")}
                        >
                            Sign up as a hiring team
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
                        Talent Acquisition for talent
                    </Typography>
                    <Typography sx={{ maxWidth: 360, textAlign: "center" }}>
                        Create your talent profile for matchmaking, then work
                        with PM on delivery while Secretary keeps communication
                        summarized.
                    </Typography>
                    <Stack>
                        <CustomButton
                            onClick={() => router.push("/register/talent")}
                        >
                            Sign up as talent
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
        </Stack>
    );
}
