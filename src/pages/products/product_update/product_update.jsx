import { TextField, Typography, Button, Box, Stack, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";

export default function Product_update() {
  const [image, setImage] = useState();
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const { _id } = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(endPoints.auth.product_details + _id);
      toast.success(response.data?.message || "Product data fetched successfully");
      setList(response.data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (list && Object.keys(list).length > 0) {
      setValue("title", list?.title);
      setValue("description", list?.description);
      setValue("image", list?.image);
    }
  }, [list, setValue]);

  const clickFunction = async (data) => {
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("id", _id);
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", data.image);
    }

    try {
      const response = await axiosInstance.post(endPoints.auth.update, formData);
      if (response.status === 200) {
        toast.success(response.data.message || "Product updated successfully!");
        navigate("/product_list");
      } else {
        toast.error(response.data.message || "Product not updating due to some error.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 4,
        mt: 6,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
        }}
      >
        Update Product
      </Typography>
      <form onSubmit={handleSubmit(clickFunction)}>
        {/* Product Title Input */}
        <TextField
          id="title"
          label="Product Title"
          {...register("title", {
            required: "Product Title is required",
          })}
          variant="outlined"
          fullWidth
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              paddingRight: 0,
            },
            "& .MuiInputBase-root": {
              padding: "12px",
            },
          }}
          error={!!errors.title}
          helperText={errors.title && errors.title.message}
        />

        {/* Product Description Input */}
        <TextField
          id="description"
          label="Product Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& .MuiInputBase-root": {
              padding: "12px",
            },
          }}
          {...register("description", {
            required: "Description is required",
          })}
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
        />

        {/* Image Upload Input */}
        <TextField
          id="image"
          type="file"
          fullWidth
          inputProps={{ accept: "image/*" }}
          variant="outlined"
          color="secondary"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
            "& input[type='file']": {
              padding: "12px",
            },
          }}
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Image Preview */}
        {(image || list?.image) && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "#f7f7f7",
              borderRadius: 1,
              border: "1px solid #ccc",
            }}
          >
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : list?.image
                  ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${list.image}`
                  : ""
              }
              alt="Selected"
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: "500" }}
            >
              {image ? `Selected file: ${image.name}` : "Current image"}
            </Typography>
          </Stack>
        )}

        {/* Update Product Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            letterSpacing: "0.5px",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update Product"}
        </Button>

        {/* Go Back to Product List Button */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            letterSpacing: "0.5px",
            color: "secondary.main",
            borderColor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.light",
              color: "white",
            },
          }}
          onClick={() => navigate("/product_list")}
        >
          Go Back to Product List
        </Button>
      </form>
    </Box>
  );
}
