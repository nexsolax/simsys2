import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Draft } from 'immer';
import {
  categoriesActions,
  CategoriesActions,
  CategoriesState,
  initialCategories,
} from './store/categories';
import { initialVariants, VariantsActions, variantsActions, VariantsState } from './store/variants';
import { initialRoles, rolesActions, RolesActions, RolesState } from './store/roles';
import { initialUsers, usersActions, UsersActions, UsersState } from './store/users';
import { initialProducts, productsActions, ProductsActions, ProductsState } from './store/products';
import {
  initialConsignments,
  consignmentsActions,
  ConsignmentsActions,
  ConsignmentsState,
} from './store/consignments';
import {
  initialSuppliers,
  suppliersActions,
  SuppliersActions,
  SuppliersState,
} from './store/suppliers';
import {
  CustomersState,
  customersActions,
  CustomersActions,
  initialCustomers,
} from './store/customers';
import {
  initialPurchaseOrders,
  purchaseOrdersActions,
  PurchaseOrdersActions,
  PurchaseOrdersState,
} from './store/purchase-orders';
import {
  initialInventories,
  InventoriesActions,
  inventoriesActions,
  InventoriesState,
} from './store/inventories';
import {
  initialLocations,
  locationsActions,
  LocationsActions,
  LocationsState,
} from './store/locations';
import {
  initialTransferRequests,
  transferRequestsActions,
  TransferRequestsActions,
  TransferRequestsState,
} from './store/transfer-requests';
import {
  initialTransactions,
  TransactionsActions,
  transactionsActions,
  TransactionsState,
} from './store/transactions';
import { AuthActions, authActions, AuthState, initialAuth } from './store/auth';
import { initialOrders, ordersActions, OrdersActions, OrdersState } from './store/orders';
import { initialCart, cartActions, CartState, CartActions } from './store/cart';

export interface State {
  auth: AuthState;
  categories: CategoriesState;
  variants: VariantsState;
  roles: RolesState;
  users: UsersState;
  products: ProductsState;
  consignments: ConsignmentsState;
  suppliers: SuppliersState;
  customers: CustomersState;
  purchaseOrders: PurchaseOrdersState;
  inventories: InventoriesState;
  locations: LocationsState;
  transferRequests: TransferRequestsState;
  transactions: TransactionsState;
  orders: OrdersState;
  cart: CartState;
}

export type Actions = AuthActions &
  CategoriesActions &
  VariantsActions &
  RolesActions &
  UsersActions &
  ProductsActions &
  ConsignmentsActions &
  SuppliersActions &
  CustomersActions &
  PurchaseOrdersActions &
  InventoriesActions &
  LocationsActions &
  TransferRequestsActions &
  TransactionsActions &
  OrdersActions &
  CartActions;

export type Store = State & Actions;
export type StoreGet = () => Store;
export type StoreSet = (f: (state: Draft<State>) => void) => void;

export const useStore = create<Store, [['zustand/immer', never]]>(
  immer((set, get) => ({
    auth: initialAuth,
    ...authActions(set, get),
    categories: initialCategories,
    ...categoriesActions(set),
    variants: initialVariants,
    ...variantsActions(set),
    roles: initialRoles,
    ...rolesActions(set),
    users: initialUsers,
    ...usersActions(set),
    products: initialProducts,
    ...productsActions(set),
    consignments: initialConsignments,
    ...consignmentsActions(set),
    suppliers: initialSuppliers,
    ...suppliersActions(set),
    customers: initialCustomers,
    ...customersActions(set),
    purchaseOrders: initialPurchaseOrders,
    ...purchaseOrdersActions(set),
    inventories: initialInventories,
    ...inventoriesActions(set),
    locations: initialLocations,
    ...locationsActions(set),
    transferRequests: initialTransferRequests,
    ...transferRequestsActions(set),
    transactions: initialTransactions,
    ...transactionsActions(set),
    orders: initialOrders,
    ...ordersActions(set),
    cart: initialCart,
    ...cartActions(set),
  })),
);
