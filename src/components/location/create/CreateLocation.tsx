import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  FormControl,
  Typography,
  MenuItem,
  ListItemText,
  Select,
  InputLabel,
} from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import {
  CreateLocationRequest,
  Locations,
  UpdateLocationRequest,
} from '../../../shared/models/location';
import { useStore } from '../../../store';

interface Props {
  open: boolean;
  isEdit?: boolean;
  location?: Locations | null;
  onClose: () => void;
}

const CreateLocationDialog: React.FC<Props> = ({ open, isEdit, location, onClose }) => {
  const [locationData, setLocationData] = useState<Locations | null>(null);

  const inventoriesList = useStore((state) => state.inventories.inventoriesList);
  const createLocation = useStore((state) => state.createLocation);
  const updateLocation = useStore((state) => state.updateLocation);
  const fetchAllLocations = useStore((state) => state.fetchAllLocations);

  useEffect(() => {
    if (isEdit && location) {
      setLocationData(location);
    } else {
      setLocationData(null);
    }
  }, [isEdit, location]);

  const validationSchema = Yup.object({
    locationName: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    inventoryGuid: Yup.string().required('Inventory is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Location' : 'New Location'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            locationName: locationData ? locationData.locationName : '',
            description: locationData ? locationData.description : '',
            inventoryGuid: locationData ? locationData.inventoryGuid : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newLocation: CreateLocationRequest = {
                ...values,
              };
              await createLocation(newLocation);
            } else {
              const updatedLocation: UpdateLocationRequest = {
                ...values,
              };
              await updateLocation(updatedLocation, locationData!.guid);
            }
            fetchAllLocations();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='locationName'
                    label='Name'
                    value={values.locationName}
                    onChange={handleChange}
                    error={touched.locationName && Boolean(errors.locationName)}
                    helperText={touched.locationName && errors.locationName}
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
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Inventory</InputLabel>
                    <Field
                      as={Select}
                      name='inventoryGuid'
                      label='Inventory'
                      value={values.inventoryGuid}
                      onChange={handleChange}
                    >
                      {inventoriesList?.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory.guid}>
                          <ListItemText primary={inventory.name} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='inventoryGuid' />
                    </Typography>
                  </FormControl>
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

export default CreateLocationDialog;
