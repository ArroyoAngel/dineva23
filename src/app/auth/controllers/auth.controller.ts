import { 
    Controller,
    Post, Delete,
    Headers
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){}
    @Post()
    login(@Headers('Authorization') authorization){
        const encodedCredentials = authorization.split(' ')[1];
        const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
        const [username, password] = decodedCredentials.split(':');
        return this.service.login(username, password)
    }

    @Delete()
    logout(@Headers('Authorization') authorization){
        const token = authorization?.split(' ')[1];
        return this.service.logout(token);
    }
}
