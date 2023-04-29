/*

    Purchase order from an external customer to Dineva importer. 
    The customer goes to one of Dineva's branches and buys cloth per unit.

    Orden de compra de un cliente externo a importadora Dineva.
    Este cliente se presenta a una de las sucursales de dineva y hace una compra de tela por unidad.
    
*/

export interface Order {
    id: string;             // Client ID.
    name: string;           // Client name.
    phone: string;          // Client phone number.
    address: string;        // Delivery address.
    departament: string;    // Payment status.
    detail: string;         // Purchase details.
}

export default Order