const util = require('../../utils/util.js')
Page({
  data: {
    listData: []
  },

  correctPage: function (e) {
    // wx.setStorageSync('stuID',e.currentTarget.dataset.index)
    wx.redirectTo({
      url: '/pages/scores/scores?id=' + e.currentTarget.dataset.index,
      success() {
        wx.setStorageSync('teacherFlag', "teacher")
      }
    })
  },

  click: function () {
    wx.redirectTo({
      url: '/pages/teacherIndex/teacherIndex',
    })
  },

  success: function (res) {
    this.setData({
      listData: res.data.scoreInfo
    })
  },

  onLoad: function () {
    wx.hideHomeButton({
      success: () => { },
    })
    util.getAllScores(this.success)
  }
})