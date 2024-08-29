pipeline {
    agent any
               
     environment {
        NODE_ENV = 'production'
    }

    tools {
        nodejs 'Node 22' // Name of the NodeJS installation configured in Jenkins
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


