/* import { InventoryService, ReserveItemsDto } from '../inventory/inventory.service';

export class OrdersService {
  constructor(private inventoryService: InventoryService) {}

  async createOrder(userId: string, items: ReserveItemsDto[]): Promise<void> {
    const isReserved = await this.inventoryService.reserveStock(items);
    if (!isReserved) {
      throw new Error('Insufficient stock');
    }
    // TODO: Create order in DB
  }
} */