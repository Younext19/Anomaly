'use strict';
const {
    Model
} = require('sequelize');
const roles = require("../role/roles");
const bcrypt = require("bcrypt");
const Op = require("sequelize/lib/operators");
module.exports = (sequelize, DataTypes) => {
    class Maintainer extends Model {
        get role() {
            return roles.MAINTAINER
        }

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Maintainer.init({
        username: {
            type: DataTypes.STRING, allowNull: false, unique: {
                args: true, msg: "Le nom d'utilisateur existe déja"
            }, validate: {
                notEmpty: {
                    args: true, msg: "Le nom d'utilisateur ne doit pas être vide"
                }
            }

        }, password: {
            type: DataTypes.STRING, allowNull: false, validate: {
                notEmpty: {
                    args: true, msg: "Le mot de passe ne doit pas être vide"
                }
            }
        }, full_name: {
            type: DataTypes.STRING, allowNull: false, validate: {
                notEmpty: {
                    args: true, msg: "Le nom du responsable ne doit pas être vide"
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeDestroy: async (user) => {
                const ids = (await sequelize.models.MaintainerResource.findAll(
                    {
                        attributes: [["resource_id", "id"]],
                        where: {maintainer_id: user.id},
                    }
                )).map(a => a.toJSON()).map(o => o.id)
                await sequelize.models.Resource.destroy({where: {id: {[Op.in]: ids}}})
            }
        },
        sequelize, modelName: 'Maintainer', timestamps: false
    });
    return Maintainer;
};