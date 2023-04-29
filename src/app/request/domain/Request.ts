/**

    Solicitud de compra de productos, dirigido a los proveedores de dineva.
    Si bien los proveedores no tienen acceso a la aplicacion, la solicitud debe ser regitrada
    el objetivo de esta entidad es especificar las caracterisiticas de los productos que se comprara
    para abastecer los almacenes.

    Purchase request for products, addressed to Dineva's suppliers.
    Although the suppliers do not have access to the application, the request must be recorded.
    The aim of this entity is to specify the characteristics of the products that will be purchased
    to supply the warehouses.
*/

import User from "src/app/user/domain/User";

export interface Request {
    id: string;                                 // Request ID.
    provider: Provider;                         // Clothing providers.
    code: string;                               // Unique generated code.
    limit: Date | FirebaseFirestore.Timestamp;  // Time limit.
    description: string;                        // Description of request.
    image: string;                              // Reference image for purchase.

    accepted: boolean;                          // Accepted request for purchase.
    detail: string;                             // Request details.
    cardboard: string[];                        // Image gallery for payment reference.
    requester: User;                            // Requester user.
}

export type Provider = "" | 'Thailand' | 'Korea'

export default Request