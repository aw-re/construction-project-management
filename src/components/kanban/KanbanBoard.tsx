import React, { useState } from 'react';
import { Grid, Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import KanbanColumn from './KanbanColumn';
import { TaskCardProps } from './TaskCard';

interface KanbanBoardProps {
  projectId: string;
  projectName: string;
  tasks: TaskCardProps[];
  onTaskClick?: (taskId: string) => void;
  onAddTask?: () => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  projectId,
  projectName,
  tasks,
  onTaskClick,
  onAddTask
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {projectName} - Task Board
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={onAddTask}
        >
          Add Task
        </Button>
      </Box>
      
      <Grid container spacing={3} sx={{ height: isMobile ? 'auto' : 'calc(100vh - 220px)' }}>
        <Grid item xs={12} md={4}>
          <KanbanColumn 
            title="To Do" 
            tasks={todoTasks} 
            status="todo"
            onTaskClick={onTaskClick}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KanbanColumn 
            title="In Progress" 
            tasks={inProgressTasks} 
            status="in-progress"
            onTaskClick={onTaskClick}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KanbanColumn 
            title="Done" 
            tasks={doneTasks} 
            status="done"
            onTaskClick={onTaskClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default KanbanBoard;
