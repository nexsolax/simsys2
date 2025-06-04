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

import {
  Categories,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '../../../shared/models/category';
import { useStore } from '../../../store';

interface Props {
  open: boolean;
  isEdit?: boolean;
  category?: Categories;
  onClose: () => void;
}

const CreateCategoryDialog: React.FC<Props> = ({ open, isEdit, category, onClose }) => {
  const fetchAllCategories = useStore((state) => state.fetchAllCategories);
  const createCategory = useStore((state) => state.createCategory);
  const updateCategory = useStore((state) => state.updateCategory);

  const [categoryData, setCategoryData] = useState<Categories | null>(null);

  useEffect(() => {
    if (isEdit && category) {
      setCategoryData(category);
    } else {
      setCategoryData(null);
    }
  }, [isEdit, category]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Category' : 'New Category'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: categoryData ? categoryData.name : '',
            description: categoryData ? categoryData.description : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newCategory: CreateCategoryRequest = {
                ...values,
              };
              await createCategory(newCategory);
            } else {
              const updatedCategory: UpdateCategoryRequest = {
                ...values,
              };
              await updateCategory(updatedCategory, category!.id);
            }
            await fetchAllCategories();
            onClose();
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
                <Grid size={12}>
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
