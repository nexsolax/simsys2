import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import Login from './components/authentication/login/Login';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import Layout from './components/layout/Layout';
import Overview from './components/overview/Overview';
import Product from './components/product/Product';
import User from './components/user/User';
import Order from './components/order/Order';
import Invoice from './components/invoice/Invoice';
import ProductDetail from './components/product/detail/ProductDetail';
import Supplier from './components/supplier/Supplier';
import Category from './components/category/Category';
import Variant from './components/variant/Variants';
import Location from './components/location/Location';
import Inventory from './components/inventory/Inventory';
import RequestPurchaseOrder from './components/request-purchase-order/RequestPurchaseOrder';
import PurchaseOrder from './components/purchase-order/PurchaseOrder';
import Role from './components/role/Role';
import Customer from './components/customer/Customer';
import TransferRequest from './components/transfer-request/TransferRequest';
import Consignment from './components/consignment/Consignment';
import ProfileDetail from './components/profile/ProfileDetail';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path='/dashboard'>
              <Route index element={<Navigate to='overview' />} />
              <Route path='overview' element={<Overview />} />
              <Route path='product/list' element={<Product />} />
              <Route path='product/category' element={<Category />} />
              <Route path='product/variant' element={<Variant />} />
              <Route path='product/detail/:id' element={<ProductDetail />} />
              <Route path='user' element={<User />} />
              <Route path='user/list' element={<User />} />
              <Route path='user/role' element={<Role />} />
              <Route path='order' element={<Order />} />
              <Route path='invoice' element={<Invoice />} />
              <Route path='consignment' element={<Consignment />} />
              <Route path='supplier' element={<Supplier />} />
              <Route path='customer' element={<Customer />} />
              <Route path='purchase-order/list' element={<PurchaseOrder />} />
              <Route path='purchase-order/request' element={<RequestPurchaseOrder />} />
              <Route path='inventory/list' element={<Inventory />} />
              <Route path='inventory/location' element={<Location />} />
              <Route path='transfer-request/list' element={<TransferRequest />} />
              <Route path='profile' element={<ProfileDetail />} />
              <Route
                path='analytics'
                element={
                  <div>
                    <p>Analytics</p>
                  </div>
                }
              />
              <Route
                path='settings'
                element={
                  <div>
                    <p>Settings</p>
                  </div>
                }
              />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
