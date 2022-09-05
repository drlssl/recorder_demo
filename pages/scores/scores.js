// pages/scores/scores.js
const util = require('../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreInfo: [],
    questionInfo: {},
    listData: ['1', '2', '3', '4'],
    list: [],
    teacherFlag: wx.getStorageSync('teacherFlag')
  },

  success: function (res) {
    this.setData({
      scoreInfo: res.data.scores
    })
  },

  confirm: function () {
    if (wx.getStorageSync('teacherFlag') == 'teacher') {
      wx.redirectTo({
        url: '/pages/correct/correct',
      })
    } else {
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton({
      success: (res) => { },
    })
    console.log("学号是：",options.id)
    this.setData({
      stuID: options.id
    })
    // console.log(this.data.stuID)
    util.getScore(options.id, this.success)
  },



  go2remark: function (e) {
    wx.setStorageSync('question_index', e.currentTarget.dataset.index)
    if (wx.getStorageSync('teacherFlag') == "teacher") {
      wx.redirectTo({
        // url: '/pages/remark' + e.currentTarget.dataset.index + '/remark' + e.currentTarget.dataset.index,
        url: '/pages/remark/remark?question_index=' + e.currentTarget.dataset.index + "&score=" + e.currentTarget.dataset.score + "&comment=" + e.currentTarget.dataset.comment + "&stuID=" + this.data.stuID,
        success() {
          console.log("question0", e.currentTarget.dataset.index)
          console.log("score:", e.currentTarget.dataset.score)
          console.log("comment:", e.currentTarget.dataset.comment)
        }
      })
    } else {
      wx.redirectTo({
        url: '/pages/remark4stu/remark4stu?question_index=' + e.currentTarget.dataset.index + "&score=" + e.currentTarget.dataset.score + "&comment=" + e.currentTarget.dataset.comment + "&stuID=" + this.data.stuID
      })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})