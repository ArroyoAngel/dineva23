import { 
    Controller,
    Post, Get, Put, Delete,
    Body, Param, Req,
    UseGuards    
} from '@nestjs/common';
import { UserService } from '../services/user.service'
import { AuthTokenGuard } from '../../auth/guards/auth-token/auth-token.guard'
import { adminAuth } from '../../../helpers/firebase.config.admin';
import httpResponse from '../../../helpers/http.response'
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';

@UseGuards(new AuthRoleGuard('client'))
@UseGuards(AuthTokenGuard)
@Controller('user')
export class UserController {
    constructor(private service: UserService){}
    
    protected async getRequestOwner(request): Promise<DecodedIdToken>{
        const token = request.headers["authorization"]?.split(' ')[1];
        const owner = await adminAuth.verifyIdToken(token)
        return owner
    }

    @Post()
    async createUser(@Req() request, @Body() payload){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.createUser(payload)  ; 
        
        return httpResponse(200, 'item created!', data, owner);
    }
    @Get()
    async getUsers(@Req() request){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.getUsers();

        return httpResponse(200, 'Ok!', data, owner);
    }

    @Put(':id')
    async updateUser(@Req() request, @Param('id') id: string, @Body() payload){
        const owner = await this.getRequestOwner(request);

        await this.service.updateUser(id, payload)

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    @Delete(':id')
    async deleteUser(@Req() request, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);

        await this.service.deleteUser(id);
        
        return httpResponse(200, 'item deleted!', { id }, owner);
    }
}
