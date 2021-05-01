const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if (!oken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        })
    }
}

module.exports = {
    validarJWT
}