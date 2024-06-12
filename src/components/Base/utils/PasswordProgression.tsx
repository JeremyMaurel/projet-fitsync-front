import { LinearProgress, Typography } from '@mui/material';

export default function PasswordProgression({
  passwordStrength,
}: {
  passwordStrength: number;
}) {
  return (
    <>
      <LinearProgress
        variant="determinate"
        value={passwordStrength}
        sx={{ mt: 0.5, mb: 1.5 }}
      />
      <Typography variant="body2" color="textSecondary">
        {passwordStrength < 100
          ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and 8 characters.'
          : 'Password is strong enough'}
      </Typography>
    </>
  );
}
