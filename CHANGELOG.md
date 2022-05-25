# [0.9.1](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.9.0...v0.9.1) (2022-05-25)

### Bug Fixes

- fix db name in many-to-many tables, relations and field names

# [0.9.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.9.0-dev.1...v0.9.0) (2022-04-04)

### Features

- **primitive list**: add support for primitive list ([30](https://github.com/notiz-dev/prisma-dbml-generator/pull/30))
- add map db name option ([50ef8cf](https://github.com/notiz-dev/prisma-dbml-generator/commit/50ef8cf498fff7d703ad1ae420b56cfbabdcdbff)), #18 


## [0.8.3](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.8.2...v0.8.3) (2021-12-01)

### Bug Fixes 

* **comments**: fix multiple quotes in comments ([#27](https://github.com/notiz-dev/prisma-dbml-generator/pull/27))


## [0.8.2](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.8.1...v0.8.2) (2021-11-16)


### Bug Fixes

* **referential-actions-map:** add map between prisma and DBML referential actions ([#25](https://github.com/notiz-dev/prisma-dbml-generator/issues/25)) ([913adc1](https://github.com/notiz-dev/prisma-dbml-generator/commit/913adc129cbb542a243bad3142901c1cf1b8bc5f))



## [0.8.1](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.8.0...v0.8.1) (2021-10-01)


### Bug Fixes

* **default:** add quotes around json default, closes [#22](https://github.com/notiz-dev/prisma-dbml-generator/issues/22) ([b848d1c](https://github.com/notiz-dev/prisma-dbml-generator/commit/b848d1c25541ed9bd24dc28726a3ea7cf7961b68))



# [0.8.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.7.0...v0.8.0) (2021-09-22)


### Features

* **prisma:** update to prisma@3.0.2, closes [#20](https://github.com/notiz-dev/prisma-dbml-generator/issues/20) ([74b492e](https://github.com/notiz-dev/prisma-dbml-generator/commit/74b492e377b6b5c2bfa2022fb5f0a3ddf3de0009))
* **referentialActions:** add relationOnDelete ([#16](https://github.com/notiz-dev/prisma-dbml-generator/issues/16)) ([559a7a3](https://github.com/notiz-dev/prisma-dbml-generator/commit/559a7a3ee9cd792a5921bce80fb80a74a8c173c1))



# [0.8.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.7.0...v0.8.0) (2021-09-22)


### Features

* **prisma:** update to prisma@3.0.2, closes [#20](https://github.com/notiz-dev/prisma-dbml-generator/issues/20) ([74b492e](https://github.com/notiz-dev/prisma-dbml-generator/commit/74b492e377b6b5c2bfa2022fb5f0a3ddf3de0009))



# [0.7.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.6.0...v0.7.0) (2021-08-11)

### BREAKING CHANGES

Prisma introduced a breaking change of the internal DMMF API. If you are using Prisma [2.29.0](https://github.com/prisma/prisma/releases/tag/2.29.0) or newer install version 0.7.0](https://github.com/notiz-dev/prisma-dbml-generator/releases/tag/v0.7.0) or newer. If you are using Prisma prior to 2.29.0 stay with version 0.6.0](https://github.com/notiz-dev/prisma-dbml-generator/releases/tag/v0.6.0).

| Prisma                                                           | prisma-dbml-generator                                                            |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| >=[2.29.0](https://github.com/prisma/prisma/releases/tag/2.29.0) |  [0.7.0](https://github.com/notiz-dev/prisma-dbml-generator/releases/tag/v0.7.0) |
|  <2.29.0                                                         |  [0.6.0](https://github.com/notiz-dev/prisma-dbml-generator/releases/tag/v0.6.0) |

### Features

- **indices:** update primary and unique indices for prisma 2.29 ([8ac5f75](https://github.com/notiz-dev/prisma-dbml-generator/commit/8ac5f7578df1cb8fb22d9f9c3eaec7f6529f1ae0))

# [0.6.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.6.0-dev.0...v0.6.0) (2021-06-08)

### Bug Fixes

- **dbml:** fix md parser ([efb544f](https://github.com/notiz-dev/prisma-dbml-generator/commit/efb544f88cc0a8505538fdb52702d51a7c1518f0))
- **m-n-relation:** catch invalid m-n-relation ([d5d3494](https://github.com/notiz-dev/prisma-dbml-generator/commit/d5d349423cbf54ebff8778c9cb69da2813ecf867))
- **note:** escape single quote from documentation, closes [#13](https://github.com/notiz-dev/prisma-dbml-generator/issues/13) ([f78d7dc](https://github.com/notiz-dev/prisma-dbml-generator/commit/f78d7dcd7ad447f376a757d8fa4a767bf837e7ae))

# [0.5.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.4.0...v0.5.0) (2021-04-01)

### Bug Fixes

- add support for prisma ^2.20 ([a280871](https://github.com/notiz-dev/prisma-dbml-generator/commit/a28087125132fde148d5bcebdb836dcff000d5c7))

# [0.4.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.3.1...v0.4.0) (2020-11-19)

### Features

- **indexes:** include block level id ([221da9c](https://github.com/notiz-dev/prisma-dbml-generator/commit/221da9c27f44e3e07ff391ee56a88f21a71360b4))
- **indexes:** include block level unique indexes ([67d8fd7](https://github.com/notiz-dev/prisma-dbml-generator/commit/67d8fd7585ef1194f6e1a70b8b1589bea7dabe9c))

## [0.3.1](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.3.0...v0.3.1) (2020-09-24)

### Bug Fixes

- **self-relations:** use name for join fields instead of type ([b62dc66](https://github.com/notiz-dev/prisma-dbml-generator/commit/b62dc669d9d04c51058d7c109cc0c71e5c65b245))

# [0.3.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.2.3...v0.3.0) (2020-09-18)

### Bug Fixes

- **many-to-many:** disable m-n-table generation ([028d0b6](https://github.com/notiz-dev/prisma-dbml-generator/commit/028d0b6108e11a6d0e5cc8a2f8569fba1682a850))

### Features

- **deps:** move @prisma/client to devDeps ([f6ee512](https://github.com/notiz-dev/prisma-dbml-generator/commit/f6ee51211fa78c8d1d851464a6806b0f55f43951))
- **many-to-many:** generate join table ([f0e2923](https://github.com/notiz-dev/prisma-dbml-generator/commit/f0e29236d712f0bb848bb46d4e9e9c44c101284b))
- **many-to-many:** option to disable m-n table ([b4615e7](https://github.com/notiz-dev/prisma-dbml-generator/commit/b4615e788f6cb1ffdc1e3296dac0823eb23fde2e))
- **output-name:** add option for outputName ([a876bec](https://github.com/notiz-dev/prisma-dbml-generator/commit/a876bec62cf7b28fedb96125e179f8b9d550932d))

## [0.2.3](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.2.2...v0.2.3) (2020-09-16)

### Bug Fixes

- **default:** table default for string values ([86ee44f](https://github.com/notiz-dev/prisma-dbml-generator/commit/86ee44fa07bf0b5e2eba050afa22f8a13b3a2ee3))

## [0.2.2](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.2.0...v0.2.2) (2020-09-15)

### Bug Fixes

- **docs:** prisma generate command ([fd5b78f](https://github.com/notiz-dev/prisma-dbml-generator/commit/fd5b78fb1b893a79b3e05306a8e846564140df01))
- **npm:** ignore files from npm publish ([a288cfc](https://github.com/notiz-dev/prisma-dbml-generator/commit/a288cfce816c7de6e93f0e3673d6399572c4e921))

## [0.2.1](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.2.0...v0.2.1) (2020-09-15)

### Bug Fixes

- **docs:** prisma generate command ([fd5b78f](https://github.com/notiz-dev/prisma-dbml-generator/commit/fd5b78fb1b893a79b3e05306a8e846564140df01))

# [0.2.0](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.1.0...v0.2.0) (2020-09-15)

### Bug Fixes

- **dmbl:** comment out test.json file ([5532bbc](https://github.com/notiz-dev/prisma-dbml-generator/commit/5532bbc2fd579f312bf36cdf17f98f5eb48b3d36))
- **relations:** add test cases for relations ([e68fc5f](https://github.com/notiz-dev/prisma-dbml-generator/commit/e68fc5ff36061d4431ce8156b3905cba1c2525e0))
- point bin to dist ([547191c](https://github.com/notiz-dev/prisma-dbml-generator/commit/547191c4253f5c06dd5b82fa9fb49884feb29c10))

### Features

- **dbml:** add autogenerated comment ([2a13128](https://github.com/notiz-dev/prisma-dbml-generator/commit/2a1312848cc8771bd789de576e420c70038e23c8))
- **dbml:** test dbml generation ([2647684](https://github.com/notiz-dev/prisma-dbml-generator/commit/264768451ef41b5449bebabf645793ad1236b20f))
- **default:** add '' around enum default values ([a1117b3](https://github.com/notiz-dev/prisma-dbml-generator/commit/a1117b3f81d0ca7fdc7a3d8f403eccd6676f3676))
- **enums:** add single enum test ([d25b592](https://github.com/notiz-dev/prisma-dbml-generator/commit/d25b592b6e9ea41bb12d7e68502bbc9dea1825d6))
- **generator:** update prettyName ([9b4e487](https://github.com/notiz-dev/prisma-dbml-generator/commit/9b4e487b66a9a00624ca3c3dda1e76d0327648c2))
- **prisma:** switch to prisma 2.6.0 dev version ([e0dcd2b](https://github.com/notiz-dev/prisma-dbml-generator/commit/e0dcd2b39ab945a48af98c83105c39bd81d9dfbd))
- **relations:** add none relationship test ([1919576](https://github.com/notiz-dev/prisma-dbml-generator/commit/191957665e4c26f10d14ad0bd13b148879aa5d70))
- **table:** add simple table test ([f852af4](https://github.com/notiz-dev/prisma-dbml-generator/commit/f852af497fd43d153e02db033fab4a77a770d56f))
- **tests:** adding tests for relations ([e4be803](https://github.com/notiz-dev/prisma-dbml-generator/commit/e4be8037d852a1c32dea0ee62aede1a19ee53ef4))

## [0.1.5](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.1.0...v0.1.5) (2020-09-01)

### Bug Fixes

- **dmbl:** comment out test.json file ([5532bbc](https://github.com/notiz-dev/prisma-dbml-generator/commit/5532bbc2fd579f312bf36cdf17f98f5eb48b3d36))
- **relations:** add test cases for relations ([e68fc5f](https://github.com/notiz-dev/prisma-dbml-generator/commit/e68fc5ff36061d4431ce8156b3905cba1c2525e0))
- point bin to dist ([547191c](https://github.com/notiz-dev/prisma-dbml-generator/commit/547191c4253f5c06dd5b82fa9fb49884feb29c10))

### Features

- **default:** add '' around enum default values ([a1117b3](https://github.com/notiz-dev/prisma-dbml-generator/commit/a1117b3f81d0ca7fdc7a3d8f403eccd6676f3676))
- **generator:** update prettyName ([9b4e487](https://github.com/notiz-dev/prisma-dbml-generator/commit/9b4e487b66a9a00624ca3c3dda1e76d0327648c2))
- **prisma:** switch to prisma 2.6.0 dev version ([e0dcd2b](https://github.com/notiz-dev/prisma-dbml-generator/commit/e0dcd2b39ab945a48af98c83105c39bd81d9dfbd))
- **tests:** adding tests for relations ([e4be803](https://github.com/notiz-dev/prisma-dbml-generator/commit/e4be8037d852a1c32dea0ee62aede1a19ee53ef4))

## [0.1.4](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.1.0...v0.1.4) (2020-09-01)

### Bug Fixes

- **relations:** add test cases for relations ([e68fc5f](https://github.com/notiz-dev/prisma-dbml-generator/commit/e68fc5ff36061d4431ce8156b3905cba1c2525e0))
- point bin to dist ([547191c](https://github.com/notiz-dev/prisma-dbml-generator/commit/547191c4253f5c06dd5b82fa9fb49884feb29c10))

### Features

- **default:** add '' around enum default values ([a1117b3](https://github.com/notiz-dev/prisma-dbml-generator/commit/a1117b3f81d0ca7fdc7a3d8f403eccd6676f3676))
- **generator:** update prettyName ([9b4e487](https://github.com/notiz-dev/prisma-dbml-generator/commit/9b4e487b66a9a00624ca3c3dda1e76d0327648c2))
- **prisma:** switch to prisma 2.6.0 dev version ([e0dcd2b](https://github.com/notiz-dev/prisma-dbml-generator/commit/e0dcd2b39ab945a48af98c83105c39bd81d9dfbd))
- **tests:** adding tests for relations ([e4be803](https://github.com/notiz-dev/prisma-dbml-generator/commit/e4be8037d852a1c32dea0ee62aede1a19ee53ef4))

## [0.1.2](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.1.0...v0.1.2) (2020-08-27)

### Bug Fixes

- point bin to dist ([547191c](https://github.com/notiz-dev/prisma-dbml-generator/commit/547191c4253f5c06dd5b82fa9fb49884feb29c10))

### Features

- **default:** add '' around enum default values ([a1117b3](https://github.com/notiz-dev/prisma-dbml-generator/commit/a1117b3f81d0ca7fdc7a3d8f403eccd6676f3676))

## [0.1.1](https://github.com/notiz-dev/prisma-dbml-generator/compare/v0.1.0...v0.1.1) (2020-08-27)

### Features

- **default:** add '' around enum default values ([a1117b3](https://github.com/notiz-dev/prisma-dbml-generator/commit/a1117b3f81d0ca7fdc7a3d8f403eccd6676f3676))

# 0.1.0 (2020-08-20)

### Bug Fixes

- **relationship:** fix combinekeys parameter ([fa5e0a6](https://github.com/notiz-dev/prisma-dbml-generator/commit/fa5e0a63869b703aab42313fed79d7a1d8f9b20c))

### Features

- **column-definition:** add column defintion to table fields ([cdf38aa](https://github.com/notiz-dev/prisma-dbml-generator/commit/cdf38aaa00821a099f9cbbfc31954a56ddfa0de0))
- **enum:** generate enum ([da508cb](https://github.com/notiz-dev/prisma-dbml-generator/commit/da508cbf22ee5367839e9486b6752c490f59f2c0))
- **relationship:** combine composite foreign keys ([ea63aae](https://github.com/notiz-dev/prisma-dbml-generator/commit/ea63aaec9b35fa27685d3e3ca1fc55581187aeb5))
- **relationship:** find correct relation ([35d6bae](https://github.com/notiz-dev/prisma-dbml-generator/commit/35d6bae52a9628673adac78f6fc034b666831c7c))
- **relationship:** generate relationship ([a9db1a2](https://github.com/notiz-dev/prisma-dbml-generator/commit/a9db1a2f1f319451f52ee6eec1120ba2ab19cac5))
- **table:** add table documentation ([af4308e](https://github.com/notiz-dev/prisma-dbml-generator/commit/af4308e40c5f5c9653a096fc13cddcc23e166a2a))
