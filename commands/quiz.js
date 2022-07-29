const { SlashCommandBuilder } = require('@discordjs/builders');
var { getResponseAboutQuiz, wholePrompt } = require('../functions/quiz');


// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = 'https://api.openai.com/v1/completions'
var request = require('request');


const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Replies with character guessing quiz')
                                    ,
  async execute(interaction) {
        // console.log(interaction.user.tag)
        var responseText = await getResponseAboutQuiz();
        console.log(responseText)


        interaction.reply(responseText);
   
  },
};




