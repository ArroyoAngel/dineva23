import { 
    Controller,
    Post, Get, Put, Delete,
    Body, Param, Req,
    UseGuards,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { RequestService } from '../services/request.service';
import { adminAuth } from '../../../helpers/firebase.config.admin';

import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AuthRoleGuard } from 'src/app/auth/guards/auth-role/auth-role.guard';
import { AuthTokenGuard } from '../../auth/guards/auth-token/auth-token.guard';
import { RequestDto } from '../domain/RequestDto';
import httpResponse from '../../../helpers/http.response';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(new AuthRoleGuard('admin'))
@UseGuards(AuthTokenGuard)
@Controller('request')
export class RequestController {
    constructor(
        private service: RequestService
    ){}

    protected async getRequestOwner(request): Promise<DecodedIdToken>{
        const token = request.headers["authorization"]?.split(' ')[1];
        const owner = await adminAuth.verifyIdToken(token)
        return owner
    }

    @Post()
    async createRequest(@Req() request, @Body() payload: RequestDto){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.createRequest(payload);

        return httpResponse(200, 'item created!', data, owner);
    }

    @Get()
    async getRequest(@Req() request, ){
        const owner = await this.getRequestOwner(request);

        const data = await this.service.getRequests();

        return httpResponse(200, 'Ok!', data, owner);
    }

    @Put(':id')
    async updateRequest(@Req() request, @Body() payload: RequestDto, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);
        
        await this.service.updateRequest(id, payload);

        return httpResponse(200, 'item updated!', { id, ...payload }, owner);
    }

    @Delete(':id')
    async deleteRequest(@Req() request, @Param('id') id: string){
        const owner = await this.getRequestOwner(request);

        await this.service.deleteRequest(id);

        return httpResponse(200, 'item deleted!', { id }, owner);
    }

    @Post('upload/image/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Req() request, @Param('id') id: string, @UploadedFile() file: Express.Multer.File){

        const owner = await this.getRequestOwner(request);

        const url = await this.service.uploadImageUrl(id, file);

        return httpResponse(200, 'image uploaded!', { url }, owner);
    }

    @Post('upload/cardboard/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCardboard(@Req() request, @Param('id') id: string, @UploadedFile() file: Express.Multer.File){
        const owner = await this.getRequestOwner(request);

        const url = await this.service.uploadCardboardUrl(id, file);

        return httpResponse(200, 'image uploaded!', { url }, owner);
    }
}
