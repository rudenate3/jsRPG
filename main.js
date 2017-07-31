// jsRPG
// main.js
// Version 2
// This version adds a few new features and cleans up some of the code a bit.
// The game is still pretty boring though, with no user input These
// characters are getting hard to extend and manage.  I wonder if there is
// a better way...

// Game Variables
let gameActive = true;
let lookingForBattle = false
let inBattle = false

// Hero Variables
// heroLevel is the heroLevel of the player
// heroMaxHealth is the maximum health the hero can possess
// heroCurrentHealth is the player's health as it currently stands.
// heroAttackPower is a basic attack number used for damage
// heroCurrentExperience is the amount of experience points the hero has
// gained so far
// heroUntilNextLevel is the amount of experience required to reach the next heroLevel
const HERONAME = 'Hero'
let heroLevel = 1
let heroMaxHealth = 20
let heroCurrentHealth = 20
let heroAttackPower = 5
let heroCurrentExperience = 0
let heroUntilNextLevel = 10

let doLevelUp = function() {
  heroLevel++
  heroCurrentExperience = 0
  heroUntilNextLevel = Math.floor(heroUntilNextLevel * 1.10)
  console.log(HERONAME + ' leveled up! Now level ' + heroLevel + '! Health restored!')
}

// Enemy Variables
// enemyMaxHealth is the maximum health the enemy can possess
// enemyCurrentHealth is the enemies health as it currently stands.
// enemyAttackPower is a basic attack number used for damage
// enemyExperience is the amount of experience given when enemy is destroyed
const ENEMYNAME = 'Enemy'
let enemyMaxHealth = 10
let enemyCurrentHealth = 10
let enemyAttackPower = 3
let enemyExperience = 5

// Functions

// Attack(attackerName, attackerAttack, defenderName, defenderHP)
// Takes 4 parameters, an attackerName, attackerAttack, defenderName, and
// defenderAttack.  This function feels like it takes more parameters than
// we should need and isn't very extendable.  It also feels a bit hacky
// especially since we still need to return the value and assign it.
let Attack = function(attackerName, attackerAttack, defenderName, defenderHP) {
  // Logs attack to console
  console.log(attackerName + ' hits the ' + defenderName + ' for ' + attackerAttack + ' and decreases ' + defenderName +'\'s health to ' + defenderHP)
  // returns new health value
  return defenderHP -= attackerAttack
}

// Main Game loop
// While inBattle is true and both the hero and enemy have health, run the
// battle loop

let StartBattle = function () {
  lookingForBattle = false
  inBattle = true
  while (inBattle) {
    // Launch attacks from both characters
    enemyCurrentHealth = Attack(HERONAME, heroAttackPower, ENEMYNAME, enemyCurrentHealth)
    heroCurrentHealth = Attack(ENEMYNAME, enemyAttackPower, HERONAME, heroCurrentHealth)
    // Check for a battle win condition if player still has health and enemyAttackPower
    // does not.
    if (heroCurrentHealth > 1 && enemyCurrentHealth < 1) {
      // Log a generic you won message and set the inBattle boolean false, exits
      // the loop
      console.log('You won')
      // Add the enemyExperience to the players collected experience
      heroCurrentExperience += enemyExperience
      // Log out what was added and how close we are to leveling up
      console.log('Hero gained ' + enemyExperience + ' experience and now has ' + heroCurrentExperience + '/' + heroUntilNextLevel + ' for heroLevel up')
      // If we've met the experience required for leveling up, do so
      if (heroCurrentExperience >= heroUntilNextLevel) {
        doLevelUp()
        // We set hero health back to maximum so the game goes a bit further
        heroCurrentHealth = heroMaxHealth
      }
      // Restores enemy health back to 100% to simulate new enemy
      enemyCurrentHealth = enemyMaxHealth
      inBattle = false
      lookingForBattle = true
      break;
    } else if (enemyCurrentHealth > 1 && heroCurrentHealth < 1) {
      // Log a generic you lose / game over message.
      console.log('You lose - Game Over')
      console.log(HERONAME + ' has died at level ' + heroLevel)
      inBattle = false
      gameActive = false
      break;
    }
  }
}

// Game Loop
// This is the loop that keeps our game running while the player is still alive.
// Once gameActive is set to false, the game is over and the loop completes.
// We only have inBattle and lookingForBattle right now so it may be confusing
// why we need both, but eventually there will be other 'modes' the game could
// be in such as 'inTown' or 'inShop'
while (gameActive) {
  if (inBattle == false && lookingForBattle == false) {
    lookingForBattle = true
  }
  if (lookingForBattle == true) {
    StartBattle()
  }
}
