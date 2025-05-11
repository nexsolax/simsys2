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
import { CreateSupplierDTO, UpdateSupplierDTO } from '../../../shared/models/supplier';
interface Props {
  open: boolean;
  isEdit?: boolean;
  supplier?: any;
  onClose: () => void;
}

const CreateSupplierDialog: React.FC<Props> = ({ open, isEdit, supplier, onClose }) => {
  const createSupplier = useStore((state) => state.createSupplier);
  const updateSupplier = useStore((state) => state.updateSupplier);
  const fetchAllSuppliers = useStore((state) => state.fetchAllSuppliers);
  const [supplierData, setSupplierData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && supplier) {
      setSupplierData(supplier);
    } else {
      setSupplierData(null);
    }
  }, [isEdit, supplier]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string(),
    rating: Yup.number()
      .required('Rating is required')
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Supplier' : 'New Supplier'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: supplierData ? supplierData.name : '',
            email: supplierData ? supplierData.email : '',
            phone: supplierData ? supplierData.phone : '',
            address: supplierData ? supplierData.address : '',
            rating: supplierData ? supplierData.rating : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const createSupplierBody: CreateSupplierDTO = {
                ...values,
                userId: 1,
                createdDate: new Date().toISOString().split('T')[0],
                updatedDate: new Date().toISOString().split('T')[0],
              };
              await createSupplier(createSupplierBody);
            } else {
              const updateSupplierBody: UpdateSupplierDTO = {
                ...values,
                userId: supplierData.userId,
                createdDate: supplierData.createdDate,
                updatedDate: new Date().toISOString().split('T')[0],
              };
              await updateSupplier(updateSupplierBody, supplier.supplierId);
            }
            await fetchAllSuppliers();
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
                    name='rating'
                    label='Rating'
                    type='number'
                    value={values.rating}
                    onChange={handleChange}
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
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

export default CreateSupplierDialog;
