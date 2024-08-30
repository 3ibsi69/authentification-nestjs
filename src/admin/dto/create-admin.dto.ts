import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../utils/Type.enum';
import { IsEnum } from 'class-validator';
import { CreateUserDto } from '../../shared/dtos/user.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsEnum(Role)
  @ApiProperty({ example: Role.SUPERADMIN })
  role?: Role;
}
