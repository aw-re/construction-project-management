import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Chip, 
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Flag as FlagIcon
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  subtitle,
  trend
}) => {
  const theme = useTheme();
  
  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'error':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: -20,
          left: 20,
          width: 56,
          height: 56,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: getColorValue(),
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        {icon}
      </Box>
      <CardContent sx={{ pt: 5, pb: 2, px: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {trend && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Chip 
              label={`${trend.isPositive ? '+' : ''}${trend.value}%`} 
              size="small" 
              sx={{ 
                backgroundColor: trend.isPositive ? theme.palette.success.light : theme.palette.error.light,
                color: trend.isPositive ? theme.palette.success.dark : theme.palette.error.dark,
                fontWeight: 'bold',
                mr: 1
              }} 
            />
            <Typography variant="caption" color="text.secondary">
              vs previous period
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
