import { CompanyTypeDto } from "@/dto/companyType.dto";
import { SQLiteDatabase } from "expo-sqlite";
import { CompanyTypeInterface } from "../interface/CompanyType.interface";

export class CompanyTypeRepository implements CompanyTypeInterface {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
  initRepository(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async initDatabase(): Promise<void> {
    await this.db.execAsync(`
			CREATE TABLE IF NOT EXISTS "CompanyType" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"name"	TEXT NOT NULL,
				"description"	TEXT 
			);
    `);
  }

  async add(dto: Omit<CompanyTypeDto, "id">): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO "CompanyType" ("name", "description") VALUES (?, ?)`,
      [dto.name, dto.description ?? ""]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<CompanyTypeDto[]> {
    const result = await this.db.getAllAsync<CompanyTypeDto>(
      `	SELECT id, name, description 
				FROM CompanyType ORDER BY id ASC `
    );
    return result;
  }

  async getById(id: number): Promise<CompanyTypeDto | undefined> {
    const result = await this.db.getFirstAsync<CompanyTypeDto>(
      `	SELECT id, name, description 
				FROM CompanyType 
				WHERE id = ? `,
      [id]
    );
    return result as CompanyTypeDto;
  }

  async update(dto: CompanyTypeDto): Promise<number> {
    const result = await this.db.runAsync(
      `UPDATE CompanyType SET name = ?, description = ? WHERE id = ?`,
      [dto.name, dto.description ?? "", dto.id]
    );
    return result.changes;
  }

  async delete(id: number): Promise<number> {
    const result = await this.db.runAsync(
      `DELETE FROM CompanyType WHERE id = ?`,
      [id]
    );
    return result.changes;
  }
}
