import { CompanyTypeDto } from "@/dto/companyType.dto";

export interface CompanyTypeInterface {
  initRepository(): Promise<void>;
  add(dto: Omit<CompanyTypeDto, "id">): Promise<number>;
  getAll(): Promise<CompanyTypeDto[]>;
  getById(id: number): Promise<CompanyTypeDto | undefined>;
  update(dto: CompanyTypeDto): Promise<number>;
  delete(id: number): Promise<number>;
}
