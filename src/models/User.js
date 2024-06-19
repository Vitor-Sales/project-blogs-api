const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrmente: true },
        displayName: {
            type: DataTypes.STRING,
            field: 'display_name',
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        image: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'users',
    });

    return User;
};

module.exports = UserModel;