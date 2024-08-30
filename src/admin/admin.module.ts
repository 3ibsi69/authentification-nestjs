import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { AdminAuthController } from './controllers/admin.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Admin } from './entities/admin.entity';
import { Auth, ResetToken } from 'src/shared/entities/auth.entity';
import { AdminAuthService } from './services/admin.auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Auth, ResetToken]), SharedModule],
  controllers: [AdminController, AdminAuthController],
  providers: [AdminService, AdminAuthService],
  exports: [AdminService],
})
export class AdminModule {}
