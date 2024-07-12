import { CompanyDto } from "@/dto/company.dto";
import { CompanyProps } from "@/types/db/company.type";
import { SQLiteDatabase } from "expo-sqlite";
import { CompanyInterface } from "../interface/Company.interface";

export class CompanyRepository implements CompanyInterface {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
  initRepository(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async initDatabase(): Promise<void> {
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS "Company" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"name"	TEXT NOT NULL,
				"idCompanyType"	INTEGER NOT NULL,
				"logo"	TEXT 
			);
    `);
  }

  async add(company: Omit<CompanyDto, "id">): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO "Company" ("name", "idCompanyType", "logo") VALUES (?, ?, ?)`,
      [company.name, company.idCompanyType, company.logo ?? ""]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<CompanyProps[]> {
    const result = await this.db.getAllAsync<CompanyProps>(
      `	SELECT T1.id, T1.name, T1.idCompanyType AS idType, T2.name AS nameType 
				FROM Company T1 INNER JOIN CompanyType T2 ON T1.idCompanyType = T2.id ORDER BY T1.id ASC `
    );
    return result;
  }

  async getById(id: number): Promise<CompanyProps | undefined> {
    const result = await this.db.getFirstAsync<CompanyProps>(
      `	SELECT T1.id, T2.name, T2.name AS nameType 
				FROM Company T1 INNER JOIN CompanyType T2 ON T1.idCompanyType = T2.id
				WHERE T1.id = ? `,
      [id]
    );
    return result as CompanyProps;
  }

  async update(company: CompanyDto): Promise<number> {
    const result = await this.db.runAsync(
      `UPDATE company SET name = ?, idCompanyType = ?, logo = ? WHERE id = ?`,
      [company.name, company.idCompanyType, company.logo ?? "", company.id]
    );
    return result.changes;
  }

  async delete(id: number): Promise<number> {
    const result = await this.db.runAsync(`DELETE FROM company WHERE id = ?`, [
      id,
    ]);
    return result.changes;
  }
}
