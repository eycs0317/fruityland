export function getHome(): { home: Record<string, Record<string, string>> } {
  return {
    home: {
      'title': {
        'en-US': 'Summer Go Fresh!',
        'zh-CN': '夏日 Go Fresh 弹跳乐园',
        'zh-HK': '夏日 Go Fresh 彈跳樂園',
      },
      'input-001': {
        'en-US': 'Coupon ID',
        'zh-CN': '门票编号',
        'zh-HK': '親子通行證',
      },
      'helper-001': {
        'en-US': 'Placeholder',
        'zh-CN': 'Placeholder',
        'zh-HK': '** 親子通行證號碼是MTR Mobile App Reward 的親子通行證二維碼下的8位數字',
      },
      'button-001': {
        'en-US': 'Enter',
        'zh-CN': '登录',
        'zh-HK': '登入',
      },
    },
  };
}
