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

                docker build -t rajdeepsamantaa/edtech-backend ./backend
                docker build -t rajdeepsamantaa/edtech-frontend ./frontend

                docker push rajdeepsamantaa/edtech-backend
                docker push rajdeepsamantaa/edtech-frontend
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
