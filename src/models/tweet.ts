import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import User from './user';

class Tweet extends Model {
  public id!: number;
  public userId!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tweet.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  content: {
    type: new DataTypes.STRING(280),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'tweets',
});

Tweet.belongsTo(User, { foreignKey: 'userId' });

export default Tweet;
