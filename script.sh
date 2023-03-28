sudo apt update
sudo apt upgrade -y
echo "apt 버전 최신"

echo "net-tools 설치"
sudo apt install net-tools
echo "net-tools 설치완료"

echo "curl 설치"
sudo apt install curl
echo "curl 설치완료"

echo "nvm 설치"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
echo "nvm 설치완료"

echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.bashrc

source ~/.bashrc

echo "nvm 버전확인"
echo $(nvm --version)

nvm install node --lts
echo "Node 최신버전 설치"

echo "node 버전확인"
echo $(node --version)

echo "npm 버전확인"
echo $(npm --version)

echo "MySQL 설치"
sudo apt install mysql-server -y
echo "MySQL 설치완료"

echo "mysql 버전"
echo $(mysql --version)

echo "pm2 설치"
npm install -g pm2
echo "pm2 설치완료"

echo "pm2 버전확인"
echo $(pm2 --version)

echo "snapd 설치"
sudo apt-get install snapd
echo "snapd 설치완료"

echo "snap 설치"
sudo snap install core
sudo snap refresh core
echo "snap 설치완료"

echo "certbot 설치"
sudo snap install --classic certbot
echo "certbot 설치완료"

echo "certbot 등록"
sudo ln -s /snap/bin/certbot /usr/bin/certbot
echo "certbot 등록완료"