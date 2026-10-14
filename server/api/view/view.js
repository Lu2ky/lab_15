function toClient(book) {
    return {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
    };
}
function toClientList(books) {
    return books.map(toClient);
}
function errorBody(message) {
    return {
        message: message,
    };
}
