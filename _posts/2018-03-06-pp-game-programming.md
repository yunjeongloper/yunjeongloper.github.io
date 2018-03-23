---
layout: post
title: 자바스크립트 게임 <Produce University> - 팀 프로젝트
tags: [portpolio, javascript, game]
---

- 프로젝트 기간 : 2017.05 - 2017.07
- 사용 언어 및 프레임워크 : JS, Phaser.io
- OS 및 DB : Window, WinSP
- [프로젝트 github 링크](https://github.com/yunjeongloper/portfolio/tree/master/02.gamework)
- 프로젝트 소개 : 15개의 질문에 두 가지의 선택지가 주어지고 선택한 카드에 따라 사랑, 돈, 스펙 세 가지의 능력치가 조절되며 게임이 진행됩니다.

삼육대학교 컴퓨터학부 게임 프로그래밍 팀 프로젝트입니다. Canvas와 WebGL을 위한 오픈소스 프레임워크 [Phaser](https://phaser.io/)을 사용하였습니다. 디자인 외의 **전체 게임 구현을 담당**하였습니다.


> 원작 게임 <br />
[Reigns_나무위키](https://namu.wiki/w/Reigns)<br />

자바스크립트를 모르는 상태였지만 수작업으로 코드를 복붙하고 수정해서 과제를 제출할 수 있었습니다.
이 외에도 phaser 프레임워크를 이용해서 간단한 점프 게임과 비행 게임, shooting 게임을 토이 프로젝트로 진행하였습니다. 프레임워크를 이용하면서 특히 흥미로웠던 부분은 **Sprites**입니다. Sprites는 어떤 무겁게 하거나 가볍게 하는것(중력), 객체를 돌리고, 늘리고 하는 연산을 지원하는 기능입니다. raw한 값들까지 직접 조절하여 만든 게임이기에 더 애정이 생겼고, 성취감도 배로 느낄 수 있었습니다.

게임을 즐기기만 하다가 이렇게 만들어보니 게임이 더 좋아졌습니다. 또한 javascript의 직관적이고 간편한 특성을 경험할 수 있었습니다.

## 실행 화면
<center>
<img src="{{ "/assets/img/game.jpg" | absolute_url }}" alt="" width="47%"/>
<img src="{{ "/assets/img/game2.jpg" | absolute_url }}" alt="" width="47%"/>
</center>

## Source Code Example (부분만 발췌)

```
BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

	preload: function() {
    //필요한 assets 여기서 load함
		this.load.image('spring', 'assets/Spring.jpg');
		this.load.image('moneylow','assets/e1.png');
		this.load.audio('bgsound','assets/shiningstar.m
		this.load.audio('flipsound','assets/flipsound.wav');
	},

	create: function () {
		// 시작 시 화면 세팅
		this.setupBackground();
		this.q0_card1();
		this.choice=new Array();

		this.flipsound=this.add.audio('flipsound');

		// 마우스 커서 활성화
		this.cursors = this.input.keyboard.createCursorKeys();

		// 중력??? 활성화
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.govertxt = { font: "34px Hanna", fill:'#212121',align: "center"};

	},

	update: function () {
		// 카드는 좌,우로만 움직일수 있게 함
		this.input.activePointer.y = 400;
		this.card.rotation.x = this.physics.arcade.moveToPointer(this.card, 60, this.input.activePointer, 500);
		//커서를 오른쪽으로 움직였을 시 선택지(textno) 떠오르게 함
		if(this.textno.x<550)
			this.textno.visible=false;
		else
			this.textno.visible=true;
		this.textno.x = Math.floor(this.card.x/1.3 + this.card.width/1.2);
		this.textno.y = Math.floor(this.card.y/4 + this.card.height/1.1);
		//커서를 왼쪽으로 움직였을 시 선택지(textyes) 떠오르게 함
		if(this.textyes.x>250)
			this.textyes.visible=false;
		else
			this.textyes.visible=true;
		this.textyes.x = Math.floor(this.card.x/2+ this.card.width/5);
		this.textyes.y = Math.floor(this.card.y/4 + this.card.height/1.1);

		// normal ending 검사
		if(this.loveval<=0||this.loveval>=100||this.moneyval<=0||this.moneyval>=100||this.specval<=0||this.specval>=100){
			this.endingImage();
		}
	},

  // 수치에 따른 게임 엔딩 설정
	endingImage: function(){
		if(this.loveval<=0){
			this.ending=this.add.sprite(this.game.width / 2, 300, 'lovelow');
			this.end = this.game.add.text(this.game.width / 2, 470, "사랑이 부족한 당신은..GAVE OVER\nF5로 재시작 해주세요", this.govertxt);
			this.end.anchor.set(0.5, 0.5);
		}
		else if(this.loveval>=100){
			this.ending=this.add.sprite(this.game.width / 2, 300, 'lovehigh');
			this.end = this.game.add.text(this.game.width / 2, 470, "사랑이 너무나 넘쳐버린 당신은..GAVE OVER\nF5로 재시작 해주세요", this.govertxt);
			this.end.anchor.set(0.5, 0.5);
		}
		this.ending.anchor.setTo(0.5, 0.5);
		this.game.world.remove(this.textno);
		this.game.world.remove(this.textyes);
		this.card.kill();
		music.stop();
		normalend=this.add.audio('normalbgm');
		normalend.play();
		this.game.input.mouse.enabled = false;
	},

	flip_ani: function(){
		var tween1 = this.game.add.tween(this.card.scale);
	    tween1.to({ x: 0 }, 300, Phaser.Easing.Linear.None, false, 0);
	    tween1.onComplete.addOnce(function (sprite, tween) {
			if(this.card.frame == 0)
	            this.card.frame = 1;
		    else
		        this.card.frame = 0;
	    }, this);
	    var tween2 = this.game.add.tween(this.card.scale);
	    tween2.to({ x: 1 }, 300, Phaser.Easing.Linear.None, false, 0);
	    tween1.chain(tween2);
	    tween1.start();
	},


	/**********************************************************************************/
	q0_card1: function() {
		this.card = this.add.sprite(this.game.width / 2, 400, 'q0_card1');
		this.card.anchor.setTo(0.5, 0.5);
		this.card.frame = 0;
		this.game.input.onDown.add(this.flipCard0_1, this);

		this.physics.enable(this.card, Phaser.Physics.ARCADE);
		this.card.speed = BasicGame.PLAYER_SPEED;
		this.card.body.collideWorldBounds = true;

		this.style = { font: "23px Hanna",fontStyle:'italic', fill:'#000000', wordWrap: true, wordWrapWidth: this.card.width, align: "center"};
		this.style_q = { font: "25px Hanna", fill:'#212121',backgroundColor:'#D5D5D5',wordWrap: true, wordWrapWidth: this.card.width, align: "center"};

		this.textyes = this.game.add.text(0, 0, "???", this.style);
		this.textyes.anchor.set(0.5);
		this.textno = this.game.add.text(0,0, "누구세요?", this.style);
		this.textno.anchor.set(0.5);

		this.question = this.game.add.text(this.game.width/2, 190, "ㅇㅇ대학교 입학을 정말 축하해!\n나는 네가 정말 자랑스러워", this.style_q);
		this.question.anchor.set(0.5);
	},
	flipCard0_1: function () {
		this.flip_ani();
		this.flipsound.play();
		this.game.world.remove(this.question);
		this.game.world.remove(this.textno);
		this.game.world.remove(this.textyes);
		this.game.time.events.add(Phaser.Timer.SECOND * 0.8, this.cardkill0_1, this);
	},
	cardkill0_1: function(){
		this.card.kill();
		this.q0_card2();
		//this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.q0_card2, this);
	},

	q0_card2: function() {
		this.card = this.add.sprite(this.game.width / 2, 400, 'q0_card1');
		this.card.anchor.setTo(0.5, 0.5);
		this.card.frame = 0;
		this.game.input.onDown.add(this.flipCard0_2, this);

		this.physics.enable(this.card, Phaser.Physics.ARCADE);
		this.card.speed = BasicGame.PLAYER_SPEED;
		this.card.body.collideWorldBounds = true;

		this.style = { font: "23px Hanna",fontStyle:'italic', fill:'#000000', wordWrap: true, wordWrapWidth: this.card.width, align: "center"};
		this.style_q = { font: "25px Hanna", fill:'#212121',backgroundColor:'#D5D5D5',wordWrap: true, wordWrapWidth: this.card.width, align: "center"};

		this.textyes = this.game.add.text(0, 0, "내가 ㅇㅇ대학교\n학생?", this.style);
		this.textyes.anchor.set(0.5);
		this.textno = this.game.add.text(0,0, "누구세요?", this.style);
		this.textno.anchor.set(0.5);

		this.question = this.game.add.text(this.game.width/2, 190, "무슨소리야! 아직도 정신을 못차렸니?\n내일부터는 대학생이라구!", this.style_q);
		this.question.anchor.set(0.5);
	},
	flipCard0_2: function () {
		this.flip_ani();
		this.game.world.remove(this.question);
		this.game.world.remove(this.textno);
		this.game.world.remove(this.textyes);
		this.game.time.events.add(Phaser.Timer.SECOND * 0.8, this.cardkill0_2, this);
	},
	cardkill0_2: function(){
		this.card.kill();
		this.q0_card3();
	},

	q0_card3: function() {
		this.card = this.add.sprite(this.game.width / 2, 400, 'q0_card1');
		this.card.anchor.setTo(0.5, 0.5);
		this.card.frame = 0;
		this.game.input.onDown.add(this.flipCard0_3, this);

		this.physics.enable(this.card, Phaser.Physics.ARCADE);
		this.card.speed = BasicGame.PLAYER_SPEED;
		this.card.body.collideWorldBounds = true;

		this.style = { font: "23px Hanna",fontStyle:'italic', fill:'#000000', wordWrap: true, wordWrapWidth: this.card.width, align: "center"};
		this.style_q = { font: "20px Hanna", fill:'#212121',backgroundColor:'#D5D5D5',wordWrap: true, wordWrapWidth: this.card.width, align: "center"};

		this.textyes = this.game.add.text(0, 0, "이렇게\n하는건가?", this.style);
		this.textyes.anchor.set(0.5);
		this.textno = this.game.add.text(0,0, "누구세요?", this.style);
		this.textno.anchor.set(0.5);

		this.question = this.game.add.text(this.game.width/2, 190, "너는 앞으로 많은 문제에 부딪히게 될거야 그 문제에 어떻게 대답하느냐에 따라서 네 인생이 바뀔거라구!", this.style_q);
		this.question.anchor.set(0.5);
	},
	flipCard0_3: function () {
		this.flip_ani();
		this.game.world.remove(this.question);
		this.game.world.remove(this.textno);
		this.game.world.remove(this.textyes);
		this.game.time.events.add(Phaser.Timer.SECOND * 0.8, this.cardkill0_3, this);
	},
	cardkill0_3: function(){
		this.card.kill();
		this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.q0_card4, this);
	},

	q0_card4: function() {
		this.card = this.add.sprite(this.game.width / 2, 400, 'q0_card1');
		this.card.anchor.setTo(0.5, 0.5);
		this.card.frame = 0;
		this.game.input.onDown.add(this.flipCard0_4, this);

		this.physics.enable(this.card, Phaser.Physics.ARCADE);
		this.card.speed = BasicGame.PLAYER_SPEED;
		this.card.body.collideWorldBounds = true;

		this.style = { font: "23px Hanna",fontStyle:'italic', fill:'#000000', wordWrap: true, wordWrapWidth: this.card.width, align: "center"};
		this.style_q = { font: "25px Hanna", fill:'#212121',backgroundColor:'#D5D5D5',wordWrap: true, wordWrapWidth: this.card.width, align: "center"};

		this.textyes = this.game.add.text(0, 0, "드디어\n시작인가!", this.style);
		this.textyes.anchor.set(0.5);
		this.textno = this.game.add.text(0,0, "누구세요?", this.style);
		this.textno.anchor.set(0.5);

		this.question = this.game.add.text(this.game.width/2, 190, "정말 잘했어! 그럼 이제부터 ㅇㅇ대학교 학생으로서 열심히 지내보라구!", this.style_q);
		this.question.anchor.set(0.5);
	},
	flipCard0_4: function () {
		this.flip_ani();
		this.game.world.remove(this.question);
		this.game.world.remove(this.textno);
		this.game.world.remove(this.textyes);
		this.game.time.events.add(Phaser.Timer.SECOND * 0.8, this.cardkill0_4, this);
	},
	cardkill0_4: function(){
		this.card.kill();
		this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.q1_card1, this);
	},

	/**********************************************************************************/

};

```
