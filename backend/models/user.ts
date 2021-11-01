export default function(sequelize:any, DataTypes:any) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(500),
      allowNull: false,
      primaryKey: true
    },
    complete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    upload: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
          { name: "id" },
        ]
      },
    ]
  });
};
