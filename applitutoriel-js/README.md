# applitutoriel-js

L'application TUTORIEL a pour objectif de présenter une application basée sur le framework Hornet.

A noter :
* Hornet facilite la mise en oeuvre du RGAA V3 dans une application.
* Mais l'utilisation de Hornet ne garantit pas qu'une application soit valide RGAA.

__Cas fonctionnels__

Les cas fonctionnels présentés dans l'application sont :

* Formulaire de recherche
* Présentation du résultat sous forme de tableau éditable
* Formulaire étendu
* Tableau d'ajout/suppression/modification d'items
* Affichage de graphique

__RGAA V3__

L'applitutoriel est une mise en pratique du RGAA V3 au travers du framework Hornet.

## Prérequis #

* NodeJS 10.X
* hornet-js-builder 2.X.X installé en global:

```shell
npm install -g hornet-js-builder
```

* checkout du projet `applitutoriel-js`

## Initialisation #
Se positionner dans le répertoire du projet `applitutoriel-js` et lancer la commande:

```shell
hb install
```

## Démarrage de l'application en mode développement #

### Commande par défaut

la commande à exécuter en mode développement est la suivante:

```shell
hb w
```

Elle permet de lancer l'application en mode `watcher` afin que les modifications soient prises en compte (ce qui
entrainera un redémarrage du serveur node dans le cas d'une détection de modification).

### Options

Il est également possible d'ajouter à cette commande l'option:

```shell
hb w -i
```

Cette commande indique au builder de ne pas transpiler les fichiers typescript en javascript.
Elle est à utiliser dans le cas où l'IDE a été configuré de telle sorte que la transpilation ts->js
se fasse via ce dernier.


## Vérification

L'application est accessible depuis un navigateur à l'addresse : `http://localhost:8888/applitutorieljs/`.

## Mode Mock

Il est possible d'utiliser l'applitutoriel sans déployer la partie service.
Pour cela, activer le mode `mock` dans le `config/default.json`.

```json
  "mock": {
    "enabled": true,
    "host": "127.0.0.1", //default localhost
    "routes": "/mock/routes"
  }
```

## Packaging de l'application

```shell
hb package
```

Les livrables sont à récupérer dans le répertoire : `target`

- `applitutoriel-5.X.X-static.zip`
- `applitutoriel-5.X.X-dynamic.zip`

## Fichier de configuration de l'application : default.json

L'ensemble de la configuration applicative du serveur NodeJS se situe dans le fichier default.json contenu dans les sources de l'application

Ce fichier ne doit pas être modifié, excepté pour le log console. Les modifications sont à apporter dans les fichiers d'infrastructure.

### Configuration applicative

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|contextPath| Context de l'applicatin déployé|Par défaut vide|
|welcomePage|Page de démarrage de l'application|Passé en paramètre du ServerConfiguration|

```json
{
  "contextPath": "applitutorieljs",
  "welcomePage": "/accueil",
  ...
}

```


### Configuration serveur

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|route|Route identifié pour l'affinité de session nodejs|js1|
|port|Port de démarrage du serveur|8888|
|keepAlive|Activation du mode HTTP KeepAlive|true|
|maxConnections|Nombre maximal de connexion à l'instance nodejs|100|
|timeout|Timeout des réponses HTTP|300000|
|uploadFileSize|Taille maximal d'upload de fichier|1000000|
|sessionTimeout|Timeout des sessions utilisateur|1800000|

```json
  "server": {
    "route": "js1",
    "port": 8888,
    "keepAlive": true,
    "maxConnections": 100,
    "timeout": 300000,
    "uploadFileSize": 1000000,
    "sessionTimeout": 1800000
  }
```

### Configuration Cookie

Cette partie contient l'ensemble du paramétrage spécifique aux exécutions réalisées coté serveur, ainsi que ses spécificités de démarrage.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|domain|Domain du cookie|null|
|path|Path du cookie|null|
|httpOnly|Activation du mode HTTP KeepAlive|true|
|secure|securisation du cookie|true|
|alwaysSetCookie|Ajout du cookie dans le Header|false|

```json
  "cookie": {
    //"domain": null,
    //"path": null,
    "httpOnly": true,
    "secure": false
    //"alwaysSetCookie": false
  }
```


### Configuration de la sécurité

Ce bloc contient l'ensemble des paramètres destinés à la configuration de helmet.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation de la sécurité| true |
|hpp|HTTP Parameter Pollution attacks| true |
|ienoopen|Middleware for IE security. Set `X-Download-Options` to noopen| true |
|noSniff| keep clients from sniffing the MIME type| true |
|csp.enabled|Activation de CSP (Content Security Policy)| true |
|csp.defaultSrc|noms de domaine par défaut des différentes ressources du site| ["'self'", {hostname}] |
|csp.scriptSrc|noms de domaine des différentes ressources de scripts du site| ["'self'", "'unsafe-inline'", "'unsafe-eval'"]|
|csp.styleSrc|noms de domaine des différentes ressources de css du site | ["'self'", {hostname}]|
|csp.fontSrc|noms de domaine des différentes ressources de fonts du site| ["'self'", {hostname}]|
|csp.imgSrc|noms de domaine des différentes ressources d'images scripts du site | ["'self'", {hostname}]|
|csp.reportOnly|si valorisé à true, génération d'un rapport d'erreur uniquement|false|
|csp.setAllHeaders|valorisé à true si tous les headers doivent être settés|false|
|csp.disableAndroid|permet de désactiver la navigation via Android|false|
|csp.safari5|permet de désactiver la navigation via safari5|false|
|xss.enabled|Activation de la protection contre les failles XSS|true|
|xss.setOnOldIE|Force le header X-XSS-Protection sur les anciens IE|true|
|hpkp.enabled|Activation du Public Key Pinning: HPKP, HTTPS certificates can be forged, allowing man-in-the middle attacks|true|
|hpkp.maxAge|Durée de validation|7776000000|
|hpkp.sha256s|Liste des sha au format 256|["AbCdEf123=","ZyXwVu456="]|
|hpkp.includeSubdomains|Inclusion des sous domaines|true|
|hpkp.reportUri|url de rapport|vide|
|hsts.enabled|Activation du HTTP Strict Transport Security: hsts|false|
|hsts.maxAge|Durée de validation|7776000000|
|hsts.includeSubdomains|Inclusion des sous domaines|true|
|hsts.preload|Activation du preload dans le header HSTS|false|
|csrf.enabled|Activation du mode CSRF : Cross-Site Request Forgery|true|
|csrf.maxTokensPerSession|Nombre de token par session|10|


```json
"security": {
    "enabled": true,
    "hpp": true,
    "ienoopen": true,
    "noSniff": true,
    "csp": {
      "enabled": true,
      "defaultSrc": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "[Protocol]://[host]:[port]"
      ],
      "scriptSrc": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      "styleSrc":[
        "'self'",
        "[Protocol]://[host]:[port]",
        "'unsafe-inline'"
      ],
      "fontSrc":[
        "'self'",
        "[Protocol]://[host]:[port]"
      ],
      "imgSrc":[
        "'self'",
        "[Protocol]://[host]:[port]"
      ],
      "reportOnly": false,
      "setAllHeaders": false,
      "disableAndroid": false,
      "safari5": false
    },
    "frameguard": {
      "enabled": true,
      "mode": "deny",
      "allowFromPattern": ""
    },
    "xss": {
      "enabled": true,
      "setOnOldIE": true
    },
    "hpkp": {
      "enabled": true,
      "maxAge": 7776000000,
      "sha256s": [
        "AbCdEf123=",
        "ZyXwVu456="
      ],
      "includeSubdomains": true,
      "reportUri": null
    },
    "hsts": {
      "enabled": false,
      "maxAge": 10886400000,
      "includeSubdomains": true,
      "preload": false
    },
    "csrf": {
      "enabled": true,
      "maxTokensPerSession": 10
    }
  }
```

### Configuration des logs serveurs

Niveau de log :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|level.[all]|niveau de log pour toute l'application|INFO|
|level.monappli.view|niveau de log spécifique pour une partie de l'application |optionnel|

```json
 "log": {
    "levels": {
      "[all]": "DEBUG",
      "hornet-js-components.table": "TRACE"
    }
    ...
```

Déclaration des appenders :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|*file* pour un fichier simple<br/>*dateFile* pour un fichier contenant la date<br/>*console* ...|
|filename| Chemin absolu ou relatif au lancement du fichier de log | /var/log/nodejs/applitutoriel/applitutoriel-1.log|
|pattern| Présent pour les types *dateFile* <br />Permet de donner un pattern de date qui sera ajouté au nom du fichier.|-yyyy-MM-dd|
|layout.type| Type d'affichage des messages|pattern|
|layout.pattern| Schéma d'affichage des messages |"%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"|


Ex: type console

```json
"appenders": [
	{
	    "type": "console",
	    "layout": {
	      "type": "pattern",
	      "pattern": "%[%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m%]"
	    }
	}
]
```

ex : type fichier

```json
"appenders": [
	{
	    "type": "dateFile",
	    "filename": "log/app.log",
	    "layout": {
	      "type": "pattern",
	      "pattern": "%d{ISO8601}|%x{tid}|%x{user}|%p|%c|%x{fn}|%m"
	    }
	}
]
```

### Configuration des logs client

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|remote|Activatino des remotes log|false|
|level|niveau de log|INFO|

```json
  "logClient": {
    "remote": false,
    "level": "TRACE",
    ...
```

### Déclaration des appenders

Type BrowserConsole :


| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|BrowserConsole|
|layout.type| Type d'affichage des messages|THIN/BASIC/pattern/...|
|layout.pattern| Schéma d'affichage des messages |"%p|%c|%m%"|

```json
"appenders": {
    "BrowserConsole" : {
        "type": "BrowserConsole",
        "layout": {
          "type": "THIN"
        }
    }
}
```

Type Ajax :

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|type|Type d'appender|Ajax|
|layout.type| Type d'affichage des messages|THIN/BASIC/pattern/...|
|layout.pattern| Schéma d'affichage des messages |"%p|%c|%m%"|
|threshold|Seuil d'envoi des messages de log|100|
|timeout|Timeout d'envoie des messages|3000|
|url|url d'envoie des logs|/logs|

```json
"appenders": {
    "Ajax": {
        "type": "Ajax",
        "layout": {
          "type": "BASIC"
        },
        "threshold": 100,
        "timeout": 3000,
        "url": "/log"
    }
}
```

### Configuration des services


| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|services.host| URL de déploiement du module applitutoriel-service| [Protocol]://[host]:[port] |
|services.name| Nom de déploiement des services|applitutoriel|

```json
  "services": {
    "host": "http://localhost:8080/",
    "name": "applitutoriel-service"
  },
```

### Mode mock

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode mock de l'application|false|
|host|Host local du mock|localhost|
|routes|Chemin vers le fichier de routes mocké sans le /src |/mock/routes|

```json
  "mock": {
    "enabled": false,
    "host": "127.0.0.1", //default localhost
    "routes": "/mock/routes"
  }
```

### Mode fullSPA

NOTE : Le mode fullSPA n'est pas encore complètement supporté par hornet, la configuration est présente à titre d'information

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du mode fullSPA|false|
|host|Host du mode fullSPA|""|
|name|nom du service pour le mode fullSPA|/services|

```json
"fullSpa": {
    "enabled": false,
    "host": "",
    "name": "/services"
  }
```

__NOTE__ : non opérationnel

### Configuration de l'authentification

Note : Il ne s'agit pas d'une configuration à proprement parlé de Hornet mais uniqument viable dans l'applitutoriel

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|loginUrl|Url de connexion à l'application|/login|
|logoutUrl|Url de déconnexion à l'application|/logout|

```json
  "authentication": {
    "loginUrl": "/login",
    "logoutUrl": "/logout"
  }
```

### Configuration du Request
#### Configuration du Cache

La gestion du cache est paramétrable côté client et serveur pour les requêtes.

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|enabled|Activation du cache sur les requêtes de services|true|
|timetolive|Durée de rétention du cache|60|

```json
"request": {
    "cache": {
      "client": {
        "enabled": false,
        "timetolive": 60
      },
      "server": {
        "enabled": false,
        "timetolive": 120
      }
    }
```

#### Configuration du timeout

| Paramètre | Description | Valeur |
|-----------|-------------|--------|
|response   | Attend 10 secondes le debut de la réponse du serveur, avant de déclencher le timeOut | &nbsp; |
|deadline   | Le serveur doit répondre en moins 60 secondes avant de déclencher le timeOut      | &nbsp; |

```json
"request": {
    "timeout": {
      "response": 10000,
      "deadline": 60000
    }
```