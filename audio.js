window.onload = function() {
	$(function() {
		
		/*function getResourse() {
			$.get('songs.json', function(data) {
				var a1 = data.songs;
				return a1;
			});
		}
		var songs = getResourse();
		console.log(songs);*/
		
		var songs = ['G.E.M. 邓紫棋 - 喜欢你','Take Me To Your Heart','TFBOYS - 大梦想家','邓超 - 超级英雄','金志文 - 夏洛特烦恼','李易峰 - 年少有你','莫文蔚 - 阴天','张碧晨 - 年轮','张靓颖 - 终于等到你','周杰伦 - 算什么男人'];
		var oAudio = document.getElementById('music');
		var isPlay = false;
		var pattern = 0;  //循环模式   0--顺序播放   1--单曲循环  2 --随机播放		
		var len = songs.length;
		var	index = 0;  //当前播放歌曲的索引
		
		//显示歌曲名
		$('#song_name').text(songs[index]);
		
		
		//播放暂停
		$('#playOrPause').on('click', function() {
			if (!isPlay) {
				oAudio.play();
				$(this).html('&#xe602;');
			} else {
				oAudio.pause();
				$(this).html('&#xe7c3;');
			}
			isPlay = !isPlay;
		});
		
		//开始自动播放歌曲
		$('#playOrPause').trigger('click');
		
		//声音
		var volumeRange = 0.5;
		$('#volumeRange').val(volumeRange);
		var isVolume = true;
		$('#volume').on('click', function() {
			if (isVolume) {
				$(this).attr('src', 'img/novol.png');
				oAudio.volume = 0;
			} else {
				$(this).attr('src', 'img/vol.png');
				oAudio.volume = volumeRange;
			}
			isVolume = !isVolume;
		});
		
		//切换音量
		$('#volumeRange').on('input', function() {
			volumeRange = Number($(this).val());
			console.log(volumeRange);
			if(volumeRange === 0) {
				$('#volume').attr('src', 'img/novol.png');
			} else {
				$('#volume').attr('src', 'img/vol.png');
			}
			oAudio.volume = volumeRange;
		});
		
		//播放进度
		var allTime = Math.ceil(oAudio.duration);
		var min = parseInt(allTime / 60),
			sec = allTime % 60;
		min = min.toString().length > 1 ? min : '0' + min;
		sec = sec.toString().length >1 ? sec : '0' + sec;
					
		$('#allTime').text(min + ':' + sec);
		$('#playRange').attr('max', allTime);
		
		function playtime() {
			var currTime = Math.ceil(oAudio.currentTime);
			var _min = parseInt(currTime / 60),
				_sec = currTime % 60;
			_min = _min.toString().length > 1 ? _min : '0' + _min;
			_sec = _sec.toString().length > 1 ? _sec : '0' + _sec;
			$('#currTime').text(_min + ':' + _sec);
			$('#playRange').val(currTime);
			
			//判断当前音乐是否播放完成
			var isEnded = oAudio.ended;
			if (isEnded) {
				//顺序播放
				if (pattern === 0) {
					$('#next').trigger('click');
				} else if (pattern === 1) { //单曲循环
					index--;
					$('#next').trigger('click');
				} else {
					index = parseInt(Math.random() * len);
					$('#next').trigger('click');
				}
			}
		}
		
		oAudio.addEventListener('timeupdate', playtime);
		
		$('#playRange').on('touchstart', function() {
			oAudio.removeEventListener('timeupdate', playtime);
			$(this).on('touchend', function() {
				console.log(11111);
				oAudio.currentTime = $(this).val();
				oAudio.addEventListener('timeupdate', playtime);
			});
		});
		
		
		
		//播放上一首
		$('#prev').on('click', function() {
			index--;
			index = index <= 0 ? len - 1 : index;
			$('#song_name').text(songs[index]);
			$('#music').attr('src', 'music/' + songs[index] + '.mp3');
			isPlay = false;
			playtime();
			setTimeout(function() {
				$('#playOrPause').trigger('click');
			}, 1000);
		});
		
		//播放下一首
		$('#next').on('click', function() {
			index++;
			index = index >= len ? 0 : index;
			$('#song_name').text(songs[index]);
			$('#music').attr('src', 'music/' + songs[index] + '.mp3');
			isPlay = false;
			playtime();
			setTimeout(function() {
				$('#playOrPause').trigger('click');
			}, 1000);
		});
		
		
		//切换循环模式		
		$('#loopPattern').on('click', function() {
			pattern++;
			pattern = pattern > 2 ? 0 : pattern;			
			if (pattern === 0) {
				$(this).html('&#xe63b;');
			} else if (pattern === 1) {
				$(this).html('&#xe62f;');
			} else if (pattern === 2) {
				$(this).html('&#xe6f1;');
			}
		});
		
		
	});
}
