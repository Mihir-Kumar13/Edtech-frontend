pipeline {
    agent any 

    stages{
        stage("Cloning the Repository") 
           echo 'Cloning repository...'
        // This assumes your Jenkins job is connected to GitHub via the SCM configuration.
           checkout scm

        stage("Installing Dependencies the project") {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }

            }
        stage('Building Docker Image') {
            steps {
                echo 'Making Docker image...'
                sh 'docker build -t edtech-frontend .'
            }
        }
        stage('Running Docker Container') {
            steps {
                echo 'Running Docker container...'
                sh 'docker run -d -p 8082:80 edtech-frontend'
            }
        }
}