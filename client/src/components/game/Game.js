import React, { useEffect } from "react";
import "../../App.css";
import * as PIXI from "pixi.js";
import { default as PIXI_SOUND } from "pixi-sound";

function Game() {

  let app;
  let keys = {};
  let speed = 8;
  let ticker_count = 0;
  let foschan_ticker = 0;
  let isEnd = false;
  var windowHeight = window.screen.height;
  var windowWidth = window.screen.width;
  var appHeight;
  var appWidth;
  var playTime = 1;

  var cheatMode = false;

  var songDict = [
    {
      name: "POWER SPOT",
      path: "sounds/POWER_SPOT!!.ogg",
      time: 237,
      rank: 20,
    },
    {
      name: "MIRACLE WAVE",
      path: "sounds/MIRACLE_WAVE.ogg",
      time: 252,
      rank: 18,
    },
    {
      name: "VIVID WORLD",
      path: "sounds/VIVID WORLD (short ver.).mp3",
      time: 98,
      rank: 15,
    },
    {
      name: "START DASH",
      path: "sounds/Start-Dash!!.ogg",
      time: 257,
      rank: 13,
    },
    {
      name: "ANGELIC ANGEL",
      path: "sounds/Angelic_Angel.mp3",
      time: 109,
      rank: 7,
    },
    {
      name: "PURE PHRASE",
      path: "sounds/09._PURE_PHRASE.ogg",
      time: 310,
      rank: 4,
    },
  ];

  let titleScreen;
  let songSelectScreen;
  let playScreen;
  let resultScreen;

  let comboText;
  let scoreText;
  let playing_accuracyText;
  let hitTextS;
  let hitTextD;
  let hitTextK;
  let hitTextL;

  let foschan1;
  let foschan2;

  let textureSButton;
  let textureDButton;
  let textureKButton;
  let textureLButton;
  let texture_pressedSButton;
  let texture_pressedDButton;
  let texture_pressedKButton;
  let texture_pressedLButton;
  let SButton;
  let DButton;
  let KButton;
  let LButton;
  let noteS;
  let noteD;
  let noteK;
  let noteL;

  let noteS_start;
  let noteS_sign;
  let noteS_body;
  let noteS_end;
  let noteS_sign_end;
  let noteD_start;
  let noteD_sign;
  let noteD_body;
  let noteD_end;
  let noteD_sign_end;
  let noteK_start;
  let noteK_sign;
  let noteK_body;
  let noteK_end;
  let noteK_sign_end;
  let noteL_start;
  let noteL_sign;
  let noteL_body;
  let noteL_end;
  let noteL_sign_end;
  let noteType = [0, 0, 0, 0];
  let noteAvailiable = [false, false, false, false];
  let performanceGraph;
  let perfromanceGraphProp = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  let combo = 0;
  let score = 0;
  let maxCombo = 0;
  let note_num = 0;
  let performancePlay = [];
  let perfectTap = 0;
  let goodTap = 0;
  let badTap = 0;
  let missTap = 0;
  let accuracy = 0;
  let accuracy_score = 0;
  let candleArray = [];

  let rainbowGradient = [
    "#b00b0b",
    "#cf601d",
    "#eef30a",
    "#0c7e39",
    "#1ea2b0",
    "#0404bd",
    "#6f136c",
  ];

  let top_layer;
  let ground_layer;

  if (windowHeight >= 1000 && windowWidth >= 500) {
    appHeight = 800;
    appWidth = 400;
  } else if (windowHeight >= 1000 && windowWidth < 500) {
    appHeight = windowWidth * 1.6;
    appWidth = windowWidth * 0.8;
  } else if (windowHeight < 1000 && windowWidth >= 500) {
    appHeight = windowHeight * 0.8;
    appWidth = windowHeight * 0.4;
  } else {
    appHeight = windowHeight * 0.8;
    appWidth = windowWidth * 0.8;
  }

  var appX = windowWidth / 2 - appWidth / 2;
  var appY = windowHeight / 2 - appHeight / 2;

  perfromanceGraphProp.x = appX + appWidth * 0.2;
  perfromanceGraphProp.y = appY + appHeight * 0.5;
  perfromanceGraphProp.width = appWidth * 0.7;
  perfromanceGraphProp.height = appHeight * 0.2;
  useEffect(() => {
    app = new PIXI.Application({
      // width: appWidth,
      // height: appHeight,
      resizeTo: window,
      backgroundColor: 0xffffff,
    });
    document.body.appendChild(app.view);

    let background = new PIXI.Graphics();
    background.beginFill(0xaaaaaa);
    background.drawRect(appX, appY, appWidth, appHeight);
    app.stage.addChild(background);

    titleScreen = new PIXI.Container();
    songSelectScreen = new PIXI.Container();
    playScreen = new PIXI.Container();
    resultScreen = new PIXI.Container();

    app.stage.addChild(titleScreen);
    app.stage.addChild(songSelectScreen);
    app.stage.addChild(playScreen);
    app.stage.addChild(resultScreen);

    titleScreen.visible = true;
    songSelectScreen.visible = false;
    playScreen.visible = false;
    resultScreen.visible = false;

    let ticker_fos = new PIXI.Ticker();
    ticker_fos.autoStart = true;
    ticker_fos.add(foschanLoop);

    let ticker = new PIXI.Ticker();
    ticker.autoStart = false;
    ticker.add(gameLoop);

    //title screen
    let titleText = new PIXI.Text("Pianoforte");
    titleText.anchor.set(0.5);
    titleText.x = appX + appWidth * 0.5;
    titleText.y = appY + appHeight * 0.15;
    titleScreen.addChild(titleText);

    foschan1 = new PIXI.Sprite.from("images/foschan1.png");
    foschan1.width = appWidth * 0.6;
    foschan1.height = appHeight * 0.5;
    foschan1.anchor.set(0.5);
    foschan1.x = appX + appWidth * 0.5;
    foschan1.y = appY + appHeight * 0.5;
    titleScreen.addChild(foschan1);

    foschan2 = new PIXI.Sprite.from("./images/foschan2.png");
    foschan2.width = appWidth * 0.6;
    foschan2.height = appHeight * 0.5;
    foschan2.anchor.set(0.5);
    foschan2.x = appX + appWidth * 0.5;
    foschan2.y = appY + appHeight * 0.5;
    titleScreen.addChild(foschan2);
    foschan2.visible = false;

    let startButton = new PIXI.Sprite.from("images/button.png");
    startButton.width = appWidth * 0.3;
    startButton.height = appHeight * 0.1;
    startButton.anchor.set(0.5);
    startButton.x = appX + appWidth * 0.5;
    startButton.y = appY + appHeight * 0.85;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerdown", function () {
      titleScreen.visible = false;
      songSelectScreen.visible = true;
    });
    titleScreen.addChild(startButton);

    //song select screen
    let songSelectText = new PIXI.Text("Select song");
    songSelectText.anchor.set(0.5);
    songSelectText.x = appX + appWidth * 0.25;
    songSelectText.y = appY + appHeight * 0.05;
    songSelectScreen.addChild(songSelectText);

    let songContainer = new PIXI.Container();
    songSelectScreen.addChild(songContainer);

    for (let i in songDict) {
      let songButton = new PIXI.Container();
      songSelectScreen.addChild(songButton);
      let songButtonBG = new PIXI.Graphics();
      if (songDict[i].rank >= 15) songButtonBG.beginFill(0xda0000);
      else if (songDict[i].rank >= 10) songButtonBG.beginFill(0xff5733);
      else if (songDict[i].rank >= 5) songButtonBG.beginFill(0xffc300);
      else songButtonBG.beginFill(0x006d33);
      songButtonBG.drawRect(
        appX,
        appY + appHeight * 0.075 + i * 0.05 * appHeight,
        appWidth,
        appHeight * 0.05
      );
      songButton.addChild(songButtonBG);
      let songName = new PIXI.Text(songDict[i].name);
      songName.anchor.set(0.5);
      songName.x = appX + appWidth * 0.4;
      songName.y = appY + appHeight * 0.1 + i * 0.05 * appHeight;
      songButton.addChild(songName);
      let songDifficult = new PIXI.Text(songDict[i].rank);
      songDifficult.anchor.set(0.5);
      songDifficult.x = appX + appWidth * 0.9;
      songDifficult.y = appY + appHeight * 0.1 + i * 0.05 * appHeight;
      songButton.addChild(songDifficult);
      songButton.interactive = true;
      songButton.buttonMode = true;
      songButton.on("pointerdown", function () {
        songSelectScreen.visible = false;
        playScreen.visible = true;
        scoreText.text = "0";
        comboText.text = "0 combos";
        playing_accuracyText.text = "0%";
        speed = songDict[i].rank;
        let startTime = new Date().getTime();
        let timeDistance = songDict[i] * 1000;
        accuracy_score = 0;
        score = 0;
        combo = 0;
        maxCombo = 0;
        ticker_count = 0;
        note_num = 0;
        perfectTap = 0;
        goodTap = 0;
        badTap = 0;
        missTap = 0;
        playTime--;
        performancePlay = [];
        while(candleArray.length > 0) {
          resultScreen.removeChild(candleArray[0]);
          candleArray.shift();
        }
        ticker.start();
        //song
        let song = new PIXI_SOUND.sound.Sound.from({
          url: songDict[i].path,
          autoPlay: true,
          volume: 0.1,
          complete: function () {
            isEnd = true;
            setTimeout(function () {
              if (combo === note_num) perfectText.visible = true;
              ticker.stop();
            }, 5000);
            setTimeout(function () {
              isEnd = false;
              songText.text = songDict[i].name;

              if (accuracy === 100) gradeText.text = "SSS";
              else if (accuracy >= 98) gradeText.text = "SS";
              else if (accuracy >= 95) gradeText.text = "S";
              else if (accuracy >= 90) gradeText.text = "A";
              else if (accuracy >= 80) gradeText.text = "B";
              else if (accuracy >= 70) gradeText.text = "C";
              else if (accuracy >= 50) gradeText.text = "D";
              else gradeText.text = "F";
              accuracyText.text = "accuracy " + accuracy + "%";
              maxComboText.text = "Max Combo : " + maxCombo + "combo";
              resultScoreText.text = "score : " + score;
              perfectTapText.text = perfectTap + " perfect";
              goodTapText.text = goodTap + " good";
              badTapText.text = badTap + " bad";
              missTapText.text = missTap + " miss";
              perfectText.visible = false;
              playScreen.visible = false;
              resultScreen.visible = true;
              let graphX = perfromanceGraphProp.x;
              let graphY = perfromanceGraphProp.y;
              let graphWidth = perfromanceGraphProp.width;
              let graphHeight = perfromanceGraphProp.height;
              for (let i in performancePlay) {
                let candle = new PIXI.Graphics();
                if (i != 0 && performancePlay[i] < performancePlay[i - 1])
                  candle.beginFill(0xdc143c);
                else candle.beginFill(0x1ca700);
                let drawX = graphX + ((i + 1) / note_num / 10) * graphWidth;
                let drawY =
                  graphY + ((3 - performancePlay[i]) / 4) * graphHeight;
                candle.drawRect(
                  drawX,
                  drawY,
                  graphWidth / note_num,
                  graphHeight / 4
                );
                resultScreen.addChild(candle);
                candleArray.push(candle);
              }
            }, 8000);
          },
        });
      });
    }

    //play screen
    textureSButton = PIXI.Texture.from("images/S.png");
    textureDButton = PIXI.Texture.from("images/D.png");
    textureKButton = PIXI.Texture.from("images/K.png");
    textureLButton = PIXI.Texture.from("images/L.png");

    texture_pressedSButton = PIXI.Texture.from("images/S_pressed.png");
    texture_pressedDButton = PIXI.Texture.from("images/D_pressed.png");
    texture_pressedKButton = PIXI.Texture.from("images/K_pressed.png");
    texture_pressedLButton = PIXI.Texture.from("images/L_pressed.png");

    SButton = new PIXI.Sprite(textureSButton);
    SButton.width = appWidth * 0.25;
    SButton.height = appHeight * 0.15;
    SButton.anchor.set(0.5);
    SButton.x = appX + appWidth * 0.125;
    SButton.y = appY + appHeight * 0.925;
    SButton.interactive = true;
    SButton.buttonMode = true;
    SButton.on("pointerdown", function () {
      keys["83"] = true;
    });
    SButton.on("pointerup", function () {
      keys["83"] = false;
    });
    SButton.on("pointerout", function () {
      keys["83"] = false;
    });
    playScreen.addChild(SButton);

    DButton = new PIXI.Sprite(textureDButton);
    DButton.width = appWidth * 0.25;
    DButton.height = appHeight * 0.15;
    DButton.anchor.set(0.5);
    DButton.x = appX + appWidth * 0.375;
    DButton.y = appY + appHeight * 0.925;
    DButton.interactive = true;
    DButton.buttonMode = true;
    DButton.on("pointerdown", function () {
      keys["68"] = true;
    });
    DButton.on("pointerup", function () {
      keys["68"] = false;
    });
    DButton.on("pointerout", function () {
      keys["68"] = false;
    });
    playScreen.addChild(DButton);

    KButton = new PIXI.Sprite(textureKButton);
    KButton.width = appWidth * 0.25;
    KButton.height = appHeight * 0.15;
    KButton.anchor.set(0.5);
    KButton.x = appX + appWidth * 0.625;
    KButton.y = appY + appHeight * 0.925;
    KButton.interactive = true;
    KButton.buttonMode = true;
    KButton.on("pointerdown", function () {
      keys["75"] = true;
    });
    KButton.on("pointerup", function () {
      keys["75"] = false;
    });
    KButton.on("pointerout", function () {
      keys["75"] = false;
    });
    playScreen.addChild(KButton);

    LButton = new PIXI.Sprite(textureLButton);
    LButton.width = appWidth * 0.25;
    LButton.height = appHeight * 0.15;
    LButton.anchor.set(0.5);
    LButton.x = appX + appWidth * 0.875;
    LButton.y = appY + appHeight * 0.925;
    LButton.interactive = true;
    LButton.buttonMode = true;
    LButton.on("pointerdown", function () {
      keys["76"] = true;
    });
    LButton.on("pointerup", function () {
      keys["76"] = false;
    });
    LButton.on("pointerout", function () {
      keys["76"] = false;
    });
    playScreen.addChild(LButton);

    scoreText = new PIXI.Text("0");
    scoreText.anchor.set(0.5);
    scoreText.x = appX + appWidth * 0.5;
    scoreText.y = appY + appHeight * 0.2;
    playScreen.addChild(scoreText);

    comboText = new PIXI.Text("0 combos");
    comboText.anchor.set(0.5);
    comboText.x = appX + appWidth * 0.5;
    comboText.y = appY + appHeight * 0.25;
    playScreen.addChild(comboText);

    playing_accuracyText = new PIXI.Text("0%");
    playing_accuracyText.x = appX + appWidth * 0.75;
    playing_accuracyText.y = appY + appHeight * 0.05;
    playScreen.addChild(playing_accuracyText);

    hitTextS = new PIXI.Text();
    hitTextS.anchor.set(0.5);
    hitTextS.x = appX + appWidth * 0.125;
    hitTextS.y = appY + appHeight * 0.55;
    playScreen.addChild(hitTextS);

    hitTextD = new PIXI.Text();
    hitTextD.anchor.set(0.5);
    hitTextD.x = appX + appWidth * 0.375;
    hitTextD.y = appY + appHeight * 0.55;
    playScreen.addChild(hitTextD);

    hitTextK = new PIXI.Text();
    hitTextK.anchor.set(0.5);
    hitTextK.x = appX + appWidth * 0.625;
    hitTextK.y = appY + appHeight * 0.55;
    playScreen.addChild(hitTextK);

    hitTextL = new PIXI.Text();
    hitTextL.anchor.set(0.5);
    hitTextL.x = appX + appWidth * 0.875;
    hitTextL.y = appY + appHeight * 0.55;
    playScreen.addChild(hitTextL);

    let perfectText = new PIXI.Text("PERFECT COMBO!!!");
    perfectText.anchor.set(0.5);
    perfectText.x = appX + appWidth * 0.5;
    perfectText.y = appY + appHeight * 0.3;
    perfectText.style.fontSize = 30;
    playScreen.addChild(perfectText);

    hitTextS.visible = false;
    hitTextD.visible = false;
    hitTextK.visible = false;
    hitTextL.visible = false;
    perfectText.visible = false;

    //result screen

    let songText = new PIXI.Text("untiltled");
    songText.fontWeight = "bold";
    songText.x = appX + appWidth * 0.1;
    songText.y = appY + appHeight * 0.05;
    resultScreen.addChild(songText);

    let accuracyText = new PIXI.Text("accuracy 0%");
    accuracyText.x = appX + appWidth * 0.1;
    accuracyText.y = appY + appHeight * 0.1;
    resultScreen.addChild(accuracyText);

    let gradeTextStyle = new PIXI.TextStyle({
      fill: rainbowGradient,
      fillGradientType: 1,
      fontFamily: "Comic Sans MS",
      fontSize: 50,
      fontWeight: "bold",
    });
    let gradeText = new PIXI.Text("F", gradeTextStyle);
    gradeText.anchor.set(0.5);
    gradeText.x = appX + appWidth * 0.8;
    gradeText.y = appY + appHeight * 0.1;
    resultScreen.addChild(gradeText);

    let maxComboText = new PIXI.Text("0 combos");
    maxComboText.anchor.set(0.5);
    maxComboText.x = appX + appWidth * 0.5;
    maxComboText.y = appY + appHeight * 0.25;
    resultScreen.addChild(maxComboText);

    let resultScoreText = new PIXI.Text(score);
    resultScoreText.anchor.set(0.5);
    resultScoreText.x = appX + appWidth * 0.5;
    resultScoreText.y = appY + appHeight * 0.2;
    resultScreen.addChild(resultScoreText);

    let perfectTapText = new PIXI.Text("perfect");
    perfectTapText.x = appX + appWidth * 0.1;
    perfectTapText.y = appY + appHeight * 0.3;
    resultScreen.addChild(perfectTapText);

    let goodTapText = new PIXI.Text("good");
    goodTapText.x = appX + appWidth * 0.6;
    goodTapText.y = appY + appHeight * 0.3;
    resultScreen.addChild(goodTapText);

    let badTapText = new PIXI.Text("bad");
    badTapText.x = appX + appWidth * 0.1;
    badTapText.y = appY + appHeight * 0.35;
    resultScreen.addChild(badTapText);

    let missTapText = new PIXI.Text("miss");
    missTapText.x = appX + appWidth * 0.6;
    missTapText.y = appY + appHeight * 0.35;
    resultScreen.addChild(missTapText);

    let permormanceText = new PIXI.Text("Performance Graph");
    permormanceText.x = appX + appWidth * 0.1;
    permormanceText.y = perfromanceGraphProp.y - appHeight * 0.1;
    resultScreen.addChild(permormanceText);

    performanceGraph = new PIXI.Graphics();
    performanceGraph.beginFill(0xffffff);
    performanceGraph.drawRect(
      perfromanceGraphProp.x,
      perfromanceGraphProp.y,
      perfromanceGraphProp.width,
      perfromanceGraphProp.height
    );
    resultScreen.addChild(performanceGraph);

    let perfectPText = new PIXI.Text("PERFECT");
    perfectPText.anchor.set(0.5);
    perfectPText.x = appX + appWidth * 0.1;
    perfectPText.y = perfromanceGraphProp.y + perfromanceGraphProp.height / 5;
    perfectPText.style.fontSize = 8;
    resultScreen.addChild(perfectPText);

    let goodText = new PIXI.Text("GOOD");
    goodText.anchor.set(0.5);
    goodText.x = appX + appWidth * 0.1;
    goodText.y = perfromanceGraphProp.y + (perfromanceGraphProp.height * 2) / 5;
    goodText.style.fontSize = 8;
    resultScreen.addChild(goodText);

    let badText = new PIXI.Text("BAD");
    badText.anchor.set(0.5);
    badText.x = appX + appWidth * 0.1;
    badText.y = perfromanceGraphProp.y + (perfromanceGraphProp.height * 3) / 5;
    badText.style.fontSize = 8;
    resultScreen.addChild(badText);

    let missText = new PIXI.Text("MISS");
    missText.anchor.set(0.5);
    missText.x = appX + appWidth * 0.1;
    missText.y = perfromanceGraphProp.y + (perfromanceGraphProp.height * 4) / 5;
    missText.style.fontSize = 8;
    resultScreen.addChild(missText);

    let restartButton = new PIXI.Sprite.from("images/button.png");
    restartButton.width = appWidth * 0.3;
    restartButton.height = appHeight * 0.1;
    restartButton.anchor.set(0.5);
    restartButton.x = appX + appWidth * 0.5;
    restartButton.y = appY + appHeight * 0.9;
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.on("pointerdown", function () {
      resultScreen.visible = false;
      titleScreen.visible = true;
      if (playTime <= 0) startButton.enable = false;
    });
    resultScreen.addChild(restartButton);

    //invisible layer
    top_layer = new PIXI.Graphics();
    top_layer.beginFill(0xffffff);
    top_layer.drawRect(0, 0, windowWidth, appY);
    playScreen.addChild(top_layer);

    ground_layer = new PIXI.Graphics();
    ground_layer.beginFill(0xffffff);
    ground_layer.drawRect(
      0,
      appY + appHeight,
      windowWidth,
      windowHeight - appY - appHeight
    );
    playScreen.addChild(ground_layer);

    for (let i = 1; i <= 3; i++) {
      let seperater = new PIXI.Graphics();
      seperater.beginFill(0xc70039);
      seperater.drawRect(appX + appWidth * 0.25 * i, appY, 1, appHeight);
      playScreen.addChild(seperater);
    }

    //keyboard event handler
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    window.addEventListener("beforeunload", function (event) {
      console.log("destroy by unload");
      app.destroy(true);
    });

  }, []);


  function keysDown(e) {
    keys[e.keyCode] = true;
  }

  function keysUp(e) {
    keys[e.keyCode] = false;
  }

  function foschanLoop() {
    if (titleScreen.visible) {
      foschan_ticker += 1;
      if (foschan_ticker % 50 === 0) {
        if (foschan1.visible) {
          foschan1.visible = false;
          foschan2.visible = true;
        } else if (foschan2.visible) {
          foschan1.visible = true;
          foschan2.visible = false;
        }
      }
    }
  }

  function gameLoop() {
    ticker_count += 1;
    //generate note
    if (
      ticker_count % Math.floor(100 / speed) === 0 &&
      ticker_count > 500 &&
      !isEnd
    ) {
      let rand = Math.floor(Math.random() * Math.floor(4));
      let type_rand = Math.floor(Math.random() * Math.floor(10));
      if (type_rand >= 1) {
        if (rand === 0 && noteType[0] === 0) {
          noteS = new PIXI.Graphics();
          noteS.beginFill(0xc70039);
          noteS.drawCircle(
            appX + appWidth * 0.125,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );
          playScreen.addChild(noteS);
          noteType[0] = 1;
        } else if (rand === 1 && noteType[1] === 0) {
          noteD = new PIXI.Graphics();
          noteD.beginFill(0xc70039);
          noteD.drawCircle(
            appX + appWidth * 0.375,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );
          playScreen.addChild(noteD);
          noteType[1] = 1;
        } else if (rand === 2 && noteType[2] === 0) {
          noteK = new PIXI.Graphics();
          noteK.beginFill(0xc70039);
          noteK.drawCircle(
            appX + appWidth * 0.625,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );
          playScreen.addChild(noteK);
          noteType[2] = 1;
        } else if (rand === 3 && noteType[3] === 0) {
          noteL = new PIXI.Graphics();
          noteL.beginFill(0xc70039);
          noteL.drawCircle(
            appX + appWidth * 0.875,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );
          playScreen.addChild(noteL);
          noteType[3] = 1;
        }
      } else {
        if (rand === 0 && noteType[0] === 0) {
          let long_rand = Math.floor(Math.random() * Math.floor(3)) + 2;
          noteS = new PIXI.Container();

          noteS_start = new PIXI.Graphics();
          noteS_start.beginFill(0x016e31);
          noteS_start.drawCircle(
            appX + appWidth * 0.125,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );

          noteS_body = new PIXI.Graphics();
          noteS_body.beginFill(0x016e31);
          noteS_body.drawRect(
            appX,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.25,
            appHeight * 0.1 * long_rand
          );

          noteS_sign = new PIXI.Graphics();
          noteS_sign.beginFill(0xaaaaaa);
          noteS_sign.drawCircle(
            appX + appWidth * 0.125,
            appY + appHeight * -0.125,
            appWidth * 0.1
          );

          noteS_end = new PIXI.Graphics();
          noteS_end.beginFill(0x016e31);
          noteS_end.drawCircle(
            appX + appWidth * 0.125,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.125
          );

          noteS_sign_end = new PIXI.Graphics();
          noteS_sign_end.beginFill(0xaaaaaa);
          noteS_sign_end.drawCircle(
            appX + appWidth * 0.125,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.1
          );

          noteS.addChild(noteS_body);
          noteS.addChild(noteS_start);
          noteS.addChild(noteS_sign);
          noteS.addChild(noteS_end);
          noteS.addChild(noteS_sign_end);
          playScreen.addChild(noteS);
          noteType[0] = 2;
          noteAvailiable[0] = true;
        } else if (rand === 1 && noteType[1] === 0) {
          let long_rand = Math.floor(Math.random() * Math.floor(3)) + 2;
          noteD = new PIXI.Container();

          noteD_start = new PIXI.Graphics();
          noteD_start.beginFill(0x016e31);
          noteD_start.drawCircle(
            appX + appWidth * 0.375,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );

          noteD_body = new PIXI.Graphics();
          noteD_body.beginFill(0x016e31);
          noteD_body.drawRect(
            appX + appWidth * 0.25,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.25,
            appHeight * 0.1 * long_rand
          );

          noteD_sign = new PIXI.Graphics();
          noteD_sign.beginFill(0xaaaaaa);
          noteD_sign.drawCircle(
            appX + appWidth * 0.375,
            appY + appHeight * -0.125,
            appWidth * 0.1
          );

          noteD_end = new PIXI.Graphics();
          noteD_end.beginFill(0x016e31);
          noteD_end.drawCircle(
            appX + appWidth * 0.375,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.125
          );

          noteD_sign_end = new PIXI.Graphics();
          noteD_sign_end.beginFill(0xaaaaaa);
          noteD_sign_end.drawCircle(
            appX + appWidth * 0.375,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.1
          );

          noteD.addChild(noteD_body);
          noteD.addChild(noteD_start);
          noteD.addChild(noteD_sign);
          noteD.addChild(noteD_end);
          noteD.addChild(noteD_sign_end);
          playScreen.addChild(noteD);
          noteType[1] = 2;
          noteAvailiable[1] = true;
        } else if (rand === 2 && noteType[2] === 0) {
          let long_rand = Math.floor(Math.random() * Math.floor(3)) + 2;
          noteK = new PIXI.Container();

          noteK_start = new PIXI.Graphics();
          noteK_start.beginFill(0x016e31);
          noteK_start.drawCircle(
            appX + appWidth * 0.625,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );

          noteK_body = new PIXI.Graphics();
          noteK_body.beginFill(0x016e31);
          noteK_body.drawRect(
            appX + appWidth * 0.5,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.25,
            appHeight * 0.1 * long_rand
          );

          noteK_sign = new PIXI.Graphics();
          noteK_sign.beginFill(0xaaaaaa);
          noteK_sign.drawCircle(
            appX + appWidth * 0.625,
            appY + appHeight * -0.125,
            appWidth * 0.1
          );

          noteK_end = new PIXI.Graphics();
          noteK_end.beginFill(0x016e31);
          noteK_end.drawCircle(
            appX + appWidth * 0.625,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.125
          );

          noteK_sign_end = new PIXI.Graphics();
          noteK_sign_end.beginFill(0xaaaaaa);
          noteK_sign_end.drawCircle(
            appX + appWidth * 0.625,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.1
          );

          noteK.addChild(noteK_body);
          noteK.addChild(noteK_start);
          noteK.addChild(noteK_sign);
          noteK.addChild(noteK_end);
          noteK.addChild(noteK_sign_end);
          playScreen.addChild(noteK);
          noteType[2] = 2;
          noteAvailiable[2] = true;
        } else if (rand === 3 && noteType[3] === 0) {
          let long_rand = Math.floor(Math.random() * Math.floor(3)) + 2;
          noteL = new PIXI.Container();

          noteL_start = new PIXI.Graphics();
          noteL_start.beginFill(0x016e31);
          noteL_start.drawCircle(
            appX + appWidth * 0.875,
            appY + appHeight * -0.125,
            appWidth * 0.125
          );

          noteL_body = new PIXI.Graphics();
          noteL_body.beginFill(0x016e31);
          noteL_body.drawRect(
            appX + appWidth * 0.75,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.25,
            appHeight * 0.1 * long_rand
          );

          noteL_sign = new PIXI.Graphics();
          noteL_sign.beginFill(0xaaaaaa);
          noteL_sign.drawCircle(
            appX + appWidth * 0.875,
            appY + appHeight * -0.125,
            appWidth * 0.1
          );

          noteL_end = new PIXI.Graphics();
          noteL_end.beginFill(0x016e31);
          noteL_end.drawCircle(
            appX + appWidth * 0.875,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.125
          );

          noteL_sign_end = new PIXI.Graphics();
          noteL_sign_end.beginFill(0xaaaaaa);
          noteL_sign_end.drawCircle(
            appX + appWidth * 0.875,
            appY + appHeight * -0.125 - appHeight * 0.1 * long_rand,
            appWidth * 0.1
          );

          noteL.addChild(noteL_body);
          noteL.addChild(noteL_start);
          noteL.addChild(noteL_sign);
          noteL.addChild(noteL_end);
          noteL.addChild(noteL_sign_end);
          playScreen.addChild(noteL);
          noteType[3] = 2;
          noteAvailiable[3] = true;
        }
      }
      bringToFront(scoreText);
      bringToFront(comboText);
      bringToFront(playing_accuracyText);
      bringToFront(top_layer);
      bringToFront(ground_layer);
    }

    //move note
    for (let i = 0; i < 4; i++) {
      if (noteType[i] === 0 && cheatMode) {
        if (i === 0) keys["83"] = false;
        else if (i === 1) keys["68"] = false;
        else if (i === 2) keys["75"] = false;
        else if (i === 3) keys["76"] = false;
      } else if (noteType[i] === 1) {
        if (i === 0) {
          if (cheatMode && isPerfect(SButton, noteS)) {
            keys["83"] = true;
          }
          if (noteS.y < appY + appHeight)
            noteS.y += Math.ceil(speed * (appHeight / 800));
          else {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteS);
            noteType[0] = 0;
            miss(hitTextS);
          }
        } else if (i === 1) {
          if (cheatMode && isPerfect(DButton, noteD)) {
            keys["68"] = true;
          }
          if (noteD.y < appY + appHeight)
            noteD.y += Math.ceil(speed * (appHeight / 800));
          else {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteD);
            noteType[1] = 0;
            miss(hitTextD);
          }
        } else if (i === 2) {
          if (cheatMode && isPerfect(KButton, noteK)) {
            keys["75"] = true;
          }
          if (noteK.y < appY + appHeight)
            noteK.y += Math.ceil(speed * (appHeight / 800));
          else {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteK);
            noteType[2] = 0;
            miss(hitTextK);
          }
        } else if (i === 3) {
          if (cheatMode && isPerfect(LButton, noteL)) {
            keys["76"] = true;
          }
          if (noteL.y < appY + appHeight)
            noteL.y += Math.ceil(speed * (appHeight / 800));
          else {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteL);
            noteType[3] = 0;
            miss(hitTextL);
          }
        }
      } else if (noteType[i] === 2) {
        if (i === 0) {
          if (cheatMode && isPerfect(SButton, noteS_start)) {
            keys["83"] = true;
          } else if (cheatMode && isPerfect(SButton, noteS_end)) {
            keys["83"] = false;
          } else if (
            cheatMode &&
            isIntersect(SButton, noteS_body) &&
            !isPerfect(SButton, noteS_end)
          ) {
            keys["83"] = true;
          }
          if (
            (noteS.y > appY + appHeight && noteAvailiable[i] === true) ||
            (noteS.y > appY + appHeight + noteS.height &&
              noteAvailiable[i] === false)
          ) {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteS);
            noteType[0] = 0;
            miss(hitTextS);
          } else {
            noteS.y += Math.ceil(speed * (appHeight / 800));
          }
        } else if (i === 1) {
          if (cheatMode && isPerfect(DButton, noteD_start)) {
            keys["68"] = true;
          } else if (cheatMode && isPerfect(DButton, noteD_end)) {
            keys["68"] = false;
          } else if (
            cheatMode &&
            isIntersect(DButton, noteD_body) &&
            !isPerfect(DButton, noteD_end)
          ) {
            keys["68"] = true;
          }

          if (
            (noteD.y > appY + appHeight && noteAvailiable[i] === true) ||
            (noteD.y > appY + appHeight + noteD.height &&
              noteAvailiable[i] === false)
          ) {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteD);
            noteType[1] = 0;
            miss(hitTextD);
          } else {
            noteD.y += Math.ceil(speed * (appHeight / 800));
          }
        } else if (i === 2) {
          if (cheatMode && isPerfect(KButton, noteK_start)) {
            keys["75"] = true;
          } else if (cheatMode && isPerfect(KButton, noteK_end)) {
            keys["75"] = false;
          } else if (
            cheatMode &&
            isIntersect(KButton, noteK_body) &&
            !isPerfect(KButton, noteK_end)
          ) {
            keys["75"] = true;
          }
          if (
            (noteK.y > appY + appHeight && noteAvailiable[i] === true) ||
            (noteK.y > appY + appHeight + noteK.height &&
              noteAvailiable[i] === false)
          ) {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteK);
            noteType[2] = 0;
            miss(hitTextK);
          } else {
            noteK.y += Math.ceil(speed * (appHeight / 800));
          }
        } else if (i === 3) {
          if (cheatMode && isPerfect(LButton, noteL_start)) {
            keys["76"] = true;
          } else if (cheatMode && isPerfect(LButton, noteL_end)) {
            keys["76"] = false;
          } else if (
            cheatMode &&
            isIntersect(LButton, noteL_body) &&
            !isPerfect(LButton, noteL_end)
          ) {
            keys["76"] = true;
          }
          if (
            (noteL.y > appY + appHeight && noteAvailiable[i] === true) ||
            (noteL.y > appY + appHeight + noteL.height &&
              noteAvailiable[i] === false)
          ) {
            combo = 0;
            comboText.text = combo + " combos";
            playScreen.removeChild(noteL);
            noteType[3] = 0;
            miss(hitTextL);
          } else {
            noteL.y += Math.ceil(speed * (appHeight / 800));
          }
        }
      }
    }

    //pressing or unpressing check
    if (keys["83"]) {
      SButton.texture = texture_pressedSButton;
      isScore(0, SButton, noteS, noteS_start, hitTextS);
    }
    if (keys["68"]) {
      DButton.texture = texture_pressedDButton;
      isScore(1, DButton, noteD, noteD_start, hitTextD);
    }
    if (keys["75"]) {
      KButton.texture = texture_pressedKButton;
      isScore(2, KButton, noteK, noteK_start, hitTextK);
    }
    if (keys["76"]) {
      LButton.texture = texture_pressedLButton;
      isScore(3, LButton, noteL, noteL_start, hitTextL);
    }
    if (!keys["83"]) {
      SButton.texture = textureSButton;
      isReleaseScore(0, SButton, noteS, noteS_end, hitTextS);
    }
    if (!keys["68"]) {
      DButton.texture = textureDButton;
      isReleaseScore(1, DButton, noteD, noteD_end, hitTextD);
    }
    if (!keys["75"]) {
      KButton.texture = textureKButton;
      isReleaseScore(2, KButton, noteK, noteK_end, hitTextK);
    }
    if (!keys["76"]) {
      LButton.texture = textureLButton;
      isReleaseScore(3, LButton, noteL, noteL_end, hitTextL);
    }

    tickHitOrMiss(hitTextS);
    tickHitOrMiss(hitTextD);
    tickHitOrMiss(hitTextK);
    tickHitOrMiss(hitTextL);
  }

  function isScore(channel, button, note, note_start, text) {
    if (noteType[channel] === 1 && isPerfect(button, note)) {
      combo += 1;
      if (combo > maxCombo) maxCombo = combo;
      score += 300 + combo * 5;
      comboText.text = combo + " combos";
      scoreText.text = score.toString();
      playScreen.removeChild(note);
      noteType[channel] = 0;
      perfect(text);
    } else if (noteType[channel] === 1 && isIntersect(button, note)) {
      combo += 1;
      if (combo > maxCombo) maxCombo = combo;
      score += 250 + combo * 5;
      comboText.text = combo + " combos";
      scoreText.text = score.toString();
      playScreen.removeChild(note);
      noteType[channel] = 0;
      good(text);
    } else if (noteType[channel] === 1 && note.y >= appWidth * 0.7) {
      combo = 0;
      comboText.text = "0 combos";
      playScreen.removeChild(note);
      noteType[channel] = 0;
      bad(text);
    }
    // else if (noteType[channel] === 2 && isPerfect(button, note_start) && noteAvailiable[channel] === true) {
    //     combo += 1;
    //     if (combo > maxCombo) maxCombo = combo;
    //     score += (250 + combo * 5);
    //     comboText.text = combo + " combos";
    //     scoreText.text = score.toString();
    //     noteAvailiable[channel] = false;
    //     perfect(text);
    // }
    else if (
      noteType[channel] === 2 &&
      isIntersect(button, note_start) &&
      noteAvailiable[channel] === true
    ) {
      combo += 1;
      if (combo > maxCombo) maxCombo = combo;
      score += 250 + combo * 5;
      comboText.text = combo + " combos";
      scoreText.text = score.toString();
      noteAvailiable[channel] = false;
      // good(text);
      perfect(text);
    } else if (
      noteType[channel] === 2 &&
      !isIntersect(button, note_start) &&
      noteAvailiable[channel] === true
    ) {
      combo = 0;
      comboText.text = "0 combos";
      playScreen.removeChild(note);
      noteType[channel] = 0;
      noteAvailiable[channel] = false;
      bad(text);
    }
  }

  function isReleaseScore(channel, button, note, note_end, text) {
    if (noteType[channel] === 2) {
      if (!isIntersect(button, note_end) && noteAvailiable[channel] === false) {
        combo = 0;
        comboText.text = "0 combos";
        playScreen.removeChild(note);
        noteType[channel] = 0;
        bad(text);
      } else if (
        isPerfect(button, note_end) &&
        noteAvailiable[channel] === false
      ) {
        combo += 1;
        if (combo > maxCombo) maxCombo = combo;
        score += 600 + combo * 5;
        comboText.text = combo + " combos";
        scoreText.text = score.toString();
        playScreen.removeChild(note);
        noteType[channel] = 0;
        perfect(text);
      } else if (
        isIntersect(button, note_end) &&
        noteAvailiable[channel] === false
      ) {
        combo += 1;
        if (combo > maxCombo) maxCombo = combo;
        score += 500 + combo * 5;
        comboText.text = combo + " combos";
        scoreText.text = score.toString();
        playScreen.removeChild(note);
        noteType[channel] = 0;
        good(text);
      }
    }
  }

  function isIntersect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    return (
      aBox.x + aBox.width > bBox.x &&
      aBox.x < bBox.x + bBox.width &&
      aBox.y + aBox.height > bBox.y &&
      aBox.y < bBox.y + bBox.height
    );
  }

  function isPerfect(a, b) {
    let aBox = a.getBounds();
    let bBox = b.getBounds();
    return (
      aBox.y + aBox.height > bBox.y &&
      aBox.y < bBox.y + bBox.height &&
      aBox.y + aBox.height >= bBox.y + bBox.height * 0.7 &&
      aBox.y + aBox.height <= bBox.y + bBox.height * 1.3
    );
  }

  function perfect(text) {
    performancePlay.push(3);
    perfectTap += 1;
    note_num += 1;
    text.text = "PERFECT";
    text.visible = true;
    text.style.fontSize = 10;
    accuracy_score += 100;
    accuracy = (accuracy_score / note_num).toFixed(2);
    playing_accuracyText.text = accuracy + "%";
  }

  function good(text) {
    performancePlay.push(2);
    goodTap += 1;
    note_num += 1;
    text.text = "GOOD";
    text.visible = true;
    text.style.fontSize = 10;
    accuracy_score += 70;
    accuracy = (accuracy_score / note_num).toFixed(2);
    playing_accuracyText.text = accuracy + "%";
  }

  function bad(text) {
    performancePlay.push(1);
    badTap += 1;
    note_num += 1;
    text.text = "BAD";
    text.visible = true;
    text.style.fontSize = 10;
    accuracy_score += 0;
    accuracy = (accuracy_score / note_num).toFixed(2);
    playing_accuracyText.text = accuracy + "%";
  }

  function miss(text) {
    performancePlay.push(0);
    missTap += 1;
    note_num += 1;
    text.text = "MISS";
    text.visible = true;
    text.style.fontSize = 10;
  }

  function tickHitOrMiss(text) {
    if (text.visible === true) {
      bringToFront(text);
      if (text.style.fontSize < 30) {
        text.style.fontSize += 1;
      } else {
        text.visible = false;
      }
    }
  }

  function bringToFront(layer) {
    playScreen.removeChild(layer);
    playScreen.addChild(layer);
  }

  return <div></div>;
}

export default Game;
