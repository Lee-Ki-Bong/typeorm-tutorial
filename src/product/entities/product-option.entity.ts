import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductOption {
  @PrimaryGeneratedColumn()
  po_id: number;

  @Column({ default: '' })
  po_name: string;

  @Column({ default: '' })
  po_value: string;

  @ManyToOne(() => Product, (product) => product.p_product_options)
  product: Product;
}
