// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(name, phone, email, password);
  }

  @Post('login')
  async login(
    @Body('identifier') identifier: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(identifier, password);
  }

  
  @Post('update-balance')
  async updateBalance(
    @Body('username') username: string,
    @Body('balance') balance: number,
  ) {
    return this.authService.updateBalance(username, balance);
  }
  

  // src/auth/auth.controller.ts (add this method)
  @Post('update-central-wallet')
  async updateCentralWallet(
    @Body('amount') amount: number,
  ) {
    return this.authService.updateCentralWallet(amount);
  }
}
