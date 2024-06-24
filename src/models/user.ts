import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
