import { SQLite3Connector, Database } from "./deps.ts";
import { User } from "./models/user.ts";

const connector = new SQLite3Connector({
  filepath: "./database.sqlite",
});

const db = new Database(connector);

db.link([User]);
await db.sync();

export { db };
