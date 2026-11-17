export interface ReserveItemsDto {
  itemId: string;
  quantity: number;
}

export class InventoryService {
  async reserveStock(items: ReserveItemsDto[]): Promise<boolean> {
    // TODO: Implement atomic check & decrement via Prisma
    throw new Error('Not implemented');
  }
}