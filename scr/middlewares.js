import sharp from 'sharp';

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
