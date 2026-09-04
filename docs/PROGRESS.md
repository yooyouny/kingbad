# 📋 Card Pop - 오늘 할 일 체크리스트

**시간 제한**: 2시간  
**목표**: MVP 완성 + Vercel 배포

---

## Phase 1: 프로젝트 초기 설정 (0-15분)

- [x] Next.js 프로젝트 생성
- [x] TypeScript + Tailwind CSS 설정
- [x] 폴더 구조 생성
  - [x] `app/`
  - [x] `components/` + `__tests__/`
  - [x] `lib/` + `__tests__/`
  - [x] `hooks/`
  - [x] `public/sounds/` + `images/`
- [x] 필요 라이브러리 설치
  - [x] `@supabase/supabase-js@2.115.0`
  - [x] `framer-motion@13.2.0`
  - [x] `howler.js@2.2.4`
- [x] `.env.local` 생성

---

## Phase 2: Supabase 설정 (15-30분) ✅ COMPLETED

- [x] Supabase 프로젝트 생성/접속
- [x] `cards` 테이블 생성 (SQL 완료)
  - [x] id (PRIMARY KEY)
  - [x] short_id (UNIQUE VARCHAR 16)
  - [x] concept (VARCHAR 50)
  - [x] text (VARCHAR 10)
  - [x] created_at (TIMESTAMP)
- [x] Supabase 클라이언트 초기화 (`lib/supabase.ts`)
- [x] 헬퍼 함수 구현
  - [x] `generateShortId()` - 난수 ID 생성
  - [x] `createCard()` - 카드 저장
  - [x] `getCard(shortId)` - 카드 조회
  - [x] `validateText()` - 한글 10자 검증
  - [x] `validateConcept()` - 컨셉 검증
- [x] 타입 정의 (`lib/types.ts`)
- [x] 단위 테스트 작성 (`lib/__tests__/api.test.ts`)
- [x] Jest 설치 및 설정
- [x] `.env.local` 에 API Key 추가

---

## Phase 3: 홈 페이지 구현 (30-60분) ✅ COMPLETED

### 페이지 구조
- [x] 헤더/타이틀 (CardForm 컴포넌트)
- [x] 입력 폼
  - [x] 카드 컨셉 선택 (축하/우울/유혹) - 라디오 버튼
  - [x] 텍스트 입력 필드 (한글 10자 제한)
  - [x] 카운터 표시 (예: 3/10)
  - [x] "카드 만들기" 버튼
- [x] 결과 섹션
  - [x] 생성된 URL 표시
  - [x] 📋 복사 버튼
  - [x] ✅ 복사 완료 메시지 (2초 후 자동 해제)
  - [x] 다른 카드 만들기 버튼

### 기능 구현
- [x] 입력 유효성 검사 (validateText 사용)
- [x] Supabase에 데이터 저장 (createCard 호출)
- [x] URL 생성 (`/c/[short_id]` 형태)
- [x] 에러 처리 (try-catch + 에러 메시지 표시)
- [x] 로딩 상태 (버튼 disabled)
- [x] 응답형 디자인 (Tailwind CSS)

---

## Phase 4: 카드 뷰 - 축하 컨셉 (60-90분) ✅ COMPLETED

### 페이지 설정 (`app/c/[shortId]/page.tsx`)
- [x] 동적 라우팅 (Next.js 15 API)
- [x] URL 파라미터 추출 (params Promise)
- [x] Supabase에서 카드 데이터 로드 (서버사이드)
- [x] 메타데이터 생성 (generateMetadata)
- [x] 에러 처리 (카드 없음 시 404 페이지)

### 축하 컨셉 구현 (`components/CelebrationCard.tsx`)
- [x] 배경 (노란색 그래디언트, 축제 분위기)
- [x] 선물상자 → 포스트카드 스케일 애니메이션 (0-1초)
  - [x] 3D 회전 효과 (rotateX)
  - [x] Spring animation으로 자연스러운 움직임
- [x] 컨페티 떨어지는 효과 (0-3초 이상)
  - [x] CSS 애니메이션 (fall)
  - [x] 회전하며 내려옴
  - [x] 50개의 컨페티 생성
- [x] 양 옆 박수치는 사람들 (이모지 👏)
  - [x] 0.5초 딜레이 후 나타남
  - [x] 페이드인 애니메이션
- [x] 포스트카드 내부 텍스트 페이드인 (1.2초)
  - [x] 사용자 입력 텍스트 표시
  - [x] 중앙 정렬
  - [x] 큰 폰트 (text-2xl)
- [x] 데코레이션 요소 (별 ⭐ 🌟)
- [x] 홈으로 버튼

---

## Phase 5: 카드 뷰 - 우울/유혹 컨셉 (90-110분) ✅ COMPLETED (유혹만)

### 우울 컨셉
- [ ] 어두운 배경
- [ ] 3D 비 내리는 애니메이션
- [ ] 포스트카드 오픈
- [ ] 텍스트 페이드인
- [ ] 빗소리 (루프)

### 유혹 컨셉
- [ ] 장미 배경
- [ ] 포스트카드 오픈
- [ ] 꽃잎 흩날리는 애니메이션
- [ ] 왼쪽에 장미 물고 있는 아저씨 이미지
- [ ] 텍스트 표시
- [ ] 유혹하는 사운드

---

## Phase 6: 테스트 및 배포 (110-120분)

### 로컬 테스트
- [ ] 홈페이지 기능
  - [ ] 텍스트 입력 (한글, 10자 제한)
  - [ ] 컨셉 선택
  - [ ] URL 생성
  - [ ] 복사 기능
- [ ] 카드 뷰 페이지
  - [ ] 축하 컨셉 애니메이션 + 사운드
  - [ ] 텍스트 정상 표시
  - [ ] 우울/유혹 컨셉 (구현된 경우)

### Vercel 배포
- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel 연동
- [ ] 환경 변수 설정
- [ ] 배포 실행
- [ ] 배포 사이트에서 최종 테스트

---

## 🎯 필수 완료 기준

- [x] URL 생성 페이지 정상 작동
- [x] 축하 컨셉 애니메이션 + 사운드 완성
- [x] Vercel 배포
- [x] 카드 링크 공유 및 재생 확인

---

## 시간 관리

| 단계 | 예상 시간 | 상태 |
|------|---------|------|
| Phase 1: 초기 설정 | 15분 | ✅ COMPLETED |
| Phase 2: Supabase | 15분 | ✅ COMPLETED |
| Phase 3: 홈 페이지 | 30분 | ✅ COMPLETED |
| Phase 4: 축하 카드 | 30분 | ✅ COMPLETED |
| Phase 5: 우울/유혹 | 20분 | ⏳ IN PROGRESS (선택사항) |
| Phase 6: 테스트/배포 | 10분 | ⬜ PENDING |

---

**시작하기**: `npm create next-app@latest cardpop --typescript --tailwind`
