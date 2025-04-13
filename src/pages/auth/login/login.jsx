import {Box, Button, TextField, Typography, IconButton, InputAdornment, CircularProgress,} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import { endPoints } from '../../../api/endPoints';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const ClickFuntion = async (data) => {
        setLoading(true); 
        const formdata = new FormData();
        formdata.append('email', data.email);
        formdata.append('password', data.password);
        try {
            const response = await axiosInstance.post(endPoints.auth.login, formdata);
            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
                navigate('/create_product');
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
                padding: 2,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    maxWidth: 500, 
                    width: '90%',
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                    p: 5,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ color: '#333', fontWeight: 'bold' }}
                >
                    Login Form
                </Typography>
                <form autoComplete="off" onSubmit={handleSubmit(ClickFuntion)}>
                    <TextField
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email format',
                            },
                        })}
                        label="Email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#9c27b0' }, 
                                '&:hover fieldset': { borderColor: '#7b1fa2' },
                                '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#9c27b0', 
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#9c27b0', 
                            },
                            '& .MuiInputBase-input': {
                                color: '#9c27b0', 
                            },
                        }}
                    />
                    <TextField
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        label="Password"
                        fullWidth
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#9c27b0' },
                                '&:hover fieldset': { borderColor: '#7b1fa2' },
                                '&.Mui-focused fieldset': { borderColor: '#9c27b0' },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#9c27b0', 
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#9c27b0', 
                            },
                            '& .MuiInputBase-input': {
                                color: '#9c27b0', 
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            position: 'relative',
                            textTransform: 'none',
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
                            'Login'
                        )}
                    </Button>
                    <Typography variant="body2" sx={{ mt: 3 }}>
                        Need an account? <Link to="/registration">Register here</Link>
                    </Typography>
                </form>
            </Box>
        </Box>
    );
    
    
    
}
