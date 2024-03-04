---
author: chang
title: Enum
description: ""
pubDatetime: 2022-11-07 11:46:24
---

# Enum

enum 在 Kotlin 裡面經常被用來封裝有限狀態，官網給的範例是

```kotlin=
enum class Direction {
    NORTH, SOUTH, WEST, EAST
}
```

在程式中我們會更常這樣使用

```kotlin=
fun main() {
    val ii = CoffeeType.fromInt(0)
    when(ii){
        CoffeeType.ESPRESSO -> {
            print("espresso")
        }
        CoffeeType.LATTE -> {
            print("latte")
        }
        else -> {
            print("else")
        }
    }
}
enum class CoffeeType(val value: Int) {
    ESPRESSO(0), LATTE(1) , CAPPUCCINO(2),AMERICANO(4),COLD_DRIP(5);
    companion object {
        fun fromInt(value: Int) = CoffeeType.values().firstOrNull  { it.value == value }
    }
}
```

## 延伸閱讀

- [effective kotlin](https://kt.academy/article/ek-enum)
- [docs](https://kotlinlang.org/docs/enum-classes.html)
