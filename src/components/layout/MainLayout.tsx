import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  userRole: 'admin' | 'owner' | 'engineer' | 'contractor';
  userName: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title, 
  userRole, 
  userName 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Header 
        onSidebarToggle={handleDrawerToggle} 
        title={title} 
        userRole={userRole} 
        userName={userName} 
      />
      <Sidebar 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        userRole={userRole} 
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isMobile ? 0 : 250}px)` },
          ml: { sm: isMobile ? 0 : '250px' },
          mt: '64px',
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
