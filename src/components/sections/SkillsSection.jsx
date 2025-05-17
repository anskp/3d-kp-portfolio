import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress, 
  useTheme, 
  Tab, 
  Tabs,
  Chip,
  Grow,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';

// Skill category data
const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', proficiency: 95, description: 'Advanced state management, hooks, context API, performance optimization' },
      { name: 'Next.js', proficiency: 90, description: 'Server-side rendering, static generation, API routes, middleware' },
      { name: 'TypeScript', proficiency: 85, description: 'Type definitions, interfaces, generics, utility types' },
      { name: 'Three.js', proficiency: 80, description: '3D rendering, animations, physics, shaders, textures' },
      { name: 'Tailwind', proficiency: 90, description: 'Responsive design, custom configurations, utility-first workflow' },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', proficiency: 90, description: 'RESTful APIs, authentication, middleware, error handling' },
      { name: 'Express', proficiency: 88, description: 'Route handling, middleware chains, error management' },
      { name: 'GraphQL', proficiency: 85, description: 'Schema design, resolvers, subscriptions, Apollo server' },
      { name: 'Prisma', proficiency: 82, description: 'Data modeling, migrations, queries, relations' },
      { name: 'MongoDB', proficiency: 88, description: 'Schema design, indexing, aggregation, performance optimization' },
    ]
  },
  {
    category: 'Blockchain & Web3',
    skills: [
      { name: 'Ethereum', proficiency: 85, description: 'Smart contract development, EVM, web3.js integration' },
      { name: 'Solana', proficiency: 75, description: 'Program development, Anchor framework, SPL tokens' },
      { name: 'Smart Contracts', proficiency: 85, description: 'Solidity, security best practices, gas optimization' },
      { name: 'Web3.js', proficiency: 80, description: 'Wallet integration, transaction management, event listeners' },
      { name: 'IPFS', proficiency: 70, description: 'Content addressing, pinning, distributed file storage' },
    ]
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'Penetration Testing', proficiency: 80, description: 'Vulnerability assessment, exploitation, reporting' },
      { name: 'Threat Modeling', proficiency: 85, description: 'STRIDE, attack surface analysis, risk assessment' },
      { name: 'Secure APIs', proficiency: 90, description: 'Authentication, authorization, input validation, rate limiting' },
      { name: 'Network Security', proficiency: 75, description: 'Firewalls, IDS/IPS, VPNs, secure network architecture' },
    ]
  }
];

// Function to determine color based on proficiency
const getProficiencyColor = (proficiency, theme) => {
  if (proficiency >= 90) return theme.palette.success.main;
  if (proficiency >= 75) return theme.palette.primary.main;
  if (proficiency >= 60) return theme.palette.warning.main;
  return theme.palette.error.main;
};

const SkillsSection = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box 
      id="skills" 
      component="section" 
      sx={{ 
        py: 5,
        mt: '30px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Container>
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
                    color: theme.palette.primary.main, 
                    fontWeight: 600, 
                    letterSpacing: 1.5 
                  }}
                >
                  MY TOOLKIT
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
                    FULL-STACK
                  </Box>
                  <Box component="span" sx={{ display: 'block' }}>
                    BLOCKCHAIN
                  </Box>
                  <Box component="span" sx={{ display: 'block' }}>
                    SECURITY
                  </Box>
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body1" sx={{ mb: 4, maxWidth: '90%' }}>
                    I combine diverse skills across multiple domains to build secure, 
                    innovative, and user-friendly digital solutions. From interactive 
                    frontends to scalable backends and blockchain integration.
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 5px 20px rgba(0,0,0,0.2)' 
                    : '0 5px 20px rgba(0,0,0,0.05)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  mb: 3
                }}
              >
                <Tabs 
                  value={selectedTab} 
                  onChange={handleTabChange} 
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ 
                    mb: 3,
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    },
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.5
                    }
                  }}
                >
                  {skillsData.map((category, index) => (
                    <Tab key={index} label={category.category} />
                  ))}
                </Tabs>
                
                {skillsData.map((category, index) => (
                  <Box
                    key={index}
                    role="tabpanel"
                    hidden={selectedTab !== index}
                    id={`skills-tabpanel-${index}`}
                    aria-labelledby={`skills-tab-${index}`}
                  >
                    {selectedTab === index && (
                      <Box sx={{ py: 2 }}>
                        {category.skills.map((skill, skillIndex) => (
                          <Grow 
                            key={skillIndex} 
                            in={true} 
                            timeout={(skillIndex + 1) * 200}
                            style={{ transformOrigin: '0 0 0' }}
                          >
                            <Box 
                              sx={{ 
                                mb: 3, 
                                p: 2, 
                                borderRadius: 2,
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                '&:hover': {
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Chip 
                                  label={`${skill.proficiency}%`} 
                                  size="small"
                                  sx={{ 
                                    backgroundColor: theme.palette.mode === 'dark' 
                                      ? 'rgba(255,255,255,0.05)' 
                                      : 'rgba(0,0,0,0.05)',
                                    color: getProficiencyColor(skill.proficiency, theme),
                                    fontWeight: 600,
                                    mr: 2,
                                    minWidth: '52px'
                                  }} 
                                />
                                <Tooltip title={skill.description} arrow placement="top">
                                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                    {skill.name}
                                  </Typography>
                                </Tooltip>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={skill.proficiency} 
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 1,
                                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: getProficiencyColor(skill.proficiency, theme),
                                    borderRadius: 1
                                  }
                                }} 
                              />
                            </Box>
                          </Grow>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Paper>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  bgcolor: theme.palette.primary.main,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Want to see my skills in action?
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Check out my projects section to see real examples of my work.
                  </Typography>
                </Box>
                <Chip
                  label="View Projects"
                  component="a"
                  href="#projects"
                  clickable
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    px: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    }
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillsSection; 