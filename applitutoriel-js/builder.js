var path = require("path");

module.exports = {
    type: "application",
    authorizedPrerelease: "true",



    gulpTasks: function (gulp, project, conf, helper) {
        //Add task if needed
        /*gulp.beforeTask("compile", function () {
         helper.info("Exemple before compile task");
         });

         gulp.afterTask("compile", function () {
         helper.info("Exemple after compile task");
         });*/

        // Cas PARTICULIER de l'application tuto pour pouvoir la générer en mode SPA et ISOMORPHIC sur la PIC
        // => on force la tâche prepare-package:spa tout le temps
        // si mode fullSpa : on redéfini les tâches 'watch' & 'watch-prod' pour y inclure la tâche "prepare-package-spa"
        //gulp.task("watch", ["compile", "prepare-package:spa", "watch:client"]);
        //gulp.task("watch-prod", ["compile", "prepare-package:spa", "watch:client-prod"]);
        gulp.addTaskDependency("package-zip-static", "prepare-package:spa");
        // conf.template.messages = require("applitutoriel-js-common/src/resources/messages.json")
        conf.template.forEach((elt, idx) => {
            if (conf.template[idx].context.forEach) {
                conf.template[idx].context.forEach((elt, idx2) => {
                    conf.template[idx].context[idx2].messages = {
                        "applicationTitle": "Application TUTORIEL"
                    };
                });
            } else {
                conf.template[idx].context.messages = {
                    "applicationTitle": "Application TUTORIEL"
                };
            }
        });

    },
    externalModules: {
        enabled: false,
        directories: []
    },
    config: {
        routesDirs: ["." + path.sep + "routes"],

        // Exemple d'exclusion de fichiers/répertoires local à l'application et de modules
        // Cet exemple n'est pas forcement cohérent puisque le client.js n'est pas dépendant des middlewares
        // Il est là à titre d'exemple uniquement

        clientExclude: {
            dirs: [
                path.join("src", "services", "data"),
                path.join("applitutoriel-js-common", "src", "resources", "mock"),
                path.join("applitutoriel-js-common", "src", "mock"),
                "src/middleware",
                "nodemailer",
                "applitutoriel-js-common/src/actions"
            ],
            filters: [
                path.join("src", "services", "data") + "/.*-data-\.*",
                ".*/src/actions/.*",
                "^config/*"
            ],
            modules: [
                "config",
                "continuation-local-storage",
                "carbone",
                "pdfmake",
                "pdfmake/src/printer",
                "pdfkit",
                "nodemailer",
                "fontkit",
                "tls",
                "child_process"
            ]
        },
        /*typescript: {
            bin: __dirname + "/node_modules/build/typescript"
        },*/
        template: [{
            context: [{
                error: "404",
                suffixe: "_404",
                message: "Oops! Nous ne trouvons pas ce que vous cherchez!"
            }, {
                error: "500",
                suffixe: "_500",
                message: "Oops! Une erreur est survenue!"
            },
            {
                error: "403",
                suffixe: "_403",
                message: "Oops! Accès interdit !"
            }
            ],
            dir: "./template/error",
            dest: "/error"
        }, {
            context: {
                message: "test template"
            }
        }],
        spaResources: [path.join("..", "applitutoriel-js-common", "src", "resources") + "**/*.json"]
    }
};