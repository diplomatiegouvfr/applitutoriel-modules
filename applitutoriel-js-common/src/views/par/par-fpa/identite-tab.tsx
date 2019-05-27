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
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";
import { UploadFileField } from "hornet-js-react-components/src/widget/form/upload-file-field";
import { CheckBoxField } from "hornet-js-react-components/src/widget/form/checkbox-field";
import { RadiosField } from "hornet-js-react-components/src/widget/form/radios-field";
import { FieldSet } from "hornet-js-react-components/src/widget/form/fieldset";
import {
    AutoCompleteField,
    AutoCompleteFieldProps,
    FilterTextType,
} from "hornet-js-react-components/src/widget/form/auto-complete-field";
import { AutoCompleteMultiField } from "hornet-js-react-components/src/widget/form/auto-complete-multi-field";
import { TextAreaField } from "hornet-js-react-components/src/widget/form/textarea-field";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { UploadedFile } from "hornet-js-core/src/data/file";
import { CalendarField } from "hornet-js-react-components/src/widget/form/calendar-field";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { Picto } from "hornet-js-react-components/src/img/picto";
import { MenuActions } from "hornet-js-react-components/src/widget/table/menu-actions";
import { ActionButton } from "hornet-js-react-components/src/widget/table/action-button";
import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { ActionColumn } from "hornet-js-react-components/src/widget/table/column/action-column";
import { Accordions } from "hornet-js-react-components/src/widget/accordion/accordions";
import { Accordion } from "hornet-js-react-components/src/widget/accordion/accordion";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { TabContentProps } from "hornet-js-react-components/src/widget/tab/tab-content";
import { InputTextColumn } from "hornet-js-react-components/src/widget/table/column/input-text-column";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { PaysMetier } from "src/models/ref/ref-pay-mod";
import { VilleMetier } from "src/models/ref/ref-ville-mod";
import { DataSourceMaster } from "hornet-js-core/src/component/datasource/datasource-master";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { SortData } from "hornet-js-core/src/component/sort-data";
import { PartenaireMetier } from "src/models/par/par-mod";
import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
import SyntheticEvent = React.SyntheticEvent;

import * as schema from "src/views/par/par-fpa/validation.json";

const logger: Logger = Logger.getLogger("applitutoriel.views.par.par-fpa.identite-tab");

export const PAR_MODE_CONSULTER: string = "consulter";
export const PAR_MODE_EDITER: string = "editer";
export const PAR_MODE_CREER: string = "creer";

/**
 * Collection des datasources de la page fiche partenaire
 */
export class IdentiteTabDatasourcesService {
    constructor(public dataSourceNationalite?: DataSource<PaysMetier>) {
    }
}

/**
 * interface du formulaire d'identité d'un partenaire.
 */
export interface IdentiteTabProps extends TabContentProps {
    /**
     * collection des datasources service initialiser dans la Page
     */
    dataSourcesService: IdentiteTabDatasourcesService;
    /**
     * Fonction de navigation transmisse par la page lors de soumission
     */
    onSubmit: (data: any) => void;
    /**
     * Fonction de navigation transmisse par la page de l'annulation
     */
    onCancel: React.MouseEventHandler<HTMLElement>;

    /**
     * Mode edition ou consultation du formulaire
     */
    pageAttributes: { id: string, mode: string, vip: boolean };

}

/**
 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
 */
export class IdentiteTab extends TabContent<IdentiteTabProps, any> {

    /* Liste de choix des civilités */
    private listeCivilites: any[];

    /* Liste de choix IsClient */
    private listeIsClient: Array<any>;

    /* Liste de choix des satisfactions */
    private listeSatisfactions: Array<any>;

    partenaire: any = {};
    private formPartenaire: Form;

    private fieldSetCivilite: FieldSet;
    private fieldSetAdresses: FieldSet;
    private fieldSetCoordAssist: FieldSet;
    private fieldSetDivers: FieldSet;
    private fieldSetSatisfaction: FieldSet;
    private fieldSetCoordonnees: FieldSet;
    private villeAutoComplete: AutoCompleteField<AutoCompleteFieldProps>;

    private dataSourceNationalite: DataSource<PaysMetier>;
    private dataSourcePays: DataSourceMaster<PaysMetier>;
    private dataSourceVille: DataSource<VilleMetier>;
    private dataSourceCivilite: DataSource<any>;
    private dataSourceSatisfactions: DataSource<any>;
    private dataSourceIsClient: DataSource<any>;
    private dataSourceOtherTelephones: DataSource<any>;


    public readonly props: Readonly<IdentiteTabProps>;

    private formI18n = this.i18n("partenaireFichePage.form");
    private uploadFileI18n = this.i18n("uploadFile");

    constructor(props: IdentiteTabProps, context) {
        super(props, context);

        const intlMess = this.i18n("partenaireFichePage");
        const fieldMessages = intlMess.form.fields;

        this.state = {
            ...this.state,
            readOnly: this.props.pageAttributes.mode === PAR_MODE_CONSULTER,
            mode: this.props.pageAttributes.mode,
            nationalites: [],
            schema,
        };
        this.dataSourceNationalite = this.props.dataSourcesService.dataSourceNationalite;
        this.dataSourcePays = new DataSourceMaster<PaysMetier>([], { value: "id", text: "libelle" });
        this.dataSourceVille = new DataSource<VilleMetier>([], { value: "id", text: "libelle", idPays: "pays.id" });
        this.dataSourcePays.addSlave(this.dataSourceVille);
        this.dataSourceVille.on("filter", (filtered) => {
            if (!_.find(filtered, { text: this.villeAutoComplete.getCurrentText() })) {
                this.villeAutoComplete.resetField();
            }
        });
        this.dataSourcePays.on("select", (object) => {
            if (object) {
                this.dataSourceVille.filter(function (ville) {
                    return (ville.value == null || ville.idPays === object.value);
                },                          true);
            }
        });

        this.dataSourceOtherTelephones = new DataSource<any>([ { autreTel: "0240506070" }, { autreTel: "0241516171" } ]);

        // Alimentation des listes de choix isClient
        this.listeIsClient = [
            {
                client: true,
                libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.client.clientLabel"),
            },
            {
                client: false,
                libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.client.fournisseurLabel"),
            },
        ];

        this.dataSourceIsClient = new DataSource(this.listeIsClient, {value: "client", label: "libelle"});

        /* Alimentation des listes de choix de Civilités.
         Sert d'exemple d'utilisation de clés customisées autres que "value" et "label" */
        this.listeCivilites = [
            { id: 1, libelle: intlMess.form.mme },
            { id: 2, libelle: intlMess.form.mr } ];

        this.dataSourceCivilite = new DataSource<any>(this.listeCivilites, {
            value: "id",
            text: "libelle",
        },                                            [ new DefaultSort([ { key: "text" } as SortData ]) ]);

        // Alimentation des listes de choix Satisfaction
        this.listeSatisfactions = [
            { id: "1", label: fieldMessages.satisfaction.internet },
            { id: "2", label: fieldMessages.satisfaction.bao },
            { id: "3", label: fieldMessages.satisfaction.pub },
            { id: "4", label: fieldMessages.satisfaction.tele },
            { id: "5", label: fieldMessages.satisfaction.journal },
            { id: "6", label: fieldMessages.satisfaction.radio },
            { id: "7", label: fieldMessages.satisfaction.autres },
        ];
        this.dataSourceSatisfactions = new DataSource(this.listeSatisfactions, { value: "id", text: "label" });

        this.partenaire.vip = this.props.pageAttributes && this.props.pageAttributes.vip || false;

        this.state = {...this.state, vip: this.partenaire.vip};
    }

    componentDidUpdate(prevProps: any, prevState: any, prevContext: any): void {
        super.componentDidUpdate(prevProps, prevState, prevContext);
        this.formPartenaire.updateFields(this.partenaire, true);
    }

    componentDidMount() {
        super.componentDidMount();
        this.dataSourceOtherTelephones.reload();
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        return (
            <div>
                <Form
                    id="identiteForm"
                    ref={(form) => {
                        this.formPartenaire = form;
                    }}
                    onSubmit={this.props.onSubmit}
                    readOnly={this.state.readOnly}
                    className=""
                    schema={this.state.schema}
                    formMessages={this.i18n("partenaireFichePage.form")}
                    onFormChange={this.onFormChangeFn}>
                    {this.renderFieldsetType()}
                    {(this.state.vip) ? this.renderPartenaireVip() : this.renderPartenaire()}
                    {this.renderButton()}
                    {this.renderButtonCancel()}
                </Form>
            </div>
        );
    }

    onFormChangeFn(event) {
        // console.log("Déclenchement de la méthode gerrant les changements dans le form !");
    }

    /**
     * Alimente le datasource des pays
     */
    setPays(pays: PaysMetier[]): void {
        this.dataSourcePays.add(false, pays);
    }

    /**
     * Alimente le datasource des villes
     */
    setVilles(villes: VilleMetier[]): void {
        this.dataSourceVille.add(false, villes);
    }

    /**
     * Alimente la fiche de partenaire
     */
    setPartenaire(partenaire: PartenaireMetier, mode: string) {
        this.partenaire = partenaire;
        if (partenaire.ville && partenaire.ville.pays && partenaire.ville.pays.id) {
            this.dataSourceVille.on("add", () => {
                this.dataSourceVille.filter(function (ville) {
                    return (ville.value !== null && ville.idPays === partenaire.ville.pays.id);
                },                          true);
            });
        }


        if (this.partenaire.satisfaction && this.partenaire.satisfaction.split) {
            partenaire.satisfaction = { ids: this.partenaire.satisfaction.split(",") };
        }
        /* MaJ de chacun des champs */
        this.dataSourceOtherTelephones.reload();
        this.setState({vip: partenaire.vip, mode, readOnly: (mode === PAR_MODE_CONSULTER)}, () => {
            this.formPartenaire.updateFieldsAndClean(partenaire, true);
            /* Toggle Des champs en readOnly */
            this.toggleReadOnly(this.isNonContactFieldDisabled());
            const elem = document.getElementById("tabsPartenaire-tabList-item-0");
            if (elem) {
                elem.focus();
            }
        });

    }

    /**
     * Méthode permettant la sélection de valeurs dans le datasource lié aux radiosBouton pour isClient
     * @param {boolean} value : valeur booléenne pour isClient
     */
    selectIntoIsClientDataSource(value: boolean): void {
        if (value !== undefined) {
            let selectedValue;
            if (value) {
                selectedValue = this.listeIsClient[ 0 ];
            } else {
                selectedValue = this.listeIsClient[ 1 ];
            }
            this.dataSourceIsClient.select(selectedValue);
        }
    }

    /**
     * Rendu des boutons de bas de page
     * @returns {any}
     */
    renderButton() {

        const prefixCancelButtonLbl = this.i18n("form.cancel") + " - ";
        const bodyCancelButtonLbl = (!this.state.readOnly) ?
            this.i18n("partenaireFichePage.form.backTitle") : this.i18n("partenaireFichePage.form.cancelTitle");
        const cancelButtonLbl = prefixCancelButtonLbl + bodyCancelButtonLbl;

        return (
            <div>
                {!this.state.readOnly ?
                    <ButtonsArea>
                        <Button type="submit" id="envoi" name="action:envoi" className="hornet-button"
                            value={this.i18n("form.valid")}
                            label={this.i18n("form.valid")}
                            title={this.i18n("partenaireFichePage.form.validTitle")} />
                        <Button type="button" id="annuler" name="action:annuler" className="hornet-button"
                            value={this.i18n("form.cancel")}
                            label={this.i18n("form.cancel")}
                            title={cancelButtonLbl}
                            onClick={this.props.onCancel} />
                    </ButtonsArea>
                    : null
                }
            </div>
        );
    }

    /**
     * Rendu du bouton Annuler
     * @returns {any}
     */
    renderButtonCancel() {
        const prefixCancelButtonLbl = this.i18n("form.cancel") + " - ";
        const bodyCancelButtonLbl = (!this.state.readOnly) ?
            this.i18n("partenaireFichePage.form.backTitle") : this.i18n("partenaireFichePage.form.cancelTitle");
        const cancelButtonLbl = prefixCancelButtonLbl + bodyCancelButtonLbl;

        return (
            <div>
                {!this.state.readOnly ? null :
                    <ButtonsArea width={50}>
                        <Button type="button" id="annuler" name="action:annuler" className="hornet-button"
                            value={this.i18n("form.cancel")}
                            label={this.i18n("form.cancel")}
                            title={cancelButtonLbl}
                            onClick={this.props.onCancel} />
                    </ButtonsArea>
                }
            </div>
        );
    }

    /**
     * Bloc global  fieldset du formulaire
     */
    getFieldset(): any[] {

        const res: any[] = [];
        res.push({ element: this.renderFieldsetCivilite(), title: this.formI18n.civilite });
        res.push({ element: this.renderFieldsetCoordonnee(), title: this.formI18n.sectionCoordPro });
        res.push({ element: this.renderFieldsetAdresse(), title: this.formI18n.sectionAdresse });
        res.push({ element: this.renderFieldsetCoordAssistance(), title: this.formI18n.sectionCoordAssistance });
        res.push({ element: this.renderFieldsetDivers(), title: this.formI18n.sectionDivers });
        res.push({ element: this.renderFieldsetSatisfaction(), title: this.formI18n.sectionSatisfactionClient });

        return res;
    }

    /**
     * Ajout des blocs accordions au formulaire
     *
     */
    getAccordions(fieldsets): JSX.Element[] {

        const accordions: JSX.Element[] = [];
        _.forEach(fieldsets, (item, index) => {
            const accordion: JSX.Element = (
                <Accordion title={item.title} isOpen={(index === "0") ? true : false} key={"identite-accordion-" + index}>{item.element}</Accordion>
            );

            accordions.push(accordion);
        });
        return accordions;
    }

    /**
     * bloc Fieldset Type
     */
    renderFieldsetType(): JSX.Element {
        return (
            <FieldSet legend={this.formI18n.type} key="fieldsetType">
                <Row>
                    {/*Exemple d'application de la propriété readOnly directement sur un champ*/}
                    <RadiosField name="client"
                                 label={this.formI18n.fields.client.label}
                                 dataSource={this.dataSourceIsClient}
                                 currentChecked={true}
                                 currentValue={this.listeIsClient[ 1 ]}
                                 inline={RadiosField.Inline.FIELD}
                    />
                    <CheckBoxField name="vip"
                                   label={this.formI18n.fields.vip.label}
                                   toolTip={this.formI18n.fields.vip.tooltip}
                                   abbr={this.formI18n.fields.vip.title}
                                   onChange={this.handleIsVIPChange}
                                   inline={CheckBoxField.Inline.ALL}
                    />
                </Row>
            </FieldSet>);
    }

    /**
     * bloc Fieldset Civilite
     */
    renderFieldsetCivilite(): JSX.Element {
        return (<FieldSet legend={this.formI18n.civilite} ref={(fieldset) => {
            this.fieldSetCivilite = fieldset;
        }} key="fieldSetCivilite">
            <Row>
                <AutoCompleteField dataSource={this.dataSourceCivilite}
                    maxHeight={200}
                    name="civilite"
                    label={this.formI18n.fields.civilite.label}
                    required={true}
                    labelKey="libelle"
                    valueKey="id"
                    writable={false}
                    toolTip={this.i18n("form.autoCompleteField.toolTip")} />
            </Row>
            <Row>
                <InputField name="nom" id="idNom" label={this.formI18n.fields.nom.label} required={true} />
                <InputField name="nomLocal" label={this.formI18n.fields.nomLocal.label} />
            </Row>
            <Row>
                <InputField name="prenom"
                    id="prenom"
                    label={this.formI18n.fields.prenom.label}
                    required={true}
                    requiredLabel="Prénom obligatoire"
                    maxLength={50}
                    resettable={false} />
                <InputField name="prenomLocal"
                    label={this.formI18n.fields.prenomLocal.label}
                    maxLength={50} />
            </Row>
            <Row>
                <AutoCompleteField dataSource={this.dataSourceNationalite}
                    maxHeight={200}
                    name="nationalite"
                    label={this.formI18n.fields.nationalite.label}
                    required={true}
                    toolTip={this.i18n("form.autoCompleteField.toolTip")}
                    labelKey="nationalite"
                    valueKey="id"
                />
            </Row>
            <Row>
                <CalendarField
                    label={this.formI18n.fields.dateNaissance.label}
                    name="dateNaissance"
                />
            </Row>
        </FieldSet>
        );
    }

    /**
     * Bloc Fieldset Coordonnées
     */
    renderFieldsetCoordonnee(): JSX.Element {

        return (
            <FieldSet legend={this.formI18n.sectionCoordPro} key="fiedsetCoordonnee" ref={(fieldset) => {
                this.fieldSetCoordonnees = fieldset;
            }}>
                <Row>
                    {/* Exemple d'utilisation du composant input standard dans le même formulaire */}
                    <InputField
                        name="organisme"
                        label={this.formI18n.fields.organisme.label}
                        maxLength={50}

                    />
                </Row>
                <Row>
                    <InputField name="fonction"
                            label={this.formI18n.fields.fonction.label}
                            maxLength={50}
                            maxChar={25}
                            displayCharNumber={true}
                            showAlert={true}/>
                </Row>
                <Row>
                    <InputField name="proTelFixe"
                        label={this.formI18n.fields.proTelFixe.label}
                        maxLength={14}
                        toolTip={this.i18n("partenaireFichePage.form.fields.proTelFixe.tooltip")} />
                    <InputField name="proTelPort"
                        label={this.formI18n.fields.proTelPort.label}
                        maxLength={14}
                        toolTip={this.i18n("partenaireFichePage.form.fields.proTelPort.tooltip")} />
                </Row>
                <Row>
                    <InputField
                        name="proCourriel"
                        toolTip={this.formI18n.fields.proCourriel.toolTip}
                        label={this.formI18n.fields.proCourriel.label}
                        required={true}
                        minLength={3}
                        maxLength={80}
                    />
                </Row>
                <Row>
                    <InputField
                        name="proFax"
                        label={this.formI18n.fields.proFax.label}
                        maxLength={14}
                        toolTip={this.i18n("partenaireFichePage.form.fields.proFax.tooltip")}
                    />
                </Row>
                {this.renderOtherPhones()}
            </FieldSet>
        );
    }

    /**
     * Méthode permettant d'ajouter un autre téléphone
     */
    ajouterAutreTelephone() {
        this.dataSourceOtherTelephones.add(true, { autreTel: null });
    }

    /**
     * Méthode permettant de supprimer un autre téléphone
     */
    supprimerAutreTelephone(item) {
        this.dataSourceOtherTelephones.delete(true, item);
    }

    /**
     *
     * @returns {[ any, any, any, any, any ]}
     */
    renderOtherPhones() {

        return (
            <Table id="liste-other-phones">
                <Header title={this.i18n("partenaireFichePage.tableauAutresTel.title")}>
                    <MenuActions>
                        <ActionButton title={this.i18n("partenaireFichePage.tableauAutresTel.addTitle")}
                            srcImg={Picto.white.add}
                            action={this.ajouterAutreTelephone}
                            priority={true}
                            visible={() => !this.isNonContactFieldDisabled()}
                            displayedWithoutResult={true} />
                    </MenuActions>
                </Header>
                <Content dataSource={this.dataSourceOtherTelephones}
                    withoutForm={true}>
                    <Columns>
                        <InputTextColumn keyColumn="autreTel"
                            title={this.i18n("partenaireFichePage.tableauAutresTel.colonnes.numero")}
                            editable={!this.isNonContactFieldDisabled()}
                        />
                        <ActionColumn keyColumn="id"
                            alt={this.formI18n.fields.suppressionAlt}
                            srcImg={Picto.blue.supprimer}
                            action={this.supprimerAutreTelephone}
                            messageAlert={this.i18n("partenaireFichePage.tableauAutresTel.suppressionMessage")}
                            titleAlert={this.i18n("partenaireFichePage.tableauAutresTel.suppressionTitle")}
                            disabled={() => this.isNonContactFieldDisabled()}
                            visible={() => !this.state.readOnly}
                        />
                    </Columns>
                </Content>
            </Table>
        );
    }

    /**
     * Bloc Fieldset adresse
     */
    renderFieldsetAdresse(): JSX.Element {

        return (
            <FieldSet legend={this.formI18n.sectionAdresse} ref={(fieldset) => {
                this.fieldSetAdresses = fieldset;
            }} key="fieldSetAdresses">
                <Row>
                    <InputField
                        name="proAdrRue"
                        label={this.formI18n.fields.proAdrRue.label}
                        required={true}
                        maxLength={250}
                    />
                </Row>
                <Row>
                    <InputField
                        name="proAdrCP"
                        label={this.formI18n.fields.proAdrCP.label}
                        required={true}
                        maxLength={9}
                    />
                </Row>
                <Row>
                    <AutoCompleteField dataSource={this.dataSourcePays}
                        minValueLength={2}
                        maxHeight={200}
                        name="ville.pays"
                        label={this.formI18n.fields.ville.pays.label}
                        required={true}
                        labelKey="libelle"
                        valueKey="id"
                        filterText={FilterTextType.beginWith}
                    />
                    <AutoCompleteField dataSource={this.dataSourceVille}
                        ref={(villeAutoComplete) => {
                            this.villeAutoComplete = villeAutoComplete;
                        }}
                        maxHeight={200}
                        name="ville"
                        label={this.formI18n.fields.ville.label}
                        required={true}
                        labelKey="libelle"
                        valueKey="id"
                    />
                </Row>
            </FieldSet>
        );
    }

    /**
     * Bloc Fieldset coordonnee assistance
     */
    renderFieldsetCoordAssistance(): JSX.Element {

        return (
            <FieldSet legend={this.formI18n.sectionCoordAssistance} ref={(fieldset) => {
                this.fieldSetCoordAssist = fieldset;
            }} key="fieldSetCoordAssist">
                <Row>
                    <InputField name="assistNom"
                        label={this.formI18n.fields.assistNom.label}
                        id="assistNom"
                        maxLength={50}
                    />
                    <InputField name="assistPrenom"
                        label={this.formI18n.fields.assistPrenom.label}
                        maxLength={50}
                    />
                </Row>
                <Row>
                    <InputField
                        name="assistTel"
                        toolTip={this.i18n("partenaireFichePage.form.fields.assistTel.tooltip")}
                        label={this.formI18n.fields.assistTel.label}
                        maxLength={14}
                    />
                </Row>
                <Row>
                    <InputField
                        name="assistCourriel"
                        label={this.formI18n.fields.assistCourriel.label}
                        maxLength={80}
                    />
                </Row>
            </FieldSet>
        );
    }

    /**
     * Bloc Fieldset divers
     */
    renderFieldsetDivers(): JSX.Element {

        return (

            <FieldSet legend={this.formI18n.sectionDivers} ref={(fieldset) => {
                this.fieldSetDivers = fieldset;
            }} key="fieldSetDivers">
                <Row>
                    <TextAreaField name="commentaire"
                        label={this.formI18n.fields.commentaire.label}
                        labelClass="blocLabelUp"
                        rows={4}
                        maxChar={255}
                        readOnly={false}
                        disabled={this.isNonContactFieldDisabled()}
                        placeholder={this.formI18n.fields.commentaire.placeHolder}
                        displayMaxCharInLabel={true}
                    />
                </Row>
                <Row>
                    <UploadFileField
                        name="photo"
                        readOnly={false}
                        label={this.formI18n.fields.photo.label}
                        renderPreviewFile={this.renderPreviewUploadFile}
                        buttonLabel={this.uploadFileI18n.buttonLabel}
                        fileSelectedLabel={this.uploadFileI18n.selectedFile}
                    />
                </Row>
            </FieldSet>
        );
    }

    /**
     * Bloc Fieldset satisfaction
     */
    renderFieldsetSatisfaction(): JSX.Element {

        return (

            <FieldSet legend={this.formI18n.sectionSatisfactionClient} ref={(fieldset) => {
                this.fieldSetSatisfaction = fieldset;
            }} key="fieldSetSatisfaction">
                <Row>
                    <AutoCompleteMultiField
                        dataSource={this.dataSourceSatisfactions}
                        maxHeight={200}
                        name="satisfaction"
                        label={this.formI18n.fields.satisfaction.label}
                        labelKey="libelle"
                        valueKey="ids"
                        labelClass="blocLabelUp"
                        itemSelectedLabel={this.i18n("form.autoCompleteField.selectedItem")}
                        cleanFilterOnBlur={true}
                    />
                </Row>
            </FieldSet>
        );
    }

    /**
     * Rendu fiche partenaire avec accordions
     * @param formI18n
     * @param uploadFile
     * @returns {any}
     */
    private renderPartenaireVip(): JSX.Element {
        const accordions = this.getAccordions(this.getFieldset());
        return (
            <Accordions id="id-accordions-partenaire-vip"
                multiSelectable={true}>{accordions}</Accordions>
        );
    }

    /**
     * Rendu fiche partenaire sans accordions
     * @param formI18n
     * @param uploadFile
     * @returns {any}
     */
    renderPartenaire(): JSX.Element {

        const fieldset: JSX.Element[] = this.getFieldset().map((fieldsetElement) => {
            return fieldsetElement.element;
        });
        return (
            <div>
                {fieldset}
            </div>
        );
    }

    /**
     * Indique si les autres champs que les coordonnées doivent être en lecture seule :
     * - formulaire en lecture seule : tous les champs sont désactivésupdateFields
     * - formulaire en modification :
     *  - partenaire VIP : sauf en création, seules les coordonnées sont modifiables
     *  - partenaire non VIP : toute la fiche est modifiable
     * @return {boolean} true lorsque les champs qui ne font pas partie du bloc des coordonnées doivent être désactivés
     */
    private isNonContactFieldDisabled(): boolean {
        return (this.state.readOnly || (this.partenaire.vip && this.props.pageAttributes.mode !== PAR_MODE_CREER));
    }

    /**
     * Gestion du changement d'état de la case à cocher "VIP"
     * @param e évènement
     */
    handleIsVIPChange(e?: SyntheticEvent<HTMLElement>): void {

        if (e) {
            const isVIPInput: HTMLInputElement = e.target as HTMLInputElement;
            this.partenaire = IdentiteTab.mergeObjects(this.formPartenaire.extractData(), {vip: isVIPInput.checked});
        }
        this.setState({vip: this.partenaire.vip}, () => this.toggleReadOnly(this.isNonContactFieldDisabled()));

    }

    /**
     * Bascule des champs en mode readONly/Modification
     * @param isReadOnly
     */
    private toggleReadOnly(isReadOnly: boolean): void {
        if (this.state.mode === PAR_MODE_CREER) {
            isReadOnly = false;
        }
        if (this.fieldSetCivilite) {
            this.fieldSetCivilite.setDisabled(isReadOnly).setReadOnly(isReadOnly);
        }
        if (this.fieldSetAdresses) {
            this.fieldSetAdresses.setDisabled(isReadOnly).setReadOnly(isReadOnly);
        }
        if (this.fieldSetCoordAssist) {
            this.fieldSetCoordAssist.setDisabled(isReadOnly).setReadOnly(isReadOnly);
        }
        if (this.fieldSetDivers) {
            this.fieldSetDivers.setDisabled(isReadOnly).setReadOnly(isReadOnly);
        }
        if (this.fieldSetSatisfaction) {
            this.fieldSetSatisfaction.setReadOnly(isReadOnly);
        }

        if (this.fieldSetCoordonnees) {
            this.fieldSetCoordonnees.setDisabled(isReadOnly).setReadOnly(isReadOnly);
        }
    }

    /**
     * Génère le rendu de l'aperçu correspondant au fichier en consultation :
     *  - sous forme d'une balise HTML img lorsque le fichier est une image
     *  - sous forme d'un lien HTML lorsque le fichier n'est pas une image
     * @param file fichier sélectionné
     * @returns {*}
     */
    private renderPreviewUploadFile(file: any): React.ReactElement<any> {
        let fileTag: React.ReactElement<any> = null;
        let format;
        let size;
        if (file) {
            const split = file.filename.split(".");
            format = split ? split[split.length - 1].toUpperCase() : "";
            size = this.formatBytes(file.size, 2);
        }

        const info =  format && size ? <span className="file-info">{"( " + format + " - " + size + " ) "}</span> : null;
        if (file && file.id > -1) {
            const urlfile: string = Utils.buildContextPath("/services/partenaires/" + this.props.pageAttributes.id + "/photo");

            // Lorsque le fichier Photo n'est pas une image, on affiche simplement un lien
            // L'attribut data-pass-thru="true" est nécessaire pour court-circuiter le routeur client
            // (car ce lien pointe directement vers une ressource fournie par la partie /services)
            // Ensuite :
            // - si le navigateur est capable d'ouvrir le fichier :
            // l'attribut target permet de l'ouvrir dans un nouvel onglet
            // la valeur est unique par fichier : ainsi, un deuxième clic sur le lien ouvre le fichier dans le même onglet,
            // mais le lien d'un autre fichier s'ouvre dans un autre onglet
            // - si le navigateur ne sait pas ouvrir le fichier, il propose un telechargement
            const fileTarget = "newTabForPhoto" + file.id;


            fileTag =
                <div className="grid-form-field ">
                    <div className="">
                        <a href={urlfile} data-pass-thru="true"
                            target={fileTarget}>{this.i18n("partenaireFichePage.form.fields.photo.altImage")}</a>{info}
                    </div>
                </div>;
        } else if (file && file.fileName) {
            /* Le fichier vient d'être sélectionné : on affiche son nom */
            fileTag =
                <Row>
                    <div className="blocLabel">
                        <label htmlFor="photo" id="photoLabel">
                            <span
                                className="inputLabel">{this.i18n("partenaireFichePage.form").fields.photo.label}</span>
                        </label>
                    </div>
                    <div className="grid-form-field ">
                        <div className="">{file.fileName}{info}</div>
                    </div>
                </Row>;
        }
        return fileTag;
    }

    /**
     * conversion de la taille du fichier en chaine de caractère en bytes
     * @param bytes 
     * @param decimals 
     */
    formatBytes(bytes,decimals: number) {
        if (bytes === 0) return "0 Bytes";
        const k = 1000;
        const dm = decimals || 2;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        
       const  i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
     }
}
