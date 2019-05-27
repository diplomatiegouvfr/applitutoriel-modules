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
 * applitutoriel-js-lite - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */

import { Logger } from "hornet-js-logger/src/logger";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { FormRecherchePartenaire, PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";

import { PartenaireDAO } from "src/dao/partenaire-dao";
import { VilleDAO } from "src/dao/ville-dao";
import { PaysDAO } from "src/dao/pays-dao";
import { PartenaireMetier } from "applitutoriel-js-common/src/models/par/par-mod";
import { ProduitPartenaireDAO } from "src/dao/produit-partenaire-dao";
import { PhotoDAO } from "src/dao/photo-dao";
import { Transactional } from "hornet-js-database/src/decorators/dec-transactional";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { SecteurServiceImpl } from "src/services/data/sec/secteur-service-impl";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { Injector } from "hornet-js-core/src/inject/injector";
import { Promise } from "hornet-js-utils/src/promise-api";
import { PaysMetier } from "applitutoriel-js-common/src/models/ref/ref-pay-mod";

const logger: Logger = Logger.getLogger("applitutoriel.src.services.data.par.partenaire-service-impl");

class TablePartenaireImpl {
    listeCriteres: FormRecherchePartenaire;
    nbTotal: number;
    liste: PartenaireResult[];
    pagination: Pagination;
}

class PartenaireResultImpl implements PartenaireResult {
    id: number;
    nom: string;
    prenom: string;
    proCourriel: string;
    organisme: string;
    vip: boolean;
    dateModif: number;
}

/**
 * Implementation des services de recherche pour les partenaires
 * @class
 * @implements {PartenaireService, IService}
 */
export class PartenaireServiceImpl extends PartenaireService {
    private partenaireDAO: PartenaireDAO = new PartenaireDAO();
    private produitPartenaireDAO: ProduitPartenaireDAO = new ProduitPartenaireDAO();
    // DAO des villes
    private villeDAO: VilleDAO = new VilleDAO();
    // DAO des pays
    private paysDAO: PaysDAO = new PaysDAO();
    //  DAO des photos
    private photoDAO: PhotoDAO = new PhotoDAO();

    //  service de gestion des partenaires
    private secteurApi: SecteurServiceImpl = new SecteurServiceImpl();

    rechercher(data: PartenaireRechercheParameter, reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - rechercher : ", data, reqMimeType);

        function nullToBoolean(nullData: any) {
            if (nullData == null) {
                nullData = false;
            }
            return nullData;
        }

        const isClient = nullToBoolean(data.criteres.partenaire.client);
        const keysort: string = (data.sort ? data.sort[ 0 ].key : "id_partenaire") as string;
        const p = this.partenaireDAO.selectByCriteres(isClient, data.criteres.partenaire.vip, data.criteres.startDate, data.sort);
        return p.then((listPartenaire: Array<PartenaireMetier>) => {
            const tablePartenaire: TablePartenaireImpl = new TablePartenaireImpl();
            tablePartenaire.nbTotal = listPartenaire.length;
            tablePartenaire.pagination = this.paginationServer(data.pagination, listPartenaire);
            tablePartenaire.listeCriteres = data.criteres;
            tablePartenaire.liste = new Array<PartenaireResult>();
            const filteredListPartenaire: Array<PartenaireMetier> =
                this.selectionListePartenaire(tablePartenaire.pagination, listPartenaire);
            filteredListPartenaire.forEach((partenaire: PartenaireMetier) => {
                const partenaireResult: PartenaireResult = new PartenaireResultImpl();
                partenaireResult.id = partenaire.id;
                partenaireResult.nom = partenaire.nom;
                partenaireResult.prenom = partenaire.prenom;
                partenaireResult.proCourriel = partenaire.proCourriel;
                partenaireResult.organisme = partenaire.organisme;
                partenaireResult.vip = partenaire.vip;
                partenaireResult.dateModif = partenaire.dateModif;
                tablePartenaire.liste.push(partenaireResult);
            });
            return tablePartenaire;
        });
    }

    private selectionListePartenaire(pagination: Pagination, dataPartenaires: Array<PartenaireMetier>): Array<PartenaireMetier> {
        // Pagination serveur
        const minIndex: number = (pagination.pageIndex - 1) * pagination.itemsPerPage;
        const maxIndex: number = Math.min(pagination.totalItems, minIndex + pagination.itemsPerPage);

        return dataPartenaires.slice(minIndex, maxIndex);
    }

    private paginationServer(pagination: Pagination, dataPartenaires: Array<PartenaireMetier>): Pagination {
        const res: Pagination = pagination || { itemsPerPage: 0 };
        res.totalItems = dataPartenaires.length;
        if (!res.pageIndex || res.pageIndex === 0) {
            res.pageIndex = 1;
        }
        const itemsPerPage: number = !res.itemsPerPage || res.itemsPerPage === 0 ? 10 : res.itemsPerPage;

        // Recuperation du nombre total de pages
        const nombrePages: number = Math.max(1, Math.ceil(res.totalItems / itemsPerPage));

        // Recalcul indexPage
        const indexPagePartenaires: number = Math.min(res.pageIndex, nombrePages);
        res.pageIndex = indexPagePartenaires;
        res.itemsPerPage = itemsPerPage;

        return res;
    }

    /**
     * Suppression d'un partenaire
     */
    supprimer(id: any): Promise<any> {
        return this.suppressionDunPartenaire(id).then((retour) => {
            return true;
        }).catch((error) => {
            return false;
        });
    }

    supprimerPage(id: any): Promise<any> {
        // Non utilisée
        return Promise.resolve(false);
    }

    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        return this.suppressionDesPartenaires(partenaires)
            .catch((error) => {
                return {};
            }).then((identifiants: number[]) => {
                return identifiants;
            });
    }

    private suppressionDesPartenaires(partenaires: PartenaireResult[]): Promise<number[] | {}> {
        return new Promise<number[] | {}>((resolve, reject) => {
            const idsConfirmation: Array<number> = new Array<number>();
            const idsError: Array<number> = new Array<number>();
            return Promise.each(partenaires, (partenaire: PartenaireResult) => {
                return this.suppressionDunPartenaire(partenaire.id).then((result: boolean) => {
                    idsConfirmation.push(partenaire.id);
                }).catch((error) => {
                    idsError.push(partenaire.id);
                });
            }).catch((error) => {
                reject(error);
            }).then((result) => {
                resolve(idsConfirmation);
            });
        });
    }

    @Transactional({ configDatabase: Injector.getRegistered("databaseConfigName") })
    private suppressionDunPartenaire(id: number): Promise<any> {
        return this.produitPartenaireDAO.deleteByIdGeneric(id).then(() => {
            return this.partenaireDAO.deleteByIdIfNotVIP(id);
        });
    }

    editer(id: number, data): Promise<any> {
        return this.partenaireDAO.updateById(id, data).catch(function (err) {
            throw new BusinessError(err);
        });
    }

    creer(data, cb: any) {
        this.partenaireDAO.insert(data).catch(function (err) {
            throw new BusinessError(err);
        }).then(cb);
    }

    /**
     * Cherche le partenaire et ses informations pour un id
     */
    chercherPartenaireById(id: number): Promise<PartenaireMetier> {
        return this.partenaireDAO.selectFromId(id)
            .catch(function (err) {
                throw new BusinessError(err);
            });
    }

    chercherPartenairesByIds(ids: Array<number>): Promise<Array<PartenaireMetier>> {
        return this.partenaireDAO.selectAll(ids)
            .catch(function (err) {
                throw new BusinessError(err);
            });
    }

    exporter(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporter : ", reqMimeType);
        return Promise.resolve(true);
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporterODF : ", reqMimeType);
        return Promise.resolve(true);
    }

    listerSecteurs(): Promise<any> {
        return this.secteurApi.lister().then((results) => {
            logger.log("results", results);
        });
    }

    /**
     * Récupère les données liés au partenaires
     * @param id du partenaire
     * @return Promise<object>
     */
    fichePartenaire(id: number): Promise<any> {
        logger.trace("fichePartenaire id :", id);
        return this.partenaireDAO.selectFromId(id).then((result) => {
            const res = result;
            if (res && res.satisfaction) {
                res.satisfaction = { ids: (res.satisfaction as string).split(",") };
            }
            return res;
        });
    }

    /**
     * Récupère les données nécessaires pour l'affichage du partenaire
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return Promise.all([this.villeDAO.listerVilles(), this.paysDAO.findAllGeneric<PaysMetier>(null, PaysMetier)])
            .then((results: any[]) => {
                return ({
                    villes: results[0],
                    pays: results[1]});
            });
    }

    /**
     * Modifie ou crée un partenaire en base
     * @return Promise<object>
     */
    @Transactional({ configDatabase: Injector.getRegistered("databaseConfigName") })
    modifier(id: any, partenaire: any): Promise<any> {
        logger.trace("modifier id :", id);
        if (partenaire.satisfaction.ids) {
            partenaire.satisfaction = partenaire.satisfaction.ids.join(",");
        } else {
            partenaire.satisfaction = "";
        }
        partenaire.vip = this.isPartenaireVip(partenaire.vip);
        return this.insertPhoto(partenaire).then((retourPartenaire) => {
            if (id != null) {
                retourPartenaire.id = id;
                return this.partenaireDAO.updateById(id, retourPartenaire).then(retourApi => {
                    logger.trace("Retour d\"enregistrement OK", retourApi);
                    return retourApi;
                });
            } else {
                return this.partenaireDAO.insert(retourPartenaire).then(retourApi => {
                    logger.trace("Retour d\"enregistrement OK", retourApi);
                    return retourApi;
                });
            }
        });
    }

    isPartenaireVip(vip: any): boolean {
        let res: boolean = vip;
        if (vip === "undefined" || vip == null) {
            res = false;
        }
        return res;
    }

    /**
     * Insère la photo du partenaire s'il celle-ci existe.
     * @return Promise<object>
     */
    insertPhoto(partenaire: PartenaireMetier): Promise<any> {
        if (partenaire.photo != null) {
            return this.photoDAO.insert(partenaire.photo).then(retourApi => {
                logger.trace("Retour d\"enregistrement OK", retourApi);
                partenaire.photo.id = retourApi.id;
                return partenaire;
            });
        } else {
            return Promise.resolve(partenaire);
        }
    }

    /**
     * Récupère la photo du partenaire
     * @return Promise<object>
     */
    lirePhoto(idPartenaire: any): Promise<any> {
        logger.trace("lirePhoto du partenaire id :", idPartenaire);
        return this.partenaireDAO.selectFromId(idPartenaire).then((partenaire: PartenaireMetier) => {
            if (!partenaire.photo) throw new BusinessError("ER-PA-FPA-10");
            return partenaire.photo;
        });
    }
}
