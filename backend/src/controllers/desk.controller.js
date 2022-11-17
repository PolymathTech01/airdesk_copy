/* eslint-disable prettier/prettier */
const { Desk } = require('../models');
const cloudinary = require('../utils/cloudinary');
const crypto = require('crypto');

// const randomString = crypto.randomBytes(3).toString('hex');
// deskId = randomString.toUpperCase();
// console.log('i got here.................');
const generateDeskIdAndCollectDeskData = async (req, res) => {
  const randomString = crypto.randomBytes(3).toString('hex');
  const deskId = randomString.toUpperCase();
  const { deskData, images } = req.body;
  try {
    const generatedDeskIdAndSaveData = await Desk.create({ deskId, deskData });
    const requested_id = generatedDeskIdAndSaveData.dataValues.deskId;

    let promises = [];
    images.forEach(async (image) => {
      promises.push(
        cloudinary.uploader.upload(image, {
          folder: 'Airdesk-Images',
        })
      );
    });
    const response = await Promise.all(promises);
    const public_ids = response.map((image) => image.public_id);
    await Desk.create({ image: public_ids });

    res.status(201).send({
      status: true,
      message:
        'Desk id successfully generated and data successfully saved into the database',
      data: requested_id,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

const getMessagebyId = async (req, res) => {
  const { deskId } = req.params;
  try {
    const deskData = await Desk.findOne({ where: { deskId } });
    if (deskData) {
      res.status(200).send({
        status: true,
        message: 'Desk data successfully retrieved',
        data: deskData.dataValues.deskData,
      });
    } else {
      res.status(404).send({
        status: false,
        message: 'Desk data not found',
      });
    }
  } catch (error) {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { generateDeskIdAndCollectDeskData, getMessagebyId };
