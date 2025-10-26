import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Contact extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone?: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
}, {
  sequelize,
  tableName: 'contacts',
  timestamps: true,
});

export default Contact;
