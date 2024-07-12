import { MeterTypeDto } from "@/dto/meterType.dto";
import { SQLiteDatabase } from "expo-sqlite";
import { MeterTypeInterface } from "../interface/MeterType.interface";

export class MeterTypeRepository implements MeterTypeInterface {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
  initRepository(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async initDatabase(): Promise<void> {
    await this.db.execAsync(`
			CREATE TABLE IF NOT EXISTS "MeterType" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"name"	TEXT NOT NULL,
				"description"	TEXT,
				"logo"	TEXT
			);
    `);
  }

  async add(dto: Omit<MeterTypeDto, "id">): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO "MeterType" ("name", "description", "logo") VALUES (?, ?, ?)`,
      [dto.name, dto.description ?? "", dto.logo ?? ""]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<MeterTypeDto[]> {
    const result = await this.db.getAllAsync<MeterTypeDto>(
      `	SELECT id, name, description, logo
				FROM MeterType
				ORDER BY T1.id ASC `
    );
    return result;
  }

  async getById(id: number): Promise<MeterTypeDto | undefined> {
    const result = await this.db.getFirstAsync<MeterTypeDto>(
      `	SELECT id, name, description, logo
				FROM MeterType
				WHERE id = ? `,
      [id]
    );
    return result as MeterTypeDto;
  }

  async update(dto: MeterTypeDto): Promise<number> {
    const result = await this.db.runAsync(
      `UPDATE MeterType SET name = ?, description = ?, logo = ? WHERE id = ?`,
      [dto.name, dto.description ?? "", dto.logo ?? "", dto.id]
    );
    return result.changes;
  }

  async delete(id: number): Promise<number> {
    const result = await this.db.runAsync(
      `DELETE FROM MeterType WHERE id = ?`,
      [id]
    );
    return result.changes;
  }
}
