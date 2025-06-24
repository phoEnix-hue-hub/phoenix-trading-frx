// src/trades/trades.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule

@Module({
  imports: [AuthModule], // Include AuthModule to provide AuthService
})
export class TradesModule {}
