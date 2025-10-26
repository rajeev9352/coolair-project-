"use strict";
// import { Sequelize, DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// interface NewsletterAttributes {
//   id: number;
//   email: string;
//   createdAt: Date;
// }
// class Newsletter extends Model<NewsletterAttributes> implements NewsletterAttributes {
//   public id!: number;
//   public email!: string;
//   public createdAt!: Date;
// }
// Newsletter.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       unique: true,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     tableName: "newsletter",
//     timestamps: false, // We have createdAt manually
//   }
// );
// export default Newsletter;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Newsletter extends sequelize_1.Model {
}
Newsletter.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: "newsletter",
    timestamps: false, // We have createdAt manually
});
exports.default = Newsletter;
