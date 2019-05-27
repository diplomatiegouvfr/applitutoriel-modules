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
import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import {
    NotificationManager,
    Notifications,
    NotificationType,
} from "hornet-js-core/src/notification/notification-manager";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { FieldSet } from "hornet-js-react-components/src/widget/form/fieldset";
import { RadiosField } from "hornet-js-react-components/src/widget/form/radios-field";
import { SelectField, SelectFieldProps } from "hornet-js-react-components/src/widget/form/select-field";
import { CheckBoxField } from "hornet-js-react-components/src/widget/form/checkbox-field";
import {
    CalendarField,
    CalendarFieldProps,
    CalendarFieldState,
} from "hornet-js-react-components/src/widget/form/calendar-field";
import { ParRpaValidateIsVipEndDate } from "src/views/par/par-rpa-validate-end-date";
import { ParRpaValidateSectorStartDate } from "src/views/par/par-rpa-validate-start-date";
import { MediaType, MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { PartenaireResult } from "src/services/type/par/par-types";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import * as _ from "lodash";
import { RecherchePartenaireService } from "src/services/page/par/par-rpa-service";
import { AuthUtils } from "hornet-js-utils/src/authentication-utils";
import { Roles } from "src/utils/roles";

import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { PartenaireRechercheParameter } from "src/services/type/par/par-rpa-prm";

import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { CheckColumn } from "hornet-js-react-components/src/widget/table/column/check-column";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { MenuActions } from "hornet-js-react-components/src/widget/table/menu-actions";
import { ActionButton, TypeAction } from "hornet-js-react-components/src/widget/table/action-button";
import { YesNoColumn } from "hornet-js-react-components/src/widget/table/column/yesno-column";
import { ToggleColumnsButton } from "hornet-js-react-components/src/widget/table/toggle-columns-button";
import { LineAfter } from "hornet-js-react-components/src/widget/table/line/line-after";

import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Footer } from "hornet-js-react-components/src/widget/table/footer";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { Picto } from "hornet-js-react-components/src/img/picto";
import { Pager, PaginationProps } from "hornet-js-react-components/src/widget/pager/pager";
import { ActionColumn } from "hornet-js-react-components/src/widget/table/column/action-column";
import { MoreInfoColumn } from "hornet-js-react-components/src/widget/table/column/more-info-column";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { DataSourceConfigPage } from "hornet-js-core/src/component/datasource/config/service/datasource-config-page";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { SortData } from "hornet-js-core/src/component/sort-data";

import * as schema from "src/views/par/par-rpa-validation.json";
import { timingSafeEqual } from 'crypto';

const logger: Logger = Logger.getLogger("applitutoriel.views.par.par-rpa-page");

/**
 * Page de recherche des partenaires. L'ajout ou la modification d'un partenaire se fait dans une fiche indépendante
 */
export class RecherchePartenairesPage extends HornetPage<RecherchePartenaireService, HornetPageProps, any> {

    private paginateDataSource: PaginateDataSource<any>;
    private dataSourceIsClient: DataSource<any>;

    private isTableVisible: boolean = false;

    private fromCreate;
    // Composants
    /** Tableau de liste de partenaires */
    private maTable: Table;

    /** Composant Liste déroulante des secteurs */
    private secteurSelect: SelectField<SelectFieldProps>;

    /** Composant CheckBox isVip */
    private checkBoxIsVip: CheckBoxField;

    radio: RadiosField;

    /** Liste permettant d'alimenter la liste déroulante des secteurs */
    private listeSecteurs = [{ nom: this.i18n("partenairesListePage.form.fields.criteres.idSecteur.tous") }];
    private dataSourceSecteurs: DataSource<any> = new DataSource([]);
    /** Formulaire de recherche */
    private formRecherche: Form;

    private criteresRecherche: any;

    private endDate: CalendarField<CalendarFieldProps, CalendarFieldState>;

    /** Valeurs par défaut du formulaire de recherche */
    private defaultValues = {
        criteres: {
            partenaire: {
                client: true
            },
            idSecteur: "",
            startDate: new Date("2015-03-25")
        }
    };

    /** Liste des types de client */
    private LISTE_IS_CLIENT: any[] = [
        {
            client: true,
            libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.client.clientLabel"),
        },
        {
            client: false,
            libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.client.fournisseurLabel"),
        }];

    /** Objet des critères initiaux (provenant du CLS ou de la session dans le cas d'un F5) */
    private currentCriteres: any;

    constructor(props?: HornetPageProps, context?: any) {
        super(props, context);

        this.paginateDataSource = this.initDataSource(props);
        this.dataSourceIsClient = new DataSource(this.LISTE_IS_CLIENT, { value: "client", label: "libelle" });
        this.state = {
            ...this.state, pagination: {
                pageIndex: 0,
                itemsPerPage: 10,
                totalItems: 0,
            } as PaginationProps,
        };

        /* Récupération des données provenant du CLS */
        let criteres;
        if (props.navigateData) {
            criteres = props.navigateData.criteres;
        }


        /* Valeurs par défaut du formulaire de recherche */
        this.currentCriteres = {
            partenaire: {
                vip: _.get(criteres, "partenaire.vip") != null ?
                    _.get(criteres, "partenaire.vip") : _.get(this.defaultValues, "criteres.partenaire.vip"),
            },
            idSecteur: (_.get(criteres, "idSecteur") != null) ?
                _.get(criteres, "idSecteur").toString() : _.get(this.defaultValues, "criteres.idSecteur"),
            startDate: _.get(criteres, "startDate") ?
                this.getDateFormatee(_.get(criteres, "startDate")) : _.get(this.defaultValues, "criteres.startDate"),
            endDate: _.get(criteres, "endDate") ?
                this.getDateFormatee(_.get(criteres, "endDate")) : _.get(this.defaultValues, "criteres.endDate"),
        };
        this.dataSourceSecteurs.on("add", () => {
            // Valorisation des champs du formulaire de recherche
            this.secteurSelect.setCurrentValue(this.currentCriteres.idSecteur);
        });
    }

    /**
     * Alimente le tableau de liste des partenaires
     * @override
     */
    prepareClient(): void {

        this.getService().listerSecteurs().then((secteurs) => {
            // Alimentation de la liste déroulante des secteurs
            this.dataSourceSecteurs.add(true, this.listeSecteurs.concat(secteurs));
        });

        this.formRecherche.updateFields({ criteres: this.currentCriteres });
        this.dataSourceIsClient.select(this.dataSourceIsClient.results[0]);
        if (this.currentCriteres.partenaire.vip) {
            this.checkBoxIsVip.setCurrentChecked(this.currentCriteres.partenaire.vip);
        }

        const formData: PartenaireRechercheParameter = { criteres: this.props.navigateData && this.props.navigateData.criteres };
        const forceReload: boolean = this.props.navigateData && this.props.navigateData.forceReload;
        if (formData.criteres && Object.keys(formData.criteres).length > 0) {
            this.maTable.setState({ isVisible: true }, () => {
                this.paginateDataSource.reload(true, forceReload);
            });
        }
        if (this.props.navigateData) {
            if (this.props.navigateData.create) {
                this.fromCreate = { create: this.props.navigateData.create };
            } else if (this.props.navigateData.previous) {
                this.fromCreate = { previous: this.props.navigateData.previous };
            }
        }

        this.paginateDataSource.on("loadingData", this.handleFocusOnLoading.bind(this));
    }

    handleFocusOnLoading(arg) {
        if (arg === false) {
            if (this.fromCreate) {
                if (this.fromCreate.create) {
                    this.fromCreate = null;
                    this.focusOnInfoNotificationButton();
                } else if (this.fromCreate.delete) {
                    this.handleFocusOnDelete();
                }
            } else {
                this.focusOnTableTitle();
            }
        }
    }

    focusPreviousButton() {
        if (this.fromCreate && this.fromCreate.previous) {
            const elem = document.getElementById(this.fromCreate.previous);
            if (elem && elem.focus) {
                elem.focus();
            } else {
                this.focusOnTableTitle();
            }
            this.fromCreate = null;
        }
    }

    focusOnInfoNotificationButton() {
        const elem = document.querySelector(".messageBox .info-button") as any;
        if (elem && elem.focus) {
            elem.focus();
        }
    }

    focusOnTableTitle() {
        const elem = document.querySelector(".datatable-title-span") as any;
        if (elem && elem.focus) {
            elem.focus();
        }
    }

    focusOnTableInfo() {
        const elem = document.getElementsByClassName("button-info-accessibilite-button button-action") as any;
        if (elem && elem[0].focus) {
            elem[0].focus();
        }
    }

    handleFocusOnDelete() {
        if (this.fromCreate && this.fromCreate.delete && this.fromCreate.delete.page !== 1) {
            this.focusOnTableTitle();
        } else if (this.fromCreate && this.fromCreate.delete && this.fromCreate.delete.id) {
            const elem = document.getElementById(this.fromCreate.delete.id) as any;
            if (elem) {
                elem.focus();
            } else {
                // Il y a moins de ligne qu'avant
                const split = this.fromCreate.delete.id.split("-");
                const line = split[4];
                const lineNumber = parseInt(line, 10);
                const precId = `liste-partenaires-0-colBody-${lineNumber - 1}-9`;
                const precElem = document.getElementById(precId) as any;
                if (precElem) {
                    precElem.focus();
                } else {
                    //il n'y a plus de ligne
                    this.focusOnTableTitle();
                }
            }
            this.fromCreate = null;
        } else {
            this.focusOnTableTitle();
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {

        logger.trace("RecherchePartenairesPage render");

        const intlTab: any = this.i18n("partenairesListePage.tableau");
        const isAdmin: boolean = this.isAdmin();

        const checkColumn = isAdmin ? <CheckColumn keyColumn="id" altSelect={intlTab.colonnes.checkTitle} altUnselect={intlTab.colonnes.uncheckTitle} /> : null;

        return (

            <div>
                <span>{this.attributes.forceSearch}</span>
                <h2>{this.i18n("partenairesListePage.form.titreFormulaire")}</h2>
                <Notification id="notifRpaPage" />
                {this.renderFormCriteres()}
                <Table ref={(table) => { this.maTable = table; }} id="liste-partenaires" isVisible={this.isTableVisible}
                >
                    <Header id={"monHeaderRPA"} title={this.i18n("partenairesListePage.tableau.tableTitle")}
                        showIconInfo={true}>
                        <ToggleColumnsButton hiddenColumns={{ organisme: true, prenom: true }} />
                        <MenuActions>
                            <ActionButton title={this.i18n("partenairesListePage.tableau.colonnes.exportCsv")}
                                label={this.i18n("partenairesListePage.tableau.colonnes.exportCsvLabel")}
                                srcImg={Picto.export.csv}
                                action={this.onExport.bind(this, MediaTypes.CSV)} />
                            <ActionButton title={this.i18n("partenairesListePage.tableau.colonnes.exportPdf")}
                                label={this.i18n("partenairesListePage.tableau.colonnes.exportPdfLabel")}
                                srcImg={Picto.export.pdf}
                                action={this.onExport.bind(this, MediaTypes.PDF)} />
                            <ActionButton title={this.i18n("partenairesListePage.tableau.colonnes.exportOdt")}
                                label={this.i18n("partenairesListePage.tableau.colonnes.exportOdtLabel")}
                                srcImg={Picto.export.odt}
                                action={this.onExport.bind(this, MediaTypes.ODT)} />
                            <ActionButton title={this.i18n("partenairesListePage.tableau.colonnes.exportOds")}
                                label={this.i18n("partenairesListePage.tableau.colonnes.exportOdsLabel")}
                                srcImg={Picto.export.ods}
                                action={this.onExport.bind(this, MediaTypes.ODS)} />
                            <ActionButton typeAction={TypeAction.ACTION_UNITAIRE} title={intlTab.colonnes.edition}
                                label={intlTab.colonnes.edition}
                                srcImg={Picto.black.editer}
                                visible={() => this.isAdmin()}
                                action={this.editerPartenaire} />
                            <ActionButton typeAction={TypeAction.ACTION_UNITAIRE} title={intlTab.colonnes.consultation}
                                label={intlTab.colonnes.consultation}
                                srcImg={Picto.black.consulter}
                                action={this.consulterPartenaire} />
                            <ActionButton typeAction={TypeAction.ACTION_MASSE}
                                priority={true}
                                label={intlTab.colonnes.suppression}
                                srcImg={Picto.white.supprimer}
                                action={this.supprimerEnMasse}
                                title={intlTab.massActionTitle}
                                messageAlert={intlTab.massActionConfirmMessage}
                                titleAlert={intlTab.massActionConfirmTitle}
                                visible={() => this.isAdmin()}
                                type="button" />

                        </MenuActions>
                    </Header>
                    <Content dataSource={this.paginateDataSource} summary={intlTab.summary} onRerender={this.focusPreviousButton}>
                        <Columns>

                            {checkColumn}
                            <Column titleCell={(value) => { return value.nom; }}
                                keyColumn="nom" title={intlTab.colonnes.nom} sortable={true} hiddenable={false} style={{ width: "5em" }} />
                            <Column keyColumn="prenom" title={intlTab.colonnes.prenom} sortable={true} />
                            <Column keyColumn="proCourriel" title={intlTab.colonnes.courriel} sortable={true} style={{ width: "13em" }} />
                            <Column keyColumn="organisme" title={intlTab.colonnes.organisme} sortable={false} style={{ background: "red" }} />
                            <YesNoColumn keyColumn="vip" title={intlTab.colonnes.labelIsVIP} sortable={true} />
                            <DateColumn keyColumn="dateModif" title={intlTab.colonnes.dateModif} sortable={true} />
                            <ActionColumn keyColumn="consulter"
                                alt={intlTab.colonnes.consultationTitle}
                                srcImg={Picto.blue.consulter}
                                action={this.consulterPartenaire}
                                visible={this.isVisible}
                            />
                            <ActionColumn keyColumn="editer"
                                srcImg={Picto.blue.editer}
                                alt={intlTab.colonnes.editionTitle}
                                action={this.editerPartenaire}
                                disabled={() => !this.isAdmin()}
                            />
                            <ActionColumn keyColumn="supprimer"
                                alt={intlTab.colonnes.suppressionTitle}
                                srcImg={Picto.blue.supprimer}
                                action={this.supprimer}
                                messageAlert={intlTab.colonnes.supprimer.message}
                                titleAlert={intlTab.colonnes.supprimer.title}
                                disabled={() => !this.isAdmin()}
                            />
                            <MoreInfoColumn keyColumn="idMore" visible={(value) => value.vip === true}
                                alt={intlTab.colonnes.moreInfoTitle}
                                headers={["nom", "prenom", "proCourriel", "organisme"]}>
                                <LineAfter visible={(value) => value.vip === true}>
                                    <DivExpandable className="mm-expandable" />
                                </LineAfter>
                            </MoreInfoColumn>
                        </Columns>
                    </Content>
                    <Footer>
                        <Pager dataSource={this.paginateDataSource} id="maTable-paginate" summary={intlTab.pagerSummary} />
                    </Footer>
                </Table>
            </div>
        );
    }

    isVisible(value) {
        return value.nom !== "ALBERT";
    }

    /**
     * Méthode permettant d'initialiser le dataSource
     * @param props
     */
    private initDataSource(props): PaginateDataSource<any> {

        if (props.navigateData && props.navigateData.dataSource && props.navigateData.dataSource.defaultSort) {
            return props.navigateData.dataSource;
        }
        return new PaginateDataSource<any>(
            new DataSourceConfigPage(this, this.getService().rechercher), { itemsPerPage: 10 }, {}, [new DefaultSort([{
                key: "nom",
                dir: 0,
            } as SortData])]);
    }

    /**
     * Evènement exécuté après suppression d'un partenaire
     */
    private refresh(): void {
        if (this.formRecherche && this.formRecherche.validateAndSubmit) {
            this.formRecherche.validateAndSubmit();
            this.maTable.setState({ isVisible: true });
        }

    }

    /**
     * @return true lorsque l'utilisateur courant a le rôle d'administrateur
     */
    private isAdmin(): boolean {
        logger.trace(Roles.ADMIN_STR);
        return AuthUtils.hasRole(this.user, Roles.ADMIN_STR);
    }

    /**
     * Génère le formulaire de sélection de critères de recherche
     */
    private renderFormCriteres(): JSX.Element {
        logger.trace("RecherchePartenairesPage render");

        const intlMessages = this.i18n("partenairesListePage.form");
        return (
            <div>
                <Form
                    id="rpaForm"
                    formMessages={intlMessages}
                    schema={schema}
                    subTitle={intlMessages.sousTitreFormulaire}
                    onSubmit={this.onSubmit}
                    text={intlMessages.textIntroForm}
                    textLang={"la"}
                    ref={(form) => { this.formRecherche = form; }}
                    customValidators={[new ParRpaValidateIsVipEndDate(), new ParRpaValidateSectorStartDate()]}
                    defaultValues={{ criteres: this.currentCriteres }}
                >
                    <Row>
                        <RadiosField name="criteres.partenaire.client"
                            dataSource={this.dataSourceIsClient}
                            label={intlMessages.fields.criteres.partenaire.client.label}
                            toolTip={intlMessages.fields.criteres.partenaire.typePartenaire.tooltip}
                            labelClass="blocLabelUp"
                            inline={RadiosField.Inline.FIELD}
                            currentChecked={true}
                            ref={(e) => this.radio = e}
                        />
                        <CheckBoxField name="criteres.partenaire.vip"
                            label={intlMessages.fields.criteres.partenaire.vip.label}
                            lang="en"
                            abbr={intlMessages.fields.criteres.partenaire.vip.title}
                            toolTip={intlMessages.fields.criteres.partenaire.vip.tooltip}
                            ref={(checkbox) => { this.checkBoxIsVip = checkbox; }}
                            onChange={this.changeLabelEndDate}
                            switch={true}
                            inline={CheckBoxField.Inline.ALL}
                        />
                    </Row>
                    <Row>
                        <SelectField name="criteres.idSecteur"
                            label={intlMessages.fields.criteres.idSecteur.label}
                            ref={(select) => { this.secteurSelect = select; }}
                            valueKey="id"
                            labelKey="nom"
                            dataSource={this.dataSourceSecteurs}
                            onChange={() => { logger.trace("onChnage Custom sur Selectfield"); }}
                        />
                    </Row>

                    <FieldSet legend={intlMessages.groupChamp}>
                        <Row>
                            <CalendarField
                                required={true}
                                label={intlMessages.fields.criteres.startDate.label}
                                name="criteres.startDate"
                                title={intlMessages.fields.criteres.startDate.title}
                            />
                            <CalendarField
                                ref={(date) => { this.endDate = date; }}
                                label={intlMessages.fields.criteres.endDate.label}
                                name="criteres.endDate"
                                title={intlMessages.fields.criteres.endDate.title}
                            />
                        </Row>
                    </FieldSet>
                    <ButtonsArea>
                        <Button type="submit" id="envoi" name="action:envoi"
                            value="Valider" className="hornet-button" label={this.i18n("form.search")}
                            title={this.i18n("partenairesListePage.form.searchTitle")} />
                        <Button type="button" id="reinitialiser" name="action:reinitialiser"
                            value="Réinitialiser" className="hornet-button" label={this.i18n("form.reinit")}
                            title={this.i18n("form.reinitTitle")} onClick={this.onReinitialiser} />
                    </ButtonsArea>
                </Form>
            </div>
        );
    }

    /**
     *
     * @param formData
     */

    private onSubmit(formData: any): void {
        logger.trace("onSubmit");

        this.criteresRecherche = formData.criteres;

        formData.pagination = this.paginateDataSource.pagination;
        formData.pagination.pageIndex = 1;

        this.maTable.setState({ isVisible: true });

        this.paginateDataSource.fetch(true, formData.criteres);

    }

    /**
     * Réinitialise le formulaire de recherche avec le valeurs par défaut, vide et réinitialise le tableau, supprime
     * les entrées du CLS.
     * @param e
     */
    private onReinitialiser(e: React.MouseEvent<HTMLElement>): void {
        logger.trace("RecherchePartenairesPage _onReinitialiser");
        e.preventDefault();

        this.maTable.setState({ isVisible: false });

        this.paginateDataSource.deleteAll();
        this.dataSourceIsClient.select(this.dataSourceIsClient.results[0]);

        this.criteresRecherche = {};

        this.setState({
            pagination: {
                pageIndex: 0,
                itemsPerPage: 10,
                totalItems: 0,
            },
        });

        this.formRecherche.cleanFormErrors();

        this.formRecherche.updateFields(this.defaultValues);
        this.endDate.setAttribute("required", (this.checkBoxIsVip.getCurrentValue()));

    }

    /**
     * Fonction déclenchée lors du clic sur l'un des boutons d'export
     * @param mediaType type MIME abrégé de l'export souhaité (par exemple "xls")
     */
    private onExport(mediaType: MediaType, value): void {
        logger.trace("onExport");
        if (mediaType === MediaTypes.ODS || mediaType === MediaTypes.ODT) {
            this.getService().exporterODF(mediaType, { criteres: this.criteresRecherche });
        } else {
            this.getService().exporter(mediaType, { criteres: this.criteresRecherche });
        }
    }

    /**
     * Méthode de suppression d'un partenaire
     * @param partenaire élément correspondant à une ligne du tableau de partenaires
     */
    private supprimer(partenaire: PartenaireResult, e: any): void {
        logger.trace("Utilisateur est OK pour supprimer l item id:", partenaire.id);

        const notifSuccessText: string = this.i18n("info.message.IN-PA-RPA-01", {
            $0: partenaire.prenom,
            $1: partenaire.nom,
        });
        const notifErrorText: string = this.i18n("error.message.ER-PA-RPA-07", {
            $0: partenaire.prenom,
            $1: partenaire.nom,
        });
        const errors: Notifications = new Notifications();
        const notif = new NotificationType();
        const confirmations: Notifications = new Notifications();
        notif.id = "DEL_PARTNER_" + partenaire.id;

        if (partenaire.vip) {
            notif.text = notifErrorText;
            errors.addNotification(notif);
            NotificationManager.notify("notifRpaPage", "rpaForm", errors, confirmations);
            this.refresh();
        } else {
            this.getService().supprimer(partenaire.id).then((res) => {
                if (typeof (res) === "boolean" && !res) {
                    notif.text = notifErrorText;
                    errors.addNotification(notif);
                } else {
                    notif.text = notifSuccessText;
                    confirmations.addNotification(notif);
                }
                NotificationManager.notify("notifRpaPage", "rpaForm", errors, confirmations);
                const id = this.getIdFromEventTarget(e);
                let page = 1;
                if (this.paginateDataSource && this.paginateDataSource.pagination) {
                    page = this.paginateDataSource.pagination.pageIndex;
                }
                this.fromCreate = { delete: { id, page } };
                this.refresh();
            });
        }
    }

    /**
     * Méthode de suppression de plusieurs partenaires
     * @param partenaires éléments correspondant à des ligne du tableau de partenaires
     */
    private supprimerEnMasse(value, partenaires: PartenaireResult[]): void {
        logger.trace("L'utilisateur est OK pour supprimer {0} partenaires", partenaires.length);

        this.getService().supprimerEnMasse(partenaires).then((ids: number[] | {}) => {

            const confirmations: Notifications = new Notifications();
            const errors: Notifications = new Notifications();
            partenaires.forEach((partenaire: PartenaireResult) => {
                if (ids && (ids as number[]).indexOf && (ids as number[]).indexOf(partenaire.id) >= 0) {
                    const notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("info.message.IN-PA-RPA-01", {
                        $0: partenaire.prenom,
                        $1: partenaire.nom,
                    });

                    confirmations.addNotification(notif);
                } else if (partenaire.vip) {
                    const notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("error.message.ER-PA-RPA-03", {
                        nom: partenaire.nom,
                        prenom: partenaire.prenom,
                    });

                    errors.addNotification(notif);
                } else {
                    const notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("error.message.ER-PA-RPA-07", {
                        $0: partenaire.prenom,
                        $1: partenaire.nom,
                    });

                    errors.addNotification(notif);
                }
            });

            NotificationManager.notify("notifRpaPage", "rpaForm", errors, confirmations);

            this.refresh();
        });
    }

    /**
     * Forme l'URL pour accéder à la page de consultation ou d'édition d'un partenaire
     * @param {"consulter" | "editer"} action mode dans lequel on veut accéder à la page partenaire
     * @param {number} idPartenaire identifiant du partenaire
     */
    private getPartenaireURLForSpecificAction(action: "consulter" | "editer", idPartenaire: number): string {
        return `/partenaires/${action}/${idPartenaire}`;
    }

    private doNavigateToPartenairePage(action: "consulter" | "editer", partenaire: PartenaireResult, target: any): void {
        const url = this.getPartenaireURLForSpecificAction(action, partenaire.id);
        this.navigateTo(url, {
            vip: partenaire.vip,
            criteres: this.criteresRecherche,
            dataSource: this.paginateDataSource,
            previous: target
        }, null);
    }

    protected getIdFromEventTarget(e) {
        let td = null;
        if (e) {
            const elem = e.target.parentElement.parentElement;
            if (elem) {
                td = elem.getAttribute("id");
            }
        }
        return td;
    }

    /**
     * appel a la page d'édition d'un partenaire
     * on lui passe si le partenaire est vip ou non en donnée
     * @param partenaire
     */
    private editerPartenaire(partenaire: PartenaireResult, e: any) {
        const id = this.getIdFromEventTarget(e);
        this.doNavigateToPartenairePage("editer", partenaire, id);
    }

    /**
     * appel a la page de consultation d'un partenaire
     * on lui passe si le partenaire est vip ou non en donnée
     * @param partenaire
     */
    private consulterPartenaire(partenaire: PartenaireResult, e: any) {
        const id = this.getIdFromEventTarget(e);
        this.doNavigateToPartenairePage("consulter", partenaire, id);
    }

    /**
     * @param time {Number} temps UTC en ms depuis "Epoch"
     * @returns {string} la date formatée suivant le format défini pour les calendriers
     */
    private getDateFormatee(time: any): string {
        return Utils.dateUtils.formatInTZ(new Date(time), this.i18n("calendar").dateFormat, Utils.dateUtils.TZ_EUROPE_PARIS);
    }

    private changeLabelEndDate(event) {
        this.endDate.setAttribute("required", (event.target.checked));
    }
}

const DivExpandable = (props) => {

    return (
        <div className="grid" key={"card-container-" + props.value.nom + "-" + props.value.prenom}>
            <div style={{ float: "left", width: "10%" }} className="one-fifth">
                <img src={Picto.grey.userCircle}
                    style={{ width: "200%" }}
                    alt={HornetPage.getI18n("partenairesListePage.form.titreImage")}
                />
            </div>
            <div className={props.className}
                key={"card-content-" + props.value.nom + "-" + props.value.prenom}>
                <div className="card-content-title">{props.value.nom + " " + props.value.prenom}</div>
                <div className="card-content-list-item">{props.value.proCourriel}</div>
                <div className="card-content-list-item">{props.value.organisme}</div>
            </div>
        </div>
    );
};
