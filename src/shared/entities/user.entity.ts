import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  firstName: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  lastName: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    default:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp',
  })
  avatar: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isBanned: boolean;

  @ApiProperty()
  @Column({ default: false, type: 'boolean' })
  isConnected: boolean;
}
