# Clothes photogrammetry service

## Instalation

### Backend

`python .\manage.py runserver *youripv4*:8000` // To start django backend server where ip should be your local address
run the command from backend folder
augworkshop/settings.py ALLOWED_HOSTS should include frontend ipv4 adress

### Front-end

`yarn run dev` - To start react front end application
run the command from frontend folder
const/urls.jsx file should be changed with respect to new adress

![](https://github.com/Suselfluf/clothes-phtogrammetry/blob/develop/clothes%20preview%20giff.gif)

### It is important to run photogrammetry Flask end point to make applciation work properly.

You can reach this part [here](https://github.com/Suselfluf/meshroom-pipeline): https://github.com/Suselfluf/meshroom-pipeline

---

# Diagrams

## Activity diagram

### Admin side

- <img src="/diagrams/Activity_diagram%201.png" width="80%" height="80%" />

### Client side

- <img src="/diagrams/Activity_diagram_client%202.png" width="80%" height="80%" />

## Class diagram

- <img src="/diagrams/Class%20Diagram.png" width="80%" height="80%" />

## Component diagram

- <img src="/diagrams/Component%20Diagram%20V2.png" width="80%" height="80%" />

## Sequence diagram

### Admin side

- <img src="/diagrams/Sequence%20diagram%201.png" width="80%" height="80%" />

### Client side

- <img src="/diagrams/Sequence%20Diagram%202.png" width="80%" height="80%" />
