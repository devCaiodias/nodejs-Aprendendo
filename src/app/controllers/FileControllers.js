class FilesControllers {
    async create (req, res) {
        return res.json({ response: "ok" });
    }
}

export default new FilesControllers();