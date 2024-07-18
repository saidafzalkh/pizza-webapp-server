import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  telegramId: number;

  @IsString()
  @IsOptional()
  userPhone?: string;

  @IsString()
  @IsOptional()
  userAddress?: string;

  @IsNumber()
  userBonus?: number;

  @IsBoolean()
  useBonus?: boolean;

  @IsArray()
  orderItems: {
    productId: number;
    quantity: number;
    price: number;
  }[];
}
