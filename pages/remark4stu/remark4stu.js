// pages/remark4stu/remark4stu.js
const util = require('../../utils/util.js')
let updateInterval

const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  onShow() {
    if (!backgroundAudioManager.paused && backgroundAudioManager.paused !== undefined) {
      this._enableInterval()
      this.setData({
        playing: true
      })
    }
  },


  /**
   * 页面的初始数据
   */
  data: {
    stuID: wx.getStorageSync('stuID'),
    // comments: "",
    // score: 0,
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

  submit: function () {
    this.stop()
    wx.redirectTo({
      url: '/pages/scores/scores?id='+wx.getStorageSync('stuID'),
    })
  },

  success: function (res) {
    this.setData({
      score: res.data.score,
      comment: res.data.comment
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton({
      success: () => { },
    })

    this.setData({
      stuID: wx.getStorageSync('stuID'),
      comment: options.comment,
      score: options.score,
      question_index: options.question_index
    })
    console.log("comment:",options.comment)
    console.log("score:",options.score)

    // util.remark4stu(this.data.stuID, this.data.question_index, this.success)
    // util.remark4stu(wx.getStorageSync('stuID'),options.data.question_index,this.success)
    // util.remark4stu(123456,1,this.success)
    
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