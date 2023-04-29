import { 
    Controller,
    Post, Get, Put, Delete,
    Body, Param, Req,
    UseGuards
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { adminAuth } from '../../../helpers/firebase.config.admin';

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';
import { AuthTokenGuard } from '../../auth/guards/auth-token/auth-token.guard';
import { OrderDto } from '../domain/OrderDto';
import httpResponse from '../../../helpers/http.response';

@UseGuards(new AuthRoleGuard('admin'))
@UseGuards(AuthTokenGuard)
@Controller('order')
export class OrderController {
    constructor(
        private service: OrderService
    ){}

    protected async getRequestOwner(request): Promise<DecodedIdToken>{
        const token = request.headers["authorization"]?.split(' ')[1];
        const owner = await adminAuth.verifyIdToken(token)
        return owner
    }

    @Post()
    async createOrder(@Req() request, @Body() payload: OrderDto){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.createOrder(payload);

        return httpResponse(200, 'item created!', data, owner);
    }

    @Get()
    async getOrder(@Req() request, ){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.getOrders();

        return httpResponse(200, 'Ok!', data, owner);
    }

    @Put(':id')
    async updateOrder(@Req() request, @Body() payload: OrderDto, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);
        
        await this.service.updateOrder(id, payload);

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    @Delete(':id')
    async deleteOrder(@Req() request, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);

        await this.service.deleteOrder(id);

        return httpResponse(200, 'item deleted!', { id }, owner);
    }
}
