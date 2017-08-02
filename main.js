// jsRPG
// main.js
// Version 3
// Version 3 refactors much of the character code and makes them both objects.  We
// finally have some user input via arguments that lets you set a player name.  It
// is still pretty boring with only one class of character and one kind of enemy.

// Game Variables
let gameActive = true;
let lookingForBattle = false
let inBattle = false

// Hero Object
//
// Hero Properties
// name is set by passed in argument or defaults to Hero
// level is the Level of the player
// maxHealth is the maximum health the hero can possess
// currentHealth is the player's health as it currently stands.
// attackPower is a basic attack number used for damage
// currentExperience is the amount of experience points the hero has
// gained so far
// untilNextLevel is the amount of experience required to reach the next heroLevel
// Hero Methods
// attack returns the attack power which may change with modifiers
// defend takes damage and outputs it to the console

const player = {
  // Player Properties
  name: process.argv[2] || 'Hero',
  level: 1,
  maxHealth: 20,
  currentHealth: 20,
  attackPower: 5,
  currentExperience: 0,
  untilNextLevel: 10,
  // Player Methods
  doLevelUp: function() {
    this.level++
    this.currentExperience = 0
    this.untilNextLevel = Math.floor(this.untilNextLevel * 1.10)
      console.log(this.name + ' leveled up! Now level ' + this.level + '! Health restored!')
  },
  attack: function(defender) {
    return this.attackPower
  },
  defend: function(attacker) {
    this.currentHealth -= attacker.attack()
    console.log(attacker.name + ' attacks ' + this.name + ' for ' + attacker.attack() + ' damage! Decreasing his health to ' + this.currentHealth + '/' + this.maxHealth )
  }

}
// Enemy Variables
// name is the enemies name
// maxHealth is the maximum health the enemy can possess
// currentHealth is the enemies health as it currently stands.
// attackPower is a basic attack number used for damage
// experience is the amount of experience given when enemy is destroyed
// Enemy Methods
// attack returns the attack power which may change with modifiers
// defend takes damage and outputs it to the console
const enemy = {
  // Enemy Properties
  name: 'Enemy',
  maxHealth: 10,
  currentHealth: 10,
  attackPower: 3,
  experience: 5,
  // Enemy Methods
  attack: function(defender) {
    return this.attackPower
  },
  defend: function(attacker) {
    this.currentHealth -= attacker.attack()
    console.log(attacker.name + ' attacks ' + this.name + ' for ' + attacker.attack() + ' damage! Decreasing his health to ' + this.currentHealth + '/' + this.maxHealth)
  }
}

// Main Game loop
// While inBattle is true and both the hero and enemy have health, run the
// battle loop

let StartBattle = function () {
  lookingForBattle = false
  inBattle = true
  while (inBattle) {
    // Launch attacks from both characters
    enemy.defend(player)
    player.defend(enemy)
    // Check for a battle win condition if player still has health and enemyAttackPower
    // does not.
    if (player.currentHealth > 1 && enemy.currentHealth < 1) {
      // Log a generic you won message and set the inBattle boolean false, exits
      // the loop
      console.log('You won')
      // Add the enemyExperience to the players collected experience
      player.currentExperience += enemy.experience
      // Log out what was added and how close we are to leveling up
      console.log(player.name + ' gained ' + enemy.experience + ' experience and now has ' + player.currentExperience + '/' + player.untilNextLevel + ' for level up')
      // If we've met the experience required for leveling up, do so
      if (player.currentExperience >= player.untilNextLevel) {
        player.doLevelUp()
        // We set hero health back to maximum so the game goes a bit further
        player.currentHealth = player.maxHealth
      }
      // Restores enemy health back to 100% to simulate new enemy
      enemy.currentHealth = enemy.maxHealth
      inBattle = false
      lookingForBattle = true
      break;
    } else if (enemy.currentHealth > 1 && player.currentHealth < 1) {
      // Log a generic you lose / game over message.
      console.log('You lose - Game Over')
      console.log(player.name + ' has died at level ' + player.level)
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
