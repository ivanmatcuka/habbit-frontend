pipeline {
    agent any

    stages {
        stage('Lint') {
          steps {
            echo 'Linting....'
            sh 'npm ci'
            sh 'npm run lint'
          }
        }
    }
}
