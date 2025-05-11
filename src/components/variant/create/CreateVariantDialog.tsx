import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useStore } from '../../../store';

interface Props {
  open: boolean;
  isEdit?: boolean;
  variant?: any;
  onClose: () => void;
}

const CreateVariantDialog: React.FC<Props> = ({ open, isEdit, variant, onClose }) => {
  const [variantData, setVariantData] = useState<any>();

  const fetchAllVariants = useStore((state) => state.fetchAllVariants);
  const fetchAllVariantsValue = useStore((state) => state.fetchAllVariantsValue);
  const createVariant = useStore((state) => state.createVariant);
  const createVariantValue = useStore((state) => state.createVariantValue);
  const updateVariant = useStore((state) => state.updateVariant);
  const updateVariantValue = useStore((state) => state.updateVariantValue);
  const deleteVariantValue = useStore((state) => state.deleteVariantValue);

  useEffect(() => {
    if (isEdit && variant) {
      setVariantData(variant);
    } else {
      setVariantData(null);
    }
  }, [isEdit, variant]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    variantValues: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required('Value is required'),
      }),
    ),
  });

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Variant' : 'New Variant'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: variantData ? variantData.name : '',
            variantValues: variantData ? variantData.variantValues : [{ value: '' }],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const variantsPromise = [];
            if (!isEdit) {
              const newVariant = await createVariant(values.name);
              for (const variantValue of values.variantValues) {
                variantsPromise.push(createVariantValue(variantValue.value, newVariant.variantId));
              }
              await Promise.all(variantsPromise);
            } else {
              variantsPromise.push(updateVariant(values.name, variantData!.variantId));
              for (const variantValue of values.variantValues) {
                variantsPromise.push(updateVariantValue(variantValue, variantValue.variantValueId));
              }
              await Promise.all(variantsPromise);
            }
            await fetchAllVariants();
            await fetchAllVariantsValue();
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
                    label='Variant Name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <FieldArray name='variantValues'>
                  {({ push, remove }) => (
                    <Grid size={12}>
                      <Box>
                        <Typography fontWeight={600} variant='caption'>
                          Variant Values
                        </Typography>
                        {values.variantValues.map((_, index) => (
                          <Box key={index} display='flex' alignItems='center' mt={2}>
                            <TextField
                              fullWidth
                              name={`variantValues.${index}.value`}
                              label={`Value ${index + 1}`}
                              value={values.variantValues[index].value}
                              onChange={handleChange}
                              error={
                                touched.variantValues?.[index]?.value &&
                                Boolean(errors.variantValues?.[index]?.value)
                              }
                              helperText={
                                touched.variantValues?.[index]?.value &&
                                errors.variantValues?.[index]?.value
                              }
                            />
                            <IconButton
                              onClick={async () => {
                                remove(index);
                                await deleteVariantValue(
                                  values.variantValues[index].variantValueId,
                                );
                              }}
                              disabled={values.variantValues.length === 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Box>
                        ))}
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => {
                            push({ value: '' });
                          }}
                          sx={{ mt: 1 }}
                        >
                          Add Value
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </FieldArray>
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
