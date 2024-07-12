import { MeterDto } from "@/dto/meter.dto";
import { MeterProps } from "@/types/db/meter.type";
import { SQLiteDatabase } from "expo-sqlite";
import { MeterInterface } from "../interface/Meter.interface";

export class MeterRepository implements MeterInterface {
  private db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
  initRepository(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async initDatabase(): Promise<void> {
    await this.db.execAsync(`
			CREATE TABLE IF NOT EXISTS "Meter" (
				"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
				"name"	TEXT NOT NULL,
				"serialNumber"	TEXT NOT NULL,
				"meterTypeId"	INTEGER NOT NULL,
				"companyId"	INTEGER NOT NULL
			);
    `);
  }

  async add(dto: Omit<MeterDto, "id">): Promise<number> {
    const result = await this.db.runAsync(
      `INSERT INTO "CompanyType" ("name", "serialNumber", "meterTypeId", "companyId") VALUES (?, ?, ?, ?)`,
      [dto.name, dto.serialNumber ?? "SN", dto.meterTypeId, dto.companyId]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<MeterProps[]> {
    const result = await this.db.getAllAsync<MeterProps>(
      `	SELECT T1.id, T1.name, T1.serialNumber, T1.companyId, T2.name AS nameCompany, T1.meterTypeId, T3.name AS nameMeterType 
				FROM Meter T1 
				INNER JOIN Company T2 ON T1.companyId = T2.id
				INNER JOIN MeterType T3 ON T1.meterTypeId = T3.id
				ORDER BY T1.id ASC `
    );
    return result;
  }

  async getById(id: number): Promise<MeterProps | undefined> {
    const result = await this.db.getFirstAsync<MeterProps>(
      `	SELECT T1.id, T1.name, T1.serialNumber, T1.companyId, T2.name AS nameCompany, T1.meterTypeId, T3.name AS nameMeterType 
				FROM Meter T1 
				INNER JOIN Company T2 ON T1.companyId = T2.id
				INNER JOIN MeterType T3 ON T1.meterTypeId = T3.id
				WHERE T1id = ?
				ORDER BY T1.id ASC `[id]
    );
    return result as MeterProps;
  }

  async update(dto: MeterDto): Promise<number> {
    const result = await this.db.runAsync(
      `UPDATE Meter SET name = ?, serialNumber=?, meterTypeId = ?, companyId = ? WHERE id = ?`,
      [dto.name, dto.serialNumber ?? "SN", dto.meterTypeId, dto.companyId]
    );
    return result.changes;
  }

  async delete(id: number): Promise<number> {
    const result = await this.db.runAsync(`DELETE FROM Meter WHERE id = ?`, [
      id,
    ]);
    return result.changes;
  }
}
