#> window main-server
#> pane 0
cd ./main-server
npm run start:dev

#> window web-frontend
#> pane 0
cd ./web-frontend
npm run dev

#> window file-server
#> pane 0
cd ./file-server
npm run dev

#> window workers
#> pane 0
cd ./executive-server
conda activate GenFlow
python executive-server.py

#> window other
#> pane 0
sudo docker start rabbitmq
lipax123
