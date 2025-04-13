import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardMedia, Typography, CircularProgress,} from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import toast from "react-hot-toast";

export default function Product_detail() {
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const { _id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(endPoints.auth.product_details + _id);
      if (response.status === 200) {
        setList(response.data.data);
        toast.success("Data fetched successfully");
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching product details.");
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [_id]);

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Product Details
      </Typography>
      <Box bgcolor={"#f5f5f5"} padding={4}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : list ? (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 4,
              maxWidth: 800,
              margin: "auto",
              padding: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: 300,
                width: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
              image={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${list.image}`}
              alt={list.title}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                {list.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "text.primary", whiteSpace: "pre-line" }}
              >
                {list.description}
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mr: 1,
                backgroundColor: "#6a0dad",
                "&:hover": {
                  backgroundColor: "#5a0a9f",
                },
              }}
              startIcon={<ArrowBackIosNew />}
              component={Link}
              to="/product_list"
            >
              Back to Product List
            </Button>
          </Card>
        ) : (
          <Typography variant="h5" align="center">
            Failed to load product details.
          </Typography>
        )}
      </Box>
    </>
  );
}
