import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import KanbanBoard from '../../components/kanban/KanbanBoard';
import { TaskCardProps } from '../../components/kanban/TaskCard';

// Mock data for project details
const mockProject = {
  id: 1, 
  name: 'Skyline Tower Construction', 
  description: 'Construction of a 30-story commercial tower in downtown area with modern facilities and sustainable design.',
  progress: 75, 
  engineers: 4, 
  contractors: 6,
  startDate: '2024-10-15',
  dueDate: '2025-08-15',
  status: 'in-progress',
  budget: 12500000,
  location: 'Downtown, Metro City'
};

// Mock data for tasks
const mockTasks: TaskCardProps[] = [
  {
    id: '1',
    title: 'Foundation Inspection',
    description: 'Conduct thorough inspection of the foundation work to ensure compliance with specifications.',
    assignee: {
      name: 'Jane Smith',
      avatar: ''
    },
    dueDate: '2025-04-15',
    priority: 'high',
    commentsCount: 5,
    attachmentsCount: 3,
    status: 'todo'
  },
  {
    id: '2',
    title: 'Electrical Wiring - Floor 1',
    description: 'Complete electrical wiring installation for the first floor according to the approved plans.',
    assignee: {
      name: 'Robert Brown',
      avatar: ''
    },
    dueDate: '2025-04-20',
    priority: 'medium',
    commentsCount: 2,
    attachmentsCount: 1,
    status: 'todo'
  },
  {
    id: '3',
    title: 'Plumbing Installation - Basement',
    description: 'Install all plumbing systems in the basement level as per the design specifications.',
    assignee: {
      name: 'Mike Johnson',
      avatar: ''
    },
    dueDate: '2025-04-18',
    priority: 'medium',
    commentsCount: 3,
    attachmentsCount: 2,
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Concrete Pouring - Level 5',
    description: 'Pour and finish concrete for the 5th floor slab according to structural requirements.',
    assignee: {
      name: 'Emily Davis',
      avatar: ''
    },
    dueDate: '2025-04-12',
    priority: 'high',
    commentsCount: 7,
    attachmentsCount: 4,
    status: 'in-progress'
  },
  {
    id: '5',
    title: 'HVAC System Installation - Ground Floor',
    description: 'Install heating, ventilation, and air conditioning systems on the ground floor.',
    assignee: {
      name: 'David Wilson',
      avatar: ''
    },
    dueDate: '2025-04-25',
    priority: 'low',
    commentsCount: 1,
    attachmentsCount: 2,
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Site Preparation',
    description: 'Clear the construction site, establish boundaries, and prepare for foundation work.',
    assignee: {
      name: 'Lisa Taylor',
      avatar: ''
    },
    dueDate: '2025-03-30',
    priority: 'medium',
    commentsCount: 4,
    attachmentsCount: 6,
    status: 'done'
  },
  {
    id: '7',
    title: 'Initial Excavation',
    description: 'Complete excavation work for the building foundation and basement levels.',
    assignee: {
      name: 'Mike Johnson',
      avatar: ''
    },
    dueDate: '2025-04-05',
    priority: 'high',
    commentsCount: 3,
    attachmentsCount: 5,
    status: 'done'
  }
];

// Mock data for team members
const mockTeamMembers = [
  { id: 1, name: 'Jane Smith', role: 'engineer', email: 'jane.smith@example.com', company: 'Smith Engineering' },
  { id: 2, name: 'Robert Brown', role: 'engineer', email: 'robert.brown@example.com', company: 'Brown Engineering' },
  { id: 3, name: 'Lisa Taylor', role: 'engineer', email: 'lisa.taylor@example.com', company: 'Taylor Engineering' },
  { id: 4, name: 'David Wilson', role: 'engineer', email: 'david.wilson@example.com', company: 'Wilson Engineering' },
  { id: 5, name: 'Mike Johnson', role: 'contractor', email: 'mike.johnson@example.com', company: 'Johnson Contractors' },
  { id: 6, name: 'Emily Davis', role: 'contractor', email: 'emily.davis@example.com', company: 'Davis Construction' },
  { id: 7, name: 'Alex Turner', role: 'contractor', email: 'alex.turner@example.com', company: 'Turner Builders' },
  { id: 8, name: 'Sarah Williams', role: 'contractor', email: 'sarah.williams@example.com', company: 'Williams Construction' },
  { id: 9, name: 'Chris Martin', role: 'contractor', email: 'chris.martin@example.com', company: 'Martin & Sons' },
  { id: 10, name: 'Jessica Lee', role: 'contractor', email: 'jessica.lee@example.com', company: 'Lee Construction' }
];

const OwnerProjectDetailPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInviteDialogOpen = () => {
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setInviteDialogOpen(false);
  };

  const handleTaskDialogOpen = () => {
    setTaskDialogOpen(true);
  };

  const handleTaskDialogClose = () => {
    setTaskDialogOpen(false);
  };

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
    // Open task details dialog or navigate to task details page
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'engineer':
        return theme.palette.success.main;
      case 'contractor':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <MainLayout title={mockProject.name} userRole="owner" userName="John Doe">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {mockProject.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {mockProject.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Status: ${mockProject.status.replace('-', ' ').toUpperCase()}`} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={`Progress: ${mockProject.progress}%`} 
                color="success" 
                variant="outlined" 
              />
              <Chip 
                label={`Budget: $${mockProject.budget.toLocaleString()}`} 
                color="info" 
                variant="outlined" 
              />
              <Chip 
                label={`Due: ${new Date(mockProject.dueDate).toLocaleDateString()}`} 
                color="warning" 
                variant="outlined" 
              />
            </Box>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<PersonAddIcon />}
              onClick={handleInviteDialogOpen}
              sx={{ mr: 1 }}
            >
              Invite Team
            </Button>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Task Board" />
          <Tab label="Team" />
          <Tab label="Files" />
          <Tab label="Details" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleTaskDialogOpen}
            >
              Add Task
            </Button>
          </Box>
          <KanbanBoard 
            projectId={mockProject.id.toString()} 
            projectName={mockProject.name}
            tasks={mockTasks}
            onTaskClick={handleTaskClick}
            onAddTask={handleTaskDialogOpen}
          />
        </Box>
      )}

      {tabValue === 1 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Project Team
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<PersonAddIcon />}
              onClick={handleInviteDialogOpen}
            >
              Invite Team Member
            </Button>
          </Box>

          <Grid container spacing={3}>
            {mockTeamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: getRoleColor(member.role) + '30',
                        color: getRoleColor(member.role),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        mr: 2
                      }}
                    >
                      {member.name.charAt(0)}
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {member.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Project Files
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
            >
              Upload File
            </Button>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            File management functionality would be implemented here
          </Typography>
        </Paper>
      )}

      {tabValue === 3 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Project Details
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Project Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {mockProject.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {mockProject.location}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Start Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {new Date(mockProject.startDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Due Date
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {new Date(mockProject.dueDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                ${mockProject.budget.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                {mockProject.status.replace('-', ' ')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">
                {mockProject.description}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Project action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Export Project Data
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          Archive Project
        </MenuItem>
      </Menu>

      {/* Invite team dialog */}
      <Dialog
        open={inviteDialogOpen}
        onClose={handleInviteDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Invite Team Member</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                placeholder="Enter email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                select
                variant="outlined"
                defaultValue="engineer"
                required
              >
                <MenuItem value="engineer">Engineer</MenuItem>
                <MenuItem value="contractor">Contractor</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={3}
                placeholder="Add a personal message to the invitation"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleInviteDialogClose} color="primary" variant="contained">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add task dialog */}
      <Dialog
        open={taskDialogOpen}
        onClose={handleTaskDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assignee"
                select
                variant="outlined"
                required
              >
                {mockTeamMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Priority"
                select
                variant="outlined"
                defaultValue="medium"
                required
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                select
                variant="outlined"
                defaultValue="todo"
                required
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleTaskDialogClose} color="primary" variant="contained">
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default OwnerProjectDetailPage;
