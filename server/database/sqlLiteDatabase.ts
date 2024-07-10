import * as SQLite from 'expo-sqlite';
import VocabularyENTITY from '../model/VocabularyENTITY';

const __dataContext = SQLite.openDatabaseAsync('Vocabulary', {
    useNewConnection: true,
});

export default class VocabularySQLiteService {

    public _tableName = "word_lists";

    constructor() { }

    dataContext() {
        return SQLite.openDatabaseAsync('Vocabulary', {
            useNewConnection: true,
        });
    }

    public async StartDatabase() {
        const db = await this.dataContext();
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS  ${this._tableName} (
        id INTEGER PRIMARY KEY NOT NULL, 
        code TEXT,
        name TEXT,
        description TEXT,
        create_at TEXT,
        create_by TEXT,
        update_at TEXT,
        update_by TEXT,
        delete_at TEXT,
        delete_by TEXT,
        is_deleted INTEGER,
        is_edit INTEGER,
        phonicsTractions TEXT
        );
    `);
    }

    public async InsertItem(item: VocabularyENTITY) {
        const insertStatement = `
          INSERT INTO ${this._tableName} (
            id,
            code, 
            name, 
            description, 
            create_at, 
            create_by,
            update_at, 
            update_by, 
            delete_at, 
            delete_by,
            is_deleted, 
            is_edit, 
            phonicsTractions
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const db = await this.dataContext();

        const result = await db.runAsync(insertStatement,
            item?.id ?? '',
            item?.code ?? '',
            item?.name ?? '',
            item?.description ?? '',
            item?.create_at?.toString() ?? new Date().toString(),
            item?.create_by ?? '',
            item?.update_at?.toString() ?? new Date().toString(),
            item?.update_by ?? '',
            item?.delete_at?.toString() ?? new Date().toString(),
            item?.delete_by ?? '',
            item?.is_deleted ?? 0,
            0,
            item?.phonicsTractions ?? '');
        console.log(result.lastInsertRowId, result.changes);
        return result;
    }

    public async GetItems() {
        const db = await this.dataContext();
        const allRows = await db.getAllAsync(`SELECT * FROM ${this._tableName} ORDER BY id DESC`) as any;
        const convertRow = []
        for (const row of allRows) {
            // console.log(row)
            const rowItem = {
                ...row,
                create_at: new Date(row.create_at),
                update_at: new Date(row.update_at),
                delete_at: new Date(row.delete_at),
                is_deleted: row.is_deleted == 1,
                is_edit: row.is_edit == 1,
            };

            convertRow.push(rowItem);
        }
        return convertRow;
    }


    public async UpdateItem(item: VocabularyENTITY) {
        const insertStatement = `
        UPDATE  ${this._tableName} 
        set   
            name = ?, 
            description = ?, 
            create_at = ?,
            create_by = ?,
            update_at = ?, 
            update_by = ?, 
            delete_at = ?, 
            delete_by = ?,
            is_deleted = ?, 
            is_edit = ?, 
            phonicsTractions = ?
        where code = ?
        ;
        `;
        const db = await this.dataContext();

        const result = await db.runAsync(insertStatement,
            item?.name ?? '',
            item?.description ?? '',
            item?.create_at?.toString() ?? new Date().toString(),
            item?.create_by ?? '',
            item?.update_at?.toString() ?? new Date().toString(),
            item?.update_by ?? '',
            item?.delete_at?.toString() ?? new Date().toString(),
            item?.delete_by ?? '',
            item?.is_deleted ?? 0,
            false,  // is_edit remains 0 (false) because it is not updated
            item?.phonicsTractions ?? '',
            item?.code ?? '',);
        return result;
    }


    async DeleteItem(code: string) {
        const db = await this.dataContext();
        const result = await db.runAsync(`DELETE FROM ${this._tableName} WHERE code =?`, code);
        return result;
    }


    async DeleteAllItems() {
        const db = await this.dataContext();
        const result = await db.runAsync(`DELETE FROM ${this._tableName}`);
        return result;
    }
}