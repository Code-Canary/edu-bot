const request = require('request');

let mustache_regex = /{{\s*([^}]+)\s*}}/g;

let placeholderCharacter = '█';

const out = './generated';

const getPlaceholders = template => template.match(mustache_regex) || [];

const fillTheBlanks = (template, placeholders) =>
    Object.keys(placeholders).reduce((template, key) => {
        const value = placeholders[key];
        return template.replace(key, value);
    }, template);

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
    return new Promise(resolve => {
        request.post({ url: 'https://hcti.io/v1/image', form: data }).
            auth('cbff0965-5a63-4fbd-88dd-a829115494bc',
                '57df2efb-388e-442e-b2a5-5cffca850772').
            on('data', resolve);
    }).then(JSON.parse);
};

module.exports = {
    codeAsImage,
    getPlaceholders,
    fillTheBlanks,
};

