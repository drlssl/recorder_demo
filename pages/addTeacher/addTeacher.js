// pages/enrol.js
const util = require('../../utils/util.js')
const changed = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: 'teacher',
    name: "",
    id: "",
    password: "",
    passwordack: "",
    question: "",
    path: ""
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    console.log('click:', event.detail)
  },



  back: function (e) {
    wx.navigateBack({
      url: '/pages/teacherIndex/teacherIndex'
    })
  },

  regist: function () {
    var that = this
    if (that.data.id.length < 6) {
      wx.showModal({
        title: '提示!',
        content: '请输入正确的学号/工号',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.name.length < 1) {
      wx.showModal({
        title: '提示!',
        content: '请输入教师姓名',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.password.length < 6) {
      wx.showModal({
        title: '提示!',
        content: '请输入至少6位的登陆密码',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.passwordack != that.data.password) {
      wx.showModal({
        title: '提示!',
        content: '密码不一致',
        showCancel: false,
        success(res) { }
      })
    }
    else {
      if (that.data.radio == 'teacher') {
        util.enroll(that.data.id, that.data.password, that.data.name,"teacher", this.success)
      } else if (that.data.radio == 'admin') {
        util.enroll(that.data.id, that.data.password, that.data.name,"admin", this.success)
      }
    }
  },

  success: function (res) {
    var that = this
    switch (res.data.err) {
      case 1:
        wx.showModal({
          title: '提示!',
          content: '该教师账号已存在',
          showCancel: false,
          success(res) { }
        })
        break;
      case 3:
        wx.showModal({
          title: '提示!',
          content: '数据格式有误',
          showCancel: false,
          success(res) { }
        })
        break;
      case 4:
        wx.showModal({
          title: '提示!',
          content: 'GET请求为空',
          showCancel: false,
          success(res) { }
        })
        break;
      default:
        wx.showToast({
          title: '添加成功',
        })
    }
  },

  nameInput: function (e) {
    this.data.name = e.detail.value
  },

  idInput: function (e) {
    this.data.id = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },

  passwordInputAck: function (e) {
    this.data.passwordack = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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