module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false },
        userId: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
                model: 'users',
                key:'id',
            },
            },
        published: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW,
        },
        updated: { 
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        }
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'blog_posts',
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: 'userId', as: 'user',
        });
    };

    return BlogPost;
}
