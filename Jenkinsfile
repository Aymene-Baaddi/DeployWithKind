pipeline {
    agent {
        docker {
            image 'node:14' 
            args '-u root' 
        }
    }
    environment {
        DOCKER_IMAGE = 'your-dockerhub-username/react-kind-app:latest' 
        GIT_REPO = 'https://github.com/Aymene-Baaddi/DeployWithKind'  
        CLUSTER_NAME = 'deployinkind'  
    }
    stages {
        
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
   
        stage('Docker Build') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        
        stage('Docker Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh "docker login -u $DOCKER_USER -p $DOCKER_PASSWORD"
                    }
                }
            }
        }

       
        stage('Docker Push') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }

        
        stage('Load to Kind') {
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
