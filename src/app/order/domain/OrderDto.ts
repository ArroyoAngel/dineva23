import Storehouse from "src/app/storehouse/domain/Storehouse";

export interface OrderDto {
    readonly id?: string;
    name: string;
    phone: string;
    address: string;
    departament: string;
    detail: boolean;
}

export default OrderDto