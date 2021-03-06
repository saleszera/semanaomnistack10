const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update(request, response){

        const {techs, bio} = request.body;
        const techsArray = parseStringAsArray(techs);

        const updateDev = await Dev.findByIdAndUpdate(request.params.id, {techsArray, bio}, { new:true });
        return response.json(updateDev);
    },

    async destroy(request, response){

        await Dev.findByIdAndDelete(request.params.id);
        return response.json(request.params);
    },

    async store(request, response){

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = apiResponse.data;
    
            //console.log(name, avatar_url, bio, github_username);
            
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates:[longitude, latitude],
            };
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //filtrar as conexões que estão a no maximo 10km de distancia e que o novo dev possua pelomenos uma das
            //tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }

        return response.json(dev);
    }
}
