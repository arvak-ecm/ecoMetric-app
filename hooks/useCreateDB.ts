import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

const useCreateDB = (dbName: string, deleteDB: boolean = false): boolean => {
  const [isDBReady, setIsDBReady] = useState(false);

  const createIfNotExists = async (dbUri: string, dbFilePath: string) => {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  };

  const deleteIfExistDB = async (dbName: string) => {
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
    await FileSystem.deleteAsync(dbFilePath);
  };

  useEffect(() => {
    const createDB = async () => {
      const dbAsset = require("../assets/database/ecometric.db");
      const dbUri = Asset.fromModule(dbAsset).uri;
      const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
      const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

      if (fileInfo.exists && deleteDB) {
        console.log("DB exists, delete it");
        await deleteIfExistDB(dbName);
        createDB();
        return;
      }

      if (!fileInfo.exists) {
        console.log("DB does not exist");
        await createIfNotExists(dbUri, dbFilePath);
      }

      console.log("DB is ready");
      setIsDBReady(true);
    };

    createDB();
  }, [dbName]);

  return isDBReady;
};

export default useCreateDB;
