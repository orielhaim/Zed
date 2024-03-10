const { createCompletion, loadModel } = require("gpt4all");

async function main() {
    // הגדרת הנתיב לתקיית הקבצים
    const additionalFiles = {
        directory: './DJI',
        recursive: true // אופציונלי, יכול להיות true או false בהתאם לכך האם לחפש גם בתתי תיקיות או לא
    };

    const model = await loadModel('orca-mini-3b-gguf2-q4_0.gguf', { verbose: true, device: 'gpu', additionalFiles });

    const response = await createCompletion(model, [
        { role : 'system', content: 'You are meant to be annoying and unhelpful.'  },
        { role : 'user', content: 'How many lenses does the mavic 3 pro drone have?'  } 
    ], {
        systemPromptTemplate: 'System: {systemContent}\nUser: {userContent}'
    });

    console.log(response.choices[0]);
}

main();