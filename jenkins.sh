echo "BUILD ================================================================="
docker-compose build  
echo "DEPLOY ==================================================================="
docker-compose -f ./docker-compose.yml --compatibility -p api_revendeur_epsi up -d