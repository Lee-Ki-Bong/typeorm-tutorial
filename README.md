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

##

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

**[참고]**

- 모듈 선언시 **외부에서** 설정을 가져올땐 **forRootAsync()** 를 사용하며, **직접적으로** 선언하는 경우엔 **forRoot()** 로 사용한다.
- 위 예시에선 외부에서 ConfigService를 필요로 하기 때문에 **TypeOrmModule**.forRootAsync()시 **의존성 주입을 위해 inject 를 선언**한다.
- ConfigService.**getOrThrow**('MYSQL_HOST') 는 가져올때 없으면 **오류를 발생**시킨다.
- TypeOrmModuleOptions 에 **autoLoadEntities: true** 로 줌으로서, 엔티티가 어디에 있는지 **수동으로 알릴 필요가 없다.**

##

## 제너레이터로 product 리소스 생성

```shell
nest g res product --no-spec
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
```

- **product** 라는 디렉토리가 생성되고, **dto, entities 와 컨트롤러, 서비스, 모듈 생성됨**을 확인.
- **app.module.ts** 에 product.module.ts 이 **자동으로 바인딩** 됨을 확인.

##

## product CRUD

- Entity 변환을 돕기 위한 패키지 설치

```shell
yarn add class-validator class-transformer
```

```shell
npm install class-validator class-transformer
```

- product 엔티티에 맴버 생성 & product 모듈에 엔티티 바인딩
- product create dto에 맴버 추가
- product 컨트롤러 & 서비스 함수들 async 키워드 추가.
- product 서비스 CRUD 구현

**[참고]** TypeORM에서 db 조작관련 메서드들을 호출할 때, 일반적으로 **엔티티 객체를 전달**하는 것을 **권장**.

**[장점]**
**엔티티 객체를 전달**

1. **타입 안정성**: TypeORM은 전달된 객체의 타입을 기반으로 데이터베이스에 적합한 쿼리를 생성. 엔티티를 전달함으로서 타입 안정성보장, 데이터베이스와 일치하지 않는 데이터를 삽입하려는 시도를 방지.
2. **업데이트 시 자동 감지**: 엔티티 객체를 전달하면 TypeORM은 해당 객체의 변경된 속성만을 데이터베이스에 업데이트. 이는 성능 개선과 함께 중복된 작업을 방지.
3. **관계 엔티티의 관리**: 만약 DTO 객체를 전달한다면, 관계 엔티티에 대한 관리가 어려움. 엔티티 객체를 사용하면 연관된 엔티티의 상태를 쉽게 관리.

**[DTO -> Entity 변환]**

- class-transformer 패키지의 plainToInstance() 함수를 사용하여 createProductDto를 Product 엔티티로 변환한 후, this.prdRepo.save() or update()에 넘겨줌.

**[장점]**
**plainToInstance() 사용하여 엔티티 변환**

1. 중복 제거: DTO와 엔티티 사이의 매핑 및 변환 로직을 중복으로 작성하는 대신, 간편하게 변환가능, 이는 코드의 중복을 줄이고 유지보수성을 향상.
2. 일관성: 엔티티를 통해 데이터를 저장하면 데이터베이스에 일관된 구조와 형식으로 저장. DTO를 엔티티로 변환하는 과정을 통해 데이터 일관성을 유지.

##

## relation-one-to-one

- 상품과 1:1 관계인 상품상세정보(ProductDetail) 엔티티 생성
- ProductDetail create dto 생성
- Product 엔티티에 p_product_detail 컬럼 추가 & cascade: true 추가 & @JoinColumn() 데커레이터 추가
- CreateProductDto 에 p_product_detail 추가
- Product 모듈에 ProductDetail 엔티티 바인딩
- 위 작업만으로 전반적인 관계 작업(읽기, 쓰기)이 자동으로 이루어짐을 확인.

**[참고]**

- cascade 옵션은 관계를 통해 연결된 객체 DB table의 생성, 업데이트, 삭제 등과 관련하여 어떤 동작을 수행할지를 설정하는 데 사용.
- cascade 옵션에는 다음과 같은 값들 설정가능.

1. "insert": 연관된 객체의 생성(insert)에 대한 cascade 작업을 수행.
2. "update": 연관된 객체의 업데이트(update)에 대한 cascade 작업을 수행.
3. "remove": 연관된 객체의 삭제(remove)에 대한 cascade 작업을 수행.
4. "soft-remove": 연관된 객체의 소프트 삭제(soft remove)에 대한 cascade 작업을 수행.
5. "recover": soft Delete 된 연관 객체의 복구(recover) cascade 작업을 수행.

- cascade 옵션은 배열 형태로 지정가능. 예를 들어 cascade: ["insert", "update"]
  **[장점]**
  **cascade 옵션**
  - 연관된 객체와의 데이터베이스 조작 작업을 편리하게 관리.

##

## relation-one-to-many

- 상품과 1:N 관계인 상품옵션(ProductOption) 엔티티 생성
- product 엔티티 p_product_options 컬럼 추가 & cascade: true 추가
- ProductOption 엔티티 po_product 엔티티 관계 추가
- CreateProductOptionDto 추가
- CreateProductDto 에 p_product_options 추가
- product 모듈에 productOptions 엔티티 바인딩
- 전반적인 관계 작업(읽기, 쓰기)이 자동으로 이루어짐을 확인.

## relation-many-to-many

- 상품과 N:M 관계인 상품태그(ProductTag) 엔티티 생성
- product 엔티티 p_product_tags 컬럼 추가 & cascade: true 추가
- CreateProductTagDto 추가
- CreateProductDto 에 p_product_tags 추가
- product 모듈에 ProductTag 엔티티 바인딩
- 전반적인 관계 작업(읽기, 쓰기)이 자동으로 이루어짐을 확인.
