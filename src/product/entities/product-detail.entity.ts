import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
