const done_puzzle = (sequelize:any, DataTypes:any) => {
  return sequelize.define('done_puzzle', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    puzzle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'puzzle',
        key: 'puzzle_id'
      }
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'done_puzzle',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "puzzle_id",
        using: "BTREE",
        fields: [
          { name: "puzzle_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

export default done_puzzle;
