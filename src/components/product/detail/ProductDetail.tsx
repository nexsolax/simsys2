import React, { useEffect, useState } from 'react';
import {
  Box,
  Chip,
  Grid2,
  Typography,
  Button,
  Select,
  MenuItem,
  ButtonGroup,
  IconButton,
  Badge,
  Container,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import CircleIcon from '@mui/icons-material/Circle';
import { useParams } from 'react-router-dom';

import EmblaCarousel from '../../carousel/EmblaCarousel';
import { useStore } from '../../../store';
import { Products } from '../../../shared/models/product';
import { Consignments } from '../../../shared/models/consignment';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const fetchProductDetail = useStore((state) => state.fetchOneProduct);
  const fetchConsignmentDetail = useStore((state) => state.fetchOneConsignment);
  const addToCart = useStore((state) => state.addToCart);

  const [productDetail, setProductDetail] = useState<Products | null>(null);
  const [consignmentDetail, setConsignmentDetail] = useState<Consignments | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetchProductDetail(Number(id));
      const consignment = await fetchConsignmentDetail(product?.consignmentGuid);
      setProductDetail(product);
      setConsignmentDetail(consignment);
    };
    if (id) {
      fetchProduct();
    }
  }, []);

  const OPTIONS = {};
  const SLIDE_COUNT = 10;
  const SLIDES = [
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-5.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-6.webp',
    'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-7.webp',
  ];

  const [size, setSize] = useState(9);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleSizeChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (type: any) => {
    setQuantity((prev) => (type === 'increase' ? prev + 1 : Math.max(prev - 1, 1)));
  };

  const handleColorSelect = (color: any) => {
    setSelectedColor(color);
  };

  return (
    <Container maxWidth='lg'>
      <Grid2 container alignItems={'center'} spacing={6}>
        <Grid2 size={6}>
          <EmblaCarousel
            slides={productDetail?.image ? [productDetail?.image] : SLIDES}
            options={OPTIONS}
          ></EmblaCarousel>
        </Grid2>
        <Grid2 py={4} alignSelf='flex-start' size={6}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}
          >
            <Chip label='NEW' color='info'></Chip>
            {productDetail?.quantity && productDetail?.quantity > 0 ? (
              <Typography fontWeight={700} variant='caption' color='success'>
                IN STOCK
              </Typography>
            ) : (
              <Typography fontWeight={700} variant='caption' color='error'>
                OUT OF STOCK
              </Typography>
            )}
            <Typography fontWeight={700} variant='h5'>
              {productDetail?.name}
            </Typography>
            {consignmentDetail && <Typography variant='h4'>{consignmentDetail?.price}</Typography>}
            <Typography variant='body2' sx={{ color: 'var(--palette-text-secondary)' }}>
              {productDetail?.description}
            </Typography>
            <Divider
              sx={{ m: 0, borderColor: 'var(--palette-grey-200)' }}
              width={'100%'}
              variant='middle'
            />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6' gutterBottom>
                Color
              </Typography>
              <Box display='flex' gap={1}>
                <Badge
                  overlap='circular'
                  badgeContent={
                    selectedColor === productDetail?.variant.color ? (
                      <CheckIcon sx={{ color: 'white' }} />
                    ) : null
                  }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  className='badge-color-selected'
                >
                  <IconButton
                    onClick={() => handleColorSelect(productDetail?.variant.color)}
                    sx={{ bgcolor: productDetail?.variant.color }}
                  >
                    <CircleIcon sx={{ color: productDetail?.variant.color }} />
                  </IconButton>
                </Badge>
              </Box>
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6' gutterBottom>
                Size
              </Typography>
              <Typography variant='h6' color='textSecondary' mt={1}>
                {productDetail?.variant.size}
              </Typography>
              {/* <Select value={size} onChange={handleSizeChange} sx={{ width: 80 }}>
                {[7, 8, 9, 10, 11].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select> */}
            </Box>

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6' gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItem: 'center ' }}>
                <ButtonGroup
                  sx={{ borderRadius: 2, border: '1px solid var(--palette-grey-300)' }}
                  size='small'
                  variant='outlined'
                >
                  <IconButton
                    sx={{
                      p: 0.5,
                      borderRight: '1px solid var(--palette-grey-300)',
                      borderRadius: 0,
                    }}
                    onClick={() => handleQuantityChange('decrease')}
                  >
                    <RemoveIcon fontSize='small' />
                  </IconButton>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    width={32}
                    height={32}
                    bgcolor='var(--palette-grey-200)'
                    fontSize={14}
                    color='var(--palette-text-primary)'
                  >
                    {quantity}
                  </Box>
                  <IconButton
                    sx={{
                      p: 0.5,
                      borderLeft: '1px solid var(--palette-grey-300)',
                      borderRadius: 0,
                    }}
                    onClick={() => handleQuantityChange('increase')}
                  >
                    <AddIcon fontSize='small' />
                  </IconButton>
                </ButtonGroup>
                <Typography variant='body2' color='textSecondary' mt={1}>
                  Available: {productDetail?.quantity}
                </Typography>
              </Box>
            </Box>
            <Divider
              sx={{ m: 0, borderColor: 'var(--palette-grey-200)' }}
              width={'100%'}
              variant='middle'
            />
            <Box mt={1} gap={2} display={'flex'} width={'100%'}>
              <Button
                variant='contained'
                color='warning'
                startIcon={<ShoppingCartIcon />}
                sx={{ flex: 1 }}
                onClick={() => addToCart(productDetail!, quantity, productDetail?.price || 0)}
                disabled={productDetail?.quantity === 0}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductDetail;
