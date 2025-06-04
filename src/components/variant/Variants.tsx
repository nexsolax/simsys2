import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useStore } from '../../store';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateVariantDialog from './create/CreateVariantDialog';
import { Variant } from '../../shared/models/variant';

const Variants: React.FC = () => {
  const [openCreateVariant, setOpenCreateVariant] = useState(false);
  const [openEditVariant, setOpenEditVariant] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(null);
  const [variantsData, setVariantsData] = useState<Variant[]>([]);

  const variantsList = useStore((state) => state.variants.variantsList);
  const fetchAllVariants = useStore((state) => state.fetchAllVariants);
  const deleteVariant = useStore((state) => state.deleteVariant);

  const columnsVariant: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'color',
      headerName: 'Color',
      width: 200,
      flex: 1,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 200,
      flex: 1,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    fetchAllVariants();
  }, []);

  useEffect(() => {
    if (variantsList) {
      setVariantsData(variantsList);
    }
  }, [variantsList]);

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
        variant={currentVariant!}
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
          if (currentVariant) {
            await deleteVariant(currentVariant.id);
          }
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Variants;
