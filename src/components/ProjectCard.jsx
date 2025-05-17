import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  CardActionArea, 
  CardActions, 
  Button, 
  useTheme,
  IconButton,
  Grow 
} from '@mui/material';
import { 
  GitHub as GitHubIcon, 
  OpenInNew as OpenInNewIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProjectCard = ({ 
  title, 
  description, 
  tags = [], 
  githubUrl,
  liveUrl,
  imageUrl
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // For debugging purposes
  useEffect(() => {
    console.log(`Project ${title} has imageUrl: ${imageUrl}`);
  }, [title, imageUrl]);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={600}>
      <Card 
        component={motion.div}
        whileHover={{ 
          y: -8,
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 10px 30px rgba(0,0,0,0.7)' 
            : '0 10px 30px rgba(0,0,0,0.15)' 
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          overflow: 'hidden',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        }}
      >
        {/* Project Image */}
        <Box 
          sx={{ 
            height: 180, 
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: theme.palette.mode === 'dark' ? '#1A1A1F' : '#F0F0F5',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'all 0.3s ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {!imageUrl && (
            <Typography 
              variant="h5" 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Typography>
          )}
          
          {/* Like Button */}
          <IconButton
            onClick={handleLike}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)',
              }
            }}
            size="small"
          >
            {liked ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
        
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              color: theme.palette.text.primary
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              minHeight: '3em', // Ensures consistent height
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mt: 'auto' }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ 
                  borderRadius: '4px',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(57, 144, 255, 0.08)' : 'rgba(9, 107, 222, 0.08)',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(57, 144, 255, 0.3)' : 'rgba(9, 107, 222, 0.3)',
                  color: theme.palette.primary.main
                }}
              />
            ))}
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0 }}>
          {githubUrl && (
            <Button 
              size="small" 
              startIcon={<GitHubIcon />} 
              onClick={(e) => {
                e.stopPropagation();
                window.open(githubUrl, '_blank');
              }}
              sx={{ mr: 1 }}
            >
              GitHub
            </Button>
          )}
          
          {liveUrl && (
            <Button
              size="small"
              color="primary"
              variant="contained"
              startIcon={<OpenInNewIcon />}
              onClick={(e) => {
                e.stopPropagation();
                window.open(liveUrl, '_blank');
              }}
            >
              Live Demo
            </Button>
          )}
        </CardActions>
      </Card>
    </Grow>
  );
};

export default ProjectCard; 