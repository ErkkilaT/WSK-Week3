import sharp from 'sharp';
//forgot to branch so branchin now so teacher can see
const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  await sharp(req.file.path)
    .resize(160, 160)
    .toFormat('png')
    .toFile(`${req.file.path}_thumb`);
  next();
};

export {createThumbnail};
