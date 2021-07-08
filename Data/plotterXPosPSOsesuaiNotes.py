import matplotlib.pyplot as plt
from test import test

time = test['time']
xPos = test['xPos']

xPosProcessed = []
for data in xPos:
    xPosProcessed.append(data +0.93)
plt.plot(time, xPosProcessed)

plt.show()