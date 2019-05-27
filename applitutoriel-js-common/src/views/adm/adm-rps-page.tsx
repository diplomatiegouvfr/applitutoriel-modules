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

import * as React from "react";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { FicheProduitService } from "src/services/page/adm/adm-fpo-service-page";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import * as Chart from "chart.js";

const logger: Logger = Logger.getLogger("applitutoriel.views.adm.adm-rps-page");

export class RepartitionPage extends HornetPage<FicheProduitService, HornetComponentProps, any> {

    private ddInfographie: HTMLElement;
    private chart = null;
    private element = null;
    private data = null;

    private color = Chart.helpers.color;

    static defaultProps: any = {
        options: {
            title: {
                display: true,
                text: "",
            },
            legend: {
                position: "bottom",
            },
        },
        type: "polarArea",
    };

    constructor(props?, context?) {
        super(props, context);

        Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    let meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            // dessine en noir
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.font = Chart.helpers.fontString("1em", "bold", "NotoSansUI");
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            let position = element.tooltipPosition();
                            ctx.fillText(dataset.data[index].toString(), position.x, position.y - 5);
                        });
                    }
                });
            }
        });
    }

    prepareClient() {
        this.data = {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: RepartitionPage.getI18n("repartitionPage.title"),
            }],
            labels: [],
        };

        this.getService().repartition().then((data) => {
            for (let i = 0; i < data.length; i++) {
                this.data.datasets[0].data.push(data[i].value);
                this.data.datasets[0].backgroundColor.push(this.color(data[i].color).alpha(0.5).rgbString());
                this.data.labels.push(data[i].label);
            }
            this.setState({ data: this.data });
        });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW RepartitionPage render");

        const maxWidth = 550;
        const maxHeight = 550;
        const style = { maxWidth, maxHeight, padding: "20px" };

        return (
            <div>
                <h2>{this.i18n("repartitionPage.title")}</h2>
                <div style={style} className="center">

                    <div id="chartdiv" style={style}>
                        <canvas
                            aria-hidden="true"
                            ref={(element) => {
                                this.element = element;
                            }} width={500} height={500} style={style} />
                    </div>
                </div>
                <ButtonsArea>
                    <Button id="doughnut" className="hornet-button" onClick={(e) => {
                        this.setState({ type: "doughnut" });
                    }} label={this.i18n("repartitionPage.type.doughnut")} />
                    <Button id="pie" className="hornet-button" onClick={(e) => {
                        this.setState({ type: "pie" });
                    }} label={this.i18n("repartitionPage.type.pie")} />
                    <Button id="polarArea" className="hornet-button" onClick={(e) => {
                        this.setState({ type: "polarArea" });
                    }} label={this.i18n("repartitionPage.type.polarArea")} />
                </ButtonsArea>

                {this.renderBlocDescriptionTextuelle()}
            </div>
        );
    }

    /**
     * Render du bloc description textuelle
     * @returns {JSX.Element} le bloc description textuelle
     */
    protected renderBlocDescriptionTextuelle(): JSX.Element {
        return (
            <div>
                <button id="dd" aria-expanded="false" className="hornet-button"
                    aria-controls="dd-infographie" onClick={this.toggleDescriptionArea}>
                    {this.i18n("repartitionPage.descriptionButton")}
                </button>
                <div className="hidden" id="dd-infographie" ref={(div) => { this.ddInfographie = div; }}>
                    {this.state.data ? <ul>
                        {this.buildRepartitionListItems()}
                    </ul> : null}
                </div>
            </div>);
    }

    /**
     * Construit la liste des items
     * @returns {Array} tableau d'items list
     */
    buildRepartitionListItems() : any[] {
        const rows = [];
        if (this.state.data && this.state.data.labels) {
            this.state.data.labels.forEach((label, index) => {
                rows.push(this.buildRepartitionItem(label, index));
            });
        }
        return rows;
    }

    /**
     * Construit la list item du label se trouvant à l'index passé en paramètre
     * @param {string} - label : le label
     * @param {number} - index : l'index du label dans les données du tableau
     * @returns {JSX.Element} - list item
     */
    buildRepartitionItem(label, index) : JSX.Element {
        let data = "";
        if (this.state.data && this.state.data.datasets && this.state.data.datasets[0] && this.state.data.datasets[0].data) {
            data = this.state.data.datasets[0].data[index];
        }
        return <li key={`${index}-${label}-${data}`}>{label}: {data}</li>;
    }

    /**
     * Affiche/cache la description textuelle
     */
    toggleDescriptionArea() {
        const button = document.getElementById("dd");
        if (button && this.ddInfographie && this.ddInfographie.classList && !this.ddInfographie.classList.contains("hidden")) {
            this.ddInfographie.classList.add("hidden");
            button.setAttribute("aria-expanded", "false");
        } else if (button && this.ddInfographie.classList) {
            this.ddInfographie.classList.remove("hidden");
            button.setAttribute("aria-expanded", "true");
        }
    }

    /**
     * @inheritDoc
     */
    componentDidUpdate() {
        if (this.chart) this.chart.destroy();
        this.chart = new Chart(this.element, {
            type: this.state.type,
            data: this.state.data,
            options: this.state.options,
        });
    }
}
