import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body()
    body: {
      email: string;
      password: string;
      name?: string;
      profession?: string;
    },
  ) {
    await this.userService.createUser(body);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password);
  }
}
