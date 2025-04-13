import React, { useState } from 'react';
import { endPoints } from '../../../api/endPoints';
import axiosInstance from '../../../api/axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Create() {
    const navigate = useNavigate();
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const ClickFuntion = async (data) => {
        setLoading(true); 
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('image', image);

        try {
            const response = await axiosInstance.post(endPoints.auth.create, formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/product_list');
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
                maxWidth: 600,
                margin: 'auto',
                padding: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 4,
                mt: 6,
                textAlign: 'center',
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
                Add Product
            </Typography>
            <form onSubmit={handleSubmit(ClickFuntion)}>
                <TextField
                    id="title"
                    label="Product Title"
                    {...register('title', {
                        required: 'Product Title is required',
                    })}
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    sx={{ mb: 3 }}
                    error={!!errors.title}
                    helperText={errors.title && errors.title.message}
                />
                <TextField
                    id="description"
                    label="Product Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    color="secondary"
                    sx={{ mb: 3 }}
                    {...register('description', {
                        required: 'Description is required',
                    })}
                    error={!!errors.description}
                    helperText={errors.description && errors.description.message}
                />
                <TextField
                    id="image"
                    type="file"
                    fullWidth
                    inputProps={{ accept: 'image/*' }}
                    variant="outlined"
                    color="secondary"
                    sx={{
                        mb: 3,
                        '& .MuiInputLabel-root': { textTransform: 'capitalize' },
                    }}
                    onChange={(e) => setImage(e.target.files[0])}
                    error={!!errors.image}
                    helperText={errors.image && errors.image.message}
                />
                {image && (
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        spacing={2}
                        sx={{
                            mb: 3,
                            p: 2,
                            bgcolor: '#f7f7f7',
                            borderRadius: 1,
                            border: '1px solid #ccc',
                        }}
                    >
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                                objectFit: 'cover',
                                border: '1px solid #ddd',
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', fontWeight: '500' }}
                        >
                            Selected file: {image.name}
                        </Typography>
                    </Stack>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    disabled={loading} // Disable the button during loading
                    sx={{
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        letterSpacing: '0.5px',
                        position: 'relative',
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
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    ) : (
                        'Add Product'
                    )}
                </Button>
                <small>
                    Already added to product list?{' '}
                    <Link to="/product_list">PRODUCT LIST</Link>
                </small>
            </form>
        </Box>
    );
}
