import dotenv from "dotenv"
import AnomalyModel from "../models/anomaly.js"
import LocationModel from "../models/location.js"
import MaintainerModel from "../models/maintainer.js"
import MaintainerResourceModel from "../models/maintainerresource.js"
import ResourceModel from "../models/resource.js";
import {Sequelize} from "sequelize";
import configs from '../../config/config.js';

dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configs[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Anomaly = AnomalyModel(sequelize, Sequelize.DataTypes)
const Location = LocationModel(sequelize, Sequelize.DataTypes)
const Maintainer = MaintainerModel(sequelize, Sequelize.DataTypes)
const Resource = ResourceModel(sequelize, Sequelize.DataTypes)
const MaintainerResource = MaintainerResourceModel(sequelize, Sequelize.DataTypes)
const db = {
    Anomaly,
    Location,
    Maintainer,
    Resource,
    MaintainerResource
}
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
export  {
    Anomaly,
    Location,
    Maintainer,
    Resource,
    MaintainerResource
}