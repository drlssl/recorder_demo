var app = getApp()

function getAvatar(user_id, teacher_flag, success) {
  wx.request({
    url: app.globalData.ip + 'wechat_recorder_demo/getAvatar.php',
    method: 'GET',
    dataType: 'json',
    data: {
      teacher_flag: teacher_flag,
      user_id: user_id,
      // avatar: avatar
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      wx.setStorageSync('name', res.data.name)
      wx.setStorageSync('avatar', res.data.avatar)
      console.log("success ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}


function uploadAvatar(user_id, teacher_flag, avatar) {
  wx.request({
    url: app.globalData.ip + 'wechat_recorder_demo/uploadAvatar.php',
    method: 'GET',
    dataType: 'json',
    data: {
      teacherFlag: teacher_flag,
      user_id: user_id,
      avatar: avatar
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log("success ", res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })

}

function clearResult(stuID) {
  wx.request({
    url: app.globalData.ip + 'wechat_recorder_demo/clearResult.php',
    method: 'GET',
    dataType: 'json',
    data: {
      stuID: stuID
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log("clear result successfully: ", res)
      wx.hideLoading()
      wx.showToast({
        title: '清理成功',
        icon: 'success',
        success() {
          wx.redirectTo({
            url: '/pages/preparation01/preparation01',
          })
        }
      })
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function remark(stuID, question_id, score, comment, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/remark.php',
    url: app.globalData.ip + 'wechat_recorder_demo/remark.php',
    method: 'GET',
    dataType: 'json',
    data: {
      stuID: stuID,
      question_id: question_id,
      score: score,
      comment: comment
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function remark4stu(stuID, question_id, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/remark4stu.php',
    url: app.globalData.ip + 'wechat_recorder_demo/remark4stu.php',
    method: 'GET',
    dataType: 'json',
    data: {
      stuID: stuID,
      question_id: question_id
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function uploadWordList(success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/wordList.php',
    url: app.globalData.ip + 'wechat_recorder_demo/wordList.php',
    method: 'GET',
    dataType: 'json',
    data: {
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function getScore(stuID, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/getScore.php',
    url: app.globalData.ip + 'wechat_recorder_demo/getScore.php',
    method: 'GET',
    dataType: 'json',
    data: {
      stuID: stuID
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}


function getAllScores(success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/getAllScores.php',
    url: app.globalData.ip + 'wechat_recorder_demo/getAllScores.php',
    method: 'GET',
    dataType: 'json',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}


function nextQuestion(user_id, nextQuestion) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/nextQuestion.php',
    url: app.globalData.ip + 'wechat_recorder_demo/nextQuestion.php',
    method: 'GET',
    dataType: 'json',
    data: {
      user_id: user_id,
      question: nextQuestion
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      wx.redirectTo({
        url: '/pages/' + nextQuestion + '/' + nextQuestion
      })
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}



function getQuestion(user_id, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/getQuestion.php',
    url: app.globalData.ip + 'wechat_recorder_demo/getQuestion.php',
    method: 'GET',
    dataType: 'json',
    data: {
      user_id: user_id,
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function uploadStuInfo(stuID, name, sex, birth, hand, englishMajor
  , education, studyEnglishTime, hometown, scores, nation, oversea, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/register.php',
    url: app.globalData.ip + 'wechat_recorder_demo/register.php',
    method: 'GET',
    dataType: 'json',
    data: {
      user_id: stuID,
      name: name,
      sex: sex,
      birth: birth,
      hand: hand,
      englishMajor: englishMajor,
      education: education,
      studyEnglishTime: studyEnglishTime,
      hometown: hometown,
      scores: scores,
      nation: nation,
      oversea: oversea
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}


function login(user_id, password, teacherFlag, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/login.php',
    url: app.globalData.ip + 'wechat_recorder_demo/login.php',
    method: 'GET',
    dataType: 'json',
    data: {
      user_id: user_id,
      password: password,
      teacher_flag: teacherFlag,
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("login success: ", res)
      // wx.setStorageSync('adminFlag', res.data.adminFlag)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}

function enroll(user_id, password,name, teacherFlag, success) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/enroll.php',
    url: app.globalData.ip + 'wechat_recorder_demo/enroll.php',
    method: 'GET',
    dataType: 'json',
    data: {
      name:name,
      user_id: user_id,
      password: password,
      teacher_flag: teacherFlag,
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("success: ", res)
      success(res)
    },
    fail(err) {
      console.log("error: ", err)
    }
  })
}


function uploadTopic(topic_id, question_id, stuID, success, nextQuestion) {
  wx.request({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/topic.php',
    url: app.globalData.ip + 'wechat_recorder_demo/topic.php',
    method: 'GET',
    dataType: 'json',
    data: {
      topic: topic_id,
      stu_id: stuID,
      question_id: question_id,
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      console.log("topic success:", res)
      success(stuID, nextQuestion)
    }
  })
}


function uploadToServer(file, stuID, question_id, time, success, fail) {
  wx.uploadFile({
    // url: 'http://47.111.170.88:8080/wechat_recorder_demo/upload.php',
    url: app.globalData.ip + 'wechat_recorder_demo/upload.php',
    filePath: file,
    name: 'file',
    // dataType: 'json',
    formData: {
      'stu_id': stuID,
      'question_id': question_id,
      'time': time
    },
    header: {
      'content-type': 'application/json' // 默认值
      // 'content-type':'x-www-form-urlencoded'
    },
    success(res) {
      success()
      // wx.hideLoading()
      // wx.showToast({
      //   icon: 'success',
      //   title: '上传成功',
      // }),
      // wx.showModal({
      //   title: JSON.parse(res.data).time01,
      //   content: JSON.parse(res.data).time02
      // })
      console.log("success:", JSON.parse(res.data));
    },
    fail(err) {
      fail(err)
      console.log(err);
    }
  })
  return
}


function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = parseInt(time / 3600, 10)
  time %= 3600
  const minute = parseInt(time / 60, 10)
  time = parseInt(time % 60, 10)
  const second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}


function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function fib(n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

function formatLeadingZeroNumber(n, digitNum = 2) {
  n = n.toString()
  const needNum = Math.max(digitNum - n.length, 0)
  return new Array(needNum).fill(0).join('') + n
}

function formatDateTime(date, withMs = false) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  let ret = [year, month, day].map(value => formatLeadingZeroNumber(value, 2)).join('-') +
    ' ' + [hour, minute, second].map(value => formatLeadingZeroNumber(value, 2)).join(':')
  if (withMs) {
    ret += '.' + formatLeadingZeroNumber(ms, 3)
  }
  return ret
}

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

module.exports = {
  formatTime,
  formatLocation,
  fib,
  formatDateTime,
  compareVersion,
  uploadToServer,
  uploadTopic,
  enroll,
  login,
  uploadStuInfo,
  getQuestion,
  nextQuestion,
  getAllScores,
  getScore,
  remark,
  remark4stu,
  uploadWordList,
  clearResult,
  uploadAvatar,
  getAvatar
}

