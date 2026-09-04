# Card Pop - 코드베이스 가이드

**프로젝트**: Card Pop - 3D 카드 링크 서비스  
**목표**: 2시간 내 MVP 완성  
**상태**: 개발 중

---

## 📌 프로젝트 개요

사용자가 원하는 텍스트와 카드 컨셉을 선택하면 고유한 단축 URL이 생성되고, 그 링크를 받은 사람이 열었을 때 3D 애니메이션 카드가 팝업되면서 텍스트와 이펙트가 나타나는 서비스입니다.

**핵심 기능**:
1. 홈페이지에서 텍스트(한글 10자) + 카드 컨셉 선택
2. URL 생성 (난수 기반 단축 URL)
3. 카드 뷰에서 3D 애니메이션 + 사운드 재생

**3가지 카드 컨셉**:
- **축하 (celebration)**: 선물상자 → 포스트카드, 컨페티, 환호성
- **우울 (melancholy)**: 비 내림, 페이드인, 빗소리
- **유혹 (seduction)**: 장미 배경, 꽃잎, 사운드

---

## 🛠️ 기술 스택

| 레이어 | 기술 |
|--------|------|
| **프론트엔드** | Next.js 14+ + React 19 + TypeScript |
| **스타일링** | Tailwind CSS |
| **애니메이션** | Framer Motion + Three.js (3D) |
| **사운드** | Howler.js |
| **백엔드** | Supabase (PostgreSQL) |
| **호스팅** | Vercel |
| **패키지 매니저** | npm |

---

## 📁 폴더 구조

```
cardpop/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 홈페이지 (URL 생성)
│   │   ├── c/
│   │   │   └── [shortId]/
│   │   │       └── page.tsx      # 카드 뷰 페이지
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── CardForm.tsx          # 홈 - 입력 폼
│   │   ├── CardView.tsx          # 카드 뷰 메인 컴포넌트
│   │   ├── CelebrationCard.tsx   # 축하 컨셉 애니메이션
│   │   ├── MelancholyCard.tsx    # 우울 컨셉 애니메이션
│   │   ├── SeductionCard.tsx     # 유혹 컨셉 애니메이션
│   │   └── CopyButton.tsx        # URL 복사 버튼
│   ├── lib/
│   │   ├── supabase.ts           # Supabase 클라이언트
│   │   ├── api.ts                # API 헬퍼 함수
│   │   └── types.ts              # TypeScript 타입
│   └── hooks/
│       └── useCardAnimation.ts   # 애니메이션 커스텀 훅
├── public/
│   ├── sounds/
│   │   ├── celebration-open.mp3
│   │   ├── celebration-cheer.mp3
│   │   ├── melancholy-rain.mp3
│   │   └── seduction.mp3
│   └── images/
│       ├── clapping-people.png
│       ├── rose-man.png
│       └── ...
├── .env.local               # Supabase 환경 변수
├── .eslintrc.json          # ESLint 설정
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🗄️ 데이터 모델

### `cards` 테이블 (Supabase)

```typescript
interface Card {
  id: number;                    // PRIMARY KEY
  short_id: string;              // UNIQUE, 8-12자 난수
  concept: 'celebration' | 'melancholy' | 'seduction';
  text: string;                  // 한글 10자 이내
  created_at: timestamp;         // 생성 시간
  used: boolean;                 // 일회용 여부 (추후)
}
```

---

## 🧩 주요 함수 & 컴포넌트

### `lib/api.ts` - API 헬퍼

```typescript
// 난수 기반 ID 생성 (8-12자)
generateShortId(): string

// 카드 생성 + DB 저장
createCard(concept: string, text: string): Promise<string>

// 카드 조회
getCard(shortId: string): Promise<Card>

// 텍스트 검증 (한글, 10자 이내)
validateText(text: string): boolean
```

### `components/CardForm.tsx` - 홈 페이지 입력 폼

```typescript
export default function CardForm()
// Props: 없음
// State: 
//   - concept (축하/우울/유혹)
//   - text (입력된 텍스트)
//   - isLoading (카드 생성 중)
//   - generatedUrl (생성된 URL)
// 기능:
//   - 텍스트 입력 (한글 10자 제한)
//   - 컨셉 선택 (라디오/버튼)
//   - URL 생성 + 복사
```

### `components/CardView.tsx` - 카드 뷰 메인

```typescript
export default function CardView({ card }: { card: Card })
// Props: Card 데이터
// 기능:
//   - 컨셉에 따라 다른 컴포넌트 렌더링
//   - 애니메이션 + 사운드 자동 재생
```

### 컨셉별 컴포넌트

- `CelebrationCard.tsx`: 선물상자, 컨페티, 박수 이미지, 환호성
- `MelancholyCard.tsx`: 어두운 배경, 비 효과, 빗소리
- `SeductionCard.tsx`: 장미 배경, 꽃잎, 아저씨 이미지

---

## 🛠️ 개발 가이드라인

### 1️⃣ TDD 적용 (Test-Driven Development)

**새로운 기능을 구현할 때는 TDD를 따릅니다**:

```
테스트 작성 → 테스트 실패 확인 → 구현 → 테스트 통과 → 리팩토링
```

#### 테스트 파일 위치
- 컴포넌트: `src/components/__tests__/[Component].test.tsx`
- 유틸리티: `src/lib/__tests__/[file].test.ts`

#### 테스트 명령어
```bash
npm test                    # 전체 테스트 실행
npm test -- --watch        # watch 모드
npm test -- --coverage     # 커버리지 리포트
```

#### 예시: `api.test.ts`
```typescript
import { generateShortId, validateText } from '@/lib/api';

describe('generateShortId', () => {
  it('should generate 8-12 char random ID', () => {
    const id = generateShortId();
    expect(id.length).toBeGreaterThanOrEqual(8);
    expect(id.length).toBeLessThanOrEqual(12);
  });

  it('should return different IDs each time', () => {
    const id1 = generateShortId();
    const id2 = generateShortId();
    expect(id1).not.toBe(id2);
  });
});

describe('validateText', () => {
  it('should accept Korean text up to 10 characters', () => {
    expect(validateText('안녕하세요')).toBe(true);
    expect(validateText('가나다라마바사')).toBe(true); // 7자
  });

  it('should reject text over 10 characters', () => {
    expect(validateText('초과합니다안녕11자')).toBe(false);
  });

  it('should reject non-Korean text', () => {
    expect(validateText('hello')).toBe(false);
    expect(validateText('123')).toBe(false);
  });
});
```

---

### 2️⃣ Linting 및 포맷팅

**모든 코드 수정 후 linter를 반드시 실행합니다**:

#### ESLint 설정
- 설정 파일: `.eslintrc.json`
- 규칙: ESLint recommended + Next.js 권장
- 코드 스타일: Tailwind CSS 클래스 순서 제약

#### Linter 명령어
```bash
npm run lint                # 전체 린트 검사
npm run lint:fix            # 자동 수정 가능한 문제 수정
npm run lint -- src/        # 특정 디렉토리만 검사
```

#### Pre-commit Hook (선택사항)
Husky를 통해 커밋 전 자동 linting 실행 가능:
```bash
npm install husky lint-staged --save-dev
npx husky install
```

#### Prettier (선택사항)
```bash
npm install prettier --save-dev
npm run format              # 포맷팅 실행
npm run format:check        # 확인만
```

---

### 3️⃣ 코드 스타일 규칙

#### TypeScript
- 타입 명시 (암묵적 any 금지)
- 인터페이스명: PascalCase (예: `CardProps`)
- 함수명: camelCase (예: `generateShortId`)
- 상수명: UPPER_SNAKE_CASE (예: `MAX_TEXT_LENGTH`)

#### React 컴포넌트
- 함수형 컴포넌트만 사용
- Props 타입 명시
- export default는 파일 끝에만

```typescript
interface CardFormProps {
  onSubmit: (concept: string, text: string) => Promise<void>;
}

export default function CardForm({ onSubmit }: CardFormProps) {
  // ...
}
```

#### Tailwind CSS
- 유틸리티-first 접근
- 클래스명 길이 제한 없음 (가독성 우선)

```tsx
<div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-yellow-100 to-yellow-50">
```

---

### 4️⃣ 커밋 메시지 규칙

```
<type>: <subject>

<body>
```

#### Type:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `test`: 테스트 추가/수정
- `refactor`: 코드 개선
- `style`: 스타일링 (UI/CSS)
- `docs`: 문서 작성
- `chore`: 환경 설정, 의존성

#### 예시:
```
feat: add celebration card animation with confetti effect

- Implement gift box opening animation
- Add confetti falling effect
- Play cheering sound at 1s mark
```

---

## 🚀 개발 워크플로우

### 1단계: 기능 개발
```bash
# 1. 테스트 먼저 작성 (TDD)
# 2. 구현
npm run dev                 # 로컬 개발 서버 시작

# 3. 수정 후 Linting
npm run lint:fix

# 4. 테스트 통과 확인
npm test
```

### 2단계: 커밋
```bash
git add .
git commit -m "feat: add celebration card animation"
```

### 3단계: 배포
```bash
# GitHub에 푸시 → Vercel 자동 배포
git push origin main
```

---

## 📋 API 문서

### `POST /api/cards` (추후 추가)
```json
Request:
{
  "concept": "celebration",
  "text": "축하해요!"
}

Response:
{
  "short_id": "abc123xyz",
  "url": "https://cardpop.vercel.app/c/abc123xyz"
}
```

### `GET /api/cards/[shortId]` (추후 추가)
```json
Response:
{
  "concept": "celebration",
  "text": "축하해요!",
  "created_at": "2026-09-04T10:30:00Z"
}
```

---

## ⚡ 성능 최적화

- **이미지**: Next.js Image 컴포넌트 사용
- **사운드**: 필요할 때만 로드 (Howler.js lazy load)
- **애니메이션**: Framer Motion의 `will-change` 활용
- **코드 스플리팅**: 동적 import로 번들 크기 최소화

```typescript
// 카드 컴포넌트 동적 로드
const CelebrationCard = dynamic(() => import('@/components/CelebrationCard'), {
  loading: () => <div>Loading...</div>,
});
```

---

## 🧪 테스트 전략

### 단위 테스트 (Unit Tests)
- API 함수 (`generateShortId`, `validateText`)
- 유틸리티 함수

### 통합 테스트 (Integration Tests)
- Supabase와의 데이터 저장/조회
- 카드 생성 → URL 접속 전체 흐름

### E2E 테스트 (End-to-End Tests) - 추후
- Playwright 또는 Cypress
- 홈페이지 입력 → URL 생성 → 카드 뷰 재생

---

## 🔒 보안 주의사항

1. **환경 변수**: `.env.local`은 git에 커밋하지 말 것
2. **Supabase Key**: public/private key 구분 사용
3. **SQL Injection**: Supabase의 parameterized query 사용
4. **CORS**: 필요시 Supabase CORS 설정 확인
5. **단축 ID**: 난수 기반이므로 공격자가 ID를 예측하기 어려움

---

## 📞 문제 해결 (Troubleshooting)

### 테스트 실패
```bash
# 캐시 초기화
npm test -- --clearCache
```

### Supabase 연결 실패
- `.env.local`에서 API URL/Key 확인
- Supabase 대시보드에서 테이블 RLS 정책 확인
- 네트워크 연결 확인

### 사운드 재생 안 됨
- 브라우저 자동 재생 정책 확인 (HTTPS, 사용자 상호작용 필요)
- 사운드 파일 경로 확인

### 애니메이션 버벅
- 성능 모니터링 (DevTools Lighthouse)
- Framer Motion `will-change` 확인
- 입자 수 조절

---

## 🎓 학습 자료

- [Next.js 공식 문서](https://nextjs.org)
- [React 공식 문서](https://react.dev)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)
- [Supabase 튜토리얼](https://supabase.com/docs)

---

## ✅ 체크리스트 (개발 완료 기준)

- [ ] 모든 테스트 통과 (`npm test`)
- [ ] Linter 통과 (`npm run lint`)
- [ ] 로컬 개발 테스트 완료 (`npm run dev`)
- [ ] Vercel 배포 완료
- [ ] 실제 링크에서 카드 애니메이션 + 사운드 확인
- [ ] 3가지 컨셉 모두 작동 확인

---

**마지막 업데이트**: 2026-09-04

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
