 let swiperExample = new Swiper('.swiper-container', {
     direction: 'horizontal', //=>'vertical'
     loop: true,
     effect: 'coverflow', //=>"cube"、"fade"、"coverflow"、"flip"
     pagination: '.swiper-pagination',
     paginationType: 'progress',
     on: {
        init: pageMove,
        transitionEnd: pageMove
    }
 });
 function pageMove() {
     //=>this:swiperExample
     let activeIndex = this.activeIndex,
         slides = this.slides;
     //=>给当前页面设置ID，让其内容有动画效果
     [].forEach.call(slides, (item, index) => {
         if (index === activeIndex) {
             activeIndex === 0 ? activeIndex = 7 : null;
             activeIndex === 8 ? activeIndex = 1 : null;
             item.id = 'page' + activeIndex;
             return;
         }
         item.id = null;
     });
 }
 /* ==音乐的处理== */
function handleMusic() {
	let $musicAudio = $('.musicAudio'),
		musicAudio = $musicAudio[0],
		$musicIcon = $('.musicIcon');

	$musicAudio.on('canplay', function () {
		$musicIcon.css('display', 'block')
			.addClass('move');
	});

	$musicIcon.tap(function () {
		if (musicAudio.paused) {
			//=>当前暂停状态
			play();
			$musicIcon.addClass('move');
			return;
		}
		//=>当前播放状态
		musicAudio.pause();
		$musicIcon.removeClass('move');
	});

	function play() {
		musicAudio.play();
		document.removeEventListener("touchstart", play);
	}
	play();

	//=>兼容处理
	document.addEventListener("WeixinJSBridgeReady", play);
	document.addEventListener("YixinJSBridgeReady", play);
	document.addEventListener("touchstart", play);
}
setTimeout(handleMusic, 1000);
/* ==第六页轮播如处理== */
let $page6=$('.page6'),
    $right=$page6.find('.right'),
    $box=$right.children('.box'),
    $leftBtn=$box.children('.imgBtn1'),
    $rightBtn=$box.children('.imgBtn2'),
    $imgBox=$box.children('.imgBox'),
    $item=$imgBox.children('.item');
    let step=0;
function handleArrow() {
        $rightBtn.tap(function(){
            step++;
            step>=3?step=0:null;
            $item.css('left', -step * 4+'rem');
        });
        //给回退按钮绑定点击事件
        $leftBtn.tap(function () {
            step--;
            step<0?step=2:null;
            $item.css('left', -step * 4+'rem');
        })
}
handleArrow();