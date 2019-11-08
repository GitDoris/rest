//打点事件
$(function () {

	$("#markPullImg").click(function () {
		//图标改变
		if ($("#markPullImg img").attr("src") == "image/pull_up.png") {
			$("#markPullImg img").attr("src", "image/pull_down.png");
			//显示打点文本提示列表
			$("#markList").hide();
			$("#markInput").focus();
			$("#markInput").removeClass("active");
		} else {
			$("#markPullImg img").attr("src", "image/pull_up.png");
			$("#markList").show();
			$("#markInput").addClass("active");
		}
	}).mouseover(function () {
		this.style.cursor = 'pointer';
	});
	// $("#markList li").mouseover(function(){
	// 	$(this).addClass("active");
	// }).mouseleave(function(){
	// 	$(this).removeClass("active");
	// });
})

function checkList(item, tag) {
	$(item).addClass('active').siblings().removeClass('active')
	if (tag == 0) {
		$('#onlineNotSee').show()
		$('#onlineNotSee').prev().css('width', '12%')
		$('#onlineNotSee').prev().prev().css('width', '12%')
		showAllList()
	} else {
		AJAX.getPage(function (data) {
			onlineList = data.data.list
			// getAllVideoList(onlineList);
			$(".list_all_items").remove();

			//复制一份list出来进行数据过滤并放进模板循环展示
			// var onlineCopy=onlineList
			// console.log("gang",onlineList,onlineCopy)

			if (onlineList && onlineList != "" && onlineList != null) {
				$("#localListContainer").hide()
				$("#table_list_container").show()
				var onlineLength = onlineList.length;
				for (var i = 0; i < onlineLength; i++) {
					onlineList[i].videoName = onlineList[i].videoName;

					onlineList[i].videoTime = parseInt(onlineList[i].videoTime / 1000);


					// onlineList[i].videoSize = filter((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1);
					// if (parseInt(onlineList[i].videoSize) > 0) {
					//     onlineList[i].videoSize = filter((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1) + "M";
					// } else {
					//     onlineList[i].videoSize = filter((parseInt(onlineList[i].videoSize) / 1024), 1) + "K";
					// }
					var fs = decimal((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1);
					if (parseInt(fs) > 0) {
						fs = decimal((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1) + "M";
					} else {
						fs = decimal((parseInt(onlineList[i].videoSize) / 1024), 1) + "K";
					}
					onlineList[i].videoSize = fs

				}

				var opj = {};
				opj.item = onlineList

				console.log('处理过的数据', onlineList)
				console.log(onlineList, 'copy')
				$("#table_list_container").append(template('onlineList', opj));
				$('#onlineNotSee').hide()
				$('#onlineNotSee').siblings().css('width', '20%')

			} else {
				$("#localListContainer").show()
				$("#table_list_container").hide()

			}
		})

	}


}
// 点击显示列表
function showAllList() {
	if (g_startRecord) {
		alertLayer("视频录制中不可查看视频列表!");
		return;
	}
	if (g_playbacking) {
		alertLayer("播放中不可查看视频列表!");
		return;
	}
	if (g_uploading) {
		alertLayer("视频上传中,请稍后操作！");
		return;
	}

	if (g_init) {
		$('#checkList span').eq(0).show()
		$('#onlineNotSee').show()
		g_getAll_videfile_list = CRVideo_GetAllRecordFiles();
		console.log('视频列表', g_getAll_videfile_list)
		getAllVideoList(g_getAll_videfile_list);
		$(".full_page").css("display", "block");
		$(".list_container").css("display", "block");
		videoContainerHide();
	}
	else {

		$('#checkList span').eq(0).hide()
		AJAX.getPage(function (data) {
			$(".full_page").css("display", "block");
			$(".list_container").css("display", "block");
			onlineList = data.data.list
			// getAllVideoList(onlineList);
			$(".list_all_items").remove();

			//复制一份list出来进行数据过滤并放进模板循环展示
			// var onlineCopy=onlineList
			// console.log("gang",onlineList,onlineCopy)

			if (onlineList && onlineList != "" && onlineList != null) {
				$("#localListContainer").hide()
				$("#table_list_container").show()
				var onlineLength = onlineList.length;
				for (var i = 0; i < onlineLength; i++) {
					onlineList[i].videoName = onlineList[i].videoName;

					onlineList[i].videoTime = parseInt(onlineList[i].videoTime / 1000);

					var fs = decimal((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1);
					if (parseInt(fs) > 0) {
						fs = decimal((parseInt(onlineList[i].videoSize) / 1024 / 1024), 1) + "M";
					} else {
						fs = decimal((parseInt(onlineList[i].videoSize) / 1024), 1) + "K";
					}
					onlineList[i].videoSize = fs

				}

				var opj = {};
				opj.item = onlineList

				$("#table_list_container").append(template('onlineList', opj));
				$('#onlineNotSee').hide()
				$('#onlineNotSee').siblings().css('width', '20%')

			} else {
				$("#localListContainer").show()
				$("#table_list_container").hide()

			}
		})
	}

}
function getAllVideoList(list) {
	//$("#table_list_container").remove(".list_all_items")
	$(".list_all_items").remove();

	//复制一份list出来进行数据过滤并放进模板循环展示
	var listCopy = list
	if (list && list != "" && list != null) {
		$("#localListContainer").hide()
		$("#table_list_container").show()

		var reg = new RegExp("^" + slideInformation.contractId)
		for (var i = listCopy.length - 1; i >= 0; i--) { //var i=0;i< listLength; i++

			if (!reg.test(listCopy[i].fileName)) {
				listCopy.splice(i, 1)
			} else {
				var listState = "";
				listCopy[i].listName = list[i].fileName;
				listCopy[i].duration = parseInt(list[i].duration / 1000);
				if (list[i].state == 0) {
					listCopy[i].listState = "未上传";
					//str1 = "<span class=\"table_up_del_rec\" onclick=\"uploadFile("+ i +")\">上传</span>"
				} else if (list[i].state == 1) {
					listCopy[i].listState = "上传中";
					//str1 = "";
				} else if (list[i].state == 2) {
					listCopy[i].listState = "已上传";
					//str1 = "";
				}
				listCopy[i].fileSize = decimal((parseInt(listCopy[i].size) / 1024 / 1024), 1);
				if (parseInt(listCopy[i].fileSize) > 0) {
					listCopy[i].fileSize = decimal((parseInt(listCopy[i].size) / 1024 / 1024), 1) + "M";
				} else {
					listCopy[i].fileSize = decimal((parseInt(listCopy[i].size) / 1024), 1) + "K";
				}
			}
		}

		var obj = {};
		obj.item = listCopy
		obj.id = slideInformation.contractId
		console.log(listCopy, 'copy')
		$("#table_list_container").append(template('localList', obj));

	} else {
		$("#localListContainer").show()
		$("#table_list_container").hide()
	}
}
function closelistPage() {
	$('#checkList span').eq(0).addClass('active').siblings().removeClass('active')
	$(".full_page").css({ "display": "none" });
	$(".list_container").css({ "display": "none" });
	// if(g_uploading == false)
	// {
	videoContainerShow();
	updateVideo();
	// }
}
// 换为单摄像头
function changeSingle() {
	if (g_single_video)
		return
	g_single_video = true;
	if (g_layout == 'layoutA') {
		layoutA();
	}
	else if (g_layout == 'layoutB') {
		layoutB();
	}

	updateVideo();
}

// 换为双摄像头
function changeDouble() {
	if (!g_single_video)
		return
	g_single_video = false
	if (g_layout == 'layoutA')
		layoutA();
	else if (g_layout == 'layoutB')
		layoutB();
	updateVideo();
}
function decimal(num, v) {
	var vv = Math.pow(10, v);
	return Math.round(num * vv) / vv;
}
function filter(num, v) {
	var vv = Math.pow(10, v);
	return Math.round(num * vv) / vv;
}
var videoOperateBtn = "关闭";
var micOperateBtn = "关闭";
function setVideoAndMedia() {
	$("input[name='meet_yx'][value=" + g_video_qp + "]").attr("checked", true);
	$("#size_select").val(g_video_size_type)
	$("#frame_input").val(g_video_fps)

	var audioCfg = CRVideo_GetAudioCfg();
	var micArr = CRVideo_GetAudioMicNames();
	var micArrOptionsStr = "";
	if (g_first_set_video_and_med) {
		for (var i = 0; i < micArr.length; i++) {
			if (audioCfg.micName == micArr[i]) {
				micArrOptionsStr += "<option value=\"" + micArr[i] + "\" selected=\"true\">" + micArr[i] + "</option>"
			} else {
				micArrOptionsStr += "<option value=\"" + micArr[i] + "\" >" + micArr[i] + "</option>"
			}
		}
		micArrOptionsStr = "<option value=\"\" >默认设备</option>" + micArrOptionsStr
		$(micArrOptionsStr).appendTo("#mic_select");
	}

	var spkerArr = CRVideo_GetAudioSpkNames();
	var spkerArrOptionsStr = "";
	if (g_first_set_video_and_med) {
		for (var i = 0; i < spkerArr.length; i++) {
			if (audioCfg.speakerName == spkerArr[i]) {
				spkerArrOptionsStr += "<option value=\"" + spkerArr[i] + "\" selected=\"true\">" + spkerArr[i] + "</option>"
			} else {
				spkerArrOptionsStr += "<option value=\"" + spkerArr[i] + "\" >" + spkerArr[i] + "</option>"
			}
		}
		spkerArrOptionsStr = "<option value=\"\" >默认设备</option>" + spkerArrOptionsStr
		$(spkerArrOptionsStr).appendTo("#spker_select")
	}
	var videoID = CRVideo_GetDefaultVideo(g_userID)
	var videoList = CRVideo_GetAllVideoInfo(g_userID);
	console.log(videoList, 'videoList')
	var videoListOptionsStr = "";
	if (g_first_set_video_and_med) {
		for (var i = 0; i < videoList.length; i++) {
			var item = videoList[i];
			if (videoID == item.videoID) {
				videoListOptionsStr += "<option value=\"" + item.videoID + "\" selected=\"true\">" + item.videoName + "</option>"
			} else {
				videoListOptionsStr += "<option value=\"" + item.videoID + "\" >" + item.videoName + "</option>"
			}
		}
		videoListOptionsStr = "<option value=\"-1\" >默认设备</option>" + videoListOptionsStr
		$(videoListOptionsStr).appendTo("#video_select")
	}
	$("#video_operate_btn").click(function () {
		var vStatus = CRVideo_GetVideoStatus(g_userID);
		if (vStatus == 0) {
			this.popup("没有可打开的视频设备")

		}
		else if (vStatus == 2) {
			CRVideo_OpenVideo(g_userID);
			$("#video_operate_btn").text("关闭");
			videoOperateBtn = "关闭";
		}
		else {
			CRVideo_CloseVideo(g_userID);
			$("#video_operate_btn").text("打开");
			videoOperateBtn = "打开";

		}
	})

	$("#mic_operate_btn").click(function () {
		var aStatus = CRVideo_GetAudioStatus(g_userID);
		if (aStatus == 0) {
			this.popup("没有可打开的音频设备")


		}
		else if (aStatus == 2) {
			CRVideo_OpenMic(g_userID);
			$("#mic_operate_btn").text("关闭");
			micOperateBtn = "关闭";
		}
		else {
			CRVideo_CloseMic(g_userID);
			$("#mic_operate_btn").text("打开");
			micOperateBtn = "打开";

		}
	})
	$("#video_select").change(function () {
		CRVideo_SetDefaultVideo(g_userID, $("#video_select").val());
	});
	$("#spker_select").change(function () {
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
		cfg.privEC = 0;
		CRVideo_SetAudioCfg(cfg);
	});
	$("#mic_select").change(function () {
		var cfg = {};
		cfg.micName = $("#mic_select").val();
		cfg.speakerName = $("#spker_select").val();
		cfg.privAgc = 0;
		cfg.privEC = 0;
		CRVideo_SetAudioCfg(cfg);
	});
	g_first_set_video_and_med = false;
}
//  如果是有媒体存在时，展示三个元素 layoutA时没有媒体 g_single_video只有一个摄像头
function mediaBlockHide() {
	if (g_single_video) {
		g_mediaObj.width(1);
		g_mediaObj.height(1);
		g_videoAObj.width(1);
		g_videoAObj.height(1);
	} else {
		g_mediaObj.width(1);
		g_mediaObj.height(1);
		g_videoAObj.width(1);
		g_videoAObj.height(1);
		g_videoBObj.width(1);
		g_videoBObj.height(1);
	}
	$("#mediaContainer").hide();
}
// 如果是有媒体存在需要隐藏对应的三个元素
//当变化布局时就需要重新变化即可
function recordObjHide() {
	g_mediaObj.width(1);
	g_mediaObj.height(1);
	$("#mediaContainer").hide();
}
//当视频页面隐藏的时候
function videoContainerHide() {
	if (g_layout == "layoutA") {
		g_videoAObj.width(1);
		g_videoAObj.height(1);
		g_videoBObj.width(1);
		g_videoBObj.height(1);
		$("#videoAContainer").hide();
		$("#videoBContainer").hide();

		g_mediaObj.width(1);
		g_mediaObj.height(1);
		$("#mediaContainer").hide();

	} else if (g_layout == "layoutB") {
		mediaBlockHide();
	} else if (g_layout == "layoutC") {
		recordObjHide();
	}
}
function videoContainerShow() {
	if (g_layout == "layoutA") {
		layoutA();
		updateVideo();
	} else if (g_layout == "layoutB") {
		layoutB();
		updateVideo();
	} else if (g_layout == "layoutC") {
		layoutC();
		updateVideo();

	}
}
//显示加层
function showLodingPage() {
	$("#loading_gif").show();
	$("#full_page").show();
}
//隐藏加载层
function hideLoadingPage() {
	$("#loading_gif").hide();
	$("#full_page").hide();
}

//录制视频时打点事件
function setMarkText() {
	var markVal = $("#markInput").val();
	if (markVal == "") {

	} else {
		var videoFilePathName = g_location_dir + g_record;
		CRVideo_SetMarkText(videoFilePathName, g_curRecordDuration, markVal);

		$("#markList").hide();
		// var strLi = "<li onclick=\"clickMarkTextItem(this.innerHTML)\"  onmouseover=\"$(this).addClass(\'active\');\" onmouseleave=\"$(this).removeClass(\'active\');\">" + markVal + "</li>";
		// $("#markList").append(strLi);
		$("#markInput").val("").focus();
	}
}

function clickMarkTextItem(markVal) {
	$("#markInput").val(markVal);
	$("#markList").hide();
	$("#markPullImg img").attr("src", "image/pull_down.png");
	$("#markInput").focus();
}

var g_cur_mark_file_index = -1;
function markFileMgr(i) {
	var fileName = $("#fileName" + i).text().replace(".srt", "");
	$("#mark_table thead th").html(fileName);
	$(".mark_list_all_items").remove();
	// //降低'文件管理'弹层的层级到full_page(111)下面
	// if($("#list_container").css("display") == "block"){
	// 	$("#list_container").css({"z-index":110});
	// }
	var markList = JSON.parse(CRVideo_GetAllMarks(g_location_dir + fileName)).markTexts;
	var len = markList.length;
	var str = '';

	for (var i = 0; i < len; i++) {
		var item = markList[i];
		var text = item.text;
		var time = parseInt(item.timestamp / 1000);

		str += "<tr id=\"mark_list_item" + i + "\" class=\"mark_list_all_items\">"
			+ "<td width=\"10%\"><div class=\"mark_time mark_list_item\"><span style=\"display:none;\" id=\"markTime" + i + "\">" + item.timestamp + "</span><span>" + time + "秒</span></div></td>"
			+ "<td width='65%'><div class=\"mark_list_item no_wrap\" id=\"markText" + i + "\">" + text + "</div></td>"
			+ "<td width=\"25%\">"
			+ "<div class=\"table_done mark_list_item\">"
			//+ str1
			+ "<span class=\"table_act\" onclick=\"changeMarkTextOp(" + i + ")\">修改</span>"
			+ "<span class=\"table_act\" onclick=\"deleteMarkText(" + i + ")\">删除</span>"

			//+ "<div class='table_up_perc'></div>"
			+ "</div>"
			+ "</td>"
			+ "</tr>"
	}
	$("#mark_table").append(str);
	//显示管理弹层
	// $("#mark_list_container_wrapper")
	$("#mark_list_container_wrapper").show();
	$("#mark_list_container").show();

	//
}
//弹出修改打点信息层
function changeMarkTextOp(i) {
	g_cur_mark_file_index = i;  //记录修改该文件下的第几个打点信息
	$("#MarkChangeInput").val("");
	$("#mark_change_container_wrapper").show();
	$("#mark_change_container").show();

}
function deleteMarkText(i) {
	if ($("#mark_list_item" + i).length > 0) {
		//界面移除和视频文件上移除
		var ms = $("#markTime" + i).html();
		$("#mark_list_item" + i).remove();
		CRVideo_RemoveMarkText(g_location_dir + $("#mark_table thead th").html(), ms);
		//console.log("mark-shipin file: "+g_location_dir+$("#mark_table thead th").html());

	}

}

function closeMarkListPage() {
	$("#mark_list_container_wrapper").hide();
	$("#mark_list_container").hide();
	//222
	// if($("#list_container").css("display") == "block"){
	// 	$("#list_container").css({"z-index":222});
	// }
}
function closeMarkChangePage() {
	$("#mark_change_container_wrapper").hide();
	$("#mark_change_container").hide();
}
//修改打点信息层，点击 OK
function changeMarkText() {

	var txt = $("#MarkChangeInput").val();
	if (txt != "" && g_cur_mark_file_index != -1) {
		//
		var fileName = $("#mark_table thead th").html();
		var ms = $("#markTime" + g_cur_mark_file_index).html();
		CRVideo_SetMarkText(g_location_dir + fileName, ms, txt);
		//
		$("#markText" + g_cur_mark_file_index).html(txt);
		$("#mark_change_container_wrapper").hide();
		$("#mark_change_container").hide();

	}
}
