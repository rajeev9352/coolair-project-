import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define attributes with optional fields for creation
interface BlogAttributes {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

interface BlogCreationAttributes extends Optional<BlogAttributes, 'id' | 'createdAt'> {}

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public createdAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "blogs",
    timestamps: false, // Manual createdAt
  }
);

export default Blog;