import { CompanyDto } from "@/dto/companyDto";
import { Company } from "@/types/db/company";
import { useSQLiteContext } from "expo-sqlite";

interface CompanyRepository {
  initRepository(): Promise<void>;
  addCompany(company: Omit<Company, "id">): Promise<number>;
  getCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  updateCompany(company: Company): Promise<number>;
  deleteCompany(id: number): Promise<number>;
}

export function CompanyService() {
  const db = useSQLiteContext();

  async function initDatabase(): Promise<void> {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Company" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"name"	TEXT NOT NULL,
				"idCompanyType"	INTEGER NOT NULL,
				"logo"	TEXT 
			);
    `);
  }

  async function addCompany(company: Omit<CompanyDto, "id">): Promise<number> {
    const result = await db.runAsync(
      `INSERT INTO "Company" ("name", "idCompanyType", "logo") VALUES (?, ?, ?)`,
      [company.name, company.idCompanyType, company.logo ?? ""]
    );
    return result.lastInsertRowId;
  }

  async function getCompanies(): Promise<Company[]> {
    const result = await db.getAllAsync<Company>(
      `	SELECT T1.id, T2.name, T2.name AS nameType 
				FROM Company T1 INNER JOIN CompanyType T2 ON T1.idCompanyType = T2.id ORDER BY T1.id ASC `
    );
    return result;
  }

  async function getCompanyById(id: number): Promise<Company | undefined> {
    const result = await db.getFirstAsync<Company>(
      `	SELECT T1.id, T2.name, T2.name AS nameType 
				FROM Company T1 INNER JOIN CompanyType T2 ON T1.idCompanyType = T2.id
				WHERE T1.id = ? `,
      [id]
    );
    return result as Company;
  }

  async function updateCompany(company: CompanyDto): Promise<number> {
    const result = await db.runAsync(
      `UPDATE company SET name = ?, idCompanyType = ?, logo = ? WHERE id = ?`,
      [company.name, company.idCompanyType, company.logo ?? "", company.id]
    );
    return result.changes;
  }

  async function deleteCompany(id: number): Promise<number> {
    const result = await db.runAsync(`DELETE FROM company WHERE id = ?`, [id]);
    return result.changes;
  }

  return {
    initDatabase,
    addCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
  };
}
