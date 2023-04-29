export interface AccountDto {
    email?: string;
    role?: Roles;
}

export type Roles = 'admin' | 'operator' | 'client'

export default AccountDto