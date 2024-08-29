pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'Node 18' // Name of the NodeJS installation configured in Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Mihir-Kumar13/Edtech-frontend'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Add deployment steps here, e.g., copying build artifacts to a server or deploying to a cloud service.
                echo 'Deployment step goes here'
            }
        }
    }

    post {
        always {
            // Cleanup or notifications
            echo 'Pipeline finished'
        }
    }
}

