import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductPrice1687856941912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    Logger.log('상품 가격 모두 10000원 으로');
    await queryRunner.query('UPDATE product set p_price = 10000;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    Logger.log('상품 가격 모두 0원 으로');
    await queryRunner.query('UPDATE product set p_price = 0;');
  }
}
