/**
 * Copyright ou © ou Copr. Ministère de l'Europe et des Affaires étrangères (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * Ce logiciel est un programme informatique servant à faciliter la création
 * d'applications Web conformément aux référentiels généraux français : RGI, RGS et RGAA
 * <p/>
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 * <p/>
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 * <p/>
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 * <p/>
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 * <p/>
 * <p/>
 * Copyright or © or Copr. Ministry for Europe and Foreign Affairs (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * This software is a computer program whose purpose is to facilitate creation of
 * web application in accordance with french general repositories : RGI, RGS and RGAA.
 * <p/>
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 * <p/>
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 * <p/>
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 * <p/>
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 *
 */

/**
 * applitutoriel-js - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */

// L'import de hornet-js-utils doit être fait le plus tôt possible
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import * as fs from "fs";
import { AppliI18nLoader } from "applitutoriel-js-common/src/i18n/app-i18n-loader";
import { ServerConfiguration } from "hornet-js-core/src/server-conf";
import * as HornetServer from "hornet-js-core/src/server";
import { HornetApp } from "applitutoriel-js-common/src/views/layouts/hornet-app";
import { HornetLayout } from "applitutoriel-js-common/src/views/layouts/hornet-layout";
import { ErrorPage } from "hornet-js-react-components/src/widget/component/error-page";
import { Routes } from "src/routes/routes";
import {
    PageRenderingMiddleware,
    UnmanagedViewErrorMiddleware
} from "hornet-js-react-components/src/middleware/component-middleware";
import * as HornetMiddlewares from "hornet-js-core/src/middleware/middlewares";

// Authent passport
import { PassportAuthentication } from "hornet-js-passport/src/passport-authentication";
import { AuthenticationtConfiguration } from "hornet-js-passport/src/authentication-configuration";
// Saml
import { SamlConfiguration } from "hornet-js-passport/src/strategy/saml/saml-configuration";
import { SamlStrategy } from "hornet-js-passport/src/strategy/saml/saml-strategy";

import { HornetMiddlewareList } from "hornet-js-core/src/middleware/middlewares";

const Menu = require("applitutoriel-js-common/src/resources/navigation.json");
import "src/injector-context-services-data";
import "src/injector-context-services-page";
import { FeaturePageRenderingMiddleware } from "applitutoriel-js-common/src/middleware/featuresflipping";
import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";

import { Injector } from "hornet-js-core/src/inject/injector";

async function initContext() {
    await import("src/injector-context-services-data");
    await import("src/injector-context-services-page");
    return await import("applitutoriel-js-common/src/middleware/authentication-api");
}

let AuthenticationAPIMiddleware;

const logger: Logger = Logger.getLogger("applitutoriel.server");

export class Server {

    static configure(): ServerConfiguration {

        let configServer: ServerConfiguration = {
            serverDir: __dirname,
            staticPath: "../static",
            appComponent: HornetApp,
            layoutComponent: HornetLayout,
            errorComponent: ErrorPage,
            defaultRoutesClass: new Routes(),
            sessionStore: null, // new RedisStore({host: "localhost",port: 6379,db: 2,pass: "RedisPASS"}),
            routesLoaderPaths: [ "src/routes/" ],
            /*Directement un flux JSON >>internationalization:require("./i18n/messages-fr-FR.json"),*/
            /*Sans utiliser le système clé/valeur>> internationalization:null,*/
            internationalization: new AppliI18nLoader(),
            menuConfig: (<any>Menu).menu,
            loginUrl: Utils.config.get("authentication.loginUrl"),
            logoutUrl: Utils.config.get("authentication.logoutUrl"),
            welcomePageUrl: Utils.config.get("welcomePage"),
            publicZones: [
                Utils.config.get("welcomePage")
            ]
        };

        const key = Utils.config.getOrDefault("server.https.key", false);
        const cert = Utils.config.getOrDefault("server.https.cert", false);
        if (key && cert) {
            configServer.httpsOptions = {
                key: fs.readFileSync(key, "utf8"),
                cert: fs.readFileSync(cert, "utf8"),
                passphrase: Utils.config.get("server.https.passphrase")
            };
        }
        return configServer;
    }

    static middleware(): HornetMiddlewareList {
        let hornetMiddlewareList = new HornetMiddlewares.HornetMiddlewareList()
            .addAfter(PageRenderingMiddleware, HornetMiddlewares.UserAccessSecurityMiddleware)
            .addAfter(FeaturePageRenderingMiddleware, HornetMiddlewares.MenuConfigMiddleware);


        if (Utils.config.getOrDefault("authentication.saml.enabled", false)) {

            let configAuth = new AuthenticationtConfiguration(
                Utils.config.get("authentication.loginUrl"),
                Utils.config.get("authentication.logoutUrl")
            );

            let authent = new PassportAuthentication(configAuth);
            let configuration = new SamlConfiguration(
                Utils.config.get("authentication.saml.configuration.callbackUrl"),
                Utils.config.get("authentication.saml.configuration.logoutCallbackUrl"),
                // Page de retour par défaut
                Utils.config.get("authentication.saml.configuration.hostUrlReturnTo"),
                // Usually specified as `/shibboleth` from site root
                Utils.config.get("authentication.saml.configuration.issuer"),
                // Certificat applicatif
                (fs.readFileSync(Utils.config.get("authentication.saml.configuration.cert"), "utf8") as any).toString("ascii"),
                // Clé privée de décryptage
                (fs.readFileSync(Utils.config.get("authentication.saml.configuration.key"), "utf8") as any).toString("ascii"),
                Utils.config.get("authentication.saml.configuration.idp"),true, (user, done) => {

                    let profilsTmp = [];
                    if (user.Profil) {
                        profilsTmp = user.Profil.replace('[', "").replace(']', "").replace(/ /gi, "").split(";");
                    }
                    
                    let roles = [];
                    profilsTmp.map((role) => {
                        roles.push({name: role});
                    });
                    
                    user.name = user.Login;
                    user.roles = roles;

                    let api: AuthService = Injector.getRegistered(AuthService);

                    api.generateToken({
                        username: user.name,
                        roles: roles
                    }).then(() => {
                        return done(null, user);
                    }
                    );

                }

            );
            configuration.signatureAlgorithm = "sha256";
            authent.initStrategy(new SamlStrategy(configuration));

            hornetMiddlewareList.addAfter(authent.getMiddleware(), HornetMiddlewares.ChangeI18nLocaleMiddleware);
        } else {
            hornetMiddlewareList.addAfter(AuthenticationAPIMiddleware, HornetMiddlewares.ChangeI18nLocaleMiddleware);
        }
        return hornetMiddlewareList;
    }

    static startApplication() {
        initContext().then(
            (AuthenticationAPI) => {
                AuthenticationAPIMiddleware = AuthenticationAPI.AuthenticationAPIMiddleware;
                let server = new HornetServer.Server(Server.configure(), Server.middleware());
                server.start();
            }
        );
    }
}