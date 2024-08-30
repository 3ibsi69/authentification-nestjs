import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { CrudService } from 'src/utils/generic.service';
@Injectable()
export class AdminService extends CrudService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
  ) {
    super(AdminRepository);
  }

  async populate(entity: Admin): Promise<Admin> {
    return entity;
  }
}
