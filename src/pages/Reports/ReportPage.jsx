import React from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Stack, Chip, 
  Card, CardContent, Avatar, Button, Divider, LinearProgress 
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// ==================== ANIMATIONS ====================
const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-15px) }
  100% { transform: translateY(0px) }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 30px rgba(0, 176, 255, 0.3) }
  50% { box-shadow: 0 0 60px rgba(0, 176, 255, 0.6) }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px) }
  to { opacity: 1; transform: translateY(0) }
`;

// ==================== STYLED COMPONENTS ====================
const AboutContainer = styled(Box)({
  background: 'linear-gradient(180deg, #06090f 0%, #0a1628 50%, #0f172a 100%)',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  color: '#fff'
});

const LightOrb = styled(Box)({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(150px)',
  opacity: 0.1,
  zIndex: 1
});

const ProfileContainer = styled(Paper)({
  position: 'relative',
  padding: '20px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00b0ff, #00d4ff)',
  animation: `${pulse} 3s infinite`
});

const ProfileImage = styled(Box)({
  width: '280px',
  height: '280px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '5px solid rgba(0, 176, 255, 0.5)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#00d4ff',
    boxShadow: '0 30px 80px rgba(0, 176, 255, 0.3)'
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

const FeatureCard = styled(Paper)({
  padding: '30px',
  borderRadius: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
  height: '100%',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    backgroundColor: 'rgba(0, 176, 255, 0.08)',
    borderColor: '#00b0ff'
  }
});

const StatCard = styled(Card)({
  borderRadius: '0px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: 'rgba(0, 176, 255, 0.1)'
  }
});

export default function ReportPage() {
  return (
    <AboutContainer>
      {/* Background Orbs */}
      <LightOrb sx={{ width: '600px', height: '600px', background: '#00b0ff', top: '-10%', left: '-10%' }} />
      <LightOrb sx={{ width: '500px', height: '500px', background: '#8b5cf6', bottom: '20%', right: '-10%' }} />
      <LightOrb sx={{ width: '300px', height: '300px', background: '#00d4ff', top: '50%', left: '50%' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        
        {/* ==================== HEADER SECTION ==================== */}
        <Box sx={{ textAlign: 'center', mb: 10, animation: `${slideIn} 0.8s ease` }}>
          <Chip 
            label="✨ ABOUT US"
            sx={{ 
              background: 'linear-gradient(90deg, #00b0ff, #00d4ff)',
              color: '#fff',
              fontWeight: 800,
              px: 3,
              py: 1.5,
              fontSize: '14px',
              borderRadius: '0px',
              mb: 3
            }}
          />
          <Typography variant="h1" fontWeight="950" sx={{ 
            mb: 2, 
            fontSize: { xs: '2.5rem', md: '4rem' },
            letterSpacing: '-1px',
            background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Water Corporation
          </Typography>
          <Typography variant="h5" color="#64748b" sx={{ maxWidth: '700px', mx: 'auto', fontWeight: 300 }}>
            Managing water resources with advanced technology and dedicated service since 1995
          </Typography>
        </Box>

        {/* ==================== PROFILE & INFO SECTION ==================== */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          
          {/* Profile Image */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center', animation: `${float} 4s ease-in-out infinite` }}>
              <ProfileImage>
                <img src="/ME.JPG.jpg" alt="Developer" />
              </ProfileImage>
            </Box>
          </Grid>

          {/* Info Cards */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pl: { md: 4 } }}>
              <Typography variant="h3" fontWeight="900" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Welcome to Water Corporation
              </Typography>
              
              <Stack spacing={3}>
                <FeatureCard>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#cbd5e1' }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident deleniti, neque ullam totam a sapiente praesentium vel consequatur eum sunt? Maxime quidem qui est minima libero voluptatibus at doloribus ad! Lorem ipsum dolor sit amet.
                  </Typography>
                </FeatureCard>

                <FeatureCard>
                  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#cbd5e1' }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, voluptatum. Consequuntur non libero dolore eum id facere ipsa, excepturi tenetur autem architecto labore explicabo, aliquid molestias sed aperiam mollitia. Nisi? dolor sit amet.
                  </Typography>
                </FeatureCard>
              </Stack>

              {/* Progress Bars */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="600">Customer Satisfaction</Typography>
                    <Typography variant="body2" color="#00b0ff" fontWeight="700">95%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 0, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#00b0ff' } }} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="600">Service Efficiency</Typography>
                    <Typography variant="body2" color="#22c55e" fontWeight="700">88%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 0, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { bgcolor: '#22c55e' } }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ==================== STATS SECTION ==================== */}
        <Paper sx={{ p: 5, bgcolor: 'rgba(0, 0, 0, 0.3)', borderRadius: 0, border: '1px solid rgba(255,255,255,0.1)', mb: 12 }}>
          <Grid container spacing={4}>
            {[
              { icon: <WaterDropIcon sx={{ fontSize: 50 }} />, number: '25+', label: 'Years Experience', color: '#00b0ff' },
              { icon: <GroupIcon sx={{ fontSize: 50 }} />, number: '50K+', label: 'Happy Customers', color: '#22c55e' },
              { icon: <SupportAgentIcon sx={{ fontSize: 50 }} />, number: '24/7', label: 'Support Available', color: '#8b5cf6' },
              { icon: <TrendingUpIcon sx={{ fontSize: 50 }} />, number: '99%', label: 'Success Rate', color: '#f59e0b' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <StatCard sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ color: stat.color, mb: 2 }}>{stat.icon}</Box>
                  <Typography variant="h3" fontWeight="900" sx={{ fontSize: '2.5rem', color: stat.color }}>{stat.number}</Typography>
                  <Typography variant="body1" color="#94a3b8">{stat.label}</Typography>
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* ==================== SERVICES SECTION ==================== */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h3" fontWeight="900" sx={{ mb: 2, textAlign: 'center', fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Our Services
          </Typography>
          <Typography variant="h6" color="#64748b" sx={{ mb: 6, textAlign: 'center' }}>
            Comprehensive water management solutions
          </Typography>

          <Grid container spacing={3}>
            {[
              { title: 'Water Distribution', desc: 'Efficient pipeline management and distribution network across all areas' },
              { title: 'Bill Management', desc: 'Automated billing system with online payment and account management' },
              { title: 'Customer Care', desc: '24/7 customer support for all queries and service requests' },
              { title: 'Quality Testing', desc: 'Regular water quality testing and maintenance of supply standards' }
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  <CheckCircleIcon sx={{ color: '#00b0ff', fontSize: 30, mb: 2 }} />
                  <Typography variant="h6" fontWeight="800" gutterBottom>{service.title}</Typography>
                  <Typography variant="body2" color="#94a3b8" sx={{ lineHeight: 1.7 }}>{service.desc}</Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ==================== CONTACT CTA SECTION ==================== */}
        <Paper sx={{ p: 6, bgcolor: 'rgba(0, 176, 255, 0.08)', borderRadius: 0, border: '1px solid rgba(0, 176, 255, 0.3)', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="900" sx={{ mb: 2 }}>Get In Touch</Typography>
          <Typography variant="body1" color="#94a3b8" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Have questions? We'd love to hear from you. Contact us for any inquiries about our water management services.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Button variant="contained" startIcon={<EmailIcon />} sx={{ px: 4, py: 1.5, borderRadius: 0, bgcolor: '#00b0ff' }}>
              Email Us
            </Button>
            <Button variant="outlined" startIcon={<PhoneIcon />} sx={{ px: 4, py: 1.5, borderRadius: 0, borderColor: '#fff', color: '#fff' }}>
              Call Now
            </Button>
          </Stack>

          <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" sx={{ gap: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon sx={{ color: '#00b0ff', fontSize: 20 }} />
              <Typography variant="body2" color="#94a3b8">contact@watercorp.com</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon sx={{ color: '#00b0ff', fontSize: 20 }} />
              <Typography variant="body2" color="#94a3b8">+92 300 1234567</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon sx={{ color: '#00b0ff', fontSize: 20 }} />
              <Typography variant="body2" color="#94a3b8">123 Water Street, City</Typography>
            </Stack>
          </Stack>
        </Paper>

        {/* ==================== FOOTER ==================== */}
        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ textAlign: 'center', pb: 4 }}>
          <Typography variant="body2" color="#64748b">
            © 2024 Water Corporation Management System. All Rights Reserved.
          </Typography>
        </Box>

      </Container>
    </AboutContainer>
  );
}