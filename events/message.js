

const { SlashCommandBuilder } = require('@discordjs/builders'); 
const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
var request = require('request');


`
curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{"model": "text-davinci-002", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 6}'`

async function getResponse(text) {
    const options = {
        headers: {'content-type' : 'application/json', 'Authorization': 'Bearer ' + apikey, 'OpenAI-Organization': OrganizationID},
        url:     url,
        body:    JSON.stringify({
          "model": "text-davinci-002", 
          "prompt": text, 
          "temperature": 0, 
          "max_tokens": 15
        })
      };
  
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
  }


module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (!message.content.startsWith(';') || message.author.bot)
			return;
		console.log(`Message from ${message.author.tag} in #${message.channel.name} : ${message.content}`);

        var body = await getResponse(message.content.substring(1));
        body =  JSON.parse(body)
        var responseText = await body["choices"][0]["text"];
        message.reply(responseText);
	},
};



  

  