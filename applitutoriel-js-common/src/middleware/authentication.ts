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
 * applitutoriel-js-common - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";

const sha1 = require("sha1");
const flash = require("connect-flash");

import {Request, Application } from "express";
import * as ReactDOMServer from "react-dom/server";
import passport = require("passport");
import { Strategy } from "passport-local";
import * as _ from "lodash";
import { ConnexionPage } from "src/views/gen/gen-cnx-page";
import { AbstractHornetMiddleware } from "hornet-js-core/src/middleware/middlewares";
import { AuthService } from "src/services/data/auth/auth-service";

export class AuthenticationMiddleware extends AbstractHornetMiddleware {

    private static logger: Logger = Logger.getLogger("applitutoriel.middleware.authentication");

    protected api: AuthService;

    public insertMiddleware(app: Application) {
        // init passport
        /**
         * Insertion de la stratégie login/mot de passe (= stratégie 'locale', voir doc passport)
         */
        passport.use(new Strategy(
            function (_api) {
                return function (username, password, done) {
                    AuthenticationMiddleware.logger.trace("Tentative d'authentification de l'utilisateur ", username);

                    let encodedPassword = sha1(password);
                    _api.auth({
                        login: username,
                        password: encodedPassword
                    }).then(
                        retourApi => {
                            AuthenticationMiddleware.logger.debug("Retour API utilisateur : ", retourApi);
                            done(null, retourApi);
                        }).catch(err => {
                            AuthenticationMiddleware.logger.warn("Retour en erreur:", err);
                            if (err.code == "ERR_AUTHENTICATION_FAILED") {
                                done(null, false, { message: "Votre identifiant ou votre mot de passe est incorrect" });
                            } else {
                                done(null, false, { message: "Une erreur technique est survenue : " + err.toString() });
                            }
                        }
                        );
                };
            }(this.api)
        ));
        passport.serializeUser(function (user, done) {
            // Pour l'applituto on sérialise tout l'objet plutot que juste son ID
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        // init middleware
        let loginUrl = Utils.appSharedProps.get("loginUrl");
        let logoutUrl = Utils.appSharedProps.get("logoutUrl");
        let welcomePageUrl = Utils.appSharedProps.get("welcomePageUrl");

        function ensureAuthenticated(req: Request, res, next) {
            if (req.isAuthenticated() || _.startsWith(req.originalUrl, loginUrl)) {
                return next();
            }
            req.getSession().setAttribute("previousUrl", Utils.buildContextPath(req.originalUrl));
            res.redirect(Utils.buildContextPath(loginUrl));
        }

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.post(loginUrl,
            passport.authenticate("local", { failureRedirect: Utils.buildContextPath(loginUrl), failureFlash: true }),
            function (req: Request, res, next) {
                AuthenticationMiddleware.logger.trace("Authentification ok, redirection vers la page d'accueil");
                let previousUrl = req.body.previousUrl || req.getSession().getAttribute("previousUrl") || Utils.buildContextPath(welcomePageUrl);
                res.redirect(previousUrl);
            }
        );
        app.all(loginUrl, function (req:Request, res) {
            let errors = req[ "flash" ]("error");
            if (errors.length > 0 && errors[ 0 ] === "Missing credentials") {
                errors = [ "Votre identifiant ou votre mot de passe est incorrect" ];
            }

            let props = {
                errorMessage: errors,
                previousUrl: null
            };

            // Cas d'un perte de connexion liée à un timeout
            if (req.query.previousUrl) {
                props.previousUrl = req.query.previousUrl;
            }

            // cas d'une perte de connexion liée à un timeout + F5
            if (req.getSession().getAttribute("previousUrl") && !props[ "previousUrl" ]) {
                props.previousUrl = req.getSession().getAttribute("previousUrl");
                req.getSession().removeAttribute("previousUrl");
            }

            let locales: Array<string> = req.acceptsLanguages();

            let htmlApp = ReactDOMServer.renderToStaticMarkup(new ConnexionPage(props).render());
            let docTypeHtml: string = "<!DOCTYPE html>";
            res.setHeader("x-is-login-page", "true");
            res.send(docTypeHtml + htmlApp);
        });
        app.get(logoutUrl, function (req: Request, res, next) {
            // notifie passport
            req.logout();
            // notifie le session-manager et redirige une fois la session détruite
            req.getSession().invalidate(() => {
                res.redirect(Utils.buildContextPath(welcomePageUrl));
            });
        });

        app.use(ensureAuthenticated);
    }
}
