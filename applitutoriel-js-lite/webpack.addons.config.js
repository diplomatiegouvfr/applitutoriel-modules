
const clientContext = [
    [/moment[\/\\]locale$/, /fr|en/],
    [/intl[\/\\]locale-data[\/\\]jsonp$/, /((fr)|(en))$/],
    [/^\.$/, (context) => {
        if (!/\/log4js\/lib$/.test(context.context)) return;
        context.regExp = /^\.\/appenders\/console.*$/;
        context.request = ".";
    }]
];

const dev = {
    dllEntry: {
        vendor: ["hornet-js-react-components", "hornet-js-components", "hornet-js-utils", "hornet-js-core"]
    }
}

module.exports = (project, conf, helper, webpackConfigPart, configuration) => {
    const projectPlugins = [...webpackConfigPart.addContextReplacement(clientContext).plugins];
    if (helper.isDevMode()) {
        conf.dev = dev;
        const dllReference =  webpackConfigPart.addDllReferencePlugins(project, "static", "js", "dll");
        if(dllReference && dllReference.plugins) {
            projectPlugins.push(...dllReference.plugins);
        }
    }
    return {
        ...configuration,
        plugins: [...configuration.plugins, ...projectPlugins]
    }

}
