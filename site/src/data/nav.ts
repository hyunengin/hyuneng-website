// 사이트 전체 메뉴 구조. 헤더, 푸터, 서브페이지 사이드메뉴가 모두 이 파일을 사용합니다.

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  key: string;
  label: string;
  en: string;
  href: string;
  children: NavChild[];
}

// performancePublic: 사업실적 페이지를 공개할지 여부. 실적이 쌓이면 true 로 바꿉니다.
export const businessAreas = [
  { slug: 'safety-diagnosis', label: '안전진단전문기관', short: '안전진단', performancePublic: false },
  { slug: 'court-appraisal', label: '법원감정전문기관', short: '법원감정', performancePublic: true },
  { slug: 'cost-calculation', label: '원가계산용역기관', short: '원가계산', performancePublic: false },
  { slug: 'structural-review', label: '건축·토목 구조검토', short: '구조검토', performancePublic: true },
] as const;

export const nav: NavItem[] = [
  {
    key: 'about',
    label: '회사소개',
    en: 'INTRODUCTION',
    href: '/about/greeting',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: '기업이념', href: '/about/philosophy' },
      { label: '연혁', href: '/about/history' },
      { label: '조직도', href: '/about/organization' },
      { label: '면허보유현황', href: '/about/licenses' },
      { label: '장비보유현황', href: '/about/equipment' },
      { label: '인증서', href: '/about/certificates' },
    ],
  },
  {
    key: 'business',
    label: '사업분야',
    en: 'BUSINESS',
    href: '/business/safety-diagnosis',
    children: businessAreas.map((b) => ({ label: b.label, href: `/business/${b.slug}` })),
  },
  {
    key: 'performance',
    label: '사업실적',
    en: 'PERFORMANCE',
    href: '/performance/court-appraisal',
    children: businessAreas
      .filter((b) => b.performancePublic)
      .map((b) => ({ label: b.label, href: `/performance/${b.slug}` })),
  },
  {
    key: 'notice',
    label: '공지사항',
    en: 'NOTICE',
    href: '/notice',
    children: [],
  },
  {
    key: 'inquiry',
    label: '견적문의',
    en: 'INQUIRY',
    href: '/inquiry',
    children: [],
  },
];

export function findNav(key: string): NavItem {
  const item = nav.find((n) => n.key === key);
  if (!item) throw new Error(`nav key not found: ${key}`);
  return item;
}
