import { CompanyInterface } from "@/middleware/interface/Company.interface";
import { CompanyRepository } from "@/middleware/repository/Company.repository";
import { useSQLiteContext } from "expo-sqlite";

export function useCompanyRepository(): CompanyInterface {
  const db = useSQLiteContext();
  return new CompanyRepository(db);
}
