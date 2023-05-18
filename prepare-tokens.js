const {existsSync, mkdirSync, writeFileSync} = require('fs');
const tokensJson = require(__dirname + '/figma-tokens/tokens.json');
const baseDir = `./packages/themes/src`;

if (!existsSync(baseDir)) {
    mkdirSync(baseDir)
}

const themes = Object.keys(tokensJson.color).map((t) => t.replace('dark', '').replace('light', ''));
const uniqThemes = [...new Set(themes)];

for (const theme of uniqThemes) {
    const dir = `${baseDir}/${theme}`;

    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    generatePresets({color: tokensJson.color, shadow: tokensJson.shadow})

    writeFileSync(`${dir}/presets.json`, JSON.stringify({themes: tokensJson.color, shadow: tokensJson.shadow}, null, 2));

    if (tokensJson.typography && tokensJson.spacing && tokensJson.radius) {
        writeFileSync(`${baseDir}/global.tokens.json`, JSON.stringify({
            font: tokensJson.typography, spacing: tokensJson.spacing, radius: tokensJson.radius
        }, null, 2))
    }
}

function generatePresets(json) {
    for (let k in json) {
        // eslint-disable-next-line no-prototype-builtins
        if (json[k]?.hasOwnProperty('type')) {

            if (json[k].type === 'color') {
                json[k] = json[k]['value']
            }

            if (json[k].type === 'custom-shadow') {
                const {offsetX, offsetY, radius, spread, color} = json[k].value;
                json[k] = `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
            }
        }

        if (k === 'chart') {
            delete json[k]
        }

        if (typeof json[k] === 'object' && json[k] !== null) {
            generatePresets(json[k])
        }
    }
}