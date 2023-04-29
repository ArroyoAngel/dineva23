import Storehouse from "src/app/storehouse/domain/Storehouse";

export interface PurchaseDto {
    readonly id?: string;
    name?: string;          
    provider?: Provider;      
    detail?: string;        
    alias?: string;         
    document?: string;      
    storehouse?: string;
}

export type Provider = "" | 'Thailand' | 'Korea';

export default PurchaseDto