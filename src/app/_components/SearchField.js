"use client";

import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField({
    placeholder = "Search",
    value,
    onChange,
    sx = {},
    ...props
}) {
    return (
        <TextField
            fullWidth
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            variant="outlined"
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon sx={{ color: "#2D2A4A" }} />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "40px", // pill shape
                    backgroundColor: "grey.main",
                    paddingRight: 2.5,
                    "& fieldset": {
                        border: "none",
                    },
                    "&.Mui-focused": {
                        boxShadow: "0 0 0 2px #4352E5",
                    },
                },

                "& .MuiOutlinedInput-input": {
                    padding: "14px 20px",
                    fontSize: 16,
                },

                "& input::placeholder": {
                    color: "#2D2A4A",
                    opacity: 0.7,
                },

                ...sx,
            }}
            {...props}
        />
    );
}
