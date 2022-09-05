// const app = getApp()
const util = require('../../utils/util.js')
let updateInterval

const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  onShow() {
    if (!backgroundAudioManager.paused && backgroundAudioManager.paused != undefined) {
      this._enableInterval()
      this.setData({
        playing: true
      })
    }
  },


  data: {
    theme: 'light',
    playing: false, // 播放状态
    pause: false,
    playTime: 0, // 播放时长
    formatedPlayTime: '00:00:00' // 格式化后的播放时长
  },

  play() {
    backgroundAudioManager.src = "https://zjut.waymove.net/wechat_recorder_demo/voice/exam01/question0"
      + this.data.question_index + "/" + this.data.stuID + '.mp3'
    backgroundAudioManager.title = "question0" + this.data.question_index
    backgroundAudioManager.singer = '该生学号为：' + this.data.stuID
    const that = this
    if (that.data.pause) {
      backgroundAudioManager.play()
      this.setData({
        playing: true,
      })
    } else {
      that.setData({
        playing: true,
      }, () => {
      })
    }
  },

  seek(e) {
    backgroundAudioManager.seek(e.detail.value)
  },

  pause() {
    clearInterval(updateInterval)
    backgroundAudioManager.pause()

  },

  stop() {
    clearInterval(updateInterval)
    backgroundAudioManager.stop()
  },

  _enableInterval() {
    const that = this
    function update() {
      that.setData({
        playTime: backgroundAudioManager.currentTime + 1,
        formatedPlayTime: util.formatTime(backgroundAudioManager.currentTime + 1)
      })
    }
    updateInterval = setInterval(update, 1000)
  },

  onUnload() {
    clearInterval(updateInterval)
  },

  gradeInput: function (e) {
    // this.data.score = e.detail.value
    this.setData({
      score:e.detail.value
    })

  },

  commentInput: function (e) {
    // this.data.comment = e.detail.value
    this.setData({
      comment:e.detail.value
    })
  },

  success: function (res) {
    switch (res.data.err) {
      case 1:
        wx.showModal({
          title: '提示!',
          content: '评语上传失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 2:
        wx.showModal({
          title: '提示!',
          content: '成绩录入失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 3:
        wx.showModal({
          title: '提示!',
          content: '数据格式错误',
          showCancel: false,
          success(res) { }
        })
        break;
      case 4:
        wx.showModal({
          title: '提示!',
          content: '访问数据库失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 5:
        wx.showModal({
          title: '提示!',
          content: '更新总成绩失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 0:
        wx.redirectTo({
          url: '/pages/scores/scores?id=' + this.data.stuID,
        })
    }
  },

  submit: function () {
    this.stop()
    util.remark(this.data.stuID, this.data.question_index, this.data.score, this.data.comment, this.success)
  },

  onLoad(options) {
    wx.hideHomeButton({
      success: () => { },
    })
    this.setData({
      stuID: options.stuID,
      comment: options.comment,
      score: options.score,
      question_index: options.question_index
    })

    console.log('stuID:',options.question_index)

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }

    const that = this
    // 监听播放事件
    backgroundAudioManager.onPlay(() => {
      // 刷新播放时间
      that._enableInterval()
      that.setData({
        pause: false,
      })
    })

    // 监听暂停事件
    backgroundAudioManager.onPause(() => {
      clearInterval(updateInterval)
      that.setData({
        playing: false,
        pause: true,
      })
    })

    backgroundAudioManager.onEnded(() => {
      clearInterval(updateInterval)
      that.setData({
        playing: false,
        playTime: 0,
        formatedPlayTime: util.formatTime(0)
      })
    })



    backgroundAudioManager.onStop(() => {
      clearInterval(updateInterval)
      that.setData({
        playing: false,
        playTime: 0,
        formatedPlayTime: util.formatTime(0)
      })
    })
  },
})
