import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useStore } from '../../../store';
import {
  CustomerCreateRequest,
  Customers,
  CustomerUpdateRequest,
} from '../../../shared/models/customer';

interface Props {
  open: boolean;
  isEdit?: boolean;
  customer?: Customers;
  onClose: () => void;
}

const CreateCustomerDialog: React.FC<Props> = ({ open, isEdit, customer, onClose }) => {
  const createCustomer = useStore((state) => state.createCustomer);
  const updateCustomer = useStore((state) => state.updateCustomer);
  const fetchAllCustomers = useStore((state) => state.fetchAllCustomers);
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && customer) {
      setCustomerData(customer);
    } else {
      setCustomerData(null);
    }
  }, [isEdit, customer]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string(),
    bankCard: Yup.string(),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Customer' : 'New Customer'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: customerData ? customerData.name : '',
            email: customerData ? customerData.email : '',
            phone: customerData ? customerData.phone : '',
            address: customerData ? customerData.address : '',
            bankCard: customerData ? customerData.bankCard : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newCustomer: CustomerCreateRequest = {
                ...values,
              };
              await createCustomer(newCustomer);
            } else {
              const updatedCustomer: CustomerUpdateRequest = {
                ...values,
              };
              await updateCustomer(updatedCustomer, customerData.id);
            }
            await fetchAllCustomers();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={3}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='name'
                    label='Full name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='email'
                    label='Email address'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='phone'
                    label='Phone number'
                    value={values.phone}
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='bankCard'
                    label='Bank card'
                    value={values.bankCard}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='address'
                    label='Address'
                    value={values.address}
                    onChange={handleChange}
                  />
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

export default CreateCustomerDialog;
