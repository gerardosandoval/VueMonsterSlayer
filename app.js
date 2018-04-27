new Vue({
  el: "#app",
  data: {
    isPlaying: false,
    playerHealth: 100,
    monsterHealth: 100,
    turnTrace: []
  },
  methods: {
    giveUp: function() {
      answer = confirm("Press 'Ok' to be a coward")
      if (answer == true ) {
        this.isPlaying = false
        this.resetGame()
      }
    },
    attack: function() {
      var playerDemage = this.demage(10, 1)
      var monsterDemage = this.demage(10, 1)
      this.monsterHealth -= monsterDemage
      this.traceAtack("player", "monster", "attack", monsterDemage)
      this.monsterAtack(playerDemage, "attack")
    },
    specialAttack: function() {
      var playerDemage = this.demage(25, 10)
      var monsterDemage = this.demage(25, 10)
      this.monsterHealth -= monsterDemage
      this.traceAtack("player", "monster", "specialAttack", monsterDemage)
      this.monsterAtack(playerDemage, "specialAttack")
    },
    heal: function() {
      var playerHeal = Math.floor((Math.random() * 15) + 1)
      var playerDemage = this.demage(10, 1)
      if ((this.playerHealth + playerHeal) >= 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += playerHeal
      }
      this.traceAtack("player", "", "heal", playerHeal)
      this.monsterAtack(playerDemage, "attack")
    },
    checkScore: function() {
      answer = null
      if (this.monsterHealth < 1) {
        answer = confirm("You win! new game?");
      } else if (this.playerHealth < 1) {
        answer = confirm("Monster wins! new game?");
      }
      if (answer == true ) {
        this.resetGame()
      } else if(answer == false) {
        this.isPlaying = false
      };
    },
    resetGame: function() {
      this.playerHealth = this.monsterHealth = 100
      this.turnTrace = []
    },
    demage: function(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    traceAtack: function(from, to, type, amount) {
      this.turnTrace.unshift({from: from, to: to, type: type, amount: amount})
    },
    monsterAtack: function(playerDemage, type) {
      vt = this
      setTimeout( function() {
        vt.playerHealth -= playerDemage
        vt.traceAtack("monster", "player", type, playerDemage)
        vt.checkScore()
      }, 100)
    }
  },
  watch: {
    isPlaying: function() {
      if (this.isPlaying == true){
        this.resetGame()
      }
    }
  }
});