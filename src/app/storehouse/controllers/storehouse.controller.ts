import { 
    Controller,
    Post, Get, Put, Delete,
    Body, Param, Req,
    UseGuards
} from '@nestjs/common';
import { StorehouseService } from '../services/storehouse.service';
import { adminAuth } from '../../../helpers/firebase.config.admin';

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';
import { AuthTokenGuard } from '../../auth/guards/auth-token/auth-token.guard';
import { StorehouseDto } from '../domain/StorehouseDto';
import httpResponse from '../../../helpers/http.response';

@UseGuards(new AuthRoleGuard('admin'))
@UseGuards(AuthTokenGuard)
@Controller('storehouse')
export class StorehouseController {
    constructor(
        private service: StorehouseService
    ){}

    protected async getRequestOwner(request): Promise<DecodedIdToken>{
        const token = request.headers["authorization"]?.split(' ')[1];
        const owner = await adminAuth.verifyIdToken(token)
        return owner
    }

    @Post()
    async createStorehouse(@Req() request, @Body() payload: StorehouseDto){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.createStorehouse(payload);

        return httpResponse(200, 'item created!', data, owner);
    }

    @Get()
    async getStorehouse(@Req() request, ){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.getStorehouses();

        return httpResponse(200, 'Ok!', data, owner);
    }

    @Put(':id')
    async updateStorehouse(@Req() request, @Body() payload: StorehouseDto, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);
        
        await this.service.updateStorehouse(id, payload);

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    @Delete(':id')
    async deleteStorehouse(@Req() request, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);

        await this.service.deleteStorehouse(id);

        return httpResponse(200, 'item deleted!', { id }, owner);
    }
}
