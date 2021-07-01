import matplotlib.pyplot as plt
from test import test

time = test['time']
xPos = test['xPos']

plt.plot(time, xPos)
plt.show()