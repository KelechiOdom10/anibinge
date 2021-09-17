import bcrypt from "bcrypt";
import prisma from "../../lib/db";
import { registerSchema, validation } from "../../utils/validator";
import { AvatarGenerator } from "random-avatar-generator";
import { NextApiRequest, NextApiResponse } from "next";

const generator = new AvatarGenerator();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { username, email, password } = req.body;
    const image = generator.generateRandomAvatar();

    //error validation
    const { errors } = await validation(registerSchema, req.body);
    if (errors) {
      const message = errors[0];
      res.status(400).json({ status: "error", message });
      return;
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        res.status(400).json({
          status: "error",
          message: "User already exists. Please create a new account!",
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          name: username,
          email,
          password: hashPassword,
          image,
        },
      });

      res.status(201).json({
        status: "success",
        message: "Account successfully created!",
      });
    } catch (error) {
      res.status(401).json({
        status: "error",
      });
    }
  }
};

export default handler;
