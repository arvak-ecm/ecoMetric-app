import { MeterReadingDto } from "@/dto/meterReading.dto";

export interface MeterReadingInterface {
  initRepository(): Promise<void>;
  add(dto: Omit<MeterReadingDto, "id">): Promise<number>;
  getAll(): Promise<MeterReadingDto[]>;
  getById(id: number): Promise<MeterReadingDto | undefined>;
  update(dto: MeterReadingDto): Promise<number>;
  delete(id: number): Promise<number>;
}
