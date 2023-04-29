export interface RequestDto {
    readonly id?: string;
    code?: string;
    description?: string;
    image?: string;
    provider?: Provider;
    accepted?: boolean;
    limit?: Date | FirebaseFirestore.Timestamp;
    detail?: string;
    cardboard?: string[];
    requester?: string;
}

export type Provider = "" | 'Thailand' | 'Korea';

export default RequestDto;