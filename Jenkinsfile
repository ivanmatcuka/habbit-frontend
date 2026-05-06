pipeline {
    agent any

    stages {
        stage('Deploy') {
          steps {
            echo 'Deploying....'
            docker compose down
            docker compose up -d
          }
        }
    }
}
