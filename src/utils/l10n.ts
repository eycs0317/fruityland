export function l10n(contentKey: string, lang: string): string {
  const content: Record<string, Record<string, string>> = {
    'home-title': {
      'en-US': 'Welcome FruityLand',
      'zh-CN': '欢迎来到 FruityLand',
      'zh-HK': '歡迎來到 FruityLand',
    },
    'home-input-001': {
      'en-US': 'Coupon Code',
      'zh-CN': '优惠券代码',
      'zh-HK': '優惠券代碼',
    },
  };

  return content[contentKey]?.[lang] ?? `[${contentKey}]`;
}
