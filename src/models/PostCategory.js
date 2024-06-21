const PostCategoryModel = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'post_id',
            onUpdatae: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
                model: 'blog_posts',
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id',
            onUpdatae: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
                model: 'categories',
                key: 'id',
            },
        }
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        })
    }

    return PostCategory;
}

module.exports = PostCategoryModel;