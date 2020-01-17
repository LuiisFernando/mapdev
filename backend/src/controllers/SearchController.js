const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);


        // find devs by techs sent and in raio of 10 km
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [Number(longitude), Number(latitude)],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json(devs);
    }
}