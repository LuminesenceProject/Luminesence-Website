!function t(e,i,s){function a(r,n){if(!i[r]){if(!e[r]){var o="function"==typeof require&&require;if(!n&&o)return o(r,!0);if(h)return h(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var l=i[r]={exports:{}};e[r][0].call(l.exports,function(t){var i=e[r][1][t];return a(i||t)},l,l.exports,t,e,i,s)}return i[r].exports}for(var h="function"==typeof require&&require,r=0;r<s.length;r++)a(s[r]);return a}({1:[function(t,e,i){function s(){j.setNarrationContent(F),G=new y(5400,3900),R=new l,O.setTarget(R),O.setField(G),gameObjects.push(R),D.character=R;for(var t in S){var e=new g;e.x=S[t][0]*N,e.y=S[t][1]*N,gameObjects.push(e)}P.onclick=function(){P.parentNode.removeChild(P),I.fadeFromWhite(),j.advanceNarration()},a()}function a(){for(row in W){for(col in W[row]){if(0===W[row][col]){var t=new c;t.x=col*N,t.y=row*N,t.width=N+1,t.height=N+1,t.setColor(D.patterns.trees.data),gameObjects.push(t)}if(3===W[row][col]&&(R.x=col*N,R.y=row*N),4===W[row][col]&&((i=new m(col*N,row*N,N,N)).setTriggerData({onetime:!1,type:"magnetic"}),i.setColor(D.patterns.metal.data),gameObjects.push(i)),W[row][col]>=10&&W[row][col]<=19&&((i=new m(col*N,row*N,N,N)).setTriggerData({onetime:!1,type:"magnetic"}),i.setColor(D.patterns.metal.data),gameObjects.push(i),(s=new m(col*N,row*N,2*N,2*N)).setTriggerData({onetime:!0,type:"waypoint",value:W[row][col]-10}),s.renderLayer=3,gameObjects.push(s)),W[row][col]>=20&&W[row][col]<=29&&((e=new x(col*N,row*N,N,N)).setStateChange("disappear",W[row][col]-20),e.setColor(D.patterns.trees.data),gameObjects.push(e)),W[row][col]>=30&&W[row][col]<=39&&((e=new x(col*N,row*N,N,N)).setStateChange("appear",W[row][col]-30),e.setColor(D.patterns.trees.data),gameObjects.push(e)),W[row][col]>=40&&W[row][col]<=49&&((i=new m(col*N,row*N,N,N)).setTriggerData({onetime:!1,type:"magnetic"}),i.active=!1,i.triggerWaypoint=W[row][col]-40,i.setColor(D.patterns.metal.data),gameObjects.push(i),(e=new x(col*N,row*N,N,N)).setStateChange("disappear",W[row][col]-40),e.setColor(D.patterns.trees.data),gameObjects.push(e)),W[row][col]>=50&&W[row][col]<=59){(i=new m(col*N,row*N,N,N)).setTriggerData({onetime:!1,type:"magnetic"}),i.active=!1,i.triggerWaypoint=W[row][col]-50,i.setColor(D.patterns.metal.data),gameObjects.push(i),(s=new m(col*N,row*N,2*N,2*N)).setTriggerData({onetime:!0,type:"waypoint",value:W[row][col]-50}),s.renderLayer=3,s.triggerWaypoint=W[row][col]-50,s.active=!1,gameObjects.push(s);var e=new x(col*N,row*N,N,N);e.setStateChange("disappear",W[row][col]-50),e.setColor(D.patterns.trees.data),gameObjects.push(e)}if(99==W[row][col]){var i=new m(col*N,row*N,N,N);i.setTriggerData({onetime:!1,type:"magnetic"}),i.setColor(D.patterns.metal.data),gameObjects.push(i);var s=new m(col*N,row*N,3*N,2*N);s.setTriggerData({onetime:!0,type:"waypoint",value:4}),s.renderLayer=3,gameObjects.push(s)}}gameObjects.sort(function(t,e){return t.renderLayer<e.renderLayer?-1:t.renderLayer>e.renderLayer?1:0})}R.setCompass(k)}function h(t){if(D.ready){O.update(t),k.update(t),I.update(t);for(obj in gameObjects)gameObjects[obj].update(t)}}function r(){if(D.ready){C.clearRect(0,0,A.width,A.height),G.render(),O.render();for(obj in gameObjects)gameObjects[obj]!==R&&"enemy"!=gameObjects[obj].collisionType&&gameObjects[obj].render();for(obj in gameObjects)"enemy"==gameObjects[obj].collisionType&&gameObjects[obj].render();R.render(),k.render(),I.render(),D.renderNoise(C,.25,!0)}}var n=t(17),o=t(10),c=t(2),l=t(7),g=t(9),d=t(14),u=t(6),y=t(12),p=t(8),m=t(18),f=t(13),x=t(11),w=t(16),v=t(3),b=t(15),A=document.querySelector("#game"),C=A.getContext("2d"),T=new d,O=new u,k=new p,D=new o(C),j=new w(document.querySelector("#narration_holder")),I=new f(A.width,A.height),N=200,P=document.querySelector("#wakeup_button");window.engine=o,window.game=D,window.camera=O,window.input=T,window.ctx=C,window.gameObjects=[],D.gameObjects=gameObjects,D.totalWaypoints=5,D.narration=j,D.hud=I,D.sounds={};var W=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,13,4,4,0,0,1,1,0,0,0,4,10,4,0,0,0],[0,0,4,4,4,23,1,1,1,1,4,4,4,4,4,1,1,0],[0,0,4,4,20,20,1,1,1,1,1,1,4,4,4,0,1,0],[0,0,4,4,20,1,1,42,52,42,1,1,4,20,0,0,1,0],[0,0,1,4,23,1,1,42,42,42,42,1,1,20,32,32,32,0],[0,0,20,20,20,1,1,1,1,1,1,1,1,22,1,1,0,0],[0,0,4,20,20,1,3,1,1,1,1,1,1,22,1,1,1,0],[0,99,4,4,20,20,24,20,20,20,20,20,20,20,4,4,1,0],[0,4,4,4,4,0,1,0,1,1,1,11,4,4,4,4,1,0],[0,4,4,4,0,0,1,0,0,0,0,4,4,4,4,0,0,0],[0,1,1,1,1,1,1,1,1,0,0,4,4,4,4,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],S=[[8.5,6.5],[3.5,2.5],[4.5,11.5],[8.5,2.5],[15.5,7.5],[15.5,2.5],[8.5,9.5]],M=b([3,,.0578,,.1221,.15,,-.4372,,,,,,,,,,,1,,,,,.5]),L=b([3,,.01,,.2704,.4699,,-.6722,,,,,,,,,,,1,,,.2931,,.5]),U=b([0,.0422,.1465,.1342,.9937,.2932,.0938,.0213,.0727,.7955,.2427,-.6525,.0033,.102,.0256,.6207,.0547,.0231,.1191,-.0123,.0268,.0492,-.3791,.22]);D.sounds.shoot=new Audio,D.sounds.hit=new Audio,D.sounds.magnet=new Audio,D.sounds.magnet.loop=!0,D.sounds.shoot.src=M,D.sounds.hit.src=L,D.sounds.magnet.src=U;var G,R,Z={songData:[{i:[2,60,128,0,3,108,128,5,0,0,5,6,49,0,0,0,195,6,1,2,29,0,0,32,178,13,121,4],p:[1,1,2,2,1,1,2,2,1,1,2,2],c:[{n:[127,,127,,127,,127,,130,,130,,130,,130,,127,,127,,127,,127,,130,,130,,130,,130],f:[]},{n:[129,,129,,129,,129,,132,,132,,132,,132,,129,,129,,129,,129,,132,,132,,132,,132],f:[]}]},{i:[0,255,116,1,0,255,116,0,1,14,4,6,45,0,0,0,0,0,0,2,136,15,0,32,0,0,66,6],p:[],c:[]},{i:[3,0,128,0,3,68,128,0,1,218,4,4,40,0,0,1,55,4,1,2,67,115,124,190,67,6,39,1],p:[],c:[]},{i:[0,0,140,0,0,0,140,0,0,255,158,158,158,0,0,0,51,2,1,2,58,239,0,32,88,1,157,16],p:[1,1,1,1,1,1,1,1,1,1,1,1],c:[{n:[115],f:[]}]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]},{i:[2,100,128,0,3,201,128,0,0,0,5,6,58,0,0,0,195,6,1,2,135,0,0,32,147,6,121,6],p:[],c:[]}],rowLen:5513,patternLen:32,endPattern:13},F=["Use W,A,S,D or Arrows to move.","Life is funny isn't it?","Just when you think you’ve got it all figured out...","Just when you finally begin to plan something, get excited about something...","and feel like you know what direction you’re heading in, the paths change...","the signs change, the wind blows the other way...","North is suddenly south and east is west, and you’re...","lost","The Forest: by @streetalchemist (words from <em>Love, Rosie</em> by Cecelia Ahern)"],E=(new Date,new v);E.init(Z);var z=!1;setInterval(function(){if(!z&&(z=E.generate()>=1)){new Date;var t=E.createWave(),e=document.createElement("audio");e.src=URL.createObjectURL(new Blob([t],{type:"audio/wav"})),e.loop=!0,e.play()}},0),n.start(function(t){D.initialized||D.ready&&(D.generateNoiseFrames(A.width,A.height,.25),s(),D.initialized=!0),h(t),r()})},{10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,2:2,3:3,6:6,7:7,8:8,9:9}],2:[function(t,e,i){class s{constructor(){this.x=0,this.y=0,this.width=80,this.height=80,this.color="#ff4500",this.collisionType="static",this.renderLayer=5}update(t){}render(){engine.isOnScreen(this)&&(ctx.beginPath(),ctx.rect(this.x-camera.x,this.y-camera.y,this.width,this.height),ctx.closePath(),ctx.fillStyle=this.color,ctx.save(),ctx.translate(this.x-camera.x,this.y-camera.y),ctx.fill(),ctx.restore())}setColor(t){this.color=t}checkForStaticEntityCollisions(){for(var t={value:!1,collisions:[]},e=gameObjects.filter(function(t,e,i){return"static"===t.collisionType}),i=0;i<e.length;i++){var s=e[i];if(engine.rectIntersect(this.x,this.y,this.width,this.height,s.x,s.y,s.width,s.height)){var a={};a.value=!0,a.type="static";var h=this.x+this.width-s.x,r=s.x+s.width-this.x;Math.min(h,r)==h?a.xAmount=h:a.xAmount=-1*r;var n=this.y+this.height-s.y,o=s.y+s.height-this.y;Math.min(n,o)==n?a.yAmount=n:a.yAmount=o*=-1,t.collisions.push(a)}}return t}checkForTriggerCollisions(){for(var t={value:!1},e=gameObjects.filter(function(t,e,i){return"trigger"===t.collisionType}),i=0;i<e.length;i++){var s=e[i];engine.rectIntersect(this.x,this.y,this.width,this.height,s.x,s.y,s.width,s.height)&&1==s.active&&(t.value=!0,t.type="trigger",t.other=s)}return t}checkForBulletCollisions(){var t={value:!1,collisions:[]},e=gameObjects.filter(function(t,e,i){return"bullet"===t.collisionType});for(var i in e){var s=e[i];engine.rectIntersect(this.x,this.y,this.width,this.height,s.x,s.y,s.width,s.height)&&t.collisions.push(s)}return t}checkForEnemyCollisions(){var t={value:!1,collisions:[]},e=gameObjects.filter(function(t,e,i){return"enemy"===t.collisionType});for(var i in e){var s=e[i];engine.rectIntersect(this.x,this.y,this.width,this.height,s.x,s.y,s.width,s.height)&&t.collisions.push(s)}return t}}e.exports=s},{}],3:[function(t,e,i){"use strict";e.exports=function(){var t,e,i,s,a,h=function(t){return Math.sin(6.283184*t)},r=function(t){return.003959503758*Math.pow(2,(t-128)/12)},n=function(t,e,i){var s,a,h,n,c,l,g,d=o[t.i[0]],u=t.i[1],y=t.i[3],p=o[t.i[4]],m=t.i[5],f=t.i[8],x=t.i[9],w=t.i[10]*t.i[10]*4,v=t.i[11]*t.i[11]*4,b=t.i[12]*t.i[12]*4,A=1/b,C=t.i[13],T=i*Math.pow(2,2-t.i[14]),O=new Int32Array(w+v+b),k=0,D=0;for(s=0,a=0;s<w+v+b;s++,a++)a>=0&&(a-=T,l=r(e+(15&(C=C>>8|(255&C)<<4))+t.i[2]-128),g=r(e+(15&C)+t.i[6]-128)*(1+8e-4*t.i[7])),h=1,s<w?h=s/w:s>=w+v&&(h-=(s-w-v)*A),n=l,y&&(n*=h*h),c=d(k+=n)*u,n=g,f&&(n*=h*h),c+=p(D+=n)*m,x&&(c+=(2*Math.random()-1)*x),O[s]=80*c*h|0;return O},o=[h,function(t){return t%1<.5?1:-1},function(t){return t%1*2-1},function(t){var e=t%1*4;return e<2?e-1:3-e}];this.init=function(h){t=h,e=h.endPattern-2,i=0,s=h.rowLen*h.patternLen*(e+1)*2,a=new Int32Array(s)},this.generate=function(){var r,c,l,g,d,u,y,p,m,f,x,w,v,b,A=new Int32Array(s),C=t.songData[i],T=t.rowLen,O=t.patternLen,k=0,D=0,j=!1,I=[];for(l=0;l<=e;++l)for(y=C.p[l],g=0;g<O;++g){var N=y?C.c[y-1].f[g]:0;N&&(C.i[N-1]=C.c[y-1].f[g+O]||0,N<16&&(I=[]));var P=o[C.i[15]],W=C.i[16]/512,S=Math.pow(2,C.i[17]-9)/T,M=C.i[18],L=C.i[19],U=43.23529*C.i[20]*3.141592/44100,G=1-C.i[21]/255,R=1e-5*C.i[22],Z=C.i[23]/32,F=C.i[24]/512,E=6.283184*Math.pow(2,C.i[25]-9)/T,z=C.i[26]/255,Q=C.i[27]*T;for(x=(l*O+g)*T,d=0;d<4;++d)if(u=y?C.c[y-1].n[g+d*O]:0){I[u]||(I[u]=n(C,u,T));var Y=I[u];for(c=0,r=2*x;c<Y.length;c++,r+=2)A[r]+=Y[c]}for(c=0;c<T;c++)(f=A[p=2*(x+c)])||j?(w=U,M&&(w*=P(S*p)*W+.5),D+=(w=1.5*Math.sin(w))*(v=G*(f-D)-(k+=w*D)),f=3==L?D:1==L?v:k,R&&(f=(f*=R)<1?f>-1?h(.25*f):-1:1,f/=R),j=(f*=Z)*f>1e-5,b=f*(1-(m=Math.sin(E*p)*F+.5)),f*=m):b=0,p>=Q&&(b+=A[p-Q+1]*z,f+=A[p-Q]*z),A[p]=0|b,A[p+1]=0|f,a[p]+=0|b,a[p+1]+=0|f}return++i/8},this.createWave=function(){var t=44+2*s-8,e=t-36,i=new Uint8Array(44+2*s);i.set([82,73,70,70,255&t,t>>8&255,t>>16&255,t>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,255&e,e>>8&255,e>>16&255,e>>24&255]);for(var h=0,r=44;h<s;++h){var n=a[h];n=n<-32767?-32767:n>32767?32767:n,i[r++]=255&n,i[r++]=n>>8&255}return i},this.getData=function(t,e){for(var i=2*Math.floor(44100*t),s=new Array(e),h=0;h<2*e;h+=1){var r=i+h;s[h]=t>0&&r<a.length?a[r]/32768:0}return s}}},{}],4:[function(t,e,i){e.exports=t(2)},{2:2}],5:[function(t,e,i){var s=t(2);class a extends s{constructor(){super(),this.x=0,this.y=0,this.xVel=0,this.yVel=0,this.width=5,this.height=5,this.color="#ffffff",this.speed=400,this.collisionType="bullet",this.bulletType=""}setPosition(t,e){this.x=t,this.y=e}setVelocity(t,e){this.xVel=t,this.yVel=e}update(t){this.x+=this.xVel*t,this.y+=this.yVel*t,engine.isOnScreen(this)||this.kill()}render(){ctx.beginPath(),ctx.rect(this.x-camera.x,this.y-camera.y,this.width,this.height),ctx.closePath(),ctx.fillStyle=this.color,ctx.fill()}kill(){var t=gameObjects.indexOf(this);gameObjects.splice(t,1)}}e.exports=a},{2:2}],6:[function(t,e,i){class s{constructor(){this.x=0,this.y=0,this.width=800,this.height=450,this.pocket={x:275,y:100,width:250,height:250,color:"#cccccc"}}setTarget(t){this.target=t}setField(t){this.field=t}update(t){this.target.x+this.target.width>this.x+this.pocket.x+this.pocket.width&&(this.x=this.target.x+this.target.width-this.pocket.x-this.pocket.width),this.target.x<this.x+this.pocket.x&&(this.x=this.target.x-this.pocket.x),this.target.y<this.y+this.pocket.y&&(this.y=this.target.y-this.pocket.y),this.target.y+this.target.height>this.y+this.pocket.y+this.pocket.height&&(this.y=this.target.y+this.target.height-this.pocket.y-this.pocket.height),this.x<this.field.x&&(this.x=this.field.x),this.x+this.width>this.field.x+this.field.width&&(this.x=this.field.x+this.field.width-this.width),this.y<this.field.y&&(this.y=this.field.y),this.y+this.height>this.field.y+this.field.height&&(this.y=this.field.y+this.field.height-this.height)}render(){}}e.exports=s},{}],7:[function(t,e,i){var s=t(4);t(5);class a extends s{constructor(){super(),this.x=0,this.y=0,this.alive=!0,this.health=3,this.width=40,this.height=40,this.color="#ffffff",this.colorAlive="#ffffff",this.hitColor="#960f0f",this.speed=400,this.collisionType="player",this.onMagnetic=!1,this.shootingInterval=.2,this.shootingCooldown=0,this.bulletOffset=20,this.bulletSpeed=600,this.init=!1,this.trailUpdate=0,this.invuln=!1,this.invulnTimer=0,this.invulnTime=.25,this.lastPositions=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]}setCompass(t){this.compass=t,this.waypoints=gameObjects.filter(function(t,e,i){return"trigger"===t.collisionType&&"waypoint"===t.triggerData.type}),this.compass.setTarget(this,this.getCurrentWaypoint())}getCurrentWaypoint(){for(var t in this.waypoints)if(this.waypoints[t].triggerData.value==game.currentWaypoint)return this.waypoints[t]}kill(){this.alive=!1}update(t){if(this.alive){this.color=this.colorAlive,this.init||(this.compass.setTarget(this,this.getCurrentWaypoint()),this.init=!0),this.shootingCooldown-=t,this.onMagnetic=!1,input.D||input.RIGHT?this.x+=this.speed*t:(input.A||input.LEFT)&&(this.x-=this.speed*t),input.W||input.UP?this.y-=this.speed*t:(input.S||input.DOWN)&&(this.y+=this.speed*t),this.x+this.width>camera.x+camera.width?this.x=camera.x+camera.width-this.width:this.x<camera.x&&(this.x=camera.x),this.y+this.height>camera.y+camera.height?this.y=camera.y+camera.height-this.height:this.y<camera.y&&(this.y=camera.y);var e=super.checkForStaticEntityCollisions();for(var i in e.collisions)!0===e.collisions[i].value&&"static"===e.collisions[i].type&&(Math.abs(e.collisions[i].xAmount)>Math.abs(e.collisions[i].yAmount)?this.y-=e.collisions[i].yAmount:this.x-=e.collisions[i].xAmount);var s=super.checkForTriggerCollisions();if(!0===s.value&&"trigger"===s.type){var a=s.other;switch(a.triggerData.type){case"waypoint":game.setCurrentWaypoint(game.currentWaypoint+1),this.compass.setTarget(this,this.getCurrentWaypoint());break;case"magnetic":this.onMagnetic=!0}1==a.triggerData.onetime&&a.kill()}if(this.onMagnetic?(this.compass.isConfused=!0,game.sounds.magnet.play()):(this.compass.isConfused=!1,game.sounds.magnet.pause()),this.invuln)this.color=this.hitColor,this.invulnTimer+=t,this.invulnTimer>this.invulnTime&&(this.invuln=!1);else{var h=super.checkForBulletCollisions();if(h.collisions.length>0)for(var r in h.collisions){var n=h.collisions[r];"enemy"==n.bulletType&&(n.kill(),this.health--,this.invuln=!0,game.sounds.hit.play(),this.invulnTimer=0)}else{var o=super.checkForEnemyCollisions();if(o.collisions.length>0)for(var c in o.collisions){o.collisions[c];this.health--,this.invuln=!0,game.sounds.hit.play(),this.invulnTimer=0}}}this.health<=0&&(game.hud.fadeToDead(),this.kill())}this.trailUpdate%2==0&&(this.lastPositions.unshift({x:this.x,y:this.y}),this.lastPositions.pop()),++this.trailUpdate>100&&(this.trailUpdate=0)}render(){if(this.alive){var t=1;this.invuln&&(t=.5,ctx.globalAlpha=t),ctx.beginPath(),ctx.arc(this.x-camera.x+this.width/2,this.y-camera.y+this.height/2,this.width/2,0,2*Math.PI,!0),ctx.closePath(),ctx.fillStyle=this.color,ctx.fill();for(var e=this.lastPositions.length-1;e>=0;e--)if(0!=e){var i=.1*(this.lastPositions.length-e)*t;ctx.beginPath(),ctx.arc(this.lastPositions[e].x-camera.x+this.width/2+(4*Math.random()-2),this.lastPositions[e].y-camera.y+this.height/2+(4*Math.random()-2),this.width/2*(this.lastPositions.length-e)*.1,0,2*Math.PI,!0),ctx.closePath(),ctx.fillStyle=this.color,ctx.globalAlpha=i,ctx.fill()}ctx.globalAlpha=1}}}e.exports=a},{4:4,5:5}],8:[function(t,e,i){class s{constructor(){this.color="#ffffff",this.canvas=document.createElement("canvas"),this.canvas.width=150,this.canvas.height=150,this.ctx=this.canvas.getContext("2d"),this.currentAngle,this.angleDeg=0,this.isConfused=!1,this.confusedSpeed=200,this.target=null}setTarget(t,e){this.holder=t,this.target=e}update(t){null!=this.target&&(this.isConfused?this.angleDeg=this.currentAngle+this.confusedSpeed*t:this.angleDeg=180*Math.atan2(this.target.y+this.target.height/2-(this.holder.y+this.holder.height/2),this.target.x+this.target.width/2-this.holder.x+this.holder.height/2)/Math.PI,this.currentAngle=this.angleDeg)}render(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.isConfused&&(this.ctx.globalAlpha=.2),this.ctx.beginPath(),this.ctx.arc(75,75,50,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.lineWidth=5,this.ctx.strokeStyle=this.color,this.ctx.fillStyle=game.patterns.compassGradient,this.ctx.fill(),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(75,35),this.ctx.lineTo(85,50),this.ctx.lineTo(65,50),this.ctx.fillStyle=this.color,this.ctx.fill(),engine.drawRotatedImage(ctx,this.canvas,80,370,this.angleDeg+90),this.ctx.globalAlpha=1}}e.exports=s},{}],9:[function(t,e,i){var s=t(4),a=t(5);class h extends s{constructor(){super(),this.x=0,this.y=0,this.width=40,this.height=40,this.radiusActivate=200,this.radiusDeactivate=350,this.colorActive="#ff0000",this.colorInactive="#000000",this.hitColor="#a442f4",this.active=!1,this.color="#000000",this.speed=75,this.health=2,this.collisionType="enemy",this.shootingInterval=.8,this.shootingCooldown=0,this.bulletOffset=20,this.bulletSpeed=600,this.currentlyHit=!1,this.radarPulseTime=3,this.radarPulseDistance=200,this.radarPulseTimer=0}shoot(t){if(this.shootingCooldown<0){this.shootingCooldown=this.shootingInterval;var e=new a;switch(e.bulletType="enemy",t){case"up":e.setPosition(this.x+this.width/2,this.y-this.bulletOffset),e.setVelocity(0,-this.bulletSpeed);break;case"down":e.setPosition(this.x+this.width/2,this.y+this.height+this.bulletOffset),e.setVelocity(0,this.bulletSpeed);break;case"left":e.setPosition(this.x-this.bulletOffset,this.y+this.height/2),e.setVelocity(-this.bulletSpeed,0);break;case"right":e.setPosition(this.x+this.width+this.bulletOffset,this.y+this.height/2),e.setVelocity(this.bulletSpeed,0)}gameObjects.push(e),game.sounds.shoot.play()}}kill(){var t=gameObjects.indexOf(this);gameObjects.splice(t,1)}update(t){this.shootingCooldown-=t,this.radarPulseTimer+=t,this.radarPulseTimer>this.radarPulseTime&&(this.radarPulseTimer=0),this.active?engine.radiusDetect(game.character.x+game.character.width/2,game.character.y+game.character.height/2,this.x+this.width/2,this.y+this.height/2,this.radiusDeactivate)||(this.active=!1):engine.radiusDetect(game.character.x+game.character.width/2,game.character.y+game.character.height/2,this.x+this.width/2,this.y+this.height/2,this.radiusActivate)&&(this.active=!0),this.active?this.color=this.colorActive:this.color=this.colorInactive,this.active&&(this.radarPulseTimer=0,Math.abs(game.character.x-this.x)>Math.abs(game.character.y-this.y)?game.character.x>this.x?this.shoot("right"):game.character.x<this.x&&this.shoot("left"):game.character.y<this.y?this.shoot("up"):game.character.y>this.y&&this.shoot("down"),game.character.x>this.x?this.x+=this.speed*t:game.character.x<this.x&&(this.x-=this.speed*t),game.character.y<this.y?this.y-=this.speed*t:game.character.y>this.y&&(this.y+=this.speed*t));var e=super.checkForStaticEntityCollisions();e.collisions.length;for(var i in e.collisions)!0===e.collisions[i].value&&"static"===e.collisions[i].type&&(Math.abs(e.collisions[i].xAmount)>Math.abs(e.collisions[i].yAmount)?this.y-=e.collisions[i].yAmount:this.x-=e.collisions[i].xAmount);this.currentlyHit=!1;var s=super.checkForBulletCollisions();if(s.collisions.length>0)for(var a in s.collisions){var h=s.collisions[a];"character"==h.bulletType&&(h.kill(),this.health--,this.currentlyHit=!0,this.color=this.hitColor)}this.health<=0&&this.kill()}render(){var t=this.radarPulseTimer/this.radarPulseTime,e=1-t;this.active||(ctx.beginPath(),ctx.arc(this.x-camera.x+this.width/2,this.y-camera.y+this.height/2,this.radarPulseDistance*t,0*Math.PI,2*Math.PI),ctx.closePath(),ctx.fillStyle="rgba(255, 0, 0, "+e+")",ctx.fill()),ctx.beginPath(),ctx.arc(this.x-camera.x+this.width/2,this.y-camera.y+this.height/2,this.width/2,0,2*Math.PI,!0),ctx.closePath(),ctx.fillStyle=this.color,ctx.fill()}}e.exports=h},{4:4,5:5}],10:[function(t,e,i){var s=t(11),a=t(18);class h{constructor(t){this.currentWaypoint=0,this.onMagnetic=!1,this.context=t,this.initialized=!1,this.noiseCanvas=null,this.noiseCanvasA0=null,this.noiseCanvasA1=null,this.imagesToLoad={trees:!1,metal:!1},this.noiseFrameIndex=0,this.noiseFramesNum=10,this.noiseFrames=[],this.ready=!1;var e=this;this.patterns={},this.patterns.metal=new Image,this.patterns.metal.onload=function(){e.imagesToLoad.metal=!0,e.checkIfLoaded()},this.patterns.metal.src="data:image/gif;base64,R0lGODlhMgAyAIAAAAAAADMzMyH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEFGQ0U1Qzk4ODYwMTFFN0EyNDY5NzA0MDlGQjUwQjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEFGQ0U1Q0E4ODYwMTFFN0EyNDY5NzA0MDlGQjUwQjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QUZDRTVDNzg4NjAxMUU3QTI0Njk3MDQwOUZCNTBCOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUZDRTVDODg4NjAxMUU3QTI0Njk3MDQwOUZCNTBCOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAyADIAAAJljI+py+0Po5y02uuA3hyoDn4gh5Xmiabqio5k4m7iyNb2jedVrM2uT9MJh8TijeeB8YAvo/MJHSKZHWozis1qj0tlzJrcisdkxNT7QwfL7Lb7bO7G1+66HQc/5A37u/+f0yfoUgAAOw==",this.patterns.trees=new Image,this.patterns.trees.onload=function(){e.imagesToLoad.trees=!0,e.checkIfLoaded()},this.patterns.trees.src="data:image/gif;base64,R0lGODlhMgAyAIAAAAAAADMzMyH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEFGQ0U1QzU4ODYwMTFFN0EyNDY5NzA0MDlGQjUwQjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEFGQ0U1QzY4ODYwMTFFN0EyNDY5NzA0MDlGQjUwQjgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QUZDRTVDMzg4NjAxMUU3QTI0Njk3MDQwOUZCNTBCOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QUZDRTVDNDg4NjAxMUU3QTI0Njk3MDQwOUZCNTBCOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAyADIAAAK0jI8Gyc3rYgJU2kDhbbnu131T54kYqX1oZq6lSJpILJ90i8pueu3wzosAg5whcTRUuXCrn2+T7BmlUaHxBbpar9gDl7UFUsWSb5kb1hbN2W/QDfbC47Y5tMuszfBOvfyoBHgnKGjjp8BnuHWo2AZIVwOJeIPEmBZiqUeZyYTJ6ZTzObgkelZV6vCEerm5+kfm+nq6ChcrS2pbN4ta6zpXqPkL/CmZu2ZMhWxRrPzXvPh8bFkAADs=",this.patterns.compassGradient=t.createRadialGradient(75,75,100,75,75,0),this.patterns.compassGradient.addColorStop(0,"#333333"),this.patterns.compassGradient.addColorStop(1,"#cccccc")}static rectIntersect(t,e,i,s,a,h,r,n){return!(a>t+i||a+r<t||h>e+s||h+n<e)}static radiusDetect(t,e,i,s,a){return Math.sqrt((i-t)*(i-t)+(s-e)*(s-e))<a}static drawRotatedImage(t,e,i,s,a){var h=Math.PI/180;t.save(),t.translate(i,s),t.rotate(a*h),t.drawImage(e,-e.width/2,-e.height/2,e.width,e.height),t.restore()}static isOnScreen(t){return engine.rectIntersect(t.x,t.y,t.width,t.height,camera.x,camera.y,camera.width,camera.height)}restart(){location.reload()}generateNoiseFrames(t,e,i){for(var s=0;s<this.noiseFramesNum;s++){var a=document.createElement("canvas");a.width=t,a.height=e;var h=a.getContext("2d");h.clearRect(0,0,t,e);for(var r=h.getImageData(0,0,t,e),n=r.data,o=0,c=n.length;o<c;o+=4){var l=Math.round(255*Math.random());n[o]=n[o+1]=n[o+2]=l,n[o+3]=255*i}h.putImageData(r,0,0),this.noiseFrames.push(a)}}renderNoise(t,e,i){t.globalAlpha=e,i?(++this.noiseFrameIndex==this.noiseFramesNum&&(this.noiseFrameIndex=0),t.drawImage(this.noiseFrames[this.noiseFrameIndex],0,0)):t.drawImage(this.noiseFrames[0],0,0),t.globalAlpha=1}checkIfLoaded(){1==this.imagesToLoad.trees&&1==this.imagesToLoad.metal&&(this.patterns.metal.data=this.context.createPattern(this.patterns.metal,"repeat"),this.patterns.trees.data=this.context.createPattern(this.patterns.trees,"repeat"),this.ready=!0)}setCurrentWaypoint(t){if(this.currentWaypoint=t,this.narration.advanceNarration(),t==this.totalWaypoints)return game.hud.fadeToWhite(),void setTimeout(function(){game.narration.advanceNarration()},5e3);var e=this.gameObjects.filter(function(e,i,a){return e instanceof s&&e.triggerWaypoint===t});for(var i in e)switch(e[i].stateChangeType){case"disappear":e[i].kill();break;case"appear":e[i].setVisible(!0)}var h=this.gameObjects.filter(function(e,i,s){return e instanceof a&&e.triggerWaypoint===t});for(var r in h)h[r].active=!0}}e.exports=h},{11:11,18:18}],11:[function(t,e,i){var s=t(2);class a extends s{constructor(t,e,i,s){super(),this.x=t,this.y=e,this.width=i,this.height=s,this.color="#000045",this.stateChangeType="",this.triggerWaypoint=0,this.visible=!0,this.renderLayer=4}update(t){}setStateChange(t,e){this.stateChangeType=t,this.triggerWaypoint=e,"appear"==t&&this.setVisible(!1)}setVisible(t){t?(this.visible=!0,this.collisionType="static"):(this.visible=!1,this.collisionType="none")}render(){this.visible&&engine.isOnScreen(this)&&(ctx.beginPath(),ctx.rect(this.x-camera.x,this.y-camera.y,this.width,this.height),ctx.closePath(),ctx.fillStyle=this.color,ctx.save(),ctx.translate(this.x-camera.x,this.y-camera.y),ctx.fill(),ctx.restore())}kill(){var t=gameObjects.indexOf(this);gameObjects.splice(t,1)}}e.exports=a},{2:2}],12:[function(t,e,i){class s{constructor(t,e){this.x=0,this.y=0,this.width=t,this.height=e,this.color="#333333"}render(){ctx.beginPath(),ctx.rect(this.x-camera.x,this.y-camera.y,this.width,this.height),ctx.closePath(),ctx.fillStyle=this.color,ctx.fill()}}e.exports=s},{}],13:[function(t,e,i){class s{constructor(t,e){this.width=t,this.height=e,this.overlayOpacity=1,this.fadingToWhite=!1,this.fadingFromWhite=!1,this.fadingToDead=!1,this.dead=!1,this.fadeSpeed=3}update(t){this.fadingToWhite&&(this.overlayOpacity<1?this.overlayOpacity+=1/this.fadeSpeed*t:this.fadingToWhite=!1),this.fadingFromWhite&&(this.overlayOpacity>0?this.overlayOpacity-=1/this.fadeSpeed*t:(this.fadingFromWhite=!1,this.fadeSpeed=3,game.narration.advanceNarration(),setTimeout(function(){game.narration.advanceNarration()},4e3))),this.fadingToDead&&(this.overlayOpacity<1?this.overlayOpacity+=1/this.fadeSpeed*t:(this.fadingToDead=!1,game.restart()))}fadeToWhite(){this.fadingToWhite=!0}fadeFromWhite(){this.fadeSpeed=4,this.fadingFromWhite=!0}fadeToDead(){this.fadingToDead=!0,this.dead=!0}render(){this.dead?ctx.fillStyle="rgba(255,0,0,"+this.overlayOpacity+")":ctx.fillStyle="rgba(255,255,255,"+this.overlayOpacity+")",ctx.beginPath(),ctx.rect(0,0,this.width,this.height),ctx.closePath(),ctx.fill()}}e.exports=s},{}],14:[function(t,e,i){class s{constructor(){this.UP=!1,this.RIGHT=!1,this.DOWN=!1,this.LEFT=!1,this.W=!1,this.A=!1,this.S=!1,this.D=!1;var t=this;this.keyDown=function(e){e.preventDefault(),"38"==(e=e||window.event).keyCode?t.UP=!0:"40"==e.keyCode?t.DOWN=!0:"37"==e.keyCode?t.LEFT=!0:"39"==e.keyCode?t.RIGHT=!0:"87"==e.keyCode?t.W=!0:"65"==e.keyCode?t.A=!0:"83"==e.keyCode?t.S=!0:"68"==e.keyCode&&(t.D=!0)},this.keyUp=function(e){e.preventDefault(),"38"==(e=e||window.event).keyCode?t.UP=!1:"40"==e.keyCode?t.DOWN=!1:"37"==e.keyCode?t.LEFT=!1:"39"==e.keyCode?t.RIGHT=!1:"87"==e.keyCode?t.W=!1:"65"==e.keyCode?t.A=!1:"83"==e.keyCode?t.S=!1:"68"==e.keyCode&&(t.D=!1)},document.onkeydown=this.keyDown,document.onkeyup=this.keyUp}}e.exports=s},{}],15:[function(t,e,i){function s(){this.setSettings=function(t){for(var e=0;e<24;e++)this[String.fromCharCode(97+e)]=t[e]||0;this.c<.01&&(this.c=.01);var i=this.b+this.c+this.e;if(i<.18){var s=.18/i;this.b*=s,this.c*=s,this.e*=s}}}var a=new function(){this._params=new s;var t,e,i,a,h,r,n,o,c,l,g,d;this.reset=function(){var t=this._params;a=100/(t.f*t.f+.001),h=100/(t.g*t.g+.001),r=1-t.h*t.h*t.h*.01,n=-t.i*t.i*t.i*1e-6,t.a||(g=.5-t.n/2,d=5e-5*-t.o),o=1+t.l*t.l*(t.l>0?-.9:10),c=0,l=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},this.totalReset=function(){this.reset();var s=this._params;return t=s.b*s.b*1e5,e=s.c*s.c*1e5,i=s.e*s.e*1e5+12,3*((t+e+i)/3|0)},this.synthWave=function(s,u){var y=this._params,p=1!=y.s||y.v,m=y.v*y.v*.1,f=1+3e-4*y.w,x=y.s*y.s*y.s*.1,w=1+1e-4*y.t,v=1!=y.s,b=y.x*y.x,A=y.g,C=y.q||y.r,T=y.r*y.r*y.r*.2,O=y.q*y.q*(y.q<0?-1020:1020),k=y.p?32+((1-y.p)*(1-y.p)*2e4|0):0,D=y.d,j=y.j/2,I=y.k*y.k*.01,N=y.a,P=t,W=1/t,S=1/e,M=1/i,L=5/(1+y.u*y.u*20)*(.01+x);L>.8&&(L=.8),L=1-L;for(var U,G,R,Z,F,E,z=!1,Q=0,Y=0,H=0,J=0,V=0,B=0,X=0,q=0,K=0,_=0,$=new Array(1024),tt=new Array(32),et=$.length;et--;)$[et]=0;for(et=tt.length;et--;)tt[et]=2*Math.random()-1;for(et=0;et<u;et++){if(z)return et;if(k&&++K>=k&&(K=0,this.reset()),l&&++c>=l&&(l=0,a*=o),r+=n,(a*=r)>h&&(a=h,A>0&&(z=!0)),G=a,j>0&&(_+=I,G*=1+Math.sin(_)*j),(G|=0)<8&&(G=8),N||((g+=d)<0?g=0:g>.5&&(g=.5)),++Y>P)switch(Y=0,++Q){case 1:P=e;break;case 2:P=i}switch(Q){case 0:H=Y*W;break;case 1:H=1+2*(1-Y*S)*D;break;case 2:H=1-Y*M;break;case 3:H=0,z=!0}C&&((R=0|(O+=T))<0?R=-R:R>1023&&(R=1023)),p&&f&&((m*=f)<1e-5?m=1e-5:m>.1&&(m=.1)),E=0;for(var it=8;it--;){if(++X>=G&&(X%=G,3==N))for(var st=tt.length;st--;)tt[st]=2*Math.random()-1;switch(N){case 0:F=X/G<g?.5:-.5;break;case 1:F=1-X/G*2;break;case 2:F=.225*(((F=1.27323954*(Z=6.28318531*((Z=X/G)>.5?Z-1:Z))+.405284735*Z*Z*(Z<0?1:-1))<0?-1:1)*F*F-F)+F;break;case 3:F=tt[Math.abs(32*X/G|0)]}p&&(U=B,(x*=w)<0?x=0:x>.1&&(x=.1),v?(V+=(F-B)*x,V*=L):(B=F,V=0),J+=(B+=V)-U,F=J*=1-m),C&&($[q%1024]=F,F+=$[(q-R+1024)%1024],q++),E+=F}E*=.125*H*b,s[et]=E>=1?32767:E<=-1?-32768:32767*E|0}return u}};e.exports=function(t){a._params.setSettings(t);var e=a.totalReset(),i=new Uint8Array(4*((e+1)/2|0)+44),s=2*a.synthWave(new Uint16Array(i.buffer,44),e),h=new Uint32Array(i.buffer,0,44);h[0]=1179011410,h[1]=s+36,h[2]=1163280727,h[3]=544501094,h[4]=16,h[5]=65537,h[6]=44100,h[7]=88200,h[8]=1048578,h[9]=1635017060,h[10]=s,s+=44;for(var r=0,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="data:audio/wav;base64,";r<s;r+=3){var c=i[r]<<16|i[r+1]<<8|i[r+2];o+=n[c>>18]+n[c>>12&63]+n[c>>6&63]+n[63&c]}return o}},{}],16:[function(t,e,i){class s{constructor(t){this.narrationHolder=t,this.currentNarration=-1,this.currentShownNarration=null}setNarrationContent(t){this.content=t}advanceNarration(t=-1){if(-1!=t){s=this;setTimeout(function(){s.advanceNarration()},t)}if(this.currentNarration++,this.content[this.currentNarration]){this.removeCurrentNarration();var e=this.content[this.currentNarration],i=document.createElement("p");i.classList.add("narration-set"),i.innerHTML=e;var s=this;setTimeout(function(){s.animateInNarration(i)},500),this.narrationHolder.appendChild(i),this.currentShownNarration=i}}animateInNarration(t){t.classList.add("active")}removeCurrentNarration(){if(this.currentShownNarration){this.currentShownNarration.classList.remove("active"),this.currentShownNarration.classList.add("inactive");var t=this,e=this.currentShownNarration;setTimeout(function(){t.narrationHolder.removeChild(e)},500)}}}e.exports=s},{}],17:[function(t,e,i){function s(t){return window.requestAnimationFrame(function(){var e=Date.now(),i=e-a;i>999?i=1/60:i/=1e3,a=e,t(i)})}var a=0;e.exports={start:function(t){return s(function e(i){t(i),s(e)})},stop:function(t){window.cancelAnimationFrame(t)}}},{}],18:[function(t,e,i){var s=t(2);class a extends s{constructor(t,e,i,s){super(),this.x=t,this.y=e,this.width=i,this.height=s,this.color="#5daf46",this.collisionType="trigger",this.renderLayer=2,this.active=!0,this.triggerWaypoint=-1}setTriggerData(t){this.triggerData=t}update(t){}render(){engine.isOnScreen(this)&&"waypoint"!=this.triggerData.type&&(ctx.beginPath(),ctx.rect(this.x-camera.x,this.y-camera.y,this.width,this.height),ctx.closePath(),ctx.fillStyle=this.color,ctx.save(),ctx.translate(this.x-camera.x,this.y-camera.y),ctx.fill(),ctx.restore())}kill(){var t=gameObjects.indexOf(this);gameObjects.splice(t,1)}}e.exports=a},{2:2}]},{},[1]);