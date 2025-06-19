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
        'zh-HK': 'COUPON ID',
      },
      'button-001': {
        'en-US': 'Enter',
        'zh-CN': '登录',
        'zh-HK': '登入',
      },
    },
  };
}
