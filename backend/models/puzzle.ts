const puzzle = (sequelize: any, DataTypes: any) => {
  return sequelize.define(
    'puzzle',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      keyword: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      visit_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.STRING(500),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'puzzle',
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
      ],
    },
  );
};

export default puzzle;
