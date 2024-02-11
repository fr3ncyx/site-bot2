module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {;
                return interaction.reply({ content: "Outdated command! Please check in later."})
            }
            command.execute(interaction, client);
        }
    }
}