import {Anomaly, Location, Resource} from "../connection/db.mjs";

export default class HomeController {
    /**
     *
     * @param request {Request}
     * @param response {Response}
     * @return {void}
     */
    static async view(request, response) {
        const resources = await Resource.findAll()
        const locations = await Location.findAll()
        const messages = (await Anomaly.findAll(
            {
                attributes: [
                    [Resource.sequelize.fn(
                        "DISTINCT",
                        Resource.sequelize.col("message")
                    ), "message"]
                ]
            }
        )).map(an => an.message)
        const resourceId = resources.find(r=> r.id=== parseInt(request.query["resource"]))?.id
        const locationId = locations.find(l=> l.id === parseInt(request.query["location"]) )?.id
        const resourceList = resources.map(
            resource => resource.id === resourceId ?
                Object.assign(resource.get(),{selected:true}) : resource.get()
        )
        const locationList = locations.map(
            location => location.id === locationId ?
                Object.assign(location.get(),{selected:true}) : location.get()
        )

        response.render("home", {resources: resourceList, locations: locationList, messages})
    }
}