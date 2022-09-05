import Toast from '@vant/weapp/toast/toast'
const util = require('../../utils/util.js')

// var stuID = wx.getStorageSync('stuID')

var last_idx
var wordListArray = []
var idx
var wordCount

let playTimeInterval
let recordTimeInterval
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.obeyMuteSwitch = false



Page({
  // onShareAppMessage() {
  //   return {
  //     title: '录音',
  //     path: 'pages/recorder/recorder'
  //   }
  // },
  data: {

    // 进度条部分
    setInter: '',
    uploadTime: 0,
    overlay_show:false,
    progressValue: 0,

    timer: '',
    countDownNum: 4,
    wordCount: 0,

    uploadFlag: false,
    clockFlag: true,
    recordedFlag: false,

    theme: 'light',
    recording: false, // 录音中
    playing: false, // 播放中
    hasRecord: false, // 已经录音
    recordTime: 0, // 录音时长
    playTime: 0, // 播放时长
    formatedRecordTime: '00:00:00', // 录音时间
    formatedPlayTime: '00:00:00', // 播放时间

    nextQuestion: 'preparation02'
  },

  // onShow: function () {
  //   this.countDown()
  // },

  click: function (e) {
    this.stopVoice()
    util.nextQuestion(wx.getStorageSync('stuID'), this.data.nextQuestion)
  },

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
    if (that.data.recording == true) {
      that.setData({
        timer: setInterval(function () {
          countDownNum--;
          that.setData({
            countDownNum: countDownNum
          })
          if (countDownNum == 0) {
            that.onJumpIndex()
          }
        }, 1000)
      })
    } else {
      clearInterval(that.data.timer);
    }


  },

  onJumpIndex: function () {
    const that = this
    clearInterval(that.data.timer);
    this.next()
  },

  next: function () {

    wordListArray.splice(last_idx, 1)
    var idx = Math.floor(Math.random() * (wordListArray.length - 1))
    last_idx = idx
    wordCount++
    if (wordCount <= 30) {
      this.setData({
        wordCount: wordCount,
        countDownNum: 4,
        word: wordListArray[idx],
      })
      this.countDown()
    }
    else {
      this.stopRecord()
      // wx.showToast({
      //   title: 'ALL DONE !',
      // })
      clearInterval(this.data.timer);

    }
  },



  onHide() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },

  success: function (res) {
    this.setData({
      readList: res.data,
    })
    console.log("数据在readlist中是这样的：", this.data.readList)
    // console.log("11", this.data.readList.wordList)
    for (let i in this.data.readList.wordList) {
      wordListArray.push(this.data.readList.wordList[i].wordList)
    }
    idx = Math.floor(Math.random() * (wordListArray.length - 1))
    console.log("words数组是：", wordListArray)
    last_idx = idx
    wordCount = 1

    this.setData({
      word: wordListArray[idx],
      wordCount: 1
    })
    console.log("第一个word是：", this.data.word)
  },

  progressDone: function () {
    var that = this
    Toast({
      // 这里的提示不会显示，主要是为了占点时间，让进度条动画走完
      type: 'success',
      message: '上传成功成功',
      onClose: () => {
        that.setData({ overlay_show: false })
        console.log('执行OnClose函数');
      },
    });
  },

  uploadSuccess: function () {
    clearInterval(this.data.setInter)
    this.setData({
      uploadFlag: true,
      progressValue: 100,
    },
      this.progressDone()
    )
  },

  uploadFail: function () {
    clearInterval(this.data.setInter)
    var that = this
    this.setData({
      progressValue: 0,
    })
    wx.showToast({
      icon: 'error',
      title: '上传失败',
      success() {
        that.setData({
          overlay_show: false
        })
      }
    })
  },

  upload: function () {
    this.setData({
      overlay_show:true
    })
    this.startSetInter()
    util.uploadToServer(this.data.tempFilePath, wx.getStorageSync('stuID'), 'question01',
      util.formatDateTime(new Date()), this.uploadSuccess, this.uploadFail)
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.uploadTime + 1;
        if (that.data.progressValue <= 90) {
          that.setData({
            uploadTime: numVal,
            progressValue: 2 * numVal
          });
        }
        console.log('上传时间：' + that.data.uploadTime);
      }
      , 1000);
  },




  onLoad() {
    util.uploadWordList(this.success)
    // ============================================

    wx.hideHomeButton({
      success: (res) => { },
    })


    const that = this
    // 监听录音开始事件
    recorderManager.onStart(() => {
      console.log('recorderManage: onStart')
      // 录音时长记录 每秒刷新
      recordTimeInterval = setInterval(() => {
        that.data.recordTime += 1
        const recordTime = that.data.recordTime
        that.setData({
          // wordCount:1,
          formatedRecordTime: util.formatTime(that.data.recordTime),
          // recordTime
        })
      }, 1000)
    })

    // 监听录音停止事件
    recorderManager.onStop((res) => {

      console.log('recorderManage: onStop')
      that.setData({
        // autoplay: false,
        recordedFlag: true,
        hasRecord: true, // 录音完毕
        recording: false,
        tempFilePath: res.tempFilePath,
        formatedPlayTime: util.formatTime(that.data.playTime),
      })

      console.log(typeof (res.tempFilePath))
      console.log(that.data.tempFilePath)
      // 清除录音计时器
      clearInterval(recordTimeInterval)
      // ======================上传文件到服务器的办法==============================
      this.upload()
    })

    // 监听播放开始事件
    innerAudioContext.onPlay(() => {
      console.log('innerAudioContext: onPlay')
      playTimeInterval = setInterval(() => {
        const playTime = that.data.playTime + 1
        if (that.data.playTime === that.data.recordTime) {
          that.stopVoice()
        } else {
          console.log('update playTime', playTime)
          that.setData({
            formatedPlayTime: util.formatTime(playTime),
            playTime
          })
        }
      }, 1000)
    })

    innerAudioContext.onStop(() => {

    })
  },

  startRecord() {
    this.setData({
      recording: true// 录音开始

    })
    // 设置 Recorder 参数
    const options = {
      duration: 180000, // 持续时长
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    this.countDown()
    recorderManager.start(options) // 开始录音
  },

  stopRecord() {
    recorderManager.stop() // 停止录音
    this.setData({
      recordedFlag: true
    })
  },

  stopRecordUnexpectedly() {
    const that = this
    recorderManager.stop({
      success() {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },

  playVoice() {
    innerAudioContext.src = this.data.tempFilePath
    this.setData({
      playing: true,

    }, () => {
      innerAudioContext.play()
    })
  },

  pauseVoice() {
    clearInterval(playTimeInterval)
    innerAudioContext.pause()
    this.setData({
      playing: false
    })
  },

  stopVoice() {
    clearInterval(playTimeInterval)
    innerAudioContext.stop()
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
  },
})
