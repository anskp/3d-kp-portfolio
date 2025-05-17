import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText, 
  useScrollTrigger,
  Slide,
  Container,
  useTheme,
  Avatar,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  GitHub as GitHubIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';

// NavLinks data
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toggleColorMode, mode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Function to handle scroll and update active section
    const handleScroll = () => {
      // Get all sections and determine which one is in view
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      if (drawerOpen) setDrawerOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ bgcolor: theme.palette.background.paper, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle} size="large">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.name} disablePadding>
            <ListItemButton 
              onClick={() => handleNavClick(link.href.substring(1))}
              selected={activeSection === link.href.substring(1)}
              sx={{
                py: 2,
                borderLeft: activeSection === link.href.substring(1) ? 
                  `4px solid ${theme.palette.primary.main}` : 
                  '4px solid transparent',
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(57, 144, 255, 0.08)' : 'rgba(9, 107, 222, 0.08)'
                }
              }}
            >
              <ListItemText 
                primary={link.name} 
                primaryTypographyProps={{
                  variant: 'h6',
                  fontWeight: activeSection === link.href.substring(1) ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<GitHubIcon />} 
          fullWidth
          onClick={() => window.open("https://github.com/anskp", "_blank")}
        >
          GitHub
        </Button>
        <Button 
          variant="contained" 
          startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleColorMode}
          fullWidth
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            backdropFilter: 'blur(8px)',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(19, 19, 24, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      width: 40, 
                      height: 40, 
                      mr: 1.5,
                      fontWeight: 'bold'
                    }}
                  >
                    AK
                  </Avatar>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.text.primary
                    }}
                  >
                    <Box component="span">ANAS</Box>
                    <Box 
                      component="span" 
                      sx={{ 
                        opacity: 0.7,
                        fontWeight: 400,
                        ml: 0.5,
                        color: theme.palette.text.primary
                      }}
                    >
                      KP
                    </Box>
                  </Typography>
                </Box>
              </motion.div>

              {/* Desktop navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {navLinks.map((link, index) => (
                        <Button
                          key={link.name}
                          onClick={() => handleNavClick(link.href.substring(1))}
                          sx={{
                            color: activeSection === link.href.substring(1) ? 
                              theme.palette.primary.main : 
                              theme.palette.text.primary,
                            fontWeight: activeSection === link.href.substring(1) ? 600 : 400,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: activeSection === link.href.substring(1) ? '100%' : '0%',
                              height: '2px',
                              bottom: 7,
                              left: 0,
                              bgcolor: theme.palette.primary.main,
                              transition: 'width 0.3s ease'
                            },
                            '&:hover::after': {
                              width: '100%'
                            }
                          }}
                        >
                          {link.name}
                        </Button>
                      ))}
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <IconButton
                        size="small"
                        onClick={toggleColorMode}
                        color="inherit"
                        sx={{ 
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                      </IconButton>
                      
                      <Button
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        onClick={() => window.open("https://github.com/anskp", "_blank")}
                      >
                        GitHub
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              )}

              {/* Mobile hamburger menu */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '280px',
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Navbar; 