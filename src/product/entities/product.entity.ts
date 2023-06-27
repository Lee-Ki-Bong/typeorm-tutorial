import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(() => ProductDetail, { cascade: true }) // "cascade" 옵션 관계를 통해 연결된 객체에 대한 데이터베이스 조작(cascade operation)을 지정
  @JoinColumn({ name: 'product_detail_id' })
  product_detail: ProductDetail;
}
