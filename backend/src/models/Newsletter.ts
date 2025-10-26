// import { Sequelize, DataTypes, Model } from "sequelize";
// import sequelize from "../config/database";

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







import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define attributes with optional fields for creation
interface NewsletterAttributes {
  id: number;
  email: string;
  createdAt: Date;
}

interface NewsletterCreationAttributes extends Optional<NewsletterAttributes, 'id' | 'createdAt'> {}

class Newsletter extends Model<NewsletterAttributes, NewsletterCreationAttributes> implements NewsletterAttributes {
  public id!: number;
  public email!: string;
  public createdAt!: Date;
}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "newsletter",
    timestamps: false, // We have createdAt manually
  }
);

export default Newsletter;