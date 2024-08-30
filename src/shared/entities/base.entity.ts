import {
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty()
  @Index()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => "date_trunc('second', (now() AT TIME ZONE 'UTC'))",
  })
  createdAt?: Date;
  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => "date_trunc('second', (now() AT TIME ZONE 'UTC'))",
  })
  updatedAt?: Date;
}
