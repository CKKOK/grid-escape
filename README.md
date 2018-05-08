# grid-escape
Investigation of a Grid Escape Math Problem

1.  This is a simulation/visualization of the problem at <https://www.theguardian.com/science/2018/may/07/did-you-solve-it-im-a-mathematician-get-me-out-of-here>. It was developed to generate some data to visualize the best / worst case scenarios as well as their distributions for the complexity of the escape route length.

2.  Run it with 'node solution.js (gridSize) (interval in ms) (number of iterations before breaking)'

3.  Running it without arguments will cause the script to prompt you for them.

4.  To log the grid states, run it with 'node solution.js (gridSize) (interval) (threshold) > output.log'. In this case, you _must_ specify the arguments.