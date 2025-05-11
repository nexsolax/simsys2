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

export interface State {
  categories: CategoriesState;
  variants: VariantsState;
  roles: RolesState;
  users: UsersState;
  products: ProductsState;
  consignments: ConsignmentsState;
  suppliers: SuppliersState;
  customers: CustomersState;
}

export type Actions = CategoriesActions &
  VariantsActions &
  RolesActions &
  UsersActions &
  ProductsActions &
  ConsignmentsActions &
  SuppliersActions &
  CustomersActions;

export type Store = State & Actions;
export type StoreGet = () => Store;
export type StoreSet = (f: (state: Draft<State>) => void) => void;

export const useStore = create<Store, [['zustand/immer', never]]>(
  immer((set, get) => ({
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
  })),
);
