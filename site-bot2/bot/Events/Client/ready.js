const mongoose = require("mongoose");
const config = require("../../../config.json");
require('colors');

module.exports = {
    name: "ready",
    once: true,

    async execute(interaction, client) {
        mongoose.set('strictQuery', false)
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect)
            console.log('[MONGODB]'.green, 'Database connected');

        console.log(`${client.user.username} is online in ${client.guilds.cache.size} servers`);
    }
}