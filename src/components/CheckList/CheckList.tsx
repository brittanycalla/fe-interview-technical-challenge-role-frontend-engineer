import {
  Box, 
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';

type TCheckList = {
  header: string;
  tasks: string[];
}

function CheckList({ header, tasks }: TCheckList) {
  return (
    <Box
      component={Paper}
      elevation={2}
      sx={{ padding: '26px' }}
    >
      <Typography variant="h5" textAlign="left" marginBottom="8px">
        {header}
      </Typography>
      <List sx={{ width: '100%' }}>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
      </List>
    </Box>
  );
}

export default CheckList;
