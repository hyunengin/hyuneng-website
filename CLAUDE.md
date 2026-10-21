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
   │  ├─ performance.json     사업실적 4분야 표
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
`performance.json`의 `"sample": true` 항목은 디자인 확인용 예시입니다(화면에 "예시" 배지).
법원감정·구조검토 실적 목록을 받으면 예시 항목을 삭제하고 실제 데이터로 교체합니다.

### 사업실적 공개/비공개
`site/src/data/nav.ts`의 `businessAreas`에서 `performancePublic: true/false`로 분야별 실적 페이지 공개 여부를 정합니다.
2026-10 기준 안전진단·원가계산은 실적이 없어 비공개(false), 법원감정·구조검토만 공개(true).
메뉴, 메인 주요실적, 실적 페이지 생성이 모두 이 값을 따릅니다.

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
- ISO 9001 · ISO 14001 인증서 이미지 (`certificates.json`, PDF 미수령)
- 법원감정·구조검토 실적 목록 (`performance.json`, "별첨"이라고 했으나 파일 미수령 → 예시 데이터 유지 중)
- 대표이사 서명 이미지 (현재는 손글씨 웹폰트로 이름 표시, `greeting.astro`)
- 메인 슬라이드 사진, 인사말 페이지 사진
- 원본 로고 벡터 파일 (`자료/필요 이미지/현구조 로고.png`는 투명 채널이 깨져 있어 사용 불가, SVG 재현본 사용 중)
- Formspree 폼 ID, 도메인(hyuneng.co.kr) 연결

## 메모
- 상호는 2026-10-21 수정안에 따라 ㈜현구조안전공사로 통일 (영문 HYUN STRUCTURAL SAFETY CORPORATION, 도메인·메일의 hyuneng 은 유지)
- 안전진단전문기관 등록번호 표기는 "제 서울-489호"
- 중소기업확인서(2026-05)의 주소는 513호로 되어 있으나 최신 서류 기준 801호를 사용
