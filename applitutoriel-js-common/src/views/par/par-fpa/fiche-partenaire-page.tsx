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
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Tabs, TabsProps } from "hornet-js-react-components/src/widget/tab/tabs";
import { Tab } from "hornet-js-react-components/src/widget/tab/tab";
import { TabHeader } from "hornet-js-react-components/src/widget/tab/tab-header";
import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
import { URL_PARTENAIRES } from "src/utils/urls";
import { NotificationManager, Notifications } from "hornet-js-core/src/notification/notification-manager";
import { PaysMetier } from "src/models/ref/ref-pay-mod";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { DataSourceConfigPage } from "hornet-js-core/src/component/datasource/config/service/datasource-config-page";
import { FichePartenaireResult } from "src/services/type/par/par-fpa-res";
import { FichePartenairePageService } from "src/services/page/par/par-fpa-service";
import { SecteursTab } from "src/views/par/par-fpa/secteurs-tab";
import { ProduitMetier } from "src/models/pro/pro-mod";
import { ProduitsTab } from "src/views/par/par-fpa/produits-tab";
import { IdentiteTab, IdentiteTabDatasourcesService } from "src/views/par/par-fpa/identite-tab";
import { FichePartenaireTitrePage } from "src/views/par/par-fpa/fiche-partenaire-titre-page";
import { PartenaireMetier } from "src/models/par/par-mod";
import { Promise } from "hornet-js-utils/src/promise-api";

const logger: Logger = Logger.getLogger("applitutoriel.views.par.par-fpa.fiche-partenaire-page");

export const PAR_MODE_CONSULTER: string = "consulter";
export const PAR_MODE_EDITER: string = "editer";
export const PAR_MODE_CREER: string = "creer";

/**
 * Ecran de détail de partenaire en lecture ou en édition
 */
export class FichePartenairePage extends HornetPage<FichePartenairePageService, HornetPageProps, any> {

    private fichePartenaireTitre: FichePartenaireTitrePage;
    private tabs: Tabs<TabsProps>;
    private identiteTab: IdentiteTab;

    private dataSourceNationalite: DataSource<PaysMetier>;
    private dataSourceProduits: PaginateDataSource<any>;
    private dataSourceSecteurs: DataSource<any>;

    private countNewTab: number = 1;
    private tabAddedNumber: number = 1;

    constructor(props?: HornetComponentProps, context?: any) {
        super(props, context);

        this.dataSourceNationalite = new DataSource<PaysMetier>(new DataSourceConfigPage(this, this.getService().rechercherNationalites), {
            value: "id",
            text: "nationalite"
        });

        this.dataSourceProduits = new PaginateDataSource<any>([], {
            pageIndex: 0,
            itemsPerPage: 10,
            totalItems: 0
        }, {});

        this.dataSourceSecteurs = new DataSource<any>(new DataSourceConfigPage(this, this.getService().listerSecteurs));
    }

    updateClient() {
        if (this.attributes.mode === PAR_MODE_CREER) {
            this.identiteTab.setPartenaire(new PartenaireMetier(), this.attributes.mode);
        } else {
            this.getService().fichePartenaire(this.attributes.id).then((result: FichePartenaireResult) => {
                let products = [];
                if (result.partenaire) {
                    this.identiteTab.setPartenaire(result.partenaire, this.attributes.mode);
                    products = result.partenaire.listeProduit;
                    /* MaJ du titre de la page avec le nom et prénom */
                    this.fichePartenaireTitre.setState({
                        title: this.i18n("partenaireFichePage.titre", {
                            "nom": Utils.getValueObject(result.partenaire, "nom"),
                            "prenom": Utils.getValueObject(result.partenaire, "prenom")
                        })
                    });
                }

                /*maj tableau de produits*/
                if (!products || Array.isArray(products) && products.length == 0) {
                    products = [];
                    for (let i: number = 1; i < 50; i++) {
                        products.push({ nom: "dummy" + i, desc: "dummyDesc" + i } as ProduitMetier);
                    }
                }
                this.dataSourceNationalite.init(null);
                this.dataSourceProduits.deleteAll();
                this.dataSourceProduits.add(true, products);
                this.identiteTab.handleIsVIPChange();
                this.identiteTab.selectIntoIsClientDataSource(result.partenaire.client);
            });
        }
    }

    /** @inheritDoc */
    prepareClient(): void {

        let p: Promise<any>;

        if (this.attributes.mode !== PAR_MODE_CREER) {
            p = this.getService().fichePartenaire(this.attributes.id);
        } else {
            p = this.getService().getFormData();
        }
        p.then((result: FichePartenaireResult) => {
            let products = [];
            if (result.partenaire) {
                this.identiteTab.setPartenaire(result.partenaire, this.attributes.mode);
                products = result.partenaire.listeProduit;
                /* MaJ du titre de la page avec le nom et prénom */
                this.fichePartenaireTitre.setState({
                    title: this.i18n("partenaireFichePage.titre", {
                        "nom": Utils.getValueObject(result.partenaire, "nom"),
                        "prenom": Utils.getValueObject(result.partenaire, "prenom")
                    })
                });
            }

            /*maj tableau de produits*/
            if (!products || Array.isArray(products) && products.length == 0) {
                products = [];
                for (let i: number = 1; i < 50; i++) {
                    products.push({ nom: "dummy" + i, desc: "dummyDesc" + i } as ProduitMetier);
                }
            }
            this.dataSourceNationalite.init(null);
            this.dataSourceProduits.add(true, products);
            this.identiteTab.setPays(result.pays);
            this.identiteTab.setVilles(result.villes);
            this.identiteTab.handleIsVIPChange();
            this.identiteTab.selectIntoIsClientDataSource(result.partenaire.client);

        }).catch((error) => {
            logger.warn(error.message);
        });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("FichePartenairePage render");
        return (
            <div>
                <FichePartenaireTitrePage ref={(page) => {
                    this.fichePartenaireTitre = page
                }} title={this.i18n("partenaireFichePage.titre", {
                    nom: "",
                    prenom: ""
                }) + this.i18n("partenaireFichePage.suffixeCreation")} />
                <br />

                <Tabs ref={(tabs) => {
                    this.tabs = tabs
                }} id="tabsPartenaire" selectedTabIndex={0}
                    addTabFunction={this.addTab}
                    deleteTabFunction={this.removeTab}
                >
                    <Tab id="tab1" onSelect={this.onSelect}
                        title={this.i18n("partenaireFichePage.ongletIdentiteTitre")}
                    >
                        <IdentiteTab
                            ref={(tab) => {
                                this.identiteTab = tab
                            }}
                            dataSourcesService={new IdentiteTabDatasourcesService(this.dataSourceNationalite)}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                            pageAttributes={{
                                id: this.attributes.id,
                                mode: this.attributes.mode,
                                vip: ((this.props.navigateData && this.props.navigateData.vip) || false)
                            }} />
                    </Tab>
                    <Tab id="tab2" title={this.i18n("partenaireFichePage.ongletListeProduitTitre")}
                        onSelect={this.onSelect}>
                        <ProduitsTab dataSource={this.dataSourceProduits} />
                    </Tab>

                    <Tab id="tab3" title={this.i18n("partenaireFichePage.ongletListeSecteursTitre")}
                        isDeletable={true}
                        mount={false}
                        onSelect={this.onSelect}
                        onClick={this.loadAsyncTab}>
                        <SecteursTab dataSource={this.dataSourceSecteurs} />
                    </Tab>
                    {/*{this.attributes.mode != "consulter" ?*/}
                    {/*<Tab id="tab4" mount={false} onClick={this.addTab}>*/}


                    {/*<TabHeader>*/}
                    {/*<a href={"#"} title={"Ajouter un onglet 'Produit'"} onClick={this.addTab}>+</a>*/}
                    {/*</TabHeader>*/}
                    {/*</Tab> : <div/>}*/}
                </Tabs>
            </div>
        );
    }


    /**
     * Sélection des tabs
     */
    onSelect(Tab, flag) {
        if (flag) {
            logger.trace("j'arrive sur l'onglet : ", Tab);
        } else {
            logger.trace("je quitte l'onglet : ", Tab);
        }
    }

    /**
     * Ajouter des onglets dynamiquement
     */
    addTab() {
        if (!this.countNewTab) {
            this.countNewTab = 0;
        }

        if (!this.tabAddedNumber) {
            this.tabAddedNumber = 0
        }

        const index = "newSecteurTab" + this.tabAddedNumber;
        const cb: any = (e: Element): void => {
            const tabInserted = this.tabs.getTabById(index);
            if (tabInserted && tabInserted.props && tabInserted.props.index) {
                this.tabs.showPanel(tabInserted.props.index);
                const elem = document.querySelector(`#tabsPartenaire-tabList-item-${tabInserted.props.index}`) as any;
                if (elem) {
                    elem.focus();
                }
            }
        };

        this.tabs.addElements(this.tabs.getTabsNumber(), <Tab id={index} isDeletable={true}
            deleteTabFunction={this.removeNewTab.bind(index)}>
            <TabHeader>
                <div className={"onglet-secteur-header-title"}>{"New Produits " + this.tabAddedNumber}</div>
            </TabHeader>
            <TabContent>
                <div aria-live={"polite"}>
                    <ProduitsTab dataSource={this.dataSourceProduits} />
                </div>
            </TabContent>
        </Tab>, cb);

        this.countNewTab++;
        this.tabAddedNumber++;
    }

    removeTab() {
        let index = this.tabs.getCurrentIndexSelected();
        let pos = this.tabs.getTabPosition(index);
        let tab = this.tabs.getTabByIndex(this.tabs.getCurrentIndexSelected());

        if (tab && tab.props && tab.props.id) {
            this.tabs.removeElementsByIdWithCb(tab.props.id, () => {
                if (this.tabs.getTabsNumber() !== 0) {
                    if (pos !== 0) {
                        this.tabs.showPanel(this.tabs.getIndexAt(pos - 1));
                    } else {
                        this.tabs.showPanel(this.tabs.getIndexAt(0));
                    }
                }
            });
        }
    }

    removeNewTab() {
        this.removeTab();
        this.countNewTab--;
    }

    /**
     * Supprimer les onglets créés dynamiquement
     */
    delTabs(): void {
        let listIds: string[] = [];
        for (let i = 1; i <= this.countNewTab; i++) {
            listIds.push("newSecteurTab" + i);
            listIds.push("newProduitTab" + i);
        }
        this.tabs.removeElementsById(...listIds);
        this.countNewTab = 0;
    }

    /**
     * Méthode de chargement de l'onglet asynchrone
     * @param tab
     * @param header
     * @param index
     */
    loadAsyncTab(tab, header, index) {
        logger.debug("loadAsyncTab");
        if (!this.dataSourceSecteurs.status) {
            this.dataSourceSecteurs.init();
        }
    }

    /**
     * Méthode de Navigation exécutée lors de la soumission du formulaire du Tab1
     * @param partenaireData
     */
    private onSubmit(partenaireData: any): void {
        logger.trace("Submit du formulaire fiche partenaire");
        if (this.attributes.mode == PAR_MODE_CREER || this.attributes.mode == PAR_MODE_EDITER) {
            if (this.attributes.mode == PAR_MODE_EDITER && partenaireData.photo && partenaireData.photo.id && (partenaireData.photo.data == null)) {
                if (this.identiteTab.partenaire.photo.data && this.identiteTab.partenaire.photo.data.data) {
                    partenaireData.photo = this.identiteTab.partenaire.photo
                    partenaireData.photo.data = this.identiteTab.partenaire.photo.data.data
                } else {
                    partenaireData.photo = this.identiteTab.partenaire.photo
                }
            }
            this.getService().modifier(this.attributes.id, partenaireData, (event) => {
                logger.trace(event);
            }).then(() => {
                let notifText: string = (this.i18n("info.message.IN-PA-FPA-01") as string)
                    .replace("{nom}", partenaireData.nom)
                    .replace("{prenom}", partenaireData.prenom);
                logger.trace("Retour écran de recherche de partenaires");

                let criteres = (this.props.navigateData && this.props.navigateData.criteres) ? this.props.navigateData.criteres : {};
                let dataSource = (this.props.navigateData && this.props.navigateData.dataSource) ? this.props.navigateData.dataSource : null;
                if (dataSource != null) {
                    this.navigateTo(URL_PARTENAIRES, {
                        criteres,
                        dataSource,
                        forceReload: true,
                        create: true,
                    }, () => {
                        NotificationManager.notify(null, "main-form", null, Notifications.makeSingleNotification("PARTENAIRE_SAVED", notifText));
                    });
                } else {
                    this.navigateTo(URL_PARTENAIRES, { criteres, create: true}, () => {
                        NotificationManager.notify(null, "main-form", null, Notifications.makeSingleNotification("PARTENAIRE_SAVED", notifText), null, null, null, ()=>{
                            const elem = document.querySelector(".messageBox .info-button") as any;
                            if (elem) {
                                elem.focus();
                            }
                        });
                        
                    });
                }

            });
        }
    }

    /**
     * méthode de Navigation exécutée lors du clic sur le bouton Annuler Tab1
     */
    private onCancel(): void {
        const criteres = (this.props.navigateData && this.props.navigateData.criteres) ? this.props.navigateData.criteres : {};
        const dataSource = (this.props.navigateData && this.props.navigateData.dataSource) ? this.props.navigateData.dataSource : {};
        const previous = this.props.navigateData && this.props.navigateData.previous ? this.props.navigateData.previous : null;

        const url = "/partenaires";
        this.navigateTo(url, { criteres, dataSource, previous }, null);
    }

    componentDidMount(){
        super.componentDidMount();
        const elem = document.getElementById("tabsPartenaire-tabList-item-0");
        if (elem) {
            elem.focus();
        }
    }

}