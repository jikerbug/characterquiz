

const { SlashCommandBuilder } = require('@discordjs/builders'); 
var { getResponseAboutQuiz } = require('../functions/quiz');


module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (!message.content.startsWith(';') || message.author.bot)
			return;
		console.log(`Message from ${message.author.tag} in #${message.channel.name} : ${message.content}`);
    var body = await getResponseAboutQuiz(message.content.substring(1));
    body =  JSON.parse(body)
    var responseText = await body["choices"][0]["text"];
    console.log(responseText)
    message.reply(responseText);
    responseText += '\n';
    wholePrompt += responseText;
    console.log(wholePrompt)
	},
};



  

  