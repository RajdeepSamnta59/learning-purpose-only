pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                sh '''
                rm -rf Edtech-Platform
                git clone https://github.com/RajdeepSamnta59/learning-purpose-only.git Edtech-Platform
                '''
            }
        }

        stage('Build & Push Images') {
            steps {
                sh '''
                cd Edtech-Platform
                IMAGE_TAG=$(date +%s)  
                docker build -t rajdeepsamantaa/edtech-backend:$ IMAGE_TAG ./backend
                docker build -t rajdeepsamantaa/edtech-frontend:$ IMAGE_TAG ./frontend

                docker push rajdeepsamantaa/edtech-backend :$IMAGE_TAG
                docker push rajdeepsamantaa/edtech-frontend :$IMAGE_TAG
                '''
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                cd Edtech-Platform

                docker-compose up -d --remove-orphans
                '''
            }
        }
    }
}
