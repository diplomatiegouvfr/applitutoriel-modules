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
import { URL_PAR_PHOTO, URL_PARTENAIRES } from "src/utils/urls";
import { HornetRequest, SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
import { FichePartenairePageService } from "src/services/page/par/par-fpa-service";
import { Promise } from "hornet-js-utils/src/promise-api";
import { ReferentielPaysServicePageMockImpl } from "src/mock/services/page/ref/ref-pays-service-page-mock-impl";
import { PartenaireResult } from "src/services/type/par/par-types";
import * as secteurs from "src/resources/mock/adm/adm-lst-data.json";
import * as tableauDePartenaires1 from "src/resources/mock/par/par-rpa-data-1.json";
import * as tableauDePartenaires2 from "src/resources/mock/par/par-rpa-data-2.json";
import * as tableauDePartenaires3 from "src/resources/mock/par/par-rpa-data-3.json";
import * as tableauDePartenaires4 from "src/resources/mock/par/par-rpa-data-4.json";
import * as villes from "src/resources/mock/par/par-rpa-villes.json";
import * as pays from "src/resources/mock/par/par-pays-data.json";
import { ReferentielPaysService } from "src/services/data/ref/ref-pays-service";

const logger: Logger = Logger.getLogger("applitutoriel-js-common.mock.services.data.par.fiche-partenaire-service-mock-impl");

/**
 * Implementation des services pour les partenaires 
 * @class
 * @implements {FichePartenaireService}
 * @extends {ServiceApi}
 */

export class FichePartenaireServicePageMockImpl extends FichePartenairePageService {

    /** service de gestion des pays */
    private paysService: ReferentielPaysServicePageMockImpl = new ReferentielPaysServicePageMockImpl();

    /**
     * liste les produit
     * @param {number} id identifiant du partenaire à récupérer
     * @return Promise
     */
    fichePartenaire(id: number): Promise<any> {
        let idPartenaire: number = parseInt((<any>id), 10);
        let result = [];
        result = result.concat((<any>tableauDePartenaires1).data.liste);
        result = result.concat((<any>tableauDePartenaires2).data.liste);
        result = result.concat((<any>tableauDePartenaires3).data.liste);
        result = result.concat((<any>tableauDePartenaires4).data.liste);
        logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let partenaire: PartenaireResult = _.find(result, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        partenaire[ "ZMOCK" ] = true;

        return Promise.resolve({ villes: villes[ "data" ], pays: pays[ "data" ], partenaire: partenaire });

    }

    /**
     * Récupère les données nécessaires à l'écran de fiche partenaire
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return this.paysService.listerVilles().then((villes: any) => {
            return this.paysService.listerPays().then((pays: any) => {
                return Promise.resolve({ villes: villes, pays: pays });
            });
        });
    }

    rechercherNationalites(nationalite: string = "", spinner: SpinnerType = SpinnerType.Default): Promise<any> {
        return this.paysService.rechercherNationalites(nationalite);
    }

    /**
     * liste tous les secteurs
     * @return Promise
     */
    listerSecteurs(): Promise<any> {
        logger.trace("SERVICES - lister");
        return Promise.resolve((<any>secteurs).data);
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {
        let idPartenaire: number = parseInt((<any>id), 10);
        let result = [];
        result = result.concat((<any>tableauDePartenaires1).data.liste);
        result = result.concat((<any>tableauDePartenaires2).data.liste);
        result = result.concat((<any>tableauDePartenaires3).data.liste);
        result = result.concat((<any>tableauDePartenaires4).data.liste);
        logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let rpartenaire: PartenaireResult = _.find(result, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        partenaire[ "ZMOCK" ] = true;
        return Promise.resolve({ villes: villes[ "data" ], pays: pays[ "data" ], partenaire: rpartenaire });
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - lirePhoto : ", id);
        let request: HornetRequest = { method: "get", url: this.buildUrl(URL_PARTENAIRES + "/" + id + URL_PAR_PHOTO) };
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);
    }

    /**
     * node >v10 does not parse JSON buffer too a buffer so we must detect and create a buffer
     * @param buff
     * @returns {*}
     */
    protected convertBufferToArray(buff: any): any {
        var buffer = buff;
        if (buff !== undefined && Buffer.isBuffer(buff)) {
            buffer = Buffer.from(buff).toJSON();
        }
        return buffer;
    }

    /**
     * convertion d'un partenaire
     * @param {object} webPartenaire
     * @returns {object}
     */
    protected convertToRemotePartenaire(webPartenaire: any): any {

        let remotePartenaire: any = _.assign({}, webPartenaire);
        remotePartenaire.satisfaction = (_.isArray(webPartenaire.satisfaction.ids)) ? webPartenaire.satisfaction.ids.join(",") : "";

        if (remotePartenaire.photo && remotePartenaire.photo.contenu) {
            let photo: any = remotePartenaire.photo;
            let buffer = this.convertBufferToArray(photo.contenu);
            remotePartenaire.photo = {
                id: null,
                nom: photo.originalname,
                originalname: photo.originalname,
                name: photo.originalname,
                mimeType: photo.mimeType,
                encoding: photo.encoding,
                size: photo.size,
                data: buffer.data
            };
            photo = null;
        }
        return remotePartenaire;
    }

}