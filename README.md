# Memory Game Project

## Table of Contents

* [Description](#description)
* [Game Logic](#GameLogic)
* [Contributing](#contributing)


## Description

This is the memory game project, made by Assem Said as a required project in Udacity's Front-End Web Development Nanodegree using JavaScript and jQuery. Some functions were used from external sources as follows:
1- The Shuffle Function from (http://stackoverflow.com/a/2450976).
2- StopWatch Function from (https://jsfiddle.net/Daniel_Hug/pvk6p/).
3- PopUp Function from [Sweet Alert 2](https://sweetalert2.github.io/). 
Also I have used CSS animation effects on the game cards provided by [Animate.CSS](https://github.com/daneden/animate.css).

## Game Logic

The game starts with startGame function that removes any child elements of the deck which is an ul, sets variables to 0, clears the timer, restores the ranking stars classes to full, and shuffles the card symbols array then creates cards elements under the ul and assigns a symbol as a class to each card. 

Upon clicking on any of the cards the timer function starts with a closure to make sure that it doesn't run with every click. The click event selects the card with .card class and makes sure that it doesn't have .show or open classes and the event handler function checks if the shown cards are 2 then it stops the execution of code to prevent flipping more than 2 cards at a time. Then it adds the shown card class to an array and add the classes .show and .open to it. After that it matches the shown cards classes in the array and if they match then it assigns them .match class, increments the match variable, and empties the array or else it will remove the .show and .open classes from the cards and empties the array, then it increments the moves variable. 



## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
