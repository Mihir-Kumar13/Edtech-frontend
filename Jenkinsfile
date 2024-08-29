pipeline {
    agent any
               
      environment {
        NODE_VERSION = 'NodeJS 22.0.0' // This should match the name you gave in Global Tool Configuration
    }

    tools {
        nodejs NODE_VERSION
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Mihir-Kumar13/Edtech-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                withEnv(["PATH+NODE=${tool 'NodeJS'}/bin"]) {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                withEnv(["PATH+NODE=${tool 'NodeJS'}/bin"]) {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                withEnv(["PATH+NODE=${tool 'NodeJS'}/bin"]) {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
    }
}


