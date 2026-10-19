# ㈜현구조엔지니어링 홈페이지 프로젝트

이 폴더는 ㈜현구조엔지니어링 회사 홈페이지(hyuneng.co.kr 예정)의 작업 폴더입니다.
운영자는 코딩 경험이 없는 비전공자이며, 모든 수정은 Claude Code에 한국어로 지시하는 방식으로 이루어집니다.
**지시를 받으면 설명보다 실제 수정을 우선하고, 수정 후에는 반드시 `npm run build`로 깨지지 않았는지 확인한 뒤 결과를 짧게 보고합니다.**

## 폴더 구조

```
홈페이지/
├─ CLAUDE.md                 ← 이 파일 (운영 가이드)
├─ 제작계획.md               ← 기획·결정 사항
├─ (주)현구조엔지니어링 홈페이지 제작 기획.pptx   ← 원본 기획안
├─ 자료/                      ← 로고, 사진, 등록증 스캔 등 원본 자료 (사용자가 넣음)
└─ site/                      ← 실제 홈페이지 코드 (Astro 정적 사이트)
   ├─ src/data/               ← ★ 내용 데이터. 대부분의 수정은 여기서 끝남
   │  ├─ company.json         회사 기본정보 (전화, 메일, 주소, 사업자번호, Formspree ID)
   │  ├─ nav.ts               메뉴 구조
   │  ├─ business.json        사업분야 4개 페이지 본문
   │  ├─ performance.json     사업실적 4분야 표
   │  ├─ history.json         연혁
   │  ├─ licenses.json        면허보유현황
   │  ├─ certificates.json    인증서
   │  ├─ equipment.json       장비보유현황
   │  └─ organization.json    조직도
   ├─ src/content/notices/    ← 공지사항 (.md 파일 1개 = 공지 1개)
   ├─ src/pages/              ← 페이지 (URL 구조와 동일)
   ├─ src/components/         ← 헤더, 푸터, 히어로 슬라이더, 문의 폼 등
   ├─ src/layouts/            ← BaseLayout(전체), SubLayout(서브페이지)
   ├─ src/styles/global.css   ← 색상·글꼴·공통 스타일
   └─ public/                 ← 이미지, favicon, robots.txt (그대로 배포됨)
```

## 자주 하는 작업

| 지시 예시 | 수정할 파일 |
|---|---|
| "연혁에 2026.09 ○○ 추가해줘" | `site/src/data/history.json` (최신이 위로 오도록) |
| "안전진단 실적에 ○○ 추가" | `site/src/data/performance.json` → 해당 분야 `rows` 맨 앞에 추가 |
| "공지사항 올려줘" | `site/src/content/notices/YYYY-MM-DD-제목.md` 새로 생성 |
| "전화번호 / 주소 / 사업자번호 바꿔줘" | `site/src/data/company.json` |
| "등록증 이미지 넣어줘" | 이미지를 `site/public/images/docs/`에 복사 → `licenses.json`의 `image`에 `/images/docs/파일명` 입력 |
| "메인 사진 바꿔줘" | 이미지를 `site/public/images/hero/`에 복사 → `HeroSlider.astro`의 배경 SVG를 `<img>`로 교체 |
| "사업분야 문구 수정" | `site/src/data/business.json` |
| "장비 목록 교체" | `site/src/data/equipment.json` (`sample: true` 항목은 예시이므로 실제 자료로 교체) |

### 예시 데이터 주의
`performance.json`, `equipment.json`의 `"sample": true` 항목은 디자인 확인용 예시입니다.
화면에 "예시" 배지가 표시됩니다. 실제 자료를 받으면 예시 항목을 삭제하고 실제 데이터로 교체합니다.

### 공지사항 파일 형식
```md
---
title: "제목"
date: 2026-10-19
summary: "목록에 보이는 한 줄 요약 (선택)"
pinned: false
---

본문. 마크다운 사용 가능.
```

## 개발 · 빌드 · 배포

- 로컬 확인: `site` 폴더에서 `npm run dev` → http://localhost:4321
- 빌드 검증: `site` 폴더에서 `npm run build` (오류 없이 `dist/`가 만들어지면 정상)
- 배포: GitHub `main` 브랜치에 push하면 Cloudflare Pages가 자동 빌드·배포
  - Cloudflare Pages 설정: Root directory `site`, Build command `npm run build`, Output `dist`
- Node.js 24, Astro 5 사용. 새 패키지 추가는 꼭 필요할 때만.

### 견적문의 폼
- `company.json`의 `formspreeId`가 비어 있으면 방문자의 메일 프로그램이 열리는 방식(mailto)으로 동작
- Formspree 가입 후 폼 ID(예: `xpznabcd`)를 `formspreeId`에 넣으면 사이트에서 바로 전송되고 hyuneng002@naver.com 으로 수신
- 폼 ID를 넣으면 개인정보처리방침의 "처리 위탁 및 국외 이전" 조항이 자동으로 바뀜

## 디자인 규칙
- 기준 색: 남색 `#0C356E`, 파랑 `#3676B7` (기획안 로고색). `global.css`의 CSS 변수로 관리
- 글꼴: Pretendard (CDN)
- 로고: `Logo.astro`는 PPT 심볼을 SVG로 다시 그린 임시본. 원본 로고 파일을 받으면 교체
- 모바일(768px 이하)과 태블릿(1024px 이하)에서 반드시 확인
- 새 페이지는 `SubLayout`을 사용하고 `nav.ts`에 메뉴를 추가

## 아직 비어 있는 것 (자료 수령 후 채움)
- 사업장 주소, 사업자등록번호 (`company.json`)
- 등록증·인증서 이미지 (`licenses.json`, `certificates.json`의 `image`)
- 실제 사업실적, 장비 목록 (예시 데이터 교체)
- 메인 슬라이드 사진, 인사말 페이지 사진
- 원본 로고 파일
- Formspree 폼 ID, 도메인(hyuneng.co.kr) 연결
