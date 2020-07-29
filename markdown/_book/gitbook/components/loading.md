<h1>az-loading 加载中...</h1>

### 如何使用


```ts
<az-loading [type]="type" [color]="color" [size]="size" [loading]="loading">
  <nz-card nzTitle="等待动画 Loading" style="min-height:80vh">
    <p><button nz-button nzType="primary">Primary</button></p>
  </nz-card>
</az-loading>
```

### Api
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
| `[type]`     | 动画的类型 | `AZLoadingType` | - |
| `[loading]`     | 是否加载中 | `boolean` | false |
| `[color]` | 动画的背景色 | `string` | - |
| `[size]`     | 动画的大小 | `AZLoadingSize （'small' / 'large' / 'default'）` | - |

#### AZLoadingType
| 参数        |
| ------------- |
|'ball-pulse' |
|'ball-grid-pulse' |
|'ball-clip-rotate' |
|'ball-clip-rotate-pulse' |
|'square-spin' |
|'ball-clip-rotate-multiple' |
|'ball-pulse-rise' |
|'ball-rotate' |
|'cube-transition' |
|'ball-zig-zag' |
|'ball-zig-zag-deflect' |
|'ball-triangle-path' |
|'ball-scale' |
|'line-scale' |
|'line-scale-party' |
|'ball-scale-multiple' |
|'ball-pulse-sync' |
|'ball-beat' |
|'line-scale-pulse-out' |
|'line-scale-pulse-out-rapid' |
|'ball-scale-ripple' |
|'ball-scale-ripple-multiple' |
|'ball-spin-fade-loader' |
|'line-spin-fade-loader' |
|'triangle-skew-spin' |
|'pacman' |
|'ball-grid-beat' |
|'semi-circle-spin' |

