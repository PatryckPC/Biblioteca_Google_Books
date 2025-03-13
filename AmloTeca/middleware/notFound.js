/* A donde manda si insertas una url desconocida */
module.exports = (req, res, next) => {
    return res.status(404).json({code: 404, message: "URL no encontrada"});
}