import { CompanyDto } from "@/dto/company.dto";
import { CompanyProps } from "@/types/db/company.type";

export interface CompanyInterface {
  initRepository(): Promise<void>;
  add(company: Omit<CompanyDto, "id">): Promise<number>;
  getAll(): Promise<CompanyProps[]>;
  getById(id: number): Promise<CompanyProps | undefined>;
  update(company: CompanyDto): Promise<number>;
  delete(id: number): Promise<number>;
}
