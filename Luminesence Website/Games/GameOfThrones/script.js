var app = angular.module("app", []);

app.controller("MainCtrl", function($scope, $timeout, $interval) {

  $scope.pace = 8;
  $scope.paused = false;
  $scope.logs = [];
  $scope.log = function(msg) {
    msg = "Day " + $scope.family.day + " - " + msg;
    $scope.logs.unshift(msg);
    if ($scope.logs.length > 50) {
      $scope.logs.pop();
    }
  }
  $scope.taxCD = 0;
  $scope.taxModifier = 1;
  $scope.collectTaxes = function() {
    if ($scope.taxCD === 0) {
      var taxes = Math.round(Math.random() * 300 * $scope.taxModifier);

      $scope.family.steel += taxes;

      $scope.log("Your tax collection netted " + taxes + " Gold Dragons for your House");
      $scope.taxCD = 15;
    }
  }
  $scope.stage = 0;
  $scope.hireSoldiers = function(amt) {
    amt = Math.floor(amt);
    if ($scope.family.steel >= amt * 10) {
      $scope.family.steel -= amt * 10;
      $scope.family.soldiers += amt;


      $scope.log("You hired " + amt + " soldiers");
    } else {
      $scope.log("Not enough funds to hire soldiers");
    }
  }
   $scope.hireDragon = function(amt) {
    amt = Math.floor(amt);
    if ($scope.family.steel >= amt * 50000) {
      $scope.family.steel -= amt * 50000;
      $scope.family.dragons += amt;
	$scope.family.armymodifier = $scope.family.armymodifier+$scope.family.dragons*4;
      $scope.log("You found " + amt + " dragon");
    } else {
      $scope.log("Not enough funds to find a dragon");
    }
  }
  $scope.hireFamily = function() {
    if ($scope.family.steel >= 10000) {
      $scope.family.steel -= 10000;
      $scope.log("You recruited a retainer");
      $scope.family.members.push({
      name: "Retainer of house",
      alive: true,
      location: "Home"
    });
    } else {
      $scope.log("Not enough funds to recruit family");
    }
  }
  $scope.checkFamilyName = function() {
    if ($scope.houses.indexOf($scope.family.name.toLowerCase().trim()) >= 0) {
      $scope.family.name += "-wannabe";
    }
  }
  /*$scope.places = {
	//name: "",
    //house: "",
	//castles: []
  }
  
  $scope.places.castles.push({
    name: "Winterfell",
    house: "Stark"
	 });
  $scope.places.castles.push({
    name: 'castles Black',
    house: 'Night\'s Watch'
	 });
	$scope.places.castles.push({
    name: 'The Dreadfort',
    house: 'Bolton'
	 });
  $scope.places.castles.push({
    name: 'King\'s Landing',
    house: 'Baratheon'
	 });
  $scope.places.castles.push({
    name: 'Casterly Rock',
    house: 'Lannister'
	 });
  $scope.places.castles.push({
    name: 'Braavos',
    house: 'Braavos'
	 });
  $scope.places.castles.push({
    name: 'Iron Islands',
    house: 'Greyjoy'
	 });
  $scope.places.castles.push({
    name: 'Riverlands',
    house: 'Tully'
	 });
  $scope.places.castles.push({
    name: 'Vale of Arryn',
    house: 'Arryn'
	 });
  $scope.places.castles.push({
    name: 'Lannisport',
    house: 'Lannister'
	 });
  $scope.places.castles.push({
    name: 'High Garden',
    house: 'Tyrell'
});
  $scope.places.castles.push({
    name: 'Dorne',
    house: 'Martell'
 });	
  $scope.places.castles.push({
    name: 'White Harbour',
    house: 'Stark'
  });
    */
$scope.places = [{
    name: 'Winterfell',
    house: 'Stark'
  }, {
    name: 'Castle Black',
    house: 'Night\'s Watch'
  }, {
    name: 'The Dreadfort',
    house: 'Bolton'
  }, {
    name: 'King\'s Landing',
    house: 'Baratheon'
  }, {
    name: 'Casterly Rock',
    house: 'Lannister'
  }, {
    name: 'Braavos',
    house: 'Braavos'
  }, {
    name: 'Iron Islands',
    house: 'Greyjoy',
    color: "grey"
  }, {
    name: 'Riverlands',
    house: 'Tully'
  }, {
    name: 'Vale of Arryn',
    house: 'Arryn'
  }, {
    name: 'Lannisport',
    house: 'Lannister'
  }, {
    name: 'High Garden',
    house: 'Tyrell'
  }, {
    name: 'Dorne',
    house: 'Martell'
  }, {
    name: 'White Harbour',
    house: 'Stark'
  }];
  $scope.family = {
    name: "",
    steel: 1000,
    soldiers: 20,
	armymodifier: 1,
	dragons: 0,
    members: [],
    day: 0,
    enemies: [],
    allies: []
  }

  $scope.addMember = function(name) {
    $scope.newMemberName = "";
    $scope.family.members.push({
      name: name,
      alive: true,
      location: "Home"
    });

  }

  $scope.houses = [
    "stark",
    "lannister",
    "baratheon",
    "greyjoy",
    "bolton",
    "martell",
    "targaryen",
    "tully",
    "arryn",
    "tyrell",
    "clegane",
    "frey",
    "Lumi"
  ]

  $scope.lords = [
    "Little Finger",
    "Varys",
    "Ned Stark",
    "Robb Stark",
    "Cersei Lannister",
    "Robert Baratheon",
    "Theon Greyjoy",
    "Roose Bolton",
    "Joffrey Baratheon",
    "Stannis Baratheon",
    "Tywin Lannister",
    "Tyrion Lannister",
    "Doran Martell",
    "Margery Tyrell",
    "Ollena Tyrell",
    "Selyse Baratheon",
    "Balon Greyjoy",
    "Real Man"
  ]

  $scope.people = [
    "Little Finger",
    "Varys",
    "Ned Stark",
    "Robb Stark",
    "Balon Greyjoy",
    "Cersei Lannister",
    "Robert Baratheon",
    "Theon Greyjoy",
    "Ramsay Bolton",
    "Jaime Lannister",
    "Joffrey Baratheon",
    "Tommen Baratheon",
    "Stannis Baratheon",
    "Renley Baratheon",
    "Brienne of Tarth",
    "Jon Snow",
    "Tywin Lannister",
    "Tyrion Lannister",
    "Davos Seaworth",
    "Melisandre",
    "Doran Martell",
    "Margery Tyrell",
    "Gregor Clegane",
    "Sandor Clegane",
    "Hodor",
    "Edmure Tully",
    "Ollena Tyrell",
    "Maester Aemon",
    "Samwell Tarley",
    "Roose Bolton",
    "Walder Frey",
    "Meryn Trant",
    "Mance Rayder",
    "Selyse Baratheon",
    "Wylla",
    "Allister Thorne",
    "Loras Tyrell",
    "Kevan Lannister",
    "JSTDAM"
  ]

 $scope.run = function() {
    $timeout(function() {
      var event = $scope.events[Math.floor(Math.random() * $scope.events.length)];
      console.log(event);
      event();
      $scope.updateState();
      if (!$scope.paused) {
        $scope.family.day++;
        $scope.run();
      }
    }, 2000 - $scope.pace * 100);
  }
  $scope.pause = function() {
    $scope.paused = true;
  }
  $scope.continue = function() {
    if ($scope.paused) {
      $scope.paused = false;
      $scope.run();
    }
  }

  $scope.start = function() {
    $scope.pace = parseInt($scope.pace);
    if ($scope.family.name.length > 0 && $scope.family.members.length > 0) {
      $scope.started = true;
      angular.forEach($scope.family.members, function(member) {
        if (member.name.indexOf($scope.family.name) < 0) {
          member.name += " " + $scope.family.name;
        }
      });

      $scope.family.soldiers = parseInt($scope.family.soldiers);
      $scope.family.steel = parseInt($scope.family.steel);
      $scope.run();
    }

  }

  $scope.end = function(message) {

    $timeout(function() {
      $scope.gameOver = message;
    }, 2500);

  }

  $scope.randomFamily = function(onlyAlive) {
    var pool = [];
    angular.forEach($scope.family.members, function(member) {
      if (onlyAlive && member.alive || !onlyAlive) {
        pool.push(member);
      }
    });
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)]
    } else {
      return null
    }
  }

 $scope.updateState = function() {
    var someFamilyIsAlive = false;
    var somebodyIsAlive = $scope.people.length > 0;
    if ($scope.taxCD > 0) {
      $scope.taxCD--;
    }
    if ($scope.assassinationCD > 0) {
      $scope.assassinationCD--;
    }
    if ($scope.territoryTax > 0) {
      $scope.territoryTax--;
    }
    angular.forEach($scope.family.members, function(member) {
      if (member.alive) {
        someFamilyIsAlive = true;
      }
    });

    if (!somebodyIsAlive) {
      $scope.pause();
      $scope.end("Well, look at that, you killed everyone who poses a threat to you, well done. You survived Westeros.")
    }

    if (!someFamilyIsAlive) {
      $scope.pause();
      $scope.end("Welp, there goes the last of your House, you survived " + $scope.family.day + " days in Westeros.");
    }
  }
  $scope.assassins = [{
    name: "Some Street Thug",
    price: 20,
    successRate: 0.01
  }, {
    name: "Quickfinger",
    price: 500,
    successRate: 0.12
  }, {
    name: "The Sorrowful Men",
    price: 1000,
    successRate: 0.25
  }, {
    name: "Sand Vipers",
    price: 2000,
    successRate: 0.4
  }, {
    name: "The Alchemist",
    price: 2500,
    successRate: 0.5
  }, {
    name: "The Faceless Men",
    price: 30000,
    successRate: 0.95
  }]
  $scope.diplomacy = [{
    name: "No gifts",
    price: 20,
    successRate: 0.01
  }, {
    name: "A fine wine",
    price: 500,
    successRate: 0.12
  }, {
    name: "Chest of gold",
    price: 1000,
    successRate: 0.25
  }, {
    name: "A hamlet",
    price: 2000,
    successRate: 0.4
  }, {
    name: "A village",
    price: 2500,
    successRate: 0.5
  }, {
    name: "A small city",
    price: 30000,
    successRate: 0.95
  }]
  $scope.showAssassinOptions = false;
  $scope.showDiploOptions = false;
  $scope.assassinationTarget = "";
  $scope.assassinationCD = 0;
  $scope.diploCD = 0;
  $scope.cancelAssassination = function() {
    $scope.showAssassinOptions = false;
    $scope.continue();
  }
    $scope.cancelDiplo = function() {
    $scope.showDiploOptions = false;
    $scope.continue();
  }
  $scope.confirmAssassination = function(person) {
    if ($scope.assassinationCD === 0 && $scope.stage >= 0) {
        $scope.assassinationTarget = person;
		$scope.pause();
        $scope.showAssassinOptions = true;
      }

    }
  
	$scope.confirmDiplo = function(person) {
    if ($scope.diploCD === 0 && $scope.stage >= 0) {
        $scope.diploTarget = person;
		$scope.pause();
        $scope.showDiploOptions = true;
      }

    }
  

  $scope.orderKill = function(assassin, person) {
    if ($scope.family.steel >= assassin.price) {
      $scope.family.steel -= assassin.price;
      $scope.showAssassinOptions = false;
      var roll = Math.random();
      if (roll < assassin.successRate) {
        $scope.killPerson(person);
        $scope.log("You hired " + assassin.name + " to kill " + person + ", and the attempt was successful");
      } else {
        $scope.log("Unfortunately, " + assassin.name + " has failed the attempt on " + person + "'s life, but quickly retreated before being caught");
      }
      $scope.continue();
      $scope.assassinationCD = 25;
    }

  }

  $scope.orderDiplo = function(diplomacy, person) {
    if ($scope.family.steel >= diplomacy.price) {
      $scope.family.steel -= diplomacy.price;
      $scope.showDiploOptions = false;
      var roll = Math.random();
      if (roll < diplomacy.successRate ) {
        $scope.family.allies.push(person);
        $scope.log("Sent a gift, " + diplomacy.name + " to get an alliance with " + person + ", and the attempt was successful");
      } else {
        $scope.log("Unfortunately, " + diplomacy.name + " has failed to get an alliance with " + person);
      }
      $scope.continue();
	  $scope.diploCD = 25;
    }

  }
  $scope.killPerson = function(person) {
    if ($scope.family.allies.indexOf(person) >= 0) {
      $scope.family.allies.splice($scope.family.allies.indexOf(person), 1);
    }
    if ($scope.family.enemies.indexOf(person) >= 0) {
      $scope.family.enemies.splice($scope.family.enemies.indexOf(person), 1);
    }

    $scope.people.splice($scope.people.indexOf(person), 1);
  }

  $scope.events = []
  $scope.territoryTax = 0;
  var taxCollection = function() {
    var tax = 0;
    if ($scope.territoryTax == 0) {
      angular.forEach($scope.places, function(place) {
        if (place.house === $scope.family.name) {
          tax += 1200;
        }
      });

      if (tax > 0) {
        $scope.territoryTax = 30;
        $scope.family.steel += tax;
        $scope.log("Your House collected " + tax + " Gold Dragons from territories");
      }
    }
  }
  $scope.events.push(taxCollection);

  var invasion = function() {
    if (Math.random() < 0.05) {
      if ($scope.family.soldiers > 0) {
        var enemies = Math.floor(Math.random() * $scope.family.soldiers + 10);
        $scope.family.soldiers -= Math.floor(enemies * Math.random() * 0.5 / $scope.armymodifier);

        var invader = $scope.people[Math.floor(Math.random() * $scope.people.length)];

        if ($scope.family.enemies.indexOf(invader) >= 0) {
          $scope.log("That scallywag, " + invader + " attacked your home with an army of " + enemies + ". Your defending soldiers are now " + $scope.family.soldiers);

        } else if ($scope.family.allies.indexOf(invader) >= 0) {
          $scope.log("Oh no! " + invader + " decided to backstab you. With an army of " + enemies + " Your soldiers fought valiantly against what they thought were friends. " + $scope.family.soldiers + " of your men left standing, and they want revenge. " + invader + " has been moved to the enemies list for this betrayal");
          $scope.family.allies.splice($scope.family.allies.indexOf(invader), 1);
          $scope.family.enemies.push(invader);
        } else {
          $scope.log("Who knows what pushed " + invader + " to attack you with an army of " + enemies + "? In any case, they are now enemies.");
          $scope.family.enemies.push(invader);
        }
      }
    }
  }
  $scope.events.push(invasion);

  var assassin = function() {
    if (Math.random() < 0.01) {
      var victim = $scope.randomFamily(true);
      if (victim) {
        victim.alive = false;
        var perpetrator = $scope.people[Math.floor(Math.random() * $scope.people.length)];
        $scope.log("In the depth of night at " + victim.location + ", an assassin murdered " + victim.name + " in cold blood, and silently left, leaving behind only a note: 'Regards, " + perpetrator + "'. Could this be the one who hired the assassin?");
        if ($scope.family.allies.indexOf(perpetrator) >= 0) {
          $scope.family.allies.splice($scope.family.allies.indexOf(perpetrator), 1);
        }

        if ($scope.family.enemies.indexOf(perpetrator) < 0) {
          $scope.family.enemies.push(perpetrator);
        }

      }
    }

  }
  $scope.events.push(assassin);

  var allianceWith = function() {
    if (Math.random() < 0.13) {
      var person = $scope.people[Math.floor(Math.random() * $scope.people.length)];

      if ($scope.family.allies.indexOf(person) < 0) {
        if ($scope.family.enemies.indexOf(person) >= 0) {
          if (Math.random() < 0.3) {
            $scope.log(person + " came to you to beg forgiveness. In a move that will go down in history as 'Extremely stupid', you do. Oh well, lets see what happens next");
            $scope.family.enemies.splice($scope.family.enemies.indexOf(person), 1);
          } else {
            $scope.log(person + " came to you to beg forgiveness. You cleverly rejected the proposal. Well done.");
          }
        } else {
          if (Math.random() < 0.3) {
            $scope.log(person + " proposed to form an alliance with you. You decided against the proposal, they seem difficult to trust");
          } else {

            if (person === "Hodor") {
              $scope.log("Hodor wants to help you - 'Hodor'");
            } else {

              var msg = person + " proposed to form an alliance with you, and you gladly accepted it. ";
              if ($scope.lords.indexOf(person) >= 0) {
                var steel = Math.round(Math.random() * 10000 + 400);
                var soldier = Math.round(Math.random() * 400 + 20);
                $scope.family.steel += steel;
                $scope.family.soldiers += soldier;
                msg += "In celebration, " + person + " gifted you with " + steel + " Gold Dragons and " + soldier + " Soldiers";
              }
              $scope.log(msg);
            }

            $scope.family.allies.push(person);

          }
        }
      }
    }
  }
  $scope.events.push(allianceWith);

   var invadePlace = function() {
    var randomchance = Math.random()*1500/($scope.family.soldiers*$scope.family.armymodifier);
    if (randomchance() < 0.2 && $scope.stage > 0) {
      var randPlace = $scope.places[Math.floor(Math.random() * $scope.places.length)];
      if (randPlace.house != $scope.family.name && randPlace.name != "Castle Black") {
        if (randomchance() < 0.2 && $scope.family.soldiers > 400) {
          var newMen = Math.round(Math.random() * 100) + 5;
          var newSteel = Math.round(Math.random() * 3000) + 100;

          var leader = $scope.randomFamily(true);

          $scope.log(leader.name + " marched against " + randPlace.name + " and took it with " + $scope.family.soldiers + " men. Turns out, the people of " + randPlace.name + " welcomed your house, and provided you with " + newMen + " new soldiers and " + newSteel + " Gold Dragons");

          leader.location = randPlace.name;
          randPlace.house = $scope.family.name;
          $scope.family.steel += newSteel;
          $scope.family.soldiers += newMen;
        } else if (randomchance() < 0.5 && randomchance() > 0.2 &&  $scope.family.soldiers > 400) {
          var soldiersDied = Math.floor(Math.random() * $scope.family.soldiers * 0.5);
          var leader = $scope.randomFamily(true);
          $scope.log(leader.name + " marched against " + randPlace.name + " and captured it despite fairly heavy losses, " + soldiersDied + " soldiers died.");

          $scope.family.soldiers -= soldiersDied;
        }
        
        else if ($scope.family.soldiers > 400) {
          var soldiersDied = Math.floor(Math.random() * $scope.family.soldiers * 0.8);

          var leader = $scope.randomFamily(true);

          $scope.log(leader.name + " marched against " + randPlace.name + " but failed to take it. In the process, " + soldiersDied + " soldiers died. It was a devastating loss");

          $scope.family.soldiers -= soldiersDied;
        }
      }
    }
  }
  $scope.events.push(invadePlace);

  var summons = function() {
    if (Math.random() < 0.2 && $scope.stage === 0 && $scope.family.steel > 400) {
      var summoned = $scope.randomFamily(true);
      summoned.location = "King's Landing";
      $scope.log(summoned.name + " has been summoned to King's Landing to serve as Hand of the King. Your House received 20,000 Gold Dragons and 1500 Soldiers for the service")

      var soldiers = 1500;
      var steel = 20000;

      $scope.family.steel += steel;
      $scope.family.soldiers += soldiers;

      $scope.stage = 1;
    }
  }
  $scope.events.push(summons);

  var kingDies = function() {
    if (Math.random() < 0.2 && $scope.stage == 1) {
      angular.forEach($scope.family.members, function(member) {
        member.location = "Home";
      });
      $scope.log("News of the King's Death spread. Everyone in your house returned Home safely to prepare for the worst.");
      $scope.stage = 2;
    } else if ($scope.stage == 1) {
      angular.forEach($scope.family.members, function(member) {
        if (member.location === "King's Landing" && member.alive) {
          member.alive = false;
          $scope.log(member.name + " was beheaded in King's Landing by order of Joffrey Baratheon");
          if ($scope.family.enemies.indexOf("Joffrey Baratheon") < 0) {
            $scope.family.enemies.push("Joffrey Baratheon");
          }
        }
        $scope.stage = 2;
      });
      $scope.stage = 2;
    }
  }

  $scope.events.push(kingDies);

  var winterIsComing = function() {
    if (Math.random < 0.1 && $scope.stage <= 1) {
      $scope.stage = 2;
      $scope.log("The Night's Watch sent a raven: Winter is Coming");
      $scope.nightsWatchRecruiting = true;
    }
  }
  $scope.events.push(winterIsComing);

  var visitsNightsWatch = function() {
    if (Math.random() < 0.02 && $scope.stage == 2 && $scope.nightsWatchRecruiting) {
      var person = $scope.randomFamily(true);
      person.location = "castles Black";
      $scope.log(person.name + " journeyed to castles Black to learn about the Night's Watch. They speak of White Walkers, but they're extinct... right?");
      $scope.nightsWatchRecruiting = false;
    }
  }
  $scope.events.push(visitsNightsWatch);

  var allyKilled = function() {
    if ($scope.family.allies.length > 0 && Math.random() < 0.2 && $scope.stage > 1) {
      var victim = $scope.family.allies[Math.floor(Math.random() * $scope.family.allies.length)];

      var roll = Math.random();
      if (roll < 0.2) {
        $scope.log("Your ally, " + victim + " died in the night, \"peacefully\"");
      } else if (roll < 0.6) {
        $scope.log("Your ally, " + victim + " died of poison. The one responsible has not been caught");
      } else if (roll < 0.9) {
        $scope.log(victim + " died en route to Winterfell. Wonder who was behind it?");
      } else {
        $scope.log(victim + " died horrifically being burnt alive. Let this be a lesson about playing with fire.");
      }

      $scope.killPerson(victim);
    }
  }
  $scope.events.push(allyKilled);

  $scope.ollied = false;
  var olly = function() {
    if (!$scope.ollied && Math.random() < 0.13) {
      var person = null;
      angular.forEach($scope.family.members, function(member) {
        if (member.alive && member.location == "castles Black") {
          person = member;
        }
      });
      if (person) {
        $scope.log("Some Men of the Watch branded " + person.name + " a traitor. There was a log of stabbing, and blood, and Olly, whose parents died.");
        person.alive = false;
        $scope.ollied = true;
      }
    }
  }
  $scope.events.push(olly);

  $scope.melisandered = false;
  var melisander = function() {
    if (!$scope.melisandered && Math.random() < 0.02 && $scope.family.allies.indexOf("Melisandre") >= 0) {
      var alive = 0;
      var victim;
      angular.forEach($scope.family.members, function(member) {
        if (member.alive) {
          alive++;
          victim = member;
        }
      });
      if (alive > 1) {
        $scope.log("Melisandre convinced your House to burn " + victim.name + " in the name of the Lord of Light to melt some snow. After having done the deed, she quickly left at the realization of her mistake.");
        victim.alive = false;

      } else {
        $scope.log("Melisandre is displeased with the lack of progress for the Iron Throne, and decided to leave you. Might as well, she was suggesting something about burning royalty");

      }
      $scope.family.allies.splice($scope.family.allies.indexOf("Melisandre"), 1);
      $scope.melisandered = true;
    }
  }
  $scope.events.push(melisander);

  $scope.demonBabied = false;
  var demonBaby = function() {
    if ($scope.family.allies.indexOf("Melisandre") >= 0 && !$scope.melisandered && $scope.family.enemies.length > 0 && !$scope.demonBabied) {
      $scope.demonBabied = true;
      var person = $scope.randomFamily(true);
      var victim = $scope.family.enemies[Math.floor(Math.random() * $scope.family.enemies.length)];
      $scope.log(person.name + " was seduced by Melisandre, they made love, then she gave birth to a demon baby, because. Then this demon baby killed " + victim + ", so there's that. Hope " + person.name + " didn't get an STD in the process.");

      $scope.killPerson(victim);
    }
  }
  $scope.events.push(demonBaby);

  $scope.trialled = false;
  var trialByCombat = function() {
    if ($scope.stage >= 2 && !$scope.trialled) {
      $scope.trialled = true;
      var person = $scope.randomFamily(true);
      person.location = "King's Landing";
      var msg = person.name + " was forcibly taken to King's Landing under the charge of Treason. ";
      if ($scope.family.allies.indexOf("Doran Martell") >= 0) {
        msg += "Oberyn Martell decided to be your Champion as his brother Doran is allied with you. He's a pretty nice guy, but maybe his emotions got in the way. Anyway, he died pretty gruesomely in the duel. ";
        if (Math.random() < 0.75 && $scope.family.allies.length > 0) {
          var ally = $scope.family.allies[Math.floor(Math.random() * $scope.family.allies.length)];
          msg += person.name + " however managed to escape with the help of " + ally;
          person.location = "Home";
        } else {
          person.alive = false;
          msg += person.name + " was summarily executed on the spot by the Crown's champion";
        }
      } else {
        msg += person.name + " decided to be cleared of charges via trial by combat. ";
        if (Math.random() < 0.5) {
          msg += person.name + " won, and was let go";
          person.location = "Home";
        } else {
          msg += person.name + " died by sword through gut.";
          person.alive = false;
        }
      }
      $scope.log(msg);
    }
  }
  $scope.events.push(trialByCombat);

  var territoryChange = function() {
    if ($scope.stage > 1 && Math.random() < 0.3 && $scope.people.length > 1) {
      var person = $scope.people[Math.floor(Math.random() * $scope.people.length)];

      var place = $scope.places.castles[Math.floor(Math.random() * $scope.places.length)];

      var personHouse = "";
      angular.forEach($scope.houses, function(house) {
        if (person.toLowerCase().indexOf($scope.houses) >= 0) {
          personHouse = house;
          personHouse = personHouse.substring(0, 1).toUpperCase() + personHouse.substring(1);
        }
      });

      if (personHouse && personHouse !== place.castles.house) {
        place.castles.house = personHouse;
        $scope.log(person + " attacked " + place.castles.name + " and took control of it.");
      }
    }

  }

  console.log("events", $scope.events);
});