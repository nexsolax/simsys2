import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useStore } from '../../../store';
import {
  CreatePurchaseOrderDetailRequest,
  CreatePurchaseOrderRequest,
  PurchaseOrders,
  UpdatePurchaseOrderRequest,
} from '../../../shared/models/purchase-order';
import { Suppliers } from '../../../shared/models/supplier';
import { Products } from '../../../shared/models/product';

interface Props {
  open: boolean;
  isEdit?: boolean;
  purchaseOrder?: PurchaseOrders | null;
  onClose: () => void;
}

const CreatePurchaseOrderDialog: React.FC<Props> = ({ open, isEdit, purchaseOrder, onClose }) => {
  const fetchAllPurchaseOrders = useStore((state) => state.fetchAllPurchaseOrders);
  const fetchAllProducts = useStore((state) => state.fetchAllProducts);
  const createPurchaseOrder = useStore((state) => state.createPurchaseOrder);
  const updatePurchaseOrder = useStore((state) => state.updatePurchaseOrder);
  const suppliersList = useStore((state) => state.suppliers.suppliersList);
  const productsList = useStore((state) => state.products.productsList);

  const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrders | null>(null);
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState<
    CreatePurchaseOrderDetailRequest[]
  >([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (isEdit && purchaseOrder) {
      setPurchaseOrderData(purchaseOrder);
      setPurchaseOrderDetails(purchaseOrder?.purchaseOrderDetails || []);
    } else {
      setPurchaseOrderDetails([]);
      setPurchaseOrderData(null);
    }
  }, [open, isEdit, purchaseOrder]);

  const handleAddProduct = () => {
    setPurchaseOrderDetails([...purchaseOrderDetails, { productGuid: '', quantity: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    setPurchaseOrderDetails(purchaseOrderDetails.filter((_, i) => i !== index));
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    totalPrice: Yup.number().required('Total price is required'),
    supplierGuid: Yup.string().required('Supplier is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Purchase Order' : 'New Purchase Order'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            description: purchaseOrderData ? purchaseOrderData.description : '',
            totalPrice: purchaseOrderData ? purchaseOrderData.totalPrice : '',
            supplierGuid: purchaseOrderData ? purchaseOrderData.supplierGuid : '',
            purchaseOrderDetails: purchaseOrderData ? purchaseOrderData.purchaseOrderDetails : [],
            status: purchaseOrderData ? purchaseOrderData.isActive : 'inactive',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const purchaseOrderCreate: CreatePurchaseOrderRequest = {
                ...values,
                totalPrice: Number(values.totalPrice),
                isActive: 'inactive',
                purchaseOrderDetails: purchaseOrderDetails,
              };
              await createPurchaseOrder(purchaseOrderCreate);
            } else {
              const purchaseOrderUpdate: UpdatePurchaseOrderRequest = {
                ...values,
                totalPrice: Number(values.totalPrice),
                isActive: values.status,
                purchaseOrderDetails: purchaseOrderDetails,
              };
              await updatePurchaseOrder(purchaseOrderUpdate, purchaseOrderData!.guid);
            }
            await fetchAllPurchaseOrders();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='description'
                    label='Description'
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='totalPrice'
                    label='Total price'
                    value={values.totalPrice}
                    onChange={handleChange}
                    error={touched.totalPrice && Boolean(errors.totalPrice)}
                    helperText={touched.totalPrice && errors.totalPrice}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Supplier</InputLabel>
                    <Field
                      as={Select}
                      name='supplierGuid'
                      label='Supplier'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.supplierGuid}
                    >
                      {suppliersList?.map((supplier: Suppliers, index: number) => (
                        <MenuItem key={index} value={supplier.guid}>
                          {supplier.name}
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='supplierGuid' />
                    </Typography>
                  </FormControl>
                </Grid>
                {isEdit && (
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Field
                        as={Select}
                        name='status'
                        label='Status'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.status}
                      >
                        {['inactive', 'active'].map((status: string, index: number) => (
                          <MenuItem key={index} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </MenuItem>
                        ))}
                      </Field>
                      <Typography
                        variant='caption'
                        color='error'
                        sx={{ marginLeft: 2, marginTop: '4px' }}
                      >
                        <ErrorMessage name='supplierGuid' />
                      </Typography>
                    </FormControl>
                  </Grid>
                )}
                <Grid size={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant='h5'>Purchase Order Details</Typography>
                    <Button onClick={handleAddProduct}>Add Product</Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {purchaseOrderDetails.map((detail, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <FormControl fullWidth>
                          <InputLabel>Product</InputLabel>
                          <Field
                            fullWidth
                            as={Select}
                            name='productGuid'
                            label='Product'
                            value={detail.productGuid}
                            onChange={(e: any) => {
                              setPurchaseOrderDetails(
                                purchaseOrderDetails.map((d, i) =>
                                  i === index ? { ...d, productGuid: e.target.value } : d,
                                ),
                              );
                            }}
                          >
                            {productsList?.map((product: Products, index: number) => (
                              <MenuItem
                                key={index}
                                value={product.guid}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                <span style={{ textTransform: 'capitalize' }}>
                                  {product.name +
                                    ' (' +
                                    product.variant.size +
                                    ' - ' +
                                    product.variant.color +
                                    ') '}
                                </span>
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                        <TextField
                          fullWidth
                          name='quantity'
                          label='Quantity'
                          value={detail.quantity}
                          onChange={(e: any) => {
                            setPurchaseOrderDetails(
                              purchaseOrderDetails.map((d, i) =>
                                i === index ? { ...d, quantity: e.target.value } : d,
                              ),
                            );
                          }}
                        />
                        <Button
                          color='error'
                          onClick={() => handleRemoveProduct(index)}
                          sx={{ height: 'fit-content' }}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' mt={2}>
                <Button
                  sx={{
                    color: 'var(--palette-grey-800)',
                    bg: 'var(--palette-common-white)',
                    borderColor: 'transparent',
                    mr: 2,
                  }}
                  onClick={onClose}
                  variant='outlined'
                >
                  Cancel
                </Button>
                <Button
                  sx={{ bgcolor: 'var(--palette-grey-800)', color: 'var(--palette-common-white)' }}
                  type='submit'
                  variant='contained'
                >
                  {isEdit ? 'Save' : 'Create'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePurchaseOrderDialog;
