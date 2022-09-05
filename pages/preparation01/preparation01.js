// pages/preparation/preparation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  click: function (e) {
    // this.getQuestionContent(e)
    wx.redirectTo({
      url: '/pages/question01/question01'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton({
      success: (res) => {},
    })
    wx.showModal({
      showCancel: false,
      title: '提示',
      content: '同学你好，欢迎参加英语口语测评。本测评共包含四个部分，总计用时约10-15分钟。题型包括单词朗读、任选问题回答、任选问题描述和观点描述。为保证测评效果，建议您在安静的环境下，佩戴耳机和话筒完成测评。再次感谢您的配合。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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