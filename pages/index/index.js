const util = require('../../utils/util.js')
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
  },

  auth() {
    wx.openSetting({
      success(res) {
        console.log(res)
      }
    })
  },

  scoreCheck: function () {
    console.log("学生index页面的teacherFlag是：", wx.getStorageSync('teacherFlag'))
    wx.redirectTo({
      url: '/pages/scores/scores?id=' + wx.getStorageSync('stuID'),
    })
  },

  success: function (res) {
    var question = res.data.question
    if (question == "index") {
      wx.showModal({
        title: '提示!',
        content: '已完成测试',
        showCancel: false,
        success(res) { }
      })
    } else {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            wx.showModal({
              title: "提示",
              content: "请授权使用麦克风，否则此功能将无法使用",
              confirmText: "立即授权",
              cancelText: "暂不授权",
              success: function (res) {
                if (res.confirm) {
                  wx.authorize({
                    scope: 'scope.record',
                    success() {
                      wx.redirectTo({
                        url: '/pages/' + question + '/' + question
                      })
                    },
                    fail() {
                      wx.showModal({
                        title: '提示',
                        content: "为了正常使用此功能，请点击授权按钮，打开麦克风权限",
                        confirmText: '知道了',
                        showCancel: false,
                        success: res => {
                        }
                      });
                      return
                    }
                  })
                }
              }
            });
          } else {
            wx.redirectTo({
              url: '/pages/' + question + '/' + question
            })
          }
        }
      })

    }
  },

  go2exam: function () {
    util.getQuestion(wx.getStorageSync('stuID'), this.success)
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
          util.uploadAvatar(wx.getStorageSync('stuID'), wx.getStorageSync('teacherFlag'), res.userInfo.avatarUrl)
      }
    })
  },

  quit:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  onLoad: function (options) {
    wx.hideHomeButton({
      success: (res) => { },
    })

    util.getAvatar(wx.getStorageSync('stuID'), wx.getStorageSync('teacherFlag'), this.setAvatar)

  },
})