const app = getApp()
const db = wx.cloud.database();
let stuID=wx.getStorageSync('stuID')

Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [{
      title: '教师',
      name: 'teacher',
      color: 'blue'
    },
    {
      title: '学生',
      name: 'student',
      color: 'cyan'
    },
    ]
  },

  onLoad: function (options) {

    wx.hideHomeButton({
      success: (res) => {},
    })

    db.collection('student')
    .where({
      user_id:stuID
    })
    .get({
      success: res => {
        console.log(res)
        this.setData({
          name:res.data[0].studentName
        })
      }
    })

    // wx.getUserInfo({
    //   success: function(res) {
    //     userInfo=res.userInfo
    //   }
    // })

    // db.collection('userInfo').get({
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       userInfo: res.data[0].userInfo,
    //       avatarUrl: res.data[0].avatarUrl,
    //       userName: res.data[0].name,
    //       userClass: res.data[0]._class,
    //     })
    //   }
    // })
  },
 

})