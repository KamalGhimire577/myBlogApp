const categories = (Sequelize,DataTypes)=>{
  const categoryTable = Sequelize.define("category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return categoryTable
}
module.exports = categories