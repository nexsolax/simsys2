import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useStore } from '../../store';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import { Variant } from '../../shared/models/variant';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateVariantDialog from './create/CreateVariantDialog';

const Variants: React.FC = () => {
  const [openCreateVariant, setOpenCreateVariant] = useState(false);
  const [openEditVariant, setOpenEditVariant] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<any>(null);
  const [variantsData, setVariantsData] = useState<Variant[]>([]);

  const variantsList = useStore((state) => state.variants.variantsList);
  const variantsValueList = useStore((state) => state.variants.variantsValueList);
  const fetchAllVariants = useStore((state) => state.fetchAllVariants);
  const fetchAllVariantsValue = useStore((state) => state.fetchAllVariantsValue);
  const deleteVariant = useStore((state) => state.deleteVariant);

  const columnsVariant: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Variant Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'variantValues',
      headerName: 'Values',
      width: 300,
      flex: 1,
      renderCell: (params) => params.row.variantValues.map((val: any) => val.value).join(', '),
    },
    {
      field: 'functions',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateVariant(true);
              setOpenEditVariant(true);
              setCurrentVariant(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='Edit' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentVariant(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='Delete' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    fetchAllVariants();
    fetchAllVariantsValue();
  }, []);

  useEffect(() => {
    if (variantsList && variantsValueList) {
      const newVariantsData = variantsList.map((variant: any) => ({
        ...variant,
        id: variant.variantId,
        variantValues: variantsValueList.reduce((acc: any, val: any) => {
          if (val.variantId === variant.variantId) {
            acc.push({
              value: val.value,
              variantValueId: val.variantValueId,
              variantId: val.variantId,
            });
          }
          return acc;
        }, []),
      }));
      setVariantsData(newVariantsData);
    }
  }, [variantsList, variantsValueList]);

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          right: '40px',
          top: '16px',
          width: 'fit-content',
          bgcolor: 'var(--palette-grey-800)',
          color: 'var(--palette-common-white)',
          padding: '8px',
          gap: '4px',
          fontSize: '13px',
        }}
        type='submit'
        variant='contained'
        onClick={() => setOpenCreateVariant(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Variant
      </Button>

      <Paper sx={{ p: 0, mt: 2 }}>
        <DataGrid
          rows={variantsData}
          columns={columnsVariant}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          className='datagrid-minimals-custom'
          sx={{ minHeight: 500, maxHeight: 500 }}
        />
      </Paper>

      <CreateVariantDialog
        open={openCreateVariant}
        isEdit={openEditVariant}
        variant={currentVariant}
        onClose={() => {
          setOpenEditVariant(false);
          setOpenCreateVariant(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete Variant'
        description='Are you sure you want to delete this variant?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteVariant(currentVariant.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Variants;
