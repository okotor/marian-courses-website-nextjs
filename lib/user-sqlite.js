import db from "@/init-auth-db";

export function createUser(email,password) {
    const result = db
    .prepare('INSERT INTO users (email,password) VALUES (?, ?)')
    .run(email, password);
    return result.lastInsertRowid;
}
