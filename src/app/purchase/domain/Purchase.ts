/*

    Purchase made to stock the warehouses.

    Compra de productos para el stcok de los almacenes.

*/

import Storehouse from "src/app/storehouse/domain/Storehouse";

export interface Purchase {
    id: string;                 // Purchase UID.
    name: string;               // Purchase name.
    provider: Provider;           // Supplier of the products.
    detail: string;             // Purchase details.
    alias: string;              // Purchase alias.
    document: string;           // Excel file.
    storehouse: Storehouse;     // Warehouse where the purchase will be stored.
}

export type Provider = "" | 'Thailand' | 'Korea';

export default Purchase