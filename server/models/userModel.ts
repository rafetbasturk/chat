import { Schema, Model, model, HydratedDocument, Types } from "mongoose";
import { UnAuthenticatedError } from "../errors";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../../types";

interface IUserMethods {
  createJWT(): string;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  login(
    email: string,
    password: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const schema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [4, "Minimum password length is 4 characters."],
      select: false,
    },
    confirm: {
      type: String,
      required: [true, "Please provide a password confirm."],
      validate: {
        // this only works on CREATE and SAVE!!!
        validator: function (this: IUser, el: string) {
          return el === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    lastname: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  // Only run this function if password is modified
  if (this.isModified("password")) {
    // salt and hash the password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // delete the passwordConfirm field
    this.set("confirm", undefined);
  }

  next();
});

schema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email }).select("+password");
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      user.set("password", undefined);
      return user;
    }
  }

  throw new UnAuthenticatedError("Invalid credentials!");
};

schema.method("createJWT", function createJWT() {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.JWT_LIFETIME }
  );
});

export default model<IUser, UserModel>("User", schema);
