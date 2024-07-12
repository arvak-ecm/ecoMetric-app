import { MeterDto } from "@/dto/meter.dto";
import { MeterProps } from "@/types/db/meter.type";

export interface MeterInterface {
  initRepository(): Promise<void>;
  add(dto: Omit<MeterDto, "id">): Promise<number>;
  getAll(): Promise<MeterProps[]>;
  getById(id: number): Promise<MeterProps | undefined>;
  update(dto: MeterDto): Promise<number>;
  delete(id: number): Promise<number>;
}
