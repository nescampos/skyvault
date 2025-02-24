const fs = require('fs');
const path = require('path');
//const crypto = require('crypto');

const apiKeyFilePath = path.join(__dirname, 'api_key.txt');

export function saveApiKey(apiKey:string) {
    fs.writeFileSync(apiKeyFilePath, apiKey, { encoding: 'utf8', flag: 'w' });
    console.log('API Key was added successfully!!');
}

export function getApiKey() {
    if (fs.existsSync(apiKeyFilePath)) {
      const apiKey = fs.readFileSync(apiKeyFilePath, { encoding: 'utf8' });
      return apiKey;
    } else {
      console.error('The API key configuration does not exist. Please execute the addKey method before this action');
      return null;
    }
}

export function cleanApiKey() {
    fs.unlinkSync(apiKeyFilePath);
    console.log('API Key was deleted successfully!!');
}

