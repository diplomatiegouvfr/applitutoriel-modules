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
import { Class } from "hornet-js-utils/src/typescript-utils";
import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Spinner } from "hornet-js-react-components/src/widget/spinner/spinner";
import { HeaderPage } from "hornet-js-react-components/src/widget/header/header-page";
import { FooterPage } from "hornet-js-react-components/src/widget/footer/footer-page";
import { HornetContent } from "hornet-js-react-components/src/widget/component/hornet-content";
import { User } from "hornet-js-react-components/src/widget/user/user";
import { Menu } from "hornet-js-react-components/src/widget/navigation/menu";
import { LayoutSwitcher } from "hornet-js-react-components/src/widget/screen/layout-switcher";
import { ChangeLanguage } from "hornet-js-react-components/src/widget/language/change-language";
import { Dropdown, Position } from "hornet-js-react-components/src/widget/dropdown/dropdown";
import * as ChangeLanguageService from "hornet-js-core/src/services/default/change-language";
import { NavigationUtils } from "hornet-js-components/src/utils/navigation-utils";
import { NotificationSessionFooter } from "hornet-js-react-components/src/widget/notification/notification-session-footer";
import { SessionIdpExpireNotification } from "hornet-js-react-components/src/widget/notification/notification-session-idp";
import { MenuAccessibilite } from "hornet-js-react-components/src/widget/navigation/menu-accessibilite";


import * as _ from "lodash";
import * as classNames from "classnames";
import { UPDATE_PAGE_EXPAND } from "hornet-js-react-components/src/widget/screen/layout-switcher";

const logger: Logger = Logger.getLogger("applitutoriel.views.layouts.hornet-app");

const users = {
    "user":
        {
            "name": "user",
            "roles": [ { "id": 2, "name": "APPLI_TUTO_USER" } ]
        }, "admin":
        {
            "name": "admin",
            "roles": [ { "id": 1, "name": "APPLI_TUTO_ADMIN" }, { "id": 2, name: "APPLI_TUTO_USER" } ]
        }
};

export interface HornetAppProps extends HornetPageProps, HornetComponentProps {
    componentContext: any;
    context: any;
    relativeLogoUrl: string;
    content: Class<HornetPage<any, any, any>>;
    headerTitleUrl: string;
}

export class HornetApp extends HornetPage<any, HornetAppProps, any> {

    layoutSwitcher: any;
    menu: Menu;
    layoutSwitcherSticky: any;

    static defaultProps = {
        composantPage: null,
        workingZoneWidth: "1200px",
        logoUrl: Utils.buildStaticPath("/img/logoHornet.png"),
        headerTitleUrl: "http://intranet.diplomatie.gouv.fr/"
    };

    constructor(props: HornetAppProps, context?: any) {
        super(props, context);
        this.service = new ChangeLanguageService.ChangeLanguage();
        this.listenUrlChangeEvent();
        this.listen(UPDATE_PAGE_EXPAND, (ev) => {
            this.layoutSwitcher.setState({ modeFullscreen: !ev.detail });
            this.layoutSwitcherSticky.setState({ modeFullscreen: !ev.detail });
        })
    }


    componentDidMount() {
        super.componentDidMount();
        this.listenUpdatePageExpandEvent();
        if (this.state.error && this.state.error.hasBeenReported) {
            (this.state as any).error = undefined;
        } else if (this.state.error) {
            (this.state as any).error.hasBeenReported = true;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.error && nextState.error.hasBeenReported) {
            nextState.error = undefined;
        }
    }

    prepareClient() {

    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW HornetApp render");

        const title = _.concat(this.i18n("header").logoTitle, this.state.applicationTitle).join(" ");

        const classes: any = {
            "mode-fullscreen": this.state.modeFullscreen
        };

        const messIntl = this.i18n("header");

        const applicationTitle = this.i18n("applicationTitle");

        const lienAide = (this.state.linkHelpVisible) ?
            <li><a title={messIntl.help + applicationTitle} href={this.genUrl("/aide")}>{messIntl.help}</a></li>
            : null;
        const lang = <ChangeLanguage handleChangeLanguage={this.handleChangeLanguage} position={Position.BOTTOMRIGHT} />;
        const user = Utils.config.getOrDefault("fullSpa.enabled", false) && Utils.config.getOrDefault("mock.enabled", false) ? <Dropdown
            items={[ { label: "as Admin", action: this.changeUserTo, valueCurrent: "admin", className: "link" },
            { label: "As User", action: this.changeUserTo, valueCurrent: "user", className: "link" } ]}
            title={"mock users"}
            icon="picto-user"
            className="profil-content"
            id={"dropdown-user-mock" + "-drop"}
            label={(Utils.getCls("hornet.user") && Utils.getCls("hornet.user").name) ? Utils.getCls("hornet.user").name : "Connexion"}
            labelClassName={"profil-label"}
            position={Position.BOTTOMRIGHT}
        /> : <User />;
        const langBanner = <ChangeLanguage id="Change-Language-banner" handleChangeLanguage={this.handleChangeLanguage} position={Position.BOTTOMRIGHT} />;
        const userBanner = Utils.config.getOrDefault("fullSpa.enabled", false) && Utils.config.getOrDefault("mock.enabled", false) ? <Dropdown
            items={[ { label: "as Admin", action: this.changeUserTo, valueCurrent: "admin", className: "link" },
            { label: "As User", action: this.changeUserTo, valueCurrent: "user", className: "link" } ]}
            title={"mock users"}
            icon="picto-user"
            className="profil-content"
            id={"dropdown-user-banner-mock" + "-drop"}
            label={"Users"}
            labelClassName={"profil-label"}
            position={Position.BOTTOMRIGHT}
        /> : <User id="user-banner" />;

        // todo add to banner
        const wrappedUserLang = (
            <div className="userlang fr full-height">
                {userBanner}
                {langBanner}
                <LayoutSwitcher ref={(ref) => {
                    this.layoutSwitcherSticky = ref
                }} />
            </div>
        );

        const sessionIdpExpireNotification = Utils.getCls("hornet.user") && Utils.getCls("hornet.user")["SessionNotOnOrAfter"] ?
        <SessionIdpExpireNotification expireIn={60} expireInDate={Utils.getCls("hornet.user")["SessionNotOnOrAfter"] - new Date(Utils.getCls("currenDate")).getTime()} />
        : null;

        return (
            <div id="site" className={classNames(classes)}>
                <HeaderPage scrollHeight={35}>
                    <div id="header">
                        <MenuAccessibilite />
                        <div id="header-expanded-zone" className={"inside " + this.state.classNameExpanded}
                            style={{ maxWidth: this.state.currentWorkingZoneWidth }}>
                            <div className="fl full-height">
                                <a className="header-link"
                                    title={this.i18n("application.headerTitleText")}
                                    href={this.state.headerTitleUrl}>{this.i18n("application.headerTitle")}</a>
                            </div>
                            <div className="fr full-height user" style={{ display: "inline-flex" }}>
                                {user}
                                {lang}
                                <LayoutSwitcher ref={(ref) => {
                                    this.layoutSwitcher = ref
                                }} />
                            </div>
                        </div>
                    </div>
                    <div id="banner">
                        <div id="banner-expanded-zone"
                            className={"inside " + this.state.classNameExpanded}
                            style={{ maxWidth: this.state.currentWorkingZoneWidth }}>
                            <div className="fl menu-main-conteneur ">
                                <Menu showIconInfo={true} workingZoneWidth={this.state.currentWorkingZoneWidth}
                                    var={(menu: any) => {
                                        return this.menu = menu;
                                    }} />
                            </div>
                            <div className="fl mls">
                                <a className="sub-header-link"
                                    href={this.genUrl(Utils.config.getOrDefault("welcomePage", "/"))} title={title}
                                    id="img-logo">
                                    <img src={this.state.logoUrl} alt={this.i18n("applicationTitleAlt")} />
                                </a>
                            </div>
                            <div className="fl mls">
                                <a className="sub-header-link"
                                    href={this.genUrl(Utils.config.getOrDefault("welcomePage", "/"))} title={title}>
                                    <h1 id="app-title">{this.i18n("applicationTitle")}</h1>
                                </a>
                            </div>
                            {wrappedUserLang}
                        </div>
                        <Spinner />
                    </div>
                </HeaderPage>
                <HornetContent content={this.state.content} workingZoneWidth={this.state.workingZoneWidth}
                    error={this.state.error} />
                <NotificationSessionFooter />
                    {sessionIdpExpireNotification}
                <FooterPage workingZoneWidth={this.state.currentWorkingZoneWidth}>
                    <div className="fl mll">
                        <ul className="footer-links">
                            <li>
                                <a href={this.genUrl("/planAppli")}
                                    title={messIntl.planTitle + applicationTitle}>{messIntl.plan}</a>
                            </li>
                            <li>
                                <a href={this.genUrl("/politiqueAccessibilite")}
                                    title={messIntl.accessTitle + applicationTitle}>{messIntl.access}</a>
                            </li>
                            <li><a href={this.genUrl("/contact")}
                                title={messIntl.contactTitle + applicationTitle}>{messIntl.contact}</a>
                            </li>
                            {lienAide}
                        </ul>
                    </div>
                    <div className="fr mrl">
                        <p>{applicationTitle + " - v" + Utils.appSharedProps.get("appVersion")}</p>
                    </div>
                </FooterPage>
            </div>
        );
    }

    /**
     * Méthode permettant de passer en mode plein écran
     */
    onClickLinkFullscreen() {
        this.setState({
            modeFullscreen: !this.state.modeFullscreen,
        });
    }

    /**
     * Méthode permettant de changer de langue
     * @param i18nLocale
     */
    private handleChangeLanguage(i18nLocale: string) {

        this.service.changeLanguage({ hornetI18n: i18nLocale }).then((retourApi) => {
            logger.trace("Retour service changeLanguage :", retourApi.body);
            Utils.setCls("hornet.internationalization", retourApi.body);
            window.location.reload();
        });
    }

    /**
     * Méthode permettant de réveiller le serveur node afin de ne pas perdre la session
     * @param i18nLocale
     */
    private handleWakeUpNode(i18nLocale: string) {

        this.service.changeLanguage({ hornetI18n: i18nLocale }).then((retourApi) => {
            logger.trace("Retour API PartenaireApi.rechercher :", retourApi.body);
            Utils.setCls("hornet.internationalization", retourApi.body);
            window.location.reload();
        });
    }

    /**
     *
     * @param value valeur sélectionnée dans la liste des users mocké
     */
    private changeUserTo(value) {
        Utils.setCls("hornet.user", users[ value ]);
        this.navigateTo("accueil", {}, () => {
            this.forceUpdate();
            this.menu.forceUpdate();
            this.menu.setState({ items: this.menu.props.configMenu ? NavigationUtils.getFilteredConfigNavigation(_.cloneDeep(this.menu.props.configMenu), this.user) : NavigationUtils.getFilteredConfigNavigation(NavigationUtils.getConfigMenu(), Utils.getCls("hornet.user")) });

        });
    }
}
