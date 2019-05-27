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
 * applitutoriel-js - Application tutoriel utilisant le Framework hornet
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/applitutoriel-modules.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import {
    URL_PAR_EXPORTER,
    URL_PAR_PHOTO,
    URL_PAR_RECHERCHE,
    URL_PAR_SUPPRESSION_MASSE,
    URL_PARTENAIRES,
    URL_SECTEURS
} from "applitutoriel-js-common/src/utils/urls";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import { HornetRequest } from "hornet-js-core/src/services/hornet-superagent-request";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { ReferentielPaysServiceImpl } from "src/services/data/ref/ref-pays-service-impl";
import { Promise } from "hornet-js-utils/src/promise-api";

const logger: Logger = Logger.getLogger("applitutoriel-js-hornet.services.data.par.partenaire-service-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {RecherchePartenaireService}
 * @extends {ServiceApi}
 */
export class PartenaireServiceImpl extends PartenaireService {


    /** service de gestion des pays */
    private paysApi = new ReferentielPaysServiceImpl();

    /**
     * liste les produits
     * @return Promise
     */
    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - rechercher : ", criteres, reqMimeType);
        let request: HornetRequest = {
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_RECHERCHE),
            method: "post",
            data: criteres,
            typeMime: reqMimeType
        };
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);

    }

    supprimer(id): Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return this.fetch({ method: "delete", url: this.buildUrl(URL_PARTENAIRES + "/" + id) });
    }


    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        logger.trace("SERVICES - supprimerEnMasse :", partenaires);

        logger.debug("Envoi d'une liste de partenaires à supprimer :", partenaires);

        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_SUPPRESSION_MASSE),
            data: partenaires
        });
    }


    exporter(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporter : ", reqMimeType);
        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_EXPORTER),
            typeMime: reqMimeType
        });
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporterODF : ", reqMimeType);
        return Promise.resolve(true);
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {

        let request: HornetRequest = { method: "put", url: this.buildUrl(URL_PARTENAIRES) + "/" + id }

        if (!id) {
            request = { method: "post", url: this.buildUrl(URL_PARTENAIRES) }
        }

        if (Utils.isServer) {
            // On est sur NodeJS et on envoi vers le backend, on encode donc la photo en JSON et on POST de manière "classique"
            request.data = this.convertToRemotePartenaire(partenaire);
        } else {
            // On est sur le browser, on va encoder le POST en multipart et transférer le corps en JSON et l"image dans un "part" séparé
            //request.send({"content" : JSON.stringify(partenaire)});
            request.data = partenaire;

            if (partenaire.photo && partenaire.photo instanceof File) {
                // mantis 55104
                // L'objet photo est de type "File" seulement
                // quand un fichier est a été uploadé dans le formulaire et transmis dans la requête
                // Si ce n'est pas un fichier, on peut l'ignorer (cela signifie que la photo n'a pas changé)
                // De plus, si on essaye quand même de l'attacher dans la requête alors que ce n'est pas un fichier,
                // firefox plante (Argument 2 of FormData.append does not implement interface Blob)
                request.attach = [];
                request.attach.push({field: "photo", file: partenaire.photo, fileName: partenaire.photo.nom});
            }
        }
        return this.fetch(request);
    }

    /**
     * convertion d'un partenaire
     * @param {object} webPartenaire
     * @returns {object}
     */
    protected convertToRemotePartenaire(webPartenaire: any): any {

        let remotePartenaire: any = {...webPartenaire};
        remotePartenaire.satisfaction = (Array.isArray(webPartenaire.satisfaction.ids)) ? webPartenaire.satisfaction.ids.join(",") : "";

        if (remotePartenaire.photo && remotePartenaire.photo.contenu) {
            let photo: any = remotePartenaire.photo;
            remotePartenaire.photo = {
                id: null,
                fileName: photo.nom,
                mimetype: photo.mimeType,
                encoding: photo.encoding,
                size: photo.size,
                data: photo.contenu.toJSON().data,
            };
            photo = null;
        }
        return remotePartenaire;
    }

    /**
     * liste tous les secteurs
     * @return Promise
     */
    listerSecteurs(): Promise<any> {
        logger.trace("SERVICES - lister");
        return this.fetch({ method: "get", url: this.buildUrl(URL_SECTEURS) });
    }

    /**
     * liste les produit
     * @param {number} id identifiant du partenaire à récupérer
     * @return Promise
     */
    fichePartenaire(id: number): Promise<any> {
        let url: string = URL_PARTENAIRES;
        let p: Promise<any>;
        if (id) {
            url += "/" + id;
        }

        return this.fetch({ method: "get", url: this.buildUrl(url) });
    }

    /**
     * Récupère les données nécessaires à l'écran de fiche partenaire
     * Pour optimiser le nombre de requêtes, mise en place d'un méthode "chapeau" permettant d'agréger l'appel de plusieurs services
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return this.paysApi.listerVilles().then((villes: any) => {
            return this.paysApi.listerPays().then((pays: any) => {
                return Promise.resolve({ villes: villes, pays: pays });
            });
        });
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - lirePhoto : ", id);
        let request: HornetRequest = { 
            method: "get",
            url: this.buildUrl(URL_PARTENAIRES + "/" + id + URL_PAR_PHOTO)};
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);
    }
}
