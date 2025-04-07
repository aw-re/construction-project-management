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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';

// Mock data for tasks
const mockTasks = [
  { 
    id: 1, 
    title: 'Concrete Pouring - Level 5', 
    description: 'Pour and finish concrete for the 5th floor slab according to structural requirements.',
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-12',
    priority: 'high',
    status: 'in-progress',
    assignedBy: 'John Doe',
    assignedDate: '2025-04-01'
  },
  { 
    id: 2, 
    title: 'HVAC System Installation - Ground Floor', 
    description: 'Install heating, ventilation, and air conditioning systems on the ground floor.',
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-25',
    priority: 'medium',
    status: 'todo',
    assignedBy: 'John Doe',
    assignedDate: '2025-04-02'
  },
  { 
    id: 3, 
    title: 'Plumbing Installation - Basement', 
    description: 'Install all plumbing systems in the basement level as per the design specifications.',
    project: 'Riverside Apartments Renovation',
    dueDate: '2025-04-18',
    priority: 'medium',
    status: 'in-progress',
    assignedBy: 'David Wilson',
    assignedDate: '2025-04-03'
  },
  { 
    id: 4, 
    title: 'Interior Wall Framing - Floor 3', 
    description: 'Construct interior wall frames on the 3rd floor according to the floor plan.',
    project: 'Central Park Office Building',
    dueDate: '2025-04-30',
    priority: 'low',
    status: 'todo',
    assignedBy: 'Sarah Williams',
    assignedDate: '2025-04-05'
  },
  { 
    id: 5, 
    title: 'Exterior Painting - West Wing', 
    description: 'Apply exterior paint to the west wing of the building according to the color scheme.',
    project: 'Harbor View Hotel',
    dueDate: '2025-05-05',
    priority: 'medium',
    status: 'todo',
    assignedBy: 'Sarah Williams',
    assignedDate: '2025-04-06'
  },
  { 
    id: 6, 
    title: 'Site Preparation', 
    description: 'Clear the construction site, establish boundaries, and prepare for foundation work.',
    project: 'Metro City Hospital Extension',
    dueDate: '2025-03-30',
    priority: 'high',
    status: 'done',
    assignedBy: 'John Doe',
    assignedDate: '2025-03-15',
    completedDate: '2025-03-28'
  },
  { 
    id: 7, 
    title: 'Initial Excavation', 
    description: 'Complete excavation work for the building foundation and basement levels.',
    project: 'Skyline Tower Construction',
    dueDate: '2025-04-05',
    priority: 'high',
    status: 'done',
    assignedBy: 'John Doe',
    assignedDate: '2025-03-20',
    completedDate: '2025-04-03'
  }
];

const ContractorTasksPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTaskDetailOpen = (task: any) => {
    setSelectedTask(task);
    setTaskDetailOpen(true);
    handleMenuClose();
  };

  const handleTaskDetailClose = () => {
    setTaskDetailOpen(false);
  };

  const handleMarkAsComplete = () => {
    // Handle mark as complete logic here
    handleMenuClose();
  };

  const getFilteredTasks = () => {
    let filtered = mockTasks.filter(task => 
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (priorityFilter === 'all' || task.priority === priorityFilter) &&
      (projectFilter === 'all' || task.project === projectFilter)
    );

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(task => task.status === 'todo');
    } else if (tabValue === 2) {
      filtered = filtered.filter(task => task.status === 'in-progress');
    } else if (tabValue === 3) {
      filtered = filtered.filter(task => task.status === 'done');
    }

    return filtered;
  };

  const getPriorityColor = (priority: string) => {
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

  const getStatusColor = (status: string) => {
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

  // Get unique projects for filter
  const uniqueProjects = Array.from(new Set(mockTasks.map(task => task.project)));

  return (
    <MainLayout title="Tasks" userRole="contractor" userName="Mike Johnson">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          My Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and track your assigned tasks across all projects
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <TextField
          placeholder="Search tasks..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 250 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            select
            label="Priority"
            variant="outlined"
            size="small"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 150 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>
          <TextField
            select
            label="Project"
            variant="outlined"
            size="small"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 200 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="all">All Projects</MenuItem>
            {uniqueProjects.map((project) => (
              <MenuItem key={project} value={project}>
                {project}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Tasks" />
          <Tab label="To Do" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getFilteredTasks()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {task.description.length > 60 
                          ? `${task.description.substring(0, 60)}...` 
                          : task.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: new Date(task.dueDate) < new Date() && task.status !== 'done' 
                            ? theme.palette.error.main 
                            : 'inherit',
                          fontWeight: new Date(task.dueDate) < new Date() && task.status !== 'done' 
                            ? 'bold' 
                            : 'regular'
                        }}
                      >
                        {new Date(task.dueDate).toLocaleDateString()}
                        {new Date(task.dueDate) < new Date() && task.status !== 'done' && (
                          <Typography variant="caption" color="error" sx={{ display: 'block' }}>
                            Overdue
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={task.priority.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getPriorityColor(task.priority) + '20',
                          color: getPriorityColor(task.priority),
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={task.status.replace('-', ' ').toUpperCase()} 
                        size="small" 
                        sx={{ 
                          backgroundColor: getStatusColor(task.status) + '20',
                          color: getStatusColor(task.status),
                          fontWeight: 'bold'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small"
                        onClick={(e) => handleMenuOpen(e, task.id)}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getFilteredTasks().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {getFilteredTasks().length === 0 && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            border: `1px dashed ${theme.palette.divider}`
          }}
        >
          <AssignmentIcon sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters to find what you're looking for.
          </Typography>
        </Paper>
      )}

      {/* Task action menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          const task = mockTasks.find(t => t.id === selectedTaskId);
          if (task) handleTaskDetailOpen(task);
        }}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        {selectedTaskId && mockTasks.find(t => t.id === selectedTaskId)?.status !== 'done' && (
          <MenuItem onClick={handleMarkAsComplete}>
            <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
            Mark as Complete
          </MenuItem>
        )}
      </Menu>

      {/* Task detail dialog */}
      <Dialog
        open={taskDetailOpen}
        onClose={handleTaskDetailClose}
        maxWidth="md"
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                {selectedTask.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip 
                  label={selectedTask.priority.toUpperCase()} 
                  size="small" 
                  sx={{ 
                    backgroundColor: getPriorityColor(selectedTask.priority) + '20',
                    color: getPriorityColor(selectedTask.priority),
                    fontWeight: 'bold'
                  }} 
                />
                <Chip 
                  label={selectedTask.status.replace('-', ' ').toUpperCase()} 
                  size="small" 
                  sx={{ 
                    backgroundColor: getStatusColor(selectedTask.status) + '20',
                    color: getStatusColor(selectedTask.status),
                    fontWeight: 'bold'
                  }} 
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedTask.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Project
                  </Typography>
                  <Typography variant="body1">
                    {selectedTask.project}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Due Date
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: new Date(selectedTask.dueDate) < new Date() && selectedTask.status !== 'done' 
                        ? theme.palette.error.main 
                        : 'inherit',
                      fontWeight: new Date(selectedTask.dueDate) < new Date() && selectedTask.status !== 'done' 
                        ? 'bold' 
                        : 'regular'
                    }}
                  >
                    {new Date(selectedTask.dueDate).toLocaleDateString()}
                    {new Date(selectedTask.dueDate) < new Date() && selectedTask.status !== 'done' && (
                      <Typography variant="caption" color="error" sx={{ display: 'block' }}>
                        Overdue
                      </Typography>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Assigned By
                  </Typography>
                  <Typography variant="body1">
                    {selectedTask.assignedBy}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Assigned Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedTask.assignedDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                {selectedTask.status === 'done' && selectedTask.completedDate && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Completed Date
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedTask.completedDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTaskDetailClose} color="inherit">
                Close
              </Button>
              {selectedTask.status !== 'done' && (
                <Button 
                  onClick={() => {
                    handleMarkAsComplete();
                    handleTaskDetailClose();
                  }} 
                  color="primary" 
                  variant="contained"
                >
                  Mark as Complete
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </MainLayout>
  );
};

export default ContractorTasksPage;
