var wholePrompt = `first, get a random character
second, gives a quiz about the character and you guess the character

<character : captain America>

Anna: He has a weapon

You: thor?

Anna: No, He wears a mask

You: batman?

Anna: No, He is a superhero

You: Captain America

Anna: Correct!

<character : Forest Gump>

Anna: 

He is from the south

You: ?

Anna: He has a disability

You: ?

Anna: He was in the Vietnam War

You: Forest Gump?

Anna: Correct!

<character :`

const url = 'https://api.openai.com/v1/completions'

const { apikey, OrganizationID} = require('../config.json');
var request = require('request');

async function getResponseAboutQuiz() {
    text = wholePrompt;
    const options = {
        headers: {'content-type' : 'application/json', 'Authorization': 'Bearer ' + apikey, 'OpenAI-Organization': OrganizationID},
        url:     url,
        body:    JSON.stringify({
          "model": "text-davinci-002", 
          "prompt": text, 
          "temperature": 0.7, 
          "max_tokens": 30,
          "top_p" : 1,
          "frequency_penalty" : 0,
          "presence_penalty" : 0,
          "stop" : ["You:"],
        })
      };
  
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
            body = JSON.parse(body)
            var responseText = body["choices"][0]["text"];
            
            resolve(responseText);
        }
      })
    })
  }

module.exports = {
    getResponseAboutQuiz,
}