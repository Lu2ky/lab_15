export async function getBooks(res) {
    try {
        const books = await repo.findAll();
        const data = toClient(books);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No se pudo leer el catálogo" });
    }
}
export async function postBooks(req, res) {
    if (!req.body.title && !req.body.author && !req.body.author) {
        console.error("Error: payload incompleto," + req.body);
        res.status(400).json({ error: "Body invalido" });
    }
    try {
        respuesta = await repo.create(req.body);
        data = toClient({ respuesta });
        res.status(201).json({ respuesta });
    } catch (error) {
        res.status(501).json({ error: "POST /books no implementado" });
    }
}
export async function patchBooks(req, res) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "id invalido" });
        }

        const libro = await repo.update(id, req.body);

        if (libro === null) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el libro: " + error.message,
        });
    }
}
export async function deleteBooks(req, res) {
    try {
        const deleted = await repo.remove(Number(req.params.id));
        if (deleted) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: "Libro no encontrado" });
        }
    } catch (error) {
        res.status(501).json({ error: "DELETE /books/:id no implementado" });
    }
}
