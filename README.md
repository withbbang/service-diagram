# 다양한 서비스 다이어그램 제작 웹애플리케이션

### 프로젝트 목적

> 여러 서비스의 다이어그램들을 한번에 제작할 수 있게 하기 위함<br/>
> 다이어그램 파일들의 유실 및 파일을 찾는데 시간 소모를 방지하기 위함<br/>
> 개인 포트폴리오

---

### 제공하는 기능

- Sequence Diagram: 프로세스나 로직을 top down 방식으로 제작할 수 있게 도와주는 기능
- Flow Diagram: 시나리오 Flow를 제작할 수 있게 도와주는 기능
- Entity Relation Diagram: 개체관계형 데이터베이스 관계도를 제작할 수 있게 도와주는 기능

---

### 프로젝트 구조

```
Service Diagrams
├─ 📁config
├─ 📁public
├─ 📁scripts
├─ 📁src
│  ├─ 📁components
│  ├─ 📁middlewares
│  ├─ 📁modules
│  ├─ 📁screens
│  ├─ 📁scss
│  ├─ 📄App.tsx
│  ├─ 📄global.d.ts
│  └─ 📄index.tsx
├─ 📄.gitignore
├─ 📄.prettierrc
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
├─ 📄Todo.txt
└─ 📄tsconfig.json
```

---

### 파일 설명

- 📁config: CRA의 기초 구성 파일을 담고 있는 폴더 (scss 설정을 위함)
- 📁scripts: CRA의 동작 명령어를 담고 있는 폴더
- 📄global.d.ts: 타입스크립트가 지원하지 않는 타입을 추가하는 프로젝트 한정 글로벌 파일
- 📄.prettierrc: 프리티어 설정 파일
- Todo.txt: 현재 프로젝트의 Todo List

---

### 사용한 대표 라이브러리

#### 1. React Flow

> https://reactflow.dev/<br/>
> Flow, Entity Relation Diagram 제작에 사용한 라이브러리
>
> ```terminal
> > npm i --save reactflow
> ```

#### 2. React Sequence Diagram

> https://github.com/zfanta/react-sequence-diagram<br/>
> Sequence Diagram 제작에 사용한 라이브러리
>
> ```terminal
> > npm i --save react-sequence-diagram
> ```

---

### 주요 학습 내용

> 1. svg 이미지 만드는 방법
>    > - svg 태그 내에 태그들을 조작하며 직접 이미지를 만듦 (marker, link)
>    > - path 태그의 베지어 곡선 원리를 파악하여 해당 방정식을 이용하여 dom 추가
> 2. useCallback의 사용법
> 3. useRef의 사용법
> 4. scss를 전역적으로 사용하는 법

### 구현 화면
