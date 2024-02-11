const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("lkaskljas"),
    async execute(interaction) {
        interaction.reply({content: "sklalsju"})
    }
}