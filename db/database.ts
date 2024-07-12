import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
const dbName = 'ecometric.db';

async function createdIfNotExists(dbUri: string, dbFilePath: string) {
	await FileSystem.makeDirectoryAsync(
		`${FileSystem.documentDirectory}SQLite`,
		{ intermediates: true }
	);
	await FileSystem.downloadAsync(dbUri, dbFilePath);
}

async function createDB() {
	const dbAsset = require('../assets/ecometric.db');
	const dbUri = Asset.fromModule(dbAsset).uri;
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
	const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
	if (!fileInfo.exists) {
		await createdIfNotExists(dbUri, dbFilePath);
	}
}

export default createDB;