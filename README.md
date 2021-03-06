# CO-kkiri-server

Node.js, Express, Mongoose 실습을 위한 프로젝트 입니다




## 1. 프로젝트 세팅
1. 원하는 곳에 서버프로젝트를 만든다
2. 서버 프로젝트 내에서 npm으로 express를 설치한다
3. 서버 프로젝트 내에서 main.js를 만든다

## 2. Main.js 작성
1. 서버 기본
2. 라우터 사용
3. 미들웨어 추가

+ 여기까지 진행할 때 참고한 자료
  > + [React & Express를 이용한 웹 어플리케이션 개발하기](https://www.inflearn.com/course/react-%EA%B0%95%EC%A2%8C-velopert/lecture/4169)
  > + 섹션 6 : Backend만 참고 (강의 전체를 다 보면 좋을 것 같지만 시간관계상 일단 섹션 6만 보고 진행했어요)
  > + <http://slides.com/minjunkim-1/react-codelab-backends#/7> (위 강의의 슬라이드인데 코드 복사해오기 편해요)


## 3. MongoDB 연동
1. MongoDB 설치 및 실행
2. MongoDB를 위한 미들웨어 추가
3. MongoDB 연결
4. 데이터 모델
5. 데이터 생성/조회/수정/삭제 API 작성

+ 여기까지 진행할 때 참고한 자료
  > + [MongoDB 강좌 1편: 소개, 설치 및 데이터 모델링](https://velopert.com/436)
  > + [Express와 Mongoose를 통해 MongoDB와 연동하여 RESTful API 만들기](https://velopert.com/594)
  > + [PostMan 사용방법](https://meetup.toast.com/posts/107)


## 기타 참고자료
  > [Node.js 튜토리얼](https://poiemaweb.com/nodejs-basics)


## 4. TDD 적용
1. 필요한 모듈 설치
```
npm install --save-dev mocha chai supertest
npm install --save-dev babel-cli babel-preset-node6 babel-register
```
2. 스크립트 및 기본 테스트
3. 테스트 코드 추가

+ 여기까지 진행할 때 참고한 자료
  > + [Node.js 로 TDD 를 도전해보자](https://seokjun.kim/node-js-tdd/)
  > + [compilers deprecation](https://github.com/mochajs/mocha/wiki/compilers-deprecation)
  > + [mongoose 테스트 및 node 연동](https://harrythegreat.tistory.com/entry/mongoose-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%B0%8F-node-%EC%97%B0%EB%8F%99)

## 5. 보안에도 신경쓰자

