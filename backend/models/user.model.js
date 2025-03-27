import mongoose, { Schema } from "mongoose";

const userShema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: [3, " first name conatin atleast 3 charachter"],
  },

  lastName: {
    type: String,
    required: true,
    minlength: [3, " first name conatin atleast 3 charachter"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must contain 5 character"],
  },

  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
});

userShema.method.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {expiresIn : '24h'}
  );

  return token;
};

userShema.method.comparePassword = async function (password) {
  return await bycript.comparePassword(password, this.password);
};

userShema.static.hashPassword = async function () {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user',User)

module.export = userModel;