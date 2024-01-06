
# cigarette-i-smoked


It is a hobby project, i have created a github action which runs every day around 05:15 pm and fetches pm2.5 level from 
https://waqi.info for my current city which is Amritsar and then stores then commit the pm2.5 level in data file.

Then on frontend side i divde pm2.5 value with 22 to get a number. Which repersents the no of cigarette (Berkeley Earth's one cigarette per day (24h) is the rough equivalent of a PM2. 5 level of 22 µg/m³ ⁽¹⁾)
