import React, { useState, useEffect } from "react";
import "../../App.css";
import * as PIXI from "pixi.js";
import { default as PIXI_SOUND } from "pixi-sound";
import Axios from "axios";
import { api } from '../../environment'
var WebFont = require('webfontloader');
function Game() {

  WebFont.load({
    google: {
        families: ['Sarabun']
    }
  });


  //database
  let inventory = [];

  let equiping;

  let song;

  var songDict = [
    {
      name: "BUTTER FLY",
      path: "sounds/Butterfly.mp3",
      time: "1:28",
    },
    {
      name: "VIVID WORLD",
      path: "sounds/VIVID WORLD.mp3",
      time: "1:38",
    },
    {
      name: "POPPIN' UP!",
      path: "sounds/Poppin' Up!.mp3",
      time: "1:34",
    },
    {
      name: "ANGELIC ANGEL",
      path: "sounds/Angelic_Angel.mp3",
      time: "1:49",
    },
    {
      name: "SOLITUDE RAIN",
      path: "sounds/Solitude Rain.mp3",
      time: "1:37",
    },
  ];

  async function getInventory() {
    await Axios.get(api + "/game/get").then((i) => {
      inventory = i.data;
    });
  };
  function getTokenValue(token, param) {
    for (let i in inventory) {
      if (inventory[i].name === token) {
        return inventory[i][param];
      }
    }
  };

  async function setTokenValue(tokens, update_value) {
    for (let i in inventory) {
      if (inventory[i].name === tokens) {
        inventory[i].in_stock = update_value;
      }
    }
    await Axios.post(api + "/game/set", {
      tokens,
      update_value,
    });
  };
  
  useEffect(async () => { 
    let app;
    let keys = {};
    let speed = 8;
    let volumn = 20;
    let ticker_count = 0;
    let foschan_ticker = 0;
    let isEnd = false;
    var startTime;
    var timeDistance = 0;
    var windowHeight = window.screen.height;
    var windowWidth = window.screen.width;
    var appHeight;
    var appWidth;

    let titleScreen;
    let tutorialScreen;
    let gachaScreen;
    let gachaEffectScreen;
    let gachaResultScreen;
    let inventoryScreen;
    let songSelectScreen;
    let playScreen;
    let resultScreen;

    let modifier = 0;
    let bossCoinConverted = 0;

    var cheatMode = false;

    let tempGachaCache = [];

    let comboText;
    let scoreText;
    let perfectText;
    let pauseButton;
    let playing_accuracyText;
    let hitTextS;
    let hitTextD;
    let hitTextK;
    let hitTextL;

    let foschan1;
    let foschan2;
    let invalid_tick = 0;
    let ticker_invalid;
    let invalidText;

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
    let smallFontSize;
    let normalFontSize;
    let bigFontSize;

    if (windowHeight >= 1000 && windowWidth >= 500) {
      appHeight = 800;
      appWidth = 400;
      smallFontSize = 20;
      normalFontSize = 35;
      bigFontSize = 50;
    } else if (windowHeight >= 1000 && windowWidth < 500) {
      appHeight = windowWidth * 1.6;
      appWidth = windowWidth * 0.8;
      smallFontSize = 20;
      normalFontSize = 25;
      bigFontSize = 40;
    } else if (windowHeight < 1000 && windowWidth >= 500) {
      appHeight = windowHeight * 0.8;
      appWidth = windowHeight * 0.4;
      smallFontSize = 15;
      normalFontSize = 20;
      bigFontSize = 30;
    } else {
      appHeight = windowHeight * 0.8;
      appWidth = windowWidth * 0.8;
      smallFontSize = 15;
      normalFontSize = 20;
      bigFontSize = 30;
    }

    var appX = windowWidth / 2 - appWidth / 2;
    var appY = 20;
    //var appY = windowHeight / 2 - appHeight / 2;

    perfromanceGraphProp.x = appX + appWidth * 0.2;
    perfromanceGraphProp.y = appY + appHeight * 0.5;
    perfromanceGraphProp.width = appWidth * 0.7;
    perfromanceGraphProp.height = appHeight * 0.2;

    const Headerstyle = new PIXI.TextStyle({
      fontSize: bigFontSize,
      fontWeight: "bolder",
      fontFamily: "Sarabun"
    });

    const Menustyle = new PIXI.TextStyle({
      fontSize: normalFontSize,
      fontStyle: "italic",
      fontFamily: "Sarabun"
    });

    const Menustyle2 = new PIXI.TextStyle({
      fontSize: normalFontSize,
      fontFamily: "Sarabun"
    });

    const Detailstyle = new PIXI.TextStyle({
      fontSize: smallFontSize,
      fontFamily: "Sarabun"
    });

    const Dangerstyle = new PIXI.TextStyle({
      fontSize: normalFontSize,
      fontFamily: "Sarabun",
      fill: "#b00b0b",
    });

    let leftBG;
    let rightBG;
    let background;

    await getInventory();

    equiping = [
      {
        type: "bg",
        details: "hill",
      },
      {
        type: "char",
        details: "Foschan",
      },
    ];

    app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0xffffff,
    });
    document.body.appendChild(app.view);
    let textureBG = new PIXI.Texture.from(getTokenValue("hill", "path"));
    leftBG = new PIXI.Sprite(textureBG);
    adjSprite(leftBG, app.stage, -appX, appY, appX * 2, appHeight, false);
    rightBG = new PIXI.Sprite(textureBG);
    adjSprite(
      rightBG,
      app.stage,
      appX + appWidth,
      appY,
      appX * 2,
      appHeight,
      false
    );

    background = new PIXI.Graphics();
    background.beginFill(0xDEDEDE);
    background.drawRect(appX, appY, appWidth, appHeight);
    app.stage.addChild(background);

    titleScreen = new PIXI.Container();
    tutorialScreen = new PIXI.Container();
    gachaScreen = new PIXI.Container();
    gachaEffectScreen = new PIXI.Container();
    gachaResultScreen = new PIXI.Container();
    inventoryScreen = new PIXI.Container();
    tutorialScreen = new PIXI.Container();
    songSelectScreen = new PIXI.Container();
    playScreen = new PIXI.Container();
    resultScreen = new PIXI.Container();

    app.stage.addChild(titleScreen);
    app.stage.addChild(tutorialScreen);
    app.stage.addChild(gachaScreen);
    app.stage.addChild(gachaEffectScreen);
    app.stage.addChild(gachaResultScreen);
    app.stage.addChild(tutorialScreen);
    app.stage.addChild(inventoryScreen);
    app.stage.addChild(songSelectScreen);
    app.stage.addChild(playScreen);
    app.stage.addChild(resultScreen);

    titleScreen.visible = true;
    tutorialScreen.visible = false;
    gachaScreen.visible = false;
    gachaEffectScreen.visible = false;
    gachaResultScreen.visible = false;
    tutorialScreen.visible = false;
    inventoryScreen.visible = false;
    songSelectScreen.visible = false;
    playScreen.visible = false;
    resultScreen.visible = false;

    let ticker = new PIXI.Ticker();
    ticker.autoStart = false;
    ticker.add(gameLoop);

    //title screen
    let normalTicketText = new PIXI.Text(
      "x" + getTokenValue("normal ticket", "in_stock"),
      Detailstyle
    );
    adjObj(
      normalTicketText,
      titleScreen,
      appX + appWidth * 0.9,
      appY + appHeight * 0.01,
      false
    );

    let normalTicketImage = new PIXI.Sprite.from(
      getTokenValue("normal ticket", "path")
    );
    adjSprite(
      normalTicketImage,
      titleScreen,
      appX + appWidth * 0.75,
      appY,
      appWidth * 0.1,
      appHeight * 0.05,
      false
    );

    let premiemTicketText = new PIXI.Text(
      "x" + getTokenValue("premiem ticket", "in_stock"),
      Detailstyle
    );
    adjObj(
      premiemTicketText,
      titleScreen,
      appX + appWidth * 0.9,
      appY + appHeight * 0.06,
      false
    );

    let premiemTicketImage = new PIXI.Sprite.from(
      getTokenValue("premiem ticket", "path")
    );
    adjSprite(
      premiemTicketImage,
      titleScreen,
      appX + appWidth * 0.75,
      appY + appHeight * 0.05,
      appWidth * 0.1,
      appHeight * 0.05,
      false
    );

    let titleText = new PIXI.Text("Pianoforte", Headerstyle);
    adjObj(
      titleText,
      titleScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.15,
      false,
      0.5
    );

    foschan1 = new PIXI.Sprite.from("images/char/foschan1.png");
    adjSprite(
      foschan1,
      titleScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.45,
      appWidth * 0.6,
      appHeight * 0.5,
      false,
      0.5
    );

    foschan2 = new PIXI.Sprite.from("images/char/foschan2.png");
    adjSprite(
      foschan2,
      titleScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.45,
      appWidth * 0.6,
      appHeight * 0.5,
      false,
      0.5
    );
    foschan2.visible = false;

    let ticker_fos = new PIXI.Ticker();
    ticker_fos.autoStart = true;
    ticker_fos.add(foschanLoop);

    let startButton = new PIXI.Text("START", Headerstyle);
    adjObj(
      startButton,
      titleScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.7,
      true,
      0.5
    );
    startButton.on("pointerdown", function () {
      titleScreen.visible = false;
      songSelectScreen.visible = true;
    });

    let tutorialButton = new PIXI.Text("TUTORIAL", Menustyle2);
    adjObj(
      tutorialButton,
      titleScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.8,
      true,
      0.5
    );
    tutorialButton.on("pointerdown", function () {
      titleScreen.visible = false;
      tutorialScreen.visible = true;
    });

    let gachaButton = new PIXI.Sprite.from("images/button/gacha.png");
    adjSprite(
      gachaButton,
      titleScreen,
      appX + appWidth * 0.35,
      appY + appHeight * 0.9,
      appWidth * 0.15,
      appWidth * 0.15,
      true,
      0.5
    );
    gachaButton.on("pointerdown", function () {
      titleScreen.visible = false;
      gachaScreen.visible = true;
      boss_coinText.text = "x" + getTokenValue("Boss coin", "in_stock");
      chonlasit_coinText.text =
        "x" + getTokenValue("Chonlasit coin", "in_stock");
    });
    titleScreen.addChild(gachaButton);

    let inventoryButton = new PIXI.Sprite.from("images/button/inventory.png");
    adjSprite(
      inventoryButton,
      titleScreen,
      appX + appWidth * 0.65,
      appY + appHeight * 0.9,
      appWidth * 0.15,
      appWidth * 0.15,
      true,
      0.5
    );
    inventoryButton.on("pointerdown", function () {
      titleScreen.visible = false;
      inventoryScreen.visible = true;
      //inventory screen
      updateInventoryScreen();
    });
    titleScreen.addChild(inventoryButton);

    //tutorial screen
    let tutorial_page = 0;
    let tutorial_texture = [];
    let exitTutorialButton = new PIXI.Text("BACK", Menustyle);
    adjObj(exitTutorialButton, tutorialScreen, appX, appY, true);
    exitTutorialButton.on('pointerdown', function() {
      tutorial_page = 0;
      tutorialPage.texture = tutorial_texture[0];
      tutorialText.text = tutorialTextArray[0];

      tutorialScreen.visible = false;
      titleScreen.visible = true;
    });
    
    let tutorialShadow = new PIXI.Graphics();
    tutorialShadow.beginFill(0x303030);   
    tutorialShadow.drawRect(appX + appWidth * 0.22, appY + appHeight * 0.09, appWidth * 0.6, appHeight * 0.5);
    tutorialScreen.addChild(tutorialShadow);

    let tutorialFrame = new PIXI.Graphics();
    tutorialFrame.beginFill(0xffffff);   
    tutorialFrame.drawRect(appX + appWidth * 0.195, appY + appHeight * 0.0975, appWidth * 0.61, appHeight * 0.505);
    tutorialScreen.addChild(tutorialFrame);

    for(let i=1; i<=6; i++){
      let tutorialTexture = new PIXI.Texture.from("images/tutorial/" + i + ".png");
      tutorial_texture.push(tutorialTexture);
    }
    let tutorialPage = new PIXI.Sprite(tutorial_texture[0]);
    adjSprite(tutorialPage, tutorialScreen, appX + appWidth * 0.5, appY + appHeight * 0.35, appWidth * 0.6, appHeight * 0.5, false, 0.5);

    let tutorialTextArray = [
      "กดที่เพลงเพื่อเลือกเล่นเพลง หมายเหตุ: หากท่านไม่มีตั๋วเล่นเกมจะเข้าเล่นเกมไม่ได้ ท่านสามารถหาตั๋วเล่นเกมได้จากการซื้อสลาก",
      "กดปรับความเร็วและกดใช้ตั๋วเพื่อเริ่มเล่น หมายเหตุ: ยิ่งเพิ่มความเร็วมากเท่าไหร่จะยิ่งมีโอกาส เล่นโน้ตมากขึ้นและทำคะแนนได้มากขึ้น",
      "กดปุ่ม S, D, K, L ให้ตรงตามโน้ตเพลง หากโน้ตเป็นแถบยาวให้กดค้างและปล่อยเมื่อโน้ตสิ้นสุดพอดี หากเล่นในโทรศัพท์ สามารถใช้มือกดปุ่มได้เลย",
      "เมื่อเล่นเสร็จจะได้รับ Boss coin ตามคะแนนและเกรดที่ได้รับ",
      "กดสัญลักษณ์กาชาในหน้า Home เพื่อใช้ Boss coin ที่ได้รับ",
      "ใช้ Boss coin เพื่อเล่นกาชา ทุกครั้งที่เล่นอาจจะได้รับ Chonlasit coin ไปใช้เป็นส่วนลดในการซื้อสลากก็ได้นะ!"
    ];

    let tutorialText = new PIXI.Text(tutorialTextArray[0], {
      fontFamily: "Saarabun",
      fontSize: smallFontSize,
      wordWrap: true,
      breakWords: true,
      wordWrapWidth: appWidth * 0.6
    });
    adjObj(tutorialText, tutorialScreen, appX + appWidth * 0.2, appY + appHeight * 0.65, false);


    let backTutorialButton = new PIXI.Text("<-", Headerstyle);
    adjObj(backTutorialButton, tutorialScreen, appX + appWidth * 0.25, appY + appHeight * 0.9, true, 0.5);
    backTutorialButton.on('pointerdown', function() {
      if(tutorial_page > 0){
        tutorial_page--;
        tutorialPage.texture = tutorial_texture[tutorial_page];
        tutorialText.text = tutorialTextArray[tutorial_page];
      }
    });

    let nextTutorialButton = new PIXI.Text("->", Headerstyle);
    adjObj(nextTutorialButton, tutorialScreen, appX + appWidth * 0.75, appY + appHeight * 0.9, true, 0.5);
    nextTutorialButton.on('pointerdown', function() {
      if(tutorial_page < 5){
        tutorial_page++;
        tutorialPage.texture = tutorial_texture[tutorial_page];
        tutorialText.text = tutorialTextArray[tutorial_page];
      }
    });

    //gacha effect screen
    gachaEffectScreen.buttonMode = true;
    gachaEffectScreen.interactive = true;
    gachaEffectScreen.on("pointerdown", function () {
      gachaEffectScreen.visible = false;
      gachaResultScreen.visible = true;
      gachaResultShow();
    });

    let gachaEffectBG = new PIXI.Sprite.from("/images/bg/gacha_bg.png");
    adjSprite(
      gachaEffectBG,
      gachaEffectScreen,
      appX,
      appY,
      appWidth,
      appHeight,
      true
    );

    let gachaEffectText = new PIXI.Text("-TAP TO CONTINUE-", Menustyle2);
    adjObj(
      gachaEffectText,
      gachaEffectScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.8,
      true,
      0.5
    );

    let gachaSReffect = new PIXI.Texture.from("/images/res/SR.png");
    let gachaReffect = new PIXI.Texture.from("/images/res/R.png");
    let gachaEffect = new PIXI.Sprite();
    adjSprite(
      gachaEffect,
      gachaEffectScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.5,
      appWidth * 0.3,
      appHeight * 0.3,
      true,
      0.5
    );

    //gacha screen
    let boss_coinText = new PIXI.Text(
      "x" + getTokenValue("Boss coin", "in_stock"),
      Detailstyle
    );
    adjObj(
      boss_coinText,
      gachaScreen,
      appX + appWidth * 0.75,
      appY + appHeight * 0.01,
      false
    );

    let boss_coinImage = new PIXI.Sprite.from(
      getTokenValue("Boss coin", "path")
    );
    adjSprite(
      boss_coinImage,
      gachaScreen,
      appX + appWidth * 0.6,
      appY,
      appWidth * 0.1,
      appHeight * 0.05,
      false
    );

    let chonlasit_coinText = new PIXI.Text(
      "x" + getTokenValue("Chonlasit coin", "in_stock"),
      Detailstyle
    );
    adjObj(
      chonlasit_coinText,
      gachaScreen,
      appX + appWidth * 0.75,
      appY + appHeight * 0.06,
      false
    );

    //let chonlasit_coinImage = new PIXI.Sprite.from(getTokenValue("Chonlasit coin", "path"));
    let chonlasit_coinImage = new PIXI.Sprite.from(
      "/images/token/chonlasit_coin copy.png"
    );
    adjSprite(
      chonlasit_coinImage,
      gachaScreen,
      appX + appWidth * 0.6,
      appY + appHeight * 0.06,
      appWidth * 0.1,
      appHeight * 0.05,
      false
    );

    let esc_text = new PIXI.Text("BACK", Menustyle);
    adjObj(esc_text, gachaScreen, appX, appY, true);
    esc_text.on("pointerdown", function () {
      titleScreen.visible = true;
      gachaScreen.visible = false;
    });

    let banner = new PIXI.Sprite.from("/images/banner/pickup_banner1.png");
    adjSprite(
      banner,
      gachaScreen,
      appX + appWidth * 0.05,
      appY + appHeight * 0.3,
      appWidth * 0.9,
      appHeight * 0.2,
      false
    );

    let rate_text = new PIXI.Text("อัตราการออกกาชา", Menustyle2);
    adjObj(
      rate_text,
      gachaScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.6,
      true,
      0.5
    );
    rate_text.on("pointerdown", function () {
      interactiveSwitch(gachaScreen, false);
      let rateWindow = new PIXI.Graphics();
      rateWindow.beginFill(0xffffff);
      rateWindow.drawRect(
        appX + appWidth * 0.1,
        appY + appHeight * 0.3,
        appWidth * 0.8,
        appHeight * 0.4
      );
      gachaScreen.addChild(rateWindow);

      let close_rateWindow = new PIXI.Text("X", Menustyle2);
      adjObj(
        close_rateWindow,
        rateWindow,
        appX + appWidth * 0.8,
        appY + appHeight * 0.32,
        true
      );
      close_rateWindow.on("pointerdown", function () {
        rateWindow.removeChildren();
        gachaScreen.removeChild(rateWindow);
        interactiveSwitch(gachaScreen, true);
      });

      let NArate = new PIXI.Text("Secret ???%", Dangerstyle);
      adjObj(
        NArate,
        rateWindow,
        appX + appWidth * 0.5,
        appY + appHeight * 0.4,
        false,
        0.5
      );

      let SRrate = new PIXI.Text("SR 2%", Menustyle2);
      adjObj(
        SRrate,
        rateWindow,
        appX + appWidth * 0.5,
        appY + appHeight * 0.5,
        false,
        0.5
      );

      let Rrate = new PIXI.Text("R 98%", Menustyle2);
      adjObj(
        Rrate,
        rateWindow,
        appX + appWidth * 0.5,
        appY + appHeight * 0.6,
        false,
        0.5
      );
    });

    let gachaPlayx1 = new PIXI.Sprite.from("/images/button/gachaPlay1.png");
    adjSprite(
      gachaPlayx1,
      gachaScreen,
      appX + appWidth * 0.25,
      appY + appHeight * 0.8,
      appWidth * 0.45,
      appWidth * 0.15,
      true,
      0.5
    );
    gachaPlayx1.on("pointerdown", function () {
      if (getTokenValue("Boss coin", "in_stock") >= 10) {
        gachaPlay(1);
      } else {
        if (invalid_tick === 0) {
          invalidText = new PIXI.Text("not enough Boss coin", { fontSize: 1 });
          adjObj(
            invalidText,
            gachaScreen,
            appX + appWidth * 0.5,
            appY + appHeight * 0.9,
            false,
            0.5
          );
          ticker_invalid = new PIXI.Ticker();
          ticker_invalid.autoStart = true;
          ticker_invalid.add(invalidGachaPlay);
        }
      }
    });

    let gachaPlayx10 = new PIXI.Sprite.from("/images/button/gachaPlay10.png");
    adjSprite(
      gachaPlayx10,
      gachaScreen,
      appX + appWidth * 0.75,
      appY + appHeight * 0.8,
      appWidth * 0.45,
      appWidth * 0.15,
      true,
      0.5
    );
    gachaPlayx10.on("pointerdown", function () {
      if (getTokenValue("Boss coin", "in_stock") >= 100) {
        gachaPlay(10);
      } else {
        if (invalid_tick === 0) {
          invalidText = new PIXI.Text("not enough Boss coin", { fontSize: 1 });
          adjObj(
            invalidText,
            gachaScreen,
            appX + appWidth * 0.5,
            appY + appHeight * 0.9,
            false,
            0.5
          );
          ticker_invalid = new PIXI.Ticker();
          ticker_invalid.autoStart = true;
          ticker_invalid.add(invalidGachaPlay);
        }
      }
    });

    function gachaPlay(times) {
      setTokenValue(
        "Boss coin",
        getTokenValue("Boss coin", "in_stock") - times * 10
      );
      let cacheLength = tempGachaCache.length;
      let Ritems = [];
      let SRitems = [];
      inventory.forEach((item) => {
        if (item.rarity === "R") {
          Ritems.push(item);
        } else if (item.rarity === "SR") {
          SRitems.push(item);
        }
      });

      while (cacheLength > 0) {
        cacheLength--;
        tempGachaCache.pop();
      }

      let timesLeft = times;
      gachaEffect.texture = gachaReffect;

      while (timesLeft > 0) {
        timesLeft--;
        let rand = Math.random();
        if (rand > 0.02) {
          let Rrand = Math.floor(Math.random() * Ritems.length);
          tempGachaCache.push(Ritems[Rrand]);
        } else {
          let SRrand = Math.floor(Math.random() * SRitems.length);
          tempGachaCache.push(SRitems[SRrand]);
          gachaEffect.texture = gachaSReffect;
        }
      }
      tempGachaCache.forEach((result) => {
        setTokenValue(result.name, getTokenValue(result.name, "in_stock") + 1);
      });
      boss_coinText.text = "x" + getTokenValue("Boss coin", "in_stock");
      chonlasit_coinText.text =
        "x" + getTokenValue("Chonlasit coin", "in_stock");

      gachaScreen.visible = false;
      gachaEffectScreen.visible = true;
    }

    function invalidGachaPlay() {
      if (invalid_tick <= 30) {
        invalid_tick++;
        invalidText.style.fontSize = invalid_tick;
      } else if (invalid_tick <= 100) {
        invalid_tick++;
      } else {
        invalid_tick = 0;
        gachaScreen.removeChild(invalidText);
        ticker_invalid.stop();
      }
    }

    //gacha result screen
    let resultText = new PIXI.Text("Result", Menustyle2);
    adjObj(
      resultText,
      gachaResultScreen,
      appX + appWidth * 0.05,
      appY + appHeight * 0.02,
      false
    );

    let gachaResultBox = new PIXI.Graphics();
    gachaResultBox.beginFill(0xffffff);
    gachaResultBox.drawRect(
      appX + appWidth * 0.05,
      appY + appHeight * 0.1,
      appWidth * 0.9,
      appHeight * 0.7
    );
    gachaResultScreen.addChild(gachaResultBox);

    let exitFromResult = new PIXI.Sprite.from("/images/button/exit_button.png");
    adjSprite(
      exitFromResult,
      gachaResultScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.9,
      appWidth * 0.3,
      appWidth * 0.1,
      true,
      0.5
    );
    exitFromResult.on("pointerdown", function () {
      while (temporaryResultObj.length > 0) {
        temporaryResultObj[0].destroy();
        gachaResultScreen.removeChild(temporaryResultObj[0]);
        temporaryResultObj.shift();
      }
      gachaResultScreen.visible = false;
      gachaScreen.visible = true;
    });

    let temporaryResultObj = [];

    function gachaResultShow() {
      let i = 0;
      tempGachaCache.forEach((item) => {
        let itemImage = new PIXI.Sprite();
        temporaryResultObj.push(itemImage);
        adjSprite(
          itemImage,
          gachaResultScreen,
          appX + appWidth * (0.1 + (i % 4) * 0.22),
          appY + appHeight * (0.12 + Math.floor(i / 4) * 0.25),
          appWidth * 0.15,
          appHeight * 0.1
        );
        if (
          item.name !== "Chonlasit coin" &&
          getTokenValue(item.name, "in_stock") > 5
        ) {
          let itemImport = new PIXI.Text("5", Detailstyle);
          temporaryResultObj.push(itemImport);
          adjObj(
            itemImport,
            gachaResultScreen,
            appX + appWidth * (0.175 + (i % 4) * 0.22),
            appY + appHeight * (0.27 + Math.floor(i / 4) * 0.25),
            false,
            0.5
          );
          setTokenValue(item.name, getTokenValue(item.name, "in_stock") - 1);
          setTokenValue(
            "Chonlasit coin",
            getTokenValue("Chonlasit coin", "in_stock") + 5
          );

          let itemTexture = new PIXI.Texture.from(
            getTokenValue("Chonlasit coin", "path")
          );
          temporaryResultObj.push(itemTexture);
          itemImage.texture = itemTexture;
        } else {
          let itemImport = new PIXI.Text("1", Detailstyle);
          temporaryResultObj.push(itemImport);
          adjObj(
            itemImport,
            gachaResultScreen,
            appX + appWidth * (0.175 + (i % 4) * 0.22),
            appY + appHeight * (0.27 + Math.floor(i / 4) * 0.25),
            false,
            0.5
          );

          let itemTexture = new PIXI.Texture.from(
            getTokenValue(item.name, "path")
          );
          temporaryResultObj.push(itemTexture);
          itemImage.texture = itemTexture;
        }
        i++;
      });
    }

    //song select screen
    let backButton = new PIXI.Text("BACK", Menustyle);
    adjObj(backButton, songSelectScreen, appX, appY, true);
    backButton.on("pointerdown", function () {
      songSelectScreen.visible = false;
      titleScreen.visible = true;
    });

    let songSelectText = new PIXI.Text("Select song", Headerstyle);
    adjObj(
      songSelectText,
      songSelectScreen,
      appX + appWidth * 0.02,
      appY + appHeight * 0.07,
      false
    );

    let settingButton = new PIXI.Sprite.from(
      "images/button/setting_button.png"
    );
    adjSprite(
      settingButton,
      songSelectScreen,
      appX + appWidth * 0.85,
      appY,
      appWidth * 0.15,
      appWidth * 0.15,
      true
    );
    settingButton.on("pointerdown", function () {
      songSelectScreen.visible = false;

      let settingContainer = new PIXI.Container();
      app.stage.addChild(settingContainer);
      settingContainer.visible = true;

      let settingText = new PIXI.Text("Setting", Headerstyle);
      adjObj(
        settingText,
        settingContainer,
        appX + appWidth * 0.05,
        appY + appHeight * 0.025,
        false
      );

      let settingClose = new PIXI.Text("X", Headerstyle);
      adjObj(
        settingClose,
        settingContainer,
        appX + appWidth * 0.85,
        appY + appHeight * 0.025,
        true
      );
      settingClose.on("pointerdown", function () {
        settingContainer.visible = false;
        songSelectScreen.visible = true;
      });

      let volumnText = new PIXI.Text("Volumn", Menustyle2);
      adjObj(
        volumnText,
        settingContainer,
        appX + appWidth * 0.05,
        appY + appHeight * 0.15,
        false
      );

      let volumnDecrease = new PIXI.Text("-", Menustyle2);
      adjObj(
        volumnDecrease,
        settingContainer,
        appX + appWidth * 0.6,
        appY + appHeight * 0.15,
        true
      );
      volumnDecrease.on("pointerdown", function () {
        if (volumn >= 5) {
          volumn -= 5;
          volumnModify.text = volumn;
          let testSound = new PIXI_SOUND.sound.Sound.from({
            url: "sounds/poi.mp3",
            autoPlay: true,
            volume: volumn / 50,
          });
        }
      });

      let volumnIncrease = new PIXI.Text("+", Menustyle2);
      adjObj(
        volumnIncrease,
        settingContainer,
        appX + appWidth * 0.8,
        appY + appHeight * 0.15,
        true
      );
      volumnIncrease.on("pointerdown", function () {
        if (volumn <= 95) {
          volumn += 5;
          volumnModify.text = volumn;
          let testSound = new PIXI_SOUND.sound.Sound.from({
            url: "sounds/poi.mp3",
            autoPlay: true,
            volume: volumn / 50,
          });
        }
      });

      let volumnModify = new PIXI.Text(volumn, Menustyle2);
      adjObj(
        volumnModify,
        settingContainer,
        appX + appWidth * 0.72,
        appY + appHeight * 0.17,
        false,
        0.5
      );

      let speedText = new PIXI.Text("NoteSpeed", Menustyle2);
      adjObj(
        speedText,
        settingContainer,
        appX + appWidth * 0.05,
        appY + appHeight * 0.25,
        false
      );

      let speedDecrease = new PIXI.Text("-", Menustyle2);
      adjObj(
        speedDecrease,
        settingContainer,
        appX + appWidth * 0.6,
        appY + appHeight * 0.25,
        true
      );
      speedDecrease.on("pointerdown", function () {
        if (speed > 4) {
          speed--;
          speedModify.text = speed;
          rankTextModify();
        }
      });

      let speedIncrease = new PIXI.Text("+", Menustyle2);
      adjObj(
        speedIncrease,
        settingContainer,
        appX + appWidth * 0.8,
        appY + appHeight * 0.25,
        true
      );
      speedIncrease.on("pointerdown", function () {
        if (speed < 20) {
          speed++;
          speedModify.text = speed;
          rankTextModify();
        }
      });

      let speedModify = new PIXI.Text(speed, Menustyle2);
      adjObj(
        speedModify,
        settingContainer,
        appX + appWidth * 0.72,
        appY + appHeight * 0.27,
        false,
        0.5
      );

      let rankDesc = new PIXI.Text("Difficulty", Menustyle2);
      adjObj(
        rankDesc,
        settingContainer,
        appX + appWidth * 0.05,
        appY + appHeight * 0.35,
        false
      );

      let rankText = new PIXI.Text("", { fontSize: normalFontSize });
      rankText.style.fontWeight = "bold";
      adjObj(
        rankText,
        settingContainer,
        appX + appWidth * 0.72,
        appY + appHeight * 0.37,
        false,
        0.5
      );
      rankTextModify();

      function rankTextModify() {
        if (speed >= 15) {
          rankText.style.fill = 0xda0000;
          rankText.text = "MASTER";
        } else if (speed >= 12) {
          rankText.style.fill = 0xff5733;
          rankText.text = "HARD";
        } else if (speed >= 8) {
          rankText.style.fill = 0xffc300;
          rankText.text = "NORMAL";
        } else {
          rankText.style.fill = 0x006d33;
          rankText.text = "EASY";
        }
      }
    });

    let songContainer = new PIXI.Container();
    songSelectScreen.addChild(songContainer);

    for (let i in songDict) {
      let songButton = new PIXI.Container();
      songSelectScreen.addChild(songButton);

      let songButtonBG = new PIXI.Graphics();
      if (i % 2 === 0) songButtonBG.beginFill(0xeaeaea);
      else songButtonBG.beginFill(0xc6e2ff);
      songButtonBG.drawRect(
        appX,
        appY + appHeight * 0.15 + i * 0.05 * appHeight,
        appWidth,
        appHeight * 0.05
      );
      songButton.addChild(songButtonBG);

      let songName = new PIXI.Text(songDict[i].name, Menustyle2);
      adjObj(
        songName,
        songButton,
        appX + appWidth * 0.4,
        appY + appHeight * 0.175 + i * 0.05 * appHeight,
        false,
        0.5
      );

      let songTime = new PIXI.Text(songDict[i].time, Menustyle2);
      adjObj(
        songTime,
        songButton,
        appX + appWidth * 0.9,
        appY + appHeight * 0.175 + i * 0.05 * appHeight,
        false,
        0.5
      );

      songButton.interactive = true;
      songButton.buttonMode = true;
      songButton.on("pointerdown", function () {
        interactiveSwitch(songSelectScreen, false);

        let confirmSpeedScreen = new PIXI.Container();
        songSelectScreen.addChild(confirmSpeedScreen);

        let csBG = new PIXI.Graphics();
        csBG.beginFill(0xffffff);
        csBG.drawRect(
          appX + appWidth * 0.1,
          appY + appHeight * 0.3,
          appWidth * 0.8,
          appHeight * 0.4
        );
        confirmSpeedScreen.addChild(csBG);

        let csClose = new PIXI.Text("X", Headerstyle);
        adjObj(
          csClose,
          confirmSpeedScreen,
          appX + appWidth * 0.8,
          appY + appHeight * 0.3,
          true
        );
        csClose.on("pointerdown", function () {
          songSelectScreen.removeChild(confirmSpeedScreen);
          interactiveSwitch(songSelectScreen, true);
        });

        let speedTextConfirm = new PIXI.Text("NoteSpeed", Menustyle2);
        adjObj(
          speedTextConfirm,
          confirmSpeedScreen,
          appX + appWidth * 0.15,
          appY + appHeight * 0.45,
          false
        );

        let speedDecreaseConfirm = new PIXI.Text("-", Menustyle2);
        adjObj(
          speedDecreaseConfirm,
          confirmSpeedScreen,
          appX + appWidth * 0.6,
          appY + appHeight * 0.45,
          true
        );
        speedDecreaseConfirm.on("pointerdown", function () {
          if (speed > 4) {
            speed--;
            speedModifyConfirm.text = speed;
          }
        });

        let speedIncreaseConfirm = new PIXI.Text("+", Menustyle2);
        adjObj(
          speedIncreaseConfirm,
          confirmSpeedScreen,
          appX + appWidth * 0.8,
          appY + appHeight * 0.45,
          true
        );
        speedIncreaseConfirm.on("pointerdown", function () {
          if (speed < 20) {
            speed++;
            speedModifyConfirm.text = speed;
          }
        });

        let speedModifyConfirm = new PIXI.Text(speed, Menustyle2);
        adjObj(
          speedModifyConfirm,
          confirmSpeedScreen,
          appX + appWidth * 0.72,
          appY + appHeight * 0.47,
          true,
          0.5
        );

        let playButtonNormal = new PIXI.Sprite.from(
          "/images/button/useNormalTicket.png"
        );
        adjSprite(
          playButtonNormal,
          confirmSpeedScreen,
          appX + appWidth * 0.3,
          appY + appHeight * 0.6,
          appWidth * 0.3,
          appWidth * 0.1,
          true,
          0.5
        );
        if (getTokenValue("normal ticket", "in_stock") <= 0)
          playButtonNormal.interactive = false;
        playButtonNormal.on("pointerdown", function () {
          gameStart(1);
        });

        let playButtonPremiem = new PIXI.Sprite.from(
          "/images/button/usePremiemTicket.png"
        );
        adjSprite(
          playButtonPremiem,
          confirmSpeedScreen,
          appX + appWidth * 0.7,
          appY + appHeight * 0.6,
          appWidth * 0.3,
          appWidth * 0.1,
          true,
          0.5
        );
        if (getTokenValue("premiem ticket", "in_stock") <= 0)
          playButtonPremiem.interactive = false;
        playButtonPremiem.on("pointerdown", function () {
          gameStart(5);
        });

        function gameStart(modifier) {
          if (
            modifier === 1 &&
            getTokenValue("normal ticket", "in_stock") > 0
          ) {
            setTokenValue(
              "normal ticket",
              getTokenValue("normal ticket", "in_stock") - 1
            );
            normalTicketText.text =
              "x" + getTokenValue("normal ticket", "in_stock");
          } else if (
            modifier === 5 &&
            getTokenValue("premiem ticket", "in_stock") > 0
          ) {
            setTokenValue(
              "premiem ticket",
              getTokenValue("premiem ticket", "in_stock") - 1
            );
            premiemTicketText.text =
              "x" + getTokenValue("premiem ticket", "in_stock");
          } else {
            console.log("error");
            return;
          }

          interactiveSwitch(songSelectScreen, true);

          songSelectScreen.removeChild(confirmSpeedScreen);
          songSelectScreen.visible = false;
          playScreen.visible = true;
          scoreText.text = "0";
          comboText.text = "0 combos";
          playing_accuracyText.text = "0%";
          startTime = new Date().getTime();
          timeDistance = songDict[i] * 1000;
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
          performancePlay = [];
          while (candleArray.length > 0) {
            resultScreen.removeChild(candleArray[0]);
            candleArray.shift();
          }
          ticker.start();
          //song
          song = new PIXI_SOUND.sound.Sound.from({
            url: songDict[i].path,
            autoPlay: true,
            volume: volumn / 50,
            complete: function () {
              isEnd = true;
              setTimeout(function () {
                if (combo === note_num) perfectText.visible = true;
                ticker.stop();
              }, 5000);
              setTimeout(function () {
                isEnd = false;
                songText.text = songDict[i].name;
                let accuracyModifier = 0;
                if (accuracy > 99.99) {
                  gradeText.text = "SSS";
                  accuracyModifier = 1.5;
                } else if (accuracy >= 95) {
                  gradeText.text = "SS";
                  accuracyModifier = 1.3;
                } else if (accuracy >= 90) {
                  gradeText.text = "S";
                  accuracyModifier = 1.1;
                } else if (accuracy >= 85) {
                  gradeText.text = "A";
                  accuracyModifier = 1;
                } else if (accuracy >= 80) {
                  gradeText.text = "B";
                  accuracyModifier = 0.9;
                } else if (accuracy >= 70) {
                  gradeText.text = "C";
                  accuracyModifier = 0.8;
                } else if (accuracy >= 50) {
                  gradeText.text = "D";
                  accuracyModifier = 0.7;
                } else {
                  gradeText.text = "F";
                  accuracyModifier = 0;
                }
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
                let itemModifier = 0;
                inventory.forEach((item) => {
                  itemModifier += item.effect * item.in_stock;
                });
                bossCoinConverted =
                  Math.ceil((score / 50000) * accuracyModifier) * modifier;
                itemModifier = Math.ceil(itemModifier * bossCoinConverted);
                getBossCoinText.text =
                  "Boss coin get : " + bossCoinConverted + " + " + itemModifier;
                setTokenValue(
                  "Boss coin",
                  getTokenValue("Boss coin", "in_stock") +
                    bossCoinConverted +
                    itemModifier
                );
              }, 8000);
            },
          });
        }
      });
    }

    //play screen
    pauseButton = new PIXI.Sprite.from("images/button/pause.png");
    adjSprite(
      pauseButton,
      playScreen,
      appX,
      appY,
      appWidth * 0.08,
      appWidth * 0.08,
      true
    );
    pauseButton.on("pointerdown", function () {
      interactiveSwitch(playScreen, false);
      song.pause();
      ticker.stop();

      //pause screen
      let pauseScreen = new PIXI.Container();
      playScreen.addChild(pauseScreen);

      let pauseBorder = new PIXI.Graphics();
      pauseBorder.beginFill(0x000000);
      pauseBorder.drawRect(
        appX + appWidth * 0.195,
        appY + appHeight * 0.345,
        appWidth * 0.61,
        appHeight * 0.26
      );
      pauseScreen.addChild(pauseBorder);

      let pauseBG = new PIXI.Graphics();
      pauseBG.beginFill(0x74ccf4);
      pauseBG.drawRect(
        appX + appWidth * 0.2,
        appY + appHeight * 0.35,
        appWidth * 0.6,
        appHeight * 0.25
      );
      pauseScreen.addChild(pauseBG);

      let pauseText = new PIXI.Text("PAUSE", Menustyle2);
      adjObj(
        pauseText,
        pauseScreen,
        appX + appWidth * 0.5,
        appY + appHeight * 0.4,
        false,
        0.5
      );
      pauseScreen.addChild(pauseText);

      let resumeBorder = new PIXI.Graphics();
      resumeBorder.beginFill(0x000000);
      resumeBorder.drawRect(
        appX + appWidth * 0.255,
        appY + appHeight * 0.475,
        appWidth * 0.23,
        appHeight * 0.07
      );
      pauseScreen.addChild(resumeBorder);

      let resumeButton = new PIXI.Graphics();
      resumeButton.beginFill(0xffffff);
      resumeButton.drawRect(
        appX + appWidth * 0.26,
        appY + appHeight * 0.48,
        appWidth * 0.22,
        appHeight * 0.06
      );
      resumeButton.interactive = true;
      resumeButton.buttonMode = true;
      resumeButton.on("pointerdown", function () {
        interactiveSwitch(playScreen, true);
        song.resume();
        ticker.start();
        playScreen.removeChild(pauseScreen);
      });
      pauseScreen.addChild(resumeButton);

      let resumeText = new PIXI.Text("resume", Detailstyle);
      adjObj(
        resumeText,
        resumeButton,
        appX + appWidth * 0.37,
        appY + appHeight * 0.5,
        false,
        0.5
      );

      let exitBorder = new PIXI.Graphics();
      exitBorder.beginFill(0x000000);
      exitBorder.drawRect(
        appX + appWidth * 0.515,
        appY + appHeight * 0.475,
        appWidth * 0.23,
        appHeight * 0.07
      );
      pauseScreen.addChild(exitBorder);

      let exitButton = new PIXI.Graphics();
      exitButton.beginFill(0xffffff);
      exitButton.drawRect(
        appX + appWidth * 0.52,
        appY + appHeight * 0.48,
        appWidth * 0.22,
        appHeight * 0.06
      );
      exitButton.interactive = true;
      exitButton.buttonMode = true;
      exitButton.on("pointerdown", function () {
        interactiveSwitch(pauseScreen, false);

        //confirmExit screen
        let confirmExitScreen = new PIXI.Container();
        pauseScreen.addChild(confirmExitScreen);

        let confirmExitBorder = new PIXI.Graphics();
        confirmExitBorder.beginFill(0x000000);
        confirmExitBorder.drawRect(
          appX + appWidth * 0.2,
          appY + appHeight * 0.375,
          appWidth * 0.6,
          appHeight * 0.2
        );
        confirmExitScreen.addChild(confirmExitBorder);

        let confirmExitBG = new PIXI.Graphics();
        confirmExitBG.beginFill(0x74ccf4);
        confirmExitBG.drawRect(
          appX + appWidth * 0.205,
          appY + appHeight * 0.38,
          appWidth * 0.59,
          appHeight * 0.19
        );
        confirmExitScreen.addChild(confirmExitBG);

        let confirmExitText = new PIXI.Text("Will you exit?", Menustyle2);
        adjObj(
          confirmExitText,
          confirmExitScreen,
          appX + appWidth * 0.5,
          appY + appHeight * 0.45,
          false,
          0.5
        );
        confirmExitScreen.addChild(confirmExitText);

        let yesText = new PIXI.Text("yes", Dangerstyle);
        adjObj(
          yesText,
          confirmExitScreen,
          appX + appWidth * 0.4,
          appY + appHeight * 0.5,
          true,
          0.5
        );
        yesText.on("pointerdown", function () {
          interactiveSwitch(playScreen, true);
          clearPlayScreen();
          playScreen.removeChild(pauseScreen);
          playScreen.visible = false;
          titleScreen.visible = true;
        });

        let noText = new PIXI.Text("no", Menustyle2);
        adjObj(
          noText,
          confirmExitScreen,
          appX + appWidth * 0.6,
          appY + appHeight * 0.5,
          true,
          0.5
        );
        noText.on("pointerdown", function () {
          interactiveSwitch(pauseScreen, true);
          pauseScreen.removeChild(confirmExitScreen);
        });
      });
      pauseScreen.addChild(exitButton);

      let exitText = new PIXI.Text("exit", Detailstyle);
      adjObj(
        exitText,
        exitButton,
        appX + appWidth * 0.62,
        appY + appHeight * 0.5,
        false,
        0.5
      );
    });

    textureSButton = PIXI.Texture.from("images/button/S.png");
    textureDButton = PIXI.Texture.from("images/button/D.png");
    textureKButton = PIXI.Texture.from("images/button/K.png");
    textureLButton = PIXI.Texture.from("images/button/L.png");

    texture_pressedSButton = PIXI.Texture.from("images/button/S_pressed.png");
    texture_pressedDButton = PIXI.Texture.from("images/button/D_pressed.png");
    texture_pressedKButton = PIXI.Texture.from("images/button/K_pressed.png");
    texture_pressedLButton = PIXI.Texture.from("images/button/L_pressed.png");

    SButton = new PIXI.Sprite(textureSButton);
    adjSprite(
      SButton,
      playScreen,
      appX + appWidth * 0.125,
      appY + appHeight * 0.925,
      appWidth * 0.25,
      appHeight * 0.15,
      true,
      0.5
    );
    SButton.on("pointerdown", function () {
      keys["83"] = true;
    });
    SButton.on("pointerup", function () {
      keys["83"] = false;
    });
    SButton.on("pointerout", function () {
      keys["83"] = false;
    });

    DButton = new PIXI.Sprite(textureDButton);
    adjSprite(
      DButton,
      playScreen,
      appX + appWidth * 0.375,
      appY + appHeight * 0.925,
      appWidth * 0.25,
      appHeight * 0.15,
      true,
      0.5
    );
    DButton.on("pointerdown", function () {
      keys["68"] = true;
    });
    DButton.on("pointerup", function () {
      keys["68"] = false;
    });
    DButton.on("pointerout", function () {
      keys["68"] = false;
    });

    KButton = new PIXI.Sprite(textureKButton);
    adjSprite(
      KButton,
      playScreen,
      appX + appWidth * 0.625,
      appY + appHeight * 0.925,
      appWidth * 0.25,
      appHeight * 0.15,
      true,
      0.5
    );
    KButton.on("pointerdown", function () {
      keys["75"] = true;
    });
    KButton.on("pointerup", function () {
      keys["75"] = false;
    });
    KButton.on("pointerout", function () {
      keys["75"] = false;
    });

    LButton = new PIXI.Sprite(textureLButton);
    adjSprite(
      LButton,
      playScreen,
      appX + appWidth * 0.875,
      appY + appHeight * 0.925,
      appWidth * 0.25,
      appHeight * 0.15,
      true,
      0.5
    );
    LButton.on("pointerdown", function () {
      keys["76"] = true;
    });
    LButton.on("pointerup", function () {
      keys["76"] = false;
    });
    LButton.on("pointerout", function () {
      keys["76"] = false;
    });

    scoreText = new PIXI.Text("0", Menustyle2);
    adjObj(
      scoreText,
      playScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.2,
      false,
      0.5
    );

    comboText = new PIXI.Text("0 combos", Menustyle2);
    adjObj(
      comboText,
      playScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.25,
      false,
      0.5
    );

    playing_accuracyText = new PIXI.Text("0%", Menustyle2);
    adjObj(
      playing_accuracyText,
      playScreen,
      appX + appWidth * 0.75,
      appY + appHeight * 0.05,
      false
    );

    hitTextS = new PIXI.Text();
    adjObj(
      hitTextS,
      playScreen,
      appX + appWidth * 0.125,
      appY + appHeight * 0.55,
      false,
      0.5
    );

    hitTextD = new PIXI.Text();
    adjObj(
      hitTextD,
      playScreen,
      appX + appWidth * 0.375,
      appY + appHeight * 0.55,
      false,
      0.5
    );

    hitTextK = new PIXI.Text();
    adjObj(
      hitTextK,
      playScreen,
      appX + appWidth * 0.625,
      appY + appHeight * 0.55,
      false,
      0.5
    );

    hitTextL = new PIXI.Text();
    adjObj(
      hitTextL,
      playScreen,
      appX + appWidth * 0.875,
      appY + appHeight * 0.55,
      false,
      0.5
    );

    perfectText = new PIXI.Text("PERFECT COMBO!!!", Headerstyle);
    adjObj(
      perfectText,
      playScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.3,
      false,
      0.5
    );

    hitTextS.visible = false;
    hitTextD.visible = false;
    hitTextK.visible = false;
    hitTextL.visible = false;
    perfectText.visible = false;

    //result screen
    let songText = new PIXI.Text("untiltled", Menustyle2);
    songText.fontWeight = "bold";
    adjObj(
      songText,
      resultScreen,
      appX + appWidth * 0.1,
      appY + appHeight * 0.05,
      false
    );

    let accuracyText = new PIXI.Text("accuracy 0%", Detailstyle);
    adjObj(
      accuracyText,
      resultScreen,
      appX + appWidth * 0.1,
      appY + appHeight * 0.1,
      false
    );

    let gradeTextStyle = new PIXI.TextStyle({
      fill: rainbowGradient,
      fillGradientType: 1,
      fontFamily: "Comic Sans MS",
      fontSize: 50,
      fontWeight: "bold",
    });

    let gradeText = new PIXI.Text("F", gradeTextStyle);
    adjObj(
      gradeText,
      resultScreen,
      appX + appWidth * 0.8,
      appY + appHeight * 0.1,
      false,
      0.5
    );

    let maxComboText = new PIXI.Text("0 combos", Detailstyle);
    adjObj(
      maxComboText,
      resultScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.25,
      false,
      0.5
    );

    let resultScoreText = new PIXI.Text(score, Detailstyle);
    adjObj(
      resultScoreText,
      resultScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.2,
      false,
      0.5
    );

    let perfectTapText = new PIXI.Text("perfect", Detailstyle);
    adjObj(
      perfectTapText,
      resultScreen,
      appX + appWidth * 0.1,
      appY + appHeight * 0.3,
      false
    );

    let goodTapText = new PIXI.Text("good", Detailstyle);
    adjObj(
      goodTapText,
      resultScreen,
      appX + appWidth * 0.6,
      appY + appHeight * 0.3,
      false
    );

    let badTapText = new PIXI.Text("bad", Detailstyle);
    adjObj(
      badTapText,
      resultScreen,
      appX + appWidth * 0.1,
      appY + appHeight * 0.35,
      false
    );

    let missTapText = new PIXI.Text("miss", Detailstyle);
    adjObj(
      missTapText,
      resultScreen,
      appX + appWidth * 0.6,
      appY + appHeight * 0.35,
      false
    );

    let performanceText = new PIXI.Text("Performance Graph", Menustyle2);
    adjObj(
      performanceText,
      resultScreen,
      appX + appWidth * 0.1,
      perfromanceGraphProp.y - appHeight * 0.1,
      false
    );

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
    adjObj(
      perfectPText,
      resultScreen,
      appX + appWidth * 0.1,
      perfromanceGraphProp.y + perfromanceGraphProp.height / 5,
      false,
      0.5
    );
    perfectPText.style.fontSize = 8;

    let goodText = new PIXI.Text("GOOD");
    adjObj(
      goodText,
      resultScreen,
      appX + appWidth * 0.1,
      perfromanceGraphProp.y + (perfromanceGraphProp.height * 2) / 5,
      false,
      0.5
    );
    goodText.style.fontSize = 8;

    let badText = new PIXI.Text("BAD");
    adjObj(
      badText,
      resultScreen,
      appX + appWidth * 0.1,
      perfromanceGraphProp.y + (perfromanceGraphProp.height * 3) / 5,
      false,
      0.5
    );
    badText.style.fontSize = 8;

    let missText = new PIXI.Text("MISS");
    adjObj(
      missText,
      resultScreen,
      appX + appWidth * 0.1,
      perfromanceGraphProp.y + (perfromanceGraphProp.height * 4) / 5,
      false,
      0.5
    );
    missText.style.fontSize = 8;

    let getBossCoinText = new PIXI.Text("Boss coin get : ", 0);
    adjObj(
      getBossCoinText,
      resultScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.8,
      false,
      0.5
    );

    let restartButton = new PIXI.Sprite.from("images/button/exit_button.png");
    adjSprite(
      restartButton,
      resultScreen,
      appX + appWidth * 0.5,
      appY + appHeight * 0.9,
      appWidth * 0.3,
      appHeight * 0.1,
      true,
      0.5
    );
    restartButton.on("pointerdown", function () {
      resultScreen.visible = false;
      titleScreen.visible = true;
      if (
        getTokenValue("normal ticket", "in_stock") <= 0 &&
        getTokenValue("premiem ticket", "in_stock") <= 0
      )
        startButton.interactive = false;
    });

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

    function keysDown(e) {
      keys[e.keyCode] = true;
    }

    function keysUp(e) {
      keys[e.keyCode] = false;
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
      accuracy = (accuracy_score / note_num).toFixed(2);
      playing_accuracyText.text = accuracy + "%";
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

    function adjObj(obj, parent, x, y, isbutton, anchor) {
      obj.anchor.set(anchor);
      obj.x = x;
      obj.y = y;
      obj.buttonMode = isbutton;
      obj.interactive = isbutton;
      parent.addChild(obj);
    }

    function adjSprite(obj, parent, x, y, width, height, isbutton, anchor) {
      obj.anchor.set(anchor);
      obj.x = x;
      obj.y = y;
      obj.width = width;
      obj.height = height;
      obj.buttonMode = isbutton;
      obj.interactive = isbutton;
      parent.addChild(obj);
    }

    function interactiveSwitch(screen, switchs) {
      screen.children.forEach((childObj) => {
        childObj.interactive = switchs;
      });
    }

    function clearPlayScreen() {
      if (noteType[0] === 1 || noteType[0] === 2) {
        playScreen.removeChild(noteS);
      }
      if (noteType[1] === 1 || noteType[1] === 2) {
        playScreen.removeChild(noteD);
      }
      if (noteType[2] === 1 || noteType[2] === 2) {
        playScreen.removeChild(noteK);
      }
      if (noteType[3] === 1 || noteType[3] === 2) {
        playScreen.removeChild(noteL);
      }
      noteType = [0, 0, 0, 0];
      noteAvailiable = [false, false, false, false];
    }

    function updateInventoryScreen() {
      let inventory_backButton = new PIXI.Text("BACK", Menustyle);
      adjObj(inventory_backButton, inventoryScreen, appX, appY, true);
      inventory_backButton.on("pointerdown", function () {
        inventoryScreen.visible = false;
        titleScreen.visible = true;
        inventoryScreen.removeChildren();
      });

      let currentItem = 0;
      inventory.forEach((item) => {
        if (item.in_stock > 0) {
          let itemImage = new PIXI.Sprite.from(item.path);
          adjSprite(
            itemImage,
            inventoryScreen,
            appX + appWidth * 0.1 + appWidth * 0.5 * (currentItem % 2),
            appY +
              appHeight * 0.1 +
              appHeight * 0.2 * Math.floor(currentItem / 2),
            appWidth * 0.3,
            appHeight * 0.15,
            true
          );
          itemImage.on("pointerdown", function () {
            interactiveSwitch(inventoryScreen, false);
            let descWindow = new PIXI.Container();
            inventoryScreen.addChild(descWindow);

            let descBorder = new PIXI.Graphics();
            descBorder.beginFill(0x000000);
            descBorder.drawRect(
              appX + appWidth * 0.095,
              appY + appHeight * 0.245,
              appWidth * 0.81,
              appHeight * 0.46
            );
            descWindow.addChild(descBorder);

            let descBG = new PIXI.Graphics();
            descBG.beginFill(0x74ccf4);
            descBG.drawRect(
              appX + appWidth * 0.1,
              appY + appHeight * 0.25,
              appWidth * 0.8,
              appHeight * 0.45
            );
            descWindow.addChild(descBG);

            let descClose = new PIXI.Text("X", Menustyle2);
            adjObj(
              descClose,
              descWindow,
              appX + appWidth * 0.84,
              appY + appHeight * 0.25,
              true
            );
            descClose.on("pointerdown", function () {
              descWindow.removeChildren();
              inventoryScreen.removeChild(descWindow);
              interactiveSwitch(inventoryScreen, true);
            });

            let descName = new PIXI.Text(item.name, Menustyle2);
            adjObj(
              descName,
              descWindow,
              appX + appWidth * 0.5,
              appY + appHeight * 0.3,
              false,
              0.5
            );

            let descText = new PIXI.Text(item.desc, {
              dropShadowAngle: 0.5,
              fontFamily: "Courier New",
              fontSize: normalFontSize,
              wordWrap: true,
              wordWrapWidth: appWidth * 0.7,
            });
            adjObj(
              descText,
              descWindow,
              appX + appWidth * 0.15,
              appY + appHeight * 0.35,
              false
            );

            let itemType = item.type;

            if (itemType === "bg") {
              let useButton = new PIXI.Text("USE", Menustyle2);
              adjObj(
                useButton,
                descWindow,
                appX + appWidth * 0.5,
                appY + appHeight * 0.65,
                true,
                0.5
              );

              if (equiping[0].details === item.name) {
                useButton.text = "USED";
                useButton.interactive = false;
              }

              useButton.on("pointerdown", function () {
                if (itemType === "bg") {
                  equiping[0].details = item.name;
                  let textureBG = new PIXI.Texture.from(item.path);
                  leftBG.texture = textureBG;
                  rightBG.texture = textureBG;
                  useButton.text = "USED";
                  useButton.interactive = false;
                }
              });
            }
          });

          let itemValue = new PIXI.Text(item.in_stock, Menustyle2);
          adjObj(
            itemValue,
            inventoryScreen,
            appX + appWidth * 0.25 + appWidth * 0.5 * (currentItem % 2),
            appY +
              appHeight * 0.275 +
              appHeight * 0.2 * Math.floor(currentItem / 2),
            false,
            0.5
          );

          currentItem++;
        }
      });
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
        ticker_count % Math.floor(200 / speed) === 0 &&
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
            if (noteS.y < appY + appHeight + noteS.height)
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
            if (noteD.y < appY + appHeight + noteD.height)
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
            if (noteK.y < appY + appHeight + noteK.height)
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
            if (noteL.y < appY + appHeight + noteL.height)
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
      } else if (
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
        if (
          !isIntersect(button, note_end) &&
          noteAvailiable[channel] === false
        ) {
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
    return () => {
      console.log("cleaned up");
    };
  },[]);

  return <div>
  </div>;
}

export default Game;
