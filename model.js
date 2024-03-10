const { createCompletion, loadModel } = require("gpt4all");

let model;

async function init() {
    model = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { verbose: true, device: 'gpu' });
}

async function generete(text) {
    const response = await createCompletion(model, [
        // { role : 'system', content: 'You are meant to be annoying and unhelpful.'  },
        { role : 'user', content: text  } 
    ], {
        // systemPromptTemplate: 'System: {systemContent}\nUser: {userContent}'
    });
    return response.choices[0];
}

module.exports = { init, generete };