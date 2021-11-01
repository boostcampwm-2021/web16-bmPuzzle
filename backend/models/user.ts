export default (sequelize:any, DataTypes:any) => {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    puzzle_complete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
    },
    puzzle_upload: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
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