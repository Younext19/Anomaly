import passport from "passport";
import {Strategy} from "passport-local"
import dotenv from "dotenv"
import roles from "../role/roles.js";
import {Maintainer} from "../connection/db.mjs";
import bcrypt from "bcrypt";
dotenv.config()
// Admin Data Object
const admin = {
        id : 0,
        username : process.env.ADMIN_USERNAME,
        password : process.env.ADMIN_PASSWORD,
        role: roles.ADMIN
    }
// Defines login strategy
passport.use(new Strategy(
    async function(username, password, done) {
        const user = admin.username===username ? admin : (await getMaintainer({
            where:{username}
        }))?.toJSON()
        if(!user){
            return done(null, false, { message: "Le nom d'utilisateur saisie est incorrecte !!" });
        }
        const isCorrectPassword = user.role === roles.ADMIN ? user.password === password:
            await bcrypt.compare(password, user.password)

        if(isCorrectPassword){
            return done(null,user);
        } else {
            return done(null, false,{ message: 'Le mot de passe saisie est incorrecte !!' });
        }
    }));

// Add User id to the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Get User data from session
passport.deserializeUser(async function(id, done) {
    const user = admin.id===id ? admin : (await getMaintainerByPK(id))?.toJSON()
    if(user){
        done(null, user);
    }
    else done(new Error("id don't match"),null)
});

/**
 *
 * @param options {Object}
 * @return {Promise<Maintainer | null>}
 */
async function getMaintainer(options){
        const maintainer = await Maintainer.findOne(options)
        if(maintainer) maintainer.get().role = roles.MAINTAINER
        return maintainer
}

/**
 *
 * @param id {number}
 * @return {Promise<Maintainer | null>}
 */
async function getMaintainerByPK(id){
    const maintainer = await Maintainer.findByPk(id)
    if(maintainer) maintainer.get().role = roles.MAINTAINER
    return maintainer
}