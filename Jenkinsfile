       
    pipeline {
    agent any

    environment {

        DOCKER_IMAGE = 'deploywithkind'
        
        DOCKERFILE = 'Dockerfile'
        
        DEPLOYMENT_NAME = 'deployinkind'
    }
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                script {
                    // Cloner le dépôt Git
                    git url: 'https://github.com/Aymene-Baaddi/DeployWithKind', branch: 'main'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    sh "docker build -t ${DOCKER_IMAGE} -f ${DOCKERFILE} ."
                }
            }
        }

        stage('Load Image into Kind') {
            steps {
                script {
                    // Charger l'image Docker dans Kind
                    sh "kind load docker-image ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to Kind') {
            steps {
                script {
                    // Appliquer les fichiers de déploiement Kubernetes
                    sh "kubectl apply -f k8s/deployment.yml"
                }
            }
        }
    }

    post {
        success {
            echo 'Déploiement réussi !'
        }
        failure {
            echo 'Échec du déploiement.'
        }
    }

