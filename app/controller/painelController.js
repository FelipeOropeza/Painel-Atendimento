class PainelController{
    static loginEmpresa(req, res){
        res.render('index');
    }

    static cadastroEmpresa(req, res){
        res.render('formEmpresa')
    }

    static insertEmpresa(req, res){
        console.log(req.body);
    }
}

export default PainelController;