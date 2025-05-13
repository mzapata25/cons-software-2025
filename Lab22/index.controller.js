const log = console.log;

const multer = require("multer");

const path    = require('path');

const storage = multer.diskStorage({
    destination : function(req,file,callback){
        log("File destination:","./public"); // Log destination
        callback(null, "./public");
    },
    filename : function(req, file, callback){
        log("Uploaded file:",req.body); // Log receive from data
        return callback(null,file.originalname);
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || 
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ) {// Se usan archivos de tipo foto como ejemplo, pero MIME puede filtrar más archivos.
            callback(null, true);
    } else {
            callback(null, false);
    }
}


const upload = multer({storage: storage, fileFilter: fileFilter}).array("file", 1);


module.exports.upload_file = async (req,res) =>{
    log("Cargando el archivo");
    
    upload(req,res,function(err){
        if(err){
            console.error(err);
            return res.status(500).json({code:500,msg:"Error uploading file"})
        }
        if (!req.files || req.files.length === 0) { //Este condicional específicamente busca aquellos casos donde el archivo se pudo "subir", pero no fue aceptado, así se le informa al usuario de que no está el archivo en la carpeta.
            return res.status(500).json({ code:500, msg: "File type not allowed" });
        }
        log("Upload succesful:", req.files); //Log uploaded
        res.status(200).json({code:200,msg:"Ok"});
    })
}

const storage_private = multer.diskStorage({
    destination : function(req,file,callback){
        log("File destination:","./private"); // Log destination
        callback(null, "./private");
    },
    filename : function(req, file, callback){
        log("Uploaded file:",req.body); // Log receive from data
        return callback(null,file.originalname);
    }
})

const upload_private = multer({storage: storage_private}).array("file", 1);

module.exports.upload_file_private = async (req,res) =>{
    log("Cargando el archivo privado");
    
    upload_private(req,res,function(err){
        if(err){
            console.error(err);
            return res.status(500).json({code:500,msg:"Error uploading file"})
        }
        log("Upload succesful:", req.files); //Log uploaded
        res.status(200).json({code:200,msg:"Ok"});
    })
}

module.exports.get_private_file = async(req,res)=>{
    var fileName = req.params.file;
    res.sendFile(path.join(__dirname, "./private",fileName));
}