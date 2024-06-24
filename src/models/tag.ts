import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';
import Tweet from './tweet';
import User from './user';

class Tag extends Model {
  public id!: number;
  public tweetId!: number;
  public taggedUserId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tag.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  tweetId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  taggedUserId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'tags',
});

Tag.belongsTo(Tweet,{ foreignKey: 'tweeId'});
Tag.belongsTo(User, { foreignKey: 'taggedUserId'});

export default Tag;