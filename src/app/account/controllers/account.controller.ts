import { 
    Controller,
    Post, Get, Put, Delete, Patch,
    Body, Param
} from '@nestjs/common';
import { Account } from '../domain/Account'
import { AccountDto } from '../domain/AccountDto'
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
    constructor(
        private service: AccountService
    ){}

    @Post()
    createAccount(@Body() payload: Account){
        return this.service.createAccount(payload)
    }

    @Get()
    getAccount(){
        return this.service.getAccounts();
    }

    @Put('reset-password')
    resetPassword(@Body('email') email: string){
        console.log(email)
        return this.service.resetPassword(email)
    }

    @Put(':id')
    updateAccount(@Body() payload: AccountDto, @Param('id') id: string){
        return this.service.updateAccount(id, payload);
    }

    @Delete(':id')
    deleteAccount(@Param('id') id: string){
        return this.service.deleteAccount(id);
    }

    @Patch(':id')
    enabledAccount(@Body('disabled') disabled: boolean, @Param('id') id: string){
        return this.service.enabledAccount(disabled, id);
    }
}
