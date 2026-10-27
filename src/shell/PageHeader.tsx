import { Stack, Typography } from '@mui/material';
import { SHELL } from '../theme/createAppTheme.js';

/** Desktop page heading; on phones the shell's top bar already shows the page name. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      sx={{ mb: 3, alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
    >
      <Stack
        spacing={0.5}
        sx={{ display: { xs: subtitle ? 'flex' : 'none', [SHELL.desktopBreakpoint]: 'flex' } }}
      >
        <Typography
          variant="h1"
          sx={{ display: { xs: 'none', [SHELL.desktopBreakpoint]: 'block' } }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        )}
      </Stack>
      {actions && (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}
