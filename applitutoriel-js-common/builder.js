module.exports = {
    type: "module",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {
        var path = require("path");

        // chemin vers le fichier "definition.d.ts" généré
        conf.generatedTypings.dir = path.join("..", project.name + "-dts");
        conf.generatedTypings.file = project.name + ".d.ts";
    },
    externalModules: {
        enabled: false,
        directories: []
    },
    config: {
        autoGenerateIndex: true
        /*typescript: {
            bin: __dirname + "/node_modules/build/typescript"
        }*/
    }

};
