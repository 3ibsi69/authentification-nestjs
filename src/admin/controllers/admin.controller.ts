import {
  Controller,
  Get,
  Body,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AuthenticationGuard } from '../../guards/authentification.guard';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/utils/type.enum';

@Roles(Role.SUPERADMIN)
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('find-all')
  findAll() {
    return this.adminService.findAll();
  }

  @Get('find-one')
  findOne(@Req() req: any) {
    return this.adminService.findOne({ where: { id: +req.user.id } });
  }

  @Put('update')
  update(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+req.user.id, updateAdminDto);
  }

  @Delete('remove')
  remove(@Req() req: any) {
    return this.adminService.remove(+req.user.id);
  }
}
