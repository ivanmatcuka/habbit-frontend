pipeline {
    agent any

    stages {
        stage('Deploy') {
          steps {
            echo 'Deploying....'
            sh 'docker compose down'
            sh 'docker compose up -d'
          }
        }
    }
}
