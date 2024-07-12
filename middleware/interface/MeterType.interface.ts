import { MeterTypeDto } from "@/dto/meterType.dto";

export interface MeterTypeInterface {
  initRepository(): Promise<void>;
  add(dto: Omit<MeterTypeDto, "id">): Promise<number>;
  getAll(): Promise<MeterTypeDto[]>;
  getById(id: number): Promise<MeterTypeDto | undefined>;
  update(dto: MeterTypeDto): Promise<number>;
  delete(id: number): Promise<number>;
}
