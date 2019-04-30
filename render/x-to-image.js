const request = require('request');

const fs = require('fs');
const path = require('path');


let mustache_regex = /{{\s*([^}]+)\s*}}/g;

let placeholderCharacter = '█';

const out = './generated';

const getPlaceholders = template => template.match(mustache_regex) || [];

const fillTheBlanks = (template, placeholders) =>
    Object.keys(placeholders).reduce((template, key) => {
        const value = placeholders[key];
        return template.replace(key, value);
    }, template);

// https://stackoverflow.com/a/7616484/1066356
const hashCode = str => {
    var hash = 0,
        i,
        chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const imagePath = code => {
    const filename = `${hashCode(code)}.png`;
    return path.join(out, filename);
};

const saveImage = code => image => {
    return fs.writeFileSync(imagePath(code), image);
};

const codeAsImage = code => {
    const placeholders = getPlaceholders(code).reduce((placeholders, key) => {
        placeholders[key.trim()] = key.split('').
            map(_ => placeholderCharacter).
            join('');
        return placeholders;
    }, {});
    const imageInput = fillTheBlanks(code, placeholders);

    console.log(imageInput);

    const data = {
        html: imageInput,
        css: '.box { border: 4px solid #03B875; padding: 20px; font-family: \'Roboto\'; }',
        google_fonts: 'Roboto',
    };

    // Create an image by sending a POST to the API.
    // Retrieve your api_id and api_key from the Dashboard. https://htmlcsstoimage.com/dashboard
    return new Promise(resolve =>{
        request.post({ url: 'https://hcti.io/v1/image', form: data })
        .auth('cbff0965-5a63-4fbd-88dd-a829115494bc', '57df2efb-388e-442e-b2a5-5cffca850772')
        .on('data', resolve);
    }).then(JSON.parse)
};

module.exports = {
    codeAsImage,
    getPlaceholders,
    fillTheBlanks,
    imagePath,
};

