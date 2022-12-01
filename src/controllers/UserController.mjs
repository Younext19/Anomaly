import {Anomaly, Maintainer, MaintainerResource, Resource} from "../connection/db.mjs";
import Op from "sequelize/lib/operators";
import QRCode from 'qrcode';

export default class UserController {


    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static loginForm(req, res) {
        res.render("login")
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static login(req, res) {
        res.redirect('/dashboard');
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static logout(req, res) {
        req.logout();
        res.redirect('/login');
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static async showDashBoard(req, res) {
        if (req.user.role === "Admin") {
            const maintainers = (await Maintainer.findAll()).map(m => m.get())
            res.render("dashboard_admin", {maintainers})
            return;
        }
        const ids = (await MaintainerResource.findAll(
            {
                attributes: [["resource_id", "id"]],
                where: {maintainer_id: req.user.id},
            }
        )).map(a => a.toJSON()).map(o => o.id)
        const anomalies = (await Anomaly.findAll(
            {
                attributes: ["id", "message", "resolved"],
                include: ["resource", "location"],
                where: {
                    resource_id: {
                        [Op.in]: ids
                    },
                    resolved: false
                }
            }
        )).map(a => a.toJSON())
        res.render("dashboard_maintainer", {anomalies})

    }

    static async generateQRCode(req, res) {
        const rData = req.body?.data || null
        const t = rData === null ? [] : Array.isArray(rData) ? rData : [rData]
        const resources = await Resource.findAll()
        const host = req.headers.host
        const base = `http://${host}/?resource=`
        const rs = await Promise.all(t.map(i => base + i).map(async (text) => {
            const url = await QRCode.toDataURL(text, {errorCorrectionLevel: 'H'})
            return {text, url}
        }))
        const middle = Math.round(rs.length / 2)
        const rs1 = rs.slice(0, middle)
        const rs2 = rs.slice(middle, rs.length)
        const data = rs1.map((e, i) => [e, rs2[i] || {}])
        const resourceList = resources.map(resource => resource.get())

        res.render("qrcode", {data, resourceList})
    }
}