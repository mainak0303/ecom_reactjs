import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Component, lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
const Login = lazy(() => import('./pages/auth/login/login'));
const Wrapper = lazy(() => import('./pages/layout/wrapper/wrapper'));
const Create = lazy(() => import('./pages/products/create product/create'));
const Profile = lazy(() => import('./pages/auth/profile_details/profile'));
const Registration = lazy(() => import('./pages/auth/registration/registration'));
const ProductsList = lazy(() => import('./pages/products/product_list/productsList'));
const Product_detail = lazy(() => import('./pages/products/product details/product_detail'));
const Product_update = lazy(() => import('./pages/products/product_update/product_update'));


function Private_router({ children }) {
  const token = localStorage.getItem('token')

  return token != null || token != undefined ? (children) : (
    <>

      <Navigate to='/' replace />
      {toast.error('Please login first')}
    </>)
}

function App() {

  let public_router = [
    {
      path: "/",
      Component: <Login />
    },
    {
      path: "/registration",
      Component: <Registration />
    }
  ]

  let private_router = [
    {
      path: '/create_product',
      Component: <Create />
    },
    {
      path: '/product_list',
      Component: <ProductsList />
    },
    {
      path: '/profile',
      Component: <Profile />
    },
    {
      path: '/Details/:_id',
      Component: <Product_detail />
    },
    {
      path: '/Update/:_id',
      Component: <Product_update />
    }
  ]
  return (
    <div className="App">


      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Wrapper>
            <Routes>
              {public_router.map((item) => {
                return (
                  <>

                    <Route path={item.path} element={item.Component} />

                  </>
                )
              })}

              {private_router.map((item) => {
                return (
                  <>

                    <Route path={item.path} element={<Private_router>{item.Component}</Private_router>} />

                  </>
                )
              })}
            </Routes>
          </Wrapper>
        </Router>
      </Suspense>

    </div>
  );
}

export default App;
