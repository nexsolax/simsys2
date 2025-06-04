import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  MenuItem,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  isEdit?: boolean;
  requestOrder?: any;
  onClose: (values?: any) => void;
}

const CreateRequestPurchaseOrderDialog: React.FC<Props> = ({
  open,
  isEdit,
  requestOrder,
  onClose,
}) => {
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && requestOrder) {
      setOrderData(requestOrder);
    } else {
      setOrderData(null);
    }
  }, [isEdit, requestOrder]);

  const validationSchema = Yup.object({
    supplierId: Yup.number().required('Supplier is required'),
    productDetailId: Yup.number().required('Product is required'),
    quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    costPrice: Yup.number()
      .min(0, 'Cost price must be positive')
      .required('Cost price is required'),
    status: Yup.string().required('Status is required'),
    totalAmount: Yup.number()
      .min(0, 'Total amount must be positive')
      .required('Total amount is required'),
    orderDate: Yup.date().required('Order date is required'),
    description: Yup.string(),
    note: Yup.string(),
    size: Yup.string(),
    color: Yup.string(),
    isEnable: Yup.boolean(),
  });

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>
        {isEdit ? 'Edit Request Purchase Order' : 'New Request Purchase Order'}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            supplierId: orderData?.supplierId || '',
            productDetailId: orderData?.productDetailId || '',
            quantity: orderData?.quantity || 1,
            costPrice: orderData?.costPrice || 0,
            status: orderData?.status || 'Pending',
            totalAmount: orderData?.totalAmount || 0,
            orderDate: orderData?.orderDate || '',
            description: orderData?.description || '',
            note: orderData?.note || '',
            size: orderData?.size || '',
            color: orderData?.color || '',
            isEnable: orderData?.isEnable || true,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newOrder = { ...values, id: isEdit ? requestOrder.requestorderid : Date.now() };
            onClose(newOrder);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2} mt={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='supplierId'
                    label='Supplier ID'
                    value={values.supplierId}
                    onChange={handleChange}
                    error={touched.supplierId && Boolean(errors.supplierId)}
                    helperText={touched.supplierId && errors.supplierId}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='productDetailId'
                    label='Product Detail ID'
                    value={values.productDetailId}
                    onChange={handleChange}
                    error={touched.productDetailId && Boolean(errors.productDetailId)}
                    helperText={touched.productDetailId && errors.productDetailId}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    type='number'
                    name='quantity'
                    label='Quantity'
                    value={values.quantity}
                    onChange={handleChange}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    type='number'
                    name='costPrice'
                    label='Cost Price'
                    value={values.costPrice}
                    onChange={handleChange}
                    error={touched.costPrice && Boolean(errors.costPrice)}
                    helperText={touched.costPrice && errors.costPrice}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='status'
                    label='Status'
                    select
                    value={values.status}
                    onChange={handleChange}
                  >
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Approved'>Approved</MenuItem>
                    <MenuItem value='Rejected'>Rejected</MenuItem>
                  </TextField>
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    type='date'
                    name='orderDate'
                    label='Order Date'
                    value={values.orderDate}
                    onChange={handleChange}
                    error={touched.orderDate && Boolean(errors.orderDate)}
                    helperText={touched.orderDate && errors.orderDate}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='note'
                    label='Note'
                    multiline
                    rows={2}
                    value={values.note}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' mt={2}>
                <Button onClick={() => onClose()} variant='outlined' sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type='submit' variant='contained'>
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

export default CreateRequestPurchaseOrderDialog;
