export default (sequelize:any, DataTypes:any) => {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    puzzle_complete: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puzzle_upload: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};