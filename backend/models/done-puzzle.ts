export default function (sequelize: any, DataTypes: any) {
  return sequelize.define(
    'done_puzzle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(500),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      puzzle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'puzzle',
          key: 'id',
        },
      },
      time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'done_puzzle',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
        {
          name: 'puzzle_id',
          using: 'BTREE',
          fields: [{ name: 'puzzle_id' }],
        },
      ],
    },
  );
}
