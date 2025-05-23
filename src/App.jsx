import { useEffect } from 'react'
import './App.css'
import ModelAnimation from './components/ModelAnimation'
import { ThemeContextProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import SkillsSection from './components/sections/SkillsSection'
import { Box, Container, Grid, Typography, Button, Divider, Paper, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import ProjectCard from './components/ProjectCard'

// Project data
const projectsData = [
  {
    title: 'AI-Full-Vuln-Scan-Web',
    description: 'AI-powered vulnerability scanning web application',
    tags: ['JavaScript', 'Security', 'AI'],
    githubUrl: 'https://github.com/anskp/AI-Full-Vuln-Scan-Web',
    imageUrl: '/images/male0290.png'
  },
  {
    title: '3D-AI-Vulnerability-Scanner-Web',
    description: '3D visualization tool for network security scanning',
    tags: ['JavaScript', 'Three.js', 'Security'],
    githubUrl: 'https://github.com/anskp/3D-AI-Vulnerability-Scanner-Web',
    imageUrl: '/images/male0280.png'
  },
  {
    title: 'Asset Tokenization',
    description: 'Blockchain platform for tokenizing real-world assets',
    tags: ['JavaScript', 'Blockchain', 'Web3'],
    githubUrl: 'https://github.com/anskp/asset-tokenization-demo',
    imageUrl: '/images/male0270.png'
  },
  {
    title: 'Creative Blocks Portfolio',
    description: 'Interactive portfolio template with creative blocks',
    tags: ['TypeScript', 'React', 'Creative'],
    githubUrl: 'https://github.com/anskp/creative-blocks-portfolio',
    imageUrl: '/images/male0260.png'
  }
];

function App() {
  const theme = useTheme();
  
  useEffect(() => {
    // This will run when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeContextProvider>
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default', // Explicitly set the background color
        color: 'text.primary'
      }}>
        <Navbar />
        
        {/* Hidden model animation for scroll effects */}
        <Box 
          sx={{ 
            position: 'fixed', 
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1 // Lower z-index to make it appear behind contact section
          }}
        >
          <ModelAnimation />
        </Box>
        
        <Box 
          id="main" 
          sx={{ 
            position: 'relative', 
            minHeight: '600vh', // Make sure we have enough scroll area for the animation
            zIndex: 2, // Keep content above background but below the model
            bgcolor: 'background.default' // Explicitly set background color to theme default
          }}
        >
          {/* About Section - Now the first section */}
          <Box 
            id="about" 
            component="section"
            sx={{ 
              pt: 0,
              mt: 0,
              height: 'auto', // Changed from 100vh to auto to prevent extra space
              minHeight: '60vh', // Set minimum height but not full viewport height
              display: 'flex', 
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 0,
              pb: 2, // Add a small padding at the bottom
              bgcolor: 'background.default' // Explicitly set background color to theme default
            }}
          >
            <Container maxWidth="xl" sx={{ position: 'relative' }}>
              {/* Name Highlight - positioned absolutely relative to the container */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  right: 0,
                  top: '100px',
                  padding: { xs: '0 20px', md: '0 48px' },
                  zIndex: 20,
                  display: 'block',
                  width: 'auto'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1.5
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: [0, -1, 1, -1, 0],
                    transition: { duration: 0.5 }
                  }}
                  drag="x"
                  dragConstraints={{ left: -50, right: 50 }}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.div
                    style={{ position: 'relative' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      style={{ 
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '8px',
                        background: 'linear-gradient(45deg, #0070f3, #6c63ff)',
                        filter: 'blur(15px)',
                        opacity: 0.7
                      }}
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                <Typography 
                      variant="h1"
                  sx={{ 
                        position: 'relative',
                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                        fontWeight: 800,
                        color: 'transparent',
                        backgroundImage: (theme) => 
                          theme.palette.mode === 'dark'
                            ? 'linear-gradient(45deg, #149eca 20%, #6c63ff 70%)'
                            : 'linear-gradient(45deg, #0070f3 30%, #6c63ff 90%)',
                        backgroundClip: 'text',
                        textShadow: (theme) => 
                          theme.palette.mode === 'dark'
                            ? '0 0 20px rgba(20, 158, 202, 0.3)'
                            : '0 0 20px rgba(0, 112, 243, 0.2)'
                      }}
                    >
                      ANAS KP
                </Typography>
              </motion.div>
                </motion.div>
          </Box>

              <Grid container spacing={5} alignItems="flex-start">
                {/* Left column - Story and Title */}
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Typography 
                      variant="overline"
                      component="h3"
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 600,
                        letterSpacing: 1.5,
                        mt: 4 // Add a small margin to prevent overlap with navbar
                      }}
                    >
                      MY STORY
                    </Typography>
                    <Typography 
                      variant="h2" 
                      component="h2"
                      sx={{ 
                        mb: 4,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: { xs: '2.5rem', md: '3rem' }
                      }}
                    >
                      <Box component="span" sx={{ display: 'block' }}>
                        MULTI-TALENTED
                      </Box>
                      <Box component="span" sx={{ display: 'block' }}>
                        TECH EXPLORER
                      </Box>
                      <Box component="span" sx={{ display: 'block' }}>
                        DIGITAL CRAFTSMAN
                      </Box>
                    </Typography>
                  </motion.div>
                </Grid>
                
                {/* Right column - Description */}
                <Grid item xs={12} md={6}>
                  {/* Description Paper */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'background.paper',
                        boxShadow: (theme) => theme.palette.mode === 'dark' 
                          ? '0 5px 20px rgba(0,0,0,0.2)' 
                          : '0 5px 20px rgba(0,0,0,0.05)',
                        border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                          lineHeight: 1.8,
                          fontWeight: 500
                        }}
                      >
                        I'M A COMPUTER SCIENCE ENGINEER WITH A PASSION FOR BUILDING
                        SECURE, INTELLIGENT, AND CREATIVE DIGITAL SOLUTIONS.
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        paragraph
                        sx={{ 
                          lineHeight: 1.8,
                          fontWeight: 500
                        }}
                      >
                        MY EXPERTISE SPANS ACROSS FULL-STACK DEVELOPMENT, CYBERSECURITY,
                        BLOCKCHAIN TECHNOLOGY, AI, AND CREATIVE CODING.
                      </Typography>
                      
                      <Typography 
                        variant="body1"
                        sx={{ 
                          lineHeight: 1.8,
                          fontWeight: 500
                        }}
                      >
                        I BRIDGE THE GAP BETWEEN TECHNOLOGY AND CREATIVITY,
                        BRINGING INNOVATIVE IDEAS TO LIFE THROUGH CODE.
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Skills Section (using the component we created) */}
          <SkillsSection />

          {/* Projects Section */}
          <Box 
            id="projects" 
            component="section"
            sx={{ 
              minHeight: '100vh',
              py: 15,
              position: 'relative',
              zIndex: 10,
              bgcolor: 'background.default' // Explicitly set background color to theme default
            }}
          >
            <Container maxWidth="xl">
              <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'sticky', top: 100 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Typography 
                        variant="overline"
                        component="h3"
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          letterSpacing: 1.5
                        }}
                      >
                        MY PROJECTS
                      </Typography>
                      <Typography 
                        variant="h2" 
                        component="h2"
                        sx={{ 
                          mb: 3,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          fontSize: { xs: '2.5rem', md: '3rem' }
                        }}
                      >
                        <Box component="span" sx={{ display: 'block' }}>
                          CREATE
                        </Box>
                        <Box component="span" sx={{ display: 'block' }}>
                          BUILD
                        </Box>
                        <Box component="span" sx={{ display: 'block' }}>
                          SECURE
                        </Box>
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
                        These projects showcase my skills in building secure, 
                        intelligent, and creative digital solutions. Each demonstrates
                        different aspects of my technical expertise.
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    {projectsData.map((project, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <ProjectCard 
                          title={project.title}
                          description={project.description}
                          tags={project.tags}
                          githubUrl={project.githubUrl}
                          liveUrl={project.liveUrl}
                          imageUrl={project.imageUrl}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => window.open("https://github.com/anskp?tab=repositories", "_blank")}
                      sx={{ borderRadius: '50px', px: 4 }}
                    >
                      View More On GitHub
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Contact Section */}
          <Box 
            id="contact" 
            component="section"
            sx={{ 
              minHeight: '100vh',
              py: 15,
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              zIndex: 100, // Increased z-index to ensure it's in front of the model
              bgcolor: 'background.default'
            }}
          >
            <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ width: '100%', maxWidth: '500px' }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 8 },
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    boxShadow: (theme) => theme.palette.mode === 'dark' 
                      ? '0 8px 32px rgba(0,0,0,0.5)' 
                      : '0 8px 32px rgba(0,0,0,0.15)',
                    border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    textAlign: 'center',
                    position: 'relative', // Ensure proper stacking context
                    zIndex: 101, // Higher than parent to ensure it's in foreground
                    backdropFilter: 'blur(5px)', // Add blur effect to ensure visibility
                  }}
                >
                  <Typography 
                    variant="h2" 
                    component="h2"
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    Connect With Me
                  </Typography>
                  
                  <Typography 
                    variant="body1"
                    sx={{ 
                      mb: 5,
                      maxWidth: '70%',
                      mx: 'auto'
                    }}
                  >
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                  </Typography>
                  
                  <Grid container spacing={4} justifyContent="center" sx={{ mb: 5 }}>
                    <Grid item xs={12} sm={6}>
                      <Box 
                        sx={{ 
                          py: 3, 
                          px: 2,
                          borderRadius: 2,
                          bgcolor: 'background.default',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                          ✉️
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                          Email
                        </Typography>
                        <Typography 
                          variant="body2"
                          component="a" 
                          href="mailto:anaskoyakkara@gmail.com"
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          anaskoyakkara@gmail.com
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box 
                        sx={{ 
                          py: 3, 
                          px: 2,
                          borderRadius: 2,
                          bgcolor: 'background.default',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                          🌐
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                          GitHub
                        </Typography>
                        <Typography 
                          variant="body2"
                          component="a" 
                          href="https://github.com/anskp" 
                          target="_blank"
                          rel="noopener"
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          github.com/anskp
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => window.location.href = 'mailto:anaskoyakkara@gmail.com'}
                    sx={{ 
                      borderRadius: '50px', 
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem'
                    }}
                  >
                    Say Hello
                  </Button>
                </Paper>
                
                <Box 
                  component="footer"
                  sx={{ 
                    mt: 6,
                    textAlign: 'center',
                    py: 2
                  }}
                >
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary">
                    &copy; 2025 Muhammed Anas KP. All rights reserved.
                  </Typography>
                </Box>
              </motion.div>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeContextProvider>
  )
}

export default App