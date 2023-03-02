# 领域模型

这里放领域模型相关的代码，例如实体、值对象、聚合根。

实体：
实体是唯一的且可持续变化的，实体以 DO（领域对象）的形式存在，每个实体对象都有唯一的 ID

值对象：
将一个值用对象的方式进行表述，来表达一个具体的固定不变的概念，比如订单中的地址，或者下单时间

聚合根：
聚合根也是实体，拥有实体的属性和业务行为，实现自身的业务逻辑，同时它也负责协调实体和值对象按照固定的业务规则协同完成共同的业务逻辑