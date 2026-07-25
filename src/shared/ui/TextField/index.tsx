import {
  Box,
  TextField as MuiTextField,
  type TextFieldProps,
} from '@mui/material';

export type Props = TextFieldProps & {
  reserveHelperTextSpace?: boolean;
};

export const TextField = function TextField({
  fullWidth,
  helperText,
  reserveHelperTextSpace = true,
  ...props
}: Props) {
  const displayedHelperText = reserveHelperTextSpace && !helperText
    ? ' '
    : helperText;

  return (
    <Box
      sx={{
        display: fullWidth ? 'block' : 'inline-block',
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <MuiTextField
        {...props}
        fullWidth={fullWidth}
        helperText={displayedHelperText}
      />
    </Box>
  );
};
