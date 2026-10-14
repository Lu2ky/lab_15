let books = [];

export async function getBooks() {
    const response = await fetch("http://localhost:80/books");
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("La respuesta no es un arreglo");
    }

    books = data;
    return books;
}

export function getBookById(id) {
    const numericId = Number(id);
    return books.find((book) => book.id === numericId);
}

export async function createBook({ title, author, price }) {
    const response = await fetch("http://localhost:80/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, price }),
    });
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
    return response.json();
}

export async function updateBook(id, partial) {
    const response = await fetch("http://localhost:80/books/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(partial),
    });
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
    return response.json();
}

export async function deleteBook(id) {
    const response = await fetch("http://localhost:80/books/" + id, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
}
