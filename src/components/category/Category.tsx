import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateCategoryDialog from './create/CreateCategory';

const Category: React.FC = () => {
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [categoriesData, setCategoriesData] = useState<any[]>([
    {
      id: 1,
      name: 'Áo thun tay ngắn',
    },
    {
      id: 2,
      name: 'Áo thun tay dài',
    },
    {
      id: 3,
      name: 'Áo thun thế thao',
    },
    {
      id: 4,
      name: 'Áo thun ba lỗ',
    },
    {
      id: 5,
      name: 'Áo thun sweater',
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState<any>(null);

  const columnsCategory: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      width: 80,
      flex: 1,
    },
    {
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateCategory(true);
              setOpenEditCategory(true);
              setCurrentCategory(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentCategory(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteCategory = (id: number) => {
    const newCategoriesData = categoriesData.filter((category) => category.id !== id);
    setCategoriesData(newCategoriesData);
  };

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
        fullWidth
        onClick={() => setOpenCreateCategory(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New category
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={categoriesData}
              columns={columnsCategory}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateCategoryDialog
        open={openCreateCategory}
        isEdit={openEditCategory}
        category={currentCategory}
        onClose={(category) => {
          if (category && category.id) {
            if (openEditCategory) {
              const index = categoriesData.findIndex((u) => u.id === category.id);
              const newCategoriesData = [...categoriesData];
              newCategoriesData[index] = category;
              setCategoriesData(newCategoriesData);
            } else {
              setCategoriesData([...categoriesData, category]);
            }
          }
          setOpenEditCategory(false);
          setOpenCreateCategory(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete category'
        description='Are you sure you want to delete this category?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteCategory(currentCategory.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Category;
