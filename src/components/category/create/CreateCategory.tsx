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

interface Props {
  open: boolean;
  isEdit?: boolean;
  category?: any;
  onClose: (values: any) => void;
}

const CreateCategoryDialog: React.FC<Props> = ({ open, isEdit, category, onClose }) => {
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && category) {
      setCategoryData(category);
    } else {
      setCategoryData(null);
    }
  }, [isEdit, category]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Category' : 'New Category'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: categoryData ? categoryData.name : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let categoryData;
            if (!isEdit) {
              categoryData = {
                ...values,
                id: 10,
              };
            } else {
              categoryData = {
                ...values,
                id: category.id,
              };
            }
            console.log('Category Data:', categoryData);
            onClose(categoryData);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={12}>
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

export default CreateCategoryDialog;
