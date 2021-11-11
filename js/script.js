

        var targetMenu = document.querySelector(".targetMenu");
        var onTaget = document.querySelectorAll(".targetMenu ul li");
        var section = document.querySelectorAll("section");
        var sectionCounter = 0; 
        var offset = 0;
        var count=0;       
        document.addEventListener('wheel', scrollAni);
        window.addEventListener('load', activeMenu);
        targetMenu.addEventListener('click', gosection);

        function scrollAni(e){
            
            count++;
            var gosectioncount = count%7; // 스크롤을 5번 굴리면 이동.
            if(e.wheelDelta<0){
                if(gosectioncount == 0 && sectionCounter<5)sectionCounter++;
            }else{
                if(gosectioncount == 0 && sectionCounter>0)sectionCounter--;
            }
            
            offset = innerHeight*sectionCounter;

            $("html, body").stop().animate({scrollTop:offset},600,"easeInOutExpo");

            setTimeout(activeMenu,300);
            onTargetMenu();

        }

        function activeMenu(){
            section.forEach(function(ele){ele.classList.remove("active");});
            section[sectionCounter].classList.add("active");
        }

        function gosection(e){ //menu 클릭시 이동.
            sectionCounter = Number(e.target.getAttribute("datanum"));
            offset = innerHeight*sectionCounter;
            $("html, body").stop().animate({scrollTop:offset},600,"easeInOutExpo");
            setTimeout(activeMenu,300);
            onTargetMenu();
        }

        function onTargetMenu(){
            onTaget.forEach(function(menu){
                menu.children[0].classList.remove("on");
            });
            onTaget[sectionCounter].children[0].classList.add("on");
        }

        // 스크롤 막기 시작
        $('html, body').css({'overflow': 'hidden', 'height': '100%'});
        $('#element').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
        });
        //스크롤 막기 끝

        //차트
        $('.skillchart').click(
            function(){
                $(this).easyPieChart({
                    barColor: '#69f',
                    trackColor: '#ccc',
                    scaleColor: '#fff',
                    lineCap: 'butt',
                    lineWidth: 10,
                    size: 100,
                    animate: 1000
                });
                var jumsu = $(this).attr('data-percent');
                $(this).children().children('.jumsu').html(jumsu);
            }
        );

        /* 겔러리 슬라이드 */

        var gall = document.querySelector(".gallZone1");
        gall.addEventListener('mouseover', goSlide);

        var gall2 = document.querySelector(".gallZone2");
        gall2.addEventListener('mouseover', goSlide2);

        var imgWidth;
        var gallMove;
        var gallZone;
        var interval;
        var arrow;
        var aniStartPoint;
        var aniEndPoint;
        var gcount = 0;
        var slideon = "on";
        var gslidenum; //슬라이드 갯수

        function goSlide(){
            imgWidth = gall.childNodes[1].children[0].clientWidth; //#galleryZone li 첫번째 li선택
            gallMove = gall.childNodes[1]; //#galleryZone ul
            gallZone = gall.querySelectorAll("img");
            arrow = gall.getElementsByClassName("arrow");
            arrow[0].addEventListener("click",left);
            arrow[1].addEventListener("click",go);
            gslidenum = 3; // 슬라이드 갯수
                 
            gallZone.forEach((e)=>{e.addEventListener('mouseover',stop)});
            gallZone.forEach((e)=>{e.addEventListener('mouseout',start)});

           
        }

        function goSlide2(){
            imgWidth = gall2.childNodes[1].children[0].clientWidth; //#galleryZone li 첫번째 li선택
            gallMove = gall2.childNodes[1]; //#galleryZone ul
            gallZone = gall2.querySelectorAll("img");
            arrow = gall2.getElementsByClassName("arrow");
            arrow[0].addEventListener("click",left);
            arrow[1].addEventListener("click",go);
            gslidenum = 5; // 슬라이드 갯수
                 
            gallZone.forEach((e)=>{e.addEventListener('mouseover',stop)});
            gallZone.forEach((e)=>{e.addEventListener('mouseout',start)});
        }


        function start(){
            interval = setInterval(go, 3000); //3초에 한번씩 슬라이드 진행
            arrow[0].style.opacity = "0";
            arrow[1].style.opacity = "0";
        }

        function go(){
            if(slideon == "on"){

                slideon = "off";

                if(gcount == gslidenum) gcount = 0; //gslidenum 슬라이드 이미지 갯수에 맞게 현재는 5

                aniStartPoint = -imgWidth * gcount;
                gcount++;
                aniEndPoint = -imgWidth * gcount;

                goAni();
            }
        }

        function left(){
            if(slideon == "on"){

                slideon = "off";

                if(gcount == 0) gcount = gslidenum; //gslidenum 슬라이드 이미지 갯수에 맞게 현재는 5

                aniStartPoint = -imgWidth * gcount;
                gcount--;
                aniEndPoint = -imgWidth * gcount;

                goAni();
            }
        }

        function goAni(){
            var ani = gallMove.animate([
                {
                    transform:"translateX(" + aniStartPoint + "px)"
                },{
                    transform:"translateX(" + aniEndPoint + "px)"
                }
            ],1000);

            ani.addEventListener('finish',function(){
                gallMove.style.transform = "translateX(" + aniEndPoint + "px)";
                slideon = "on";
            });
        }

        function stop(){
            clearInterval(interval);
            arrow[0].style.opacity = "0.3";
            arrow[1].style.opacity = "0.3";
        }