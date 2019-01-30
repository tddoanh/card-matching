const numCard = 16;
        const cardType = ['html-icon','nc-icon','js-icon','css-icon'];
        let cardList = document.querySelectorAll('.card');
        
        let prevCard = null;
        let openedCard = 0;
        let move = 0;
        let win = 0;
        let second = 0;


        cardList.forEach(function (card) {
            card.addEventListener('click', function () {
                openedCard++;
                if (openedCard <= 2) {
                    //Mo card
                    this.classList.add(this.dataset.type);
                    //Kiem tra neu 2 card duoc mo
                    if (openedCard == 2) {
                        if (prevCard.dataset.type == this.dataset.type) {
                            openedCard = 0;
                            win++;
                            if (win == numCard / 2) {
                                clearInterval(timerID);
                                setTimeout("alert('congratulation')", 1000);
                            }
                        }
                        else//unmatched
                        {
                            setTimeout(fold, 1000, prevCard, this);
                        }
                        //Tang so luot test
                        move++;
                        document.querySelector('#move span').innerHTML = move;
                    }
                }
                prevCard = this;

            })
        })

        function fold(...cards) {
            cards.forEach(function (c) {
                c.classList.remove(c.dataset.type);
            });
            openedCard = 0;
        }
        //Random card
        (function()
        {
            let numType = cardType.length;
            let cardProceed = [0,0,0,0];
            for(let i = 0; i < numCard/2; i++)
            {
                //Random type
                let type = Math.floor(Math.random()* numType);
                for(j = 0; j < 2;j++)
                {
                    //Tim card con trong
                    do{
                        var pos = Math.floor(Math.random()* numCard);
                    }while(cardProceed[pos] == 1 );
                    //Gan data cho card
                    cardList[pos].dataset.type=cardType[type];
                    cardProceed[pos] = 1;
                    console.log(pos);
                }
                console.log(cardType[type]);
            }
        })();

        //Timer
        function tick() {
            second++;
            let m = Math.floor(second / 60);
            let s = second % 60;
            if (m < 10) m = '0' + m;
            if (s < 10) s = '0' + s;
            document.querySelector('#timer').innerHTML = m + ' : ' + s;
        }
        let timerID = setInterval(tick,1000);