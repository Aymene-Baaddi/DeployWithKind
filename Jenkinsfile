pipeline {
    agent {
        any
    }
    environment {
        DOCKER_IMAGE = 'react-kind-app:latest'
        GIT_REPO = 'https://github.com/Aymene-Baaddi/DeployWithKind' 
        CLUSTER_NAME = 'deployinkind'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}" 
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }
        stage('Push to Kind') {
            steps {
                script {
                    sh "kind load docker-image $DOCKER_IMAGE --name $CLUSTER_NAME"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl apply -f service.yaml"
                }
            }
        }
    }
    post {
        success {
            echo 'Déploiement réussi !'
        }
        failure {
            echo 'Le déploiement a échoué.'
        }
    }
}
