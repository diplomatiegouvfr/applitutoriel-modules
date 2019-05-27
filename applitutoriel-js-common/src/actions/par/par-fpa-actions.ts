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

import { RouteAction } from "hornet-js-core/src/routes/abstract-routes";
import { DataValidator } from "hornet-js-core/src/validation/data-validator";
import * as _ from "lodash";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { PhotoMetier } from "src/models/photo-mod";
import { ResultFile } from "hornet-js-core/src/result/result-file";
import { MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { FichePartenaireService } from "src/services/data/par/fiche-partenaire-service";
import { PartenaireService } from "src/services/data/par/partenaire-service";
import { Promise } from "hornet-js-utils/src/promise-api";
const logger: Logger = Logger.getLogger("applitutoriel.actions.par.par-fpa-actions");
import * as parValidationSchema from "src/views/par/par-fpa/validation.json";
import { DispositionType } from "hornet-js-core/src/result/disposition-type";

/**
 * Charge les données nécessaires à l'écran de fiche partenaire
 */
export class FichePartenaire extends RouteActionService<{ id: number }, PartenaireService> {
    execute(): Promise<any> {
        logger.trace("ACTION FichePartenaire");
        let promisefiche = this.getService().fichePartenaire(this.attributes.id);
        return Promise.all([ this.getService().getFormData(), promisefiche ])
            .then((results: any[]) => {
                return ({
                    villes: results[ 0 ].villes,
                    pays: results[ 0 ].pays,
                    partenaire: results[ 1 ]
                });
            });
    }
}

export class LirePhoto extends RouteActionService<{ idPartenaire: number }, FichePartenaireService> {

    execute(): Promise<ResultFile> {
        return this.getService().lirePhoto(this.attributes.idPartenaire).then((retourApi: PhotoMetier) => {
            // change disposition to DispositionType.ATTACHMENT for download
            return new ResultFile((Object as any).assign({dispositionType: DispositionType.INLINE, filename: (retourApi as any).fileName }, retourApi),
                                  MediaTypes.fromMime(retourApi.mimetype));
        }) as Promise<ResultFile>;
    }
}

export class Valider extends RouteAction<any> {
    execute(): Promise<any> {

        logger.debug("Validation d'un partenaire:", this.req.body);
        // TODO mettre en place une validation basée sur un middleware, déclenchant une ValidationError en cas d'erreur
        return Promise.resolve(this.req.body);
    }
}

/**
 * Action de création ou de modification de partenaire
 */
export class EcrirePartenaire extends RouteActionService<any, FichePartenaireService> {

    /**
     * Renvoie l'objet contenant les éléments nécessaires à la validation des données du partenaire.
     * @override
     */
    getDataValidator(): DataValidator {
        return new DataValidator(parValidationSchema);
    }

    /**
     * @override
     */
    getPayload(): any {
        let partenaire = this.req.body;

        if (_.isString(this.req.body.content)) {
            // Le contenu JSON a été posté dans le champ "content" de la requête, on récupère le string qu'on retranscrit en Objet
            partenaire = JSON.parse(this.req.body.content);
        }

        // les uploads sont placés dans req.body.files
        //TODO tetaudf remplacer la verif null par isEmpty de loadash
        if (this.req.files && this.req.files[ 0 ] != null) {
            // On replace la photo dans l"objet
            partenaire.photo = {};
            partenaire.photo.nom = this.req.files[ 0 ].originalname;
            partenaire.photo.mimeType = this.req.files[ 0 ].mimetype;
            partenaire.photo.encoding = this.req.files[ 0 ].encoding;
            partenaire.photo.size = this.req.files[ 0 ].size;
            partenaire.photo.contenu = this.req.files[ 0 ].buffer;
        }
        return partenaire;
    }

    execute(): Promise<any> {

        var partenaire = this.getPayload();

        logger.trace("Action: EcrirePartenaire", partenaire);

        return this.getService().modifier(this.attributes.id, partenaire) as Promise<any>;

    }
}
