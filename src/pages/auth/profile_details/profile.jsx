import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axios';
import { endPoints } from '../../../api/endPoints';
import toast from 'react-hot-toast';
import { Container, CircularProgress, Typography, Box, Stack, CardMedia } from '@mui/material';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loader
      try {
        const response = await axiosInstance.get(endPoints.auth.profile_details);
        console.log('API Response:', response);
        if (response.status === 200) {
          setProfile(response.data.data);
          toast.success('Profile details fetched successfully!');
        } else {
          toast.error(response.message || 'Failed to fetch the profile details.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'An error occurred while fetching profile details.');
      } finally {
        setLoading(false); // Stop loader
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        {loading ? ( // Show loader while loading
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={50} />
          </Box>
        ) : profile ? (
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 4,
              padding: 3,
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: 'text.primary',
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 3,
              }}
            >
              Profile Details
            </Typography>
            <Stack spacing={2}>
              <CardMedia
                component="img"
                sx={{
                  height: 300,
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
                image={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${profile.profile_pic}`}
                alt="Profile Picture"
              />
              <Typography variant="body1">
                <strong>Name:</strong> {profile.first_name} {profile.last_name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.email}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {profile.role_data.roleDisplayName}
              </Typography>
              <Typography variant="body1">
                <strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No profile details available.
          </Typography>
        )}
      </Container>
    </>
  );
}
