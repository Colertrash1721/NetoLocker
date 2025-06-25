import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'f1b2e3c4d5a6b7890a1b2c3d4e5f67890abcdef1234567890fedcba0987654321',
    signOptions: { expiresIn: '70h' },
  }),],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
})
export class ShortLinkModule {}
