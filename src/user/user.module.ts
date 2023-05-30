import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { userResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config/config';

@Module({
  imports: [
    JwtModule.register({ global: true,
      secret: config.secret,
      signOptions: { expiresIn: '2h' },}),
    TypeOrmModule.forFeature([userEntity]),
  ],
  providers: [UserService, userResolver],
})
export class UserModule {}
