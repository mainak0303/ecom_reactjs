import { Box, Button, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import { endPoints } from '../../../api/endPoints';
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const ClickFuntion = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profile_pic', image);
        try {
            const response = await axiosInstance.post(endPoints.auth.registration, formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: '#f9f9f9',
                padding: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    p: 5,
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    gutterBottom
                    sx={{ color: '#333', fontWeight: 'bold' }}
                >
                    Registration Form
                </Typography>
                <form autoComplete="off" onSubmit={handleSubmit(ClickFuntion)}>
                    <Stack spacing={3}>
                        <TextField
                            {...register('first_name', {
                                required: 'First name is required',
                            })}
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.first_name}
                            helperText={errors.first_name && errors.first_name.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#9c27b0' },
                                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                                    '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                                },
                                '& .MuiInputLabel-root': { color: '#9c27b0' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#9c27b0' },
                            }}
                        />
                        <TextField
                            {...register('last_name', {
                                required: 'Last name is required',
                            })}
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.last_name}
                            helperText={errors.last_name && errors.last_name.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#9c27b0' },
                                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                                    '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                                },
                                '& .MuiInputLabel-root': { color: '#9c27b0' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#9c27b0' },
                            }}
                        />
                        <TextField
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email format',
                                },
                            })}
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#9c27b0' },
                                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                                    '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                                },
                                '& .MuiInputLabel-root': { color: '#9c27b0' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#9c27b0' },
                            }}
                        />
                        <TextField
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#9c27b0' },
                                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                                    '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                                },
                                '& .MuiInputLabel-root': { color: '#9c27b0' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#9c27b0' },
                            }}
                        />
                        <TextField
                            {...register('profile_pic', {
                                required: 'Profile picture is required',
                            })}
                            type="file"
                            inputProps={{ accept: 'image/*' }}
                            onChange={(e) => setImage(e.target.files[0])}
                            fullWidth
                            error={!!errors.profile_pic}
                            helperText={errors.profile_pic && errors.profile_pic.message}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#9c27b0' },
                                    '&:hover fieldset': { borderColor: '#7b1fa2' },
                                    '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                                },
                                '& .MuiInputLabel-root': { color: '#9c27b0' },
                                '& .MuiInputLabel-root.Mui-focused': { color: '#9c27b0' },
                            }}
                        />
                        {image && (
                            <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    height={100}
                                    style={{ borderRadius: '10px', marginBottom: '0.5rem' }}
                                />
                                <Typography variant="caption">
                                    Selected file: {image.name}
                                </Typography>
                            </Stack>
                        )}
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontWeight: 'bold',
                                bgcolor: '#9c27b0',
                                '&:hover': { bgcolor: '#7b1fa2' },
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'white',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            ) : (
                                'Register'
                            )}
                        </Button>
                        <small>
                            Already have an account? <Link to="/">Login Here</Link>
                        </small>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}
