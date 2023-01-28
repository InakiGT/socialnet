class Errors {
    errorHandler(err, req, res, next) {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }

    boomErrorHandler(err, req, res, next) {
        if(err.isBoom) {
            const { output } = err;
            res.statu(output.statusCode).json(output.payload);
        } else {
            next(err);
        }
    }


}

module.exports = Errors;