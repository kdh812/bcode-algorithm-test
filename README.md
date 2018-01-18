# bcode-algorithm-test

* 기본 정보

1. 갤럭시 S3 사진 해상도 최대 : 3264x2448
2. A4 용지 캡쳐 해상도 : 1070x1518
3. 갤럭시 S3 에서 찍은 사진의 A4 용지의 최대 영역 : 3264x2300
4. A4 용지에서 비코드 해상도 : 154x154
5. 갤럭시 S3 에서의 해상도 : 330x330
6. 최종 리사리즈 해상도 : 150x150

* 현재 엔진 성능

1. 기본 성능 : 8.33%
2. 가장자리 크롭 : 37.96%

* 요구 사항

1. 데이터셋을 더 정교하게 만들어야 함
2. 실제 용지에 색칠해서 데이터셋을 새로 만들어 보자

* 사용 방법

git clone https://github.com/kdh812/bcode-algorithm-test
cd bcode-algorithm-test
npm install
node index.js