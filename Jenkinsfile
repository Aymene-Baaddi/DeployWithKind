pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'deploywithkind'
        DOCKERFILE = 'Dockerfile'
        DEPLOYMENT_NAME = 'deployinkind'
    }

    stages {
        stage('Initialize') {
            steps {
                script {
                    def dockerHome = tool 'docker' 
                    env.PATH = "${dockerHome}/bin:${env.PATH}" 
                }
            }
        }

        stage('Checkout Source Code') {
            steps {
                script {
                   
                    git url: 'https://github.com/Aymene-Baaddi/DeployWithKind', branch: 'main'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                   
                    sh "docker build -t ${DOCKER_IMAGE} -f ${DOCKERFILE} ."
                }
            }
        }

        stage('Load Image into Kind') {
            steps {
                script {
                  
                    sh "kind load docker-image ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy to Kind') {
            steps {
                script {
                 
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
}
