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
import { VilleAttributes, VilleModel } from "src/models/ref/ref-ville-mod";
import { PaysAttributes, PaysModel } from "src/models/ref/ref-pay-mod";
import { SecteurAttributes, SecteurModel } from "src/models/adm/seq-sec-mod";
import { ProduitAttributes, ProduitModel } from "src/models/pro/model-produit";
import { CiviliteAttributes, CiviliteModel } from "src/models/ref/ref-civilite-mod";
import { UtilisateurAttributes, UtilisateurModel } from "src/models/seq-user-mod";
import { PartenaireAttributes, PartenaireModel } from "src/models/par/seq-par-mod";
import { ProduitPartenaireAttributes, ProduitPartenaireModel } from "src/models/par/seq-pro-par-mod";
import { PhotoAttributes, PhotoModel } from "src/models/seq-photo-model";
import { RoleAttributes, RoleModel } from "src/models/model-role";
import { RoleUtilisateurAttributes, RoleUtilisateurModel } from "src/models/model-role_utilisateur";
import { Entity } from "hornet-js-database/src/decorators/dec-seq-entity";
import { SequelizeUtils } from "hornet-js-database/src/sequelize/sequelize-utils";
import { injectable, Scope, Side } from "hornet-js-core/src/inject/injectable";
import { inject } from "hornet-js-core/src/inject/inject";
import { HornetSequelizeInstanceModel } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";
import { HornetSequelizeModel } from "hornet-js-database/src/sequelize/hornet-sequelize-model";

const logger: Logger = Logger.getLogger("applitutoriel.src.dao.model-dao");

@injectable(ModelDAO, Scope.SINGLETON, Side.SERVER)
export class ModelDAO extends HornetSequelizeModel {
    @Entity("ville", VilleModel)
    public villeEntity: HornetSequelizeInstanceModel<VilleAttributes>;

    @Entity("pays", PaysModel)
    public paysEntity: HornetSequelizeInstanceModel<PaysAttributes>;

    @Entity("civilite", CiviliteModel)
    public civiliteEntity: HornetSequelizeInstanceModel<CiviliteAttributes>;

    @Entity("produit", ProduitModel)
    public produitEntity: HornetSequelizeInstanceModel<ProduitAttributes>;

    @Entity("secteur", SecteurModel)
    public secteurEntity: HornetSequelizeInstanceModel<SecteurAttributes>;

    @Entity("utilisateur", UtilisateurModel)
    public utilisateurEntity: HornetSequelizeInstanceModel<UtilisateurAttributes>;

    @Entity("role", RoleModel)
    public roleEntity: HornetSequelizeInstanceModel<RoleAttributes>;

    @Entity("role_utilisateur", RoleUtilisateurModel)
    public roleUtilisateurEntity: HornetSequelizeInstanceModel<RoleUtilisateurAttributes>;

    @Entity("partenaire", PartenaireModel)
    public partenaireEntity: HornetSequelizeInstanceModel<PartenaireAttributes>;

    @Entity("produit_partenaire", ProduitPartenaireModel)
    public produitPartenaireEntity: HornetSequelizeInstanceModel<ProduitPartenaireAttributes>;

    @Entity("photo", PhotoModel)
    public photoEntity: HornetSequelizeInstanceModel<PhotoAttributes>;

    constructor(@inject("databaseConfigName") conf?: string) {
        super(conf);
        this.initVilleEntity();
        this.initUtilisateurEntity();
        this.initRoleEntity();
        this.initPartenaireEntity();
        this.initProduitEntity();
    }

    // METHODS
    private initVilleEntity(): void {
        SequelizeUtils.initRelationBelongsTo({ fromEntity: this.villeEntity,
            toEntity: this.paysEntity, alias: "lePays", foreignKey: "id_pays" });
    }

    private initUtilisateurEntity(): void {
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.utilisateurEntity,
            toEntity: this.roleEntity, alias: "listeRole", foreignKey: "id_utilisateur", throughTable: "role_utilisateur" });
    }

    private initRoleEntity(): void {
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.roleEntity,
            toEntity: this.utilisateurEntity, alias: "listeUser", foreignKey: "id_role", throughTable: "role_utilisateur" });
    }

    private initPartenaireEntity(): void {
        SequelizeUtils.initRelationBelongsTo({ fromEntity: this.partenaireEntity,
            toEntity: this.paysEntity, alias: "laNationalite", foreignKey: "id_pays" });
        SequelizeUtils.initRelationBelongsTo({ fromEntity: this.partenaireEntity,
            toEntity: this.villeEntity, alias: "laVille", foreignKey: "id_ville" });
        SequelizeUtils.initRelationBelongsTo({ fromEntity: this.partenaireEntity,
            toEntity: this.civiliteEntity, alias: "laCivilite", foreignKey: "id_civilite" });
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.partenaireEntity,
            toEntity: this.produitEntity, alias: "listeProduit", foreignKey: "id_partenaire", throughTable: "produit_partenaire" });
        SequelizeUtils.initRelationBelongsTo({ fromEntity: this.partenaireEntity,
            toEntity: this.photoEntity, alias: "laPhoto", foreignKey: "id_photo" });
    }

    private initProduitEntity(): void {
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.produitEntity,
            toEntity: this.partenaireEntity, alias: "partenaires", foreignKey: "id_produit", throughTable: "produit_partenaire" });
    }
}
