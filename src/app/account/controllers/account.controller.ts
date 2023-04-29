import { 
    Controller,
    Post, Get, Put, Delete, Patch,
    Body, Param, UseGuards
} from '@nestjs/common';
import { Account } from '../domain/Account'
import { AccountDto } from '../domain/AccountDto'
import { AccountService } from '../services/account.service';
import httpResponse from 'src/helpers/http.response';
import { AuthTokenGuard } from 'src/app/auth/guards/auth-token/auth-token.guard';
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';
import { Public } from 'src/app/auth/decorators/public.decorator';

@UseGuards(AuthTokenGuard)
@Controller('account')
export class AccountController {
    constructor(
        private service: AccountService
    ){}

    @Post()
    @Public()
    async createAccount(@Body() payload: Account){
        const owner = null;

        const data = await this.service.createAccount(payload)

        return httpResponse(200, 'Item created!!', { data }, owner);
    }

    @Get()
    @Public()
    async getAccount(){
        const owner = null;

        const data = await this.service.getAccounts();

        return httpResponse(200, 'Ok!', { data }, owner);
    }

    @Public()
    @Put('reset-password')
    async resetPassword(@Body('email') email: string){
        const owner = null;

        await this.service.resetPassword(email);

        return httpResponse(200, 'passwrod updated!', { email }, owner);
    }

    @Put(':id')
    async updateAccount(@Body() payload: AccountDto, @Param('id') id: string){
        const owner = null
        
        await this.service.updateAccount(id, payload);

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    
    @UseGuards(new AuthRoleGuard('admin'))
    @Delete(':id')
    async deleteAccount(@Param('id') id: string){
        const owner = null;

        await this.service.deleteAccount(id);

        return httpResponse(200, 'item deleted!', { id }, owner);
    }

    @UseGuards(new AuthRoleGuard('admin'))
    @Patch(':id')
    async disableAccount(@Body('disabled') disabled: boolean, @Param('id') id: string){
        const owner = null;

        await this.service.disableAccount(disabled, id);

        return httpResponse(200, 'Ok!', { disabled }, owner);
    }
}
