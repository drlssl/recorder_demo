const util = require('../../utils/util.js')
import Toast from '@vant/weapp/toast/toast'


let playTimeInterval
let recordTimeInterval
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.obeyMuteSwitch = false



Page({
  data: {

    // 进度条部分
    setInter: '',
    uploadTime: 0,
    overlay_show: false,
    progressValue: 0,

    nextQuestion: 'preparation03',

    //倒计时部分
    timer: '',
    countDownNum: '90',

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

    radio: "1",
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    console.log('click:', event.detail)
  },


  //下一题
  next: function () {
    this.stopVoice()
    var chosenTopic = 'topic0' + this.data.radio
    console.log('所选择的主题是：', chosenTopic)
    util.uploadTopic(chosenTopic, 'question02', wx.getStorageSync('stuID'), this.success, this.data.nextQuestion)
  },

  success: function (stuID, nextQuestion) {
    util.nextQuestion(stuID, nextQuestion)
  },

  onShow: function () {
    this.countDown();
  },

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;
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
  },

  onJumpIndex: function () {
    const that = this
    clearInterval(that.data.timer);
    this.setData({
      clockFlag: false
    })
    this.startRecord()

  },


  click: function () {
    this.stopVoice()
    wx.redirectTo({
      url: '/pages/preparation03/preparation03'
    })
  },


  onHide() {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
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
    util.uploadToServer(this.data.tempFilePath, wx.getStorageSync('stuID'), 'question02',
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
    wx.hideHomeButton({
      success: (res) => { },
    })
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light',
      // question_content: wx.getStorageSync('question_content'),

    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
    const that = this
    // 监听录音开始事件
    recorderManager.onStart(() => {
      clearInterval(that.data.timer)
      console.log('recorderManage: onStart')
      this.setData({
        clockFlag: false
      })
      // 录音时长记录 每秒刷新
      recordTimeInterval = setInterval(() => {
        that.data.recordTime += 1
        const recordTime = that.data.recordTime
        that.setData({
          formatedRecordTime: util.formatTime(that.data.recordTime),
          recordTime
        })
      }, 1000)
    })

    // 监听录音停止事件
    recorderManager.onStop((res) => {

      console.log('recorderManage: onStop')
      that.setData({
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
      recording: true // 录音开始
    })
    // 设置 Recorder 参数
    const options = {
      duration: 60000, // 持续时长
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
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
  clear() {
    clearInterval(playTimeInterval)
    innerAudioContext.stop()
    this.setData({
      retryFlag: true,
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }


})
