#> window main-server
#> pane 0
cd /home/david/workspace/GenFlow/main-server
npm run start:dev

#> window web-frontend
cd /home/david/workspace/GenFlow/web-frontend
npm run dev

#> window file-server
#> pane 0
cd /home/david/workspace/GenFlow/file-server
npm run dev

#> window workers
#> pane 0
cd /home/david/workspace/GenFlow/executive-server
conda activate GenFlow
python executive-server.py

#> window other
#> pane 0
cd /home/david/workspace/GenFlow/
sudo docker start rabbitmq
lipax123
