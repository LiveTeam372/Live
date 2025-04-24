pipeline {
    agent any

    environment {
        CI = 'false'
        DOCKER_IMAGE_FRONTEND = "venivivi/live-frontend"
        DOCKER_IMAGE_BACKEND = "venivivi/live-backend"
        DOCKER_TAG = "latest"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/LiveTeam372/Live.git'
                sh 'git clean -fdx' // 깃에 없는 파일 및 디렉토리 강제 삭제
            }
        }   

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG -f frontEnd/Dockerfile frontEnd"
                    sh "docker build -t $DOCKER_IMAGE_BACKEND:$DOCKER_TAG -f backEnd/Dockerfile backEnd"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                 script {
                    echo '🏗️ 시작: 이미지 Docker Hub에 푸시 준비 중...'
        
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        echo '🔐 Docker Hub 로그인 성공'
                        sh "docker push $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG"
                        sh "docker push $DOCKER_IMAGE_BACKEND:$DOCKER_TAG"
                        echo '✅ 이미지 푸시 성공'
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['server-ssh-access']) {
sh '''
ssh -o StrictHostKeyChecking=no live@54.180.159.162 <<EOF
cd /home/live/live-project
docker-compose pull frontEnd backEnd
docker-compose down frontEnd backEnd
docker-compose up -d frontEnd backEnd
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