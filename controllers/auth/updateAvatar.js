const User = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tmpDir, originalname } = req.file;
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;
    const image = await Jimp.read(tmpDir);
    await image.resize(250, 250);
    const resultDir = path.join(avatarsDir, newName);
    await image.write(resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    await fs.unlink(tmpDir);
    res.json({ avatarURL });
  } catch (error) {
    const { path: tmpDir } = req.file;
    await fs.unlink(tmpDir);
    next(error);
  }
};

module.exports = updateAvatar;
