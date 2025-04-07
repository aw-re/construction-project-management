import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import TaskCard, { TaskCardProps } from './TaskCard';

interface KanbanColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: 'todo' | 'in-progress' | 'done';
  onTaskClick?: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  tasks, 
  status,
  onTaskClick 
}) => {
  const theme = useTheme();
  
  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return theme.palette.info.main;
      case 'in-progress':
        return theme.palette.warning.main;
      case 'done':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          pb: 2,
          borderBottom: `2px solid ${getColumnColor()}`
        }}
      >
        <Box 
          sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            backgroundColor: getColumnColor(),
            mr: 1
          }} 
        />
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            ml: 1, 
            backgroundColor: getColumnColor() + '20',
            color: getColumnColor(),
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 'bold'
          }}
        >
          {tasks.length}
        </Typography>
      </Box>
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            {...task} 
            onClick={() => onTaskClick && onTaskClick(task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <Box 
            sx={{ 
              p: 2, 
              textAlign: 'center', 
              color: theme.palette.text.secondary,
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 1,
              backgroundColor: theme.palette.background.paper
            }}
          >
            <Typography variant="body2">No tasks in this column</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default KanbanColumn;
