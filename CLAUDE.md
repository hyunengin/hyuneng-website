# ㈜현구조안전공사 홈페이지 프로젝트

이 폴더는 ㈜현구조안전공사 회사 홈페이지(hyuneng.co.kr 예정)의 작업 폴더입니다.
운영자는 코딩 경험이 없는 비전공자이며, 모든 수정은 Claude Code에 한국어로 지시하는 방식으로 이루어집니다.
**지시를 받으면 설명보다 실제 수정을 우선하고, 수정 후에는 반드시 `npm run build`로 깨지지 않았는지 확인한 뒤 결과를 짧게 보고합니다.**

## 폴더 구조

```
홈페이지/
├─ CLAUDE.md                 ← 이 파일 (운영 가이드)
├─ 제작계획.md               ← 기획·결정 사항
├─ (주)현구조안전공사 홈페이지 제작 기획.pptx   ← 원본 기획안
├─ 자료/                      ← 로고, 사진, 등록증 스캔 등 원본 자료 (사용자가 넣음)
└─ site/                      ← 실제 홈페이지 코드 (Astro 정적 사이트)
   ├─ src/data/               ← ★ 내용 데이터. 대부분의 수정은 여기서 끝남
   │  ├─ company.json         회사 기본정보 (전화, 메일, 주소, 사업자번호, Formspree ID)
   │  ├─ nav.ts               메뉴 구조
   │  ├─ business.json        사업분야 4개 페이지 본문
   │  ├─ performance.json     사업실적 표 (법원감정 186건 실제 데이터. 구조검토 행은 더 이상 화면에 쓰이지 않음)
   │  ├─ structural-performance.json  구조검토 실적 (구조검토 394건 · 가시설 설계 170건, 2026-10 실제 데이터)
   │  ├─ litigation-support.json      법원감정 송무지원 실적 (6건)
   │  ├─ history.json         연혁
   │  ├─ licenses.json        면허보유현황
   │  ├─ certificates.json    인증서
   │  ├─ equipment.json       장비보유현황 (실제 장비 16종, 2026-10 반영)
   │  ├─ qualifications.json  보유 기술자격 (면허보유현황 페이지 하단)
   │  └─ organization.json    조직도
   ├─ public/images/docs/     ← 등록증·인증서 이미지 (PDF → JPG 변환본, 개인정보 가림 처리됨)
   ├─ src/content/notices/    ← 공지사항 (.md 파일 1개 = 공지 1개)
   ├─ src/pages/              ← 페이지 (URL 구조와 동일)
   ├─ src/components/         ← 헤더, 푸터, 히어로 슬라이더, 문의 폼 등
   ├─ src/layouts/            ← BaseLayout(전체), SubLayout(서브페이지)
   ├─ src/styles/global.css   ← 색상·글꼴·공통 스타일
   └─ public/                 ← 이미지, favicon, robots.txt (그대로 배포됨)
```

## 자주 하는 작업

공지사항·연혁·사업실적은 운영자가 관리자 화면(https://hyuneng.co.kr/admin/)에서 직접 고칠 수도 있다(아래 "관리자 화면" 항목). 그 외는 Claude Code에 지시.

| 지시 예시 | 수정할 파일 |
|---|---|
| "연혁에 2026.09 ○○ 추가해줘" | `site/src/data/history.json` (최신이 위로 오도록) |
| "법원감정 실적에 ○○ 추가" | `site/src/data/performance.json` → `court-appraisal`의 `rows` 맨 앞에 추가 |
| "구조검토 / 가시설 설계 실적에 ○○ 추가" | `site/src/data/structural-performance.json` → `structural-review` 또는 `temporary-works`의 `rows` 맨 앞에 `{ title, year, tags[] }` 추가 (현장명은 ○로 가림) |
| "송무지원 실적 추가" | `site/src/data/litigation-support.json`에 `{ year, type(감정대응/사감정), client, title }` 추가 |
| "공지사항 올려줘" | `site/src/content/notices/YYYY-MM-DD-제목.md` 새로 생성 |
| "전화번호 / 주소 / 사업자번호 바꿔줘" | `site/src/data/company.json` |
| "등록증 이미지 넣어줘" | 이미지를 `site/public/images/docs/`에 복사 → `licenses.json`의 `image`에 `/images/docs/파일명` 입력 |
| "메인 사진 바꿔줘" | 이미지를 `site/public/images/hero/`에 복사 → `HeroSlider.astro`의 배경 SVG를 `<img>`로 교체 |
| "사업분야 문구 수정" | `site/src/data/business.json` |
| "견적문의 분야 선택 항목 수정" | `site/src/data/company.json` → `inquiryCategories` |
| "장비 목록 교체" | `site/src/data/equipment.json` (`sample: true` 항목은 예시이므로 실제 자료로 교체) |

### 예시 데이터 주의
`performance.json`의 `"sample": true` 항목은 디자인 확인용 예시입니다(화면에 "예시" 배지).
법원감정은 2026-10-21 실제 186건, 구조검토·가시설 설계는 2026-10 `structural-performance.json`에 실제 데이터 반영 완료.
`performance.json`의 구조검토 예시 행은 화면에 쓰이지 않으므로 신경 쓰지 않아도 됩니다.

### 법원감정 실적 갱신 방법
- 원본: `자료/수행_사건_리스트_항목구분.xlsx` (열: 사건명, 개요, 토목/구조/원가·기성고/하자/누수/아파트/골프장 = Y 표시)
- 사건번호는 반드시 숫자를 ○로 가린다 (예: 2024가합92744 → 2024가합○○○○○). 이전 작업의 PowerShell 파싱 + `merge_cases.mjs` 방식 참고.
- `performance.json`의 `court-appraisal.rows`에 `{ court, caseNo, summary, tags[] }` 형식으로 넣으면 분야 필터 버튼·검색이 자동으로 동작한다. `filters` 배열이 버튼 목록.

### 사업분야 페이지의 선택 항목 (business.json)
- `principles`: 수행 원칙 카드 3개 (법원감정에 사용)
- `lawInfo`: 관련 법령 카드 + 시설물 종류 표 + 점검 주기 표 (안전진단에 사용, 법령 개정 시 `source`의 개정일과 함께 갱신)
- `documents`: 의뢰 시 준비 자료 목록 (안전진단에 사용)

### 사업실적 공개/비공개
`site/src/data/nav.ts`의 `businessAreas`에서 `performancePublic: true/false`로 분야별 실적 페이지 공개 여부를 정합니다.
2026-10 기준 안전진단·원가계산은 실적이 없어 비공개(false), 법원감정·구조검토만 공개(true).
메뉴, 메인 주요실적, 실적 페이지 생성이 모두 이 값을 따릅니다.
사업분야 표시 순서도 `businessAreas` 배열 순서(2026-10: 법원감정 → 구조검토 → 안전진단 → 원가계산)를 따릅니다.
- 실적 페이지 구조(2026-10-27 코덱스 작업분 반영): 법원감정은 탭 2개(법원감정 `/performance/court-appraisal`, 송무지원 `/performance/court-appraisal/litigation-support`), 구조검토는 `StructuralPerformance` 컴포넌트가 탭 2개(구조검토 `/performance/structural-review`, 가시설 설계 `/performance/structural-review/temporary-works`)를 그립니다. 왼쪽 하위메뉴는 `SubLayout`에서 접히는 메뉴로 표시

### 등록증·인증서 이미지 추가 방법
1. PDF를 `자료/필요 이미지/`에 넣는다.
2. pdftoppm(설치됨: `%LOCALAPPDATA%\Microsoft\WinGet\Packages\oschwartz10612.Poppler_*\poppler-*\Library\bin\pdftoppm.exe`)으로 1쪽을 JPG로 변환: `-jpeg -jpegopt quality=85 -r 120 -f 1 -l 1 -singlefile`
3. 생년월일·개인 전화번호·개인 주소 등 개인정보가 있으면 흰 사각형으로 가린다(PowerShell System.Drawing 사용, 이전 작업 참고).
4. `site/public/images/docs/영문이름.jpg`로 저장하고 `licenses.json` 또는 `certificates.json`의 `image`에 `/images/docs/영문이름.jpg` 입력.

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

- 로컬 확인: `site` 폴더에서 `npm.cmd run dev -- --host` → http://localhost:4321 (같은 와이파이의 폰은 http://192.168.0.45:4321). 이 PC의 PowerShell은 실행 정책 때문에 `npm`이 아니라 `npm.cmd`로 써야 함
- 빌드 검증: `site` 폴더에서 `npm run build` (오류 없이 `dist/`가 만들어지면 정상)
- GitHub 저장소: https://github.com/hyunengin/hyuneng-website (비공개, 2026-10-27 첫 push 완료). 로컬 `main` → `origin/main`
- 배포: GitHub `main` 브랜치에 push하면 Cloudflare Workers(Workers Builds)가 자동 빌드·배포 (2026-10-27 연결 완료, Cloudflare 계정 hyuneng002@naver.com, 프로젝트 `hyuneng-website`)
  - 정식 주소: https://hyuneng.co.kr (www.hyuneng.co.kr 도 같은 사이트, 2026-10-27 연결 완료). 예비 주소 https://hyuneng-website.hyuneng002.workers.dev 도 계속 동작
  - 도메인 hyuneng.co.kr: 2026-10-27 가비아에서 3년 구입(만기 2029-10-27, 가비아 계정은 사장님 관리, 만기 전 연장 필요). 네임서버는 Cloudflare(`marissa.ns.cloudflare.com`, `matias.ns.cloudflare.com`). Worker `hyuneng-website`의 **Domains** 탭에 hyuneng.co.kr·www.hyuneng.co.kr을 Custom domain으로 연결(DNS 기록·인증서 자동). 가비아에서는 네임서버 외에 건드릴 것 없음
  - 배포 설정 파일: `site/wrangler.jsonc` (정적 자산 `dist`, 404 페이지 사용, name은 대시보드 Project name과 동일하게 `hyuneng-website`)
  - 대시보드 Build command `cd site && npm ci && npm run build`, Deploy command `cd site && npx wrangler deploy` (저장소 루트에서 실행되므로 `cd site` 필요)
  - 로컬에서 설정 검증: `site`에서 `npx wrangler deploy --dry-run`
- Node.js 24, Astro 5 사용. 새 패키지 추가는 꼭 필요할 때만.

### 견적문의 폼
- `company.json`의 `formspreeId`가 비어 있으면 방문자의 메일 프로그램이 열리는 방식(mailto)으로 동작
- 2026-10-26 Formspree 폼 ID `xvkkkgez` 입력 완료(가입 메일 hyuneng002@naver.com, 무료 요금제 월 50건). 사이트에서 바로 전송되고 hyuneng002@naver.com 으로 수신. ID를 바꾸려면 `formspreeId`만 수정
- 2026-10-27 Formspree 프로젝트(MY FIRST PROJECT) Settings → Restrict to Domain에 `hyuneng.co.kr` 저장(www 없이). 정식 주소에서 테스트 전송 → 네이버 메일 수신 확인. 다른 도메인에서 온 전송은 Formspree 스팸함으로 감
- 폼 ID를 넣으면 개인정보처리방침의 "처리 위탁 및 국외 이전" 조항이 자동으로 바뀜
- 검색엔진 소유확인 코드는 `company.json`의 `siteVerification.naver` / `siteVerification.google`에 content 값만 넣으면 `BaseLayout`이 `<meta>` 태그를 자동 출력 (비어 있으면 출력 안 함)
- 견적분야 선택 항목은 `company.json`의 `inquiryCategories` 배열(순서대로 표시, 마지막 "기타" 유지). 메뉴 명칭과 별개로 관리

## 관리자 화면 (Sveltia CMS, 2026-10-27 설치)
- 주소 https://hyuneng.co.kr/admin/ → **GitHub(으)로 로그인**(hyunengin 계정). 왼쪽 메뉴: 공지사항 · 연혁 · 사업실적(법원감정 실적 / 법원감정 송무지원 실적 / 구조검토·가시설 설계 실적)
- 공지 올리기: 공지사항 → 새 공지 → 제목·날짜·요약·본문 입력 → 오른쪽 위 **저장**. 지우기: 공지를 열고 ⋮ 메뉴 → 삭제. 파일명은 `YYYY-MM-DD-제목.md` 로 자동 생성(한글 제목이면 한글 파일명)
- 연혁·실적: 새 항목이 목록 맨 위에 추가됨(최신이 위). 사건번호·현장명·발주처는 ○로 가린 뒤 입력
- 저장하면 GitHub `main` 에 바로 커밋되고 Cloudflare 가 1~2분 안에 배포. **그래서 Claude Code 로 작업을 시작하기 전에 `git pull origin main` 을 먼저 할 것**(안 하면 push 가 거부됨)
- 설정 파일: `site/public/admin/config.yml`(메뉴·입력 항목·분야 선택지). 법원감정·구조검토의 "분야" 선택지는 `options` 에 고정되어 있으므로 분야 필터 버튼을 새로 만들면 options 도 같이 고친다. `performance.json` 의 비공개 예시 항목(안전진단·원가계산·구조검토 예시)은 hidden 필드로 두어 저장해도 그대로 유지됨
- 로그인 구성(OAuth 앱·Worker·변수)과 Worker 재배포 방법은 `배포가이드.md` 8-4
- 로컬 확인: `npm.cmd run dev` 후 http://localhost:4321/admin/index.html (dev 서버는 `/admin/` 만으로는 404). "로컬 저장소로 작업" 을 누르면 로그인 없이 로컬 파일을 편집할 수 있음(크롬 계열 브라우저)
- robots.txt 에 `Disallow: /admin/`, index.html 에 noindex 가 들어 있어 검색에는 잡히지 않음

## 디자인 규칙
- 기준 색: 남색 `#0C356E`, 파랑 `#3676B7` (기획안 로고색). `global.css`의 CSS 변수로 관리
- 글꼴: Pretendard (CDN)
- 로고: `Logo.astro`는 PPT 심볼을 SVG로 다시 그린 임시본. 원본 로고 파일을 받으면 교체
- 모바일(768px 이하)과 태블릿(1024px 이하)에서 반드시 확인
- 새 페이지는 `SubLayout`을 사용하고 `nav.ts`에 메뉴를 추가

## 아직 비어 있는 것 (자료 수령 후 채움)
- 인사말 페이지 오른쪽 그래픽은 로고 심볼 (대표 사진·사무실 사진을 받으면 교체 가능)

## 대표 서명 이미지
- 원본 `자료/대표님 서명.pdf`(서명 5개 스캔) 중 첫 줄 왼쪽 것을 잘라 `site/public/images/signature.png`(467×225, 투명 배경, 남색 틴트)로 만들어 인사말에 사용 중.
- 다른 서명으로 바꾸려면: pdfimages로 원본 JPG 추출 → 영역 잘라내기 → 흰 배경을 투명으로(밝기 기준 알파) → 남색(#0C356E) 틴트. 세션 임시 폴더의 `sig_crops.mjs`, `sig_final.mjs`(sharp 사용) 방식 참고.
- 메인 슬라이드 사진, 인사말 페이지 사진
- 원본 로고 벡터 파일 (`자료/필요 이미지/현구조 로고.png`는 투명 채널이 깨져 있어 사용 불가, SVG 재현본 사용 중)

## 메모
- 상호는 2026-10-21 수정안에 따라 ㈜현구조안전공사로 통일 (영문 HYUN STRUCTURAL SAFETY CORPORATION, 도메인·메일의 hyuneng 은 유지)
- 안전진단전문기관 등록번호 표기는 "제 서울-489호"
- 2차 수정안(2026-10-21): 사업분야 명칭은 "원가계산용역"(등록 전이라 '기관' 표기 금지), "건축·토목 구조검토 및 가시설 설계". 안전진단·원가계산 실적은 비공개 유지.
- 서브페이지 블록 간격은 `global.css`의 `.sub-content > * + .content-block` 규칙(72px)으로 통일. 간격이 좁아 보이면 이 값을 조정.
- 중소기업확인서(2026-05)의 주소는 513호로 되어 있으나 최신 서류 기준 801호를 사용
- 2026-10-27 검색 등록 완료: 네이버 서치어드바이저(소유확인·sitemap-index.xml 제출·메인 수집 요청), 구글 서치콘솔(URL 접두어 속성 `https://hyuneng.co.kr/`, 소유확인·sitemap-index.xml 제출·메인 색인 생성 요청). 절차는 `배포가이드.md` 8-3. 같은 날 배포·도메인·Formspree 도메인 제한·폼 테스트도 완료. 검색 반영은 며칠~몇 주 걸림
- 코덱스 등 다른 도구로 파일을 고친 경우 작업 폴더에만 남고 홈페이지에는 반영되지 않는다. 반영하려면 `git add` → `git commit` → `git push origin main`까지 해야 Cloudflare가 배포한다 (2026-10-27 코덱스 작업분 19개 파일을 이 방식으로 반영)
