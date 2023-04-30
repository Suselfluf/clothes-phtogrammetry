Before usage:
run virtual environment

venv/scripts/Activate.ps1 - for windows pc

From backend folder
python -m pip install requirements.txt
python .\manage.py runserver 192.168.0.108:8000 // To start django backend server where ip should be your local address !!
run the command from backend folder 

augworkshop/settings.py ALLOWED_HOSTS should include frontend ipv4 adress 
backend/crokiclothes/views.py  ConvertingView class change url to flask end point url !!

From frontend folder
yarn install
yarn run dev - To start react front end application
run the command from frontend folder
const/urls.jsx file should be changed with respect to new flask meshroom end point adress

![](https://github.com/Suselfluf/clothes-phtogrammetry/blob/develop/clothes%20preview%20giff.gif)