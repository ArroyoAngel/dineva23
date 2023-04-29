import { 
    Controller,
    Post, Get, Put, Delete,
    Body, Param, Req,
    UseGuards,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { adminAuth } from '../../../helpers/firebase.config.admin';

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';
import { AuthTokenGuard } from '../../auth/guards/auth-token/auth-token.guard';
import { PurchaseDto } from '../domain/PurchaseDto';
import httpResponse from '../../../helpers/http.response';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(new AuthRoleGuard('admin'))
@UseGuards(AuthTokenGuard)
@Controller('purchase')
export class PurchaseController {
    constructor(
        private service: PurchaseService
    ){}

    protected async getRequestOwner(request): Promise<DecodedIdToken>{
        const token = request.headers["authorization"]?.split(' ')[1];
        const owner = await adminAuth.verifyIdToken(token)
        return owner
    }

    @Post()
    async createPurchase(@Req() request, @Body() payload: PurchaseDto){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.createPurchase(payload);

        return httpResponse(200, 'item created!', data, owner);
    }

    @Get()
    async getPurchase(@Req() request, ){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.getPurchases();

        return httpResponse(200, 'Ok!', data, owner);
    }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Req() request, @Param('id') id: string, @UploadedFile() file: Express.Multer.File){
        const owner = await this.getRequestOwner(request);

        const url = await this.service.uploadExcelFile(id, file);

        return httpResponse(200, 'image uploaded!', { url }, owner);
    }

    @Put(':id')
    async updatePurchase(@Req() request, @Body() payload: PurchaseDto, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);
        
        await this.service.updatePurchase(id, payload);

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    @Delete(':id')
    async deletePurchase(@Req() request, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);

        await this.service.deletePurchase(id);

        return httpResponse(200, 'item deleted!', { id }, owner);
    }
}
