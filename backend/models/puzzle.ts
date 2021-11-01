const puzzle = (sequelize:any, DataTypes:any) => {
  return sequelize.define('puzzle', {
    puzzle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    keyword: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    public: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    visit_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'puzzle',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "puzzle_id" },
        ]
      },
      {
        name: "user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};

export default puzzle;