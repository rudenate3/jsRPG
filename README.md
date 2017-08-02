# jsRPG
### Version 3

[![forthebadge](http://forthebadge.com/images/badges/made-with-crayons.svg)](http://forthebadge.com)

## Summary
Version 3 refactors much of the character code and makes them both objects.  We 
finally have some user input via arguments that lets you set a player name.  It
is still pretty boring with only one class of character and one kind of enemy.


## Running
To run the game, just run `node main.js <playerName>` from the root directory.

## Changelog

#### Version 3
* Change Hero and Entity declarations into objects
* Create basic functions to handle attacking and defending
* Move level up function to player object
* Allow heroe's name to be set by argument list
* Fixed typos and bugs

#### Version 2
* adds max health for entities
* adds generic attack function
* adds experience and basic level up functionality
* adds multiple fights until hero dies
