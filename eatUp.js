$(document).ready(function() {
    var btnPlay = $("#btnPlay");
    var btnReset = $("#btnReset");
    var menit = $("#menit");
    var detik = $("#detik");
    var points = $("#points");
    var size = $("#size");
    var timer, spawnSnack, counterSnack;
    var player = $("#player");
    var lapangan = $("#lapangan");
    var blueEaten = $("#blueEaten");
    var playerSize = 0;
    var userPoint = 0;
    var counter = 0;
    var eatCounter = 0;
    var finalMenit = $("#finalMenit");
    var finalDetik = $("#finalDetik");
    var finalPoints = $("#finalPoints");
    var finalSize = $("#finalSize");
    function playerGerak(event) {
      if(event.key === 'w') {
        if(parseInt(player.css("top"))-5-(playerSize/2) > -215) {
          player.css({"top": "-=5px"});
          cekPosisi();
        }
      } else if(event.key === 'a') {
        if(parseInt(player.css("left"))-5-(playerSize/2) > -215) {
          player.css({"left": "-=5px"});
          cekPosisi();
        }
      } else if(event.key === 's') {
        if(parseInt(player.css("top"))-5+(playerSize/2) < 205) {
          player.css({"top": "+=5px"});
          cekPosisi();
        }
      } else if(event.key === 'd') {
        if(parseInt(player.css("left"))-5+(playerSize/2) < 205) {
          player.css({"left": "+=5px"});
          cekPosisi();
        }
      }
    }

    btnPlay.click(function() {
        timer = setInterval(() => {
            counter++;
            if (counter >= 60) {
              counter = 0;
              let menit_int = parseInt(menit.text());
              menit_int++;
              if (menit_int < 10) {
                menit.text("0" + menit_int);
                finalMenit.text("0"+menit_int);
              } else {
                menit.text(menit_int);
                finalMenit.text(menit_int);
              }
            }
            if (counter < 10) {
              detik.text("0" + counter);
              finalDetik.text("0"+counter);
            } else {
              detik.text(counter);
              finalDetik.text(counter);
            }
          }, 1000);
          $(document).on('keydown', playerGerak);
          // $(document).keydown(function(event) {
            // if(event.key === 'w') {
            //   if(parseInt(player.css("top"))-5-(playerSize/2) > -215) {
            //     player.css({"top": "-=5px"});
            //     cekPosisi();
            //   }
            // } else if(event.key === 'a') {
            //   if(parseInt(player.css("left"))-5-(playerSize/2) > -215) {
            //     player.css({"left": "-=5px"});
            //     cekPosisi();
            //   }
            // } else if(event.key === 's') {
            //   if(parseInt(player.css("top"))-5+(playerSize/2) < 205) {
            //     player.css({"top": "+=5px"});
            //     cekPosisi();
            //   }
            // } else if(event.key === 'd') {
            //   if(parseInt(player.css("left"))-5+(playerSize/2) < 205) {
            //     player.css({"left": "+=5px"});
            //     cekPosisi();
            //   }
            // }
          // })
          counterSnack = 0;
          var redOrBlue, snackSize, snackTop, snackLeft;
          spawnSnack = setInterval(function() {
            counterSnack++;
            redOrBlue = Math.floor(Math.random() * 2);
            snackSize = getRandomNumber(10, 30);
            snackTop = getRandomNumber(190, 605); // min: 190 max: 605
            snackLeft = getRandomNumber(745, 1160); // min: 745 max: 1160
            if(redOrBlue == 0) {
              lapangan.append("<div class='rounded-circle blue' id='snack"+counterSnack+"' style='width: "+snackSize+"px; height: "+snackSize+"px; background-color: blue; position: absolute; top: "+snackTop+"px; left: "+snackLeft+"px;'></div>");
            } else if(redOrBlue == 1) {
              lapangan.append("<div class='rounded-circle red' id='snack"+counterSnack+"' style='width: "+snackSize+"px; height: "+snackSize+"px; background-color: red; position: absolute; top: "+snackTop+"px; left: "+snackLeft+"px;'></div>");
            }
          }, 3000);
    })
    btnReset.click(function() {
        clearInterval(timer);
        clearInterval(spawnSnack);
        $(document).off('keydown', playerGerak);
        for (let i = 1; i <= counterSnack; i++) {
          $("#snack"+i).remove();
        }
        playerSize = 0;
        player.css({"width": playerSize+30, "height": playerSize+30});
        player.css({"top": "0px"});
        player.css({"left": "0px"});
        menit.text("00");
        detik.text("00");
        userPoint = 0;
        points.text(userPoint);
        blueEaten.text("0");
        size.text("30");
    })

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function cekPosisi() {
      var snackInCek;
      for (let i = 1; i <= counterSnack; i++) {
        snackInCek = $("#snack"+i);
        if(parseInt(player.css("left"))+197-(playerSize/2) < parseInt(snackInCek.css("left"))-755 + snackInCek.width() && parseInt(player.css("left"))+197 + (playerSize/2)+30 > parseInt(snackInCek.css("left"))-755 && parseInt(player.css("top"))+215-(playerSize/2) < parseInt(snackInCek.css("top"))-182 + snackInCek.height() && parseInt(player.css("top"))+215 + (playerSize/2)+30 > parseInt(snackInCek.css("top"))-182) {
          snackInCek.remove();
          if(snackInCek.hasClass("blue")) {
            playerSize += 20;
            player.css({"width": playerSize+30, "height": playerSize+30});
            userPoint += snackInCek.width()*2;
            eatCounter++;
            blueEaten.text(eatCounter);
          } else if(snackInCek.hasClass("red")) {
            if(playerSize > 0) {
              playerSize -= 2;
              player.css({"width": playerSize+30, "height": playerSize+30});
            }
            userPoint -= snackInCek.width();
          }
          size.text(playerSize+30);
          points.text(userPoint);
          cekPlayerEat();
        }
      }
    }

    function cekPlayerEat() {
      if(eatCounter >= 15) {
        clearInterval(timer);
        clearInterval(spawnSnack);
        $(document).off('keydown', playerGerak);
        finalPoints.text(userPoint);
        finalSize.text(playerSize+30);
        $("#finishModal").modal('toggle');
      }
    }
})