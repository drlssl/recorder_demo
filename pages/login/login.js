//pages/login/login.js
// ===============================================
const util = require('../../utils/util.js')
const changed = {}
// =============================================
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    password: "",
    radio:'student',
    path: ""
    // list: []
  },


  // 跳转至注册页面
  regist: function () {
    wx.redirectTo({
      url: '/pages/enroll/enroll'
    })
  },

  // 设置哪个身份登录
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    console.log('click:',event.detail)
  },

  // 登录！
  signIn: function () {
    var that = this
    if (that.data.id.length < 6) {
      wx.showModal({
        title: '提示!',
        content: '请输入正确的学号/工号',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.password.length == '') {
      wx.showModal({
        title: '提示!',
        content: '请输入密码',
        showCancel: false,
        success(res) { }
      })
    } else {
      if (that.data.radio == 'teacher') {
        wx.setStorageSync("teacherFlag", 'teacher')
        wx.setStorageSync('tchID', that.data.id)
        that.data.path = '/pages/teacherIndex/teacherIndex'
        util.login(that.data.id, that.data.password, that.data.radio, this.success)
      } else if (that.data.radio == 'student') {
        wx.setStorageSync("teacherFlag", 'student')
        wx.setStorageSync('stuID', that.data.id);
        // util.getName(wx.getStorageSync('stuID'),"student")
        that.data.path = '/pages/index/index'
        util.login(that.data.id, that.data.password, that.data.radio, this.success)
      }
    }
  },

  success: function (res) {
    var that = this
    switch (res.data.err) {
      case 1:
        wx.showModal({
          title: '提示!',
          content: '密码错误',
          showCancel: false,
          success(res) { }
        })
        break;
      case 2:
        wx.showModal({
          title: '提示!',
          content: '数据格式有误',
          showCancel: false,
          success(res) { }
        })
        break;
      case 3:
        wx.showModal({
          title: '提示!',
          content: 'GET请求为空',
          showCancel: false,
          success(res) { }
        })
        break;
        
      default:
        wx.setStorageSync('adminFlag', res.data.adminFlag)
        wx.setStorageSync('name', res.data.name)
        if (res.data.register == 0) {
          wx.redirectTo({
            url: "/pages/register/register",
          })
        } else {
          wx.redirectTo({
            url: that.data.path,
          })
        }
    }
  },

  stuidInput: function (e) {
    this.data.id = e.detail.value
    // wx.setStorageSync('stuID', e.detail.value)
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
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

  onLoad:function(){
    wx.hideHomeButton({
      success: (res) => { },
    })
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