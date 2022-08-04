/*

achievement names contain jokes

coolors.co

buy max eff upgrade button

encrypted safe files

btoa = encrypt
atob = decrypt

max efficiency upgrade -> plant efficiency x1000 and efficiency max increases!

illegal plants -> get caught -> 0 money / give a lot of money

sounds

difficulty

increasing taxes challenge

only summer challenge (peaceful)

IMPORTANT

GOLDEN TILES DO NOT SAVE!

make completed challenges save

font family in settings

tooltip break for achievements

fix tooltip on replant upgrade

change log in the main menu

plants which have grown need to be sold on market.

golden tiles which allow you to replant plant X times

fertiliser, nearby tiles are growing faster.

*/

spop.defaults = {
  icon: false,
  position: "bottom-right",
  autoclose: 4500,
}

var achievements = {
  wheat: {
    amount: [],
    achieved: [],
    achievementName: ["Baby steps...","Learner...","Farmer student.","<img src=http://game-icons.net/icons/delapouite/originals/svg/farmer.svg>","Can't... stop... clicking.","Wheat so yellow...","Well done... for playing so long.","Wheat is soo cool","Farming so fun","Remember to mill the wheat!","Get a tractor already!","Super farmer","Pro farmer","You're getting good!","Wheat so cheap.","Try new plants.","почему вы перевести данный текст?","Plant problems ?","You don't have to play wheat all the game...","Flowers are better than wheat.","Wheat > Flowers","Haha you're not trying to win.","Want 100% Achievements?","So close...","Keep going.","One more to go!","There ya go!"]
  },
  flower: {
    amount: [],
    achieved: [],
    achievementName: ["Fresh start.","Flowers so much better than wheat.","Good luck getting next plant."],
  },
  herb: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  grass: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  sunflower: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  algae: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  corn: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  cabbage: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  jasmine: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  strawberry: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  chocolate: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  potato: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
  coconut: {
    amount: [],
    achieved: [],
    achievementName: [],
  },
}



var achievementNumbers = [1,5,10,25,50,75,100,150,250,500,750,1000,1250,1500,1750,2000,2250,2500,4000,5000,7500,10000,12500,15000,25000,50000,100000];

for (var key in achievements){
  var length = achievementNumbers.length;
  for (var g = 0; g < length; g++){
    achievements[key].achieved[g] = false;
    achievements[key].amount[g] = achievementNumbers[g];
  }
  
  for (var d = 0; d < length; d++){
    if (d == 0){
      $('#achievements').append("<div style='text-align:center;'>"+key+"</div><div style=clear:both;></div>")
    }
    var id = key+achievements[key].amount[d];
    var element = '<div class=achievement id='+id+'>?</div>';
    $('#achievements').append(element);
    if (d == length - 1){
      $('#achievements').append('<div style="height:20px; width:100%; float:left;"></div>')
    }
  }
  
}

var i = 0;

for (i = 0; i < 1; i++){
  var element = '<div class=tile id=cell'+i+' onclick=plant(this);></div>';
  $('#map').append(element);
}


var keys = [];

$(document).keydown(function(e) {
  keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
  delete keys[e.keyCode];
});

var FPS = 30;

var money = 0;

var tutorial = -1;

var challenge = "";
var debtLeft = 5000000;
var debtTimeLeft = (90/60)*60*60; // 90 mins in sec

var raceTimeLeft = (120/60)*60*60; // 2 hours in sec

var inspectionTimeLeft = 30;

var slotTime = 30;

var voice = 0;

var currentQuest = "5 wheat";
var questTimeLeft = 25;
var questCollected = 0;

var moreSpacePrice = 0.1;
var growthSpeedPrice = 1;
var replantPrice = 1;
var replantChance = 1;

var growthSpeedBoost = 1;
var profitBoost = 1;
var xpBoost = 1;

var currentSeason = 1;
var seasons = ["Spring","Summer","Autumn","Winter"];
var seasonTime = 60;

var growthSpeed = 1;

var holdingMouse = false;

var xp = 0;
var xpN = 1;
var level = 1;
var skillpoints = 0;

var fillAllBtnUnlocked = false;

var skilltree = {};

$(document).mousedown(function(){
  holdingMouse = true;
})
$(document).mouseup(function(){
  holdingMouse = false;
})


var wheat = {
  timeToGrow: 2,
  profit: 0.01,
  cost: 0,
  unlocked: true,
  efficiency: 1,
  effPrice: 0.01,
  efficiencyMax: 20,
  unlockPrice: 0,
  growsIn: "summer",
  totalGrown: 0,
}
var flower = {
  timeToGrow: 10,
  profit: 1.01,
  cost: 1,
  unlocked: false,
  efficiency: 1,
  effPrice: 1,
  efficiencyMax: 20,
  unlockPrice: 5,
  growsIn: "spring",
  totalGrown: 0,
}
var herb = {
  timeToGrow: 20,
  profit: 2500*1.01,
  cost: 2500,
  unlocked: false,
  efficiency: 1,
  effPrice: 2500,
  efficiencyMax: 20,
  unlockPrice: 4000,
  growsIn: "summer",
  totalGrown: 0,
}
var grass = {
  timeToGrow: 40,
  profit: 2.5e5*1.01,
  cost: 2.5e5,
  unlocked: false,
  efficiency: 1,
  effPrice: 2.5e5,
  efficiencyMax: 20,
  unlockPrice: 1.5e6,
  growsIn: "winter",
  totalGrown: 0,
}
var sunflower = {
  timeToGrow: 70,
  profit: 8e9*1.01,
  cost: 8e9,
  unlocked: false,
  efficiency: 1,
  effPrice: 8e9,
  efficiencyMax: 20,
  unlockPrice: 8e10,
  growsIn: "summer",
  totalGrown: 0,
}

var algae = {
  timeToGrow: 120,
  profit: 3e12*1.01,
  cost: 3e12,
  unlocked: false,
  efficiency: 1,
  effPrice: 3e12,
  efficiencyMax: 25,
  unlockPrice: 3e13,
  growsIn: "autumn",
  totalGrown: 0,
}

var corn = {
  timeToGrow: 200,
  profit: 2e15*1.01,
  cost: 2e15,
  unlocked: false,
  efficiency: 1,
  effPrice: 2e15,
  efficiencyMax: 25,
  unlockPrice: 3.14e16,
  growsIn: "summer",
  totalGrown: 0,
}

var cabbage = {
  timeToGrow: 300,
  profit: 4e18*1.01,
  cost: 4e18,
  unlocked: false,
  efficiency: 1,
  effPrice: 4e18,
  efficiencyMax: 25,
  unlockPrice: 5e19,
  growsIn: "spring",
  totalGrown: 0,
}

var jasmine = {
  timeToGrow: 500,
  profit: 2e22*1.01,
  cost: 2e22,
  unlocked: false,
  efficiency: 1,
  effPrice: 2e22,
  efficiencyMax: 25,
  unlockPrice: 14.5e22,
  growsIn: "winter",
  totalGrown: 0,
}

var strawberry = {
  timeToGrow: 800,
  profit: 2e25*1.01,
  cost: 2e25,
  unlocked: false,
  efficiency: 1,
  effPrice: 2e25,
  efficiencyMax: 25,
  unlockPrice: 2e26,
  growsIn: "spring",
  totalGrown: 0,
}

var chocolate = {
  timeToGrow: 1400,
  profit: 2.048e29*1.01,
  cost: 2.048e29,
  unlocked: false,
  efficiency: 1,
  effPrice: 2.048e29,
  efficiencyMax: 25,
  unlockPrice: 80.0e29,
  growsIn: "autumn",
  totalGrown: 0,
}

var potato = {
  timeToGrow: 2500,
  profit: 8.192e32*1.01,
  cost: 8.192e32,
  unlocked: false,
  efficiency: 1,
  effPrice: 8.192e32,
  efficiencyMax: 25,
  unlockPrice: 21.92e32,
  growsIn: "autumn",
  totalGrown: 0,
}

var coconut = {
  timeToGrow: 4650,
  profit: 3.2768e36*1.01,
  cost: 3.2768e36,
  unlocked: false,
  efficiency: 1,
  effPrice: 3.2768e36,
  efficiencyMax: 25,
  unlockPrice: 1.2768e37,
  growsIn: "summer",
  totalGrown: 0,
}



var plants = ["wheat","flower","herb","grass","sunflower","algae","corn","cabbage","jasmine","strawberry","chocolate","potato","coconut"];

for (var i = 1; i <= 60; i++){
  if (i == 30){
    $('#fpsOption').append("<option value="+i+" selected>"+i+" FPS</option>");
    continue;
  }
  $('#fpsOption').append("<option value="+i+">"+i+" FPS</option>");
}
for (var ii = 10; ii <= 75; ii++){
  if (ii == 75){
    $('#tileSizeOption').append("<option value="+ii+"px selected>"+ii+" px</option>");
    continue;
  }
  $('#tileSizeOption').append("<option value="+ii+"px>"+ii+" px</option>");
}

for (var i = 0; i < plants.length; i++){
  var elem1 = '<button id='+plants[i]+'EffBtn onclick=upEff("'+plants[i]+'")>'+plants[i]+' profits</button>';
  var elem2 = '<div class="upbar-container"><div class="upbar" id='+plants[i]+'EffBar></div></div>';
  $('#upgradesTab').append(elem1,elem2);
  var price = window[plants[i]].cost;
  var elem3 = '<option value="'+plants[i]+'" id='+plants[i]+'>'+plants[i]+' £'+simplify(price)+'</option>';
  $('#plant').append(elem3);
  var unlockPrice = window[plants[i]].unlockPrice;
  var title = "£"+(simplify(unlockPrice));
  var elem4 = '<button onclick=unlock("'+plants[i]+'"); id='+plants[i]+'UnlockBtn title="'+title+'" class=info></button>';
  $('#unlockTab').append(elem4);
}

function plant(obj,type){
  var item = type;
  if (!type) var item = $('#plant').val();
  
  var profit = window[item].profit;
  var timeToGrow = window[item].timeToGrow;
  var efficiency = window[item].efficiency;
  
  if (money < window[item].cost) return;
  if (obj.innerHTML !== "") return;
  
  money -= window[item].cost;
  var time = $(obj).attr('data-time');
  if (time > 0) return;
  $(obj).attr('data-time',200);
  var id = obj.id;
  var price = window[item].cost;
  add ("<span style='color: red;'>"+"-£"+simplify(price)+"</span>","log",0,100);
  var element = "<div class=plant data-time="+timeToGrow+" data-timeMax="+timeToGrow+" data-profit="+profit+" data-type="+item+" data-efficiency="+efficiency+"></div>";
  $(obj).html(element);
}

function engine(){
  $('#skillpoints').html(skillpoints+" skillpoints left.");
  FPS = $('#fps').val();
  $('#season').html(seasons[currentSeason]+"<br>("+challenge+")");
  $('#money').html("Money: £"+simplify(money));
  $('#moreSpaceBtn').html("+1 plot ("+$('.tile').length+")<br>£"+simplify(moreSpacePrice));
  $('#growthSpeedBtn').html("Faster growth"+"<br>£"+simplify(growthSpeedPrice));
  $('#replantUpgradeBtn').html("Replant chance<br>"+replantChance+"%");
  $('#replantUpgradeBtn').attr('title', "£"+simplify(replantPrice));
  
  $('#seasonbar').html((format(seasonTime)));
  var perc = (seasonTime / 60 * 100);
  var color = "rgb("+Math.floor(255 - (2.55*perc))+","+Math.round(2.55*perc)+",0)";
  $('#seasonbar').css({
    width: perc+"%",
    backgroundColor: color,
  })
  seasonTime -= 1/FPS;
  
  if (seasonTime <= 0){
    currentSeason++;
    if (currentSeason >= seasons.length){
      currentSeason = 0;
    }
    achievementUnlocked("<code style=font-size:20px;>"+seasons[currentSeason]+" has started!</code>",false)
    
    seasonTime = 60;
    for (var y = 0; y < plants.length; y++){
      $('#'+plants[y]).html(plants[y]+" £"+simplify(window[plants[y]].cost));
      var p = window[plants[y]];

      if (p.growsIn == seasons[currentSeason].toLowerCase()){
        $('#'+plants[y]).html(plants[y]+" £"+simplify(window[plants[y]].cost)+" ☀");
      }
    }
    
  }
  
  
  if (currentSeason == 0){
    Math.random() < 0.5 ? add("|","log",0,$(window).width() - 100,true) : add(".","log",0,$(window).width() - 100,true);
  }
  // winter
  if (currentSeason == 3){
    if (Math.random() < 1){
      Math.random() < 0.5 ? add("❄","log",0,$(window).width() - 100,true) : add("❆","log",0,$(window).width() - 100,true);
    }
  }
  
  $('#moreSpaceBtn').css({
    backgroundColor: "grey",
    border: "2px solid black",
  })
  if (money >= moreSpacePrice){
    $("#moreSpaceBtn").css({
      backgroundColor: "#4CAF50",
      border: "2px solid darkgreen",
    })
  }
  
  $('#growthSpeedBtn').css({
    backgroundColor: "grey",
    border: "2px solid black",
  })
  if (money >= growthSpeedPrice){
    $("#growthSpeedBtn").css({
      backgroundColor: "#4CAF50",
      border: "2px solid darkgreen",
    })
  }
  $('#replantUpgradeBtn').css({
    backgroundColor: "grey",
    border: "2px solid black",
  })
  if (money >= replantPrice){
    $('#replantUpgradeBtn').css({
      backgroundColor: "#4CAF50",
      border: "2px solid darkgreen",
    })
  }
  
  var length = $('.tile').length;
  
  var mps = 0;
  
  for (var i = 0; i < length; i++){
    $('#cell'+i).removeAttr("data-time");
    var element = $('#cell'+i).find(".plant");
    
    var time = parseFloat($(element).attr("data-time"));
    
    if (time <= 0) continue;
    var type = $(element).attr('data-type');
    
    
    if (type){
      var canGrowIn = window[type].growsIn;
      canGrowIn = canGrowIn.toLowerCase();
      // doesnt grow in winter and is winter
      var grow = true;
      if (canGrowIn !== "winter" && currentSeason == 3){
        if (Math.random() < 0.5){
          grow = false;
          newTime = parseFloat(time);
        }
      }
      
      var thisSeason = seasons[currentSeason].toLowerCase();
      if (canGrowIn == thisSeason && grow){
        var newTime = parseFloat(time) - (growthSpeed * growthSpeedBoost)/FPS * 3;
      }
      else {
        if (grow){
          var newTime = parseFloat(time) - (growthSpeed * growthSpeedBoost)/FPS;
        }
      }
      var object = window[type];
      var profit = object.profit*object.efficiency - object.cost
      var speed = (object.timeToGrow/growthSpeed);
      mps += ((profit) / speed)*growthSpeedBoost;
    }
    $('#mps').html(simplify(mps)+" / sec");
    // summer
    if (currentSeason == 1){
      $('#sun').css({
        opacity: 1,
      })
    }
    // winter
    if (currentSeason == 3){
      $('#sun').css({
        opacity: 0.5,
      })
    }
    
    
    
    $(element).attr('data-time',newTime);
    var maxTime = $(element).attr('data-timeMax');
    var perc = 100 - (newTime/maxTime)*100;
    
    var plantt = $(element).attr('data-type');
    plantt = String(plantt);
    
    plantt = "<span>"+plantt+"</span>"
    var extra = "";
    if ($('#plantTime').hasClass("active")){
      /*
      
      var totalTime = 100/growthSpeed * growthSpeedBoost;
      var time = totalTime * (buildValue/100);
      var timeLeft = totalTime - time;
      
      */
      var timeLeft = $(element).attr('data-time') / ((growthSpeed * growthSpeedBoost));
      
      if (canGrowIn !== "winter" && currentSeason == 3){
        timeLeft *= 3;
      }
      if (canGrowIn == thisSeason){
        timeLeft /= 3;
      }
      
      extra += ""+format(timeLeft)+"";
      $(element).html("<b>"+plantt+"</b><br>"+extra);
    }
    if ($('#plantTime').hasClass("active") == false){
      $(element).html("<b>"+plantt+"</b><br>"+Math.ceil(perc)+"%");
    }
    
    var color = "rgb("+Math.floor(255 - (2.55*perc))+","+Math.round(2.55*perc)+",0)";
    if (perc > 99){
      $(element).remove();
      $(element).css({
        backgroundColor: "white",
      })
      
      // 50 % of replanting a plant
      
      // 0.5% of plant being next level
      
      var rand = Math.random()*100;
      var replantEnabled = $('#replantEnable').hasClass("active");
      if (rand <= replantChance && replantEnabled){
        if (Math.random() < 0.005){
          var newPlant = plants.indexOf(type)+1;
          plant($("#cell"+i)[0],plants[newPlant]);
        }
        plant($("#cell"+i)[0],type);
      }
      
      var profit = $(element).attr('data-profit');
      var efficiency = $(element).attr('data-efficiency');
      
      
      var plantToAdd = $(element).attr('data-type');
      window[plantToAdd].totalGrown++;
      
      add ("<span style='color: green;'>"+"+£"+simplify(profit*efficiency)+"</span>","log",0,100);
      
      money += parseFloat(profit) * parseFloat(efficiency) * profitBoost;
      xp += parseFloat(profit * efficiency * 10 * xpBoost);
      var quest = currentQuest.split(" ");
      if (quest[1] == $(element).attr('data-type')){
        questCollected++;
      }
      continue;
    }
    $(element).css({
      backgroundColor: color,
      width: perc+"%",
    })
  }
  
  
  
  for (var s = 0; s < plants.length; s++){
    var p = window[plants[s]];
    $('#'+plants[s]).css("display","none");
    if (p.unlocked){
      $('#'+plants[s]).css("display","block");
    }
    var info = plants[s]+" efficiency<br>£"+simplify(window[plants[s]].effPrice);
    
    $('#'+plants[s]+"EffBtn").html(info);
    $('#'+plants[s]+"UnlockBtn").html("Unlock "+plants[s])
    if (p.unlocked){
      $('#'+plants[s]+"UnlockBtn").css({display: "none"})
    }
    var price = p.effPrice;
    $('#'+plants[s]+"EffBtn").css({backgroundColor: "grey"})
    if (money >= price){
      $('#'+plants[s]+"EffBtn").css({backgroundColor: "#4CAF50"})
    }
    $('#'+plants[s]+"UnlockBtn").css({
      backgroundColor: "grey",
      border: "2px solid black",
    })
    if (money >= p.unlockPrice){
      $('#'+plants[s]+"UnlockBtn").css({
        backgroundColor: "#4CAF50",
        border: "2px solid darkgreen",
      })
    }
    
    $('#'+plants[s]+"EffBtn").hide();
    $('#'+plants[s]+"EffBar").parent().hide();
    
    var selectedPlant = $('#plant').val();
    
    $('#'+selectedPlant+"EffBtn").show();
    $('#'+selectedPlant+"EffBar").parent().show();
    
    $('#'+plants[s + 1]+"UnlockBtn").hide();
    if (window[plants[s]].unlocked){
      $('#'+plants[s + 1]+"UnlockBtn").show();
    }
    
    if (money >= p.cost){
      $('#'+plants[s]).css({backgroundColor: "#4CAF50"})
    } else {
      $('#'+plants[s]).css({backgroundColor: "grey"})
    }
    var obj = plants[s];
    var perc = window[obj].efficiency/window[obj].efficiencyMax*100;
    var color = "rgb("+Math.floor(255 - (2.55*perc))+","+Math.round(2.55*perc)+",0)";
    $('#'+obj+"EffBar").html("x"+(Math.round(window[obj].efficiency*100))/100);
    $('#'+obj+"EffBar").css({
      width: perc+"%",
      backgroundColor: color,
    })
    
    var l = window[obj].efficiency;
    var lMax = window[obj].efficiencyMax;
    
    if (window[obj].efficiency >= window[obj].efficiencyMax){
      window[obj].efficiencyMax += 25;
      window[obj].effPrice *= 0.2;
    }
    
    
  }
  
  if (money >= 1e6){
    $('#buyFillBtn').css({backgroundColor: "#4CAF50"})
  }
  if (money < 1e6){
    $('#buyFillBtn').css({backgroundColor: "grey"})
  }
  
  var selected = $('#plant').val();
  var object = window[selected];
  info = "<ul>";
  info += "<li>Profit: £"+simplify((object.profit*object.efficiency - object.cost) * profitBoost)+"</li><li>Cost: £"+simplify(object.cost)+"</li><li>Growth speed: "+Math.floor((object.timeToGrow/growthSpeed*100)/growthSpeedBoost)/100+"s<li>Grows in: "+object.growsIn+"</li>";
  document.getElementById("info").innerHTML = info+"</ul>";
  
  var perc = xp/xpN * 100;
  
  $('#levelbar').css({
    width: perc+"%",
  })
  $('#levelbar').html(simplify(xp)+"/"+simplify(xpN)+" Level "+level)
  
  if (xp >= xpN){
    level++;
    xp -= xpN;
    xpN *= Math.PI * 2;
    skillpoints++;
  }
  
  if (fillAllBtnUnlocked){
    $('#fillAllBtn').prop("disabled",false);
    $('#buyFillBtn').remove();
  }
  
  
  var achievementPercentage = 0;
  
  var totalAchievementLength = 0;
  var achieved = 0;
  
  for (var key in achievements){
    totalAchievementLength += achievements[key].amount.length;
    for (var m = 0; m < achievements[key].amount.length; m++){
      if (achievements[key].achieved[m]){
        achieved++;
      }
    }
  }
  achievementPercentage = achieved / totalAchievementLength * 100;
  
  $('#achievementPercentage').html("Achievements ("+Math.round(achievementPercentage*10)/10+"%)")
  
  
  $('#menuUnlock').hide();
  $('#menuUpgrades').hide();
  $('#menuSkill').hide();
  $('#menuAchievements').hide();
  $('#menuStats').hide();
  
  if (level >= 2) $('#menuUpgrades').show();
  if (level >= 3) $('#menuUnlock').show();
  if (level >= 4) $('#menuSkill').show();
  if (level >= 5) $('#menuAchievements').show();
  if (level >= 6) $('#menuStats').show();
  
  var size = parseInt($('#tileSize').val());
  
  var fontSize = Math.floor(size/4)
  
  $('.tile').css({
    width: size,
    height: size,
    fontSize: fontSize+"px",
  })
  $('#menuSkill').css({
    color: "black",
  })
  if (skillpoints >= 1){
    $('#menuSkill').css({
      color: "red",
    })
  }
  var sun = $('#sunEnabled').hasClass("active");
  if (!sun){ $('#sun').hide(); }
  if (sun){ $('#sun').show(); }
  
  
  
  setTimeout(engine,1000/FPS);
}
engine();

function tutNext(){
  tutorial++;
}

function tut(){
  if (tutorial == 1){
    $('#arrow').animate({
      left: "150px",
    })
    $('#tutorialMsg').html("<label>1/7</label>Welcome to farming idle!<br>Click this square to plant your wheat! <br>Keep planting until you get £0.1.");
    $('#tutorialMsg').animate({
      left: "250px",
    })
    $("#arrow").pointat({ target: "#cell0" });
    if (money >= 0.1){
      tutorial++;
    }
    if (voice == 0){
      voice++;
      speak("Welcome to farming idle! Click this square to plant your wheat! Keep planting until you get £0.1.")
    }
  }
  if (tutorial == 2){
    $('#arrow').animate({
      left: "800px",
      top: "150px",
    })
    $('#tutorialMsg').html("<label>2/7</label>Click on upgrades and purchase your slot upgrade.");
    $('#tutorialMsg').animate({
      left: "650px",
      top: "100px",
    })
    $("#arrow").pointat({ target: "#menuUpgrades" });
    if ($('.tile').length >= 2){
      tutorial++;
    }
    if (voice == 1){
      voice++;
      speak("Click on upgrades and purchase your slot upgrade.")
    }
  }
  if (tutorial == 3){
    $('#arrow').animate({
      left: "800px",
      top: "150px",
    })
    $('#tutorialMsg').html("<label>3/7</label>Now keep planting wheat and upgrade wheat efficiency to 1.3x");
    $('#tutorialMsg').animate({
      left: "650px",
      top: "100px",
    })
    $("#arrow").pointat({ target: "#menuUpgrades" });
    if (wheat.efficiency >= 1.3){
      tutorial++;
    }
    if (voice == 2){
      voice++;
      speak("Now keep planting wheat and upgrade wheat efficiency to 1.3 times")
    }
  }
  if (tutorial == 4){
    $('#arrow').animate({
      left: "800px",
      top: "150px",
    })
    $('#tutorialMsg').html("<label>4/7</label>Well done!<br>Now keep planting until you reach level 3. <br><b>Remember</b> you can also click and hold left click then hover over the squares to quick plant.");
    $('#tutorialMsg').animate({
      left: "650px",
      top: "100px",
    })
    $("#arrow").pointat({ target: "#cell0" });
    if (level >= 3){
      tutorial++;
    }
    if (voice == 3){
      voice++;
      speak("Well done! Now keep planting until you reach level 3. Remember you can also click and hold left click then hover over the squares to quick plant.")
    }
  }
  if (tutorial == 5){
    $('#arrow').animate({
      left: "300px",
      top: "250px",
    })
    $('#tutorialMsg').html("<label>5/7</label>Good job! Here you can see plant stats, notice that there is <b>Grows In</b> which tells you the season the plant grows fastest in.<br><button onclick=tutNext();>Next</button>");
    $('#tutorialMsg').animate({
      left: "450px",
      top: "200px",
    })
    $("#arrow").pointat({ target: "#info" });
    if (voice == 4){
      voice++;
      speak("Good job! Here you can see plant stats, notice that there is Grows In which tells you the season the plant grows fastest in.")
    }
  }
  if (tutorial == 6){
    $('#arrow').animate({
      left: "500px",
      top: "150px",
    })
    $('#tutorialMsg').html("<label>6/7</label>Once you unlock new plants they will become available in this dropdown.<button onclick=tutNext();>Next</button>");
    $('#tutorialMsg').animate({
      left: "650px",
      top: "100px",
    })
    $("#arrow").pointat({ target: "#plant" });
    if (voice == 5){
      voice++;
      speak("Once you unlock new plants they will become available in this dropdown.")
    }
  }
  if (tutorial == 7){
    $('#arrow').animate({
      left: "80%",
      top: "350px",
    })
    $('#tutorialMsg').html("<label>7/7</label>You can also click this button to hide menu for less stuff on the screen. Have fun!<button onclick=tutNext();>Close</button>");
    $('#tutorialMsg').animate({
      left: "75%",
      top: "200px",
    })
    $("#arrow").pointat({ target: "#openMenuBtn" });
    if (voice == 6){
      voice++;
      speak("You can also click this button to hide menu for less stuff on the screen. Have fun!")
    }
  }
  if (tutorial >= 8 || tutorial == 0){
    $('#tutorialMsg').remove();
    $('#arrow').remove();
  }
  
  if (tutorial > 0){
    $('#arrow').css({
      display: "block",
    })
  }
  $('#challengeOption').show();
  if (challenge){
    $('#challengeOption').hide();
  }
  $('#currentChallenge').html("Your current challenge: "+challenge);
  if (!challenge){
    $('#currentChallenge').html("You are not in a challenge.");
  }
  var chal = $('#challengeOption').val();
  if (chal == "winter only") $('#challengeDesc').html("Winter has been heavy for sometime, but no snow can stop you!");
  if (chal == "hideout") $('#challengeDesc').html("Government has made farming illegal, and will inspect every farm every so often. Make sure you don't get caught!");
  if (chal == "race") $('#challengeDesc').html("Race with your neighbour for the best plant competition. To win you have to reach Jasmine before time limit!");
  if (chal == "debt") $('#challengeDesc').html("Your grandad has fallen into debt, now it has been passed onto you. Make sure to pay it off before time limit!");
  if (chal == "quest chaos") $('#challengeDesc').html("Your boss has been not happy with you lately taking so many days off, he is giving you a lot of work while he is on holidays. How unfair!");
  if (chal == "missing plants") $('#challengeDesc').html("There was a plague and half of the plants are missing! But that can't stop you from becoming greatest farmer of all time!");
  if (chal == "five slots") $('#challengeDesc').html("Ground has been infected with unknown creatures. They like land and will fight for it if needed. You can have maximum of 5 slots before getting their attention.");
  if (chal == "slot loss") $('#challengeDesc').html("Unknown creatures attack again! This time they will attack every 30 seconds if you have more than 2 slots. (Lose 1 slot every 30 sec.)");
  if (chal == "wheat only") $('#challengeDesc').html("Every plant except wheat has been poisoned by unknown creatures. You can only plant wheat but because it is the only plant, the upgrades became cheaper.");
  if (chal == "no upgrades") $('#challengeDesc').html("It is 300BC, technology has not evolved yet and you have to rely on the only land that king gave you.");
  
  
  setTimeout(tut,500);
}
tut();

function roundTo(number,dp){
  if (!dp) dp = 2;
  dp = Math.pow(10,dp);
  return Math.floor((number*dp))/dp;
}


function buyMoreSpace(){
  i = $('.tile').length;
  var element = '<div class=tile id=cell'+i+' onclick=plant(this);></div>';
  if (money >= moreSpacePrice){
    money -= moreSpacePrice;
    add ("<span style='color: red;'>"+"-£"+simplify(moreSpacePrice)+"</span>","log",0,100);
    moreSpacePrice *= 1.35;
    $('#map').append(element);
  }
}

function buyMoreGrowthSpeed(){
  if (money >= growthSpeedPrice){
    money -= growthSpeedPrice;
    add ("<span style='color: red;'>"+"-£"+simplify(growthSpeedPrice)+"</span>","log",0,100);
    growthSpeedPrice *= 10;
    growthSpeed += 0.5;
  }
}

function buyReplantChance(){
  if (money >= replantPrice && replantChance < 25){
    money -= replantPrice;
    replantPrice *= 2;
    replantChance++;
    tooltip();
  }
}



function simplify(number) {
  var simplifyNumbers = $("#simplifyNumbers").hasClass("active");
  if (!simplifyNumbers) return (Math.floor(number*100)/100).toLocaleString();
  var show = number;
  
  var numberNames = ["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion","quattuordecillion","quindecillion","sexdecillion","septendecillion","octodecillion","novemdecillion","vigintillion","unvigintillion","duovigintillion","tresvigintillion","quattuorvigintillion","quinvigintillion","sesvigintillion","septemvigintillion","Octovigintillion","Novemvigintillion","Trigintillion","Untrigintillion","Duotrigintillion","Trestrigintillion","Quattuortrigintillion","Quintrigintillion","Sestrigintillion","Septentrigintillion","Octotrigintillion","Noventrigintillion","Quadragintillion","Unquadragintillion","Duoquadragintillion","Tresquadragintillion","Quattuorquadragintillion","Quindragintillion","Sesquadragintillion","Septenquadragintillion","Octoquadragintillion","Novenquadragintillion","Quinquagintillion","Unquinquagintillion","Duoquinquagintillion","Tresquinquagintillion","Quattuorquinquagintillion","Quinquinquagintillion","Sesquinquagintillion","Septenquinquagintillion","Octoquinquagintillion","Novenquinquagintillion","Sexagintillion","Unsexagintillion","Duosexagintillion","Tresexagintillion","Quattuorsexagintillion","Quinsexagintillion","Sesexagintillion","Septensexagintillion","Octosexagintillion","Novensexagintillion","Septuagintillion","Unseptuagintillion","Duoseptuagintillion","Treseptuagintillion","Quattuorseptuagintillion","Quinseptuagintillion","Seseptuagintillion","Septenseptuagintillion","Octoseptuagintillion","Novenseptuagintillion","Octogintillion","Unoctogintillion","Duooctogintillion","Tresoctogintillion","Quattuoroctogintillion","Quinoctogintillion","Sexoctogintillion","Septemoctogintillion","Octooctogintillion","Novemoctogintillion","Nonagintillion","Unnonagintillion","Duononagintillion","Trenonagintillion","Quattuornonagintillion","Quinnonagintillion","Sexnonagintillion","Septenonagintillion","Octononagintillion","Novenonagintillion","Centillion","Uncentillion","Duocentillion","Trescentillion"]
  
  for (var g = 1; g < numberNames.length; g++){
    if (number >= Math.pow(10,g*3) && number < Math.pow(10,(g*3)+3)){
      return Math.floor(show / Math.pow(10,(g*3)-2)) / 100 +" "+numberNames[g];
      break;
    }
    if (g == numberNames.length - 1) {
      return Math.floor(show * 100) / 100;
    }
  }
}

setInterval(function(){
  $('.animation').each(function(){
    $(this).animate({
      top: $(window).height() - 50,
      opacity: 0.2,
    },1000,"swing",function(){
      $(this).remove();
    })
  });
  
},100);

function add(value,id,min,max,enabled){
  var popups = $("#numberPopUps").hasClass("active");
  if (!popups && !enabled) return;
  var rand = Math.floor((Math.random()*max)+min);
  var element = '<div class=animation style="left: RANDpx; top: -20px;">'+value+'</div>';
  element = element.replace(/RAND/gi,rand);
  $("#"+id).append(element);
}

// $('select').selectmenu();

function fillAll(){
  var checked = $('#useSelectedPlant').hasClass("active");
  var tileLength = $('.tile').length;
  var reversed = [];
  for (var l = 0; l < plants.length; l++){
    reversed[l] = plants[plants.length - 1 - l]
  }
  
  if (checked){
    for (var i = 0; i < tileLength; i++){
      var selected = $('#plant').val();
      var tile = $('#cell'+i);
      var unlocked = window[selected].unlocked;
      var price = window[selected].cost;
      if (tile.html() == "" && unlocked && money >= price){
        plant(tile[0],selected);
      }
    }
    return;
  }
  
  for (var f = 0; f < tileLength; f++){
    for (var g = 0; g < plants.length; g++){
      var tile = $('#cell'+f);
      var unlocked = window[reversed[g]].unlocked;
      var price = window[reversed[g]].cost;
      if (tile.html() == "" && unlocked && money >= price){
        plant(tile[0],reversed[g]);
        break;
      }
      
    }
  }
}

function upEff(obj){
  var price = window[obj].effPrice;
  if (money >= price && window[obj].efficiency < window[obj].efficiencyMax){
    money -= price;
    window[obj].effPrice *= 1.005;
    window[obj].efficiency += 0.01;
    var perc = window[obj].efficiency / window[obj].efficiencyMax * 100;
    
  }
}

function unlock(obj){
  var price = window[obj].unlockPrice;
  if (money >= price){
    money -= price;
    $('#'+obj+"UnlockBtn").remove();
    window[obj].unlocked = true;
    var name = "£"+window[obj].cost+" "+obj;
  }
}

function buyFill(){
  if (money >= 1e6){
    money -= 1e6;
    fillAllBtnUnlocked = true;
    $('#fillAllBtn').prop("disabled",false);
    $('#buyFillBtn').remove();
  }
}



function achievementUnlocked(text,title){
  var hasClass = $('.ach').hasClass('achieved');
  if (hasClass) return;
  if (!title) title = false;
  if (title) $('.title').html("Achievement unlocked!");
  $('.detail').html(text);
  $('.ach').addClass("achieved");
  setTimeout(function(){
    $('.ach').removeClass("achieved");
  },5000)
}


window.onmouseover=function(e) {
  if (!holdingMouse) return;
  if (e.target.innerHTML){
    return;
  }
  // className == "tile"
  if (e.target.innerHTML == "" && e.target.className == "tile"){
    plant(e.target);
  }
};


for (var i = 0; i < plants.length; i++){
  var obj = plants[i];
  var perc = window[obj].efficiency/window[obj].efficiencyMax*100;
  $('#'+obj+"EffBar").html("x"+(Math.round(window[obj].efficiency*100))/100);
  $('#'+obj+"EffBar").css({
    width: perc+"%",
  })
}


$('.checkbox').click(function(){
  $(this).toggleClass("active");
  var selector = $(this).hasClass("active");
  $(this).html("")
});


function openNav() {
  $('#navbar').animate({
    width: "200px",
    right: "10px",
  })
  $('#contents').animate({
    right: "250px",
  })
}

function closeNav() {
  $('#navbar').animate({
    width: "0px",
    right: "-250px",
  })
  $('#contents').animate({
    right: "-500px",
  })
}

jQuery.fn.clickToggle = function(a,b) {
  var ab = [b,a];
  return this.on("click", function(){ ab[this._tog^=1].call(this); });
};

$("#openMenuBtn").clickToggle(function() {   
  closeNav();
}, function() {
  openNav();
});


/////////////////////////////////
//        IN PROGRESS          //
/////////////////////////////////
var property = ["cost","efficiency","efficiencyMax","effPrice","growsIn","profit","timeToGrow","unlocked","unlockPrice","totalGrown"];
var variables = ["xp","xpN","level","growthSpeed","currentSeason","moreSpacePrice","growthSpeedPrice","money","skillpoints","fillAllBtnUnlocked","challenge","debtLeft","debtTimeLeft","raceTimeLeft","inspectionTimeLeft","questTimeLeft","questCollected","currentQuest","slotTime","replantPrice","replantChance","seasonTime"];

function saveTest(){
  achievementUnlocked("<code style=font-size:20px;>Game has been saved!</code>",false);
  var saveFile = {};
  for (var i = 0; i < plants.length; i++){
    for (var j = 0; j < property.length; j++){
      saveFile[plants[i] + property[j]] = window[plants[i]][property[j]];
      
    }
  }
  var variabless = {};
  for (var i = 0; i < variables.length; i++){
    variabless[variables[i]] = window[variables[i]];
  }
  
  localStorage["variabless"] = JSON.stringify(variabless);
  localStorage["saveFile"] = JSON.stringify(saveFile);
  
  var tiles = "";
  
  for (var i = 0; i < $('.tile').length; i++){
    var cell = $('#cell'+i);
    if (i < $('.tile').length - 1){
      tiles += "|";
    }
  }
  localStorage["tiles"] = tiles;
  
  localStorage["skilltree"] = JSON.stringify(skilltree);
  
  localStorage["achievements"] = JSON.stringify(achievements);
  
}

function loadTest(){
  var saveFile = JSON.parse(localStorage.getItem("saveFile"));
  if (!saveFile) return;
  achievementUnlocked("<code style=font-size:20px;>Game has been loaded!</code>",false);
  for (var i = 0; i < plants.length; i++){
    for (var j = 0; j < property.length; j++){
      if (!plants[i] || !property[j]) continue;
      if (property[j] == "cost" || property[j] == "growsIn" || property[j] == "profit" || property[j] == "unlockPrice") continue;
      window[plants[i]][property[j]] = saveFile[plants[i]+property[j]];
    }
  }
  var tiles = localStorage.getItem("tiles");
  
  tiles = tiles.split("|");
  $('.tile').remove();
  for (var i = 0; i < tiles.length; i++){
    var element = '<div class=tile id=cell'+i+' onclick=plant(this);></div>';
    $('#map').append(element);
    $('#cell'+i).html(tiles[i]);
  }
  var variabless = JSON.parse(localStorage["variabless"]);
  
  for (var i = 0; i < variables.length; i++){
    if (!variabless[variables[i]]) continue;
    window[variables[i]] = variabless[variables[i]];
  }
  // skill tree
  
  skilltree = JSON.parse(localStorage["skilltree"]);
  
  achievements = JSON.parse(localStorage["achievements"]);
  
  for (var key in achievements){
    for (var s = 0; s < achievements[key].amount.length; s++){
      if (achievements[key].achieved[s]){
        $('#'+key+achievements[key].amount[s]).html("");
        var title = "Grow "+achievements[key].amount[s].toLocaleString()+" "+key+"(s).";
        $('#'+key+achievements[key].amount[s]).html("<img src=http://game-icons.net/icons/delapouite/originals/svg/trophy-cup.svg class=info title='"+title+"'>");
      }
    }
  }
}


setTimeout(loadTest,100);

setInterval(saveTest,30000);



var ml = [
  10,2,10,10,
  10,4,10,10,
  14,6,14,14,
  10,8,10,10
];
var n = [
  "Growth speed I","Space I","Profit I","More XP I",
  "Growth speed II","Space II","Profit II","More XP II",
  "Growth speed III","Space III","Profit III","More XP III",
  "Growth speed IV","Space IV","Profit IV","More XP IV"
];
var t = [
  "growthSpeed","space","profit","xp",
  "growthSpeed","space","profit","xp",
  "growthSpeed","space","profit","xp",
  "growthSpeed","space","profit","xp",
];
var g = [
  1,2,1,2,
  5,3,2,5,
 10,4,5,10,
 20,5,10,15,
];
for (var i = 0; i < 16; i++){
  skilltree["btn"+i] = {
    level: 0,
    maxlevel: ml[i],
    name: n[i],
    type: t[i],
    gives: g[i],
  }
}

for (var a = 0; a < 16; a++){
  var maxlevel = skilltree["btn"+a].maxlevel;
  var upgradeType = skilltree["btn"+a].type;
  
  var element = '<button disabled data-level=0 data-maxlevel='+maxlevel+' onclick="levelUp(this);"></button>';
  $('#skilltree').append(element);
}
// tooltips on top of buttons!
// resetable skill tree !

//https://silviomoreto.github.io/bootstrap-select/examples/

function loop(){
  
  var length = $('#skilltree > button').length;
  var rowNumber = 4;
  for (var i = 0; i < length; i++){
    var btn = $('#skilltree > button')[i];
    
    var level = skilltree["btn"+i].level;
    var maxlevel = skilltree["btn"+i].maxlevel;
    
    var nextBtn = $('#skilltree > button')[i+rowNumber];
    
    var name = skilltree["btn"+i].name;
    var gives = skilltree["btn"+i].gives;
    var type = skilltree["btn"+i].type;
    
    var perc = level*gives+"% +"+gives+"%";
    var msg = level*gives+"%";
    if (type == "space"){
      perc = perc.replace(/%/g,"");
      msg = msg.replace(/%/g,"");
    }
    
    
    btn.innerHTML = "<b>"+name+"</b><br>lvl "+level+" / "+maxlevel+"<br>"+perc;
    if (i < 4){
      btn.disabled = false;
    }
    var nextBtnLevel = Math.floor(maxlevel);
    if (level >= nextBtnLevel && nextBtn){
      nextBtn.disabled = false;
    }
    if (maxlevel == level){
      btn.style.backgroundColor = "green";
      btn.style.border = "2px solid darkgreen";
      btn.innerHTML = name+"<br>Max level<br>"+msg;
    }
  }
  
  $('#skillpoints').html(skillpoints+" skillpoints left.");
  
  /////////////////////////////////
  //       ACHIEVEMENTS          //
  /////////////////////////////////
  
  
  for (var key in achievements){
    var amount = achievements[key].amount;
    var obj = window[key].totalGrown;
    
    for (var i = 0; i < amount.length; i++){
      var achieved = achievements[key].achieved[i];
      if (obj >= amount[i] && achieved == false){
        var text = achievements[key].achievementName[i] + "<br><span class=achievementText>Grow "+amount[i].toLocaleString()+" "+key+"</span>";
        achievements[key].achieved[i] = true;
        text = text.replace(/undefined/g,"Achievement Unlocked!")
        window[key].efficiency += 0.04 * i + 0.04;
        
        spop("&#127942;"+text+"<br> <span class=achievementRewardText>+"+(4*i+4)+"% "+key+" efficiency!</span>");
        // var title = achievements[key].achievementName[i]+"\nGrow "+amount[i].toLocaleString()+" "+key+"(s).";
        var title = "Grow "+amount[i].toLocaleString()+" "+key+"(s).";
        $('#'+key+amount[i]).html("<img src=http://game-icons.net/icons/delapouite/originals/svg/trophy-cup.svg class=info title='"+title+"'>");
        tooltip();
        // $('#'+key+amount[i]).attr('title',title);
        // $('#'+key+amount[i]).addClass('info');
      }
    }
  }
  var stats = "";
  stats += "Skill tree<br>XP boost: "+xpBoost+"x<br>Profit boost: "+profitBoost+"x<br>Growth speed boost: "+growthSpeedBoost+"x<hr>";
  for (var l = 0; l < plants.length; l++){
    var p = window[plants[l]];
    if (p.unlocked == false) continue;
    stats += plants[l]+": <br>Total grown: "+(p.totalGrown).toLocaleString()+"<br>Sell price: £"+(p.profit * p.efficiency * profitBoost).toLocaleString()+"<hr>";
  }
  
  
  $('#stats').html(stats);
  
  
  
  
  
  setTimeout(loop,100);
}
loop();

function levelUp(obj){
  var index = $(obj).index() - 2;
  var level = skilltree["btn"+index].level;
  var maxlevel = skilltree["btn"+index].maxlevel;
  if (skillpoints <= 0 || level >= maxlevel) return;
  skillpoints--;
  var upgrades = skilltree["btn"+index].type;
  var index = $(obj).index() - 2;
  if (level >= maxlevel) return;
  var newLevel = parseInt(level)+1;
  skilltree["btn"+index].level++;
  if (upgrades == "space"){
    var gives = skilltree["btn"+index].gives;
    for (var l = 0; l < gives; l++){
      var id = $('.tile').length;
      var element = '<div class=tile id=cell'+id+' onclick=plant(this);></div>';
      $('#map').append(element);
    }
  }
}

setInterval(function(){
  growthSpeedBoost = 1;
  xpBoost = 1;
  profitBoost = 1;
  for (var index = 0; index < 16; index++){
    var l = skilltree["btn"+index].level;
    var gives = skilltree["btn"+index].gives;
    var type = skilltree["btn"+index].type;
    if (type == "growthSpeed"){
      growthSpeedBoost += (l * gives) / 100;
    }
    if (type == "xp"){
      xpBoost += (l * gives) / 100;
    }
    if (type == "profit"){
      profitBoost += (l * gives) / 100;
    }
    
  }
},2500);



function tooltip(){
  $('.info').tooltipster({
    delay: 100,
    animation: "grow",
    theme: 'tooltipster-punk',
    multiple: true,
  })
}
tooltip();
setInterval(tooltip,2500);



function reset(){
  var input = prompt("Type in 'yes' to confirm reset.");
  input = input.toLowerCase();
  if (input == "yes"){
    localStorage.clear();
    history.go(0);
  }
}


$('#game').hide();
$('#mainMenu').css({
  width: "100%",
  height: "100%",
})

function startGame(){
  if (!challenge){
    challenge = $('#challengeOption').val();
  }
  $('#mainMenu').hide();
  $('#game').show();
  if ( $('#tutorial').hasClass("active") ){
    tutorial = 1;
  }
  else {
    tutorial = 0;
  }
  if (challenge == "wheat only"){
    wheat.effPrice = 0.001;
    for (var b = 1; b < plants.length; b++){
      $('#'+plants[b]+"UnlockBtn").prop("disabled",true);
    }
  }
  if (challenge == "no upgrades"){
    $('#map').html("");
    for (var i = 0; i < 5; i++){
      var s = $('.tile').length;
      var element = '<div class=tile id=cell'+s+' onclick=plant(this);></div>';
      $('#map').append(element);
    }
  }
}

function challenges(){
  if (challenge == "winter only"){
    currentSeason = 3;
  }
  if (challenge == "debt"){
    $('#menuDebt').show();
    debtTimeLeft -= 1;
  }
  if (challenge == "debt" && debtTimeLeft < 0){
    alert("You lost! Your family got evicted from your farm. No business!");
    localStorage.clear();
    history.go(0);
  }
  $('#timeLeft').html(format(debtTimeLeft));
  $('#debtLeft').html("£"+debtLeft.toLocaleString())
  if (challenge == "missing plants"){
    for (var k = 0; k < plants.length; k++){
      if (k % 2 == 0){
        $('#'+plants[k+1]+"UnlockBtn").remove();
      }
      
    }
  }
  
  if (challenge == "race"){
    $('#raceTimeLeft').html(format(raceTimeLeft));
    raceTimeLeft -= 1;
    if (jasmine.unlocked){
      alert("You have won race challenge! Well done!");
      localStorage.clear();
      history.go(0);
    }
    if (raceTimeLeft < 0){
      alert("You have lost race challenge! Your neighbour over took you and got all the fame. Better luck next time.");
      localStorage.clear();
      history.go(0);
    }
  }
  
  if (challenge == "hideout"){
    $('#raceTimeLeft').css({
      color: "black",
    })
    inspectionTimeLeft--;
    if (inspectionTimeLeft < 5){
      $('#raceTimeLeft').css({
        color: "red",
      })
    }
    $('#raceTimeLeft').html("Inspection in: "+format(inspectionTimeLeft));
    if (inspectionTimeLeft <= 0){
      for (var h = 0; h < $('.tile').length; h++){
        var html = $('#cell'+h).html();
        
        if (html){
          alert("Government has caught you on farming ! You lose! Better luck next time");
          localStorage.clear();
          history.go(0);
        }
      }
      inspectionTimeLeft = Math.floor(Math.random () * 60);
    }
  }
  var randomPlant = [];
  for (var j = 0; j < plants.length; j++){
    if (window[plants[j]].unlocked){
      randomPlant.push(plants[j]);
    }
  }
  $('#menuQuest').hide();
  if (challenge == "quest chaos"){
    $('#menuQuest').show();
    questTimeLeft--;
    $('#questTimeLeft').html(format(questTimeLeft));
    $('#quest').html("Farm "+currentQuest+"<br>Collected: "+questCollected);
    var quest = currentQuest.split(" ");
    var amount = parseInt(quest[0]);
    if (questCollected >= amount){
      // new quest
      var randPlant = randomPlant[Math.floor(Math.random()*randomPlant.length)];
      var randAmount = Math.floor(Math.random()*level*10) + level * 3;
      var randTime = Math.floor((randAmount * 1.5*window[randPlant].timeToGrow) / $('.tile').length);
      currentQuest = randAmount+" "+randPlant;
      questTimeLeft = randTime;
      questCollected = 0;
      speak("New task! Collect "+randAmount+" "+randPlant);
    }
    
    if (questCollected < amount && questTimeLeft < 0){
      alert("You lost, your boss fires you due to 'laziness'.");
      localStorage.clear();
      history.go(0);
    }
  }
  
  if (challenge == "five slots"){
    var slots = $('.tile').length;
    if (slots >= 5){
      for (var kk = 5; kk < slots; kk++){
        $('#cell'+kk).remove();
      }
      $('#moreSpaceBtn').prop("disabled",true);
      $('#moreSpaceBtn').html("Maximum slots<br>reached!")
    }
  }
  
  if (challenge == "slot loss"){
    slotTime--;
    $('#raceTimeLeft').html("Lose slot in "+format(slotTime));
    if (slotTime <= 0){
      var length = $('.tile').length;
      if (length > 5){
        $('.tile').last().remove();
      }
      slotTime = 30;
    }
    if (slotTime <= 0){
      slotTime = 1;
    }
  }
  if (challenge == "no upgrades"){
    $('#menuUpgrades').hide();
  }
  
  
  setTimeout(challenges,1000);
}
challenges();

$('#debtBtn').click(function(){
  debtLeft -= money;
  money = 0;
  if (debtLeft < 0){
    alert("Well done! You have helped your grandad and successfully won the challenge!");
    localStorage.clear();
    loadTest();
  }
});

function format(number){
  var toDisplay = "";
  
  var time = number;
  
  if (time >= 3600){
    var hours = Math.floor(time/3600);
    time -= hours*3600;
    toDisplay += hours+"h ";
  }
  if (time >= 60){
    var minutes = Math.floor(time/60);
    time -= minutes*60;
    toDisplay += minutes+"min ";
  }
  toDisplay += Math.floor(time*10)/10+"sec";
  
  return toDisplay;
}

$('#menuQuest').draggable({
  containment: '#game',
});

function speak(msg){
  speechSynthesis.cancel();
  var toSay = new SpeechSynthesisUtterance(msg);
  var voices = window.speechSynthesis.getVoices();
  toSay.voice = voices[0];
  window.speechSynthesis.speak(toSay);
}
speak("");


function buyMaxEff(){
  for (var c = 0; c < 1000; c++){
    upEff($('#plant').val())
  }
}





(function(c){var b,d,a={init:function(e){d={hookScroll:true,hookDrag:true,draggable:null,pointAtInit:true,defaultDirection:"up",angleLessThanFunc:null,angleGreaterThanFunc:null,getAngleFrom:null,passAngleTo:null,xCorrection:0,yCorrection:0,pause:false,rotateFunction:"jqrotate",changeTargetTo:"low"};b=c.extend({},d,e);return this.each(function(){var g=c("body").data("pointatcount"),f=c(this).data("myid.pointat"),i=".pointat",h=this;f=+f||0;i=".pointat"+f;if(f>0){oldsettings=c(this).data("settings.pointat");c.each(b,function(j,k){if(k===d[j]){b[j]=oldsettings[j];}});c(this).data("settings.pointat",b);}else{g=+g||0;g++;i=".pointat"+g;c(this).data("settings.pointat",b);c(this).data("myid.pointat",g);c("body").data("pointatcount",g);}if(b.hookScroll){scrollnspace="scroll"+i;c(window).bind(scrollnspace,function(){a.updateRotation.apply(h);});}if(b.hookDrag){if(b.draggable!==null){c(b.draggable).bind("drag.pointat",function(){a.updateRotation.apply(h);});}else{c(h).bind("drag.pointat",function(){a.updateRotation.apply(h);});}}if(b.pointAtInit){a.updateRotation.apply(this);}});},getAngle:function(h){var g=c(this).data("settings.pointat"),e,f,i;if(!g){c.error("Method getAngle used on an element that does not have jQuery.PointAt initialized.");}h=typeof h!=="undefined"?h:g.target;if(h instanceof Array){h=h[0];}f=c(h).offset();i=0;if(g.getAngleFrom!==null){e=c(g.getAngleFrom).offset();}else{e=c(this).offset();}i=Math.atan2(((f.left+g.xCorrection)-e.left),((f.top+g.yCorrection)-e.top))*180/Math.PI;i=180-Math.ceil(i);if(g.defaultDirection==="right"){i=i-90;}else{if(g.defaultDirection==="down"){i=i-180;}else{if(g.defaultDirection==="left"){i=i-270;}else{if(g.defaultDirection==="up"){}else{i=i-parseInt(g.defaultDirection,10);}}}}if(i<0){i=360+i;}else{if(i>360){i=0+i;}}return i;},updateRotation:function(){return c(this).each(function(){var g=c(this).data("settings.pointat"),f=c(this).data("angle.pointat"),l=[],h,e,n,j,k=g.changeTargetTo,m=370;if(!g){c.error("Method updateRotation used on an element that does not have jQuery.PointAt initialized.");}if(g.target instanceof Array){if(isNaN(f)){if(g.changeTargetTo==="low"){f=361;}else{if(g.changeTargetTo==="high"){f=-1;}else{f=-1;}}}if(g.changeTargetTo==="low"){k=0;}else{if(g.changeTargetTo==="high"){k=360;}}for(j=0;j<g.target.length;j++){h=a.getAngle.apply(this,[g.target[j]]);if(m>Math.abs(k-h)){m=Math.abs(k-h);f=h;n=g.target[j];}}e=c(this).data("currentTarget.pointat");if(n!==e){l=[n,e];c(this).data("currentTarget.pointat",n);c(this).trigger("changedTarget",l);}}else{f=a.getAngle.apply(this);}if(g.pause===false){l=[c(this).data("angle.pointat"),f];c(this).trigger("beforeRotate",l);}if(g.angleLessThanFunc!==null){if(f<g.angleLessThan){g.angleLessThanFunc.apply(this);}}if(g.angleGreaterThanFunc!==null){if(f>g.angleGreaterThan){g.angleGreaterThanFunc.apply(this);}}if(g.passAngleTo!==null){if(c(g.passAngleTo).is("input")){c(g.passAngleTo).val(f);}else{c(g.passAngleTo).html(f);}}if(g.pause===false){c(this).data("angle.pointat",f);c(this)[g.rotateFunction](f);}c(this).trigger("afterRotate",l);});},destroy:function(){return this.each(function(){var f=c(this).data("settings.pointat"),e,g;if(!f){c.error("Method destroy used on an element that does not have jQuery.PointAt initialized.");}e=c(this).data("myid.pointat");g=".pointat";e=+e||0;g=".pointat"+e;c(window).unbind(g);if(f.hookDrag){if(f.draggable!==null){c(f.draggable).unbind("drag.pointat");}else{c(this).unbind("drag.pointat");}}c(this).removeData("settings.pointat");c(this).removeData("myid.pointat");});},pause:function(){return this.each(function(){var e=c(this).data("settings.pointat");if(e){e.pause=true;c(this).data("settings.pointat",e);}else{c.error("Method pause used on an element that does not have jQuery.PointAt initialized.");}});},resume:function(){return this.each(function(){var e=c(this).data("settings.pointat");if(e){e.pause=false;c(this).data("settings.pointat",e);}else{c.error("Method resume used on an element that does not have jQuery.PointAt initialized.");}});}};c.fn.pointat=function(e){if(a[e]){return a[e].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof e==="object"||!e){return a.init.apply(this,arguments);}else{c.error("Method "+e+" does not exist on jQuery.pointat");}}};})(jQuery);



$.fn.jqrotate=function(degrees,options){var options=$.extend({animate:false},options);return this.each(function(){var $this=$(this);var oObj=$this[0];var deg2radians=Math.PI*2/360;var rad=degrees*deg2radians;var costheta=Math.cos(rad);var sintheta=Math.sin(rad);a=parseFloat(costheta).toFixed(8);b=parseFloat(-sintheta).toFixed(8);c=parseFloat(sintheta).toFixed(8);d=parseFloat(costheta).toFixed(8);$this.css({'-ms-filter':'progid:DXImageTransform.Microsoft.Matrix(M11='+a+', M12='+b+', M21='+c+', M22='+d+',sizingMethod=\'auto expand\')','filter':'progid:DXImageTransform.Microsoft.Matrix(M11='+a+', M12='+b+', M21='+c+', M22='+d+',sizingMethod=\'auto expand\')','-moz-transform':"matrix("+a+", "+c+", "+b+", "+d+", 0, 0)",'-webkit-transform':"matrix("+a+", "+c+", "+b+", "+d+", 0, 0)",'-o-transform':"matrix("+a+", "+c+", "+b+", "+d+", 0, 0)"})})};