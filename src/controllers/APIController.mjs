import {Location, Maintainer, MaintainerResource, Resource} from "../connection/db.mjs";

export default class APIController {

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async getResources(req, res) {
        const resources = (await Resource.findAll()).map(r => r.get())
        res.json(resources)
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async getLocations(req, res) {
        const locations = (await Location.findAll()).map(l => l.toJSON())
        res.json(locations)
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async addResource(req, res) {
        try {
            const maintainer_id = req.user.id
            const name = req.body["name"]
            const description = req.body["description"]
            const resource = Resource.build({name, description})
            await resource.validate()
            await resource.save()
            await MaintainerResource.create({maintainer_id, resource_id: resource.id})
            res.json(resource.toJSON())
        } catch (e) {
            res.status(500)
            const message = this.formatErrors(e.errors)
            res.json({message})
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async addLocation(req, res) {
        try {
            const name = req.body["name"]
            const location = Location.build({name})
            await location.validate()
            await location.save()
            res.json(location.toJSON())
        } catch (e) {
            res.status(500)
            const message = this.formatErrors(e.errors)
            res.json({message})
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async addMaintainer(req, res) {
        try {
            const username = req.body["username"]
            const password = req.body["password"]
            const full_name = req.body["full_name"]
            const maintainer = Maintainer.build({username, password, full_name})
            await maintainer.validate()
            await maintainer.save()
            res.json(maintainer.toJSON())
        } catch (e) {
            res.status(500)
            const message = this.formatErrors(e.errors)
            res.json({message})
        }
    }

    /**
     *
     * @param req {Request}
     * @param res {Response}
     * @return {void}
     */
    static async deleteMaintainer(req, res) {
        try {
            const maintainer_id = req.params["id"]
            const id = await Maintainer.destroy({
                where: {id: maintainer_id}, individualHooks: true
                })
            res.json({id})
        } catch (e) {
            res.status(500)
            const message = this.formatErrors(e.errors)
            res.json({message})
        }

    }

    static formatErrors(errors) {
        return errors.map(e => e.message).join("; ")
    }
}