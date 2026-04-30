'use client';

import * as React from 'react';
import { TextField } from '@mui/material';

/**
 * Reusable Text Field Component
 *
 * Props:
 * - label: string
 * - placeholder: string
 * - value: string
 * - onChange: function
 * - type: string
 * - error: boolean
 * - helperText: string
 * - fullWidth: boolean
 * - disabled: boolean
 */

export default function CustomTextField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error = false,
  helperText = '',
  fullWidth = true,
  disabled = false,
  sx = {},
  ...props
}) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      disabled={disabled}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          backgroundColor: '#fff',
        },

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4352E5',
        },

        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4352E5',
          borderWidth: '1px',
        },

        '& .MuiInputLabel-root': {
          fontWeight: 500,
        },

        ...sx,
      }}
      {...props}
    />
  );
}