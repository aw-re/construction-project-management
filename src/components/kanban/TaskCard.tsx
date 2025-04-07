import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  CardActions, 
  IconButton,
  Badge,
  useTheme
} from '@mui/material';
import { 
  Comment as CommentIcon, 
  Attachment as AttachmentIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  commentsCount: number;
  attachmentsCount: number;
  status: 'todo' | 'in-progress' | 'done';
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  assignee,
  dueDate,
  priority,
  commentsCount,
  attachmentsCount,
  status,
  onClick
}) => {
  const theme = useTheme();
  
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusColor = () => {
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
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.3s ease'
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip 
            label={priority.toUpperCase()} 
            size="small" 
            sx={{ 
              backgroundColor: getPriorityColor() + '20',
              color: getPriorityColor(),
              fontWeight: 'bold',
              fontSize: '0.7rem'
            }} 
          />
          <Chip 
            label={status.replace('-', ' ').toUpperCase()} 
            size="small" 
            sx={{ 
              backgroundColor: getStatusColor() + '20',
              color: getStatusColor(),
              fontWeight: 'bold',
              fontSize: '0.7rem'
            }} 
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </Typography>
        
        {dueDate && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Due: {new Date(dueDate).toLocaleDateString()}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          {assignee ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={assignee.avatar} 
                alt={assignee.name}
                sx={{ width: 24, height: 24, mr: 1 }}
              >
                {assignee.name.charAt(0)}
              </Avatar>
              <Typography variant="caption">{assignee.name}</Typography>
            </Box>
          ) : (
            <Box />
          )}
          
          <Box sx={{ display: 'flex' }}>
            <Badge badgeContent={commentsCount} color="primary" sx={{ mr: 1 }}>
              <CommentIcon fontSize="small" color="action" />
            </Badge>
            <Badge badgeContent={attachmentsCount} color="primary">
              <AttachmentIcon fontSize="small" color="action" />
            </Badge>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
