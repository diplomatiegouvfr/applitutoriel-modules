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
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";

const logger: Logger = Logger.getLogger("applitutoriel.views.gen.gen-aid-page");

export class AidePage extends HornetPage<any, HornetComponentProps, any> {

    prepareClient(): void {
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW AidePage render");
        return (
            <div>
                <h2>Aide</h2>
                <Notification id="n1" />
                <div className="pure-g-r">
                    <div className="pure-u-3-4">
                        <h3>Objet de l'application</h3>
                        <p className="texte">Cette application permet de donner un aperçu
                        des éléments intégrés Hornet à travers l'exemple fonctionnel d'un
                            magasin.</p>
                        <h3>Objet de cette page</h3>
                        <p className="texte">Cette page en particulier permet de
                        visualiser le rendu des balises
                            &lt;h2&gt;,
                                &lt;h3&gt;,
                                    &lt;h4&gt;,
                                        &lt;h5&gt; et
                                                &lt;h6&gt; au travers d'un contenu statique.</p>
                        <h4>Données de l’application</h4>
                        <h5>Partenaires</h5>
                        <p className="texte">Les données de l’application font référence
                            à des personnes fictives.</p>
                        <h5>Secteurs</h5>
                        <p className="texte">
                            Les secteurs d’activité ont été choisi au hasard, n’hésitez pas à les compléter.</p>
                        <h5>Le magasin</h5>
                        <h6>Notre magasin</h6>
                        <p className="texte">
                            Notre magasin est fictif, tout comme nos utilisateurs.</p>
                        <h6>Où sommes nous ?</h6>
                        <p className="texte">
                            La commune de l’Etang-Salé existe. Elle est limitrophe des Avirons
                            et de Saint-Louis, situés respectivement au nord et à l'est de
                            celle-ci. Elle compte sur son territoire une belle forêt littorale,
                            la forêt de l'Étang-Salé. Ceci explique sa devise : « Entre mer et
                            forêt ». L'Étang-Salé doit son nom à un petit plan d'eau autrefois
                            alimenté par les marais. À sa place, aujourd'hui un bel étang,
                            royaume des enfants, des petits pêcheurs et des modèles réduits. La
                            commune se partage entre trois zones : la station balnéaire, le
                            centre-ville, et les hameaux des hauts, ainsi qu'un vaste arrière
                            pays montagneux. La longue plage de sable noir n'est pas son moindre
                            atout. Autrefois, la modeste bourgade était appelée \u0022village\u0022 par
                            les gens du Sud. On y allait en vacances en août. Le reste de
                            l'année, l'endroit redevenait le royaume des familles pêcheurs
                            \u0022canotte\u0022. Après la forêt, restaurée par l'ONF, on entre dans le
                            centre-ville, aux cours encombrées de fruitiers et de fleurs. Plus
                            hauts se rencontrent des hameaux de moyenne altitudes, les Canots,
                            le Maniron, le Cap ... [ extrait de la page &nbsp;
                                                        <a
                                href="http://fr.wikipedia.org/wiki/L%27%C3%89tang-Sal%C3%A9">Wikipédia</a>
                            &nbsp;
                                au 25/04/2013]
                                                    </p>
                        <p className="texte">Bonne navigation.</p>
                    </div>
                </div>
            </div>
        );
    }
}
