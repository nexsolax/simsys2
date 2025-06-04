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
  transferRequestIcon,
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
<<<<<<< HEAD
          { pathName: 'list', text: 'List user', icon: userIcon },
=======
          { pathName: 'list', text: 'List', icon: userIcon },
>>>>>>> branch1
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
<<<<<<< HEAD
            text: 'List product',
=======
            text: 'List',
>>>>>>> branch1
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
      // { pathName: 'invoice', text: 'Invoice', icon: invoiceIcon },
      { pathName: 'consignment', text: 'Consignment', icon: invoiceIcon },
      {
        pathName: 'purchase-order',
        text: 'Purchase Order',
        icon: purchaseOrderIcon,
        child: [
          {
            pathName: 'list',
<<<<<<< HEAD
            text: 'List purchase order',
=======
            text: 'List',
>>>>>>> branch1
            icon: purchaseOrderIcon,
          },
          // {
          //   pathName: 'request',
          //   text: 'Request',
          //   icon: purchaseOrderIcon,
          // },
        ],
      },
      {
        pathName: 'inventory',
        text: 'Inventory',
        icon: inventoryIcon,
        child: [
          {
            pathName: 'list',
<<<<<<< HEAD
            text: 'List inventory',
=======
            text: 'List',
>>>>>>> branch1
            icon: inventoryIcon,
          },
          {
            pathName: 'location',
            text: 'Location',
            icon: locationIcon,
          },
        ],
      },
      {
        pathName: 'transfer-request',
        text: 'Transfer Request',
        icon: transferRequestIcon,
        child: [
          {
            pathName: 'list',
<<<<<<< HEAD
            text: 'List transfer-request',
=======
            text: 'List',
>>>>>>> branch1
            icon: transferRequestIcon,
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
  // {
  //   title: 'Reports',
  //   items: [{ pathName: 'analytics', text: 'Analytics', icon: analyticsIcon }],
  // },
];
