// jsRPG
// main.js
// Version 1
// This version implements two entities battling.  There is no randomness,
// very simple statistics, and virtually no fun.  Once the Hero wins, which
// is inevitable the way it is currently set up, the loop exits and you win.
// Again, pretty boring.

// Game Variables
let inBattle = true

// Hero Variables
// heroCurrentHealth is the player's health as it currently stands.
// heroAttackPower is a basic attack number used for damage
const HERONAME = 'Hero'
let heroCurrentHealth = 20
let heroAttackPower = 5

// Enemy Variables
// enemyCurrentHealth is the enemies health as it currently stands.
// enemyAttackPower is a basic attack number used for damage
const ENEMYNAME = 'enemy'
let enemyCurrentHealth = 10
let enemyAttackPower = 3

// Main Game loop
// While inBattle is true and both the hero and enemy have health, run the
// battle loop
while (inBattle) {
  // Subtract the hero's attack power from the enemy health
  enemyCurrentHealth -= heroAttackPower
  // Log the new data to the console
  console.log('You hit the enemy for ' + heroAttackPower + ' and decrease enemy health to ' + enemyCurrentHealth)
  // Subtract the enemies attack power from Hero health
  heroCurrentHealth -= enemyAttackPower
  // Log the new data to console
  console.log('Enemy hits you for ' + enemyAttackPower + ' and decrease\'s your health to ' + heroCurrentHealth)
  // Check for a battle win condition if player still has health and enemyAttackPower
  // does not.
  if (heroCurrentHealth > 1 && enemyCurrentHealth < 1) {
    // Log a generic you won message and set the inBattle boolean false, exits
    // the loop
    console.log('You won')
    inBattle = false
    break;
  } else if (enemyCurrentHealth > 1 && heroCurrentHealth < 1) {
    // Log a generic you lose / game over message.  With the current
    // implementation this code should never run.
    console.log('You lose - Game Over')
    inBattle = false
    break;
  }
}
