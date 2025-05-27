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
import { Variant } from '../../../shared/models/variant';

interface Props {
  open: boolean;
  isEdit?: boolean;
  variant?: Variant;
  onClose: () => void;
}

const CreateVariantDialog: React.FC<Props> = ({ open, isEdit, variant, onClose }) => {
  const [variantData, setVariantData] = useState<any>();

  const fetchAllVariants = useStore((state) => state.fetchAllVariants);
  const createVariant = useStore((state) => state.createVariant);
  const updateVariant = useStore((state) => state.updateVariant);

  useEffect(() => {
    if (isEdit && variant) {
      setVariantData(variant);
    } else {
      setVariantData(null);
    }
  }, [isEdit, variant]);

  const validationSchema = Yup.object({
    color: Yup.string().required('Color is required'),
    size: Yup.string().required('Size is required'),
  });

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Variant' : 'New Variant'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            color: variantData ? variantData.color : '',
            size: variantData ? variantData.size : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              await createVariant(values);
            } else {
              await updateVariant(values, variantData!.id);
            }
            await fetchAllVariants();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='color'
                    label='Color'
                    value={values.color}
                    onChange={handleChange}
                    error={touched.color && Boolean(errors.color)}
                    helperText={touched.color && errors.color}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='size'
                    label='Size'
                    value={values.size}
                    onChange={handleChange}
                    error={touched.size && Boolean(errors.size)}
                    helperText={touched.size && errors.size}
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

export default CreateVariantDialog;
