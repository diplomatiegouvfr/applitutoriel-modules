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
import * as React from "react";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { NavigationUtils } from "hornet-js-components/src/utils/navigation-utils";
import * as fs from "fs";
import * as path from "path";

const logger: Logger = Logger.getLogger("applitutoriel.views.layouts.hornet-layout");

const styleLoader: any = ".loader-page:before {display: block;position: absolute;content: '';left: -12.5em;width: 12.5em;height: 0.25em;background-color: #00d468;animation: loadingPage 2s linear infinite;}@keyframes loadingPage {from {left: -12.5em; width: 30%;}50% {width: 30%;}70% {width: 70%;}80% { left: 50%;}95% {left: 120%;}to {left: 100%;}}";

export interface HornetLayoutProps extends HornetComponentProps {
    content: string;
    state: any;
    appLogo: string;
    appTheme: string;
    fwkTheme: string;
    appStatic: string;
    applicationLoading: string;
    nojavascript: boolean;
    applicationTitle: string;
}

/**
 * Layout de l'application
 */
export class HornetLayout extends HornetPage<any, HornetLayoutProps, any> {

    static defaultProps = {
        appLogo: "/img/logoHornet.png",
        appTheme: "/css/theme.css",
        fwkTheme: process.env.NODE_ENV === "production" ? "/css/theme-min.css" : "/css/theme.css",
        appStatic: "/js/client.js",
        appStaticDll: "/js/dll",
        nojavascript: false,
        applicationTitle: "",
    };

    constructor(props: HornetLayoutProps, context?: any) {
        super(props, context);

        const currentUrl = Utils.getCls("hornet.routePath");
        const applicationTitle = this.i18n(NavigationUtils.retrievePageTextKey(NavigationUtils.getConfigMenu(), currentUrl))
            + " | " + this.i18n("applicationTitle");
        this.state = { ...this.state, applicationTitle };

    }

    prepareClient() {
    }

    private getLoadingText(): string {
        return this.state.applicationLoading || this.i18n("applicationLoading");
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW HornetLayout render");
        const loaderStyle: React.CSSProperties = {
            width: "100%",
            position: "absolute",
            overflow: "hidden",
            backgroundColor: "#eee",
            height: "0.25em",
            top: "6em",
            zIndex: 9999,
        };


        const loadingOverlayStyle: React.CSSProperties = {
            background: "black",
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0.1,
            zIndex: 9999,
        };

        try {

            const compatible = "<!--[if IE]> <meta http-equiv=\"X-UA-Compatible\" content=\"edge\" /> <![endif]-->";
            let configMock = Utils.config.get("mock");

            if (!configMock || !configMock.enable) {
                configMock = Utils.config.getOrDefault("mock", {
                    enabled: false, sevicePage: { enabled: false },
                    seviceData: { enabled: false },
                });
            }
            return (
                <html dir="ltr" lang={Utils.getCls("hornet.internationalization").locale}>
                    <head>
                        <meta name="viewport"
                            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />
                        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <link rel="icon" type="image/png" href={this.genUrlStatic(this.state.appLogo)} />
                        <title>{this.state.applicationTitle}</title>
                         <link rel="stylesheet" type="text/css" href={HornetLayout.genUrlTheme(this.state.fwkTheme)} />
                        <link rel="stylesheet" type="text/css" href={this.genUrlStatic(this.state.appTheme)} />
                    </head>
                    <body>
                        {
                            !this.state.nojavascript ?
                                <div id="firstLoadingSpinner">
                                    <style dangerouslySetInnerHTML={{ __html: styleLoader }} />
                                    <div style={loadingOverlayStyle} />
                                    <div style={loaderStyle} className="loader-page" />
                                </div>
                                : null
                        }
                        <div id="app" dangerouslySetInnerHTML={{ __html: this.state.content }} />
                        <script dangerouslySetInnerHTML={{ __html: (this.state.state || "").toString() }} />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `window.Config["mock"] = ` + JSON.stringify(configMock) + `; window.Config["env"] = "` + process.env.NODE_ENV + `"`,
                            }}
                        />
                        {process.env.NODE_ENV !== "production" ? this.renderScriptVendor() : null}

                        {this.renderScript()}
                    </body>
                </html>
            );
        } catch (e) {
            logger.error("Render hornet-layout exception", e);
            throw e;
        }
    }

    private renderScript(): JSX.Element {
        logger.debug("VIEW HornetLayout renderScript");
        if (!this.state.nojavascript) {
            return (<script src={this.genUrlStatic(this.state.appStatic)}></script>);
        }
        return null;
    }


    private renderScriptVendor(): Array<JSX.Element> {

        logger.debug("VIEW HornetLayout renderScript DLL");

        const dlls = [];
        if (!this.state.nojavascript) {

            const dllDirectory = path.join(path.dirname(require.main.filename), "static", this.state.appStaticDll);

            if (fs.existsSync(dllDirectory)) {

                const listFiles = fs.readdirSync(dllDirectory);
                listFiles.reverse().forEach((file, idx) => {
                    if (path.extname(file) === ".js" && path.basename(file).match(/^dll_/)) {
                        dlls.push(<script
                            src={this.genUrlStatic(path.join(this.state.appStaticDll, path.basename(file)))}
                            key={"dll-" + idx}></script>);
                    }
                });
            }
        }
        return dlls;
    }
}
