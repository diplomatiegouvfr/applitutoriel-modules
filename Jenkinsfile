#!groovy

//
// Custom environment variables
//
def mapEnv = [:]

// Projet
mapEnv["PROJECT_ID"] = "hornet"

pipeline {
    agent {
       label "hornet-js"
    }

    options {
        buildDiscarder(logRotator(artifactDaysToKeepStr: "20", artifactNumToKeepStr: "1", daysToKeepStr: "90", numToKeepStr: "20"))
        disableConcurrentBuilds()
    }

    stages {
        stage("Install Builder") {
            steps {
				dir("${WORKSPACE}") {
					script {
						// Load HornetJsBuilder version from package.json
						mapEnv["HORNETJSBUILDER_VERSION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').hornetJsBuilder\"", returnStdout:true).trim()
						mapEnv["HORNETJSBUILDER_BASE"] = "/var/lib/jenkins/.hbw/${mapEnv["HORNETJSBUILDER_VERSION"]}"

						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
						    withNPM(npmrcConfig: "npmrc_hornet") {
						        sh '''
						            echo "Install hornet-js-builder@$HORNETJSBUILDER_VERSION"
						            echo "${HORNETJSBUILDER_VERSION}" > hb_version
						            bash hbw.sh --version
						           '''
							}
			            }
					}
				}
            }
            post {
                success {
                    echo "[SUCCESS] Success to install builder"
                }
                failure {
                    echo "[FAILURE] Failed to install builder"
                }
            }
        }
        stage("Handle Snaphot version") {
            when {
				anyOf {
	                branch "develop"
				}
            }
            steps {
                sh '''
                    bash hbw.sh dependency:set-snapshot --dependencyVersionFix=hornet-js --module=hornet-js-core
                    bash hbw.sh dependency:set-snapshot --dependencyVersionFix=hornet-themes-intranet --module=hornet-themes-intranet
                '''
            }
            post {
                success {
                    echo "[SUCCESS] Success to handle snapshot version"
                }
                failure {
                    echo "[FAILURE] Failed to handle snapshot version"
                }
            }
        }

        stage("Initialize") {
            steps {
				dir("${WORKSPACE}") {
					configFileProvider([configFile(fileId: 'applitutoriel-js-build-settings.properties', variable: 'BUILD_SETTINGS')]) {
						script {
							def buildSettings = readProperties file:"${BUILD_SETTINGS}"
							mapEnv << buildSettings
						}
					}
					script {
						mapEnv["MODULE_ID"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').name\"", returnStdout:true).trim()
						mapEnv["MODULE_GROUP"] = "fr.gouv.diplomatie.${mapEnv["PROJECT_ID"]}"
						mapEnv["MODULE_GROUP_PUB"] = "fr/gouv/diplomatie/${mapEnv["PROJECT_ID"]}" 
						mapEnv["MODULE_VERSION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').version\"", returnStdout:true).trim()

						mapEnv["MODULE_DESCRIPTION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').description\"", returnStdout:true).trim()
						mapEnv["MODULE_AUTHOR"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').author\"", returnStdout:true).trim()

                        //Sous modules: 
                        mapEnv["MODULE_APPLITUTORIEL_JS"]="applitutoriel-js"
                        mapEnv["MODULE_APPLITUTORIEL_JS_BATCH"]="applitutoriel-js-batch"
                        mapEnv["MODULE_APPLITUTORIEL_JS_LITE"]="applitutoriel-js-lite"


						// Construction
						mapEnv["BUILD_TIMESTAMP"] = sh(script: 'date +%Y%m%d.%H%M%S', returnStdout:true).trim()

						if ( BRANCH_NAME.equals("develop") ) {
							mapEnv["BUILD_VERSION"] = mapEnv["MODULE_VERSION"] + "-" + mapEnv["BUILD_TIMESTAMP"] + "-" + env.BUILD_NUMBER
						} else if ( BRANCH_NAME.equals("release_candidate") ) {
							mapEnv["BUILD_VERSION"] = "RC"
						} else if ( BRANCH_NAME.equals("master") ){
							mapEnv["BUILD_VERSION"] = mapEnv["MODULE_VERSION"]
						}

						// Publication
						mapEnv["REPOSITORY_BASENAME"] = mapEnv["PROJECT_ID"]

						if ( BRANCH_NAME.equals("develop") || BRANCH_NAME.equals("release_candidate") ) {
							mapEnv["PUBLISH_VERSION"] = mapEnv["MODULE_VERSION"] + "-SNAPSHOT"
                            mapEnv["PUBLISH_REPOSITORY"] = mapEnv["REPOSITORY_BASENAME"] + "-snapshot"
							mapEnv["PUBLISH_REPOSITORY_NPM"] = mapEnv["REPOSITORY_BASENAME"] + "-npm-snapshot"
						} else {
							mapEnv["PUBLISH_VERSION"] = mapEnv["MODULE_VERSION"]
                            mapEnv["PUBLISH_REPOSITORY"] = mapEnv["REPOSITORY_BASENAME"] + "-release"
							mapEnv["PUBLISH_REPOSITORY_NPM"] = mapEnv["REPOSITORY_BASENAME"] + "-npm-release"
						}

						// Déploiement
                        if ( BRANCH_NAME.equals("trunk") || BRANCH_NAME.equals("develop") ) {
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-SNAPSHOT-application-${mapEnv["MODULE_APPLITUTORIEL_JS"]}-scheduled-install"
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_BATCH_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS_BATCH"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-SNAPSHOT-batchjs-${mapEnv["MODULE_APPLITUTORIEL_JS_BATCH"]}-scheduled-install"
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_LITE_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS_LITE"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-SNAPSHOT-application-${mapEnv["MODULE_APPLITUTORIEL_JS_LITE"]}-scheduled-install"
						} else {
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-RELEASE-application-${mapEnv["MODULE_APPLITUTORIEL_JS"]}-scheduled-install"
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_BATCH_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS_BATCH"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-RELEASE-batchjs-${mapEnv["MODULE_APPLITUTORIEL_JS_BATCH"]}-scheduled-install"
                            mapEnv["DEPLOY_JOB_APPLITUTORIEL_JS_LITE_ID"] = "${mapEnv["MODULE_GROUP"]}-${mapEnv["MODULE_APPLITUTORIEL_JS_LITE"]}-DEVNG-${mapEnv["RUNDECK_JOB_OS_CIBLE"]}-RELEASE-application-${mapEnv["MODULE_APPLITUTORIEL_JS_LITE"]}-scheduled-install"
						}


						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
			                echo sh(script: "env|sort", returnStdout: true)

				            sh '''
				                bash hbw.sh versions:set --versionFix=${BUILD_VERSION}
				            '''
						}
					}
				}
			}
            post {
                success {
                    echo "[SUCCESS] Success to Initialize"
                }
                failure {
                    echo "[FAILURE] Failed to Initialize"
                }
            }
        }

        stage("Build artifacts") {
            steps {
				dir("${WORKSPACE}") {
					script {
						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
			                sh "bash hbw.sh publish --publish-registry ${ARTIFACTORY_URL}/api/npm/${PUBLISH_REPOSITORY_NPM} --skipTests"
						}
					}
				}
            }
            post {
                success {
                    echo "[SUCCESS] Success to Build artifacts"
                }
                failure {
                    echo "[FAILURE] Failed to Build artifacts"
                }
            }
        }

        stage("Publish artifacts") {
            steps {
                dir("${WORKSPACE}") {
					script {
						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
                            sh '''
                            echo "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
                            <project>
                                <modelVersion>4.0.0</modelVersion>
                                <groupId>${MODULE_GROUP}</groupId>
                                <artifactId>${MODULE_APPLITUTORIEL_JS}</artifactId>
                                <version>${PUBLISH_VERSION}</version>
                            </project>" > ./${MODULE_APPLITUTORIEL_JS}/target/${MODULE_APPLITUTORIEL_JS}-${BUILD_VERSION}.pom

                                    echo "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
                            <project>
                                <modelVersion>4.0.0</modelVersion>
                                <groupId>${MODULE_GROUP}</groupId>
                                <artifactId>${MODULE_APPLITUTORIEL_JS_BATCH}</artifactId>
                                <version>${PUBLISH_VERSION}</version>
                            </project>" > ./${MODULE_APPLITUTORIEL_JS_BATCH}/target/${MODULE_APPLITUTORIEL_JS_BATCH}-${BUILD_VERSION}.pom

                                                echo "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
                            <project>
                                <modelVersion>4.0.0</modelVersion>
                                <groupId>${MODULE_GROUP}</groupId>
                                <artifactId>${MODULE_APPLITUTORIEL_JS_LITE}</artifactId>
                                <version>${PUBLISH_VERSION}</version>
                            </project>" > ./${MODULE_APPLITUTORIEL_JS_LITE}/target/${MODULE_APPLITUTORIEL_JS_LITE}-${BUILD_VERSION}.pom
                            '''
                            withCredentials([usernamePassword(credentialsId: "${ARTIFACTORY_CREDENTIALS_KEY}", passwordVariable: "pwd_ci", usernameVariable: "user_ci")]) {
                                script {
                                    def artifactory = Artifactory.newServer url: "$ARTIFACTORY_URL", username: "$user_ci", password: "$pwd_ci"
                                    def uploadSpec = """{
                                        "files": [
                                        {
                                            "pattern": "./${MODULE_APPLITUTORIEL_JS}/target/*.*",
                                            "target": "${PUBLISH_REPOSITORY}/${MODULE_GROUP_PUB}/${MODULE_APPLITUTORIEL_JS}/${PUBLISH_VERSION}/",
                                            "recursive": false
                                        }
                                    ]
                                    }"""
                                    artifactory.upload(uploadSpec)

                                    uploadSpec = """{
                                        "files": [
                                        {
                                            "pattern": "./${MODULE_APPLITUTORIEL_JS_BATCH}/target/*.*",
                                            "target": "${PUBLISH_REPOSITORY}/${MODULE_GROUP_PUB}/${MODULE_APPLITUTORIEL_JS_BATCH}/${PUBLISH_VERSION}/",
                                            "recursive": false
                                        }
                                    ]
                                    }"""
                                    artifactory.upload(uploadSpec)

                                    uploadSpec = """{
                                        "files": [
                                        {
                                            "pattern": "./${MODULE_APPLITUTORIEL_JS_LITE}/target/*.*",
                                            "target": "${PUBLISH_REPOSITORY}/${MODULE_GROUP_PUB}/${MODULE_APPLITUTORIEL_JS_LITE}/${PUBLISH_VERSION}/",
                                            "recursive": false
                                        }
                                    ]
                                    }"""
                                    artifactory.upload(uploadSpec)
                                }
                            }
                        }
                    }
                }
            }
            post {
                success {
                    echo "[SUCCESS] Success to Publish artifacts"
                }
                failure {
                    echo "[FAILURE] Failed to Publish artifacts"
                }
            }
        }

        stage("Test") {
            steps {
                dir("${WORKSPACE}") {
                    script {
                        mapEnv["NODE_ENV"] = "integration"
                        def propEnv = mapEnv.collect { key, value -> return key+'='+value }
                        withEnv(propEnv) {
                            sh "xvfb-run bash hbw.sh test"
                        }
                    }
                }
            }
            post {
                success {
                    echo "[SUCCESS] Success to Test"
                }
                failure {
                    echo "[FAILURE] Failed to Test"
                }
            }
        }

        stage("Quality") {
            steps {
                dir("${WORKSPACE}") {
                    script {
                        def propEnv = mapEnv.collect { key, value -> return key+'='+value }
                        withEnv(propEnv) {
                            scannerHome = tool "SonarQube Scanner ${SONAR_SCANNER_CLI}"
                            withCredentials([usernamePassword(credentialsId: "${SONAR_CREDENTIALS_KEY}", passwordVariable: "SONAR_CREDENTIALS_PSW", usernameVariable: "SONAR_CREDENTIALS_LOGIN")]) {
                                sh '''
                                    echo "
                                    sonar.host.url=${SONAR_URL}
                                    sonar.login=${SONAR_CREDENTIALS_PSW}
                                    sonar.projectKey=${MODULE_GROUP}:${MODULE_ID}
                                    sonar.projectName=${MODULE_ID}
                                    sonar.projectVersion=${MODULE_VERSION}
                                    sonar.sourceEncoding=UTF-8
                                    
                                    sonar.modules=applitutoriel-js, applitutoriel-js-lite
                                    
                                    applitutoriel-js.sonar.projectName=applituoriel-js
                                    applitutoriel-js.sonar.sources=src
                                    applitutoriel-js.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    applitutoriel-js.sonar.tests=test
                                    applitutoriel-js-lite.sonar.projectName=applituoriel-js-lite
                                    applitutoriel-js-lite.sonar.sources=src
                                    applitutoriel-js-lite.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml, test_report/karma/test-sonar-results.xml
                                    applitutoriel-js-lite.sonar.tests=test

                                    sonar.exclusions=**/node_modules/**,**/*.spec.ts
                                    
                                    sonar.tests=test
                                    sonar.test.inclusions=**/*-spec.ts, **/*.test.karma.tsx, **/*.test.karma.ts, **/*.test.karma.tslint
                                    
                                    sonar.language=ts
                                    sonar.baseDir=.
                                    sonar.ts.tslint.projectPath=.
                                    sonar.ts.tslint.path=${HORNETJSBUILDER_BASE}/node_modules/tslint/bin/tslint
                                    sonar.ts.tslint.configPath=${HORNETJSBUILDER_BASE}/src/conf/tslint.json
                                    sonar.ts.tslint.ruleConfigs=${HORNETJSBUILDER_BASE}/src/conf/tslint-rules.properties
                                    
                                    sonar.ts.coverage.lcovReportPath=test_report/remap/lcov/lcov.info

                                    " > sonar-project.properties
                                '''
                            }
                            sh "${scannerHome}/bin/sonar-scanner"
                        }
                    }
                }
            }

            post {
                success {
                    echo "[SUCCESS] Success to run Quality"
                }
                failure {
                    echo "[FAILURE] Failed to run Quality"
                }
            }
        }
        stage("Deploy artifacts") {
            steps {
                dir("${WORKSPACE}") {
                    script {
                        def propEnv = mapEnv.collect { key, value -> return key+'='+value }
                        withEnv(propEnv) {
                            withCredentials([usernamePassword(credentialsId: "${RUNDECK_CREDENTIALS_KEY}", passwordVariable: "RUNDECK_CREDENTIALS_PSW", usernameVariable: "RUNDECK_CREDENTIALS_LOGIN")]) {
                                sh "node trigger-rundeck.js ${RUNDECK_HOST} ${DEPLOY_JOB_APPLITUTORIEL_JS_ID} ${RUNDECK_CREDENTIALS_PSW} ${PUBLISH_VERSION}"
                                sh "node trigger-rundeck.js ${RUNDECK_HOST} ${DEPLOY_JOB_APPLITUTORIEL_JS_BATCH_ID} ${RUNDECK_CREDENTIALS_PSW} ${PUBLISH_VERSION}"
                                sh "node trigger-rundeck.js ${RUNDECK_HOST} ${DEPLOY_JOB_APPLITUTORIEL_JS_LITE_ID} ${RUNDECK_CREDENTIALS_PSW} ${PUBLISH_VERSION}"
                            }
                        }
                    }
                }
            }
            post {
                success {
                    echo "[SUCCESS] Success to Deploy artifacts"
                }
                failure {
                    echo "[FAILURE] Failed to Deploy artifacts"
                }
            }
        }
    }
}
