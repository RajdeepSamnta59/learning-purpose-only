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

        stage('Deploy App') {
            steps {
                sh '''
                cd Edtech-Platform
                docker-compose down || true
                docker-compose up --build -d
                '''
            }
        }
    }
}
