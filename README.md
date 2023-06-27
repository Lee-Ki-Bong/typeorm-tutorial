## 초기 구성

- 프로젝트 생성

```bash
nest new
⚡  We will scaffold your app in a few seconds..
? What name would you like to use for the new project? typeorm-tutorial
? Which package manager would you ❤️  to use? yarn
```

- app.controller.ts 삭제
- app.service.ts 삭제
- app.module.ts 삭제된 컨트롤러, 서비스 관련 소스 삭제

## database-module-add

- typeorm 패키지 설치

```bash
yarn add @nestjs/typeorm typeorm mysql2
```

```bash
npm install @nestjs/typeorm typeorm mysql2
```

- env 관리를 위한 config 패키지 설치

```bash
yarn add @nestjs/config
```

```bash
npm install @nestjs/config
```

- 제너레이터로 database 모듈 생성

```bash
nest g mo database
```

src/database/database.module.ts

- .env 파일 생성
  ex)

```shell
MYSQL_HOST=tutorials-mysql-1
MYSQL_PORT=3306
MYSQL_USERNAME=root
MYSQL_PASSWORD=1234
MYSQL_DATABASE=test
MYSQL_SYNCHRONIZE=false
```

- .gitignore 에 .env 추가
- app module 에 ConfigModule.forRoot() 글로벌 옵션추가
- app module 에 database 모듈 import 바인딩 확인
- 프로젝트 구동하여 모듈들 의존성 주입 확인

```shell
[Nest] 450  - 06/27/2023, 3:13:26 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +68ms
```

### 정리

- 모듈 선언시 외부에서 설정을 가져올땐 forRootAsync() 를 사용하며, 직접적으로 선언하는 경우엔 forRoot() 로 사용한다.
- 위 예시에선 외부에서 ConfigService를 필요로 하기 때문에 TypeOrmModule.forRootAsync()시 의존성 주입을 위해 inject 를 선언한다.
- ConfigService.getOrThrow('MYSQL_HOST') 는 가져올때 없으면 오류를 발생시킨다.
- TypeOrmModuleOptions 에 autoLoadEntities: true 로 줌으로서, 모델이 어디에 있는지 수동으로 알릴 필요가 없다.

## 제너레이터로 product 리소스 생성

```shell
nest g res product --no-spec
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
```

- product 라는 디렉토리가 생성되고, dto, entities 와 컨트롤러, 서비스, 모듈 생성됨을 확인.
- 자동으로 app.module.ts 에 product.module.ts 이 바인딩 됨을 확인.
