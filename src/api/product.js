import queryString from 'query-string';

export function getProductList(pageNum, cb) {
  fetch('/manage/product/list.do', {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({ pageNum })
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

export function updateProductStatus(data, cb) {
  fetch('/manage/product/set_sale_status.do', {
    method: 'post',
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
    .catch(err => cb && cb(err));
}
