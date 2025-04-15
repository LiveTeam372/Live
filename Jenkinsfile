pipeline {
    agent any

    environment {
        CI = 'false'
        DOCKER_IMAGE_FRONTEND = "venivivi/live-frontEnd"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/LiveTeam372/Live.git'
            }
        }

        stage('Build React App') {
            steps {
                dir('frontEnd') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }       

        stage('Build React Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG -f frontEnd/Dockerfile frontEnd
                    """
                }
            }
        }
        
        stage('Push React to Docker Hub') {
            steps {
                 script {
                    echo '🏗️ 시작: React 이미지 Docker Hub에 푸시 준비 중...'
        
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        echo '🔐 Docker Hub 로그인 성공'
                        sh "docker push $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG"
                        echo '✅ React 이미지 푸시 성공'
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['server-ssh-access']) {
sh '''
ssh live@54.180.159.162 <<EOF
cd /home/live/live-project
docker-compose pull frontEnd
docker-compose down frontEnd
docker-compose up -d frontEnd
EOF
'''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}