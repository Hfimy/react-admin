import queryString from 'query-string';

export function handleLogin(data, cb) {
  fetch('/manage/user/login.do', {
    method: 'post', //不区分大小写
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(data)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err }));
}

export function handleLogout(cb) {
  fetch('/user/logout.do', {
    method: 'post',
    credentials: 'include'
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err }));
}
