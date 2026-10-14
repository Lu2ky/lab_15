const { pool } = require("../connection/db");

function mapBook(row) {
    return {
        id: row.id,
        title: row.title,
        author: row.author,
        price: Number(row.price),
    };
}

async function findAll() {
    const [rows] = await pool.execute(
        "SELECT id, title, author, price FROM books ORDER BY id ASC",
    );
    return rows.map(mapBook);
}

async function findById(id) {
    const [rows] = await pool.execute(
        "SELECT id, title, author, price FROM books WHERE id = ?",
        [id],
    );
    if (rows.length === 0) {
        return null;
    }
    return mapBook(rows[0]);
}

async function create({ title, author, price }) {
    try {
        const data = await pool.execute(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [title, author, price],
        );
        const res = data[0].insertId;
        return await findById(res);
    } catch (error) {
        throw new Error("Ocurrio un error: " + error);
    }
}
async function update(id, partial) {
    const campos = [];
    const valores = [];
    let i = 1;
    if (partial.title !== undefined) {
        campos.push("title = ?");
        valores.push(partial.title);
    }
    if (partial.author !== undefined) {
        campos.push("author = ?");
        valores.push(partial.author);
    }
    if (partial.price !== undefined) {
        campos.push("price = ?");
        valores.push(partial.price);
    }
    if (campos.length === 0) {
        return null;
    }
    valores.push(id);
    try {
        const [result] = await pool.execute(
            `UPDATE books SET ${campos.join(", ")} WHERE id = ?`,
            valores,
        );
        if (result.affectedRows === 0) {
            return null;
        }
        return await findById(id);
    } catch (error) {
        throw new Error("update no implementado");
    }
}

async function remove(id) {
    try {
        const data = await pool.execute("DELETE FROM books WHERE id = ?", [id]);
        if (data[0].affectedRows === 0) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        throw new Error("Ocurrio un error: " + error);
    }
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
