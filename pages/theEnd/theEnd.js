// pages/theEnd/theEnd.js

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  warning: function () {
    wx.showModal({
      title: '警告 ！',
      content: '重新测试将会清空本次的测试的全部记录，请问您是否需要重新测试',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在清空',
          })
          util.clearResult(wx.getStorageSync('stuID'))
        } else {
          console.log('用户点击取消')
        }
      }
      // cancelColor: 'cancelColor',
    })
  },


  return2index: function () {
    util.nextQuestion(wx.getStorageSync('stuID'), 'index')
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.hideHomeButton({
      success: (res) => { },
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