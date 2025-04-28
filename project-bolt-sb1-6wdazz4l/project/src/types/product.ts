export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  details: Record<string, any>;
}
