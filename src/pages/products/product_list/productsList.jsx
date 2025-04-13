import React, { useEffect, useState } from "react";
import {Typography, Card, Button, CardActions, CircularProgress, Box, Stack, Pagination, Switch, List, ListItem, ListItemAvatar, Avatar,
  ListItemText, IconButton, Grid2,} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import SweetAlertComponent from "../../UI/sweetAlert";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDelete] = useState(null);
  const [modal, setModal] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("page", currentPage);
      formData.append("perPage", 10);
      try {
        const response = await axiosInstance.post(endPoints.auth.products, formData);
        if (response.status === 200) {
          toast.success(response.data?.message || "Data fetched successfully")
          setProducts(response.data?.data || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          toast.error(response.data.message || "Failed to fetch products.");
        }
      } catch (error) {
        if (error.response?.status === 501) {
          toast.error("Unauthorized access. Please log in.");
          navigate("/login");
        } else {
          toast.error(error.message || "An error occurred while fetching products.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleDelete = async () => {
    if (!deleteId) {
      toast.error("Invalid ID. Unable to delete.");
      return;
    }

    try {
      const response = await axiosInstance.post(endPoints.auth.delete, { id: deleteId });
      if (response.status === 200) {
        toast.success("Product deleted successfully.");
        const updatedResponse = await axiosInstance.post(endPoints.auth.products, { page: currentPage, perPage: 10 });
        const updatedProducts = updatedResponse.data?.data || [];
        const updatedTotalPages = updatedResponse.data?.totalPages || 1;

        if (updatedProducts.length === 0 && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        } else {
          setProducts(updatedProducts);
          setTotalPages(updatedTotalPages);
        }
      } else {
        toast.error("Failed to delete the product.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the product.");
    } finally {
      setModal(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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
          Product List
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body1">Card View</Typography>
          <Switch
            checked={isListView}
            onChange={() => setIsListView((prev) => !prev)}
            color="secondary"
          />
          <Typography variant="body1">List View</Typography>
        </Stack>
      </Stack>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={3}>
          {products.length > 0 ? (
            isListView ? (
              // List Layout

              <List>
                {products.map((product) => (
                  <ListItem
                    key={product._id}
                    sx={{
                      borderBottom: "1px solid #ddd",
                      py: 2,
                    }}
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          onClick={() => {
                            setDelete(product._id);
                            setModal(true);
                          }}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                        <Link to={`/Update/${product._id}`} style={{ textDecoration: "none" }}>
                          <IconButton color="secondary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <Link to={`/Details/${product._id}`} style={{ textDecoration: "none" }}>
                          <IconButton color="primary">
                            <Visibility />
                          </IconButton>
                        </Link>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      {/* <Avatar
                        src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`}
                        alt={product.title}
                        sx={{ width: 56, height: 56 }}
                      /> */}

                      <LazyLoadImage
                      
                        height="56"
                        width="56"
                        src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`} // use normal <img> attributes as props
                      />


                    </ListItemAvatar>
                    <ListItemText
                      primary={product.title}
                      secondary={
                        product.description.length > 50
                          ? `${product.description.slice(0, 100)}...`
                          : product.description
                      }
                      sx={{
                        ml: 2,
                        "& .MuiListItemText-primary": { fontWeight: "bold" },
                        "& .MuiListItemText-secondary": {
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 2,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

            ) : (
              // Card Layout
              <Grid2 container spacing={7} justifyContent="center" sx={{ margin: 0, width: "100%" }}>
                {products.map((product) => (
                  <Grid2
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={product._id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 2,
                        height: "100%",
                        boxShadow: 2,
                        maxWidth: 350,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <LazyLoadImage
                        height="100%"
                        width="100%"
                        src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`} // use normal <img> attributes as props
                      />

                      <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            mt: 1,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                          }}
                        >
                          {product.description}
                        </Typography>
                      </Box>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 1,
                          width: "100%",
                          mt: "auto",
                        }}
                      >
                        <Button
                          size="medium"
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setDelete(product._id);
                            setModal(true);
                          }}
                          sx={{
                            flex: 1,
                            textTransform: "capitalize",
                            "&:hover": {
                              backgroundColor: "secondary.dark",
                            },
                          }}
                        >
                          Delete
                        </Button>
                        <Link to={`/Update/${product._id}`} style={{ textDecoration: "none", flex: 1 }}>
                          <Button
                            size="medium"
                            variant="outlined"
                            color="secondary"
                            sx={{
                              width: "100%",
                              textTransform: "capitalize",
                              "&:hover": {
                                borderColor: "secondary.dark",
                                color: "secondary.dark",
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Link to={`/Details/${product._id}`} style={{ textDecoration: "none", flex: 1 }}>
                          <Button
                            size="medium"
                            variant="outlined"
                            color="secondary"
                            sx={{
                              width: "100%",
                              textTransform: "capitalize",
                              "&:hover": {
                                borderColor: "secondary.dark",
                                color: "secondary.dark",
                              },
                            }}
                          >
                            View Details
                          </Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            )
          ) : (
            <Typography align="center">No products found.</Typography>
          )}
          <Link to="/create_product">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                py: { xs: 1, sm: 1.5 },
                mt: 3,
              }}
            >
              Add Products
            </Button>
          </Link>
        </Stack>
      )}
      {modal && (
        <SweetAlertComponent
          confirm={handleDelete}
          cancle={() => setModal(false)}
          title="Are You Sure?"
          subtitle="You Will Not Be Able To Recover This Product"
          type="warning"
        />
      )}
      {products.length !== 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: { xs: "0.8rem", sm: "1rem" },
              },
            }}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductsList;
