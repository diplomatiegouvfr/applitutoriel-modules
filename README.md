# applitutoriel-modules

Module parent de l'application TUTORIEL. Cette application de démonstration met en avant l'usage des frameworks hornet, hornet-lite et l'utilisation de batch en javascript/

__Cas fonctionnels__

Les cas fonctionnels présentés dans les applications sont :

* Formulaire de recherche
* Présentation du résultat sous forme de tableau éditable
* Formulaire étendu
* Tableau d'ajout/suppression/modification d'items
* Affichage de graphique
* batch

__RGAA V3__

L'applitutoriel est une mise en pratique du RGAA V3 au travers du framework Hornet.

A noter :
* Hornet facilite la mise en oeuvre du RGAA V3 dans une application.
* Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.

## Prérequis #

* NodeJS 8.X
* hornet-js-builder 1.X installé en global:

```shell
npm install -g hornet-js-builder
```

* checkout du projet `applitutoriel-modules`

## Initialisation #
Se positionner dans le répertoire du projet `applitutoriel-modules` et lancer la commande:

```shell
hb install
```

## Compilation de tous les modules #

L'applitutoriel contient plusieurs module qu'il est nécessaire de compiler avant utilisation.

```shell
hb compile
```

## Démarrage rapide d'une application #

Se positionner dans le module : `applitutoriel-js-lite`

### Commande par défaut avec le projet hornet-js-builder-new installé en global

la commande à exécuter en mode développement est la suivante:

```shell
hbn w
```

Elle permet de lancer l'application en mode `watcher` afin que les modifications soient prises en compte (ce qui
entrainera un redémarrage du serveur node dans le cas d'une détection de modification).

### Commande par défaut avec le projet hornet-js-builder-new en dépendance du projet

les commandes à exécuter sont les suivantes :

```shell
npm i -E
```
puis

```shell
npm start
```

## Vérification

L'application est accessible depuis un navigateur à l'addresse : `http://localhost:8888/applitutorieljslite/`.
