echo "BUILD ================================================================="
docker build -t api_revendeur_epsi .
echo "RUN ==================================================================="
docker stop api_revendeur_epsi || true && docker rm -f api_revendeur_epsi || true
docker run -d --name api_revendeur_epsi -p "4002:3000" api_revendeur_epsi