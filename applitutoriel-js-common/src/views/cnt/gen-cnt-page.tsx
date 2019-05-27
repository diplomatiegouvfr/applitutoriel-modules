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
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";
import { TextAreaField } from "hornet-js-react-components/src/widget/form/textarea-field";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import {
    NotificationManager,
    Notifications,
    NotificationType
} from "hornet-js-core/src/notification/notification-manager";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { ContactService } from "src/services/page/cnt/contact-service-page";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";

import * as schema from "src/views/cnt/gen-cnt-page-validation.json";

const logger: Logger = Logger.getLogger("applitutoriel.views.cnt.gen-cnt-page");

export class ContactPage extends HornetPage<ContactService, HornetComponentProps, any> {

    private formI18n = this.i18n("contactPage.form");

    constructor(props?: HornetComponentProps, context?: any) {
        super(props, context);
    }

    /**
     * Alimente le tableau de liste des secteurs.
     * @override
     */
    prepareClient(): void {

    }

    /**
     * Déclenche le submit du formulaire de contact
     * @param data
     */
    onSubmit(data: any) {
        this.getService().envoyer(data).then((result) => {
            if (!result.errors) {
                NotificationManager.notify(null, "contactForm", null, Notifications.makeSingleNotification("", this.i18n("info.message.IN-GE-CNT-01")));
            } else {
                let errors: Notifications = new Notifications();
                let notif = new NotificationType();
                notif.id = result.errors.reportId;
                notif.text = result.errors.message;
                errors.addNotification(notif);
                NotificationManager.notify(null, "contactForm", errors, null);
            }
        });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        return (
            <div>
                <h2>{this.i18n("contactPage.title")}</h2>
                <Notification id="notif" />
                <Form
                    id="contactForm"
                    schema={schema}
                    formMessages={this.formI18n}
                    onSubmit={this.onSubmit}
                >

                    <Row className="row">
                        <InputField name="nom"
                            label={this.formI18n.fields.nom.label}
                            required={true} />
                    </Row>
                    <Row>
                        <InputField name="prenom"
                            label={this.formI18n.fields.prenom.label}
                            required={true} />
                    </Row>
                    <Row>
                        <InputField name="mail"
                            label={this.formI18n.fields.mail.label}
                            required={true} />
                    </Row>
                    <Row>
                        <TextAreaField name="message"
                            label={this.formI18n.fields.message.label}
                            required={true}
                            cols={60}
                            rows={6}
                        />
                    </Row>
                    <ButtonsArea>
                        <Button type="submit" id="envoi" name="action:envoi"
                            value="Valider" className="hornet-button" label={this.i18n("form.valid")}
                            title={this.i18n("contactPage.form.validTitle")} />
                    </ButtonsArea>
                </Form>
            </div>
        );
    }
}