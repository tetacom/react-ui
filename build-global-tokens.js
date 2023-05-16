const StyleDictionary = require("style-dictionary");
const getStyleDictionaryBaseConfig = () => {
    return {
        log: "warn",
        source: [`./packages/themes/src/global.tokens.json`],
        platforms: {
            css: {
                transformGroup: "custom/css",
                buildPath: "packages/themes/src/",
                files: [
                    {
                        destination: "global.tokens.css",
                        format: "css/variables",
                        selector: ":root",
                    },
                ],
            },
        },
    };
};


StyleDictionary.registerFormat({
    name: "css/variables",
    formatter: function (dictionary, config) {
        return `${this.selector} {
      ${dictionary.allProperties
            .map((prop) => `  --${prop.name}: ${prop.value};`)
            .join("\n")}
    }`;
    },
});


StyleDictionary.registerTransform({
    name: "css/radius",
    type: "value",
    matcher: function (prop) {
        return prop.attributes.category === "radius";
    },
    transformer: (token) => {
        const { topLeft } = token.original.value;
        return `${topLeft}px`;
    },
});

StyleDictionary.registerTransform({
    name: "css/spacing",
    type: "value",
    matcher: function (prop) {
        return prop.attributes.category === "spacing";
    },
    transformer: (token) => {
        const { right } = token.original.value;
        return `${right}px`;
    },
});

StyleDictionary.registerTransformGroup({
    name: "custom/css",
    transforms: StyleDictionary.transformGroup["css"].concat([
        "css/radius",
        "css/spacing",
    ]),
});

const StyleDictionaryBase = StyleDictionary.extend(
    getStyleDictionaryBaseConfig()
);

StyleDictionaryBase.buildAllPlatforms();
