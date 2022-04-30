Wordle = new function(){
  var $this = this;
  this.version = '1.0';
  this.AnswerType = {
    RANDOM: 1,
    DAILY: 2,
    DEFINED: 4,
    DEFINED_BASE64: 8
  };
  this.Utils = new function(){
    var classArray = function( className ){
      className = className || '';
      var classes = className.split(' '),
          final = [];
      for( var i = 0; i < classes.length; i++ ) {
        var cl = classes[i];
        cl = Wordle.Utils.trim(cl);
        if ( cl.length ) final.push(cl);
      }
      return final;
    }
    var onReadyEvents = [];
    var callCallbacks = function(v) {
      for( var i = 0; i < onReadyEvents.length; i++ )
        onReadyEvents[i].call( $this );
    }
    var onReadyCalled = false;
    var handleOnReady = function(){      
      var onReady = function(){
        if ( !document.body ) return;
        if ( onReadyCalled ) return;
        onReadyCalled = true;
        removeEventListener('DOMContentLoaded', onReady );
        removeEventListener('load', onReady );
        callCallbacks();
      }
      removeEventListener('DOMContentLoaded', onReady );
      removeEventListener('load', onReady );
      addEventListener('DOMContentLoaded', onReady );
      addEventListener('load', onReady );
      if ( document.body ) callCallbacks();
    }
    this.onReady = function( callback ){
      onReadyEvents.push( callback );
      handleOnReady();
    }
    this.classList = new function(){
      this.add = function( el, cl ){
        cl = Wordle.Utils.trim( cl );
        var classes = classArray( el.className );
        if ( this.contains( el, cl ) ) return;
        classes.push( cl );
        el.className = classes.join(' ');
      }
      this.remove = function( el, cl ){
        cl = Wordle.Utils.trim( cl );
        var classes = classArray( el.className );
        var index = classes.indexOf( cl );
        if ( index == -1 ) return;
        classes.splice( index, 1 );
        el.className = classes.join(' ');
      }
      this.toggle = function( el, cl ){
        if ( this.contains( el, cl ) ) this.remove( el, cl);
        else this.add( el, cl);
      }
      this.contains = function( el, cl ){
        var classes = classArray( el.className );
        return classes.indexOf( cl ) > -1;
      }
    }
    this.getDay = function() {
      if ( typeof window.moment === 'function' ) {
        return moment().dayOfYear();
      }
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      return day;
    }
    this.trim = function(str){
      if ( !str.length ) return str;
      var empty = function(l){
        return (l==' '||l=="\n"||l=="\t"||l=="\r");
      },
      s = 0, l = str[s];
      while( l && empty(l) ) {
        s++; l = str[s];
      }
      var e = str.length-1; l = str[e];
      while( l && empty(l) ) {
        e--; l = str[e];
      }
      return str.slice(s, e+1);
    }
    this.load = function( file, onLoad, onError ){
      var request = new XMLHttpRequest();
      request.open("GET", file);
      request.onreadystatechange = function() {
        if ( this.readyState !== 4 ) return;
        if ( this.status === 200 ) return onLoad.call( Wordle, this.responseText );
        onError.call( Wordle, e );
      };
      request.send();
    }
    this.pad = function( num, zeros ){
      zeros = zeros || 1;
      var pad = '';
      for( var i = 1; i <= zeros; i++ ) pad += '0';
      return (num < 10 ? pad : '') + num;
    }
    this.loop = function( max, fn, start ){
      start = typeof start === 'number' ? start : 0;
      for( var i = 0; i < max; i++ ) fn.call( $this, i + start );
    }
    this.countdownUntilTomorrow = new function(){
      var interval,
          onUpdate;
      var _this = this;
      function update() {
        var now = new Date(),
            hoursLeft = 23-now.getHours(),
            minutesLeft = 59-now.getMinutes(),
            secondsLeft = 59-now.getSeconds(),
            str = Wordle.Utils.pad(hoursLeft) + ':' + Wordle.Utils.pad(minutesLeft) + ':' + Wordle.Utils.pad(secondsLeft);
        onUpdate.call( _this, str );
      }
      this.start = function( updateCallback ){
        this.stop();
        onUpdate = updateCallback || function(){};
        interval = setInterval( update, 1000 );
        update();
        return this;
      }
      this.stop = function(){
        clearInterval( interval );
        return this;
      }
    }
  }
  this.UI = new function(){
    this.growl = function( message, options ){
      options = options || {};
      options.life = options.life || 3000;
      options.parent = options.parent || document.body;
      var $growl = document.createElement('div');
      $growl.className = 'wordle-ui-growl';
      var $growlInner = document.createElement('div');
      $growlInner.className = 'wordle-ui-growl-inner';
      $growlInner.innerHTML = message;
      $growl.appendChild( $growlInner );
      options.parent.appendChild( $growl );
      setTimeout(function(){
        $growl.parentNode.removeChild( $growl );
      }, options.life );
    }
  }
  this.Dictionary = function( options ){
    options = options || {};
    options.separator = options.separator || "\n";
    var $this = this;
    this.words = ['WORDLE'];
    this.check = function( word ){
      var exists = this.words.indexOf( word ) > -1;
      if ( !exists ) {
        Wordle.UI.growl('Not in word list');
        return false;
      }
      return true;
    }
    var build = function() {
      if ( options.file ) Wordle.Utils.load( options.file, function( str ){
        if ( typeof str === 'string' ) {
          str = Wordle.Utils.trim( str );
          str = str.toUpperCase();
          var words = str.split( options.separator );
          $this.words = words;
        }
        if ( options.onLoad ) options.onLoad.call( $this, $this.words );
      }, function(e){
        console.error(e);
        if ( options.onError ) options.onError.call( $this, e );
      });
    }
    build();
  }
  
  this.Game = function( options ){
    options = options || {};
    options.rows = options.rows || 6;
    options.columns = options.columns || 5;
    options.onWin = options.onWin || function(){};
    options.onLost = options.onLost || function(){};
    options.onUpdate = options.onUpdate || function(){};
    options.onResumed = options.onResumed || function(){};
    var $this = this;
    var event = function(){
      var state = JSON.parse( JSON.stringify( $this ) );
      delete state.dictionary;
      delete state.keyboard;
      delete state.row;
      delete state.hints;
      delete state.DOM;
      return {
        won: $this.gameOver && $this.lost ? false : $this.won,
        lost: $this.gameOver && $this.won ? false : $this.lost,
        gameOver: $this.gameOver,
        guesses: $this.gameOver ? $this.row + 1 : $this.row,
        state: state
      };
    };
    this.answer = null;
    this.won = null;
    this.lost = null;
    this.gameOver = false;
    this.row = 0;
    this.dictionary = null;
    this.keyboard = null;
    this.DOM = null;
    this.STYLE = null;
    this.state = [];
    Wordle.Utils.loop( options.rows, function(){ $this.state.push([]); });
    this.hints = [];
    this.reset = function() {
      for( var r = 0; r < options.rows; r++ ) {
        this.DOM.childNodes[r].className = ' wordle-game-row';
      }
      this.DOM.childNodes[0].className += ' wordle-game-row-active';
      // TODO: reset all key classes
      // this.keyboard.DOM
      this.hints = [];
      this.state = [];
      Wordle.Utils.loop(options.rows, function(){ $this.state.push([]); });
      this.row = 0;
      this.won = null;
      this.lost = null;
      this.gameOver = false;
    }
    this.push = function( letter ) {
      if ( this.gameOver ) return;
      if ( this.state[ this.row ].length == options.columns ) return;
      this.state[ this.row ].push( letter );
      this.setDOMHints( this.row );
    }
    this.pop = function( letter ) {
      if ( this.gameOver ) return;
      if ( !this.state[ this.row ].length ) return;
      this.state[ this.row ].length--;
      this.setDOMHints( this.row );
    }
    this.getShareText = function(message){
      message = message || 'Wordle ' + ( this.row ) + '/' + options.rows;
      var share = [message, ''];
      for( var r = 0; r < this.hints.length; r++ ) {
        share.push(this.hints[r].join(''));
      }
      return share.join("\n");
    }
    this.updateAll = function(){
      for( var row = 0; typeof this.state[row] !== 'undefined' && this.state[row].join('') != ''; row++ ) {
        var hints = this.getHints( row );
        this.setDOMHints( row, hints.correct, hints.present, hints.absent );
        this.nextRow();
      }
    }
    this.setDOMHints =function( row, correct, present, absent ){
      var solve = typeof correct === 'object' && typeof present === 'object' && typeof absent === 'object';
      if (solve) {
        var hint = [null, null, null, null, null];
        for( var c = 0; c < options.columns; c++ ) {
          var _c = correct[c]?'🟩':null, 
              _p = present[c]?'🟨':null,
              _a = absent[c]?'⬛':null;
          hint[c] = _c || _p || _a;
        }
        this.hints.push( hint );
      }
      var $rows = this.DOM.getElementsByClassName('wordle-game-row');
      var $row = $rows[ row ];
      var $spots = $row.getElementsByClassName('wordle-game-spot');
      for( var c = 0; c < options.columns; c++ ) {
        if ( typeof this.state[ row ][c] === 'string' ) {
          var letter = this.state[ row ][c];
          $spots[c].setAttribute('title', letter );
          if ( solve ) {
            if ( correct[c] == letter )
              $spots[c].className += ' wordle-game-correct';
            if ( present[c] == letter )
              $spots[c].className += ' wordle-game-present';
            if ( absent[c] == letter )
              $spots[c].className += ' wordle-game-absent';
            if ( $spots[c].className == 'wordle-game-spot' ){
              var places = this.answer.split(letter).length;
              if ( places >= 3 )
                $spots[c].className += ' wordle-game-present';
              else {
                $spots[c].className += ' wordle-game-absent';
              }
            }
            if ( this.keyboard ) {
              this.keyboard.hint( correct, present, absent );
            }
          }
        } else {
          $spots[c].removeAttribute('title');
          if ( solve ) $spots[c].className = 'wordle-game-spot';
        }
      }
    }
    this.nextRow = function(){
      if ( this.gameOver ) return;
      this.row++;
      for( var r = 0; r < options.rows; r++ ) {
        this.DOM.childNodes[r].className = ' wordle-game-row';
      }
      this.DOM.childNodes[this.row].className += ' wordle-game-row-active';
    }
    this.getHints = function( row ){
      var answer = this.answer.split(''),
          attempt = this.state[ row ],
          correct = [],
          present = [],
          absent = [];
      // Get correct
      for(var c = 0; c < options.columns; c++) {
        if ( attempt[c] == answer[c] ) correct[c] = attempt[c];
      }
      // Get absent
      for(var c = 0; c < options.columns; c++) {
        absent[c] = answer.indexOf( attempt[c] ) == -1 ? attempt[c] : null;
      }
      // Get incorrect but present
      var presentCounts = {};
      for(var c = 0; c < options.columns; c++) {
        var letter = attempt[c],
            answerLetter = answer[c],
            occurrences = answer.indexOf(letter) > -1 ? answer.join('').split( letter ).length - 1 : 0;
        if ( letter == answerLetter || !occurrences ) {
          present[c] = null;
          continue;
        }
        if ( !occurrences ) continue;
        presentCounts[letter] = typeof presentCounts[letter] === 'number' ? presentCounts[letter]+1 : 1;
        var lettersCorrect = correct.join('').split( letter ).length - 1,
            presentCount = ( occurrences - presentCounts[letter] - lettersCorrect );
        if ( presentCount >= 0 ) {
          present[c] = letter;
        } else {
          present[c] = null;
          absent[c] = letter;
        }
      }
      return { correct: correct, present: present, absent: absent };
    }
    this.guess = function(){
      if ( !this.dictionary ) return console.error('Must define dictionary');
      if ( !this.answer ) return console.error('Must set answer');
      if ( this.gameOver ) return;
      if ( this.state[ this.row ].length != options.columns ) return;
      var attempt = this.state[ this.row ];
      var attemptWord = attempt.join('').toUpperCase();
      if ( attemptWord.length != options.columns ) {
        if ( word.length < options.columns ) Wordle.UI.growl( 'Word too short' );
        else if ( word.length > options.columns ) Wordle.UI.growl( 'Word too long' );
        return false;
      }
      if ( !this.dictionary.check( attemptWord ) ) {
        this.DOM.childNodes[ this.row ].className += ' shake';
        setTimeout(function(){
          $this.DOM.childNodes[ $this.row ].className = $this.DOM.childNodes[ $this.row ].className.split(' shake').join('');
        }, 1000);
        return;
      }
      var hints = this.getHints( this.row );
      this.setDOMHints( this.row, hints.correct, hints.present, hints.absent );
      if ( this.answer == attemptWord ) {
        switch( this.row + 1 ) {
          case 1 : var tries = 'one try!'; break;
          case 2 : var tries = 'two tries!'; break;
          case 3 : var tries = 'three tries!'; break;
          case 4 : var tries = 'four tries.'; break;
          case 5 : var tries = 'five tries.'; break;
          case 6 : var tries = 'six tries.'; break;
          case 7 : var tries = 'seven tries.'; break;
          case 8 : var tries = 'eight tries.'; break;
          case 9 : var tries = 'nine tries.'; break;
          case 10 : var tries = 'ten tries.'; break;
        }
        this.won = true;
        this.gameOver = true;
        options.onUpdate.call(this, event());
        Wordle.UI.growl('You won in '+tries);
        return options.onWin.call(this, event());
      }
      if ( this.row != options.rows-1 ) this.nextRow();
      if ( this.state[ options.rows-1 ].length == options.columns ) {
        this.lost = true;
        this.gameOver = true;
        options.onUpdate.call(this, event());
        options.onLost.call(this, event());
        return Wordle.UI.growl('You lost :(');
      }
      options.onUpdate.call(this, event());
    }
    this.setAnswer = function( type, answer ){
      if ( (type == Wordle.AnswerType.RANDOM || type == Wordle.AnswerType.DAILY) && !this.dictionary )
        return console.error('Must define dictionary');
      if ( this.answer ) return;
      switch( type ) {
        case Wordle.AnswerType.RANDOM :
          this.answer = this.dictionary.words[ Math.floor( Math.random() * this.dictionary.words.length ) ];
          break;
        case Wordle.AnswerType.DAILY :
          var day = Wordle.Utils.getDay();
          var daily = 0;
          if ( this.dictionary.words.length > 365 )
            daily = Math.floor( this.dictionary.words.length / 365 );
          var index = day + daily - 1;
          if ( typeof this.dictionary.words[index] !== 'string' )
            return this.setAnswer( Wordle.AnswerType.RANDOM );
          this.answer = this.dictionary.words[ index ];
          break;
        case Wordle.AnswerType.DEFINED :
          this.answer = answer.toUpperCase();
          break;
        case Wordle.AnswerType.DEFINED_BASE64 :
          var decoded = atob(answer);
          if ( decoded ) this.answer = decoded.toUpperCase();
          break;
      }
      if ( this.answer.length != options.columns ) console.error('Answer is wrong length. Needs to be' + options.columns);
    }
    this.resume = function( state ) {
      $this.state = state.state;
      $this.won = state.won;
      $this.lost = state.lost;
      $this.gameOver = state.gameOver;
      $this.answer = state.answer;
      setTimeout(function() { $this.updateAll(); }, 500);
      options.onResumed.call( $this, event() );
    }
    var buildDOM = function(){
      var $game = document.createElement('div');
      $game.className = 'wordle-game';
      for( var r = 0; r < options.rows; r++ ) {
        var $row = document.createElement('div');
        $row.className = 'wordle-game-row';
        if ( !r ) $row.className += ' wordle-game-row-active';
        for( var c = 0; c < options.columns; c++ ) {
          var $spot = document.createElement('span');
          $spot.className = 'wordle-game-spot';
          $row.appendChild( $spot );
        }
        $game.appendChild( $row );
      }
      $this.DOM = $game;
    }
    var buildStyle = function(){
      var styles = [
        '.wordle-game-row { text-align: center; white-space: nowrap; }',
        '.wordle-game-spot { padding: 15px 10px 10px 10px; border: 2px solid #3a3a3c; margin: 2px; display: inline-block; '+
          'width: 24px; height: 24px; font-size: 30px; line-height: 24px; font-weight: bold; text-align: center; }',
        '.wordle-game-spot:before { content: "\\a0"; } .wordle-game-spot[title]:before { content: attr(title); }',
        '.wordle-game-row-active .wordle-game-spot { border-color: #666; } .wordle-keyboard { text-align: center; }',
        '.wordle-keyboard span { padding: 10px 9px 6px 9px; border-radius: 5px; display: inline-block; margin: 1px; '+
          'cursor: pointer; background-color: #818384; min-width: 12px; user-select: none; transition: color 1s, border-color 1s; }',
        '.wordle-keyboard span[title="DELETE"] { color: transparent; background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d'+
          '3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTI'+
          'yIDNIN2MtLjY5IDAtMS4yMy4zNS0xLjU5Ljg4TDAgMTJsNS40MSA4LjExYy4zNi41My45Ljg5IDEuNTkuODloMTVjMS4xIDAgMi0uOSAyLTJWNWMwLTEuM'+
          'S0uOS0yLTItMnptMCAxNkg3LjA3TDIuNCAxMmw0LjY2LTdIMjJ2MTR6bS0xMS41OS0yTDE0IDEzLjQxIDE3LjU5IDE3IDE5IDE1'+
          'LjU5IDE1LjQxIDEyIDE5IDguNDEgMTcuNTkgNyAxNCAxMC41OSAxMC40MSA3IDkgOC40MSAxMi41OSAxMiA5IDE1LjU5eiI+PC9wYXRoPjwvc3ZnPg==") '+
          'scroll no-repeat center center #818384; }',
        '@keyframes wordleGrowl { 0% { opacity: 0; margin-top: 20px; } 20% { opacity: 1; margin-top: 0px; } '+
          '80% { opacity: 1; margin-top: 0px; } 100% { opacity: 0; margin-top: -20px; } }',
        '.wordle-ui-growl { width: 100%; top: 40%; position: fixed; text-align: center; opacity: 0; animation: 2.8s forwards wordleGrowl; }',
        '.wordle-ui-growl-inner { display: inline-block; background-color: white; border-radius: 7px; color: black; padding: 12px 24px; }',
        '.wordle-game-absent { background-color: #3a3a3c !important; border-color: #3a3a3c !important; color: #666; }',
        '.wordle-game-present { background-color: #b59f3b !important; border-color: #b59f3b !important; color: white; }',
        '.wordle-game-correct { background-color: #538d4e !important; border-color: #538d4e !important; color: white; }',
        '@media (max-height: 512px) { .wordle-game-row .wordle-game-spot { height: 1px; font-size: 16px; line-height: 1px; } '+
          '.wordle-game-row.wordle-game-row-active .wordle-game-spot { height: 24px; font-size: 30px; line-height: 24px; }}'
      ];
      for( var i = 0; i < options.columns; i++ )
        styles.push('.wordle-game-spot:nth-child('+(i+1)+') { transition: all 0.5s '+(0.2 * i)+'s; }');
      var $style = document.createElement('style');
      $style.innerHTML = styles.join("\n");
      $this.STYLE = $style;
    }
    buildStyle();
    buildDOM();
  }
  
  this.Keyboard = function( game ){
    var $this = this;
    var keys = ['QWERTYUIOP', 'ASDFGHJKL', '!ZXCVBNM<'];
    var vals = [].concat( keys[0].split(''), keys[1].split(''), keys[2].split('') );
    var codes = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,13,90,88,67,86,66,78,77,8];
    this.hint = function(correct, present, absent) {
      var $keys = this.DOM.getElementsByClassName('wordle-game-key')
      for(var k = 0; k < $keys.length; k++) {
        var letter = $keys[k].getAttribute('title');
        if ( !letter ) continue;
        if ( correct.indexOf(letter) > -1 )
          if ( $keys[k].className.indexOf('wordle-game-correct') === -1 )
            $keys[k].className += ' wordle-game-correct';
        if ( present.indexOf(letter) > -1 )
          if ( $keys[k].className.indexOf('wordle-game-present') === -1 )
            $keys[k].className += ' wordle-game-present';
        if ( absent.indexOf(letter) > -1 )
          if ( $keys[k].className.indexOf('wordle-game-absent') === -1 )
            $keys[k].className += ' wordle-game-absent';
      }
    }
    var build = function() {
      // DOM Key Buttons
      var $keys = document.createElement('div');
      $keys.className = 'wordle-keyboard';
      for(var r = 0; r < keys.length; r++ ) {
        var $row = document.createElement('div');
        var columns = keys[r].split('');
        for(var c = 0; c < columns.length; c++ ) {
          var $key = document.createElement('span');
          $key.className = 'wordle-game-key';
          var name = columns[c];
          if ( name == '!' ) name = 'ENTER';
          if ( name == '<' ) name = 'DELETE';
          $key.innerHTML = name;
          $key.setAttribute('title', name);
          $key.onclick = function(e){
            var key = e.currentTarget.title;
            if ( key == 'DELETE' ) return game.pop();
            if ( key == 'ENTER' ) return game.guess();
            game.push( key );
          }
          $row.appendChild($key);
        }
        $keys.appendChild($row);
      }
      $this.DOM = $keys;
      // Doc Keys
      document.onkeyup = function(e){
        if ( e.target.nodeName.toLowerCase() != 'body' ) return;
        var index = codes.indexOf(e.keyCode);
        if ( index == -1 ) return;
        var key = vals[index];
        if ( key == '<' ) return game.pop();
        if ( key == '!' ) return game.guess();
        game.push( key );
      }
      // Keyboard focus
      var focusedClass = ' wordle-keyboard-focused';
      function onBlur() {
        if ( !document.body ) return;
        document.body.className = document.body.className.split(focusedClass).join('');
      }
      function onFocus() {
        if ( !document.body ) return;
        onBlur();
        document.body.className += focusedClass;
      }
      if ( document.hasFocus() ) onFocus();
      addEventListener('focus', onFocus);
      addEventListener('blur', onBlur);
    }
    build();
  }
  
} // Wordle





/*
 * Statistics Class
 */
var Statistics = function( cookieName ) {
  cookieName = cookieName || 'stats';
  var $this = this;
  var getCurrent = function() {
    var statistics = Cookies.get( cookieName );
    if ( statistics === undefined || statistics === null || statistics === 'undefined' ) return {};
    statistics = JSON.parse(statistics);
    return statistics;
  }
  this.current = getCurrent();
  this.updateStats = function( key, stats ) {
    this.current = getCurrent();
    var statistics = this.current;
    statistics[ key ] = stats;
    this.save( statistics );
    this.current = getCurrent();
  }
  this.save = function( stats ){
    Cookies.set( cookieName, JSON.stringify( stats ), { expires: 365/*, sameSite: 'strict'*/ });
  }
  this.get = function( key, def ) {
    this.current = getCurrent();
    if ( typeof this.current[key] === 'undefined' || this.current[key] === null )
      return def;
    return this.current[key];
  }
  this.delete = function() {
    Cookies.remove( cookieName );
  }
  this.getHistory = function(){
    this.current = getCurrent();
    var i;
    var guesses = [0,0,0,0,0,0];
    for( i in this.current ) {
      var game = this.current[ i ];
      guesses[ game.guesses - 1 ]++;
    }
    var percentages = [0,0,0,0,0,0];
    var highest = -1;
    for( i in guesses ) {
      highest = Math.max( highest, guesses[ i ] );
    }
    for( i in guesses ) {
      percentages[ i ] = Math.round(( guesses[ i ] / highest ) * 100 );
    }
    return {
      guesses: guesses,
      percentages: percentages,
      highest: highest
    };
  }
  this.DOM = new function(){
    var $style, $countdown, $share;
    this.update = function( day ){
      var stats = $this.getHistory();
      var hist = $this.current;
      var current = $this.get('day' + day, null);
      // Update figures
      var $played = document.getElementById('stats-played');
      var $win = document.getElementById('stats-win-perc');
      var $currentStreak = document.getElementById('stats-current-streak');
      var $maxStreak = document.getElementById('stats-max-streak');
      var figures = {
        played: 0,
        win: 0,
        currentStreak: 0,
        maxStreak: 0
      };
      for(var key in hist) {
        var game = hist[key];
        if (!game.gameOver) continue;
        figures.played++;
        if (game.lost) figures.currentStreak = 0;
        if (game.won) {
          figures.win++;
          figures.currentStreak++;
          figures.maxStreak = Math.max(
            figures.maxStreak, figures.currentStreak
          );
        }
      }
      $played.innerHTML = figures.played;
      $win.innerHTML = !figures.played ? 0 : Math.round( figures.win / figures.played) * 100;
      $currentStreak.innerHTML = figures.currentStreak;
      $maxStreak.innerHTML = figures.maxStreak;
      // Update bars
      var $bars = document.getElementById('dist').getElementsByTagName('div');
      $style = $style || function() {
        var s = document.createElement('style');
        document.body.appendChild(s);
        return s;
      }();
      var style = [];
      for( var i = 0; i < $bars.length; i++) {
        $bars[i].setAttribute('title', stats.guesses[i]);
        var percent = stats.percentages[i];
        style.push('#dist div#bar-'+i+':after { width: '+percent+'%; }');
      }
      $style.innerHTML = style.join('');
      // Update statistics class
      var $stats = document.getElementById('statistics');
      Wordle.Utils.classList[current && current.gameOver ? 'add' : 'remove']($stats, 'game-over');
    }
    this.show = function( game ) {
      // Setup share action
      if ( !$share ) {
        $share = document.getElementById('share');
        var $output = document.getElementById('output');
        var clipboard = new ClipboardJS($share, {
          text: function(){
            return game.getShareText();
          }
        });
        clipboard.on('success', function(e) {
          $output.innerHTML = '<p>Copied results to your clipboard</p>';
        });
        clipboard.on('error', function(e) {
          var results = game.getShareText();
          $output.innerHTML = '<p>An error occured copying to your clipboard.</p>';
          $output.innerHTML += '<p>Copy from this textfield instead:</p>';
          $output.innerHTML += '<p><textarea id="textarea" rows="8">'+results+'</textarea></p>';
        });
      }
      // Countdown
      if ( !$countdown ) {
        $countdown = document.getElementById('wordle-countdown');
        Wordle.Utils.countdownUntilTomorrow.start(function(str){
          $countdown.innerHTML = str;
        });
      }
      var $stats = document.getElementById('statistics');
      Wordle.Utils.classList.add($stats, 'modal-shown');
    }
    this.hide = function() {
      var $stats = document.getElementById('statistics');
      Wordle.Utils.classList.remove($stats, 'modal-shown');
    }
  }
}

/*
 * MODALS
 */
function showStatistics( delay ) {
  if ( !delay ) return statistics.DOM.show( game );
  setTimeout(function(){
    statistics.DOM.show( game );
  }, delay );
}

function hideInstructions() {
  var $inst = document.getElementById('instructions')
  Wordle.Utils.classList.remove($inst, 'modal-shown');
}

function showInstructions() {
  var $inst = document.getElementById('instructions')
  Wordle.Utils.classList.add($inst, 'modal-shown');
}







/*
 * IMPLEMENTATION
 */

// Statistics from Cookies
var statistics = new Statistics( 'wordleStatistics' ),
    day = Wordle.Utils.getDay();

// Wordle Game Instance
var game = new Wordle.Game({
  onWin: function(){
    showStatistics( 3000 );
  },
  onUpdate: function(e) {
    statistics.updateStats( 'day' + day, e );
    statistics.DOM.update( day );
  },
  onResumed: function(){
    hideInstructions()
    statistics.DOM.update( day );
    var current = statistics.get('day' + day, null);
    if ( current && current.gameOver ) showStatistics( 2000 );
  }
});


// Set Wordle Game Disctoinary
var dictURL = 'https://raw.githubusercontent.com/charlesreid1/five-letter-words/master/sgb-words.txt';
game.dictionary = new Wordle.Dictionary({
  file: dictURL,
  separator: "\n",
  onLoad: function(w){
    game.setAnswer( Wordle.AnswerType.DAILY )
    console.log(game.answer)
  }
});

// Set Wordle Game Keyboard
game.keyboard = new Wordle.Keyboard( game );

// On DOM ready...
//    1) Add Wordle UI Elements
//    2) Resume games from Cookies
//    3) Set UX of Modals
Wordle.Utils.onReady(function(){
  // Add game DOM
  if ( game.STYLE ) (document.head || document.body).appendChild( game.STYLE );
  
  // Add game DOM
  if ( game.DOM ) document.getElementById('game').appendChild( game.DOM );
  
  // Add keyboard DOM
  if ( game.keyboard.DOM ) document.getElementById('keyboard').appendChild( game.keyboard.DOM );
  
  // Resume if state found
  var state = statistics.get( 'day' + day, {state:null} ).state;
  if ( state ) game.resume( state );
  
  // Modals
  var $modals = document.getElementsByClassName('modal');
  var closeModal = function(e){
    if ( e.target.id == 'share' ) return;
    if ( e.target.id == 'textarea' ) return;
    e.currentTarget.className = e.currentTarget.className.split('modal-shown').join('');
  }
  for( var m = 0; m < $modals.length; m++ )
    $modals[m].addEventListener('click', closeModal );
    
});