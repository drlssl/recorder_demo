// pages/question06/question06.js
const util = require('../../utils/util.js')

// var stuID = wx.getStorageSync('stuID')

var last_idx
var readList
var wordCount

let playTimeInterval
let recordTimeInterval
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const db = wx.cloud.database()
innerAudioContext.obeyMuteSwitch = false



Page({
  // onShareAppMessage() {
  //   return {
  //     title: '录音',
  //     path: 'pages/recorder/recorder'
  //   }
  // },
  data: {
    clockFlag: true,
    timer: '',
    countDownNum: 1,

    word: 'word',

    recordedFlag: false,
    theme: 'light',
    recording: false, // 录音中
    playing: false, // 播放中
    hasRecord: false, // 已经录音
    recordTime: 0, // 录音时长
    playTime: 0, // 播放时长
    formatedRecordTime: '00:00:00', // 录音时间
    formatedPlayTime: '00:00:00', // 播放时间


  },

  onShow: function () {
    this.countDown()
  },

  click: function (e) {
    this.stopVoice()
    wx.redirectTo({
      url: '/pages/preparation02/preparation02'
    })
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
    this.next()
  },

  next: function () {

    readList.splice(last_idx, 1)
    var idx = Math.floor(Math.random() * (readList.length - 1))
    last_idx = idx
    wordCount++
    if (wordCount <= 30) {
      this.setData({
        countDownNum: 1,
        word: readList[idx]
      })
      this.countDown()
    }
    else {
      this.stopRecord()
      wx.showToast({
        title: 'ALL DONE !',
      })
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

  onLoad() {
    // 单词部分========================================
    db.collection("words")
      .where({ wordBook: "cet-4" })
      .get()
      .then(res => {
        readList = JSON.parse(res.data[0].wordList)
        var idx = Math.floor(Math.random() * (readList.length - 1))
        last_idx = idx
        wordCount = 1
        this.setData({
          word: readList[idx],
        })

        console.log("数据在readlist中是这样的", readList)
        // console.log("结果是，",JSON.parse(res.data[0].wordList))
      })
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
          formatedRecordTime: util.formatTime(that.data.recordTime),
          recordTime
        })
      }, 1000)
    })

    // 监听录音停止事件
    recorderManager.onStop((res) => {
      var that=this
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
      wx.request({
        url: 'https://www.rest-time.top/api/select_search',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: uuid,
        },
        dataType: 'json',
        responseType: 'text',

        success: function (res) {
          // 不能直接用this.setData
          that.setData({
            arrived: res.data
          })
        }

        // ==============================================
        // 以下是之前的传输文件的方式
        // wx.cloud.uploadFile({
        //   cloudPath: 'Exam01/Question01/' + wx.getStorageSync('stuID') + '.mp3',
        //   filePath: that.data.tempFilePath
        // })
        //   .then(res => {
        //     console.log("看一下学号怎么样", wx.getStorageSync('stuID'))
        //     console.log("录音上传成功辽", res)
        //     let IDofVoice = res.fileID
        //     db.collection('student')
        //       .where({ user_id: wx.getStorageSync('stuID') })
        //       .update({
        //         data: {
        //           question01_id: IDofVoice,
        //           question: "preparation02"
        //         }
        //       })
        //       .then(res => {
        //         // console.log(String(stuID).concat(Question01_ID)),
        //         console.log(IDofVoice)
        //         console.log("成功把cloud ID存到了数据库中", res)
        //       })
        //       .catch(error => {
        //         console.log("cloud ID 存到数据库时出错了", error)
        //       })
        //   })
        //   .catch(error => {
        //     console.log("上传失败辣", error)
        //   })
      })
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
