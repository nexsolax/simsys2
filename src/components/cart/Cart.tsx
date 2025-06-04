import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Cart: React.FC = () => {
  const cart = useStore((state) => state.cart.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const clearCart = useStore((state) => state.clearCart);
  const createOrder = useStore((state) => state.createOrder);
  const createOrderDetail = useStore((state) => state.createOrderDetail);

  const fetchAllCustomers = useStore((state) => state.fetchAllCustomers);
  const customersList = useStore((state) => state.customers.customersList);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleBuy = async () => {
    if (cart.length === 0) return;
    const order = await createOrder({
      customerGuid: customersList?.[0]?.guid || '',
      description: 'Order from cart',
      totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      isActive: 'true',
    });
    if (order) {
      const orderDetails = cart.map((item) => ({
        orderGuid: order.id,
        productGuid: item.product.guid,
        quantity: item.quantity,
      }));
      await Promise.all(
        orderDetails.map((orderDetail) =>
          createOrderDetail(
            {
              orderGuid: order.guid,
              productGuid: orderDetail.productGuid,
              quantity: orderDetail.quantity,
            },
            order.guid,
          ),
        ),
      );
    }
    clearCart();
    toast.success('Order placed successfully!');
  };

  return (
    <Box
      sx={{
        p: 2,
        position: 'fixed',
        top: '65px',
        right: '12px',
        width: 340,
        bgcolor: 'white',
        border: '2px solid #1976d2',
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1300,
      }}
    >
      <Typography textAlign={'center'} variant='h5'>
        Cart
      </Typography>
      <List>
        {cart.length === 0 && <Typography>No items in cart.</Typography>}
        {cart.map((item) => (
          <ListItem
            sx={{
              borderBottom: '1px solid #e0e0e0',
              padding: '12px 0',
            }}
            key={item.product.id}
            secondaryAction={
              <IconButton edge='end' onClick={() => removeFromCart(item.product.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Box display='flex' alignItems='center'>
              <img
                src={
                  item.product.image ||
                  'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-5.webp'
                }
                alt={item.product.name || ''}
                style={{ width: 50, height: 50, marginRight: 10, objectFit: 'cover' }}
              />
              <Box>
                <ListItemText
                  primary={item.product.name}
                  secondary={
                    <>
                      {`${item.product.description}`}
                      <Typography
                        component='span'
                        sx={{ display: 'block', color: 'primary.main', fontWeight: 'bold' }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </>
                  }
                />
                <TextField
                  type='number'
                  size='small'
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateCartQuantity(item.product.id, Number(e.target.value))
                  }
                  inputProps={{ min: 1, style: { width: 50 } }}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      {cart.length > 0 && (
        <Box sx={{ mt: 2, mb: 2, borderTop: '1px solid #e0e0e0', pt: 2 }}>
          <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total:</span>
            <span>
              ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </Typography>
        </Box>
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={handleBuy}
        disabled={cart.length === 0}
        sx={{ mt: 2 }}
      >
        Create Order
      </Button>
    </Box>
  );
};

export default Cart;
