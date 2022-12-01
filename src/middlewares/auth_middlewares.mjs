// Services
import "../security/PassportSecurity.mjs"
import passport from "passport";
import ExceptionController from "../controllers/ExceptionController.mjs";

function authenticate(req,res,next){
    return passport.authenticate('local', function(err, user, info) {
        /*if (err) {
            next();
        }*/
        if (!user) {
            res.render("login",{info,username:req?.body["username"]});
        }
        else
        req.logIn(user, function(err) {
            //if (err) { next(err); }
            next();
        });
    })(req,res,next)
}
/**
 *
 * @param roles {string[]|string}
 * @return {Function}
 */
function ensureAuthenticatedWithRoles(roles) {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            if (
                typeof roles == "string" && roles === req.user.role ||
                Array.isArray(roles) && roles.includes(req.user.role)
            )
                next();
            else {
                ExceptionController.page403(req,res)
            }

        } else {
            res.redirect('/login');
        }
    }
}

function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}

export {ensureNotAuthenticated,ensureAuthenticatedWithRoles,authenticate}