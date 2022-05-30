/*
  _    _ _   _ _ _ _        _          
 | |  | | | (_) (_) |      (_)         
 | |  | | |_ _| |_| |_ __ _ _ _ __ ___ 
 | |  | | __| | | | __/ _` | | '__/ _ \
 | |__| | |_| | | | || (_| | | | |  __/
  \____/ \__|_|_|_|\__\__,_|_|_|  \___|
                                       
*/
var Utl = {};
// true si valeur est entre deux autres aleurs
Utl.entre = function(valeur, min, max) {
  return (valeur - min) * (valeur - max) < 0;
};
Utl.aleatoire = function(min, max) {
  return min + Math.random() * (max - min);
};
// Distance entre deux points
Utl.distance = function(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
};
Utl.lerp = function(value1, value2, amount) {
  return value1 + (value2 - value1) * amount;
};
// collision Point > Carre
Utl.pointCarre = function(x, y, carre) {
  return (
    Utl.entre(x, carre.pos.x, carre.pos.x + carre.taille) &&
    Utl.entre(y, carre.pos.y, carre.pos.y + carre.taille)
  );
};
// Morceler un tableau de plusieurs lignes
Utl.morceler = function(tableau, largeur) {
  var resultat = [];
  for (var i = 0; i < tableau.length; i += largeur)
    resultat.push(tableau.slice(i, i + largeur));
  return resultat;
};
// Morceler un tableau de plusieurs lignes
Utl.tablifier = function(tableaux) {
  let resultat = [];
  document.body.innerHTML = "";
  let largeur = tableaux.width;
  for (var i = 0; i < tableaux.layers.length; i++) {
    let obj = {};
    obj.nom = tableaux.layers[i].name;
    for (let a = 0; a < tableaux.layers[i].data.length; a++) {
      tableaux.layers[i].data[a] -= 1;
    }
    obj.geometrie = Utl.morceler(tableaux.layers[i].data, largeur);

    resultat.push(obj);
  }
  console.log(resultat);
  document.write(JSON.stringify(resultat));
};

/*
  __  __           _       _           
 |  \/  |         | |     | |          
 | \  / | ___   __| |_   _| | ___  ___ 
 | |\/| |/ _ \ / _` | | | | |/ _ \/ __|
 | |  | | (_) | (_| | |_| | |  __/\__ \
 |_|  |_|\___/ \__,_|\__,_|_|\___||___/
                                       
*/
class Menu {
  constructor(parent, x, y, choix) {
    this.parent = parent;
    this.ctx = parent.ctx;
    this.choix = choix;
    this.pos = {
      x: x,
      y: y
    };
    this.actif = false;
    this.selection = 0;
    this.max = this.choix.length - 1;
    this.curseur = this.parent.ressources.curseur;
    this.touches = [];
  }
  changement(keyCode) {
    if (keyCode === 38 && this.selection > 0) {
      // haut
      this.selection -= 1;
      this.rendu();
    }
    if (keyCode === 40 && this.selection < this.max) {
      // bas
      this.selection += 1;
      this.rendu();
    }
    if (keyCode === 88) {
      // selection
      this.actif = false;
      this.parent.phase(this.choix[this.selection].lien);
    }
  }
  selectionne() {}
  rendu() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(
      0,
      this.pos.y - 10,
      this.parent.L,
      28 * this.choix.length
    );
    // on affiche le titre
    for (let i = 0; i < this.choix.length; i++) {
      this.parent.ecrire(this.choix[i].nom, this.pos.x, this.pos.y + 25 * i);
    }
    // on affiche la selection
    this.ctx.drawImage(
      this.curseur.img,
      this.pos.x - this.choix[this.selection].nom.length / 2 * 6 - 14,
      this.pos.y + 25 * this.selection - 2
    );
  }
}
class Camera {
  constructor(parent, cible) {
    this.parent = parent;
    this.ctx = parent.ctx;
    this.cible = cible;
    this.pos = {
      x: this.cible.pos.x,
      y: this.cible.pos.y
    };
    this.vel = {
      x: 0,
      y: 0
    };
    this.force = {
      x: 0,
      y: 0
    };
    this.facteur = {
      x: 0.1,
      y: 0.1
    };
    this.traine = 0.1;
  }
  rendu() {
    this.force.y = this.cible.pos.y - this.pos.y;
    this.force.y *= this.facteur.y;
    this.force.x = this.cible.pos.x - this.pos.x;
    this.force.x *= this.facteur.x;
    this.vel.x *= this.traine;
    this.vel.y *= this.traine;
    this.vel.x += this.force.x;
    this.vel.y += this.force.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}
class Entite {
  constructor(parent, x, y, sprite) {
    this.parent = parent;
    this.taille = parent.taille;
    this.ctx = parent.ctx;
    this.depart = {
      x: x,
      y: y
    };
    this.pos = {
      x: x,
      y: y
    };
    this.vel = {
      x: 0,
      y: 0
    };
    this.friction = {
      x: 0.76,
      y: 0.97
    };
    this.gravite = parent.gravite;
    this.vitesse = 1.5;
    this.limite = {
      x: parent.L,
      y: parent.H
    };
    this.mort = false;
    this.saut = true;
    this.auSol = false;
    this.passage = false;
    this.sprite = new Sprite(this, sprite);
    this.direction = true;
    this.seDeplace = false;
  }
  dessiner() {
    this.sprite.rendu();
  }
  integration() {
    this.vel.x += this.gravite.x;
    this.vel.y += this.gravite.y;
    this.vel.x *= this.friction.x;
    this.vel.y *= this.friction.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  rendu() {
    this.integration();
    this.dessiner();
  }
}

class Joueur extends Entite {
  constructor(parent, x, y, sprite) {
    super(parent, x, y, sprite);
    this.particuleStock = [];
    this.besoin = false;
    for (let i = 0; i < 10; i++) {
      let part = new Entite(
        this,
        this.pos.x,
        this.pos.y,
        this.parent.ressources.poussiere
      );
      part.gravite = { x: 0, y: -0.01 };
      part.affiche = false;
      this.particuleStock.push(part);
    }
  }
  deplacement() {
    if (this.parent.touches[38]) {
      this.diriger("haut");
    }
    if (this.parent.touches[39]) {
      this.diriger("droite");
      this.direction = false;
      this.seDeplace = true;
    }
    if (this.parent.touches[37]) {
      this.diriger("gauche");
      this.direction = true;
      this.seDeplace = true;
    }
    if (
      !this.parent.touches[38] &&
      !this.parent.touches[39] &&
      !this.parent.touches[37]
    ) {
      this.seDeplace = false;
    }
    if (this.seDeplace) {
      if (this.auSol) {
        this.sprite.animation = true;
        this.besoin = true;
        if (this.direction) {
          this.sprite.changeLigne(1);
        } else {
          this.sprite.changeLigne(2);
        }
      } else {
        this.sprite.changeLigne(0);
        this.sprite.animation = false;
        if (this.direction) {
          this.sprite.frame = 2;
        } else {
          this.sprite.frame = 3;
        }
      }
    } else {
      // le joueur ne bouge pas
      this.sprite.animation = false;
      this.besoin = false;
      this.sprite.changeLigne(0);
      if (this.auSol) {
        if (this.direction) {
          this.sprite.frame = 0;
        } else {
          this.sprite.frame = 1;
        }
      } else {
        if (this.direction) {
          this.sprite.frame = 2;
        } else {
          this.sprite.frame = 3;
        }
      }
    }
  }
  diriger(sens) {
    switch (sens) {
      case "haut":
        if (!this.saut && this.auSol) {
          this.saut = true;
          this.vel.y = -this.vitesse * 3;
        }
        break;
      case "gauche":
        if (this.vel.x > -this.vitesse) {
          this.vel.x--;
        }
        break;
      case "droite":
        if (this.vel.x < this.vitesse) {
          this.vel.x++;
        }
        break;
      default:
        console.log("aucun sens reconnu");
    }
  }
  collision() {
    if (this.pos.x < this.taille * 1) {
      this.pos.x = this.taille * 1;
    }
    if (this.pos.y < this.taille * 1) {
      this.pos.y = this.taille * 1;
    }
    if (this.pos.x > (this.parent.terrain.dimension.x - 1) * this.taille) {
      this.pos.x = (this.parent.terrain.dimension.x - 1) * this.taille;
    }
    if (this.pos.y > (this.parent.terrain.dimension.y - 1) * this.taille) {
      this.pos.y = (this.parent.terrain.dimension.y - 1) * this.taille;
      this.vel.y = 0;
    }
    let tX = this.pos.x + this.vel.x;
    let tY = this.pos.y + this.vel.y;
    let offset = this.taille / 2 - 1;
    // gauche
    let gauche1 = this.parent.infoCollision(
      tX - this.taille / 2,
      this.pos.y - offset
    );
    let gauche2 = this.parent.infoCollision(
      tX - this.taille / 2,
      this.pos.y + offset
    );
    if (gauche1.collision === true || gauche2.collision === true) {
      this.pos.x = gauche1.pos.x + this.taille + offset + 1;
      this.pos.x = gauche2.pos.x + this.taille + offset + 1;
      this.vel.x = 0;
    }
    // Droite
    let droite1 = this.parent.infoCollision(
      tX + this.taille / 2,
      this.pos.y - offset
    );
    let droite2 = this.parent.infoCollision(
      tX + this.taille / 2,
      this.pos.y + offset
    );
    if (droite1.collision === true || droite2.collision === true) {
      this.pos.x = droite1.pos.x - this.taille + offset;
      this.pos.x = droite2.pos.x - this.taille + offset;
      this.vel.x = 0;
    }
    // Bas
    let bas1 = this.parent.infoCollision(
      this.pos.x - offset,
      tY + this.taille / 2
    );
    let bas2 = this.parent.infoCollision(
      this.pos.x + offset,
      tY + this.taille / 2
    );
    if (bas1.collision === true || bas2.collision === true) {
      this.pos.y = bas1.pos.y - offset - 1;
      this.pos.y = bas2.pos.y - offset - 1;
      this.vel.y = 0;
      this.saut = false;
      this.auSol = true;
    } else if (
      bas1.collision === "plateforme" ||
      bas2.collision === "plateforme"
    ) {
      if (!this.auSol && this.pos.y + this.taille / 2 > bas1.pos.y + 2) {
      } else {
        this.pos.y = bas1.pos.y - offset - 1;
        this.pos.y = bas2.pos.y - offset - 1;
        if (this.passage) {
          this.vel.y = 0;
        }
        this.passage = true;
        this.saut = false;
        this.auSol = true;
      }
    } else {
      this.passage = false;
      this.auSol = false;
    }
    // Haut
    let haut1 = this.parent.infoCollision(
      this.pos.x - offset,
      tY - this.taille / 2
    );
    let haut2 = this.parent.infoCollision(
      this.pos.x + offset,
      tY - this.taille / 2
    );
    if (haut1.collision === true || haut2.collision === true) {
      this.pos.y = haut1.pos.y + this.taille + offset + 1;
      this.pos.y = haut2.pos.y + this.taille + offset + 1;
      this.vel.y = 0;
    }
    let tuileActive = this.parent.infoCollision(tX, tY);
    if (tuileActive.action) {
      this.parent.action(tuileActive.action, tuileActive.pos);
    }
  }
  generateur() {
    for (var i = this.particuleStock.length - 1; i >= 0; i--) {
      if (this.besoin) {
        this.particuleStock[i].affiche = true;
      } else {
        this.particuleStock[i].affiche = false;
      }
      if (
        this.particuleStock[i].sprite.mort &&
        this.particuleStock[i].affiche
      ) {
        this.particuleStock[i].sprite.frame = Utl.aleatoire(0, 8);
        this.particuleStock[i].vel.x = Utl.aleatoire(-1, 1);
        this.particuleStock[i].vel.y = 0;
        this.particuleStock[i].pos.x = this.particuleStock[i].parent.pos.x;
        this.particuleStock[i].pos.y = this.particuleStock[i].parent.pos.y;
        this.particuleStock[i].sprite.mort = false;
      } else if (!this.particuleStock[i].sprite.mort) {
        this.particuleStock[i].rendu();
      }
    }
  }
  rendu() {
    this.integration();
    this.collision();
    this.deplacement();
    this.generateur();
    this.dessiner();
  }
}
class Slime extends Entite {
  constructor(parent, x, y, sprite, cible) {
    super(parent, x, y, sprite);
    this.cible = cible;
    this.vitesse = 0.6;
  }
  deplacement() {
    let basGauche = this.parent.infoCollision(
      this.pos.x - this.taille / 2,
      this.pos.y + this.taille
    );
    let badDroit = this.parent.infoCollision(
      this.pos.x + this.taille / 2,
      this.pos.y + this.taille
    );
    if (!basGauche.collision) {
      this.direction = true;
      this.sprite.changeLigne(0);
    }
    if (!badDroit.collision) {
      this.direction = false;
      this.sprite.changeLigne(1);
    }
    let gauche = this.parent.infoCollision(
      this.pos.x - this.taille / 2,
      this.pos.y
    );
    let droit = this.parent.infoCollision(
      this.pos.x + this.taille / 2,
      this.pos.y
    );
    if (gauche.collision) {
      this.direction = true;
      this.sprite.changeLigne(0);
    }
    if (droit.collision) {
      this.direction = false;
      this.sprite.changeLigne(1);
    }
    if (this.direction) {
      this.diriger("droite");
    } else {
      this.diriger("gauche");
    }
  }
  diriger(sens) {
    switch (sens) {
      case "gauche":
        if (this.vel.x > -this.vitesse) {
          this.vel.x--;
        }
        break;
      case "droite":
        if (this.vel.x < this.vitesse) {
          this.vel.x++;
        }
        break;
      default:
        console.log("aucun sens reconnu");
    }
  }
  integration() {
    this.vel.x *= this.friction.x;
    this.vel.y *= this.friction.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  attaque() {
    if (
      Utl.pointCarre(
        this.pos.x + this.taille / 2,
        this.pos.y + this.taille / 2,
        this.cible
      )
    ) {
      this.cible.mort = true;
    }
  }
  rendu() {
    this.deplacement();
    this.integration();
    this.attaque();
    this.dessiner();
  }
}
class Fantome extends Entite {
  constructor(parent, x, y, sprite, cible) {
    super(parent, x, y, sprite);
    this.cible = cible;
    this.vitesse = 1;
  }
  deplacement() {
    let gauche = this.parent.infoCollision(
      this.pos.x - this.taille / 2,
      this.pos.y
    );
    let droit = this.parent.infoCollision(
      this.pos.x + this.taille / 2,
      this.pos.y
    );
    if (gauche.collision === true) {
      this.direction = true;
      this.sprite.changeLigne(0);
    }
    if (droit.collision === true) {
      this.direction = false;
      this.sprite.changeLigne(1);
    }
    if (this.direction) {
      this.diriger("droite");
    } else {
      this.diriger("gauche");
    }
  }
  diriger(sens) {
    switch (sens) {
      case "gauche":
        if (this.vel.x > -this.vitesse) {
          this.vel.x--;
        }
        break;
      case "droite":
        if (this.vel.x < this.vitesse) {
          this.vel.x++;
        }
        break;
      default:
        console.log("aucun sens reconnu");
    }
  }
  integration() {
    this.vel.x *= this.friction.x;
    this.vel.y *= this.friction.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  attaque() {
    if (
      Utl.pointCarre(
        this.pos.x + this.taille / 2,
        this.pos.y + this.taille / 2,
        this.cible
      )
    ) {
      this.cible.mort = true;
    }
  }
  rendu() {
    this.deplacement();
    this.integration();
    this.attaque();
    this.dessiner();
  }
}

class Scie extends Entite {
  constructor(parent, x, y, sprite, cible) {
    super(parent, x, y, sprite);
    this.cible = cible;
    this.vitesse = 1;
  }
  deplacement() {
    let haut = this.parent.infoCollision(
      this.pos.x,
      this.pos.y - this.taille / 2
    );
    let bas = this.parent.infoCollision(
      this.pos.x,
      this.pos.y + this.taille / 2
    );
    if (haut.collision === true) {
      this.direction = true;
    }
    if (bas.collision === true) {
      this.direction = false;
    }
    if (this.direction) {
      this.diriger("bas");
    } else {
      this.diriger("haut");
    }
  }
  diriger(sens) {
    switch (sens) {
      case "haut":
        if (this.vel.y > -this.vitesse) {
          this.vel.y--;
        }
        break;
      case "bas":
        if (this.vel.y < this.vitesse) {
          this.vel.y++;
        }
        break;
      default:
        console.log("aucun sens reconnu");
    }
  }
  integration() {
    this.vel.x *= this.friction.x;
    this.vel.y *= this.friction.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  attaque() {
    if (
      Utl.pointCarre(
        this.pos.x + this.taille / 2,
        this.pos.y + this.taille / 2,
        this.cible
      )
    ) {
      this.cible.mort = true;
    }
  }
  rendu() {
    this.deplacement();
    this.integration();
    this.attaque();
    this.dessiner();
  }
}

class Canon {
  constructor(parent, x, y, direction, cible) {
    // un canon ne peut tirer qu'un boulet à la fois :)
    this.parent = parent;
    this.taille = parent.taille;
    this.ctx = parent.ctx;
    this.pos = {
      x: x,
      y: y
    };
    this.cible = cible;
    this.direction = direction;
    this.boulet = new Boulet(this, this.parent.ressources.boulet);
    this.recharge = 20;
    this.temps = 0.4;
  }
  rendu() {
    if (!this.boulet.mort) {
      this.boulet.rendu();
    } else {
      if (this.recharge > 0) {
        this.recharge -= this.temps;
      } else {
        this.boulet.mort = false;
        this.recharge = 20;
      }
    }
  }
}
class Boulet {
  constructor(parent, sprite) {
    // le parent doit être un canon
    this.parent = parent;
    this.monde = parent.parent;
    this.taille = parent.taille;
    this.ctx = parent.ctx;
    // quand il touche un mur il revient ici
    this.depart = {
      x: this.parent.pos.x,
      y: this.parent.pos.y
    };
    this.pos = {
      x: this.depart.x,
      y: this.depart.y
    };
    this.vel = {
      x: this.parent.direction,
      y: 0
    };
    this.mort = true;
    this.cible = this.parent.cible;
    this.direction = this.parent.direction;
    this.sprite = sprite;
  }
  attaque() {
    if (
      Utl.pointCarre(
        this.pos.x + this.taille / 2,
        this.pos.y + this.taille / 2,
        this.cible
      )
    ) {
      this.cible.mort = true;
    }
  }
  deplacer() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    let gauche = this.monde.infoCollision(this.pos.x, this.pos.y);
    if (gauche.collision === true) {
      this.mort = true;
      this.pos.x = this.depart.x;
      this.pos.y = this.depart.y;
    }
  }
  dessiner() {
    this.ctx.drawImage(this.sprite.img, this.pos.x, this.pos.y - 3);
  }
  rendu() {
    this.dessiner();
    this.deplacer();
    this.attaque();
  }
}
class Sprite {
  constructor(parent, donnee) {
    this.parent = parent;
    this.ctx = this.parent.ctx;
    this.donnee = donnee;
    (this.l = Math.round(this.donnee.img.width / this.donnee.sep)),
      (this.h = this.donnee.img.height / this.donnee.ligne);
    this.image = this.donnee.img;
    this.ligne = 0;
    this.longueur = this.donnee.sep;
    this.selectLigne = this.h / this.donnee.ligne * this.ligne;
    // animation
    this.frame = 0;
    this.allure = donnee.allure;
    this.animation = true;
    this.mort = false;
  }
  changeLigne(selection) {
    this.ligne = selection;
    this.selectLigne = this.h * this.ligne;
  }
  reset() {
    this.frame = 0;
  }
  animer() {
    if (this.animation) {
      this.frame += this.allure;
      if (this.frame >= this.longueur) {
        this.frame = 0;
        this.mort = true;
      }
    }
  }
  rendu() {
    this.animer();
    this.ctx.drawImage(
      this.image,
      Math.floor(this.frame) * this.l,
      this.selectLigne,
      this.l,
      this.h,
      this.parent.pos.x - this.l / 2,
      this.parent.pos.y + this.parent.taille / 2 - this.h,
      this.l,
      this.h
    );
  }
}

("use strict");

class Monde {
  constructor(parametres, niveaux) {
    this.alphabet = "abcdefghijklmnopqrstuvwxyz0123456789 ?!():'";
    this.taille = parametres.taille;
    this.touches = [];
    this.remplissage = false;
    this.zoom = 2;
    this.niveaux = niveaux;
    this.niveauActuel = Math.round(Utl.aleatoire(0, this.niveaux.length - 1));
    // on recupere la derniere sauvegarde
    if (localStorage.donjon) {
      console.info("mémoire récupérée");
      this.memoire = JSON.parse(localStorage.donjon);
    } else {
      // s'il n'y a rien on genere une mémoire
      localStorage.setItem(
        "donjon",
        JSON.stringify({
          score: 0,
          points: 0
        })
      );
      this.memoire = JSON.parse(localStorage.donjon);
    }
    this.points = this.memoire.points;
    this.score = 0;
    this.Mscore = this.memoire.score;
    this.gravite = {
      x: 0,
      y: 0.22
    };
    this.creerContexte();
    // Nombre d'images à charger dans le pack :B
    this.prop = {
      compte: 0,
      nombreImg: parametres.stockImages.length
    };
    this.ressources = {};
    this.traitement(parametres.stockImages, parametres.clefs);
    this.enjeu = false;
    this.pause = false;
    // le menu
    let bouttons = [
      {
        nom: "start game",
        lien: "start"
      },
      {
        nom: "how to play",
        lien: "regles"
      },
      {
        nom: "about",
        lien: "info"
      }
    ];
    this.menu = new Menu(this, this.L / 2, 140, bouttons);
  }
  creerContexte() {
    this.toile = document.createElement("canvas");
    this.ctx = this.toile.getContext("2d");
    this.L = this.toile.width = 128 * 2;
    this.H = this.toile.height = 128 * 2;
    this.toile.style.width = this.L * this.zoom + "px";
    this.toile.style.height = this.H * this.zoom + "px";
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    document.body.appendChild(this.toile);
    console.info("Monde créé");
    document.addEventListener(
      "keydown",
      event => this.touchePresse(event),
      false
    );
    document.addEventListener("keyup", event => this.toucheLache(event), false);
    document.addEventListener(
      "visibilitychange",
      event => this.handleVisibilityChange(event),
      false
    );
  }
  handleVisibilityChange(e) {
    if (document.hidden) {
      if (this.enjeu && !this.pause) {
        this.pause = true;
        this.phase("pause");
      }
    }
  }
  traitement(stockImages, clefs) {
    // traitement images
    let IM = {};
    for (let i = 0; i < stockImages.length; i++) {
      let sujet = stockImages[i];
      let nom = sujet.nom;
      sujet.img = this.chargerImages(stockImages[i].img);
      IM[nom] = stockImages[i];
    }
    this.ressources = IM;
    //  traitement clefs
    this.nettoyer = new Array(clefs.length).fill(false);
    let CM = {};
    for (let i = 0; i < clefs.length; i++) {
      let sujet = clefs[i];
      let nom = sujet.id;
      if (sujet.type === "sprite") {
        sujet.frame = 0;
        sujet.longueur = this.ressources[sujet.apparence].l;
        sujet.sprite = this.ressources[sujet.apparence];
        sujet.memoireBoucle = false;
        sujet.peutAnimer = true;
        sujet.boucle = true;
      }
      CM[nom] = clefs[i];
    }
    this.clefs = CM;
  }
  touchePresse(event) {
    this.touches[event.keyCode] = true;
    if (this.menu.actif) {
      this.menu.changement(event.keyCode);
    }
    if (!this.enjeu && !this.menu.actif && this.touches[67]) {
      this.phase("menu");
      this.menu.actif = true;
    }
    if (this.enjeu && !this.pause && this.touches[27]) {
      this.enjeu = false;
      this.phase("menu");
      this.menu.actif = true;
    }
    if (event.keyCode === 70) {
      this.activeRemplissage();
    }
    if (this.enjeu && !this.pause && this.touches[80]) {
      this.touches[80] = false;
      this.pause = true;
      this.phase("pause");
    }
    if (this.enjeu && this.pause && this.touches[80]) {
      this.pause = false;
      this.boucle();
    }
  }
  toucheLache(event) {
    this.touches[event.keyCode] = false;
  }
  chargerImages(url) {
    let img = new Image();
    let self = this;
    img.onload = function() {
      self.chargement();
    };
    img.src = url;
    return img;
  }
  chargement() {
    this.prop.compte += 1;
    if (this.prop.compte === this.prop.nombreImg) {
      console.info("les images sont chargées :) " + this.prop.nombreImg);
      this.motif = this.ctx.createPattern(this.ressources.motif.img, "repeat");

      this.phase("menu");
      this.menu.actif = true;
    } else {
      // écran de chargement
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, this.L, this.H);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(
        0,
        this.H / 2 - 1,
        this.prop.compte * this.L / this.prop.nombreImg,
        1
      );
    }
  }
  ecrire(texte, x, y) {
    let largeur = 6,
      hauteur = 9;
    let centre = texte.length * largeur / 2;
    for (var i = 0; i < texte.length; i++) {
      let index = this.alphabet.indexOf(texte.charAt(i)),
        clipX = largeur * index,
        posX = x - centre + i * largeur;
      this.ctx.drawImage(
        this.ressources.pixelFont.img,
        clipX,
        0,
        largeur,
        hauteur,
        posX,
        y,
        largeur,
        hauteur
      );
    }
  }
  activeRemplissage() {
    if (!this.remplissage) {
      this.toile.webkitRequestFullScreen();
      this.remplissage = true;
      this.toile.style.width = "100vmin";
      this.toile.style.height = "100vmin";
    } else {
      document.webkitCancelFullScreen();
      this.remplissage = false;
      this.toile.style.width = this.L * this.zoom + "px";
      this.toile.style.height = this.H * this.zoom + "px";
    }
  }

  chargerTerrain() {
    // on genere un clone du tableau pour ne pas effacer les points
    this.clefs[7].peutAnimer = false;
    this.clefs[7].frame = 0;
    this.clefs[7].boucle = false;

    let nouveau;
    while (true) {
      nouveau = Math.round(Utl.aleatoire(0, this.niveaux.length - 1));
      if (nouveau !== this.niveauActuel) {
        this.niveauActuel = nouveau;
        break;
      }
    }

    this.terrain = {};
    this.terrain.geometrie = JSON.parse(
      JSON.stringify(this.niveaux[this.niveauActuel].geometrie)
    );
    this.terrain.dimension = {
      x: this.terrain.geometrie[0].length,
      y: this.terrain.geometrie.length
    };
    this.terrain.apparence = [];
    this.calculerApparence();
    // ajouter le joueur
    this.depart = this.chercheClef("depart")[0];
    this.joueur = new Joueur(
      this,
      this.depart.pos.x + this.taille / 2,
      this.depart.pos.y + this.taille / 2,
      this.ressources.chevalier
    );
    // les ennemis
    this.ennemis = [];
    let departSlime = this.chercheClef("slime");
    for (var i = 0; i < departSlime.length; i++) {
      this.ennemis.push(
        new Slime(
          this,
          departSlime[i].pos.x + this.taille / 2,
          departSlime[i].pos.y + this.taille / 2,
          this.ressources.slime,
          this.joueur
        )
      );
    }
    let departFantome = this.chercheClef("fantome");
    for (var i = 0; i < departFantome.length; i++) {
      this.ennemis.push(
        new Fantome(
          this,
          departFantome[i].pos.x + this.taille / 2,
          departFantome[i].pos.y + this.taille / 2,
          this.ressources.fantome,
          this.joueur
        )
      );
    }
    let departScie = this.chercheClef("scie");
    for (var i = 0; i < departScie.length; i++) {
      this.ennemis.push(
        new Scie(
          this,
          departScie[i].pos.x + this.taille / 2,
          departScie[i].pos.y + this.taille / 2,
          this.ressources.scie,
          this.joueur
        )
      );
    }
    let departDcanon = this.chercheClef("dCanon");
    for (var i = 0; i < departDcanon.length; i++) {
      this.ennemis.push(
        new Canon(
          this,
          departDcanon[i].pos.x + this.taille / 2,
          departDcanon[i].pos.y + this.taille / 2,
          -3,
          this.joueur
        )
      );
    }
    let departGcanon = this.chercheClef("gCanon");
    for (var i = 0; i < departGcanon.length; i++) {
      this.ennemis.push(
        new Canon(
          this,
          departGcanon[i].pos.x + this.taille / 2,
          departGcanon[i].pos.y + this.taille / 2,
          3,
          this.joueur
        )
      );
    }
    if (!this.animation) {
      this.boucle();
    }
  }
  infoCollision(x, y) {
    if (
      x > 0 &&
      y > 0 &&
      y < this.terrain.dimension.y * this.taille &&
      x < this.terrain.dimension.x * this.taille
    ) {
      let NewX = Math.floor(x / this.taille);
      let NewY = Math.floor(y / this.taille);
      let NClef = this.terrain.geometrie[NewY][NewX];
      let info = {
        collision: this.clefs[NClef].collision,
        pente: this.clefs[NClef].pente,
        action: this.clefs[NClef].action,
        pos: {
          x: NewX * this.taille,
          y: NewY * this.taille
        }
      };
      return info;
    } else {
      return false;
    }
  }
  coordonner(x, y) {
    let NewX = Math.floor(x / this.taille);
    let NewY = Math.floor(y / this.taille);
    return {
      x: NewX,
      y: NewY
    };
  }
  chercheClef(recherche) {
    let blockRecherche = [];
    for (var j = 0; j < this.terrain.dimension.y; j++) {
      for (var i = 0; i < this.terrain.dimension.x; i++) {
        let id = this.terrain.geometrie[j][i];
        if (this.clefs[id].nom === recherche) {
          let info = {
            pos: {
              x: i * this.taille,
              y: j * this.taille
            }
          };
          blockRecherche.push(info);
        }
      }
    }
    return blockRecherche;
  }
  calculerApparence() {
    let tuileBitMask = [];
    let compte = 0;
    this.terrain.apparence = [];
    for (var j = 0; j < this.terrain.dimension.y; j++) {
      for (var i = 0; i < this.terrain.dimension.x; i++) {
        let id = this.terrain.geometrie[j][i];
        // haut gauche droit bas
        let voisine = [0, 0, 0, 0];
        compte += 1;
        if (j - 1 > -1) {
          if (id === this.terrain.geometrie[j - 1][i]) {
            //haut
            voisine[0] = 1;
          }
        }
        if (id === this.terrain.geometrie[j][i - 1]) {
          // gauche
          voisine[1] = 1;
        }
        if (id === this.terrain.geometrie[j][i + 1]) {
          // droite
          voisine[2] = 1;
        }
        if (j + 1 < this.terrain.dimension.y) {
          if (id === this.terrain.geometrie[j + 1][i]) {
            //bas
            voisine[3] = 1;
          }
        }
        id = 1 * voisine[0] + 2 * voisine[1] + 4 * voisine[2] + 8 * voisine[3];
        this.terrain.apparence.push(id);
      }
    }
    this.terrain.apparence = Utl.morceler(
      this.terrain.apparence,
      this.terrain.dimension.x
    );
  }
  renduTerrain() {
    for (let j = 0; j < this.terrain.dimension.y; j++) {
      for (let i = 0; i < this.terrain.dimension.x; i++) {
        let id = this.terrain.geometrie[j][i];
        if (this.clefs[id].apparence === "auto") {
          var sourceX = Math.floor(this.terrain.apparence[j][i]) * this.taille;
          var sourceY = Math.floor(this.terrain.apparence[j][i]) * this.taille;
          this.ctx.drawImage(
            this.ressources.feuille.img,
            sourceX,
            this.clefs[id].ligne * this.taille,
            this.taille,
            this.taille,
            i * this.taille,
            j * this.taille,
            this.taille,
            this.taille
          );
        } else if (this.clefs[id].type === "sprite") {
          if (!this.clefs[id].memoireBoucle) {
            if (this.clefs[id].peutAnimer) {
              this.clefs[id].frame += this.clefs[id].allure;
            }

            if (this.clefs[id].frame >= this.clefs[id].sprite.sep) {
              if (!this.clefs[id].boucle) {
                this.clefs[id].peutAnimer = false;
              }
              this.clefs[id].frame = 0;
            }
            this.clefs[id].memoireBoucle = true;
            // on sait quel id est déjà passé :^)
            this.nettoyer[id] = true;
          }
          this.ctx.drawImage(
            this.clefs[id].sprite.img,
            Math.floor(this.clefs[id].frame) * this.taille,
            0,
            this.taille,
            this.taille,
            i * this.taille,
            j * this.taille,
            this.taille,
            this.taille
          );
        } else {
          var sourceX = Math.floor(this.clefs[id].apparence % 16) * this.taille;
          var sourceY = Math.floor(this.clefs[id].apparence / 16) * this.taille;
          this.ctx.drawImage(
            this.ressources.feuille.img,
            sourceX,
            sourceY,
            this.taille,
            this.taille,
            i * this.taille,
            j * this.taille,
            this.taille,
            this.taille
          );
        }
      }
    }
    for (var i = 0; i < this.nettoyer.length; i++) {
      if (this.nettoyer[i]) {
        this.clefs[i].memoireBoucle = false;
      }
    }
  }
  rendu() {
    this.renduTerrain();
    this.joueur.rendu();
    for (var i = this.ennemis.length - 1; i >= 0; i--) {
      this.ennemis[i].rendu();
    }
    this.ecrire(this.points.toString(), 20, 4);
    this.ecrire("score : " + this.score.toString(), this.L / 2, 4);
  }
  boucle() {
    this.ctx.fillStyle = this.motif;
    this.ctx.fillRect(0, 0, this.L, this.H);
    this.rendu();
    if (!this.joueur.mort) {
      this.animation = requestAnimationFrame(() => this.boucle());
    } else {
      this.phase("mort");
    }
  }
  phase(phase) {
    cancelAnimationFrame(this.animation);
    this.animation = undefined;
    this.ctx.fillStyle = this.motif;
    this.ctx.fillRect(0, 0, this.L, this.H);
    switch (phase) {
      case "menu":
        // affiche le menu du jeu
        this.ctx.drawImage(this.ressources.titre.img, 0, 0);
        this.ecrire("best score : " + this.Mscore.toString(), this.L / 2, 100);
        this.ecrire("coins : " + this.points.toString(), this.L / 2, 110);
        this.menu.rendu();
        this.ecrire(
          "arrow keys to select 'x' to confirm",
          this.L / 2,
          this.H - 25
        );
        break;
      case "start":
        this.enjeu = true;
        this.chargerTerrain();
        break;
      case "mort":
        this.enjeu = false;
        this.score = 0;
        // affiche le tableau de mort du joueur
        this.ctx.drawImage(
          this.ressources.tetedemort.img,
          this.L / 2 - this.ressources.tetedemort.img.width / 2,
          50
        );
        this.ecrire("press 'c' to return to menu", this.L / 2, this.H - 25);
        break;
      case "regles":
        // affiche les regles du jeu
        this.ecrire("controles : ", this.L / 2, 20);
        this.ecrire("arrow keys to move", this.L / 2, 40);
        this.ecrire("'x' and 'c' for actions", this.L / 2, 50);
        this.ecrire("'f' to toggle fullscreen", this.L / 2, 60);
        this.ecrire("'p' to pause the game", this.L / 2, 70);
        this.ecrire("'echap' to quit the game", this.L / 2, 80);
        // regles
        this.ecrire("rules : ", this.L / 2, 110);
        this.ecrire("walk through the dungeon", this.L / 2, 130);
        this.ecrire("each time you enter a new room", this.L / 2, 140);
        this.ecrire("your score get higher", this.L / 2, 150);
        // infos
        this.ecrire("press 'c' to return to menu", this.L / 2, this.H - 25);
        break;
      case "info":
        // affiche les regles du jeu
        this.ecrire("about : ", this.L / 2, 20);
        this.ecrire("made with html5 canvas", this.L / 2, 40);
        this.ecrire("by gtibo on codepen", this.L / 2, 50);
        this.ecrire("infos :", this.L / 2, 80);
        this.ecrire("pico 8 palette color", this.L / 2, 100);
        this.ecrire(
          "tiles : " + this.taille + "x" + this.taille,
          this.L / 2,
          110
        );
        this.ctx.drawImage(this.ressources.feuille.img, 0, 140);
        this.ecrire("press 'c' to return to menu", this.L / 2, this.H - 25);
        break;
      case "pause":
        // affiche les regles du jeu
        this.ecrire("paused", this.L / 2, 20);
        this.ecrire("press 'p' to resume the game", this.L / 2, this.H - 25);
        break;
      default:
        console.log("aucune action reconnue");
    }
  }
  action(action, pos) {
    switch (action) {
      case "rebond":
        this.joueur.vel.y = -9;
        this.joueur.saut = false;
        this.joueur.auSol = false;
        this.clefs[7].peutAnimer = true;
        break;
      case "mort":
        if (this.score > this.Mscore) {
          this.Mscore = this.score;
        }
        this.joueur.mort = true;
        // on sauvegarde dans le localStorage le score
        localStorage.setItem(
          "donjon",
          JSON.stringify({
            score: this.Mscore,
            points: this.points
          })
        );
        break;
      case "piece":
        this.terrain.geometrie[Math.floor(pos.y / this.taille)][
          Math.floor(pos.x / this.taille)
        ] = 1;
        this.points += 1;
        break;
      case "suivant":
        this.score += 1;
        this.chargerTerrain();
        break;
      default:
        console.log("aucune action reconnue");
    }
  }
}

let parametres = {
  taille: 16,

  clefs: [
    { type: "tuile", nom: "vide", id: 1, collision: false, apparence: 0 },
    {
      type: "tuile",
      nom: "mur",
      id: 2,
      collision: true,
      apparence: "auto",
      ligne: 1
    },
    { type: "tuile", nom: "depart", id: 3, collision: false, apparence: 2 },
    {
      type: "tuile",
      nom: "sortie",
      id: 4,
      collision: false,
      action: "suivant",
      apparence: 3
    },

    {
      type: "tuile",
      nom: "pique",
      id: 5,
      collision: false,
      action: "mort",
      apparence: 4
    },
    {
      type: "tuile",
      nom: "pique",
      id: 6,
      collision: false,
      action: "mort",
      apparence: 5
    },
    {
      type: "sprite",
      nom: "ressort",
      id: 7,
      collision: false,
      action: "rebond",
      apparence: "trampo",
      ligne: 2,
      allure: 0.3
    },

    {
      type: "sprite",
      nom: "lave",
      id: 8,
      collision: false,
      action: "mort",
      apparence: "lave",
      ligne: 2,
      allure: 0.2
    },
    {
      type: "tuile",
      nom: "plateforme",
      id: 9,
      collision: "plateforme",
      apparence: 8
    },
    { type: "tuile", nom: "slime", id: 10, collision: false, apparence: 0 },
    {
      type: "sprite",
      nom: "piece",
      id: 11,
      collision: false,
      action: "piece",
      apparence: "piece",
      ligne: 2,
      allure: 0.3
    },
    { type: "tuile", nom: "dCanon", id: 12, collision: false, apparence: 11 },
    { type: "tuile", nom: "gCanon", id: 14, collision: false, apparence: 13 },
    { type: "tuile", nom: "fantome", id: 13, collision: false, apparence: 0 },
    {
      type: "tuile",
      nom: "pique",
      id: 15,
      collision: false,
      action: "mort",
      apparence: 14
    },
    {
      type: "tuile",
      nom: "pique",
      id: 16,
      collision: false,
      action: "mort",
      apparence: 15
    },
    { type: "tuile", nom: "scie", id: 17, collision: false, apparence: 0 }
  ],

  stockImages: [
    {
      img: "https://image.ibb.co/btG4X5/font.png",
      nom: "pixelFont",
      l: 192,
      h: 11
    },
    { img: "https://image.ibb.co/hqWGek/motif.png", nom: "motif" },
    { img: "https://image.ibb.co/bDF9zk/feuille.png", nom: "feuille" },
    { img: "https://image.ibb.co/ekFWC5/curseur.png", nom: "curseur" },
    { img: "https://image.ibb.co/b0Jq5Q/titre.png", nom: "titre" },
    { img: "https://image.ibb.co/gBA9zk/lave_Sprite.png", nom: "lave", sep: 8 },
    { img: "https://image.ibb.co/d8Jwek/piece.png", nom: "piece", sep: 15 },
    { img: "https://image.ibb.co/mR48s5/trampo.png", nom: "trampo", sep: 13 },
    {
      img: "https://image.ibb.co/iivnkQ/chevalier.png",
      nom: "chevalier",
      sep: 9,
      ligne: 3,
      allure: 0.24
    },
    {
      img: "https://image.ibb.co/dnTwek/slime.png",
      nom: "slime",
      sep: 11,
      ligne: 2,
      allure: 0.3
    },
    {
      img: "https://image.ibb.co/k4705Q/fantome.png",
      nom: "fantome",
      sep: 8,
      ligne: 2,
      allure: 0.2
    },
    {
      img: "https://image.ibb.co/efw4X5/poussiere.png",
      nom: "poussiere",
      sep: 9,
      ligne: 1,
      allure: 0.15
    },
    {
      img: "https://image.ibb.co/cwTjX5/boulet.png",
      nom: "boulet",
      sep: 8,
      ligne: 2,
      allure: 0.2
    },
    { img: "https://image.ibb.co/dBhuX5/tetedemort.png", nom: "tetedemort" },
    {
      img: "https://image.ibb.co/bzf9zk/scie.png",
      nom: "scie",
      sep: 5,
      ligne: 1,
      allure: 0.6
    }
  ]
};

niveaux = [
  {
    nom: "zigzag",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1, 4, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 14, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 1],
      [1, 2, 9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 12, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 5, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "flechettes",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 9, 9, 9, 9, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 12, 2, 1],
      [1, 2, 1, 4, 1, 1, 2, 2, 9, 9, 9, 9, 9, 9, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 12, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 2, 1],
      [1, 2, 1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 12, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "lesaut",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 1, 1, 1, 6, 6, 1, 1, 1, 2, 2, 2, 1],
      [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 12, 2, 2, 14, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 13, 1, 1, 2, 1],
      [1, 2, 1, 3, 1, 7, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 9, 1, 9, 1, 9, 1, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 8, 8, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
    ]
  },
  {
    nom: "evitesca",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 11, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 11, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 16, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 16, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "faitesvite",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 2, 1],
      [1, 2, 13, 13, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "sautenchaine",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 13, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 16, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 16, 2, 2, 2, 1, 11, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 16, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 7, 1, 2, 2, 2, 1, 11, 1, 2, 1],
      [1, 2, 1, 1, 13, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 16, 2, 2, 2, 2, 2, 2, 1, 11, 1, 2, 1],
      [1, 2, 1, 1, 16, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1],
      [1, 2, 3, 7, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "piege",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 1],
      [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 6, 6, 6, 6, 6, 6, 6, 6, 2, 2, 2, 1],
      [1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 3, 1, 1, 7, 7, 1, 1, 1, 4, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "fantomecuit",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 9, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 9, 9, 9, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "lechoix",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 1],
      [1, 2, 1, 9, 1, 1, 1, 1, 1, 13, 1, 1, 9, 1, 2, 1],
      [1, 2, 1, 1, 9, 9, 1, 1, 1, 1, 9, 9, 1, 1, 2, 1],
      [1, 2, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 9, 9, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 13, 1, 1, 9, 1, 1, 1, 1, 1, 1, 9, 9, 2, 1],
      [1, 2, 1, 9, 9, 1, 1, 1, 9, 9, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 13, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 1, 1, 2, 1],
      [1, 2, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "sautdelange",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 9, 9, 9, 1, 1, 1, 1, 1, 1, 9, 9, 9, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 2, 1],
      [1, 2, 2, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 1],
      [1, 2, 1, 2, 5, 1, 13, 1, 11, 1, 1, 1, 5, 2, 2, 1],
      [1, 2, 1, 1, 2, 5, 1, 1, 11, 1, 1, 5, 2, 1, 2, 1],
      [1, 2, 1, 1, 1, 2, 5, 1, 1, 1, 5, 2, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 2, 5, 4, 5, 2, 1, 1, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "sautdelave",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 17, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 1],
      [1, 2, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 7, 1, 17, 1, 1, 7, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 9, 1, 1, 1, 1, 9, 1, 1, 1, 2, 1],
      [1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "rencontre",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 3, 1, 1, 1, 1, 10, 1, 1, 1, 4, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "scie",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 2, 1],
      [1, 2, 1, 4, 1, 1, 1, 10, 1, 1, 1, 1, 1, 16, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 15, 1, 16, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 17, 1, 1, 1, 16, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 17, 1, 1, 1, 1, 16, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 17, 1, 1, 1, 1, 1, 16, 2, 1],
      [1, 2, 1, 3, 1, 1, 17, 1, 1, 1, 1, 1, 7, 16, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  },
  {
    nom: "depechezvous",
    geometrie: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1, 2, 1, 3, 1, 2, 1, 1, 1, 1, 2, 1, 4, 1, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }
];

let demo = new Monde(parametres, niveaux);