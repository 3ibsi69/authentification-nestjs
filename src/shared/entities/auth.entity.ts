import { BaseEntity } from 'src/shared/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { Role } from 'src/utils/type.enum';

@Entity()
export class Auth extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  token: string;

  @ApiProperty()
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty()
  @Column({ default: Role.SUPERADMIN, type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  expiryDate: Date;
}

@Entity()
export class ResetToken extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  token: string;

  @ApiProperty()
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty()
  @Column({ default: Role.SUPERADMIN, type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  expiryDate: Date;
}
