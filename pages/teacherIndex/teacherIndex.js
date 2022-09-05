const util = require('../../utils/util.js')
const app = getApp()
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    // adminFlag:wx.getStorageSync('adminFlag')
  },

  go2Correct: function () {
    console.log("老师index页面的teacherFlag是：", wx.getStorageSync('teacherFlag'))
    wx.redirectTo({
      url: '/pages/correct/correct',
    })
  },

  setAvatar: function (res) {
    this.setData({
      name: res.data.name,
      avatar: res.data.avatar
    })
  },

  getUserInfo: function () {
    wx.getUserProfile({
      desc: '用于头像显示',
      success: (res) => {
        wx.setStorageSync('avatar', res.userInfo.avatarUrl)
        this.setData({
          avatar: res.userInfo.avatarUrl
        }),
          util.uploadAvatar(wx.getStorageSync('tchID'), wx.getStorageSync('teacherFlag'), res.userInfo.avatarUrl)
      }
    })
  },

  quit:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  append:function(){
    if(this.data.adminFlag==1){
      wx.navigateTo({
        url: '/pages/addTeacher/addTeacher',
      })
    }else{
      wx.showModal({
        title: '对不起',
        content:'您的账号没有权限添加教师账户'
      })
    }
  },


  onLoad: function (options) {

    console.log("admin:",wx.getStorageSync('adminFlag'))
    wx.setStorageSync('teacherFlag', 'teacher')
    this.setData({
      adminFlag:wx.getStorageSync('adminFlag')
    })
    wx.hideHomeButton({
      success: (res) => { },
    })
    util.getAvatar(wx.getStorageSync('tchID'), wx.getStorageSync('teacherFlag'), this.setAvatar)


  },
})