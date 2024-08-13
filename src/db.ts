const DB_PATH = "./localdb/users.json";

export async function addRecord(id: string, data: any) {
  const file = JSON.parse(await Deno.readTextFile(DB_PATH));
  file[id] = data;
  await Deno.writeTextFile(DB_PATH, JSON.stringify(file));
}

export async function getRecord(id: string) {
  const file = JSON.parse(await Deno.readTextFile(DB_PATH));
  return file[id];
}

async function checkDatabase() {
  try {
    await Deno.stat(DB_PATH);
  } catch (e) {
    await Deno.writeTextFile(DB_PATH, JSON.stringify({}));
  }
}

checkDatabase();

// import { DB } from "https://deno.land/x/sqlite/mod.ts";

// const db = new DB("localdb/users.db");

// db.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id TEXT PRIMARY KEY,
//     data TEXT
//   )
// `);

// export function addRecord(id: string, data: any) {
//   const dataString = JSON.stringify(data);
//   db.query("INSERT OR REPLACE INTO users (id, data) VALUES (?, ?)", [id, dataString]);
// }

// export function getRecord(id: string) {
//   const result = db.query("SELECT data FROM users WHERE id = ?", [id]);
//   if (result.length > 0) {
//     const [data] = result[0];
//     return JSON.parse(data as string);
//   }
//   return null;
// }

// export function closeDB() {
//   db.close();
// }

