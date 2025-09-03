const userModel =(sequelize,DataTypes) =>{
    const User = sequelize.define("user",{
        id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      timestamp :true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [7, 15],
      },
    },
    role: {
      type: DataTypes.ENUM("Author", "admin"),
      defaultValue: "Author",
      allowNull: false,
    },
  })
  return User
   
}
module.exports = userModel;