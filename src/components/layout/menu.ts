import {
  analyticsIcon,
  dashboardIcon,
  ecommerceIcon,
  inventoryIcon,
  invoiceIcon,
  locationIcon,
  orderIcon,
  productIcon,
  purchaseOrderIcon,
  supplierIcon,
  userIcon,
} from '../../shared/icon/icon';

export const MENU_ITEMS = [
  {
    title: 'Overview',
    items: [{ pathName: 'overview', text: 'Dashboard', icon: dashboardIcon }],
  },
  {
    title: 'Management',
    items: [
      {
        pathName: 'user',
        text: 'User',
        icon: userIcon,
        child: [
          { pathName: 'list', text: 'List user', icon: userIcon },
          { pathName: 'role', text: 'Role', icon: userIcon },
        ],
      },
      {
        pathName: 'product',
        text: 'Product',
        icon: productIcon,
        child: [
          {
            pathName: 'list',
            text: 'List product',
            icon: productIcon,
          },
          {
            pathName: 'category',
            text: 'Category',
            icon: productIcon,
          },
          {
            pathName: 'variant',
            text: 'Variant',
            icon: productIcon,
          },
        ],
      },
      { pathName: 'order', text: 'Order', icon: orderIcon },
      { pathName: 'invoice', text: 'Invoice', icon: invoiceIcon },
      {
        pathName: 'purchase-order',
        text: 'Purchase Order',
        icon: purchaseOrderIcon,
        child: [
          {
            pathName: 'list',
            text: 'List purchase order',
            icon: purchaseOrderIcon,
          },
          {
            pathName: 'request',
            text: 'Request',
            icon: purchaseOrderIcon,
          },
        ],
      },
      {
        pathName: 'inventory',
        text: 'Inventory',
        icon: inventoryIcon,
        child: [
          {
            pathName: 'list',
            text: 'List inventory',
            icon: inventoryIcon,
          },
          {
            pathName: 'location',
            text: 'Location',
            icon: locationIcon,
          },
        ],
      },
      { pathName: 'supplier', text: 'Supplier', icon: ecommerceIcon },
      {
        pathName: 'customer',
        text: 'Customer',
        icon: supplierIcon,
      },
    ],
  },
  {
    title: 'Reports',
    items: [{ pathName: 'analytics', text: 'Analytics', icon: analyticsIcon }],
  },
];
