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
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { PartenaireResult } from "src/services/type/par/par-types";
import { PartenaireRechercheParameter } from "src/services/type/par/par-rpa-prm";
import { PartenaireService } from "src/services/data/par/partenaire-service";
import { NotFoundError } from "hornet-js-utils/src/exception/not-found-error";
import { Promise } from "hornet-js-utils/src/promise-api";
import * as _ from "lodash";

import * as tableauDePartenaires from "src/resources/mock/par/par-rpa-data.json";
import * as villes from "src/resources/mock/par/par-rpa-villes.json";
import * as pays from "src/resources/mock/par/par-pays-data.json";

const logger: Logger = Logger.getLogger("applitutoriel-js-common.mock.services.data.par.partenaire-service-data-mock-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {RecherchePartenaireService}
 * @extends {ServiceApi}
 */
export class PartenaireServiceDataMockImpl extends PartenaireService {
    /**
     * liste les produits
     * @return Promise
     */
    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any> {
        logger.debug("MOCK- recherche de partenaire", criteres);
        return Promise.resolve((<any>tableauDePartenaires).data);
    }

    supprimer(id): Promise<any> {
        return Promise.resolve(() => {
            logger.debug("MOCK - Suppression du partenaire, id:", id);
            _.remove((<any>tableauDePartenaires).data, function (item: any) {
                if (item.id === id) {
                    return true;
                }
            });
        });

    }

    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        return Promise.resolve();
    }

    //todo: à supprimer ?
    exporter(reqMimeType: MediaType): Promise<any> {
        return Promise.resolve();
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(idPartenaire: number): Promise<any> {
        return Promise.resolve();
    }

    /**
     *
     * @param idPartenaire
     */
    fichePartenaire(id: number): Promise<any> {

        let idPartenaire: number = parseInt(<any>id, 10);
        logger.debug("MOCK - Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let partenaire: PartenaireResult = _.find((<any>tableauDePartenaires).data.liste, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        if (partenaire) {
            return Promise.resolve(partenaire);
        } else {
            throw new NotFoundError({ errorMessage: "partenaire non trouvé" });
        }
    }

    getFormData(): Promise<any> {
        return Promise.resolve({ villes: (<any>villes).data, pays: (<any>pays).data });
    }
}
