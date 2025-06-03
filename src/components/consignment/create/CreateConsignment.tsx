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
  CreateConsignmentRequest,
  UpdateConsignmentRequest,
} from '../../../shared/models/consignment';
import { Consignments } from '../../../shared/models/consignment';

interface Props {
  open: boolean;
  isEdit?: boolean;
  consignment?: Consignments;
  onClose: () => void;
}

const CreateConsignmentDialog: React.FC<Props> = ({ open, isEdit, consignment, onClose }) => {
  const createConsignment = useStore((state) => state.createConsignment);
  const updateConsignment = useStore((state) => state.updateConsignment);
  const fetchAllConsignments = useStore((state) => state.fetchAllConsignments);
  const suppliersList = useStore((state) => state.suppliers.suppliersList);
  const purchaseOrdersList = useStore((state) => state.purchaseOrders.purchaseOrdersList);

  const [consignmentData, setConsignmentData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && consignment) {
      setConsignmentData(consignment);
    } else {
      setConsignmentData(null);
    }
  }, [isEdit, consignment]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    sku: Yup.string().required('SKU is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    quantity: Yup.number().required('Quantity is required'),
    supplierGuid: Yup.string().required('Supplier is required'),
    purchaseOrderGuid: Yup.string().required('Purchase order is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Consignment' : 'New Consignment'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: consignmentData ? consignmentData.name : '',
            sku: consignmentData ? consignmentData.sku : '',
            description: consignmentData ? consignmentData.description : '',
            price: consignmentData ? consignmentData.price : '',
            quantity: consignmentData ? consignmentData.quantity : '',
            supplierGuid: consignmentData ? consignmentData.supplierGuid : '',
            purchaseOrderGuid: consignmentData ? consignmentData.purchaseOrderGuid : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newConsignment: CreateConsignmentRequest = {
                ...values,
              };
              await createConsignment(newConsignment);
            } else {
              const updatedConsignment: UpdateConsignmentRequest = {
                ...values,
              };
              await updateConsignment(updatedConsignment, consignmentData.id);
            }
            await fetchAllConsignments();
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
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='sku'
                    label='SKU'
                    value={values.sku}
                    onChange={handleChange}
                    error={touched.sku && Boolean(errors.sku)}
                    helperText={touched.sku && errors.sku}
                  />
                </Grid>
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
                    name='price'
                    label='Price'
                    value={values.price}
                    onChange={handleChange}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='quantity'
                    label='Quantity'
                    value={values.quantity}
                    onChange={handleChange}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='supplierGuid'
                    label='Supplier'
                    value={values.supplierGuid}
                    onChange={handleChange}
                    error={touched.supplierGuid && Boolean(errors.supplierGuid)}
                    helperText={touched.supplierGuid && errors.supplierGuid}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {suppliersList?.map((supplier) => (
                      <option key={supplier.guid} value={supplier.guid}>
                        {supplier.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='purchaseOrderGuid'
                    label='Purchase Order'
                    value={values.purchaseOrderGuid}
                    onChange={handleChange}
                    error={touched.purchaseOrderGuid && Boolean(errors.purchaseOrderGuid)}
                    helperText={touched.purchaseOrderGuid && errors.purchaseOrderGuid}
                    select
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {purchaseOrdersList?.map((purchaseOrder) => (
                      <option key={purchaseOrder.guid} value={purchaseOrder.guid}>
                        {purchaseOrder.description}
                      </option>
                    ))}
                  </TextField>
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

export default CreateConsignmentDialog;
