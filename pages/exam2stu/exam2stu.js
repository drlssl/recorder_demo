//获取应用实例
// const app = getApp()


//全局变量 ===========================================
var IDofVoice
// var stuID = wx.getStorageSync('stuID')
var stuID
// 实例化全局对象=======================================
const db = wx.cloud.database()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false



//开始page部分 ========================================
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  getStuID: function (e) {
    // 通过这个可以从标签中获取到不同的ID
    // number把字符串转为数字
    stuID = Number(e.currentTarget.dataset.index);
    console.log(stuID)
  },

  start2play: function (e) {
    // var IDofVoice
    this.getStuID(e)
    db.collection('draft').where({
      student_id: stuID
    })
      .get().then(res => {
        console.log("cloud id 获取成功", res.data[0].cloud_id)
        // 错在这个赋值这里
        IDofVoice = res.data[0].cloud_id
        console.log(IDofVoice)
        wx.cloud.downloadFile({
          fileID: IDofVoice
        })
          .then(res => {
            console.log("数据加载成功", res)
            audio.src = res.tempFilePath
            audio.play()
          })
          .catch(error => {
            console.log("音频加载出错辣", error)
          })
      })
      .catch(error => {
        console("cloud id 获取失败", error)
      })
    // ==========================


  }
})