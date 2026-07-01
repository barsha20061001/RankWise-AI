const { spawn } = require("child_process");

exports.searchCandidates = (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({
            message: "Query is required"
        });
    }

    const python = spawn("python", [
        "../ai/search_api.py",
        query
    ]);

    let data = "";
    let error = "";

    python.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    python.stderr.on("data", (chunk) => {
        error += chunk.toString();
    });

    python.on("close", (code) => {

        if (code !== 0) {
            return res.status(500).json({
                error
            });
        }

        try {

            const results = JSON.parse(data);

            res.json(results);

        } catch {

            res.status(500).json({
                message: "Invalid Python response"
            });

        }

    });

};