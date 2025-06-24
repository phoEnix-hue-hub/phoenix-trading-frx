// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module'; // Import AuthModule
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vnwachukwu822:BxNFfxo4mAjE7CPj@phoenixtradingfrx.icff7wx.mongodb.net/phoenix-trading'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register schema
    AuthModule, // Include AuthModule
  ],
})
export class AppModule {}
