import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateProductDialog from './create/CreateProduct';
import { useStore } from '../../store';
import { Products } from '../../shared/models/product';
import { Categories } from '../../shared/models/category';
import { Variant } from '../../shared/models/variant';
import ConfirmationDialog from '../confirmation/ConfirmationModal';

const Product: React.FC = () => {
  const navigate = useNavigate();
  const fetchAllProducts = useStore((state) => state.fetchAllProducts);
  const fetchAllCategories = useStore((state) => state.fetchAllCategories);
  const fetchAllVariants = useStore((state) => state.fetchAllVariants);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const productsList = useStore((state) => state.products.productsList);
  const categoriesList = useStore((state) => state.categories.categoriesList);
  const variantsList = useStore((state) => state.variants.variantsList);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Products | null>(null);

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
    fetchAllVariants();
  }, []);

  const columnsProduct: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Product',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            style={{ width: 50, height: 50, borderRadius: '8px' }}
            src={
              params.row?.image ??
              'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp'
            }
            alt={params.row.name}
          />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                navigate(`/dashboard/product/detail/${params.row.id}`);
              }}
            >
              {params.row.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {
                categoriesList?.find(
                  (category: Categories) => category.guid === params.row.categoryGuid,
                )?.name
              }
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography variant='body2'>{params.row.description}</Typography>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
    },
    {
      field: 'variant',
      headerName: 'Variant',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant='body2' textTransform={'capitalize'}>
            {variantsList?.find((variant: Variant) => variant.guid === params.row.variantGuid)
              ?.color +
              ' ' +
              variantsList?.find((variant: Variant) => variant.guid === params.row.variantGuid)
                ?.size}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Stock',
      width: 120,
      renderCell: (params) => (
        <Box>
          <Box sx={{ mb: 0.5, width: '100%' }}>
            <LinearProgress
              color={
                params.row.quantity > 10
                  ? 'success'
                  : params.row.quantity === 0
                    ? 'error'
                    : 'warning'
              }
              variant='determinate'
              value={params.row.quantity}
            />
          </Box>

          <Typography variant='caption' sx={{ color: 'var(--palette-text-secondary)' }}>
            {`${params.row.quantity === 0 ? 'out of stock' : `${params.row.quantity} in stock`}`}
          </Typography>
        </Box>
      ),
    },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 100,
    //   renderCell: (params) => (
    //     <Chip
    //       color={params.value === 'Active' ? 'info' : 'default'}
    //       label={params.value === 'Active' ? 'Active' : 'Inactive'}
    //     />
    //   ),
    // },
    {
      field: 'functions',
      headerName: '',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateProduct(true);
              setOpenEditProduct(true);
              setCurrentProduct(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setOpenConfirmDelete(true);
              setCurrentProduct(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

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
        onClick={() => setOpenCreateProduct(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Product
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={productsList}
              columns={columnsProduct}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateProductDialog
        open={openCreateProduct}
        isEdit={openEditProduct}
        product={currentProduct!}
        onClose={() => {
          setOpenCreateProduct(false);
          setOpenEditProduct(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete supplier'
        description='Are you sure you want to delete this supplier?'
        type='warning'
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={async () => {
          await deleteProduct(currentProduct!.id);
          await fetchAllProducts();
          setOpenConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Product;
