const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    birthday: '请选择',
    overseaStudyTime: 0,
    sex: ['请选择', '男', '女'],
    sexIndex: 0,
    englishMajor: ['请选择', '是', '否'],
    englishMajorIndex: 0,
    hand: ['请选择', '右手', '左手'],
    handIndex: 0,
    education: ['请选择', '大一', '大二', '大三', '大四', '研一', '研二', '研三', '博士'],
    educationIndex: 0,
    // gradeChange: [
    //   ['请选择', '大一', '大二', '大三', '大四'],
    //   ['请选择', '研一', '研二', '研三'],
    //   ['请选择', '博士', '博士后']
    // ],
    studyEnglishTime: ['请选择', '5年以下', '5-10年', '10年以上', '20年以上'],
    studyEnglishTimeIndex: 0,
    nation: ['请选择', '中国', '中国香港', '中国台北', '英国', '美国', '加拿大', '澳大利亚', '德国', '法国', '日本', '韩国', '俄罗斯', '其他'],
    nationIndex: 0,
    overseaEducation: ['请选择', '否', '是'],
    overseaEducationIndex: 0,
    overseaStudyTime: ['请选择', '无', '半年以下', '半年至一年', '一年以上'],
    overseaStudyTimeIndex: 0

  },

  nameInputChange(e) {
    this.data.name = e.detail.value
  },

  // studyEnglishTimeInputChange(e) {
  //   this.data.studyEnglishTime = e.detail.value
  // },

  hometownInputChange(e) {
    this.data.hometown = e.detail.value
  },

  achievementInputChange(e) {
    this.data.achievement = e.detail.value
  },

  nationInputChange(e) {
    this.data.nation = e.detail.value
  },

  // overseaStudyTimeInputChange(e) {
  //   this.data.overseaStudyTime = e.detail.value
  // },

  bindSexChange(e) {
    var that = this
    that.data.sexvalue = that.data.sex[e.detail.value]
    that.setData({
      sexIndex: e.detail.value
    })
  },

  bindEnglishMajorChange(e) {
    var that = this
    that.data.englishMajorvalue = that.data.englishMajor[e.detail.value]
    that.setData({
      englishMajorIndex: e.detail.value
    })
  },

  bindDateChange(e) {
    var that = this
    that.setData({
      birthday: e.detail.value
    })
  },

  bindHandChange(e) {
    var that = this
    that.data.handvalue = that.data.hand[e.detail.value]
    that.setData({
      handIndex: e.detail.value
    })
  },

  bindEducationChange(e) {
    var that = this
    that.data.educationvalue = that.data.education[e.detail.value]
    that.setData({
      educationIndex: e.detail.value
    })
    // this.selectChange()
  },


  bindStudyEnglishTimeChange(e) {
    var that = this
    that.data.studyEnglishTimevalue = this.data.studyEnglishTime[e.detail.value]
    that.setData({
      studyEnglishTimeIndex: e.detail.value
    })
  },

  bindNationChange(e) {
    var that = this
    that.data.nationvalue = this.data.nation[e.detail.value]
    that.setData({
      nationIndex: e.detail.value
    })
  },

  bindOverseaStudyTimeChange(e) {
    var that = this
    that.data.OverseaStudyTimevalue = that.data.overseaStudyTime[e.detail.value]
    that.setData({
      overseaStudyTimeIndex: e.detail.value
    })
  },

  success: function (res) {
    wx.hideLoading({
      success: (res) => { },
    })
    switch (res.data.err) {
      case 1:
        wx.showModal({
          title: '提示!',
          content: '登记成功，更新账户属性失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 2:
        wx.showModal({
          title: '提示!',
          content: '登记失败',
          showCancel: false,
          success(res) { }
        })
        break;
      case 3:
        wx.showModal({
          title: '提示!',
          content: '登记内容传输错误',
          showCancel: false,
          success(res) { }
        })
        break;
      case 0:
        wx.redirectTo({
          url: '/pages/index/index',
        })
    }
  },

  start: function () {
    wx.showLoading({
      title: '请稍等',
    })
    var that = this
    if (
      this.data.birthday == "请选择" ||
      this.data.sex[this.data.sexIndex] == "请选择" ||
      this.data.englishMajor[this.data.englishMajorIndex] == "请选择" ||
      this.data.hand[this.data.handIndex] == "请选择" ||
      this.data.education[this.data.educationIndex] == "请选择" ||
      this.data.overseaStudyTime[this.data.overseaStudyTimeIndex] == "请选择" ||
      this.data.sex[this.data.sexIndex] == "请选择" ||
      this.data.name == '' ||
      this.data.studyEnglishTime == '请选择' ||
      this.data.hometown == '' ||
      this.data.achievement == '' ||
      this.data.nation == '请选择' ||
      this.data.overseaStudyTime == '') {
      wx.hideLoading({
        success: (res) => { },
      })
      wx.showModal({
        title: '提示!',
        content: '请输入完整信息',
        showCancel: false,
        success(res) { }
      })
    } else {

      util.uploadStuInfo(wx.getStorageSync('stuID'), that.data.name, that.data.sexvalue, that.data.birthday, that.data.handvalue, that.data.englishMajorvalue,
        that.data.educationvalue, that.data.studyEnglishTimevalue, that.data.hometown, that.data.achievement,
        that.data.nationvalue, that.data.OverseaStudyTimevalue, this.success)
      // wx.redirectTo({
      //   url: '/pages/index/index'
      // })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.hideHomeButton({
      success: (res) => { },
    })
    // console.log(grade[0][1])
    // wx.setStorageSync('stuID', 1122)
    console.log("stuID:", wx.getStorageSync('stuID'))

    wx.showModal({
      showCancel: false,
      title: '提示',
      content: '为保证测试结果的准确客观，请完整填写个人信息的相关内容。测试方承诺对您填写的个人信息完全保密。',
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