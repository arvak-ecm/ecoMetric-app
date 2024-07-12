import { MeterReadingDto } from "@/dto/meterReading.dto";
import { dateTimeSql } from "@/scripts/utils";
import { SQLiteDatabase } from "expo-sqlite";
import { MeterReadingInterface } from "../interface/MeterReading.interface";

export class MeterReadingRepository implements MeterReadingInterface {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
  initRepository(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async initDatabase(): Promise<void> {
    await this.db.execAsync(`
			CREATE TABLE IF NOT EXISTS "MeterReading" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"meterId"	INTEGER NOT NULL,
				"reading"	REAL NOT NULL,
				"createdAt"	TEXT NOT NULL,
				"updatedAt"	TEXT NOT NULL
			);
    `);
  }

  async add(dto: Omit<MeterReadingDto, "id">): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO "MeterReading" ("meterId", "reading", "createdAt", "updatedAt") VALUES (?, ?, ?, ?)`,
      [
        dto.meterId,
        dto.reading,
        dto.createdAt || dateTimeSql(),
        dto.updatedAt || dateTimeSql(),
      ]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<MeterReadingDto[]> {
    const result = await this.db.getAllAsync<MeterReadingDto>(
      `	SELECT id, reading, createdAt, updatedAt 
				FROM MeterReading 
				ORDER BY id DESC `
    );
    return result;
  }

  async getById(id: number): Promise<MeterReadingDto | undefined> {
    const result = await this.db.getFirstAsync<MeterReadingDto>(
      `	SELECT id, reading, createdAt, updatedAt 
				FROM MeterReading
				WHERE id = ? `,
      [id]
    );
    return result as MeterReadingDto;
  }

  async update(dto: MeterReadingDto): Promise<number> {
    const result = await this.db.runAsync(
      `UPDATE MeterReading SET reading = ?, updatedAt = ? WHERE id = ?`,
      [dto.reading, dto.updatedAt || dateTimeSql(), dto.id]
    );
    return result.changes;
  }

  async delete(id: number): Promise<number> {
    const result = await this.db.runAsync(
      `DELETE FROM MeterReading WHERE id = ?`,
      [id]
    );
    return result.changes;
  }
}
