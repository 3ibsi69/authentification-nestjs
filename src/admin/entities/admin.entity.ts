import { Entity, Column } from 'typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../utils/type.enum';

@Entity()
export class Admin extends UserEntity {
  @ApiProperty()
  @Column({ type: 'enum', enum: Role, default: Role.SUPERADMIN })
  role: Role;
}
