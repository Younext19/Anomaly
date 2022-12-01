import {Anomaly, MaintainerResource} from "../connection/db.mjs";

export default class AnomalyController {
    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static async addTicket(req, res) {
        const anomalyData = {
            message: req.body["anomaly"],
            resource_id: req.body["resource"],
            location_id: req.body["location"]
        }
        try {
            const anomaly = Anomaly.build(anomalyData)
            await anomaly.validate()
            await anomaly.save()
            res.render("success")
        } catch (e) {
            res.redirect(`/?resource=${anomalyData.resource_id}&location=${anomalyData.location_id}`)
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     */
    static async closeTicket(req, res) {
        const id = parseInt(req.params.id)
        const anomaly = await Anomaly.findByPk(id)
        if (anomaly) {
            const maintainerId = (await MaintainerResource.findOne({
                attributes: ["maintainer_id"],
                where: {resource_id: anomaly.resource_id}
            }))?.maintainer_id
            if (req.user.id === maintainerId) {
                anomaly.resolved = true
                await anomaly.update(["resolved"])
                await anomaly.save()
                res.json(anomaly.toJSON())
            } else
                res.status(403)
                    .json({message: "Modification non authorisée"})

        } else {
            res.status(404).json({message: `Anomalie [${id}] n'existe pas`})
        }
    }
}