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
import * as _ from "lodash";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Modal } from "hornet-js-react-components/src/widget/dialog/modal";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import { NotificationManager, Notifications } from "hornet-js-core/src/notification/notification-manager";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { AdministrationSecteurService } from "src/services/page/adm/adm-secteur-service";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { MenuActions } from "hornet-js-react-components/src/widget/table/menu-actions";
import { ActionButton } from "hornet-js-react-components/src/widget/table/action-button";
import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { Picto } from "hornet-js-react-components/src/img/picto";
import { ActionColumn } from "hornet-js-react-components/src/widget/table/column/action-column";
import { ToggleColumnsButton } from "hornet-js-react-components/src/widget/table/toggle-columns-button";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { EditionActionColumn } from "hornet-js-react-components/src/widget/table/column/edition-action-column";
import { SortData } from "hornet-js-core/src/component/sort-data";
import { SortDirection } from "hornet-js-core/src/component/sort-data";
import * as schema from "src/views/adm/adm-lst-page-validation.json";
import * as schemaEditionTable from "src/views/adm/adm-lst-table-validation.json";

const logger: Logger = Logger.getLogger("applitutoriel.views.adm.adm-lst-page");

/**
 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
 */
export class SecteursPage extends HornetPage<AdministrationSecteurService, HornetComponentProps, any> {

    // Composants
    /** Tableau de liste de secteurs */
    private dataSource: DataSource<any>;

    /** Modale d'édition de secteur */
    private maModale: Modal;

    /** Formulaire d'édition de secteur */
    private monForm: Form;

    protected headerTable: any;

    protected item: SecteurMetier;

    protected focusOnEdition : boolean = false;
    protected itemEdited: any;
    protected focusAdd: boolean = false;
    protected secondRender: boolean = false;

    protected table: Content;

    constructor(props?, context?) {

        super(props, context);

        this.refHeaderTable.bind(this);

        const sort: DefaultSort = new DefaultSort([ new SortData("dateCreat"), new SortData("auteurCreat", SortDirection.ASC) ]);
        this.dataSource = new DataSource<SecteurMetier>([], {}, [ sort ]);
    }

    focusEdition() {
        if (this.focusOnEdition && this.itemEdited) {
            const buttonEdition = document.querySelector(`a.edition-button-action-before[aria-label~="${this.itemEdited.nom}"]`);
            if (buttonEdition && (buttonEdition as HTMLElement).focus) {
                (buttonEdition as HTMLElement).focus();
                this.focusOnEdition = false;
                this.itemEdited = null;
            }
        }

        if (this.focusAdd) {
            if (this.secondRender) {
                const addButton = document.getElementsByClassName("secteurs-add-button");
                if (addButton && addButton[0]) {
                    (addButton[0] as HTMLElement).focus();
                    this.focusAdd = false;
                    this.secondRender = false;
                }
            }else {
                this.secondRender = true;
            }
        }
    }

    /**
     * Alimente le tableau de liste des secteurs.
     * @override
     */
    public prepareClient(): void {
        this.refreshSecteurs();

        this.dataSource.on("add", () => {
            const elem = document.getElementById("addSecteur");
            if (elem && elem.focus) {
                elem.focus();
            }
        });
    }

    /**
     * Met à jour le tableau de liste des secteurs
     */
    private refreshSecteurs(): void {
        this.getService().lister().then((result) => {
            this.dataSource.deleteAll();
            this.dataSource.add(false, result);
        });
    }

    refHeaderTable(element) {
        this.headerTable = element;
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        // test d'erreur dans les render react
        // var i;
        // i.toString();
        // throw "test error";
        logger.trace("VIEW SecteursPage render");
        const intlMessages = this.i18n("administration.secteurs");
        const formI18n = this.i18n("administration.secteurs.form");

        return (
            <div>
                <h2>{this.i18n("administration.secteurs.titreSecteur")}</h2>
                <Notification id="notif2" />

                <Table id="liste-secteurs" >
                    <Header title={this.i18n("administration.secteurs").table.tableTitle} ref={this.refHeaderTable}>
                        <ToggleColumnsButton hiddenColumns={{ desc: true, nom: false }}
                            onChange={this.onChangeToggleColumns}
                            selectAllItem={false} />
                        <MenuActions>
                            <ActionButton
                                className={"secteurs-add-button"}
                                title={this.i18n("administration.secteurs.table.addTitle")}
                                srcImg={Picto.white.add}
                                id="addSecteur"
                                displayedWithoutResult={true}
                                action={this.ajouterSecteur} priority={true} />
                            <ActionButton title={this.i18n("administration.secteurs.table.sortMultiTitle")}
                                srcImg={this.genUrlStatic("/img/sort-down.svg")}
                                action={this.sortMulti} priority={true} />
                        </MenuActions>
                    </Header>
                    <Content ref={
                        (ref) =>{
                            this.table =ref
                        }
                    } dataSource={this.dataSource} onSubmit={this.submitLineForm} schema={schemaEditionTable} idForm={"secteurPageForm"}
                        notifId="notif2"
                        onRerender={this.focusEdition}>
                        <Columns>
                            <Column keyColumn="nom"
                                title={intlMessages.nom}
                                editable={true}
                                sortable={true}
                            />
                            <Column keyColumn="desc" title={intlMessages.description} sortable={false} />
                            <DateColumn keyColumn="dateCreat" title={intlMessages.dateCr} sortable={true} />
                            <DateColumn keyColumn="dateMajEnreg" title={intlMessages.dateMaj} sortable={false} />
                            <Column keyColumn="auteurCreat" title={intlMessages.auteur} sortable={true} />
                            <ActionColumn keyColumn="id"
                                alt={intlMessages.modificationTitle}
                                srcImg={Picto.blue.editer}
                                action={this.editItem.bind(this)}
                            />
                            <ActionColumn keyColumn="id"
                                alt={intlMessages.suppressionAlt}
                                srcImg={Picto.blue.supprimer}
                                action={this.supprimer.bind(this)}
                                messageAlert={this.i18n("administration.secteurs.confirmationSuppression")}
                                titleAlert={this.i18n("administration.secteurs.suppressionTitle")}
                            />
                            <EditionActionColumn keyColumn="id"
                                titleEdit={intlMessages.quickUpdateTitle}
                                titleSave={"Enregistrer"}
                                titleCancel={"Annuler"}
                                messageAlert={this.i18n("administration.secteurs.confirmationAnnulationAction")}
                                titleAlert={this.i18n("administration.secteurs.annulationTitle")}
                            />
                        </Columns>
                    </Content>
                </Table>
                <Modal ref={(modal: Modal) => {
                    this.maModale = modal;
                }} withoutOverflow={true} underlayClickExits={false} focusDialog={false}
                    onClickClose={this.closeModal}>
                    <div className="content-modal-body">
                        <Form
                            id="modalForm"
                            ref={(form: Form) => {
                                this.monForm = form;
                                if (this.monForm) {
                                    this.monForm.updateFields(this.item);
                                }
                            }}
                            schema={schema}
                            formMessages={formI18n}
                            onSubmit={this.onSubmitEdition}
                        >
                            <InputField name="id" type="hidden" />
                            <Row>
                                <InputField name="nom" label={formI18n.fields.nom.label}
                                    required={true} size={40} maxLength={50} />
                            </Row>
                            <Row>
                                <InputField name="desc" label={formI18n.fields.desc.label}
                                    required={true} size={40} maxLength={200} />
                            </Row>
                            <ButtonsArea>
                                <Button type="submit" id="enregistrer" name="action:save"
                                    value="Enregistrer" className="hornet-button" label={this.i18n("form.valid")}
                                    title={this.i18n("administration.validTitle")} />
                                <Button type="button" id="cancel" name="action:cancel"
                                    value="Annuler" className="hornet-button" label={this.i18n("form.cancel")}
                                    title={this.i18n("administration.cancelTitle")} onClick={this.closeModal} />
                            </ButtonsArea>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }

    /**
     * Méthode permettant de connaître les colonnes affichées/masquées
     * @param columns
     */
    private onChangeToggleColumns(columns: any): void {
        logger.debug("MAJ toggle columns :", columns);
    }

    /**
     * Fonction de submit du formulaire
     * @param item: l'item du tableau qu a été edité
     */
    private submitLineForm(item: any): void {
        item.user = this.user.name;
        this.getService().modifier(item.id, item).then(() => {
            NotificationManager.notify(null, "secteurPageForm", null,
                                       Notifications.makeSingleNotification("SECTEUR_DELETED", "info.message.IN-AD-LST-01"));
            this.refreshSecteurs();
            this.focusOnEdition = true;
            this.itemEdited = item;
        });

    }

    /**
     * Déclenche la suppression du secteur ayant l'identifiant indiqué
     * @param item
     */
    private supprimer(item) {
        logger.trace("Utilisateur est OK pour supprimer l item id:", item.id);

        NotificationManager.cleanAll();

        this.getService().supprimer(item.id).then((result) => {
            if (result) {
                NotificationManager.notify(null, null, null,
                                           Notifications.makeSingleNotification("SECTEUR_DELETED", "info.message.IN-AD-LST-02"));
                this.refreshSecteurs();
                this.focusAdd = true;
            }

        }).catch((result) => {
            NotificationManager.notify("notif2", null, null, null, result.errors);
        });
    }

    /**
     * Ouvre la fenêtre modale d'édition de secteur
     * @param item élément du tableau de secteurs
     */
    private editItem(item): void {
        this.maModale.setTitle(this.i18n("administration.modification"));
        this.maModale.setCloseLabel(this.i18n("administration.closeModification"));
        this.item = item;
        this.maModale.open();
    }

    /**
     * Ouvre la fenêtre modale de création de secteur
     */
    private ajouterSecteur(): void {
        this.maModale.setTitle(this.i18n("administration.ajout"))
            .setCloseLabel(this.i18n("administration.closeAjout"))
            .open();
    }

    /**
     * exemple de tri multicolonnes
     */
    private sortMulti(): void {
        this.dataSource.sort({ sortDatas: [ new SortData("dateCreat", SortDirection.DESC), new SortData("auteurCreat") ] });
    }

    /**
     * Ferme la modale de création/édition de secteur sans appliquer les changements.
     */
    private closeModal(): void {
        this.maModale.close();
        this.item = null;
    }

    /**
     * Fonction déclenchée lors de l'envoi du formulaire d'édition de secteur
     * @param data données du formulaire
     */
    private onSubmitEdition(data: any): void {
        NotificationManager.cleanAll();

        const secteur = data;
        if (!_.isEmpty(secteur.id)) {
            this.getService().modifier(secteur.id, secteur).then((result) => {
                if (!result.errors) {
                    NotificationManager.notify("notif2", "secteurPageForm", null,
                                               Notifications.makeSingleNotification("notif2", this.i18n("info.message.IN-AD-LST-03")));
                    this.closeModal();
                    this.refreshSecteurs();
                }
            });
        } else {
            /* On ajoute le nom de l'utilisateur connecté aux informations saisies dans le formulaire */
            if (this.user) {
                secteur.user = this.user.name;
            }

            this.getService().creer(secteur).then((result) => {
                if (!result.errors) {
                    this.closeModal();
                    NotificationManager.notify(null, "secteurPageForm", null,
                                               Notifications.makeSingleNotification("notif2", this.i18n("info.message.IN-AD-LST-03")));
                    this.refreshSecteurs();
                }
            });
        }
    }
}
