var multer = require('multer');
var caminhoImagens = './web/uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, caminhoImagens)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file');

exports.upload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    })
}
