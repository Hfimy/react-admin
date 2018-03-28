import queryString from 'query-string';

export function getOrderList(params, cb) {
  let url;
  if (params.type === 'search') {
    url = `/manage/order/search.do?orderNo=${params.searchKeyWord}`;
  } else {
    url = `/manage/order/list.do?pageNum=${params.pageNum}`;
  }
  fetch(url, {
    credentials: 'include'
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err.message }));
}

export function getDetailByOrderNo(orderNo, cb) {
  const url = `/manage/order/detail.do?orderNo=${orderNo}`;
  fetch(url, {
    credentials: 'include'
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err.message }));
}

export function sendGoods(orderNo, cb) {
  const url = '/manage/order/send_goods.do';
  fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({ orderNo })
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err.message }));
}
