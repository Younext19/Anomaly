export default class ExceptionController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static page404(req,res){
        res.status(404).render("404");
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static page403(req,res){
        res.status(403).render("403");
    }
}