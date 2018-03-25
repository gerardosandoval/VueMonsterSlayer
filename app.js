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
      if (answer == true ) { this.isPlaying = false; }
      this.playerHealth = this.monsterHealth = 100
      this.turnTrace = []
    },
    attack: function() {
      var playerDemage = Math.floor((Math.random() * 10) + 1)
      var monsterDemage = Math.floor((Math.random() * 10) + 1)
      this.monsterHealth -= monsterDemage
      this.turnTrace.unshift({from: "player", to: "monster", type: "attack", amount: monsterDemage})
      vt = this
      setTimeout( function() {
        vt.playerHealth -= playerDemage
        vt.turnTrace.unshift({from: "monster", to: "player", type: "attack", amount: playerDemage})
      }, 250)
    },
    specialAttack: function() {
      var playerDemage = Math.floor(Math.random() * (25 - 10 + 1)) + 10
      var monsterDemage = Math.floor(Math.random() * (25 - 10 + 1)) + 10
      this.monsterHealth -= monsterDemage
      this.turnTrace.unshift({from: "player", to: "monster", type: "attack", amount: monsterDemage})
      vt = this
      setTimeout( function() {
        vt.playerHealth -= playerDemage
        vt.turnTrace.unshift({from: "monster", to: "player", type: "attack", amount: playerDemage})
      }, 250)
    },
    heal: function() {
      var playerHeal = Math.floor((Math.random() * 15) + 1)
      var playerDemage = Math.floor((Math.random() * 10) + 1)
      this.playerHealth += playerHeal
      this.turnTrace.unshift({from: "player", type: "heal", amount: playerHeal})
      setTimeout( function() {
        vt.playerHealth -= playerDemage
        vt.turnTrace.unshift({from: "monster", to: "player", type: "attack", amount: playerDemage})
      }, 250)
    }
  }
});