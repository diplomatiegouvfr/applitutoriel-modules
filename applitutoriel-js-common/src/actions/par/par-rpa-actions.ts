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

import * as _ from "lodash";
import { PartenaireService } from "src/services/data/par/partenaire-service";
import { MediaType, MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { ParRpaValidateIsVipEndDate } from "src/views/par/par-rpa-validate-end-date";
import { DataValidator } from "hornet-js-core/src/validation/data-validator";
import { ParRpaValidateSectorStartDate } from "src/views/par/par-rpa-validate-start-date";
import { PartenaireResult } from "src/services/type/par/par-types";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { BusinessErrorList } from "hornet-js-utils/src/exception/business-error-list";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { ITEMS_PER_PAGE_ALL, Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { ResultFile } from "hornet-js-core/src/result/result-file";
import { ResultCSV } from "hornet-js-core/src/result/result-csv";
import { ResultPDF } from "hornet-js-core/src/result/result-pdf";
import { ResultStream } from "hornet-js-core/src/result/result-stream";
import { OptionsCSV, OptionsOpenDocument, OptionsPDF } from "hornet-js-core/src/result/hornet-result-interface";
import { DateUtils } from "hornet-js-utils/src/date-utils";
import { ResultODT } from "hornet-js-core/src/result/result-odt";
import { ResultODS } from "hornet-js-core/src/result/result-ods";
import { Promise } from "hornet-js-utils/src/promise-api";
import * as path from "path";

import * as rpaValidationSchema from "src/views/par/par-rpa-validation.json";
const logger: Logger = Logger.getLogger("applitutoriel.actions.par.par-rpa-actions");

/**
 * Action de recherche de partenaires répondant aux critères indiqués
 */
export class Rechercher extends RouteActionService<any, PartenaireService> {

    /**
     * Renvoie l'objet contenant les éléments nécessaires à la validation des critères de recherche.
     * @override
     */
    getDataValidator(): DataValidator {
        return new DataValidator(rpaValidationSchema, [ new ParRpaValidateIsVipEndDate(), new ParRpaValidateSectorStartDate() ]);
    }

    execute(): Promise<any> {

        logger.trace("ACTION Rechercher.PartenairesRouteAction");
        logger.trace("Partenaire Action Rechercher, criterias:", this.req.body);

        if (this.req.body) {
            const payload: any = this.getPayload();

            if (!payload) {
                logger.warn("Recherche non valide : Accès direct");
                Promise.resolve(true);
            }

            logger.debug("Partenaire Action Rechercher, criteres to send :", payload);

            return this.getService().rechercher(payload, this.getMediaType());
        } else {
            Promise.resolve(true);
        }
    }
}

/**
 * Suppression d'un partenaire ayant l'identifiant indiqué
 */
export class SupprimerPartenaire extends RouteActionService<{ id: string }, PartenaireService> {

    execute(): Promise<any> {
        logger.trace("ACTION SupprimerPartenaire id=", this.attributes.id);
        return this.getService().supprimer(this.attributes.id);
    }
}

/**
 * Suppression plusieurs partenaires en une seule action
 */
export class SupprimerEnMasse extends RouteActionService<{ id: string }, PartenaireService> {

    execute(): Promise<any> {
        logger.trace("ACTION SupprimerEnMasse.PartenairesRouteAction");
        logger.debug("Suppression des partenaires :", this.req.body);
        if (this.req.body) {
            const partenairesNotVip: PartenaireResult[] = [];
            // Contrôle IsVip
            this.req.body.map((item: PartenaireResult) => {
                if (!item.vip) {
                    partenairesNotVip.push(item);
                }
            });

            logger.debug("partenairesNotVip :", partenairesNotVip);
            if (partenairesNotVip.length > 0) {

                return this.getService().supprimerEnMasse(partenairesNotVip).catch((error: any) => {
                    if (error instanceof TechnicalError) {
                        /* En cas d'erreur technique on utilise le traitement standard */
                        throw error;
                    }
                    const ids: number[] = [];
                    if (error instanceof BusinessErrorList) {
                        /* En cas d'erreurs métier, plusieurs partenaires ont pu cependant être supprimés avec succès.
                         * Ceux qui ne sont pas retournés dans la liste ids seront notifiés en erreur. */
                        const errors: BusinessError[] = (error as BusinessErrorList).getErrors();
                        errors.forEach((error: BusinessError) => {
                            if (error.code === "IN-PA-RPA-01") {
                                ids.push(parseInt(error.args[ "$2" ], 10));
                            }
                        });
                    }
                    return Promise.reject(ids);
                });
            } else {
                return Promise.resolve(true);
            }
        } else {
            return Promise.resolve(true);
        }
    }
}

export class Export extends RouteActionService<{ mediaType: string }, PartenaireService> {
    execute(): Promise<ResultStream | ResultFile> {
        logger.trace("ACTION Export.PartenairesRouteAction");
        logger.debug("Partenaire Action Export - récupération des criteres de recherche dans la session");

        const criteres: any = this.getPayload() && this.getPayload().criteres;

        if (criteres) {
            logger.debug("Critères trouvés dans la session ", criteres);
            const mediaType: MediaType = this.getMediaType();

            logger.debug("MIMETYPE :", mediaType.MIME);

            // Pour l'export on force à avoir tous les items dans la recherche
            const payload: any = _.assign({}, {
                criteres,
                pagination: { pageIndex: 0, itemsPerPage: ITEMS_PER_PAGE_ALL } as Pagination,
            });
            return this.getService().rechercher(payload, mediaType, this.res).then((retourApi) => {
                return new ResultStream(retourApi, retourApi.mimeType);
            });
        }
    }
}

export class ExportLite extends RouteActionService<any, PartenaireService> {
    execute(): Promise<ResultFile> {
        logger.trace("ACTION Export.PartenairesRouteAction");
        logger.debug("Partenaire Action Export - récupération des criteres de recherche dans la session");

        const criteres: any = this.getPayload() && this.getPayload().criteres;

        if (criteres) {
            logger.debug("Critères trouvés dans la session ", criteres);
            const mediaType: MediaType = this.getMediaType() as MediaType;
            const originalMediaType: MediaType = this.getMediaType() as MediaType;

            logger.debug("MIMETYPE :", mediaType.MIME);

            // Pour l'export on force à avoir tous les items dans la recherche
            const payload: any = {
                criteres,
                pagination: { pageIndex: 0, itemsPerPage: ITEMS_PER_PAGE_ALL } as Pagination,
            };

            const ODT = MediaTypes.ODT;
            const ODS = MediaTypes.ODS;
            const CSV = MediaTypes.CSV;
            const PDF = MediaTypes.PDF;
            return this.getService().rechercher(payload, MediaTypes.JSON).then((retourApi) => {
                let res: ResultFile;
                const dateDebut = DateUtils.formatInTZ(retourApi.listeCriteres.startDate, DateUtils.YMD_Formats[ 0 ]);
                const dataOpenDocument = {
                    title: "Liste des partenaires",
                    tableLabel: "Recherche par date de début : " + dateDebut,
                    fieldNames: {
                        nom: "Nom",
                        prenom: "Prénom",
                        organisme: "Organisme",
                        proCourriel: "Courriel",
                    },
                    data: retourApi.liste,
                };

                if (originalMediaType.SHORT === ODS.SHORT) {
                    res = new ResultODS({
                        data: dataOpenDocument,
                        templateFilePath: path.join(__dirname, "../../resources/templates/partenairesList.ods"),
                        filename: "partenairesListe." + ODS.SHORT,
                    } as OptionsOpenDocument);
                } else if (originalMediaType.SHORT === ODT.SHORT) {
                    res = new ResultODT({
                        data: dataOpenDocument,
                        templateFilePath: path.join(__dirname, "../../resources/templates/partenairesList.odt"),
                        filename: "partenairesListe." + ODS.SHORT,
                    } as OptionsOpenDocument);
                } else if (originalMediaType.SHORT === CSV.SHORT) {
                    res = new ResultCSV({
                        data: retourApi.liste,
                        fields: [ "nom", "prenom", "organisme", "proCourriel" ],
                        filename: "customFileName." + CSV.SHORT,
                    } as OptionsCSV);
                } else if (originalMediaType.SHORT === PDF.SHORT) {
                    res = new ResultPDF({
                        data: retourApi.liste,
                        fields: [ "nom", "prenom", "organisme", "proCourriel" ],
                        fieldNames: [ "Nom", "Prénom", "Organisme", "Courriel" ],
                        definition: {
                            pageSize: "A4",
                            content: [
                                { text: "Liste des partenaires", style: "subheader" },
                                { text: "Recherche par date de début : " + dateDebut },
                                {
                                    style: "tableExample",
                                    table: { headerRows: 2 },
                                    layout: {
                                        fillColor: (i, node) => {
                                            return (i % 2 === 0) ? "#F3F6F8" : null;
                                        },
                                    },
                                } ],
                            header: {
                                columns: [
                                    {
                                        alignment: "right",
                                        text: "" + DateUtils.formatInTZ(new Date(), DateUtils.YMD_Formats[ 0 ]),
                                    },
                                ],
                            },
                            footer: (page, pages) => {
                                return {
                                    columns: [
                                        {
                                            alignment: "left",
                                            text: "footer left",
                                        }, {
                                            alignment: "right",
                                            text: [
                                                " Page ",
                                                { text: page.toString() },
                                                " sur ",
                                                { text: pages.toString() },
                                            ],
                                        },
                                    ],
                                    margin: [ 10, 0 ],
                                };
                            },
                            styles: {
                                tableExample: {
                                    margin: [ 2, 2, 2, 2 ],
                                },
                                tableHeader: {
                                    bold: true,
                                    fontSize: 13,
                                    fillColor: "#8FAFCC",
                                },
                                subheader: {
                                    margin: [ 20, 20, 20, 20 ],
                                    bold: true,
                                    fontSize: 25,
                                    alignment: "center",
                                },
                            },
                        },
                    } as OptionsPDF);
                } else {
                    res = null;
                }
                return res;
            });
        }
    }
}
