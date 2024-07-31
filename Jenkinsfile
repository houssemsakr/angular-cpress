pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS_ID = 'github' // L'ID des informations d'identification GitHub dans Jenkins
        DOCKERHUB_USERNAME = 'houssem1988' // Votre nom d'utilisateur Docker Hub
        DOCKERHUB_PASSWORD = 'dckr_pat__o7UwyM3sqq65CusO3adbSx8qTQ' // Votre mot de passe Docker Hub
        DOCKER_COMPOSE_VERSION = '2.10.2' // Version plus récente de Docker Compose
        PATH = "${PATH}:/home/jenkins/bin"
    }

    tools {
        nodejs "18.19.1"  // Assurez-vous d'avoir configuré un nom d'installation NodeJS dans Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Cloner le dépôt en utilisant les informations d'identification GitHub
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/houssemsakr/angular-cypress.git',
                            credentialsId: env.GITHUB_CREDENTIALS_ID
                        ]]
                    ])
                }
            }
        }
        stage('Setup') {
            steps {
                script {
                    // Créer le répertoire /home/jenkins/bin si nécessaire
                    sh '''
                    mkdir -p /home/jenkins/bin
                    curl -L https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` -o /home/jenkins/bin/docker-compose
                    chmod +x /home/jenkins/bin/docker-compose
                    '''
                }
            }
        }
        stage('Build and Run Containers') {
            steps {
                script {
                    // Construire et démarrer les conteneurs Docker
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Run Cypress Tests') {
            steps {
                script {
                    // Exécuter les tests Cypress
                    sh 'docker-compose run cypress ./node_modules/.bin/cypress run --config-file cypress.config.js'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Login to Docker Hub and push the image
                    sh '''
                    echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin
                    docker-compose push
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Arrêter et supprimer les conteneurs
                sh 'docker-compose down'
            }
        }
    }
}
