export function getStatisticData(cb) {
  fetch('/manage/statistic/base_count.do', {
    credentials: 'include'
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => {
      cb && cb(res);
    })
    .catch(err => cb && cb({ status: 1, msg: err }));
}
